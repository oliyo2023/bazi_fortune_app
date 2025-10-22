# 八字算命应用迁移到 Cloudflare Workers

## 项目概述

本项目是将八字算命应用后端从 Go 语言迁移到 Cloudflare Workers 平台的完整实现。新架构使用 TypeScript 和 Hono 框架，配合 Supabase PostgreSQL 数据库，充分利用边缘计算的优势。

## 技术栈

- **运行时**: Cloudflare Workers
- **语言**: TypeScript
- **框架**: Hono (专为边缘运行时优化的Web框架)
- **数据库**: Supabase PostgreSQL
- **ORM**: Prisma (边缘兼容版本)
- **认证**: JWT (基于 Web Crypto API)
- **AI 集成**: DeepSeek API

## 项目结构

```
workers-api/
├── src/
│   ├── lib/               # 工具库
│   │   ├── auth.ts        # JWT 认证工具
│   │   ├── bazi.ts        # 八字计算逻辑
│   │   ├── ai.ts          # AI 分析工具
│   │   └── db.ts          # 数据库连接
│   ├── routes/            # 路由处理
│   │   ├── auth.ts        # 认证路由
│   │   ├── bazi.ts        # 八字计算路由
│   │   ├── ai.ts          # AI 分析路由
│   │   ├── orders.ts      # 订单管理路由
│   │   ├── masters.ts     # 大师管理路由
│   │   └── chats.ts       # 聊天管理路由
│   └── index.ts           # 入口文件
├── prisma/
│   └── schema.prisma      # 数据库模型
├── package.json           # 项目依赖
├── tsconfig.json          # TypeScript 配置
├── wrangler.toml          # Cloudflare Workers 配置
├── deploy.sh              # 部署脚本
└── README.md              # 项目说明
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

编辑 `wrangler.toml` 文件，添加以下环境变量：

```toml
[env.production.vars]
DATABASE_URL = "postgresql://user:pass@host:port/db"
JWT_SECRET = "your-jwt-secret"
DEEPSEEK_API_KEY = "your-deepseek-api-key"
```

### 3. 生成 Prisma 客户端

```bash
npx prisma generate
```

### 4. 本地开发

```bash
npm run dev
```

### 5. 部署到 Cloudflare Workers

```bash
# 简单部署
npm run deploy

# 包含 KV 设置的部署
./deploy.sh --setup-kv

# 包含 D1 数据库设置的部署
./deploy.sh --setup-d1
```

## API 端点

### 认证
- `POST /api/v1/auth/register` - 用户注册
- `POST /api/v1/auth/login` - 用户登录
- `POST /api/v1/auth/refresh` - 刷新令牌
- `GET /api/v1/auth/profile` - 获取用户信息

### 八字计算
- `POST /api/v1/bazi/calculate` - 计算八字
- `GET /api/v1/bazi/history` - 获取八字历史记录
- `GET /api/v1/bazi/:id` - 获取八字详情
- `PUT /api/v1/bazi/:id` - 更新八字记录
- `DELETE /api/v1/bazi/:id` - 删除八字记录

### AI 分析
- `POST /api/v1/ai/analyze` - AI 分析八字
- `GET /api/v1/ai/history` - 获取分析历史
- `DELETE /api/v1/ai/:baziId` - 删除分析结果

### 订单管理
- `POST /api/v1/orders/create` - 创建订单
- `GET /api/v1/orders/list` - 获取订单列表
- `GET /api/v1/orders/:id` - 获取订单详情
- `PUT /api/v1/orders/:id/status` - 更新订单状态
- `DELETE /api/v1/orders/:id` - 删除订单

### 大师管理
- `GET /api/v1/masters/list` - 获取大师列表
- `GET /api/v1/masters/:id` - 获取大师详情
- `POST /api/v1/masters/apply` - 申请成为大师
- `PUT /api/v1/masters/:id` - 更新大师信息
- `DELETE /api/v1/masters/:id` - 删除大师

### 聊天管理
- `POST /api/v1/chats/create` - 创建聊天
- `GET /api/v1/chats/list` - 获取聊天列表
- `GET /api/v1/chats/:id` - 获取聊天详情
- `POST /api/v1/chats/:id/message` - 发送消息
- `PUT /api/v1/chats/:id/close` - 关闭聊天
- `DELETE /api/v1/chats/:id` - 删除聊天

## 数据库模型

### User
- `id`: 用户ID
- `email`: 邮箱
- `username`: 用户名
- `password`: 密码哈希
- `role`: 用户角色 (USER/MASTER/ADMIN)
- `createdAt`: 创建时间

### BaziData
- `id`: 八字数据ID
- `userId`: 用户ID
- `inputData`: 输入数据 (JSON)
- `resultData`: 计算结果 (JSON)
- `analysis`: AI分析结果
- `createdAt`: 创建时间

### Order
- `id`: 订单ID
- `userId`: 用户ID
- `type`: 订单类型
- `amount`: 金额
- `status`: 订单状态
- `createdAt`: 创建时间

### Master
- `id`: 大师ID
- `userId`: 用户ID
- `title`: 标题
- `description`: 描述
- `price`: 价格
- `rating`: 评分
- `available`: 是否可用
- `createdAt`: 创建时间

### Chat
- `id`: 聊天ID
- `userId`: 用户ID
- `masterId`: 大师ID
- `messages`: 消息列表 (JSON)
- `status`: 聊天状态
- `createdAt`: 创建时间

## 性能优化

### 1. 缓存策略
- 使用 KV 存储缓存常用数据
- 实现智能缓存失效机制
- 缓存八字计算结果

### 2. 数据库优化
- 使用 Prisma 查询优化
- 实现连接池管理
- 减少数据库往返次数

### 3. 边缘优化
- 利用 Cloudflare 边缘缓存
- 实现智能路由
- 减少冷启动时间

## 监控与维护

### 1. 日志收集
- 使用 Cloudflare Analytics
- 集成第三方日志服务

### 2. 错误追踪
- 实现全局错误处理
- 设置错误通知

### 3. 性能监控
- 监控响应时间
- 跟踪资源使用情况

## 常见问题

### 1. 数据库连接限制
- 使用 Supabase 连接池
- 实现连接复用

### 2. 冷启动延迟
- 使用 Cloudflare Durable Objects
- 实现预预热策略

### 3. 内存限制
- 优化代码，减少内存使用
- 使用流式处理

### 4. 执行时间限制
- 优化算法
- 使用异步处理
- 拆分长时间任务

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件至 [your-email@example.com]

---

感谢您对八字算命应用 Cloudflare Workers 迁移项目的关注！