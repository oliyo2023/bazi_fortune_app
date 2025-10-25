import { Hono } from "hono";
import { verifyJWT, generateJWT, JWTPayload } from "../lib/auth";

// 简单的内存存储（用于演示）
const memoryStore = {
  users: new Map<string, any>(),
  phoneUsers: new Map<string, any>(),
  verificationCodes: new Map<string, { code: string; expires: number }>(),
};

export const authRoutes = new Hono();

// 邮箱注册方式
authRoutes.post("/register/email", async (c) => {
  try {
    const { email, username, password } = await c.req.json();

    if (!email || !username || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // 检查用户是否已存在
    if (memoryStore.users.has(email)) {
      return c.json({ error: "User already exists" }, 409);
    }

    // 创建用户
    const user = {
      id: `user_${Date.now()}`,
      email,
      username,
      role: "USER",
      createdAt: new Date().toISOString(),
    };

    // 保存到内存
    memoryStore.users.set(email, user);

    // 生成JWT
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await generateJWT(payload, c.env.JWT_SECRET);

    return c.json({
      user,
      token,
      registrationType: "email",
    });
  } catch (error) {
    console.error("Email registration error:", error);
    return c.json({ error: "Registration failed" }, 500);
  }
});

// 邮箱登录方式
authRoutes.post("/login/email", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Missing email or password" }, 400);
    }

    // 查找用户
    const user = memoryStore.users.get(email);
    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // 简单的密码验证（演示用）
    const isValidPassword = password === "demo123"; // 在实际应用中应该使用哈希验证

    if (!isValidPassword) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // 生成JWT
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await generateJWT(payload, c.env.JWT_SECRET);

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
      loginType: "email",
    });
  } catch (error) {
    console.error("Email login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// 手机号注册方式
authRoutes.post("/register/phone", async (c) => {
  try {
    const { phone, name, verificationCode, password } = await c.req.json();

    if (!phone || !name || !verificationCode || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // 验证验证码
    const storedVerification = memoryStore.verificationCodes.get(phone);
    if (!storedVerification ||
        storedVerification.code !== verificationCode ||
        Date.now() > storedVerification.expires) {
      return c.json({ error: "Invalid or expired verification code" }, 400);
    }

    // 检查用户是否已存在
    if (memoryStore.phoneUsers.has(phone)) {
      return c.json({ error: "User already exists" }, 409);
    }

    // 创建用户
    const user = {
      id: `user_${Date.now()}`,
      phone,
      name,
      role: "USER",
      createdAt: new Date().toISOString(),
    };

    // 保存到内存
    memoryStore.phoneUsers.set(phone, user);

    // 清除验证码
    memoryStore.verificationCodes.delete(phone);

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
      registrationType: "phone",
    });
  } catch (error) {
    console.error("Phone registration error:", error);
    return c.json({ error: "Registration failed" }, 500);
  }
});

// 发送验证码
authRoutes.post("/send-verification", async (c) => {
  try {
    const { phone } = await c.req.json();

    if (!phone) {
      return c.json({ error: "Missing phone number" }, 400);
    }

    // 生成6位验证码（演示用）
    const code = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');

    // 保存验证码（5分钟过期）
    memoryStore.verificationCodes.set(phone, {
      code,
      expires: Date.now() + 5 * 60 * 1000, // 5分钟
    });

    return c.json({
      message: "Verification code sent",
      expiresIn: 300, // 5分钟
    });
  } catch (error) {
    console.error("Send verification error:", error);
    return c.json({ error: "Failed to send verification" }, 500);
  }
});

// 手机号登录方式
authRoutes.post("/login/phone", async (c) => {
  try {
    const { phone, password } = await c.req.json();

    if (!phone || !password) {
      return c.json({ error: "Missing phone or password" }, 400);
    }

    // 查找用户
    const user = memoryStore.phoneUsers.get(phone);
    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // 简单的密码验证（演示用）
    const isValidPassword = password === "demo123"; // 在实际应用中应该使用哈希验证

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
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
      loginType: "phone",
    });
  } catch (error) {
    console.error("Phone login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// 统一登录接口（支持两种方式）
authRoutes.post("/login", async (c) => {
  try {
    const { loginType, email, phone, password, name, verificationCode } = await c.req.json();

    if (!loginType || !password) {
      return c.json({ error: "Missing login type or password" }, 400);
    }

    // 邮箱登录
    if (loginType === "email") {
      if (!email) {
        return c.json({ error: "Missing email" }, 400);
      }

      const user = memoryStore.users.get(email);
      if (!user) {
        return c.json({ error: "Invalid credentials" }, 401);
      }

      const isValidPassword = password === "demo123"; // 演示用

      if (!isValidPassword) {
        return c.json({ error: "Invalid credentials" }, 401);
      }

      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const token = await generateJWT(payload, c.env.JWT_SECRET);

      return c.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
        },
        token,
        loginType: "email",
      });
    }

    // 手机号登录
    if (loginType === "phone") {
      if (!phone) {
        return c.json({ error: "Missing phone" }, 400);
      }

      const user = memoryStore.phoneUsers.get(phone);
      if (!user) {
        return c.json({ error: "Invalid credentials" }, 401);
      }

      const isValidPassword = password === "demo123"; // 演示用

      if (!isValidPassword) {
        return c.json({ error: "Invalid credentials" }, 401);
      }

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
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
        },
        token,
        loginType: "phone",
      });
    }

    return c.json({ error: "Invalid login type" }, 400);
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// 统一注册接口
authRoutes.post("/register", async (c) => {
  try {
    const { registrationType, email, username, password, phone, name, verificationCode } = await c.req.json();

    if (!registrationType) {
      return c.json({ error: "Missing registration type" }, 400);
    }

    // 邮箱注册
    if (registrationType === "email") {
      if (!email || !username || !password) {
        return c.json({ error: "Missing required fields" }, 400);
      }

      if (memoryStore.users.has(email)) {
        return c.json({ error: "User already exists" }, 409);
      }

      const user = {
        id: `user_${Date.now()}`,
        email,
        username,
        role: "USER",
        createdAt: new Date().toISOString(),
      };

      memoryStore.users.set(email, user);

      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const token = await generateJWT(payload, c.env.JWT_SECRET);

      return c.json({
        user,
        token,
        registrationType: "email",
      });
    }

    // 手机号注册
    if (registrationType === "phone") {
      if (!phone || !name || !verificationCode || !password) {
        return c.json({ error: "Missing required fields" }, 400);
      }

      // 验证验证码
      const storedVerification = memoryStore.verificationCodes.get(phone);
      if (!storedVerification ||
          storedVerification.code !== verificationCode ||
          Date.now() > storedVerification.expires) {
        return c.json({ error: "Invalid or expired verification code" }, 400);
      }

      if (memoryStore.phoneUsers.has(phone)) {
        return c.json({ error: "User already exists" }, 409);
      }

      const user = {
        id: `user_${Date.now()}`,
        phone,
        name,
        role: "USER",
        createdAt: new Date().toISOString(),
      };

      memoryStore.phoneUsers.set(phone, user);
      memoryStore.verificationCodes.delete(phone);

      const payload: JWTPayload = {
        userId: user.id,
        phone: user.phone,
        role: user.role,
      };

      const token = await generateJWT(payload, c.env.JWT_SECRET);

      return c.json({
        user,
        token,
        registrationType: "phone",
      });
    }

    return c.json({ error: "Invalid registration type" }, 400);
  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ error: "Registration failed" }, 500);
  }
});

