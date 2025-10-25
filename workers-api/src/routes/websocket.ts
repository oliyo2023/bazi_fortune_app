import { Hono } from "hono";
import { verifyJWT } from "../lib/auth";
import { getPrismaClient } from "../lib/db";
import { Env } from "../lib/auth";

interface WebSocketMessage {
  type: "message" | "typing" | "online_status" | "read_receipt";
  data: any;
  timestamp: number;
  userId: string;
  chatId: string;
}

interface ConnectedClient {
  userId: string;
  socket: WebSocket;
  chatIds: Set<string>;
  lastSeen: number;
}

export const websocketRoutes = new Hono<{ Bindings: Env }>();

// 存储连接的客户端（生产环境应使用Durable Objects）
const connectedClients = new Map<string, ConnectedClient>();

// WebSocket连接处理
websocketRoutes.get("/ws", async (c) => {
  const upgradeHeader = c.req.header("Upgrade");
  if (upgradeHeader !== "websocket") {
    return c.text("Expected websocket", 400);
  }

  // 验证JWT token
  const token = c.req.query("token");
  if (!token) {
    return c.text("Missing token", 401);
  }

  try {
    const payload = await verifyJWT(token, c.env.JWT_SECRET);
    const userId = payload.userId;

    // 创建WebSocket连接
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    // 添加到连接池
    const clientInfo: ConnectedClient = {
      userId,
      socket: client,
      chatIds: new Set(),
      lastSeen: Date.now(),
    };

    connectedClients.set(userId, clientInfo);

    // 设置WebSocket事件处理
    server.accept();

    // 发送连接成功消息
    server.send(
      JSON.stringify({
        type: "connection",
        data: { status: "connected", userId },
        timestamp: Date.now(),
      }),
    );

    // 处理消息
    server.addEventListener("message", async (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data as string);
        await handleWebSocketMessage(message, userId, server, c.env);
      } catch (error) {
        console.error("WebSocket message error:", error);
        server.send(
          JSON.stringify({
            type: "error",
            data: { message: "Invalid message format" },
            timestamp: Date.now(),
          }),
        );
      }
    });

    // 处理连接关闭
    server.addEventListener("close", () => {
      handleDisconnection(userId);
    });

    // 处理连接错误
    server.addEventListener("error", (error) => {
      console.error(`WebSocket error for user ${userId}:`, error);
      handleDisconnection(userId);
    });

    // 心跳检测
    const heartbeatInterval = setInterval(() => {
      try {
        server.send(
          JSON.stringify({
            type: "ping",
            timestamp: Date.now(),
          }),
        );
      } catch (error) {
        clearInterval(heartbeatInterval);
        handleDisconnection(userId);
      }
    }, 30000); // 30秒心跳

    // 清理心跳定时器
    server.addEventListener("close", () => {
      clearInterval(heartbeatInterval);
    });

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  } catch (error) {
    console.error("WebSocket authentication error:", error);
    return c.text("Authentication failed", 401);
  }
});

// 处理WebSocket消息
async function handleWebSocketMessage(
  message: WebSocketMessage,
  userId: string,
  socket: WebSocket,
  env: Env,
) {
  const prisma = getPrismaClient(env);

  switch (message.type) {
    case "message":
      await handleChatMessage(message, userId, prisma, socket);
      break;
    case "typing":
      await handleTypingIndicator(message, userId, socket);
      break;
    case "online_status":
      await handleOnlineStatus(userId, message.data);
      break;
    case "read_receipt":
      await handleReadReceipt(message, userId, prisma, socket);
      break;
    default:
      socket.send(
        JSON.stringify({
          type: "error",
          data: { message: "Unknown message type" },
          timestamp: Date.now(),
        }),
      );
  }
}

// 处理聊天消息
async function handleChatMessage(
  message: WebSocketMessage,
  userId: string,
  prisma: any,
  senderSocket: WebSocket,
) {
  try {
    const { chatId, content, type = "text" } = message.data;

    // 验证用户是否属于该聊天
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        OR: [{ userId }, { master: { userId } }],
      },
      include: {
        user: true,
        master: true,
      },
    });

    if (!chat) {
      senderSocket.send(
        JSON.stringify({
          type: "error",
          data: { message: "Chat not found or access denied" },
          timestamp: Date.now(),
        }),
      );
      return;
    }

    // 创建消息对象
    const messageData = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      chatId,
      senderId: userId,
      content,
      type,
      timestamp: message.timestamp,
      read: false,
    };

    // 保存消息到数据库
    const updatedMessages = [...((chat.messages as any[]) || []), messageData];
    await prisma.chat.update({
      where: { id: chatId },
      data: { messages: updatedMessages },
    });

    // 获取接收者ID
    const receiverId =
      chat.userId === userId ? chat.master.userId : chat.userId;

    // 发送给发送者（确认）
    senderSocket.send(
      JSON.stringify({
        type: "message_sent",
        data: messageData,
        timestamp: Date.now(),
      }),
    );

    // 发送给接收者
    const receiverClient = connectedClients.get(receiverId);
    if (receiverClient && receiverClient.socket.readyState === WebSocket.OPEN) {
      receiverClient.socket.send(
        JSON.stringify({
          type: "new_message",
          data: messageData,
          timestamp: Date.now(),
        }),
      );
    }

    // 更新发送者加入的聊天列表
    const senderClient = connectedClients.get(userId);
    if (senderClient) {
      senderClient.chatIds.add(chatId);
    }
  } catch (error) {
    console.error("Handle chat message error:", error);
    senderSocket.send(
      JSON.stringify({
        type: "error",
        data: { message: "Failed to send message" },
        timestamp: Date.now(),
      }),
    );
  }
}

