import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { verifyJWT } from '../lib/auth';
import { getPrismaClient } from '../lib/db';
import { analyzeBaziWithAI, AIAnalysisRequest } from '../lib/ai';
import { Env } from '../lib/auth';

export const aiRoutes = new Hono<{ Bindings: Env }>();

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

// AI分析八字
aiRoutes.post('/analyze', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { baziId, language = 'zh', aspects }: AIAnalysisRequest = await c.req.json();
    
    if (!baziId) {
      return c.json({ error: 'Missing baziId' }, 400);
    }
    
    const prisma = getPrismaClient(c.env);
    
    // 获取八字数据
    const baziData = await prisma.baziData.findFirst({
      where: {
        id: baziId,
        userId, // 确保用户只能分析自己的数据
      },
    });
    
    if (!baziData) {
      return c.json({ error: 'Bazi data not found' }, 404);
    }
    
    // 如果已有分析结果且不强制重新分析，直接返回
    if (baziData.analysis && !c.req.query('force')) {
      return c.json({
        id: baziData.id,
        analysis: baziData.analysis,
        language,
        aspects,
      });
    }
    
    // 调用AI分析
    const analysisResult = await analyzeBaziWithAI(
      baziData.inputData as any,
      baziData.resultData as any,
      language as 'zh' | 'en',
      aspects
    );
    
    // 保存分析结果
    await prisma.baziData.update({
      where: { id: baziId },
      data: {
        analysis: analysisResult.analysis,
      },
    });
    
    return c.json({
      id: baziData.id,
      ...analysisResult,
      language,
      aspects,
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    return c.json({ error: 'Failed to analyze bazi' }, 500);
  }
});

// 获取分析历史
aiRoutes.get('/history', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    
    const prisma = getPrismaClient(c.env);
    
    const [baziData, total] = await Promise.all([
      prisma.baziData.findMany({
        where: { 
          userId,
          analysis: { not: null } // 只返回有分析结果的记录
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          inputData: true,
          resultData: true,
          analysis: true,
          createdAt: true,
        },
      }),
      prisma.baziData.count({ 
        where: { 
          userId,
          analysis: { not: null }
        }
      }),
    ]);
    
    return c.json({
      data: baziData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get AI analysis history error:', error);
    return c.json({ error: 'Failed to get analysis history' }, 500);
  }
});

// 删除分析结果
aiRoutes.delete('/:baziId', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const baziId = c.req.param('baziId');
    
    const prisma = getPrismaClient(c.env);
    
    // 检查记录是否存在且属于当前用户
    const existingBazi = await prisma.baziData.findFirst({
      where: {
        id: baziId,
        userId,
      },
    });
    
    if (!existingBazi) {
      return c.json({ error: 'Bazi data not found' }, 404);
    }
    
    // 删除分析结果（设置为null）
    await prisma.baziData.update({
      where: { id: baziId },
      data: {
        analysis: null,
      },
    });
    
    return c.json({ message: 'Analysis deleted successfully' });
  } catch (error) {
    console.error('Delete analysis error:', error);
    return c.json({ error: 'Failed to delete analysis' }, 500);
  }
});