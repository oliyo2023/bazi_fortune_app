import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { verifyJWT } from '../lib/auth';
import { getPrismaClient } from '../lib/db';
import { Env } from '../lib/auth';

export const masterRoutes = new Hono<{ Bindings: Env }>();

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

// 获取大师列表
masterRoutes.get('/list', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const available = c.req.query('available');
    
    const prisma = getPrismaClient(c.env);
    
    const whereClause: any = {};
    if (available !== undefined) {
      whereClause.available = available === 'true';
    }
    
    const [masters, total] = await Promise.all([
      prisma.master.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
        orderBy: { rating: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.master.count({ where: whereClause }),
    ]);
    
    return c.json({
      data: masters,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get masters error:', error);
    return c.json({ error: 'Failed to get masters' }, 500);
  }
});

// 获取大师详情
masterRoutes.get('/:id', async (c) => {
  try {
    const masterId = c.req.param('id');
    
    const prisma = getPrismaClient(c.env);
    
    const master = await prisma.master.findUnique({
      where: { id: masterId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    
    if (!master) {
      return c.json({ error: 'Master not found' }, 404);
    }
    
    return c.json(master);
  } catch (error) {
    console.error('Get master detail error:', error);
    return c.json({ error: 'Failed to get master detail' }, 500);
  }
});

// 申请成为大师
masterRoutes.post('/apply', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { title, description, price } = await c.req.json();
    
    if (!title || !price) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    const prisma = getPrismaClient(c.env);
    
    // 检查用户是否已经是大师
    const existingMaster = await prisma.master.findUnique({
      where: { userId },
    });
    
    if (existingMaster) {
      return c.json({ error: 'User is already a master' }, 409);
    }
    
    // 创建大师记录
    const master = await prisma.master.create({
      data: {
        userId,
        title,
        description,
        price,
        available: false, // 默认不可用，需要管理员审核
      },
    });
    
    return c.json({
      id: master.id,
      title: master.title,
      description: master.description,
      price: master.price,
      available: master.available,
      createdAt: master.createdAt,
    });
  } catch (error) {
    console.error('Apply to be master error:', error);
    return c.json({ error: 'Failed to apply to be master' }, 500);
  }
});

// 更新大师信息
masterRoutes.put('/:id', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const userRole = c.get('userRole');
    const masterId = c.req.param('id');
    const { title, description, price, available } = await c.req.json();
    
    const prisma = getPrismaClient(c.env);
    
    // 检查大师是否存在
    const existingMaster = await prisma.master.findUnique({
      where: { id: masterId },
    });
    
    if (!existingMaster) {
      return c.json({ error: 'Master not found' }, 404);
    }
    
    // 只有大师本人或管理员可以更新信息
    if (existingMaster.userId !== userId && userRole !== 'ADMIN') {
      return c.json({ error: 'Unauthorized' }, 403);
    }
    
    // 只有管理员可以设置可用性
    const updateData: any = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (price) updateData.price = price;
    if (userRole === 'ADMIN' && available !== undefined) updateData.available = available;
    
    // 更新大师信息
    const updatedMaster = await prisma.master.update({
      where: { id: masterId },
      data: updateData,
    });
    
    return c.json(updatedMaster);
  } catch (error) {
    console.error('Update master error:', error);
    return c.json({ error: 'Failed to update master' }, 500);
  }
});

// 删除大师（管理员）
masterRoutes.delete('/:id', authMiddleware, async (c) => {
  try {
    const userRole = c.get('userRole');
    const masterId = c.req.param('id');
    
    if (userRole !== 'ADMIN') {
      return c.json({ error: 'Unauthorized' }, 403);
    }
    
    const prisma = getPrismaClient(c.env);
    
    // 检查大师是否存在
    const existingMaster = await prisma.master.findUnique({
      where: { id: masterId },
    });
    
    if (!existingMaster) {
      return c.json({ error: 'Master not found' }, 404);
    }
    
    // 删除大师
    await prisma.master.delete({
      where: { id: masterId },
    });
    
    return c.json({ message: 'Master deleted successfully' });
  } catch (error) {
    console.error('Delete master error:', error);
    return c.json({ error: 'Failed to delete master' }, 500);
  }
});