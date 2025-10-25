import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getPrismaClient } from "./lib/db";
import { authRoutes } from "./routes_backup/auth";
import { baziRoutes } from "./routes/bazi";
import { aiRoutes } from "./routes/ai";
import { orderRoutes } from "./routes/orders";
import { masterRoutes } from "./routes/masters";
import { chatRoutes } from "./routes/chats";
import { paymentsRoutes } from "./routes/payments";
import { usersRoutes } from "./routes/users";
import { websocketRoutes } from "./routes/websocket";
import { Env, Variables } from "./lib/auth";
import { cache, userCache, baziCache } from "./middleware/cache";
import {
  rateLimit,
  userRateLimit,
  loginRateLimit,
  registerRateLimit,
  uploadRateLimit,
} from "./middleware/rateLimit";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// 中间件
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://your-app-domain.com"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

// 全局限流
app.use(
  "*",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 1000, // 每个IP最多1000次请求
  }),
);

// 全局缓存
app.use("/api/v1/masters", cache({ ttl: 300 })); // 缓存5分钟

// 健康检查
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 数据库测试
app.get("/test-db", async (c) => {
  try {
    const prisma = getPrismaClient(c.env);
    const count = await prisma.user.count();
    return c.json({
      status: "ok",
      userCount: count,
      database: "connected",
    });
  } catch (error) {
    console.error("Database test error:", error);
    return c.json(
      {
        status: "error",
        error: error.message,
        database: "failed",
      },
      500,
    );
  }
});

// API路由
app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/bazi", baziRoutes);
app.route("/api/v1/ai", aiRoutes);
app.route("/api/v1/orders", orderRoutes);
app.route("/api/v1/masters", masterRoutes);
app.route("/api/v1/chats", chatRoutes);
app.route("/api/v1/payments", paymentsRoutes);
app.route("/api/v1/users", usersRoutes);
app.route("/api/v1/ws", websocketRoutes);

// 特定路由的限流和缓存
app.post("/api/v1/auth/login", loginRateLimit);
app.post("/api/v1/auth/register", registerRateLimit);
app.post("/api/v1/users/avatar", uploadRateLimit);
app.get("/api/v1/bazi/history", userCache(60)); // 用户八字历史缓存1分钟

// 404处理
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

// 错误处理
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

export default {
  fetch: app.fetch,
};
