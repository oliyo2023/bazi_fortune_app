package models

import (
	"bazi_fortune_app/backend/config"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// InitDB 初始化数据库连接
func InitDB(cfg *config.Config) error {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=require",
		"aws-0-ap-southeast-1.pooler.supabase.com", // 需要从Supabase URL解析
		"postgres", // 需要从配置中获取
		cfg.Supabase.ServiceRoleKey,
		"postgres", // 需要从配置中获取
		"6543",     // 需要从Supabase URL解析
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	return nil
}

// AutoMigrate 自动迁移数据库表结构
func AutoMigrate() error {
	return DB.AutoMigrate(
		&User{},
		&Master{},
		&Order{},
		&Chat{},
		&Message{},
		&Earning{},
		&BaziData{},
	)
}

// GetDB 获取数据库连接
func GetDB() *gorm.DB {
	return DB
}