import { Context, Next } from "hono";
import { Env, Variables } from "../lib/auth";

interface RateLimitOptions {
  windowMs?: number; // 时间窗口（毫秒）
  max?: number; // 最大请求数
  message?: string; // 限流消息
  skipSuccessfulRequests?: boolean; // 跳过成功请求
  skipFailedRequests?: boolean; // 跳过失败请求
  keyGenerator?: (c: Context) => string; // 自定义键生成器
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export const rateLimit = (options: RateLimitOptions = {}) => {
  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    const {
      windowMs = 60 * 1000, // 默认1分钟
      max = 100, // 默认100次
      message = "Too many requests, please try again later.",
      skipSuccessfulRequests = false,
      skipFailedRequests = false,
      keyGenerator = defaultKeyGenerator,
    } = options;

    // 生成限流键
    const key = `rate_limit:${keyGenerator(c)}`;

    try {
      // 获取当前记录
      const current = c.env.CACHE ? await c.env.CACHE.get(key) : null;
      const now = Date.now();
      let record: RateLimitRecord;

      if (current) {
        record = JSON.parse(current);

        // 检查是否需要重置
        if (now > record.resetTime) {
          record = {
            count: 0,
            resetTime: now + windowMs,
          };
        }
      } else {
        record = {
          count: 0,
          resetTime: now + windowMs,
        };
      }

      // 增加计数
      record.count++;

      // 保存更新的记录
      if (c.env.CACHE) {
        await c.env.CACHE.put(key, JSON.stringify(record), {
          expirationTtl: Math.ceil(windowMs / 1000) + 1,
        });
      }

      // 设置响应头
      c.header("X-RateLimit-Limit", max.toString());
      c.header(
        "X-RateLimit-Remaining",
        Math.max(0, max - record.count).toString(),
      );
      c.header(
        "X-RateLimit-Reset",
        Math.ceil(record.resetTime / 1000).toString(),
      );

      // 检查是否超过限制
      if (record.count > max) {
        c.header(
          "Retry-After",
          Math.ceil((record.resetTime - now) / 1000).toString(),
        );
        return c.json(
          {
            error: "Rate limit exceeded",
            message,
            resetTime: record.resetTime,
            windowMs,
            max,
          },
          429,
        );
      }

      // 继续处理请求
      await next();

      // 根据配置跳过某些请求
      if (skipSuccessfulRequests && c.res.status < 400) {
        record.count--;
        if (c.env.CACHE) {
          if (c.env.CACHE) {
            await c.env.CACHE.put(key, JSON.stringify(record), {
              expirationTtl: Math.ceil(windowMs / 1000) + 1,
            });
          }
        }
      }

      if (skipFailedRequests && c.res.status >= 400) {
        record.count--;
        await c.env.CACHE.put(key, JSON.stringify(record), {
          expirationTtl: Math.ceil(windowMs / 1000) + 1,
        });
      }
    } catch (error) {
      console.error("Rate limit error:", error);
      // 限流错误不应影响正常请求
      await next();
    }
  };
};

// 默认键生成器
function defaultKeyGenerator(c: Context): string {
  const ip =
    c.req.header("CF-Connecting-IP") ||
    c.req.header("X-Forwarded-For") ||
    c.req.header("X-Real-IP") ||
    "unknown";

  const userAgent = c.req.header("User-Agent") || "";
  const path = c.req.path;

  // 基于IP、路径和用户代理生成唯一键
  return `${ip}:${path}:${hashString(userAgent.substring(0, 50))}`;
}

// 基于用户的限流
export const userRateLimit = (
  options: Omit<RateLimitOptions, "keyGenerator"> = {},
) => {
  return rateLimit({
    ...options,
    keyGenerator: (c) => {
      const userId = c.get("userId") || "anonymous";
      return `user:${userId}:${c.req.path}`;
    },
  });
};

// 基于IP的限流
export const ipRateLimit = (
  options: Omit<RateLimitOptions, "keyGenerator"> = {},
) => {
  return rateLimit({
    ...options,
    keyGenerator: (c) => {
      const ip =
        c.req.header("CF-Connecting-IP") ||
        c.req.header("X-Forwarded-For") ||
        c.req.header("X-Real-IP") ||
        "unknown";
      return `ip:${ip}:${c.req.path}`;
    },
  });
};

// 严格的API限流（用于敏感操作）
export const strictRateLimit = (options: RateLimitOptions = {}) => {
  return rateLimit({
    windowMs: 60 * 1000, // 1分钟
    max: 10, // 最多10次
    ...options,
  });
};

// 上传文件限流
export const uploadRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1分钟
  max: 5, // 最多5次上传
  message: "Upload limit exceeded. Please wait before uploading again.",
});

// 登录限流
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 5, // 最多5次登录尝试
  message: "Too many login attempts. Please try again later.",
  keyGenerator: async (c) => {
    const ip = c.req.header("CF-Connecting-IP") || "unknown";
    const email = c.req.raw?.body
      ? JSON.parse(await c.req.raw.clone().text()).email
      : "";
    return `login:${ip}:${email}`;
  },
});

// 注册限流
export const registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1小时
  max: 3, // 最多3次注册
  message: "Registration limit exceeded. Please try again later.",
  keyGenerator: (c) => {
    const ip = c.req.header("CF-Connecting-IP") || "unknown";
    return `register:${ip}`;
  },
});

// 八字计算限流
export const baziRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1分钟
  max: 20, // 最多20次计算
  message: "Bazi calculation limit exceeded. Please wait before trying again.",
  keyGenerator: (c) => {
    const userId = c.get("userId") || "anonymous";
    return `bazi:${userId}`;
  },
});

// API密钥限流
export const apiKeyRateLimit = (
  options: Omit<RateLimitOptions, "keyGenerator"> = {},
) => {
  return rateLimit({
    ...options,
    keyGenerator: (c) => {
      const apiKey = c.req.header("X-API-Key") || "none";
      return `api_key:${apiKey}:${c.req.path}`;
    },
  });
};

// 字符串哈希函数
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash).toString(36);
}

// 限流统计信息
export const getRateLimitStats = async (
  c: Context<{ Bindings: Env }>,
  pattern: string,
) => {
  try {
    if (!c.env.CACHE) {
      return { totalKeys: 0, keys: [] };
    }
    const list = await c.env.CACHE.list({ prefix: `rate_limit:${pattern}` });

    const stats = {
      totalKeys: list.keys.length,
      keys: list.keys.map((key) => ({
        name: key.name,
        expiration: key.expiration,
      })),
    };

    return stats;
  } catch (error) {
    console.error("Get rate limit stats error:", error);
    throw error;
  }
};

// 清除特定用户的限流记录
export const clearUserRateLimit = async (
  c: Context<{ Bindings: Env }>,
  userId: string,
) => {
  try {
    const pattern = `rate_limit:user:${userId}:`;
    if (!c.env.CACHE) {
      return { success: false, cleared: 0 };
    }
    const list = await c.env.CACHE.list({ prefix: pattern });
    const deletePromises = list.keys.map((key) =>
      c.env.CACHE!.delete(key.name),
    );
    await Promise.all(deletePromises);

    return { success: true, cleared: list.keys.length };
  } catch (error) {
    console.error("Clear user rate limit error:", error);
    throw error;
  }
};
