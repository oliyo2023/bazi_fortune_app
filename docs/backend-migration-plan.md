# 八字算命应用后端API迁移到Cloudflare Workers + Supabase方案

## 架构概述

本方案将八字算命应用后端API迁移到Cloudflare Workers，同时使用Supabase提供的PostgreSQL作为数据存储，利用Cloudflare的连接池功能优化数据库连接。

## 技术栈

- **运行时**: Cloudflare Workers (V8 isolates)
- **语言**: TypeScript/JavaScript
- **数据库**: Supabase PostgreSQL
- **ORM**: Prisma (支持Cloudflare Workers)
- **认证**: Supabase Auth + JWT
- **缓存**: Cloudflare KV (可选)

## 项目结构

```
workers-api/
├── src/
│   ├── index.ts          # 入口文件
│   ├── handlers/         # API处理器
│   │   ├── auth.ts       # 认证相关
│   │   ├── bazi.ts       # 八字计算
│   │   ├── ai.ts         # AI分析
│   │   └── user.ts       # 用户管理
│   ├── lib/              # 工具库
│   │   ├── db.ts         # 数据库连接
│   │   ├── auth.ts       # 认证工具
│   │   └── bazi.ts       # 八字计算逻辑
│   ├── types/            # 类型定义
│   │   └── index.ts
│   └── middleware/       # 中间件
│       ├── cors.ts
│       └── auth.ts
├── prisma/
│   └── schema.prisma     # 数据库模型
├── wrangler.toml         # Cloudflare Workers配置
├── package.json
└── tsconfig.json
```

## 数据库配置

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  
  baziData  BaziData[]
  orders    Order[]
  
  @@map("users")
}

model BaziData {
  id         String   @id @default(cuid())
  userId     String
  inputData  Json     // 八字输入数据
  resultData Json     // 八字计算结果
  analysis   String?  // AI分析结果
  createdAt  DateTime @default(now())
  
  user       User     @relation(fields: [userId], references: [id])
  
  @@map("bazi_data")
}

model Order {
  id         String      @id @default(cuid())
  userId     String
  type       OrderType
  amount     Decimal
  status     OrderStatus @default(PENDING)
  createdAt  DateTime    @default(now())
  
  user       User        @relation(fields: [userId], references: [id])
  
  @@map("orders")
}

enum Role {
  USER
  MASTER
  ADMIN
}

enum OrderType {
  CONSULTATION
  ANALYSIS
  MEMBERSHIP
}

enum OrderStatus {
  PENDING
  COMPLETED
  CANCELLED
}
```

### Cloudflare Workers配置

```toml
# wrangler.toml
name = "bazi-fortune-api"
main = "src/index.ts"
compatibility_date = "2023-06-20"

[env.production.vars]
DATABASE_URL = "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
JWT_SECRET = "[YOUR-JWT-SECRET]"
DEEPSEEK_API_KEY = "[YOUR-DEEPSEEK-API-KEY]"
OPENAI_API_KEY = "[YOUR-OPENAI-API-KEY]"

# 配置Supabase连接池
[[env.production.d1_databases]]
binding = "DB"
database_name = "bazi-fortune-db"
database_id = "[YOUR-DATABASE-ID]"

# KV存储（用于缓存）
[[env.production.kv_namespaces]]
binding = "CACHE"
id = "[YOUR-KV-NAMESPACE-ID]"
```

## 核心代码实现

### 数据库连接

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client/edge';
import { PrismaD1 } from '@prisma/adapter-d1';

let prisma: PrismaClient;

export function getPrismaClient(env: Env) {
  if (!prisma) {
    const adapter = new PrismaD1(env.DB);
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}
```

### 八字计算逻辑

