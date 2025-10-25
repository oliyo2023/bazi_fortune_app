import { Context, Next } from "hono";
import { Env, Variables } from "../lib/auth";

interface CacheOptions {
  ttl?: number; // 缓存时间（秒）
  key?: string; // 自定义缓存键
  vary?: string[]; // 根据请求头变化的缓存
  condition?: (c: Context) => boolean; // 缓存条件
}

// 缓存中间件
export const cache = (options: CacheOptions = {}) => {
  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    // 只缓存GET请求
    if (c.req.method !== "GET") {
      return next();
    }

    // 检查缓存条件
    if (options.condition && !options.condition(c)) {
      return next();
    }

    // 生成缓存键
    const cacheKey = generateCacheKey(c, options);

    try {
      // 尝试从KV获取缓存
      const cached = c.env.CACHE ? await c.env.CACHE.get(cacheKey) : null;

      if (cached) {
        const data = JSON.parse(cached);

        // 设置缓存头
        c.header("X-Cache", "HIT");
        c.header(
          "X-Cache-Age",
          Math.floor((Date.now() - data.timestamp) / 1000).toString(),
        );

        return c.json(data.response, data.status);
      }

      // 缓存未命中，继续处理请求
      c.header("X-Cache", "MISS");
      await next();

      // 只缓存成功响应
      if (c.res.status < 400) {
        const response = await c.res.clone().json();
        const ttl = options.ttl || 300; // 默认5分钟

        // 保存到KV
        if (c.env.CACHE) {
          await c.env.CACHE.put(
            cacheKey,
            JSON.stringify({
              response,
              status: c.res.status,
              timestamp: Date.now(),
            }),
            { expirationTtl: ttl },
          );
        }
      }
    } catch (error) {
      console.error("Cache error:", error);
      // 缓存错误不应影响正常请求
      await next();
    }
  };
};

// 生成缓存键
function generateCacheKey(c: Context, options: CacheOptions): string {
  if (options.key) {
    return options.key;
  }

  const url = new URL(c.req.url);
  const path = url.pathname;
  const search = url.search;

  // 基础键
  let cacheKey = `cache:${path}${search}`;

  // 根据请求头变化
  if (options.vary) {
    const varyHeaders = options.vary
      .map((header) => `${header}:${c.req.header(header) || ""}`)
      .join("|");
    cacheKey += `|vary:${varyHeaders}`;
  }

  return cacheKey;
}

// 清除缓存
export const clearCache = async (
  c: Context<{ Bindings: Env }>,
  pattern: string,
) => {
  try {
    if (!c.env.CACHE) {
      throw new Error("CACHE not available");
    }
    const list = await c.env.CACHE.list({ prefix: pattern });
    const deletePromises = list.keys.map((key) =>
      c.env.CACHE!.delete(key.name),
    );
    await Promise.all(deletePromises);

    return { success: true, deleted: list.keys.length };
  } catch (error) {
    console.error("Clear cache error:", error);
    throw error;
  }
};

// 缓存装饰器 - 用于特定的缓存逻辑
export const cacheWithParams = (
  keyGenerator: (c: Context) => string,
  options: Omit<CacheOptions, "key"> = {},
) => {
  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    const cacheOptions = { ...options, key: keyGenerator(c) };
    return cache(cacheOptions)(c, next);
  };
};

// 用户相关缓存
export const userCache = (ttl: number = 300) => {
  return cacheWithParams((c) => `user:${c.get("userId")}:${c.req.path}`, {
    ttl,
  });
};

// 八字结果缓存（较长时间）
export const baziCache = (ttl: number = 86400) => {
  // 24小时
  return cacheWithParams(
    (c) => {
      const body = c.req.raw.clone();
      return body.text().then((text) => {
        const input = JSON.parse(text);
        const hash = hashObject(input);
        return `bazi:${hash}`;
      });
    },
    { ttl },
  );
};

// 对象哈希函数
function hashObject(obj: any): string {
  const str = JSON.stringify(obj, Object.keys(obj).sort());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash).toString(36);
}

// 分页缓存辅助函数
export const paginationCache = (baseKey: string, ttl: number = 300) => {
  return cacheWithParams(
    (c) => {
      const page = c.req.query("page") || "1";
      const limit = c.req.query("limit") || "10";
      return `${baseKey}:page:${page}:limit:${limit}`;
    },
    { ttl },
  );
};

// 条件缓存 - 根据用户角色
export const roleBasedCache = (options: CacheOptions = {}) => {
  return cacheWithParams((c) => {
    const role = c.get("userRole") || "anonymous";
    const path = c.req.path;
    return Promise.resolve(`role:${role}:${path}`);
  }, options);
};
