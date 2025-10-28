import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verifyJWT } from "../lib/auth";
import { getPrismaClient } from "../lib/db";
import {
  calculateBaziResult,
  BaziInput,
  analyzeBaziWithAI,
  analyzeBaziWithGLM46,
  compareBaziAnalysis,
} from "../lib/bazi";
import { Env, Variables } from "../lib/auth";

export const baziRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// 认证中间件
async function authMiddleware(c: any, next: any) {
  const authorization = c.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid token" }, 401);
  }

  try {
    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c.env.JWT_SECRET);
    c.set("userId", payload.userId);
    c.set("userRole", payload.role);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
}

// 计算八字
baziRoutes.post("/calculate", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const baziInput: BaziInput = await c.req.json();

    // 验证输入
    if (
      !baziInput.year ||
      !baziInput.month ||
      !baziInput.day ||
      !baziInput.hour
    ) {
      return c.json({ error: "Missing required date/time fields" }, 400);
    }

    // 计算八字
    const baziResult = calculateBaziResult(baziInput);

    // 保存到数据库
    const prisma = getPrismaClient(c.env);

    const baziData = await prisma.baziData.create({
      data: {
        userId,
        inputData: baziInput,
        resultData: baziResult,
      },
    });

    return c.json({
      id: baziData.id,
      input: baziInput,
      result: baziResult,
      createdAt: baziData.createdAt,
    });
  } catch (error) {
    console.error("Bazi calculation error:", error);
    return c.json({ error: "Failed to calculate bazi" }, 500);
  }
});

// 获取用户的八字历史记录
baziRoutes.get("/history", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "10");

    const prisma = getPrismaClient(c.env);

    const [baziData, total] = await Promise.all([
      prisma.baziData.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
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
      prisma.baziData.count({ where: { userId } }),
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
    console.error("Get bazi history error:", error);
    return c.json({ error: "Failed to get bazi history" }, 500);
  }
});

// 获取八字详情
baziRoutes.get("/:id", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const baziId = c.req.param("id");

    const prisma = getPrismaClient(c.env);

    const baziData = await prisma.baziData.findFirst({
      where: {
        id: baziId,
        userId, // 确保用户只能访问自己的数据
      },
    });

    if (!baziData) {
      return c.json({ error: "Bazi data not found" }, 404);
    }

    return c.json({
      id: baziData.id,
      input: baziData.inputData,
      result: baziData.resultData,
      analysis: baziData.analysis,
      createdAt: baziData.createdAt,
    });
  } catch (error) {
    console.error("Get bazi detail error:", error);
    return c.json({ error: "Failed to get bazi detail" }, 500);
  }
});

// 更新八字记录
baziRoutes.put("/:id", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const baziId = c.req.param("id");
    const baziInput: BaziInput = await c.req.json();

    // 验证输入
    if (
      !baziInput.year ||
      !baziInput.month ||
      !baziInput.day ||
      !baziInput.hour
    ) {
      return c.json({ error: "Missing required date/time fields" }, 400);
    }

    const prisma = getPrismaClient(c.env);

    // 检查记录是否存在且属于当前用户
    const existingBazi = await prisma.baziData.findFirst({
      where: {
        id: baziId,
        userId,
      },
    });

    if (!existingBazi) {
      return c.json({ error: "Bazi data not found" }, 404);
    }

    // 重新计算八字
    const baziResult = calculateBaziResult(baziInput);

    // 更新记录
    const updatedBazi = await prisma.baziData.update({
      where: { id: baziId },
      data: {
        inputData: baziInput,
        resultData: baziResult,
      },
    });

    return c.json({
      id: updatedBazi.id,
      input: baziInput,
      result: baziResult,
      analysis: updatedBazi.analysis,
      createdAt: updatedBazi.createdAt,
    });
  } catch (error) {
    console.error("Update bazi error:", error);
    return c.json({ error: "Failed to update bazi" }, 500);
  }
});

// 删除八字记录
baziRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const baziId = c.req.param("id");

    const prisma = getPrismaClient(c.env);

    // 检查记录是否存在且属于当前用户
    const existingBazi = await prisma.baziData.findFirst({
      where: {
        id: baziId,
        userId,
      },
    });

    if (!existingBazi) {
      return c.json({ error: "Bazi data not found" }, 404);
    }

    // 删除记录
    await prisma.baziData.delete({
      where: { id: baziId },
    });

    return c.json({ message: "Bazi data deleted successfully" });
  } catch (error) {
    console.error("Delete bazi error:", error);
    return c.json({ error: "Failed to delete bazi" }, 500);
  }
});