```typescript
// src/lib/bazi.ts
export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: 'male' | 'female';
  name?: string;
  timezone?: string;
}

export interface BaziResult {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  dayMaster: string;
  zodiac: string;
  nayin: string;
  season: string;
  solarTerms: string[];
  lunarDate: string;
  fiveElements: Record<string, number>;
  shiShen: Record<string, string>;
  yongShen: string[];
  xiShen: string[];
  jiShen: string[];
  luckyElements: string[];
  colors: string[];
  numbers: number[];
  directions: string[];
}

export function calculateBaziResult(input: BaziInput): BaziResult {
  // 天干地支数组
  const tianGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const diZhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  // 生肖数组
  const zodiac = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];

  // 简化的八字计算（实际应使用专业的农历转换库）
  const yearIndex = (input.year - 4) % 60;
  const yearTianGan = tianGan[yearIndex % 10];
  const yearDiZhi = diZhi[yearIndex % 12];

  const monthIndex = (input.month - 1 + yearIndex * 12) % 60;
  const monthTianGan = tianGan[monthIndex % 10];
  const monthDiZhi = diZhi[monthIndex % 12];

  const dayIndex = (input.year * 365 + input.month * 30 + input.day) % 60;
  const dayTianGan = tianGan[dayIndex % 10];
  const dayDiZhi = diZhi[dayIndex % 12];

  const hourIndex = (Math.floor(input.hour / 2) + dayIndex * 12) % 60;
  const hourTianGan = tianGan[hourIndex % 10];
  const hourDiZhi = diZhi[hourIndex % 12];

  return {
    yearPillar: yearTianGan + yearDiZhi,
    monthPillar: monthTianGan + monthDiZhi,
    dayPillar: dayTianGan + dayDiZhi,
    hourPillar: hourTianGan + hourDiZhi,
    dayMaster: dayTianGan,
    zodiac: zodiac[(input.year - 4) % 12],
    nayin: "海中金", // 简化处理
    season: getSeason(input.month),
    solarTerms: ["立春", "雨水"], // 简化处理
    lunarDate: "农历正月初一", // 简化处理，实际需要转换
    fiveElements: {
      "木": 2,
      "火": 1,
      "土": 2,
      "金": 2,
      "水": 1,
    },
    shiShen: {
      "年": "正官",
      "月": "偏财",
      "日": "日主",
      "时": "食神",
    },
    yongShen: ["水", "木"],
    xiShen: ["金"],
    jiShen: ["火", "土"],
    luckyElements: ["水", "木", "金"],
    colors: ["黑色", "蓝色", "绿色", "白色"],
    numbers: [1, 6, 3, 8, 4, 9],
    directions: ["北方", "东方", "西方"],
  };
}

function getSeason(month: number): string {
  switch (true) {
    case month >= 3 && month <= 5:
      return "春季";
    case month >= 6 && month <= 8:
      return "夏季";
    case month >= 9 && month <= 11:
      return "秋季";
    default:
      return "冬季";
  }
}
```

### 认证中间件

```typescript
// src/middleware/auth.ts
import { Context } from 'hono';

export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  DEEPSEEK_API_KEY: string;
  OPENAI_API_KEY: string;
  DB: D1Database;
  CACHE: KVNamespace;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function authMiddleware(c: Context, next: () => Promise<void>) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, message: 'Missing or invalid authorization header' }, 401);
  }
  
  const token = authHeader.substring(7);
  
  try {
    const payload = await verifyJWT(token, c.env.JWT_SECRET) as JWTPayload;
    c.set('userId', payload.userId);
    c.set('userRole', payload.role);
    await next();
  } catch (error) {
    return c.json({ success: false, message: 'Invalid token' }, 401);
  }
}

async function verifyJWT(token: string, secret: string): Promise<any> {
  // 实现JWT验证逻辑
  // 可以使用类似jsonwebtoken的库，或者自己实现
  const [header, payload, signature] = token.split('.');
  
  // 验证签名
  const expectedSignature = await sign(`${header}.${payload}`, secret);
  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }
  
  // 解析payload
  return JSON.parse(atob(payload));
}

async function sign(data: string, secret: string): Promise<string> {
  // 实现签名逻辑
  // 可以使用Web Crypto API
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}
```