// 处理正在输入指示器
async function handleTypingIndicator(
  message: WebSocketMessage,
  userId: string,
  senderSocket: WebSocket,
) {
  try {
    const { chatId, isTyping } = message.data;

    const senderClient = connectedClients.get(userId);
    if (!senderClient || !senderClient.chatIds.has(chatId)) {
      return;
    }

    // 发送给聊天中的其他用户
    for (const [clientId, client] of connectedClients) {
      if (clientId !== userId && client.chatIds.has(chatId)) {
        client.socket.send(
          JSON.stringify({
            type: "typing_indicator",
            data: {
              chatId,
              userId,
              isTyping,
            },
            timestamp: Date.now(),
          }),
        );
      }
    }
  } catch (error) {
    console.error("Handle typing indicator error:", error);
  }
}

// 处理在线状态
async function handleOnlineStatus(userId: string, data: any) {
  try {
    const client = connectedClients.get(userId);
    if (client) {
      client.lastSeen = Date.now();

      // 广播状态变化给相关用户
      for (const [clientId, clientInfo] of connectedClients) {
        if (clientId !== userId) {
          clientInfo.socket.send(
            JSON.stringify({
              type: "online_status_change",
              data: {
                userId,
                status: "online",
                lastSeen: client.lastSeen,
              },
              timestamp: Date.now(),
            }),
          );
        }
      }
    }
  } catch (error) {
    console.error("Handle online status error:", error);
  }
}

// 处理已读回执
async function handleReadReceipt(
  message: WebSocketMessage,
  userId: string,
  prisma: any,
  senderSocket: WebSocket,
) {
  try {
    const { chatId, messageId } = message.data;

    // 验证聊天权限
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        OR: [{ userId }, { master: { userId } }],
      },
    });

    if (!chat) {
      return;
    }

    // 更新消息已读状态
    const messages = (chat.messages as any[]) || [];
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, read: true } : msg,
    );

    await prisma.chat.update({
      where: { id: chatId },
      data: { messages: updatedMessages },
    });

    // 通知发送者消息已读
    const messageSenderId = messages.find(
      (msg) => msg.id === messageId,
    )?.senderId;
    if (messageSenderId && messageSenderId !== userId) {
      const senderClient = connectedClients.get(messageSenderId);
      if (senderClient && senderClient.socket.readyState === WebSocket.OPEN) {
        senderClient.socket.send(
          JSON.stringify({
            type: "message_read",
            data: {
              chatId,
              messageId,
              readBy: userId,
            },
            timestamp: Date.now(),
          }),
        );
      }
    }
  } catch (error) {
    console.error("Handle read receipt error:", error);
  }
}

// 处理用户断开连接
function handleDisconnection(userId: string) {
  const client = connectedClients.get(userId);
  if (client) {
    // 广播离线状态
    for (const [clientId, clientInfo] of connectedClients) {
      if (clientId !== userId) {
        clientInfo.socket.send(
          JSON.stringify({
            type: "online_status_change",
            data: {
              userId,
              status: "offline",
              lastSeen: Date.now(),
            },
            timestamp: Date.now(),
          }),
        );
      }
    }

    // 从连接池中移除
    connectedClients.delete(userId);
  }
}

// 获取在线用户列表
websocketRoutes.get("/online-users", async (c) => {
  const onlineUsers = Array.from(connectedClients.entries()).map(
    ([userId, client]) => ({
      userId,
      lastSeen: client.lastSeen,
    }),
  );

  return c.json({ onlineUsers });
});

// 获取聊天历史记录
websocketRoutes.get("/chat-history/:chatId", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Missing token" }, 401);
    }

    const payload = await verifyJWT(token, c.env.JWT_SECRET);
    const userId = payload.userId;
    const chatId = c.req.param("chatId");

    const prisma = getPrismaClient(c.env);

    // 验证用户权限
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        OR: [{ userId }, { master: { userId } }],
      },
      select: {
        id: true,
        messages: true,
        createdAt: true,
      },
    });

    if (!chat) {
      return c.json({ error: "Chat not found" }, 404);
    }

    return c.json({
      chatId: chat.id,
      messages: chat.messages || [],
      createdAt: chat.createdAt,
    });
  } catch (error) {
    console.error("Get chat history error:", error);
    return c.json({ error: "Failed to get chat history" }, 500);
  }
});
