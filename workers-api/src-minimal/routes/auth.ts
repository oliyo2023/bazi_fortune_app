import { Hono } from 'hono';
import { verifyJWT, generateJWT, JWTPayload } from '../lib/auth';
import { getPrismaClient } from '../lib/db';
import { Env, Variables } from '../lib/auth';

export const authRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// 注册
authRoutes.post('/register', async (c) => {
  try {
    const { email, username, password } = await c.req.json();

    if (!email || !username || !password) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const prisma = getPrismaClient(c.env);

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return c.json({ error: 'User already exists' }, 409);
    }

    // 哈希密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: 'USER'
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true
      }
    });

    // 生成JWT
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const token = await generateJWT(payload, c.env.JWT_SECRET);

    return c.json({
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// 登录
authRoutes.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Missing email or password' }, 400);
    }

    const prisma = getPrismaClient(c.env);

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // 验证密码
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // 生成JWT
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const token = await generateJWT(payload, c.env.JWT_SECRET);

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// 认证中间件
export async function authMiddleware(c: any, next: any) {
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

// 密码哈希
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode('pepper'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const saltedPassword = new Uint8Array(salt.length + data.length);
  saltedPassword.set(salt);
  saltedPassword.set(data, salt.length);

  const signature = await crypto.subtle.sign('HMAC', key, saltedPassword);

  const combined = new Uint8Array(salt.length + signature.byteLength);
  combined.set(salt);
  combined.set(new Uint8Array(signature), salt.length);

  return btoa(String.fromCharCode(...combined));
}

// 密码验证
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const combined = new Uint8Array(
      ...atob(hashedPassword).split('').map(char => char.charCodeAt(0))
    );

    const salt = combined.slice(0, 16);
    const storedHash = combined.slice(16);

    const data = encoder.encode(password);
    const saltedPassword = new Uint8Array(salt.length + data.length);
    saltedPassword.set(salt);
    saltedPassword.set(data, salt.length);

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode('pepper'),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, saltedPassword);

    if (signature.byteLength !== storedHash.length) {
      return false;
    }

    const signatureArray = new Uint8Array(signature);
    for (let i = 0; i < signature.byteLength; i++) {
      if (signatureArray[i] !== storedHash[i]) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}