### 八字API处理器

```typescript
// src/handlers/bazi.ts
import { Context } from 'hono';
import { calculateBaziResult, BaziInput } from '../lib/bazi';
import { getPrismaClient } from '../lib/db';

export const calculateBazi = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json() as BaziInput;
    
    // 验证输入
    if (!body.year || !body.month || !body.day || !body.hour || !body.gender) {
      return c.json({ success: false, message: 'Missing required fields' }, 400);
    }
    
    // 计算八字结果
    const result = calculateBaziResult(body);
    
    // 保存到数据库
    const prisma = getPrismaClient(c.env);
    const baziData = await prisma.baziData.create({
      data: {
        userId,
        inputData: body,
        resultData: result,
      },
    });
    
    return c.json({
      success: true,
      message: 'Bazi calculation completed',
      data: baziData,
      result,
    });
  } catch (error) {
    console.error('Error calculating bazi:', error);
    return c.json({ success: false, message: 'Internal server error' }, 500);
  }
};

export const getBaziHistory = async (c: Context) => {
  try {
    const userId = c.get('userId');
    
    const prisma = getPrismaClient(c.env);
    const baziRecords = await prisma.baziData.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    return c.json({
      success: true,
      data: baziRecords,
    });
  } catch (error) {
    console.error('Error fetching bazi history:', error);
    return c.json({ success: false, message: 'Internal server error' }, 500);
  }
};

export const getBaziDetail = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const baziId = c.req.param('id');
    
    const prisma = getPrismaClient(c.env);
    const baziData = await prisma.baziData.findFirst({
      where: { 
        id: baziId,
        userId, // 确保用户只能访问自己的数据
      },
    });
    
    if (!baziData) {
      return c.json({ success: false, message: 'Bazi record not found' }, 404);
    }
    
    return c.json({
      success: true,
      data: baziData,
    });
  } catch (error) {
    console.error('Error fetching bazi detail:', error);
    return c.json({ success: false, message: 'Internal server error' }, 500);
  }
};
```

### AI分析处理器

```typescript
// src/handlers/ai.ts
import { Context } from 'hono';
import { getPrismaClient } from '../lib/db';

export const analyzeBazi = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const { baziId, language = 'zh' } = await c.req.json();
    
    // 获取八字数据
    const prisma = getPrismaClient(c.env);
    const baziData = await prisma.baziData.findFirst({
      where: { 
        id: baziId,
        userId, // 确保用户只能分析自己的数据
      },
    });
    
    if (!baziData) {
      return c.json({ success: false, message: 'Bazi record not found' }, 404);
    }
    
    // 调用AI API进行分析
    const analysis = await callDeepSeekAPI(baziData.inputData, baziData.resultData, language, c.env.DEEPSEEK_API_KEY);
    
    // 更新分析结果
    await prisma.baziData.update({
      where: { id: baziId },
      data: { analysis },
    });
    
    return c.json({
      success: true,
      message: 'AI analysis completed',
      analysis,
    });
  } catch (error) {
    console.error('Error analyzing bazi:', error);
    return c.json({ success: false, message: 'Internal server error' }, 500);
  }
};

async function callDeepSeekAPI(inputData: any, resultData: any, language: string, apiKey: string): Promise<string> {
  // 构建提示词
  const prompt = buildPrompt(inputData, resultData, language);
  
  // 调用DeepSeek API
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(language),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

function buildPrompt(inputData: any, resultData: any, language: string): string {
  if (language === 'en') {
    return `Please analyze the following Bazi (Chinese astrology) chart:

Birth Information:
- Date: ${inputData.year}-${inputData.month.toString().padStart(2, '0')}-${inputData.day.toString().padStart(2, '0')} ${inputData.hour.toString().padStart(2, '0')}:${inputData.minute.toString().padStart(2, '0')}
- Gender: ${inputData.gender}
- Name: ${inputData.name || 'N/A'}

