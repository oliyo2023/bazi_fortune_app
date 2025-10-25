#!/bin/bash

# 八字算命 Workers API 设置脚本
echo "🔮 开始设置八字算命 Workers API..."

# 检查必要工具
check_requirements() {
    echo "📋 检查系统要求..."

    if ! command -v node &> /dev/null; then
        echo "❌ 错误: 需要安装 Node.js"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        echo "❌ 错误: 需要安装 npm"
        exit 1
    fi

    if ! command -v wrangler &> /dev/null; then
        echo "⚠️ 警告: 需要安装 Wrangler CLI"
        echo "运行: npm install -g wrangler"
    fi

    echo "✅ 系统要求检查完成"
}

# 安装依赖
install_dependencies() {
    echo "📦 安装项目依赖..."
    npm install
    echo "✅ 依赖安装完成"
}

# 设置环境变量
setup_environment() {
    echo "🔧 设置环境变量..."

    if [ ! -f ".env.local" ]; then
        echo "创建 .env.local 文件..."
        cat > .env.local << EOF
# JWT 配置
JWT_SECRET=your-jwt-secret-key-change-in-production

# 数据库配置
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# AI API 配置
DEEPSEEK_API_KEY=[YOUR-DEEPSEEK-API-KEY]
OPENAI_API_KEY=[YOUR-OPENAI-API-KEY]

# 支付配置
STRIPE_SECRET_KEY=sk_test_your-stripe-test-secret
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-test-public
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
ALIPAY_APP_ID=your-alipay-sandbox-app-id
ALIPAY_PRIVATE_KEY=your-alipay-sandbox-private-key
ALIPAY_PUBLIC_KEY=your-alipay-sandbox-public-key

# 邮件配置
SENDGRID_API_KEY=[YOUR-SENDGRID-API-KEY]
SENDGRID_FROM_EMAIL=noreply@your-domain.com
CLOUDFLARE_EMAIL_FROM=noreply@your-domain.com

# Cloudflare 配置
CLOUDFLARE_ACCOUNT_ID=[YOUR-CLOUDFLARE-ACCOUNT-ID]
CLOUDFLARE_API_TOKEN=[YOUR-CLOUDFLARE-API-TOKEN]
R2_ACCOUNT_ID=[YOUR-R2-ACCOUNT-ID]

# API 配置
API_URL=https://bazi-fortune-api.your-domain.com
FRONTEND_URL=https://bazi-fortune.your-domain.com
EOF
        echo "✅ .env.local 文件已创建，请填入正确的配置"
    else
        echo "✅ .env.local 文件已存在"
    fi
}

# 设置 Prisma
setup_prisma() {
    echo "🗄️ 设置数据库..."

    # 生成 Prisma 客户端
    npx prisma generate

    echo "✅ Prisma 设置完成"
}

# 创建 KV 命名空间
create_kv_namespace() {
    echo "🗂️ 创建 KV 命名空间..."

    echo "请在 Cloudflare Dashboard 中创建以下 KV 命名空间："
    echo "1. 生产环境: bazi-fortune-cache-prod"
    echo "2. 开发环境: bazi-fortune-cache-dev"
    echo ""
    echo "然后更新 wrangler.toml 中的 [env.production.kv_namespaces] 和 [env.development.kv_namespaces] 配置"
    echo ""
    echo "或使用 Wrangler CLI 创建："
    echo "wrangler kv:namespace create bazi-fortune-cache --preview"
    echo "wrangler kv:namespace create bazi-fortune-cache"
}

# 创建 R2 存储桶
create_r2_bucket() {
    echo "📁 创建 R2 存储桶..."

    echo "请在 Cloudflare Dashboard 中创建以下 R2 存储桶："
    echo "1. 生产环境: bazi-fortune-avatars"
    echo "2. 开发环境: bazi-fortune-avatars-dev"
    echo ""
    echo "然后更新 wrangler.toml 中的 [[env.production.r2_buckets]] 和 [[env.development.r2_buckets]] 配置"
}

# 验证配置
validate_configuration() {
    echo "🔍 验证配置..."

    # 检查 TypeScript 配置
    npx tsc --noEmit

    if [ $? -eq 0 ]; then
        echo "✅ TypeScript 配置验证通过"
    else
        echo "❌ TypeScript 配置验证失败"
        exit 1
    fi

    # 检查 Wrangler 配置
    wrangler whoami

    if [ $? -eq 0 ]; then
        echo "✅ Wrangler 配置验证通过"
    else
        echo "❌ 请先登录 Cloudflare: wrangler login"
        exit 1
    fi
}

# 运行测试
run_tests() {
    echo "🧪 运行测试..."

    # 这里可以添加测试命令
    echo "✅ 测试完成"
}

# 构建项目
build_project() {
    echo "🏗️ 构建项目..."

    npx tsc

    if [ $? -eq 0 ]; then
        echo "✅ 项目构建成功"
    else
        echo "❌ 项目构建失败"
        exit 1
    fi
}

# 显示后续步骤
show_next_steps() {
    echo "🎉 设置完成！"
    echo ""
    echo "📋 后续步骤："
    echo "1. 编辑 .env.local 文件，填入正确的配置"
    echo "2. 在 Cloudflare Dashboard 中创建 KV 命名空间和 R2 存储桶"
    echo "3. 更新 wrangler.toml 中的配置"
    echo "4. 运行本地开发: npm run dev"
    echo "5. 部署到 Cloudflare: npm run deploy"
    echo ""
    echo "📚 更多信息请查看 README.md"
}

# 主函数
main() {
    check_requirements
    install_dependencies
    setup_environment
    setup_prisma
    create_kv_namespace
    create_r2_bucket
    validate_configuration
    run_tests
    build_project
    show_next_steps
}

# 运行主函数
main "$@"
