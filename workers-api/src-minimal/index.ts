import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { getPrismaClient } from './lib/db';
import { authRoutes } from './routes/auth';
import { baziRoutes } from './routes/bazi';
import { Env, Variables } from './lib/auth';

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// 中间件
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://your-app-domain.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// 健康检查
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API路由
app.route('/api/v1/auth', authRoutes);
app.route('/api/v1/bazi', baziRoutes);

// 404处理
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// 错误处理
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error', message: err.message }, 500);
});

export default {
  fetch: app.fetch,
};
