#!/bin/bash

# 八字算命 Workers API 数据库迁移脚本
echo "🗄️ 开始数据库迁移..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查环境变量
check_environment() {
    log_info "检查环境配置..."

    if [ -z "$DATABASE_URL" ]; then
        if [ -f ".env.local" ]; then
            source .env.local
        else
            log_error "DATABASE_URL 环境变量未设置"
            exit 1
        fi
    fi

    if [ -z "$DATABASE_URL" ]; then
        log_error "请在 .env.local 文件中设置 DATABASE_URL"
        exit 1
    fi

    log_success "环境配置检查完成"
}

# 安装 Prisma 客户端
install_prisma() {
    log_info "安装 Prisma 客户端..."

    npx prisma generate

    if [ $? -eq 0 ]; then
        log_success "Prisma 客户端安装成功"
    else
        log_error "Prisma 客户端安装失败"
        exit 1
    fi
}

# 备份数据库
backup_database() {
    log_info "备份数据库..."

    BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"

    # 根据数据库类型选择备份命令
    if [[ $DATABASE_URL == *"postgresql"* ]]; then
        # PostgreSQL 备份
        pg_dump "$DATABASE_URL" > "$BACKUP_FILE"
    elif [[ $DATABASE_URL == *"mysql"* ]]; then
        # MySQL 备份
        mysqldump "$DATABASE_URL" > "$BACKUP_FILE"
    else
        log_warning "不支持的数据库类型，跳过备份"
        return 0
    fi

    if [ $? -eq 0 ]; then
        log_success "数据库备份成功: $BACKUP_FILE"
    else
        log_warning "数据库备份失败，继续执行迁移"
    fi
}

# 推送数据库 schema
push_schema() {
    log_info "推送数据库 schema..."

    npx prisma db push

    if [ $? -eq 0 ]; then
        log_success "数据库 schema 推送成功"
    else
        log_error "数据库 schema 推送失败"
        exit 1
    fi
}

# 运行数据库迁移
run_migrations() {
    log_info "运行数据库迁移..."

    # 检查是否有迁移文件
    if [ ! -d "prisma/migrations" ]; then
        log_info "创建初始迁移..."
        npx prisma migrate dev --name init
    else
        # 应用现有迁移
        npx prisma migrate deploy
    fi

    if [ $? -eq 0 ]; then
        log_success "数据库迁移完成"
    else
        log_warning "数据库迁移可能未完全成功，请检查"
    fi
}

# 种子数据
seed_data() {
    log_info "是否需要种子数据？(y/N)"
    read -r response

    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        log_info "导入种子数据..."

        # 运行种子脚本
        npx tsx prisma/seed.ts

        if [ $? -eq 0 ]; then
            log_success "种子数据导入成功"
        else
            log_warning "种子数据导入失败或无种子数据"
        fi
    fi
}

# 重置数据库（可选）
reset_database() {
    log_info "是否需要重置数据库？这将删除所有数据！(y/N)"
    read -r response

    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        log_warning "重置数据库..."

        npx prisma migrate reset --force

        if [ $? -eq 0 ]; then
            log_success "数据库重置成功"
        else
            log_error "数据库重置失败"
            exit 1
        fi
    fi
}

# 验证数据库
validate_database() {
    log_info "验证数据库结构..."

    # 生成 Prisma 客户端验证连接
    npx prisma generate

    # 检查数据库连接
    npx prisma db pull --force > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        log_success "数据库结构验证通过"
    else
        log_warning "数据库结构验证失败，请检查"
    fi
}

