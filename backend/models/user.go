package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// User 用户模型 - 对应 public.users 表
type User struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	Role      UserRole  `gorm:"type:user_role;not null;default:'user'"`
	CreatedAt time.Time `gorm:"autoCreateTime"`

	// 关联关系
	Master *Master `gorm:"foreignKey:UserID"`
}

// TableName 设置表名
func (User) TableName() string {
	return "users"
}

// BeforeCreate 在创建前生成UUID
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}