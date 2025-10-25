import { Hono } from "hono";
import { getPrismaClient } from "../lib/db";
import { generateJWT, verifyJWT, JWTPayload } from "../lib/auth";

export const authRoutes = new Hono();

// 注册
authRoutes.post("/register", async (c) => {
  try {
    const { phone, username, password } = await c.req.json();

    if (!phone || !username || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const prisma = getPrismaClient(c.env);

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      return c.json({ error: "User already exists" }, 409);
    }

    // 哈希密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        phone,
        username,
        password: hashedPassword,
        role: "USER",
      },
      select: {
        id: true,
        phone: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    // 生成JWT
    const payload: JWTPayload = {
      userId: user.id,
      phone: user.phone,
      role: user.role,
    };

    const token = await generateJWT(payload, c.env.JWT_SECRET);

    return c.json({
      user,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ error: "Registration failed" }, 500);
  }
});

// 登录
authRoutes.post("/login", async (c) => {
  try {
    const { phone, password } = await c.req.json();

    if (!phone || !password) {
      return c.json({ error: "Missing phone or password" }, 400);
    }

    const prisma = getPrismaClient(c.env);

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // 验证密码
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // 生成JWT
    const payload: JWTPayload = {
      userId: user.id,
      phone: user.phone,
      role: user.role,
    };

    const token = await generateJWT(payload, c.env.JWT_SECRET);

    return c.json({
      user: {
        id: user.id,
        phone: user.phone,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// 刷新令牌
authRoutes.post("/refresh", async (c) => {
  try {
    const authorization = c.req.header("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return c.json({ error: "Missing or invalid token" }, 401);
    }

    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c.env.JWT_SECRET);

    const prisma = getPrismaClient(c.env);

    // 获取最新用户信息
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // 生成新的JWT
    const newPayload: JWTPayload = {
      userId: user.id,
      phone: user.phone,
      role: user.role,
    };

    const newToken = await generateJWT(newPayload, c.env.JWT_SECRET);

    return c.json({
      user: {
        id: user.id,
        phone: user.phone,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
      token: newToken,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return c.json({ error: "Token refresh failed" }, 401);
  }
});

// 获取用户信息
authRoutes.get("/profile", async (c) => {
  try {
    const authorization = c.req.header("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return c.json({ error: "Missing or invalid token" }, 401);
    }

    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c.env.JWT_SECRET);

    const prisma = getPrismaClient(c.env);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        phone: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    return c.json({ error: "Failed to get profile" }, 500);
  }
});

// 密码哈希
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode("pepper"), // 在实际应用中应使用环境变量
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const saltedPassword = new Uint8Array(salt.length + data.length);
  saltedPassword.set(salt);
  saltedPassword.set(data, salt.length);

  const signature = await crypto.subtle.sign("HMAC", key, saltedPassword);

  // 组合salt和哈希值
  const combined = new Uint8Array(salt.length + signature.byteLength);
  combined.set(salt);
  combined.set(new Uint8Array(signature), salt.length);

  return btoa(String.fromCharCode(...combined));
}

// 密码验证
async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const combined = new Uint8Array(
      Array.from(atob(hashedPassword)).map((char) => char.charCodeAt(0)),
    );

    const salt = combined.slice(0, 16);
    const storedHash = combined.slice(16);

    const data = encoder.encode(password);
    const saltedPassword = new Uint8Array(salt.length + data.length);
    saltedPassword.set(salt);
    saltedPassword.set(data, salt.length);

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode("pepper"), // 与哈希时相同的值
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signature = await crypto.subtle.sign("HMAC", key, saltedPassword);

    // 比较哈希值
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
    console.error("Password verification error:", error);
    return false;
  }
}
