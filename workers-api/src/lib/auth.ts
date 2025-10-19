export interface Env {
  DATABASE_URL?: string;
  JWT_SECRET: string;
  DEEPSEEK_API_KEY: string;
  OPENAI_API_KEY?: string;
  DB?: D1Database;
  CACHE?: KVNamespace;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

// 生成JWT
export async function generateJWT(payload: JWTPayload, secret: string): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  
  const signature = await sign(`${encodedHeader}.${encodedPayload}`, secret);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// 验证JWT
export async function verifyJWT(token: string, secret: string): Promise<JWTPayload> {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  
  // 验证签名
  const expectedSignature = await sign(`${encodedHeader}.${encodedPayload}`, secret);
  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }
  
  // 解析payload
  const payload = JSON.parse(base64urlDecode(encodedPayload));
  
  // 检查过期时间（如果有）
  if (payload.exp && Date.now() >= payload.exp * 1000) {
    throw new Error('Token expired');
  }
  
  return payload;
}

// 使用HMAC-SHA256签名
async function sign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return base64urlEncode(new Uint8Array(signature));
}

// Base64URL编码
function base64urlEncode(str: string | Uint8Array): string {
  if (typeof str === 'string') {
    str = new TextEncoder().encode(str);
  }
  return btoa(String.fromCharCode(...str))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Base64URL解码
function base64urlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}