package models

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// newLogger creates a custom logger for GORM
func newLogger() logger.Interface {
	return logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second, // Slow SQL threshold
			LogLevel:                  logger.Info, // Log level
			IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,        // Disable color
		},
	)
}

// DatabaseSetup 数据库设置和优化
type DatabaseSetup struct {
	DB *gorm.DB
}

// NewDatabaseSetup 创建数据库设置实例
func NewDatabaseSetup(db *gorm.DB) *DatabaseSetup {
	return &DatabaseSetup{DB: db}
}

// SetupConnectionPool 设置数据库连接池
func (ds *DatabaseSetup) SetupConnectionPool() error {
	sqlDB, err := ds.DB.DB()
	if err != nil {
		return fmt.Errorf("failed to get database instance: %w", err)
	}

	// 设置连接池参数
	sqlDB.SetMaxIdleConns(10)                  // 最大空闲连接数
	sqlDB.SetMaxOpenConns(100)                 // 最大打开连接数
	sqlDB.SetConnMaxLifetime(time.Hour)        // 连接最大生存时间
	sqlDB.SetConnMaxIdleTime(time.Minute * 30) // 连接最大空闲时间

	log.Println("✅ Database connection pool configured")
	return nil
}

// CreateCustomFunctions 创建自定义数据库函数（非 Postgres 环境跳过）
func (ds *DatabaseSetup) CreateCustomFunctions() error {
	log.Println("ℹ️ Skipping custom database functions (PostgreSQL only)")
	return nil
}

// SetupPerformanceOptimizations 设置性能优化（非 Postgres 环境跳过）
func (ds *DatabaseSetup) SetupPerformanceOptimizations() error {
	log.Println("ℹ️ Skipping PG-specific performance optimizations for non-Postgres drivers")
	return nil
}

// SetupDataRetentionPolicies 设置数据保留策略（非 Postgres 环境跳过）
func (ds *DatabaseSetup) SetupDataRetentionPolicies() error {
	log.Println("ℹ️ Skipping pg_cron data retention policies for non-Postgres drivers")
	return nil
}

// FullDatabaseSetup 完整的数据库设置
func (ds *DatabaseSetup) FullDatabaseSetup() error {
	log.Println("🔧 Starting full database setup...")

	if err := ds.SetupConnectionPool(); err != nil {
		return fmt.Errorf("failed to setup connection pool: %w", err)
	}

	if err := ds.CreateCustomFunctions(); err != nil {
		return fmt.Errorf("failed to create custom functions: %w", err)
	}

	if err := ds.SetupPerformanceOptimizations(); err != nil {
		return fmt.Errorf("failed to setup performance optimizations: %w", err)
	}

	if err := ds.SetupDataRetentionPolicies(); err != nil {
		return fmt.Errorf("failed to setup data retention policies: %w", err)
	}

	log.Println("🎉 Full database setup completed successfully!")
	return nil
}

// ValidateDatabase 验证数据库设置（MySQL 兼容）
func (ds *DatabaseSetup) ValidateDatabase() error {
	// 检查表是否存在（包含 almanac_detail）
	tables := []string{"users", "masters", "bazi_data", "chats", "messages", "orders", "earnings", "almanac_detail"}
	for _, table := range tables {
		var exists bool
		if err := ds.DB.Raw("SELECT COUNT(*) > 0 FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?", table).Scan(&exists).Error; err != nil {
			return fmt.Errorf("failed to check table %s: %w", table, err)
		}
		if !exists {
			return fmt.Errorf("table %s does not exist", table)
		}
	}
	log.Printf("✅ Database validation passed - %d tables (index check skipped for MySQL)\n", len(tables))
	return nil
}