Bazi Chart:
- Year Pillar: ${resultData.yearPillar}
- Month Pillar: ${resultData.monthPillar}
- Day Pillar: ${resultData.dayPillar}
- Hour Pillar: ${resultData.hourPillar}
- Day Master: ${resultData.dayMaster}
- Zodiac: ${resultData.zodiac}
- Nayin: ${resultData.nayin}
- Season: ${resultData.season}

Five Elements Distribution:
- Wood: ${resultData.fiveElements['木']}, Fire: ${resultData.fiveElements['火']}, Earth: ${resultData.fiveElements['土']}, Metal: ${resultData.fiveElements['金']}, Water: ${resultData.fiveElements['水']}

Please provide a comprehensive analysis covering:
1. Personality traits and characteristics
2. Career and wealth prospects
3. Relationships and marriage
4. Health considerations
5. Lucky elements, colors, numbers, and directions
6. Life advice and recommendations

Please write in English and provide detailed explanations.`;
  }

  return `请分析以下八字命盘：

出生信息：
- 出生日期：${inputData.year}年${inputData.month}月${inputData.day}日 ${inputData.hour}时${inputData.minute}分
- 性别：${inputData.gender}
- 姓名：${inputData.name || 'N/A'}

八字排盘：
- 年柱：${resultData.yearPillar}
- 月柱：${resultData.monthPillar}
- 日柱：${resultData.dayPillar}
- 时柱：${resultData.hourPillar}
- 日主：${resultData.dayMaster}
- 生肖：${resultData.zodiac}
- 纳音：${resultData.nayin}
- 季节：${resultData.season}

五行分布：
- 木：${resultData.fiveElements['木']}个，火：${resultData.fiveElements['火']}个，土：${resultData.fiveElements['土']}个，金：${resultData.fiveElements['金']}个，水：${resultData.fiveElements['水']}个

请提供全面的命理分析，包括：
1. 性格特点和个性分析
2. 事业财运发展趋势
3. 感情婚姻状况
4. 健康注意事项
5. 有利的五行、颜色、数字、方位
6. 人生建议和改运方法

请用中文详细分析，字数在3000字以上。`;
}

function getSystemPrompt(language: string): string {
  if (language === 'en') {
    return `You are a professional Chinese astrology (Bazi) master with deep knowledge of traditional Chinese metaphysics. You specialize in analyzing Bazi charts and providing insightful, accurate, and helpful interpretations. Your analysis should be comprehensive, detailed, and practical, helping people understand their destiny and make better life decisions.`;
  }

  return `你是一位专业的八字命理大师，精通中华传统玄学文化，擅长分析八字命盘并提供准确、有用的解读。你的分析应该全面、详细、实用，帮助人们了解自己的命运并做出更好的人生决策。请用专业而通俗易懂的语言进行分析。`;
}
```

### 主入口文件

```typescript
// src/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { authMiddleware, Env } from './middleware/auth';
import { calculateBazi, getBaziHistory, getBaziDetail } from './handlers/bazi';
import { analyzeBazi } from './handlers/ai';
import { login, register, getProfile } from './handlers/auth';

const app = new Hono<{ Bindings: Env }>();

// 中间件
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// 公开路由
app.post('/api/v1/auth/login', login);
app.post('/api/v1/auth/register', register);

// 需要认证的路由
app.use('/api/v1/*', authMiddleware);

// 八字相关路由
app.post('/api/v1/bazi/calculate', calculateBazi);
app.get('/api/v1/bazi/history', getBaziHistory);
app.get('/api/v1/bazi/:id', getBaziDetail);

// AI分析路由
app.post('/api/v1/ai/analyze', analyzeBazi);

// 用户相关路由
app.get('/api/v1/user/profile', getProfile);

// 健康检查
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404处理
app.notFound((c) => {
  return c.json({ success: false, message: 'API endpoint not found' }, 404);
});

// 错误处理
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ success: false, message: 'Internal server error' }, 500);
});

export default app;
```

