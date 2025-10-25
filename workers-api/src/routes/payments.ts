import { Hono } from 'hono';
import { verifyJWT } from '../lib/auth';
import { getPrismaClient } from '../lib/db';
import { Env } from '../lib/auth';

export const paymentsRoutes = new Hono<{ Bindings: Env }>();

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

// 创建支付订单
paymentsRoutes.post('/create-order', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { type, amount, description, masterId } = await c.req.json();

    if (!type || !amount) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const prisma = getPrismaClient(c.env);

    // 创建订单记录
    const order = await prisma.order.create({
      data: {
        userId,
        type,
        amount,
        status: 'PENDING',
      },
    });

    // 根据支付方式创建支付链接
    const paymentMethod = c.req.query('method') || 'stripe';

    if (paymentMethod === 'stripe') {
      const paymentIntent = await createStripePaymentIntent(amount, order.id, c.env.STRIPE_SECRET_KEY);
      return c.json({
        orderId: order.id,
        clientSecret: paymentIntent.client_secret,
        paymentMethod: 'stripe'
      });
    } else if (paymentMethod === 'alipay') {
      const paymentUrl = await createAlipayPayment(amount, order.id, description, c.env.ALIPAY_APP_ID, c.env.ALIPAY_PRIVATE_KEY);
      return c.json({
        orderId: order.id,
        paymentUrl,
        paymentMethod: 'alipay'
      });
    }

    return c.json({ error: 'Unsupported payment method' }, 400);
  } catch (error) {
    console.error('Create payment order error:', error);
    return c.json({ error: 'Failed to create payment order' }, 500);
  }
});

// 确认支付（Webhook）
paymentsRoutes.post('/webhook/stripe', async (c) => {
  try {
    const signature = c.req.header('stripe-signature');
    if (!signature) {
      return c.json({ error: 'Missing signature' }, 400);
    }

    const body = await c.req.text();
    const event = await verifyStripeWebhook(body, signature, c.env.STRIPE_WEBHOOK_SECRET);

    const prisma = getPrismaClient(c.env);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as any;
        await updateOrderStatus(prisma, paymentIntent.metadata.orderId, 'COMPLETED');
        break;
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as any;
        await updateOrderStatus(prisma, failedPayment.metadata.orderId, 'CANCELLED');
        break;
    }

    return c.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

// 支付宝回调
paymentsRoutes.post('/webhook/alipay', async (c) => {
  try {
    const formData = await c.req.formData();
    const verified = await verifyAlipayNotification(formData, c.env.ALIPAY_PUBLIC_KEY);

    if (!verified) {
      return c.json({ error: 'Invalid signature' }, 400);
    }

    const prisma = getPrismaClient(c.env);
    const orderId = formData.get('out_trade_no') as string;
    const tradeStatus = formData.get('trade_status') as string;

    if (tradeStatus === 'TRADE_SUCCESS' || tradeStatus === 'TRADE_FINISHED') {
      await updateOrderStatus(prisma, orderId, 'COMPLETED');
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Alipay webhook error:', error);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

// 获取支付状态
paymentsRoutes.get('/status/:orderId', authMiddleware, async (c) => {
  try {
    const orderId = c.req.param('orderId');
    const userId = c.get('userId');

    const prisma = getPrismaClient(c.env);

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId, // 确保用户只能查看自己的订单
      },
    });

    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }

    return c.json({
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      type: order.type,
      createdAt: order.createdAt,
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    return c.json({ error: 'Failed to get payment status' }, 500);
  }
});

// 获取用户支付历史
paymentsRoutes.get('/history', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');

    const prisma = getPrismaClient(c.env);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return c.json({
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    return c.json({ error: 'Failed to get payment history' }, 500);
  }
});

// 辅助函数：创建Stripe支付意图
async function createStripePaymentIntent(amount: number, orderId: string, secretKey: string) {
  const response = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      amount: Math.round(amount * 100), // Stripe使用分为单位
      currency: 'usd',
      metadata: { orderId },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create Stripe payment intent');
  }

  return response.json();
}

// 辅助函数：创建支付宝支付
async function createAlipayPayment(amount: number, orderId: string, description: string, appId: string, privateKey: string) {
  // 这里需要集成支付宝SDK，简化示例
  const params = {
    app_id: appId,
    method: 'alipay.trade.page.pay',
    charset: 'utf-8',
    sign_type: 'RSA2',
    timestamp: new Date().toISOString(),
    version: '1.0',
    notify_url: `${c.env.API_URL}/api/v1/payments/webhook/alipay`,
    return_url: `${c.env.FRONTEND_URL}/payment/success`,
    biz_content: JSON.stringify({
      out_trade_no: orderId,
      total_amount: amount.toString(),
      subject: description || '八字算命服务',
      product_code: 'FAST_INSTANT_TRADE_PAY',
    }),
  };

  // 生成签名（简化示例）
  const sign = await generateAlipaySignature(params, privateKey);
  params['sign'] = sign;

  // 生成支付URL
  const queryString = new URLSearchParams(params).toString();
  return `https://openapi.alipay.com/gateway.do?${queryString}`;
}

// 辅助函数：验证Stripe Webhook
async function verifyStripeWebhook(body: string, signature: string, webhookSecret: string) {
  // 这里需要使用Stripe SDK验证webhook签名
  // 简化示例，实际生产环境需要正确实现
  try {
    const crypto = require('crypto');
    const elements = signature.split(',');
    const timestamp = elements.find((e: string) => e.startsWith('t='))?.substring(2);
    const signedPayload = `${timestamp}.${body}`;
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(signedPayload, 'utf8')
      .digest('hex');

    const receivedSignature = elements.find((e: string) => e.startsWith('v1='))?.substring(3);

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(receivedSignature || '')
    );
  } catch (error) {
    return false;
  }
}

// 辅助函数：验证支付宝通知
async function verifyAlipayNotification(formData: FormData, publicKey: string) {
  // 这里需要集成支付宝SDK验证通知签名
  // 简化示例，实际生产环境需要正确实现
  return true; // 临时返回true，实际需要验证签名
}

// 辅助函数：更新订单状态
async function updateOrderStatus(prisma: any, orderId: string, status: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}

// 辅助函数：生成支付宝签名
async function generateAlipaySignature(params: any, privateKey: string) {
  // 这里需要集成支付宝SDK生成签名
  // 简化示例，实际生产环境需要正确实现
  return 'generated_signature';
}
