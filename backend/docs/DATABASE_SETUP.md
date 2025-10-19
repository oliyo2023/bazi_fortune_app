# 数据库架构和安全策略配置

## 概述

八字算命应用使用 Supabase PostgreSQL 作为主数据库，实现了完整的数据架构、安全策略和性能优化。

## 数据库架构

### 核心表结构

#### 1. users (用户表)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. masters (大师表)
```sql
CREATE TABLE masters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    name TEXT,
    specialty TEXT,
    price_per_msg DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_consultations INTEGER DEFAULT 0,
    is_online BOOLEAN DEFAULT false,
    search_vector tsvector,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. bazi_data (八字数据表)
```sql
CREATE TABLE bazi_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    chat_id UUID REFERENCES chats(id),
    input_data TEXT NOT NULL,
    result_data TEXT,
    analysis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. chats (聊天表)
```sql
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    user_id UUID NOT NULL REFERENCES users(id),
    master_id UUID REFERENCES masters(id),
    bazi_input JSONB,
    is_trial BOOLEAN NOT NULL DEFAULT false,
    message_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 5. messages (消息表)
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID NOT NULL REFERENCES chats(id),
    sender message_sender NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. orders (订单表)
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    master_id UUID NOT NULL REFERENCES masters(id),
    amount DECIMAL(10,2) NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    payment_method payment_method,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 7. earnings (收益表)
```sql
CREATE TABLE earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    master_id UUID NOT NULL REFERENCES masters(id),
    order_id UUID NOT NULL REFERENCES orders(id),
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 安全策略 (RLS)

### Row Level Security 策略

#### 用户表安全策略
```sql
-- 启用RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 用户只能查看和修改自己的数据
CREATE POLICY "Users can view own data" ON users 
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users 
FOR UPDATE USING (auth.uid() = id);
```

#### 八字数据安全策略
```sql
-- 启用RLS
ALTER TABLE bazi_data ENABLE ROW LEVEL SECURITY;

-- 用户只能查看和修改自己的八字数据
CREATE POLICY "Users can view own bazi data" ON bazi_data 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bazi data" ON bazi_data 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bazi data" ON bazi_data 
FOR UPDATE USING (auth.uid() = user_id);
```

#### 聊天安全策略
```sql
-- 启用RLS
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己参与的聊天
CREATE POLICY "Users can view own chats" ON chats 
FOR SELECT USING (auth.uid() = user_id OR auth.uid() = master_id);

CREATE POLICY "Users can insert own chats" ON chats 
FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### 消息安全策略
```sql
-- 启用RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己参与聊天的消息
CREATE POLICY "Users can view chat messages" ON messages 
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM chats 
        WHERE chats.id = messages.chat_id 
        AND (chats.user_id = auth.uid() OR chats.master_id = auth.uid())
    )
);
```

## 性能优化

### 索引策略

#### 基础索引
```sql
-- 用户表索引
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- 八字数据表索引
CREATE INDEX idx_bazi_data_user_id ON bazi_data(user_id);
CREATE INDEX idx_bazi_data_created_at ON bazi_data(created_at);
CREATE INDEX idx_bazi_data_chat_id ON bazi_data(chat_id);

-- 聊天表索引
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_chats_master_id ON chats(master_id);
CREATE INDEX idx_chats_is_trial ON chats(is_trial);

-- 大师表索引
CREATE INDEX idx_masters_is_verified ON masters(is_verified);
CREATE INDEX idx_masters_is_online ON masters(is_online);
CREATE INDEX idx_masters_rating ON masters(rating);
```

#### 复合索引
```sql
-- 八字数据复合索引
CREATE INDEX idx_bazi_user_created ON bazi_data(user_id, created_at DESC);

-- 聊天复合索引
CREATE INDEX idx_chats_user_master ON chats(user_id, master_id, created_at DESC);

-- 大师在线且认证索引
CREATE INDEX idx_masters_online_verified ON masters(is_online, is_verified) 
WHERE is_verified = true;
```

#### 全文搜索索引
```sql
-- 大师搜索向量索引
CREATE INDEX idx_masters_search_vector ON masters USING gin(search_vector);
```

### 连接池配置

```go
// 设置连接池参数
sqlDB.SetMaxIdleConns(10)                  // 最大空闲连接数
sqlDB.SetMaxOpenConns(100)                 // 最大打开连接数
sqlDB.SetConnMaxLifetime(time.Hour)        // 连接最大生存时间
sqlDB.SetConnMaxIdleTime(time.Minute * 30) // 连接最大空闲时间
```

## 自定义函数

### 业务函数

#### 1. 生成邀请码
```sql
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;
```

#### 2. 获取八字统计
```sql
CREATE OR REPLACE FUNCTION get_bazi_statistics(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_calculations', COUNT(*),
        'with_analysis', COUNT(*) FILTER (WHERE analysis IS NOT NULL),
        'recent_calculations', COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'),
        'first_calculation', MIN(created_at),
        'last_calculation', MAX(created_at)
    ) INTO result
    FROM bazi_data
    WHERE user_id = user_uuid;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;
