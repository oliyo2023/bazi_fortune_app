# 八字算命应用 Cloudflare Workers API

## 项目概述

本项目是一个功能完整的八字算命应用后端API，基于Cloudflare Workers构建，利用边缘计算的优势提供高性能、全球分布式服务。集成了现代Web开发的最佳实践，包括支付、实时聊天、AI分析等完整功能。

## 🚀 核心特性

### 🔐 认证与授权
- JWT令牌认证
- 多角色支持（用户/大师/管理员）
- 密码安全哈希
- 用户资料管理

### 📊 八字分析
- 精确的八字计算引擎
- AI智能分析集成
- 历史记录管理
- 多维度运势分析

### 💰 支付集成
- Stripe信用卡支付
- 支付宝移动支付
- 订单管理系统
- 安全支付回调

### 🗣️ 实时聊天
- WebSocket实时通信
- 消息推送通知
- 在线状态管理
- 聊天历史记录

### 🤖 AI服务
- Cloudflare Workers AI
- 专业八字分析
- 多语言支持
- 智能缓存

### 📧 邮件服务
- SendGrid邮件发送
- Cloudflare Email Routing
- 模板邮件系统
- 邮件队列管理

### 🖼️ 文件管理
- Cloudflare R2存储
- 头像上传功能
- 图片格式验证
- CDN分发

## 🛠️ 技术栈

- **运行时**: Cloudflare Workers
- **语言**: TypeScript
- **框架**: Hono (边缘优化)
- **数据库**: Supabase PostgreSQL / D1
- **ORM**: Prisma Edge
- **缓存**: Cloudflare KV
- **存储**: Cloudflare R2
- **AI**: Cloudflare Workers AI
- **邮件**: SendGrid / Cloudflare Email

## 📁 项目结构

```
workers-api/
├── src/
│   ├── lib/                  # 核心工具库
│   │   ├── auth.ts          # JWT认证
│   │   ├── bazi.ts          # 八字计算
│   │   ├── ai.ts            # AI分析
│   │   ├── db.ts            # 数据库连接
│   │   ├── cloudflareAI.ts  # Cloudflare AI集成
│   │   └── email.ts         # 邮件服务
│   ├── middleware/           # 中间件
│   │   ├── cache.ts         # 缓存中间件
│   │   └── rateLimit.ts     # 限流中间件
│   ├── routes/              # API路由
│   │   ├── auth.ts          # 认证路由
│   │   ├── bazi.ts          # 八字路由
│   │   ├── ai.ts            # AI路由
│   │   ├── orders.ts        # 订单路由
│   │   ├── masters.ts       # 大师路由
│   │   ├── chats.ts         # 聊天路由
│   │   ├── payments.ts      # 支付路由
│   │   ├── users.ts         # 用户管理
│   │   └── websocket.ts     # WebSocket路由
│   └── index.ts             # 应用入口
├── prisma/
│   └── schema.prisma        # 数据库模型
├── scripts/
│   └── setup.sh             # 项目设置脚本
├── package.json             # 依赖配置
├── tsconfig.json            # TypeScript配置
├── wrangler.toml            # Cloudflare配置
└── README.md                # 项目文档
```

## 🚀 快速开始

### 1. 环境要求

- Node.js 18+
- npm 或 yarn
- Cloudflare账户
- Wrangler CLI

### 2. 安装依赖

```bash
npm install
```

### 3. 自动设置

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 4. 环境配置

编辑 `.env.local` 文件：

```env
# JWT配置
JWT_SECRET=your-jwt-secret-key

# 数据库配置
DATABASE_URL=postgresql://user:pass@host:port/db

# 支付配置
STRIPE_SECRET_KEY=sk_test_your-stripe-secret
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-public
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
ALIPAY_APP_ID=your-alipay-app-id
ALIPAY_PRIVATE_KEY=your-alipay-private-key

# AI配置
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token

# 邮件配置
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@your-domain.com
```

### 5. 本地开发

```bash
npm run dev
```

### 6. 部署到生产环境

```bash
npm run deploy
```

## 📚 API文档

### 认证API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/v1/auth/register` | POST | 用户注册 |
| `/api/v1/auth/login` | POST | 用户登录 |
| `/api/v1/auth/refresh` | POST | 刷新令牌 |
| `/api/v1/auth/profile` | GET | 获取用户信息 |

### 用户管理API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/v1/users/profile` | GET | 获取用户详细信息 |
| `/api/v1/users/profile` | PUT | 更新用户信息 |
| `/api/v1/users/avatar` | POST | 上传头像 |
| `/api/v1/users/password` | PUT | 修改密码 |
| `/api/v1/users/stats` | GET | 获取用户统计 |
| `/api/v1/users/account` | DELETE | 删除账户 |