// AI分析八字 - 支持指定AI提供商
baziRoutes.post("/analyze", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();

    const {
      baziId,
      language = "zh",
      aspects,
      provider = "deepseek",
      baziInput,
    } = body;

    let input: BaziInput;
    let baziResult: any;

    const prisma = getPrismaClient(c.env);

    if (baziId) {
      // 使用现有的八字数据
      const existingBazi = await prisma.baziData.findFirst({
        where: {
          id: baziId,
          userId,
        },
      });

      if (!existingBazi) {
        return c.json({ error: "Bazi data not found" }, 404);
      }

      input = existingBazi.inputData;
      baziResult = existingBazi.resultData;
    } else if (baziInput) {
      // 使用新的八字数据
      input = { ...baziInput, aiProvider: provider };
      baziResult = calculateBaziResult(input);
    } else {
      return c.json({ error: "Either baziId or baziInput is required" }, 400);
    }

    // 使用指定的AI提供商进行分析
    const result = await analyzeBaziWithAI(input, language, aspects);

    // 如果是基于现有数据的分析，保存分析结果
    if (baziId) {
      await prisma.baziData.update({
        where: { id: baziId },
        data: {
          analysis: result.aiAnalysis,
          analysisProvider: result.aiAnalysis.provider,
        },
      });
    }

    return c.json({
      baziInput: input,
      baziResult: result.baziResult,
      aiAnalysis: result.aiAnalysis,
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Bazi AI analysis error:", error);
    return c.json({ error: "Failed to analyze bazi with AI" }, 500);
  }
});

// GLM-4.6专门分析接口
baziRoutes.post("/analyze-glm46", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();

    const { baziId, language = "zh", aspects, baziInput } = body;

    let input: BaziInput;
    const prisma = getPrismaClient(c.env);

    if (baziId) {
      // 使用现有的八字数据
      const existingBazi = await prisma.baziData.findFirst({
        where: {
          id: baziId,
          userId,
        },
      });

      if (!existingBazi) {
        return c.json({ error: "Bazi data not found" }, 404);
      }

      input = existingBazi.inputData;
    } else if (baziInput) {
      // 使用新的八字数据
      input = baziInput;
    } else {
      return c.json({ error: "Either baziId or baziInput is required" }, 400);
    }

    // 使用GLM-4.6进行分析
    const result = await analyzeBaziWithGLM46(input, language, aspects);

    // 如果是基于现有数据的分析，保存分析结果
    if (baziId) {
      await prisma.baziData.update({
        where: { id: baziId },
        data: {
          analysis: result.aiAnalysis,
          analysisProvider: "GLM-4.6",
        },
      });
    }

    return c.json({
      baziInput: input,
      baziResult: result.baziResult,
      aiAnalysis: result.aiAnalysis,
      provider: "GLM-4.6",
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Bazi GLM-4.6 analysis error:", error);
    return c.json({ error: "Failed to analyze bazi with GLM-4.6" }, 500);
  }
});

// AI对比分析接口
baziRoutes.post("/compare", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();

    const { baziId, language = "zh", aspects, baziInput } = body;

    let input: BaziInput;
    const prisma = getPrismaClient(c.env);

    if (baziId) {
      // 使用现有的八字数据
      const existingBazi = await prisma.baziData.findFirst({
        where: {
          id: baziId,
          userId,
        },
      });

      if (!existingBazi) {
        return c.json({ error: "Bazi data not found" }, 404);
      }

      input = existingBazi.inputData;
    } else if (baziInput) {
      // 使用新的八字数据
      input = baziInput;
    } else {
      return c.json({ error: "Either baziId or baziInput is required" }, 400);
    }

    // 进行对比分析
    const result = await compareBaziAnalysis(input, language, aspects);

    return c.json({
      baziInput: input,
      baziResult: result.baziResult,
      comparison: result.comparison,
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Bazi comparison analysis error:", error);
    return c.json({ error: "Failed to compare bazi analysis" }, 500);
  }
});

// 一站式计算和分析接口
baziRoutes.post("/full-analysis", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();

    const {
      baziInput,
      language = "zh",
      aspects,
      provider = "deepseek",
      saveToDb = true,
    } = body;

    if (!baziInput) {
      return c.json({ error: "baziInput is required" }, 400);
    }

    // 验证输入
    if (
      !baziInput.year ||
      !baziInput.month ||
      !baziInput.day ||
      !baziInput.hour
    ) {
      return c.json({ error: "Missing required date/time fields" }, 400);
    }

    // 设置AI提供商
    const input = { ...baziInput, aiProvider: provider };

    // 进行完整分析
    const result = await analyzeBaziWithAI(input, language, aspects);

    let savedData = null;
    if (saveToDb) {
      const prisma = getPrismaClient(c.env);

      // 保存到数据库
      savedData = await prisma.baziData.create({
        data: {
          userId,
          inputData: input,
          resultData: result.baziResult,
          analysis: result.aiAnalysis,
          analysisProvider: result.aiAnalysis.provider,
        },
      });
    }

    return c.json({
      id: savedData?.id,
      baziInput: input,
      baziResult: result.baziResult,
      aiAnalysis: result.aiAnalysis,
      provider: result.aiAnalysis.provider,
      createdAt: savedData?.createdAt || new Date().toISOString(),
    });
  } catch (error) {
    console.error("Full bazi analysis error:", error);
    return c.json({ error: "Failed to perform full bazi analysis" }, 500);
  }
});