## 部署步骤

### 1. 初始化项目

```bash
# 创建新目录
mkdir bazi-workers-api
cd bazi-workers-api

# 初始化npm项目
npm init -y

# 安装依赖
npm install hono @hono/node-server prisma @prisma/client
npm install -D wrangler typescript @types/node ts-node
```

### 2. 配置Prisma

```bash
# 初始化Prisma
npx prisma init

# 生成Prisma客户端
npx prisma generate

# 推送数据库架构到Supabase
npx prisma db push
```

### 3. 部署到Cloudflare Workers

```bash
# 登录Cloudflare
npx wrangler login

# 部署
npx wrangler deploy
```

## 性能优化建议

1. **使用Cloudflare KV缓存八字计算结果**
   ```typescript
   // 在calculateBazi函数中添加缓存逻辑
   const cacheKey = `bazi:${JSON.stringify(body)}`;
   const cachedResult = await c.env.CACHE.get(cacheKey);
   
   if (cachedResult) {
     return c.json({
       success: true,
       message: 'Bazi calculation completed (from cache)',
       result: JSON.parse(cachedResult),
     });
   }
   
   // 计算完成后缓存结果
   await c.env.CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 86400 }); // 24小时
   ```

2. **使用Cloudflare D1作为缓存层**
   ```typescript
   // 创建缓存表
   // 在Prisma schema中添加
   model BaziCache {
     id       String   @id @default(cuid())
     input    Json     @unique
     result   Json
     ttl      DateTime
     createdAt DateTime @default(now())
     
     @@map("bazi_cache")
   }
   ```

3. **实现请求限流**
   ```typescript
   // 在authMiddleware中添加限流逻辑
   const clientId = c.req.header('CF-Connecting-IP') || 'unknown';
   const limit = 100; // 每分钟100次请求
   const window = 60; // 60秒窗口
   
   const current = await c.env.CACHE.get(`rate_limit:${clientId}`);
   const count = current ? parseInt(current) : 0;
   
   if (count >= limit) {
     return c.json({ success: false, message: 'Rate limit exceeded' }, 429);
   }
   
   await c.env.CACHE.put(`rate_limit:${clientId}`, (count + 1).toString(), { expirationTtl: window });
   ```

## 监控与日志

1. **使用Cloudflare Analytics**
   - 在Cloudflare Dashboard中查看请求统计
   - 监控错误率和响应时间

2. **实现自定义日志**
   ```typescript
   // 在app.onError中添加日志记录
   app.onError((err, c) => {
     console.error('Unhandled error:', err);
     
     // 记录错误到外部服务（如Sentry）
     fetch('https://api.sentry.io/api/0/projects/PROJECT_ID/environments/ENVIRONMENT_ID/events/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer YOUR_SENTRY_AUTH_TOKEN',
       },
       body: JSON.stringify({
         message: err.message,
         stack: err.stack,
         request: {
           url: c.req.url,
           method: c.req.method,
           headers: c.req.header(),
         },
       }),
     });
     
     return c.json({ success: false, message: 'Internal server error' }, 500);
   });
   ```

## 总结

这个方案将八字算命应用后端API迁移到Cloudflare Workers，同时使用Supabase PostgreSQL作为数据存储。主要优势包括：

1. **全球低延迟**：Cloudflare Workers在全球200+地点部署，显著降低访问延迟
2. **自动扩展**：无需管理服务器，根据请求量自动扩展
3. **成本效益**：按请求计费，适合流量波动大的应用
4. **数据安全**：Supabase提供安全的PostgreSQL数据库服务
5. **开发效率**：使用TypeScript和Prisma提供类型安全的开发体验

通过这个方案，您的八字算命应用将能够为全球用户提供更快、更可靠的服务。