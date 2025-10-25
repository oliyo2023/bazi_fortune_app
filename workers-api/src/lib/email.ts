import { Env } from '../lib/auth';

interface EmailRequest {
  to: string | string[];
  subject: string;
  content: string;
  isHtml?: boolean;
  template?: string;
  templateData?: Record<string, any>;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// 邮件模板
const EMAIL_TEMPLATES = {
  'welcome': {
    subject: '欢迎加入八字算命平台',
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>欢迎加入</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f4a460; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; background: #d2691e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>欢迎加入八字算命平台</h1>
        </div>
        <div class="content">
            <p>尊敬的 {{username}}，</p>
            <p>欢迎您加入我们的八字算命平台！您已成功注册账户，现在可以开始探索命运的奥秘了。</p>
            <p>通过我们的专业八字分析，您可以：</p>
            <ul>
                <li>了解自己的命局特点</li>
                <li>分析事业发展方向</li>
                <li>把握感情机遇</li>
                <li>掌握健康运势</li>
                <li>获得专业的开运建议</li>
            </ul>
            <p style="text-align: center; margin: 20px 0;">
                <a href="{{baseUrl}}/dashboard" class="button">立即开始</a>
            </p>
            <p>如果您有任何问题，请随时联系我们的客服团队。</p>
            <p>祝您运势亨通！</p>
        </div>
        <div class="footer">
            <p>此邮件由系统自动发送，请勿回复。</p>
            <p>© 2024 八字算命平台 版权所有</p>
        </div>
    </div>
</body>
</html>
    `,
    text: `欢迎加入八字算命平台

尊敬的 {{username}}，

欢迎您加入我们的八字算命平台！您已成功注册账户，现在可以开始探索命运的奥秘了。

通过我们的专业八字分析，您可以：
- 了解自己的命局特点
- 分析事业发展方向
- 把握感情机遇
- 掌握健康运势
- 获得专业的开运建议

立即访问：{{baseUrl}}/dashboard

如果您有任何问题，请随时联系我们的客服团队。

祝您运势亨通！

此邮件由系统自动发送，请勿回复。
© 2024 八字算命平台 版权所有`
  },

  'password-reset': {
    subject: '密码重置请求',
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>密码重置</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 4px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>密码重置请求</h1>
        </div>
        <div class="content">
            <p>您好，</p>
            <p>我们收到了您的密码重置请求。请点击下面的链接来重置您的密码：</p>
            <p style="text-align: center; margin: 20px 0;">
                <a href="{{resetUrl}}" class="button">重置密码</a>
            </p>
            <div class="warning">
                <strong>安全提醒：</strong>
                <ul>
                    <li>此链接将在24小时后失效</li>
                    <li>如果您没有请求重置密码，请忽略此邮件</li>
                    <li>请勿将此链接分享给他人</li>
                </ul>
            </div>
            <p>如果您无法点击上面的链接，请复制以下网址到浏览器地址栏：</p>
            <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px;">{{resetUrl}}</p>
        </div>
        <div class="footer">
            <p>此邮件由系统自动发送，请勿回复。</p>
            <p>© 2024 八字算命平台 版权所有</p>
        </div>
    </div>
</body>
</html>
    `,
    text: `密码重置请求

您好，

我们收到了您的密码重置请求。请访问以下链接来重置您的密码：

{{resetUrl}}

安全提醒：
- 此链接将在24小时后失效
- 如果您没有请求重置密码，请忽略此邮件
- 请勿将此链接分享给他人

如果您无法点击上面的链接，请复制以下网址到浏览器地址栏：
{{resetUrl}}

此邮件由系统自动发送，请勿回复。
© 2024 八字算命平台 版权所有`
  },

  'bazi-analysis': {
    subject: '您的八字分析报告已完成',
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>八字分析报告</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #28a745; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; }
        .highlight { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 4px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>您的八字分析报告已完成</h1>
        </div>
        <div class="content">
            <p>尊敬的 {{username}}，</p>
            <p>好消息！您的专业八字分析报告已经完成。我们的AI大师已经为您生成了详细的命运分析。</p>
            <div class="highlight">
                <strong>分析包含：</strong>
                <ul>
                    <li>命局整体评价</li>
                    <li>五行强弱分析</li>
                    <li>大运流年运势</li>
                    <li>事业财运前景</li>
                    <li>感情婚姻状况</li>
                    <li>健康养生建议</li>
                </ul>
            </div>
            <p style="text-align: center; margin: 20px 0;">
                <a href="{{analysisUrl}}" class="button">查看完整报告</a>
            </p>
            <p>您也可以登录账户后，在"我的八字"中随时查看这份报告。</p>
            <p>如有任何疑问，欢迎联系我们的专业大师团队。</p>
        </div>
        <div class="footer">
            <p>此邮件由系统自动发送，请勿回复。</p>
            <p>© 2024 八字算命平台 版权所有</p>
        </div>
    </div>
</body>
</html>
    `,
    text: `您的八字分析报告已完成

尊敬的 {{username}}，

好消息！您的专业八字分析报告已经完成。我们的AI大师已经为您生成了详细的命运分析。

分析包含：
- 命局整体评价
- 五行强弱分析
- 大运流年运势
- 事业财运前景
- 感情婚姻状况
- 健康养生建议

查看完整报告：{{analysisUrl}}

您也可以登录账户后，在"我的八字"中随时查看这份报告。

如有任何疑问，欢迎联系我们的专业大师团队。

此邮件由系统自动发送，请勿回复。
© 2024 八字算命平台 版权所有`
  }
};

// 使用SendGrid发送邮件
export async function sendEmailWithSendGrid(
  request: EmailRequest,
  env: Env
): Promise<EmailResponse> {
  try {
    // 处理模板
    let subject = request.subject;
    let content = request.content;
    let isHtml = request.isHtml || false;

    if (request.template && EMAIL_TEMPLATES[request.template as keyof typeof EMAIL_TEMPLATES]) {
      const template = EMAIL_TEMPLATES[request.template as keyof typeof EMAIL_TEMPLATES];
      subject = template.subject;

      if (request.isHtml !== false) {
        content = processTemplate(template.html, request.templateData || {});
        isHtml = true;
      } else {
        content = processTemplate(template.text, request.templateData || {});
        isHtml = false;
      }
    }

    const emailData = {
      personalizations: [{
        to: Array.isArray(request.to) ? request.to.map(email => ({ email })) : [{ email: request.to }],
        subject: subject,
      }],
      from: {
        email: env.SENDGRID_FROM_EMAIL,
        name: '八字算命平台',
      },
      content: [{
        type: isHtml ? 'text/html' : 'text/plain',
        value: content,
      }],
    };

    const response = await fetch('https://api.sendgrid.net/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (response.status === 202) {
      const messageId = response.headers.get('X-Message-Id');
      return {
        success: true,
        messageId: messageId || undefined,
      };
    } else {
      const errorText = await response.text();
      throw new Error(`SendGrid error: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('SendGrid email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// 使用Cloudflare Email Routing发送邮件
export async function sendEmailWithCloudflare(
  request: EmailRequest,
  env: Env
): Promise<EmailResponse> {
  try {
    // 处理模板
    let subject = request.subject;
    let content = request.content;
    let isHtml = request.isHtml || false;

    if (request.template && EMAIL_TEMPLATES[request.template as keyof typeof EMAIL_TEMPLATES]) {
      const template = EMAIL_TEMPLATES[request.template as keyof typeof EMAIL_TEMPLATES];
      subject = template.subject;

      if (request.isHtml !== false) {
        content = processTemplate(template.html, request.templateData || {});
        isHtml = true;
      } else {
        content = processTemplate(template.text, request.templateData || {});
        isHtml = false;
      }
    }

    // Cloudflare Email Routing使用MailChannels API
    const emailData = {
      personalizations: [{
        to: Array.isArray(request.to) ? request.to : [request.to],
      }],
      from: {
        email: env.CLOUDFLARE_EMAIL_FROM,
        name: '八字算命平台',
      },
      subject: subject,
      content: [{
        type: isHtml ? 'text/html' : 'text/plain',
        value: content,
      }],
    };

    const response = await fetch('https://api.mailchannels.net/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        messageId: result.id,
      };
    } else {
      const errorText = await response.text();
      throw new Error(`Cloudflare Email error: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Cloudflare email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// 统一的邮件发送接口
export async function sendEmail(
  request: EmailRequest,
  env: Env,
  provider?: 'sendgrid' | 'cloudflare'
): Promise<EmailResponse> {
  // 自动选择提供商
  const selectedProvider = provider ||
    (env.SENDGRID_API_KEY ? 'sendgrid' : 'cloudflare');

  switch (selectedProvider) {
    case 'sendgrid':
      return sendEmailWithSendGrid(request, env);
    case 'cloudflare':
      return sendEmailWithCloudflare(request, env);
    default:
      return {
        success: false,
        error: 'No email provider configured',
      };
  }
}

// 批量发送邮件
export async function sendBulkEmail(
  requests: EmailRequest[],
  env: Env,
  provider?: 'sendgrid' | 'cloudflare',
  batchSize: number = 10
): Promise<EmailResponse[]> {
  const results: EmailResponse[] = [];

  // 分批处理以避免速率限制
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);

    const batchPromises = batch.map(request => sendEmail(request, env, provider));
    const batchResults = await Promise.all(batchPromises);

    results.push(...batchResults);

    // 批次间添加延迟
    if (i + batchSize < requests.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

// 处理模板变量
function processTemplate(template: string, data: Record<string, any>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || match;
  });
}

// 验证邮件地址
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 邮件队列管理
export class EmailQueue {
  private env: Env;
  private queueKey = 'email_queue';

  constructor(env: Env) {
    this.env = env;
  }

  // 添加邮件到队列
  async addToQueue(request: EmailRequest, priority: number = 0): Promise<void> {
    try {
      const queueItem = {
        id: this.generateId(),
        request,
        priority,
        attempts: 0,
        createdAt: Date.now(),
        nextAttempt: Date.now(),
      };

      await this.env.CACHE.put(
        `${this.queueKey}:${queueItem.id}`,
        JSON.stringify(queueItem),
        { expirationTtl: 86400 } // 24小时过期
      );
    } catch (error) {
      console.error('Add to email queue error:', error);
      throw error;
    }
  }

  // 获取队列中的邮件
  async getQueuedEmails(limit: number = 10): Promise<any[]> {
    try {
      const list = await this.env.CACHE.list({
        prefix: this.queueKey,
        limit: limit * 2, // 获取更多以便筛选
      });

      const queueItems: any[] = [];

      for (const key of list.keys) {
        const item = await this.env.CACHE.get(key.name);
        if (item) {
          const queueItem = JSON.parse(item);
          if (queueItem.nextAttempt <= Date.now() && queueItem.attempts < 3) {
            queueItems.push(queueItem);
          }
        }
      }

      // 按优先级和时间排序
      return queueItems.sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        }
        return a.createdAt - b.createdAt;
      }).slice(0, limit);
    } catch (error) {
      console.error('Get queued emails error:', error);
      return [];
    }
  }

  // 处理队列中的邮件
  async processQueue(): Promise<void> {
    try {
      const queuedEmails = await this.getQueuedEmails();

      for (const queueItem of queuedEmails) {
        try {
          const result = await sendEmail(queueItem.request, this.env);

          if (result.success) {
            // 删除已发送的邮件
            await this.env.CACHE.delete(`${this.queueKey}:${queueItem.id}`);
          } else {
            // 更新重试信息
            queueItem.attempts++;
            queueItem.nextAttempt = Date.now() + (Math.pow(2, queueItem.attempts) * 60000); // 指数退避

            await this.env.CACHE.put(
              `${this.queueKey}:${queueItem.id}`,
              JSON.stringify(queueItem),
              { expirationTtl: 86400 }
            );
          }
        } catch (error) {
          console.error(`Process queued email ${queueItem.id} error:`, error);

          // 更新重试信息
          queueItem.attempts++;
          queueItem.nextAttempt = Date.now() + (Math.pow(2, queueItem.attempts) * 60000);

          await this.env.CACHE.put(
            `${this.queueKey}:${queueItem.id}`,
            JSON.stringify(queueItem),
            { expirationTtl: 86400 }
          );
        }
      }
    } catch (error) {
      console.error('Process email queue error:', error);
    }
  }

  // 清理过期的邮件
  async cleanExpiredEmails(): Promise<number> {
    try {
      const list = await this.env.CACHE.list({ prefix: this.queueKey });
      let cleaned = 0;

      for (const key of list.keys) {
        const item = await this.env.CACHE.get(key.name);
        if (item) {
          const queueItem = JSON.parse(item);

          // 清理超过3次尝试或超过24小时的邮件
          if (queueItem.attempts >= 3 || (Date.now() - queueItem.createdAt) > 86400000) {
            await this.env.CACHE.delete(key.name);
            cleaned++;
          }
        }
      }

      return cleaned;
    } catch (error) {
      console.error('Clean expired emails error:', error);
      return 0;
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