```

#### 3. 获取大师收益统计
```sql
CREATE OR REPLACE FUNCTION get_master_earnings(master_uuid UUID, start_date DATE DEFAULT NULL, end_date DATE DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
    result JSON;
    filter_start DATE := COALESCE(start_date, CURRENT_DATE - INTERVAL '30 days');
    filter_end DATE := COALESCE(end_date, CURRENT_DATE);
BEGIN
    SELECT json_build_object(
        'total_amount', COALESCE(SUM(amount), 0),
        'transaction_count', COUNT(*),
        'average_amount', COALESCE(AVG(amount), 0),
        'period_start', filter_start,
        'period_end', filter_end
    ) INTO result
    FROM earnings
    WHERE master_id = master_uuid
    AND created_at::date BETWEEN filter_start AND filter_end;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;
```

## 触发器

### 自动更新触发器

#### 1. 更新时间戳触发器
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为各表创建触发器
CREATE TRIGGER update_users_updated_at 
BEFORE UPDATE ON users FOR EACH ROW 
EXECUTE PROCEDURE update_updated_at_column();
```

#### 2. 消息计数更新触发器
```sql
CREATE OR REPLACE FUNCTION update_chat_message_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE chats SET message_count = message_count + 1 WHERE id = NEW.chat_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE chats SET message_count = message_count - 1 WHERE id = OLD.chat_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_message_count
AFTER INSERT OR DELETE ON messages
FOR EACH ROW EXECUTE PROCEDURE update_chat_message_count();
```

#### 3. 搜索向量更新触发器
```sql
CREATE OR REPLACE FUNCTION update_master_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english', 
        COALESCE(NEW.name, '') || ' ' || 
        COALESCE(NEW.specialty, '') || ' ' || 
        COALESCE(NEW.bio, '') || ' ' ||
        COALESCE(NEW.tags, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_master_search
BEFORE INSERT OR UPDATE ON masters
FOR EACH ROW EXECUTE PROCEDURE update_master_search_vector();
```

## 统计视图

### 用户统计视图
```sql
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    u.id,
    u.role,
    u.created_at,
    COUNT(DISTINCT bd.id) as bazi_count,
    COUNT(DISTINCT c.id) as chat_count,
    COUNT(DISTINCT o.id) as order_count
FROM users u
LEFT JOIN bazi_data bd ON u.id = bd.user_id
LEFT JOIN chats c ON u.id = c.user_id
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.role, u.created_at;
```

### 大师统计视图
```sql
CREATE OR REPLACE VIEW master_statistics AS
SELECT 
    m.id,
    m.user_id,
    m.name,
    m.is_verified,
    m.rating,
    m.total_consultations,
    COUNT(DISTINCT c.id) as active_chats,
    COUNT(DISTINCT o.id) as total_orders,
    COALESCE(SUM(e.amount), 0) as total_earnings
FROM masters m
LEFT JOIN chats c ON m.id = c.master_id
LEFT JOIN orders o ON m.id = o.master_id
LEFT JOIN earnings e ON m.id = e.master_id
GROUP BY m.id, m.user_id, m.name, m.is_verified, m.rating, m.total_consultations;
```

## 数据保留策略

### 自动清理
```sql
-- 清理过期数据函数
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
BEGIN
    -- 删除超过1年的未付费聊天记录
    DELETE FROM messages 
    WHERE chat_id IN (
        SELECT id FROM chats 
        WHERE order_id IS NULL 
        AND created_at < CURRENT_DATE - INTERVAL '1 year'
    );
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- 删除对应的聊天记录
    DELETE FROM chats 
    WHERE order_id IS NULL 
    AND created_at < CURRENT_DATE - INTERVAL '1 year';
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;
```

### 定时任务（需要pg_cron扩展）
```sql
-- 每天凌晨2点清理过期数据
SELECT cron.schedule('cleanup-expired-data', '0 2 * * *', 'SELECT cleanup_expired_data();');

-- 每周日凌晨3点更新统计信息
SELECT cron.schedule('update-statistics', '0 3 * * 0', 'ANALYZE;');
```

## 备份和恢复

### Supabase 自动备份
- Supabase 提供自动备份功能
- 支持点时间恢复 (PITR)
- 备份保留期可配置

### 手动备份
```bash
# 导出数据库结构
pg_dump --schema-only -h your-host -U postgres -d postgres > schema.sql

# 导出数据
pg_dump --data-only -h your-host -U postgres -d postgres > data.sql

# 完整备份
pg_dump -h your-host -U postgres -d postgres > full_backup.sql
```

## 监控和维护

### 性能监控
- 使用 Supabase Dashboard 监控数据库性能
- 监控慢查询和连接数
- 定期检查索引使用情况

### 维护任务
```sql
-- 更新表统计信息
ANALYZE;

-- 重建索引（如需要）
REINDEX INDEX CONCURRENTLY idx_name;

-- 清理死元组
VACUUM ANALYZE table_name;
```

## 安全最佳实践

1. **启用 RLS**: 所有表都启用行级安全策略
2. **最小权限原则**: 用户只能访问自己的数据
3. **API 密钥管理**: 使用环境变量存储敏感信息
4. **连接加密**: 强制使用 SSL 连接
5. **审计日志**: 记录重要操作的审计日志
6. **定期备份**: 确保数据安全和可恢复性

## 扩展性考虑

1. **读写分离**: 可配置只读副本处理查询
2. **分区表**: 对大表进行分区优化
3. **缓存策略**: 使用 Redis 缓存热点数据
4. **CDN**: 静态资源使用 CDN 加速
5. **负载均衡**: 多实例部署和负载均衡