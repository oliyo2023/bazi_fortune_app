# Bazi Fortune App Backend

八字算命应用后端服务，基于 Golang + Gin + GORM + Supabase 构建。

## Contract Source of Truth

- Primary backend ADR: `../docs/adr/0001-primary-backend-go.md`
- Frozen API contract (OpenAPI): `openapi/openapi.yaml`

## 功能特性

- 🔐 用户认证系统（注册、登录、资料管理）
- 🔮 八字计算服务（公历转农历、八字排盘）
- 🤖 AI智能解读（集成DeepSeek AI）
- 📊 数据管理（用户数据、八字记录、分析结果）
- 🌐 RESTful API设计
- 🔒 数据安全（Supabase RLS策略）

## 技术栈

- **框架**: Gin Web Framework
- **数据库**: Supabase PostgreSQL
- **ORM**: GORM
- **AI服务**: DeepSeek API
- **配置管理**: YAML + 环境变量

## API 接口

### 认证相关
- `POST /api/v1/auth/register` - 用户注册
- `POST /api/v1/auth/login` - 用户登录
- `GET /api/v1/auth/profile/:id` - 获取用户资料

### 八字计算
- `POST /api/v1/bazi/calculate` - 计算八字
- `GET /api/v1/bazi/history/:user_id` - 获取用户八字历史
- `GET /api/v1/bazi/detail/:id` - 获取八字详情

### AI分析
- `POST /api/v1/ai/analyze` - AI分析八字

### 系统接口
- `GET /health` - 健康检查
- `GET /api/docs` - API文档
- `GET /models` - 数据模型信息

## 快速开始

### 1. 环境配置

创建 `.env` 文件并设置环境变量：

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DEEPSEEK_API_KEY=your_deepseek_api_key
```

### 2. 安装依赖

```bash
go mod tidy
```

### 3. 启动服务

```bash
go run main.go
```

服务将在 `http://localhost:8080` 启动。

## 配置说明

配置文件 `config.yaml`:

```yaml
server:
  port: "8080"

supabase:
  url: "${SUPABASE_URL}"
  anon_key: "${SUPABASE_ANON_KEY}"
  service_role_key: "${SUPABASE_SERVICE_ROLE_KEY}"

deepseek:
  api_key: "${DEEPSEEK_API_KEY}"
  api_base_url: "https://api.deepseek.com"
```

## 数据模型

### User (用户)
- ID: UUID
- Role: 用户角色 (user/master/admin)
- CreatedAt: 创建时间

### BaziData (八字数据)
- ID: UUID
- UserID: 用户ID
- InputData: 输入数据 (JSON)
- ResultData: 计算结果 (JSON)
- Analysis: AI分析结果
- CreatedAt: 创建时间

### Master (大师)
- ID: UUID
- UserID: 用户ID
- Name: 姓名
- Specialty: 专长
- PricePerMsg: 每条消息价格
- IsVerified: 是否认证

## 开发指南

### 添加新的API接口

1. 在 `handlers/` 目录下创建对应的处理器文件
2. 实现处理器方法
3. 在 `handlers/routes.go` 中注册路由

### 添加新的数据模型

1. 在 `models/` 目录下创建模型文件
2. 定义结构体和相关方法
3. 在 `models/init.go` 中添加到自动迁移列表

## 部署

### Docker 部署

```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod tidy && go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=builder /app/config.yaml .
CMD ["./main"]
```

### 环境变量

生产环境需要设置以下环境变量：
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DEEPSEEK_API_KEY`

## 测试

### 健康检查

```bash
curl http://localhost:8080/health
```

### 用户注册

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"role": "user"}'
```

### 八字计算

```bash
curl -X POST http://localhost:8080/api/v1/bazi/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 14,
    "minute": 30,
    "gender": "male",
    "name": "张三",
    "user_id": "user_uuid_here"
  }'
```

## 许可证

MIT License
