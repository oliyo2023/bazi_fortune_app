import { Hono } from "hono";
import { verifyJWT } from "../lib/auth";
import { Env, Variables } from "../lib/auth";

export const astrologyRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

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

// AICore API配置
const AICORE_BASE_URL = "http://localhost:8000/api/v1";

// 代理请求到AICore
async function proxyToAICore(endpoint: string, method: string, body?: any) {
  const url = `${AICORE_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`AICore API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("AICore proxy error:", error);
    throw new Error(`Failed to connect to AICore: ${error.message}`);
  }
}

// 创建星盘
astrologyRoutes.post("/chart", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const result = await proxyToAICore("/chart", "POST", body);
    
    return c.json({
      success: true,
      message: "星盘创建成功",
      data: result,
    });
  } catch (error) {
    console.error("Create astrology chart error:", error);
    return c.json({ error: "创建星盘失败" }, 500);
  }
});

// 生成星盘报告
astrologyRoutes.post("/report", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const result = await proxyToAICore("/report", "POST", body);
    
    return c.json({
      success: true,
      message: "报告生成成功",
      data: result,
    });
  } catch (error) {
    console.error("Generate astrology report error:", error);
    return c.json({ error: "生成报告失败" }, 500);
  }
});

// 计算行运
astrologyRoutes.post("/transits", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const result = await proxyToAICore("/transits", "POST", body);
    
    return c.json({
      success: true,
      message: "行运计算成功",
      data: result,
    });
  } catch (error) {
    console.error("Calculate transits error:", error);
    return c.json({ error: "行运计算失败" }, 500);
  }
});

// 计算推运
astrologyRoutes.post("/progressions", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const result = await proxyToAICore("/progressions", "POST", body);
    
    return c.json({
      success: true,
      message: "推运计算成功",
      data: result,
    });
  } catch (error) {
    console.error("Calculate progressions error:", error);
    return c.json({ error: "推运计算失败" }, 500);
  }
});

// 分析相位格局
astrologyRoutes.post("/aspect-patterns", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const result = await proxyToAICore("/aspect-patterns", "POST", body);
    
    return c.json({
      success: true,
      message: "相位格局分析成功",
      data: result,
    });
  } catch (error) {
    console.error("Analyze aspect patterns error:", error);
    return c.json({ error: "相位格局分析失败" }, 500);
  }
});

// 关系合盘
astrologyRoutes.post("/synastry", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const result = await proxyToAICore("/synastry", "POST", body);
    
    return c.json({
      success: true,
      message: "关系合盘分析成功",
      data: result,
    });
  } catch (error) {
    console.error("Synastry analysis error:", error);
    return c.json({ error: "关系合盘分析失败" }, 500);
  }
});

// 太阳返照
astrologyRoutes.post("/solar-return", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const result = await proxyToAICore("/solar-return", "POST", body);
    
    return c.json({
      success: true,
      message: "太阳返照计算成功",
      data: result,
    });
  } catch (error) {
    console.error("Solar return calculation error:", error);
    return c.json({ error: "太阳返照计算失败" }, 500);
  }
});

// 获取星座信息
astrologyRoutes.get("/signs", async (c) => {
  try {
    const result = await proxyToAICore("/signs", "GET");
    
    return c.json({
      success: true,
      message: "获取星座信息成功",
      data: result,
    });
  } catch (error) {
    console.error("Get zodiac signs error:", error);
    return c.json({ error: "获取星座信息失败" }, 500);
  }
});

// 获取行星信息
astrologyRoutes.get("/planets", async (c) => {
  try {
    const result = await proxyToAICore("/planets", "GET");
    
    return c.json({
      success: true,
      message: "获取行星信息成功",
      data: result,
    });
  } catch (error) {
    console.error("Get planets error:", error);
    return c.json({ error: "获取行星信息失败" }, 500);
  }
});

// 获取宫位系统信息
astrologyRoutes.get("/house-systems", async (c) => {
  try {
    const result = await proxyToAICore("/house-systems", "GET");
    
    return c.json({
      success: true,
      message: "获取宫位系统信息成功",
      data: result,
    });
  } catch (error) {
    console.error("Get house systems error:", error);
    return c.json({ error: "获取宫位系统信息失败" }, 500);
  }
});

