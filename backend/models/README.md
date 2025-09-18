# 数据模型文档

本目录包含了八字算命应用的所有数据库模型定义。

## 模型结构

### 1. User (用户模型)
- **表名**: `users`
- **描述**: 用户基础信息，与Supabase Auth集成
- **字段**:
  - `id`: UUID主键，关联auth.users表
  - `role`: 用户角色 (user/master/admin)
  - `created_at`: 创建时间

### 2. Master (大师模型)
- **表名**: `masters`
- **描述**: 算命大师详细信息
- **主要字段**:
  - `user_id`: 关联用户ID
  - `name`: 大师姓名
  - `specialty`: 专长领域
  - `price_per_msg`: 每条消息价格
  - `is_verified`: 是否已认证
  - `rating`: 评分 (0-5)
  - `total_consultations`: 总咨询次数
  - `tags`: 专长标签数组
  - `is_online`: 是否在线

### 3. Order (订单模型)
- **表名**: `orders`
- **描述**: 用户订单信息
- **主要字段**:
  - `user_id`: 用户ID
  - `master_id`: 大师ID
  - `amount`: 订单金额
  - `status`: 订单状态 (pending/paid/cancelled/refunded)
  - `payment_method`: 支付方式 (alipay/wechat)
  - `platform_fee`: 平台费用

### 4. Chat (聊天模型)
- **表名**: `chats`
- **描述**: 聊天会话信息
- **主要字段**:
  - `order_id`: 关联订单ID（可选）
  - `user_id`: 用户ID
  - `master_id`: 大师ID（可选）
  - `bazi_input`: 八字输入数据 (JSON)
  - `is_trial`: 是否为试用聊天
  - `message_count`: 消息数量

### 5. Message (消息模型)
- **表名**: `messages`
- **描述**: 聊天消息
- **主要字段**:
  - `chat_id`: 聊天ID
  - `sender`: 发送者 (user/master/deepseek)
  - `content`: 消息内容
  - `timestamp`: 发送时间

### 6. Earning (收入模型)
- **表名**: `earnings`
- **描述**: 大师收入记录
- **主要字段**:
  - `master_id`: 大师ID
  - `order_id`: 订单ID
  - `amount`: 收入金额
  - `platform_fee`: 平台费用
  - `paid_out`: 是否已提现

### 7. BaziData (八字数据模型)
- **表名**: `bazi_data`
- **描述**: 八字计算结果和分析
- **主要字段**:
  - `user_id`: 用户ID
  - `chat_id`: 聊天ID（可选）
  - `input_data`: 输入数据 (JSON)
  - `result_data`: 计算结果 (JSON)
  - `analysis`: AI分析结果

## 使用方法

### 1. 初始化数据库连接
```go
import "bazi_fortune_app/backend/models"

// 初始化数据库连接
err := models.InitDB(config)
if err != nil {
    log.Fatal(err)
}

// 自动迁移表结构
err = models.AutoMigrate()
if err != nil {
    log.Printf("Migration failed: %v", err)
}
```

### 2. 基本CRUD操作
```go
// 获取数据库连接
db := models.GetDB()

// 创建用户
user := &models.User{
    ID:   userID, // 从Supabase Auth获取
    Role: models.UserRoleUser,
}
result := db.Create(user)

// 查询大师
var masters []models.Master
db.Where("is_verified = ? AND is_online = ?", true, true).Find(&masters)

// 创建订单
order := &models.Order{
    UserID:   userID,
    MasterID: masterID,
    Amount:   100.00,
    Status:   models.OrderStatusPending,
}
db.Create(order)
```

### 3. 八字数据处理
```go
// 设置八字输入数据
chat := &models.Chat{}
baziInput := &models.BaziInput{
    Year:   1990,
    Month:  6,
    Day:    15,
    Hour:   14,
    Gender: "male",
    Name:   "张三",
}
err := chat.SetBaziInput(baziInput)

// 获取八字输入数据
input, err := chat.GetBaziInput()
if err == nil && input != nil {
    // 处理八字输入
}
```

### 4. 关联查询
```go
// 查询用户及其大师信息
var user models.User
err := db.Preload("Master").First(&user, "id = ?", userID)

// 查询大师及其订单
var master models.Master
err := db.Preload("Orders").Preload("Earnings").First(&master, "id = ?", masterID)

// 查询聊天及其消息
var chat models.Chat
err := db.Preload("Messages").Preload("User").Preload("Master").First(&chat, "id = ?", chatID)
```

## 数据库约束

1. **外键约束**: 所有关联表都设置了适当的外键约束
2. **唯一约束**: 大师user_id、邀请码等字段设置了唯一约束
3. **检查约束**: 年龄、评分等字段设置了取值范围约束
4. **非空约束**: 关键字段设置了非空约束

## 性能优化

1. **索引**: 为常用查询字段添加了索引
2. **复合索引**: 为多字段查询添加了复合索引
3. **JSON字段**: 使用PostgreSQL的JSONB类型存储复杂数据结构

## 安全考虑

1. **数据验证**: 所有枚举类型都有取值范围限制
2. **软删除**: 可以根据需要添加软删除支持
3. **字段加密**: 敏感信息（如手机号）可以考虑加密存储
4. **访问控制**: 结合Supabase RLS进行行级安全控制