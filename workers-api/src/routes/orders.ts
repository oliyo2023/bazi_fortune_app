import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { verifyJWT } from '../lib/auth';
import { getPrismaClient } from '../lib/db';
import { Env } from '../lib/auth';

export const orderRoutes = new Hono<{ Bindings: Env }>();

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

// 创建订单
orderRoutes.post('/create', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { type, amount } = await c.req.json();
    
    if (!type || !amount) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    const prisma = getPrismaClient(c.env);
    
    // 创建订单
    const order = await prisma.order.create({
      data: {
        userId,
        type,
        amount,
        status: 'PENDING',
      },
    });
    
    return c.json({
      id: order.id,
      type: order.type,
      amount: order.amount,
      status: order.status,
      createdAt: order.createdAt,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return c.json({ error: 'Failed to create order' }, 500);
  }
});

// 获取用户订单列表
orderRoutes.get('/list', authMiddleware, async (c) => {
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
    
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where: whereClause }),
    ]);
    
    return c.json({
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return c.json({ error: 'Failed to get orders' }, 500);
  }
});

// 获取订单详情
orderRoutes.get('/:id', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const orderId = c.req.param('id');
    
    const prisma = getPrismaClient(c.env);
    
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId, // 确保用户只能访问自己的订单
      },
    });
    
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }
    
    return c.json(order);
  } catch (error) {
    console.error('Get order detail error:', error);
    return c.json({ error: 'Failed to get order detail' }, 500);
  }
});

// 更新订单状态（管理员或支付回调）
orderRoutes.put('/:id/status', authMiddleware, async (c) => {
  try {
    const userRole = c.get('userRole');
    const orderId = c.req.param('id');
    const { status } = await c.req.json();
    
    if (!status) {
      return c.json({ error: 'Missing status' }, 400);
    }
    
    // 只有管理员可以更新订单状态，或者这是支付回调
    if (userRole !== 'ADMIN' && c.req.header('X-Payment-Callback') !== 'true') {
      return c.json({ error: 'Unauthorized' }, 403);
    }
    
    const prisma = getPrismaClient(c.env);
    
    // 检查订单是否存在
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });
    
    if (!existingOrder) {
      return c.json({ error: 'Order not found' }, 404);
    }
    
    // 更新订单状态
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    
    return c.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    return c.json({ error: 'Failed to update order status' }, 500);
  }
});

// 删除订单（管理员）
orderRoutes.delete('/:id', authMiddleware, async (c) => {
  try {
    const userRole = c.get('userRole');
    const orderId = c.req.param('id');
    
    if (userRole !== 'ADMIN') {
      return c.json({ error: 'Unauthorized' }, 403);
    }
    
    const prisma = getPrismaClient(c.env);
    
    // 检查订单是否存在
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });
    
    if (!existingOrder) {
      return c.json({ error: 'Order not found' }, 404);
    }
    
    // 删除订单
    await prisma.order.delete({
      where: { id: orderId },
    });
    
    return c.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    return c.json({ error: 'Failed to delete order' }, 500);
  }
});