// 运势专用接口 - 今日运势
astrologyRoutes.post("/fortune/today", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const { birth_data, location } = body;

    if (!birth_data) {
      return c.json({ error: "缺少出生数据" }, 400);
    }

    // 获取今日日期范围
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // 调用行运API
    const transitRequest = {
      birth_data,
      start_date: startOfDay.toISOString(),
      end_date: endOfDay.toISOString(),
      transit_type: "natal",
      location: location || birth_data.city,
    };

    const transitResult = await proxyToAICore("/transits", "POST", transitRequest);
    
    // 解析运势数据
    const fortune = await parseFortuneData(transitResult, "today");
    
    return c.json({
      success: true,
      message: "今日运势计算成功",
      data: fortune,
    });
  } catch (error) {
    console.error("Today fortune error:", error);
    return c.json({ error: "今日运势计算失败" }, 500);
  }
});

// 运势专用接口 - 明日运势
astrologyRoutes.post("/fortune/tomorrow", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const { birth_data, location } = body;

    if (!birth_data) {
      return c.json({ error: "缺少出生数据" }, 400);
    }

    // 获取明日日期范围
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    const endOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1);

    // 调用行运API
    const transitRequest = {
      birth_data,
      start_date: startOfTomorrow.toISOString(),
      end_date: endOfTomorrow.toISOString(),
      transit_type: "natal",
      location: location || birth_data.city,
    };

    const transitResult = await proxyToAICore("/transits", "POST", transitRequest);
    
    // 解析运势数据
    const fortune = await parseFortuneData(transitResult, "tomorrow");
    
    return c.json({
      success: true,
      message: "明日运势计算成功",
      data: fortune,
    });
  } catch (error) {
    console.error("Tomorrow fortune error:", error);
    return c.json({ error: "明日运势计算失败" }, 500);
  }
});

// 运势专用接口 - 本周运势
astrologyRoutes.post("/fortune/week", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const { birth_data, location } = body;

    if (!birth_data) {
      return c.json({ error: "缺少出生数据" }, 400);
    }

    // 获取本周日期范围（从今天开始的7天）
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

    // 调用行运API
    const transitRequest = {
      birth_data,
      start_date: startOfWeek.toISOString(),
      end_date: endOfWeek.toISOString(),
      transit_type: "natal",
      location: location || birth_data.city,
    };

    const transitResult = await proxyToAICore("/transits", "POST", transitRequest);
    
    // 解析运势数据
    const fortune = await parseFortuneData(transitResult, "week");
    
    return c.json({
      success: true,
      message: "本周运势计算成功",
      data: fortune,
    });
  } catch (error) {
    console.error("Week fortune error:", error);
    return c.json({ error: "本周运势计算失败" }, 500);
  }
});

// 运势专用接口 - 本月运势
astrologyRoutes.post("/fortune/month", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const { birth_data, location } = body;

    if (!birth_data) {
      return c.json({ error: "缺少出生数据" }, 400);
    }

    // 获取本月日期范围
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // 调用行运API
    const transitRequest = {
      birth_data,
      start_date: startOfMonth.toISOString(),
      end_date: endOfMonth.toISOString(),
      transit_type: "natal",
      location: location || birth_data.city,
    };

    const transitResult = await proxyToAICore("/transits", "POST", transitRequest);
    
    // 解析运势数据
    const fortune = await parseFortuneData(transitResult, "month");
    
    return c.json({
      success: true,
      message: "本月运势计算成功",
      data: fortune,
    });
  } catch (error) {
    console.error("Month fortune error:", error);
    return c.json({ error: "本月运势计算失败" }, 500);
  }
});

