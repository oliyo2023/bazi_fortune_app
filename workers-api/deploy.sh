#!/bin/bash

# 八字算命应用迁移到 Cloudflare Workers 的部署脚本

set -e

echo "开始部署八字算命应用到 Cloudflare Workers..."

# 安装依赖
echo "安装依赖..."
npm install

# 检查是否已登录 Cloudflare
if ! npx wrangler whoami &> /dev/null; then
    echo "请先登录 Cloudflare: npx wrangler login"
    exit 1
fi

# 生成 Prisma 客户端
echo "生成 Prisma 客户端..."
npx prisma generate

# 类型检查
echo "进行类型检查..."
npm run type-check

# 构建项目
echo "构建项目..."
npm run build

# 部署到 Cloudflare Workers
echo "部署到 Cloudflare Workers..."
npx wrangler deploy

# 设置 KV 命名空间（如果需要）
if [ "$1" == "--setup-kv" ]; then
    echo "设置 KV 命名空间..."
    npx wrangler kv:namespace create "BAZI_CACHE"
    npx wrangler kv:namespace create "BAZI_CACHE" --preview
    echo "请将生成的 KV 命名空间 ID 添加到 wrangler.toml 文件中"
fi

# 设置 D1 数据库（如果需要）
if [ "$1" == "--setup-d1" ]; then
    echo "设置 D1 数据库..."
    npx wrangler d1 create bazi-dev-db
    echo "请将生成的 D1 数据库 ID 添加到 wrangler.toml 文件中"
    
    # 执行数据库迁移
    echo "执行数据库迁移..."
    npx wrangler d1 execute bazi-dev-db --file=./prisma/migrations/0_init.sql
fi

echo "部署完成！"
echo "请确保在 Cloudflare 控制台中配置了以下环境变量："
echo "- DATABASE_URL: Supabase PostgreSQL 连接字符串"
echo "- JWT_SECRET: JWT 密钥"
echo "- DEEPSEEK_API_KEY: DeepSeek API 密钥"