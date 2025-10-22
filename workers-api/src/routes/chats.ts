import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { verifyJWT } from '../lib/auth';
import { getPrismaClient } from '../lib/db';
import { Env } from '../lib/auth';

export const chatRoutes = new Hono<{ Bindings: Env }>();

// 认证中间件
async function authMiddleware(c: any, next: any) {
  const authorization = c.req.header('Authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return c.json({ error: 'Missing or invalid token' }, 401);
  }
  
  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c.env.JWT_SECRET);
    c.set('userId', payload.userId);
    c.set('userRole', payload.role);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
}

// 创建聊天
chatRoutes.post('/create', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { masterId, initialMessage } = await c.req.json();
    
    if (!masterId) {
      return c.json({ error: 'Missing masterId' }, 400);
    }
    
    const prisma = getPrismaClient(c.env);
    
    // 检查大师是否存在且可用
    const master = await prisma.master.findUnique({
      where: { id: masterId },
    });
    
    if (!master) {
      return c.json({ error: 'Master not found' }, 404);
    }
    
    if (!master.available) {
      return c.json({ error: 'Master is not available' }, 400);
    }
    
    // 创建聊天
    const messages = initialMessage ? [initialMessage] : [];
    const chat = await prisma.chat.create({
      data: {
        userId,
        masterId,
        messages,
        status: 'active',
      },
    });
    
    return c.json({
      id: chat.id,
      masterId: chat.masterId,
      messages: chat.messages,
      status: chat.status,
      createdAt: chat.createdAt,
    });
  } catch (error) {
    console.error('Create chat error:', error);
    return c.json({ error: 'Failed to create chat' }, 500);
  }
});

// 获取用户的聊天列表
chatRoutes.get('/list', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const status = c.req.query('status');
    
    const prisma = getPrismaClient(c.env);
    
    const whereClause: any = { userId };
    if (status) {
      whereClause.status = status;
    }
    
    const [chats, total] = await Promise.all([
      prisma.chat.findMany({
        where: whereClause,
        include: {
          master: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.chat.count({ where: whereClause }),
    ]);
    
    return c.json({
      data: chats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get chats error:', error);
    return c.json({ error: 'Failed to get chats' }, 500);
  }
});

// 获取聊天详情
chatRoutes.get('/:id', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const chatId = c.req.param('id');
    
    const prisma = getPrismaClient(c.env);
    
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId, // 确保用户只能访问自己的聊天
      },
      include: {
        master: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    
    if (!chat) {
      return c.json({ error: 'Chat not found' }, 404);
    }
    
    return c.json(chat);
  } catch (error) {
    console.error('Get chat detail error:', error);
    return c.json({ error: 'Failed to get chat detail' }, 500);
  }
});

// 发送消息
chatRoutes.post('/:id/message', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const chatId = c.req.param('id');
    const { message } = await c.req.json();
    
    if (!message) {
      return c.json({ error: 'Missing message' }, 400);
    }
    
    const prisma = getPrismaClient(c.env);
    
    // 检查聊天是否存在且属于当前用户
    const existingChat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });
    
    if (!existingChat) {
      return c.json({ error: 'Chat not found' }, 404);
    }
    
    if (existingChat.status !== 'active') {
      return c.json({ error: 'Chat is not active' }, 400);
    }
    
    // 添加消息
    const updatedMessages = [...(existingChat.messages as any[]), message];
    
    // 更新聊天
    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        messages: updatedMessages,
      },
    });
    
    return c.json({
      id: updatedChat.id,
      messages: updatedMessages,
      status: updatedChat.status,
      updatedAt: updatedChat.createdAt,
    });
  } catch (error) {
    console.error('Send message error:', error);
    return c.json({ error: 'Failed to send message' }, 500);
  }
});

// 关闭聊天
chatRoutes.put('/:id/close', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const chatId = c.req.param('id');
    
    const prisma = getPrismaClient(c.env);
    
    // 检查聊天是否存在且属于当前用户
    const existingChat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });
    
    if (!existingChat) {
      return c.json({ error: 'Chat not found' }, 404);
    }
    
    // 关闭聊天
    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        status: 'closed',
      },
    });
    
    return c.json({
      id: updatedChat.id,
      status: updatedChat.status,
    });
  } catch (error) {
    console.error('Close chat error:', error);
    return c.json({ error: 'Failed to close chat' }, 500);
  }
});

// 删除聊天
chatRoutes.delete('/:id', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const chatId = c.req.param('id');
    
    const prisma = getPrismaClient(c.env);
    
    // 检查聊天是否存在且属于当前用户
    const existingChat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });
    
    if (!existingChat) {
      return c.json({ error: 'Chat not found' }, 404);
    }
    
    // 删除聊天
    await prisma.chat.delete({
      where: { id: chatId },
    });
    
    return c.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Delete chat error:', error);
    return c.json({ error: 'Failed to delete chat' }, 500);
  }
});