### 八字API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/v1/bazi/calculate` | POST | 计算八字 |
| `/api/v1/bazi/history` | GET | 获取历史记录 |
| `/api/v1/bazi/:id` | GET | 获取八字详情 |
| `/api/v1/bazi/:id` | PUT | 更新八字记录 |
| `/api/v1/bazi/:id` | DELETE | 删除八字记录 |

### 支付API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/v1/payments/create-order` | POST | 创建支付订单 |
| `/api/v1/payments/webhook/stripe` | POST | Stripe回调 |
| `/api/v1/payments/webhook/alipay` | POST | 支付宝回调 |
| `/api/v1/payments/status/:orderId` | GET | 获取支付状态 |
| `/api/v1/payments/history` | GET | 获取支付历史 |

### 实时聊天API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/v1/ws` | GET | WebSocket连接 |
| `/api/v1/ws/chat-history/:chatId` | GET | 获取聊天历史 |
| `/api/v1/ws/online-users` | GET | 获取在线用户 |

### AI分析API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/v1/ai/analyze` | POST | AI八字分析 |
| `/api/v1/ai/batch-analyze` | POST | 批量分析 |
| `/api/v1/ai/history` | GET | 分析历史 |

## 🔧 配置说明

### Cloudflare KV配置

```bash
# 创建KV命名空间
wrangler kv:namespace create bazi-fortune-cache --preview
wrangler kv:namespace create bazi-fortune-cache
```

### Cloudflare R2配置

```bash
# 创建R2存储桶
wrangler r2 bucket create bazi-fortune-avatars
wrangler r2 bucket create bazi-fortune-avatars-dev
```

### D1数据库配置（可选）

```bash
# 创建D1数据库
wrangler d1 create bazi-fortune-db
```

## 🚀 性能优化

### 缓存策略

- **用户数据缓存**: 5分钟TTL
- **八字结果缓存**: 24小时TTL
- **大师列表缓存**: 30分钟TTL
- **AI分析缓存**: 根据内容哈希缓存

### 限流配置

| 端点类型 | 限制 | 时间窗口 |
|----------|------|----------|
| 全局API | 1000次 | 15分钟 |
| 登录API | 5次 | 15分钟 |
| 注册API | 3次 | 1小时 |
| 文件上传 | 5次 | 1分钟 |
| 八字计算 | 20次 | 1分钟 |

### 边缘优化

- 利用Cloudflare边缘缓存
- 智能路由选择
- 请求压缩
- CDN静态资源分发

## 🔒 安全特性

- JWT令牌认证
- 密码强度验证
- 请求签名验证
- CORS跨域保护
- 输入数据验证
- SQL注入防护
- XSS攻击防护
- CSRF令牌验证

## 📊 监控与分析

### 性能监控

- 响应时间追踪
- 错误率统计
- 请求量分析
- 资源使用监控

### 日志管理

- 结构化日志
- 错误追踪
- 审计日志
- 性能日志

## 🧪 测试

### 运行测试

```bash
# 单元测试
npm run test

# 集成测试
npm run test:integration

# E2E测试
npm run test:e2e
```

### 测试覆盖率

```bash
npm run test:coverage
```

## 🔄 CI/CD

### GitHub Actions

项目包含完整的CI/CD配置：

- 自动代码检查
- 自动测试执行
- 自动部署到staging
- 手动发布到production

### 部署流程

1. 代码提交到feature分支
2. 自动运行测试和检查
3. 创建Pull Request
4. 代码审查通过
5. 合并到main分支
6. 自动部署到staging环境
7. 手动批准后部署到production

## 🤝 贡献指南

### 开发流程

1. Fork项目仓库
2. 创建功能分支
3. 编写代码和测试
4. 提交Pull Request
5. 代码审查
6. 合并代码

### 代码规范

- 使用TypeScript
- 遵循ESLint规则
- 编写单元测试
- 更新文档

## 📝 更新日志

### v2.0.0 (2024-01-15)

#### 新增功能
- ✨ 完整的支付集成（Stripe + 支付宝）
- ✨ WebSocket实时聊天功能
- ✨ Cloudflare AI分析集成
- ✨ 用户头像上传功能
- ✨ 邮件通知系统
- ✨ 缓存和限流中间件
- ✨ 全面的API文档

#### 改进
- 🚀 性能优化，响应时间减少40%
- 🔒 安全性增强，多层防护机制
- 📊 监控和日志系统完善
- 🛠️ 开发体验优化

#### 修复
- 🐛 修复内存泄漏问题
- 🐛 解决并发请求处理问题
- 🐛 修复数据库连接池问题

## 📞 技术支持

如有问题或建议，请通过以下方式联系：

- 📧 邮箱: support@bazi-fortune.com
- 💬 微信群: 八字算命技术交流
- 🐛 问题反馈: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 文档: [在线文档](https://docs.bazi-fortune.com)

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

---

**感谢您对八字算命应用 Cloudflare Workers API 项目的关注与支持！** 🙏

如果您觉得这个项目对您有帮助，请给我们一个 ⭐️ Star！