// 解析运势数据
async function parseFortuneData(transitResult: any, period: string) {
  const transitPeriods = transitResult.transit_periods || [];
  
  // 计算整体运势评分
  let overallScore = 0;
  let totalIntensity = 0;
  const keyTransits = [];
  
  // 生活领域评分
  const lifeAreas = {
    career: 0,    // 事业
    love: 0,       // 爱情
    health: 0,     // 健康
    wealth: 0,     // 财运
  };
  
  // 分析每个行运周期
  transitPeriods.forEach((period: any) => {
    const intensity = period.overall_intensity || 0;
    totalIntensity += intensity;
    
    // 根据行运行星和相位判断影响领域
    const transitingPlanet = period.transiting_planet;
    const description = period.description || "";
    
    // 识别关键行运
    if (intensity > 0.7) {
      keyTransits.push({
        planet: transitingPlanet,
        aspect: description,
        intensity: intensity,
        influence: getInfluenceDescription(transitingPlanet, description),
      });
    }
    
    // 根据行星类型分配到不同生活领域
    if (transitingPlanet.includes("太阳") || transitingPlanet.includes("土星")) {
      lifeAreas.career += intensity;
    }
    if (transitingPlanet.includes("月亮") || transitingPlanet.includes("金星")) {
      lifeAreas.love += intensity;
    }
    if (transitingPlanet.includes("火星") || transitingPlanet.includes("太阳")) {
      lifeAreas.health += intensity;
    }
    if (transitingPlanet.includes("木星") || transitingPlanet.includes("金星")) {
      lifeAreas.wealth += intensity;
    }
  });
  
  // 计算平均整体评分
  overallScore = transitPeriods.length > 0 ? totalIntensity / transitPeriods.length : 0.5;
  
  // 标准化生活领域评分到0-1范围
  const maxScore = Math.max(...Object.values(lifeAreas), 1);
  Object.keys(lifeAreas).forEach(key => {
    lifeAreas[key] = lifeAreas[key] / maxScore;
  });
  
  // 生成建议
  const advice = generateAdvice(overallScore, lifeAreas, keyTransits);
  
  // 确定整体心情
  let overallMood = "平稳";
  if (overallScore >= 0.8) overallMood = "极佳";
  else if (overallScore >= 0.6) overallMood = "积极";
  else if (overallScore >= 0.4) overallMood = "平稳";
  else overallMood = "需谨慎";
  
  return {
    period,
    date_range: getDateRange(period),
    overall_score: Math.round(overallScore * 100) / 100,
    overall_mood: overallMood,
    key_transits: keyTransits.slice(0, 5), // 最多显示5个关键行运
    life_areas: {
      career: Math.round(lifeAreas.career * 100) / 100,
      love: Math.round(lifeAreas.love * 100) / 100,
      health: Math.round(lifeAreas.health * 100) / 100,
      wealth: Math.round(lifeAreas.wealth * 100) / 100,
    },
    advice,
    transit_count: transitPeriods.length,
  };
}

// 获取影响描述
function getInfluenceDescription(planet: string, aspect: string): string {
  const influences: { [key: string]: string } = {
    "太阳": "自我表达和领导力",
    "月亮": "情感和直觉",
    "水星": "沟通和思维",
    "金星": "爱情和美感",
    "火星": "行动和竞争",
    "木星": "扩张和机遇",
    "土星": "责任和挑战",
    "天王星": "变化和创新",
    "海王星": "灵性和梦想",
    "冥王星": "转化和重生",
  };
  
  const planetName = Object.keys(influences).find(key => planet.includes(key));
  return planetName ? influences[planetName] : "综合影响";
}

// 生成建议
function generateAdvice(overallScore: number, lifeAreas: any, keyTransits: any[]): string {
  const advice = [];
  
  if (overallScore >= 0.7) {
    advice.push("运势强劲，适合开展新计划和重要决策");
  } else if (overallScore >= 0.4) {
    advice.push("运势平稳，可以稳步推进既定目标");
  } else {
    advice.push("运势较弱，建议谨慎行事，避免重大决定");
  }
  
  // 根据生活领域评分给出具体建议
  if (lifeAreas.career >= 0.7) {
    advice.push("事业运势佳，适合争取晋升或开展新项目");
  } else if (lifeAreas.career <= 0.3) {
    advice.push("事业运势一般，专注于现有工作，避免冲突");
  }
  
  if (lifeAreas.love >= 0.7) {
    advice.push("感情运势旺盛，适合表达爱意或发展新关系");
  } else if (lifeAreas.love <= 0.3) {
    advice.push("感情需要耐心，多沟通避免误解");
  }
  
  if (lifeAreas.wealth >= 0.7) {
    advice.push("财运亨通，可以考虑投资理财");
  } else if (lifeAreas.wealth <= 0.3) {
    advice.push("财务需谨慎，避免冲动消费");
  }
  
  return advice.join("；") + "。";
}

// 获取日期范围
function getDateRange(period: string): string {
  const today = new Date();
  
  switch (period) {
    case "today":
      return today.toISOString().split('T')[0];
    case "tomorrow":
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    case "week":
      const endOfWeek = new Date(today);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      return `${today.toISOString().split('T')[0]} - ${endOfWeek.toISOString().split('T')[0]}`;
    case "month":
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return `${today.toISOString().split('T')[0]} - ${endOfMonth.toISOString().split('T')[0]}`;
    default:
      return today.toISOString().split('T')[0];
  }
}