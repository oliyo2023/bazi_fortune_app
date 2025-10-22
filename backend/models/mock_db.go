package models

import (
	"log"
)

// InitMockDB 初始化模拟数据库连接
func InitMockDB() error {
	log.Println("⚠️  Using mock database for development")
	log.Println("⚠️  Database operations will be simulated")
	log.Println("✅ Mock database initialized successfully")

	// 设置DB为nil，并在AutoMigrate中跳过实际迁移
	DB = nil

	return nil
}
