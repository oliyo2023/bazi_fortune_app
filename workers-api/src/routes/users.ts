import { Hono } from 'hono';
import { verifyJWT } from '../lib/auth';
import { getPrismaClient } from '../lib/db';
import { Env } from '../lib/auth';

export const usersRoutes = new Hono<{ Bindings: Env }>();

// 认证中间件
async function authMiddleware(c: any, next: any) {
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

// 获取用户详细信息
usersRoutes.get('/profile', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const prisma = getPrismaClient(c.env);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        master: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            rating: true,
            available: true,
          },
        },
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error('Get user profile error:', error);
    return c.json({ error: 'Failed to get user profile' }, 500);
  }
});

// 更新用户基本信息
usersRoutes.put('/profile', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { username, email } = await c.req.json();

    const prisma = getPrismaClient(c.env);

    // 检查邮箱是否已被其他用户使用
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          id: { not: userId },
        },
      });

      if (existingUser) {
        return c.json({ error: 'Email already in use' }, 409);
      }
    }

    // 检查用户名是否已被其他用户使用
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          id: { not: userId },
        },
      });

      if (existingUser) {
        return c.json({ error: 'Username already in use' }, 409);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(username && { username }),
        ...(email && { email }),
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    return c.json({ user: updatedUser });
  } catch (error) {
    console.error('Update user profile error:', error);
    return c.json({ error: 'Failed to update user profile' }, 500);
  }
});

// 上传头像
usersRoutes.post('/avatar', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const formData = await c.req.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' }, 400);
    }

    // 验证文件大小 (最大5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return c.json({ error: 'File too large. Maximum size is 5MB' }, 400);
    }

    // 读取文件内容
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // 生成唯一文件名
    const timestamp = Date.now();
    const extension = file.type.split('/')[1];
    const fileName = `avatars/${userId}_${timestamp}.${extension}`;

    // 上传到Cloudflare R2（需要配置）
    const url = await uploadToR2(uint8Array, fileName, file.type, c.env);

    // 更新用户头像URL
    const prisma = getPrismaClient(c.env);
    await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: url },
    });

    return c.json({
      message: 'Avatar uploaded successfully',
      avatarUrl: url,
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    return c.json({ error: 'Failed to upload avatar' }, 500);
  }
});

// 修改密码
usersRoutes.put('/password', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { currentPassword, newPassword } = await c.req.json();

    if (!currentPassword || !newPassword) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // 验证新密码强度
    if (newPassword.length < 8) {
      return c.json({ error: 'Password must be at least 8 characters long' }, 400);
    }

    const prisma = getPrismaClient(c.env);

    // 获取用户当前密码
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // 验证当前密码
    const isValidPassword = await verifyPassword(currentPassword, user.password);
    if (!isValidPassword) {
      return c.json({ error: 'Current password is incorrect' }, 401);
    }

    // 哈希新密码
    const hashedPassword = await hashPassword(newPassword);

    // 更新密码
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return c.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    return c.json({ error: 'Failed to update password' }, 500);
  }
});

// 删除账户
usersRoutes.delete('/account', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { password } = await c.req.json();

    if (!password) {
      return c.json({ error: 'Password is required to delete account' }, 400);
    }

    const prisma = getPrismaClient(c.env);

    // 获取用户信息验证密码
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // 验证密码
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return c.json({ error: 'Invalid password' }, 401);
    }

    // 删除用户相关的所有数据（级联删除）
    await prisma.user.delete({
      where: { id: userId },
    });

    return c.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    return c.json({ error: 'Failed to delete account' }, 500);
  }
});

// 获取用户统计信息
usersRoutes.get('/stats', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const prisma = getPrismaClient(c.env);

    const [baziCount, orderCount, totalSpent] = await Promise.all([
      prisma.baziData.count({
        where: { userId },
      }),
      prisma.order.count({
        where: { userId },
      }),
      prisma.order.aggregate({
        where: {
          userId,
          status: 'COMPLETED',
        },
        _sum: { amount: true },
      }),
    ]);

    return c.json({
      baziCalculations: baziCount,
      totalOrders: orderCount,
      totalSpent: totalSpent._sum.amount || '0',
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    return c.json({ error: 'Failed to get user stats' }, 500);
  }
});

// 上传到Cloudflare R2的辅助函数
async function uploadToR2(data: Uint8Array, fileName: string, contentType: string, env: any): Promise<string> {
  // 需要在wrangler.toml中配置R2 bucket
  const bucket = env.AVATAR_BUCKET; // 配置R2 bucket绑定

  // 上传文件到R2
  await bucket.put(fileName, data, {
    httpMetadata: {
      contentType,
    },
  });

  // 返回公共URL
  return `https://pub-${env.R2_ACCOUNT_ID}.r2.dev/${fileName}`;
}

// 密码哈希函数
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

// 密码验证函数
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
