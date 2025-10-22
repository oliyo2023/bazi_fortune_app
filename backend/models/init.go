package models

import (
	"log"

	"gorm.io/gorm"
)

var DB *gorm.DB

// GetDB 获取数据库连接
func GetDB() *gorm.DB {
	return DB
}

// InitDB initializes the database connection and performs migrations.
func InitDB(dbType, dsn string) (*gorm.DB, error) {

	if dbType == "mock" {
		log.Println("⚠️  Skipping database migration (using mock database)")
		DB = &gorm.DB{} // Assign a dummy GORM DB instance for mock
		return DB, nil
	}

	return DB, nil
}

func Init() {
	// 迁移 schema
	err := DB.AutoMigrate(&User{}, &Master{}, &Order{}, &Earning{}, &Admin{})
	if err != nil {
		panic("failed to migrate database")
	}
}