// 获取用户信息（支持两种方式）
authRoutes.get("/profile", async (c) => {
  try {
    const authorization = c.req.header("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return c.json({ error: "Missing or invalid token" }, 401);
    }

    const token = authorization.substring(7);
    const payload = await verifyJWT(token, c.env.JWT_SECRET);
    let user;

    // 根据token中的用户信息查找用户
    if (payload.email) {
      user = memoryStore.users.get(payload.email);
    } else if (payload.phone) {
      user = memoryStore.phoneUsers.get(payload.phone);
    }

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        username: user.username,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
      loginType: payload.email ? "email" : "phone",
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return c.json({ error: "Failed to get profile" }, 500);
  }
});

// 密码哈希函数（简化版）
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode("pepper"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const saltedPassword = new Uint8Array(salt.length + data.length);
  saltedPassword.set(salt);
  saltedPassword.set(data, salt.length);

  const signature = await crypto.subtle.sign("HMAC", key, saltedPassword);

  const combined = new Uint8Array(salt.length + signature.byteLength);
  combined.set(salt);
  combined.set(new Uint8Array(signature), salt.length);

  return btoa(String.fromCharCode(...combined));
}

// 密码验证函数（简化版）
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const combined = new Uint8Array(
    ...atob(hashedPassword).split("").map((char) => char.charCodeAt(0)),
  );

  const salt = combined.slice(0, 16);
  const storedHash = combined.slice(16);

  const data = encoder.encode(password);
  const saltedPassword = new Uint8Array(salt.length + data.length);
  saltedPassword.set(salt);
  saltedPassword.set(data, salt.length);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode("pepper"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, saltedPassword);

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
}
```
</edit_description>

<mode>
create</mode>

```</think>
现在更新主入口文件使用新的auth路由：
<tool_call>edit_file
<arg_key>path</arg_key>
<arg_value>bazi_fortune_app/workers-api/src/index.ts</arg_value>
<arg_key>display_description</arg_key>
<arg_value>更新主入口文件，使用新的auth路由</arg_value>
<arg_key>mode</arg_key>
<arg_value>edit</arg_value>
</tool_call>
