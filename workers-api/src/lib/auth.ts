export interface Env {
  DATABASE_URL?: string;
  JWT_SECRET: string;
  DEEPSEEK_API_KEY: string;
  OPENAI_API_KEY?: string;
  DB?: D1Database;
  CACHE?: KVNamespace;

  // 支付相关
  STRIPE_SECRET_KEY?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  ALIPAY_APP_ID?: string;
  ALIPAY_PRIVATE_KEY?: string;
  ALIPAY_PUBLIC_KEY?: string;

  // 邮件相关
  SENDGRID_API_KEY?: string;
  SENDGRID_FROM_EMAIL?: string;
  CLOUDFLARE_EMAIL_FROM?: string;

  // Cloudflare 服务
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_API_TOKEN?: string;
  R2_ACCOUNT_ID?: string;

  // R2 存储
  AVATAR_BUCKET?: R2Bucket;

  // 应用配置
  API_URL?: string;
  FRONTEND_URL?: string;
}

// Hono 类型扩展
export interface Variables {
  userId: string;
  userRole: string;
}

export interface JWTPayload {
  userId: string;
  phone: string;
  role: string;
}

// 生成JWT
export async function generateJWT(
  payload: JWTPayload,
  secret: string,
): Promise<string> {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));

  const signature = await sign(`${encodedHeader}.${encodedPayload}`, secret);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// 验证JWT
export async function verifyJWT(
  token: string,
  secret: string,
): Promise<JWTPayload> {
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  // 验证签名
  const expectedSignature = await sign(
    `${encodedHeader}.${encodedPayload}`,
    secret,
  );
  if (signature !== expectedSignature) {
    throw new Error("Invalid signature");
  }

  // 解析payload
  const payload = JSON.parse(base64urlDecode(encodedPayload));

  // 检查过期时间（如果有）
  if (payload.exp && Date.now() >= payload.exp * 1000) {
    throw new Error("Token expired");
  }

  return payload;
}

// 使用HMAC-SHA256签名
async function sign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return base64urlEncode(new Uint8Array(signature));
}

// Base64URL编码
function base64urlEncode(str: string | Uint8Array): string {
  if (typeof str === "string") {
    str = new TextEncoder().encode(str);
  }
  return btoa(String.fromCharCode(...str))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Base64URL解码
function base64urlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return atob(str);
}