# 创建管理用户
create_admin_user() {
    log_info "是否需要创建管理员用户？(y/N)"
    read -r response

    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        log_info "创建管理员用户..."

        echo "请输入管理员邮箱:"
        read -r admin_email

        echo "请输入管理员用户名:"
        read -r admin_username

        echo "请输入管理员密码:"
        read -s admin_password
        echo

        # 使用 Prisma 客户端创建用户
        npx tsx -e "
        import { PrismaClient } from '@prisma/client';
        import { hashPassword } from './src/lib/auth';

        const prisma = new PrismaClient();

        async function createAdmin() {
            const hashedPassword = await hashPassword('$admin_password');

            const user = await prisma.user.create({
                data: {
                    email: '$admin_email',
                    username: '$admin_username',
                    password: hashedPassword,
                    role: 'ADMIN'
                }
            });

            console.log('✅ 管理员用户创建成功:', user.email);
            await prisma.\$disconnect();
        }

        createAdmin().catch(console.error);
        "

        if [ $? -eq 0 ]; then
            log_success "管理员用户创建成功"
        else
            log_error "管理员用户创建失败"
        fi
    fi
}

# 显示数据库信息
show_database_info() {
    log_info "数据库连接信息:"
    echo "数据库 URL: ${DATABASE_URL:0:20}..."

    # 获取表数量
    if [[ $DATABASE_URL == *"postgresql"* ]]; then
        TABLE_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')
    elif [[ $DATABASE_URL == *"mysql"* ]]; then
        TABLE_COUNT=$(mysql "$DATABASE_URL" -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE();" -s -N)
    fi

    if [ ! -z "$TABLE_COUNT" ]; then
        log_info "数据库表数量: $TABLE_COUNT"
    fi
}

# 清理临时文件
cleanup() {
    log_info "清理临时文件..."

    # 清理旧的备份文件（保留最近5个）
    ls -t backup_*.sql 2>/dev/null | tail -n +6 | xargs rm -f

    log_success "清理完成"
}

# 显示帮助信息
show_help() {
    echo "八字算命 Workers API 数据库迁移工具"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -h, --help     显示帮助信息"
    echo "  -b, --backup   仅备份数据库"
    echo "  -r, --reset    重置数据库"
    echo "  -s, --seed     仅运行种子数据"
    echo "  -v, --validate 仅验证数据库"
    echo "  --no-backup    跳过数据库备份"
    echo "  --no-seed      跳过种子数据"
    echo ""
    echo "示例:"
    echo "  $0                    # 完整迁移流程"
    echo "  $0 --backup           # 仅备份数据库"
    echo "  $0 --reset            # 重置数据库"
    echo "  $0 --no-backup        # 迁移但不备份"
}

# 主函数
main() {
    local skip_backup=false
    local skip_seed=false
    local backup_only=false
    local reset_only=false
    local seed_only=false
    local validate_only=false

    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -b|--backup)
                backup_only=true
                shift
                ;;
            -r|--reset)
                reset_only=true
                shift
                ;;
            -s|--seed)
                seed_only=true
                shift
                ;;
            -v|--validate)
                validate_only=true
                shift
                ;;
            --no-backup)
                skip_backup=true
                shift
                ;;
            --no-seed)
                skip_seed=true
                shift
                ;;
            *)
                log_error "未知选项: $1"
                show_help
                exit 1
                ;;
        esac
    done

    log_info "开始数据库迁移流程..."

    # 执行相应的操作
    if [ "$backup_only" = true ]; then
        check_environment
        backup_database
        cleanup
        exit 0
    fi

    if [ "$reset_only" = true ]; then
        check_environment
        reset_database
        cleanup
        exit 0
    fi

    if [ "$seed_only" = true ]; then
        check_environment
        install_prisma
        seed_data
        cleanup
        exit 0
    fi

    if [ "$validate_only" = true ]; then
        check_environment
        install_prisma
        validate_database
        show_database_info
        cleanup
        exit 0
    fi

    # 完整迁移流程
    check_environment
    install_prisma

    if [ "$skip_backup" = false ]; then
        backup_database
    fi

    push_schema
    run_migrations
    validate_database

    if [ "$skip_seed" = false ]; then
        seed_data
    fi

    create_admin_user
    show_database_info
    cleanup

    log_success "数据库迁移完成！"
}

# 错误处理
trap 'log_error "迁移过程中发生错误，请检查日志"; exit 1' ERR

# 运行主函数
main "$@"
