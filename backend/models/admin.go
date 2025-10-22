package models

import (
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Admin 管理员模型
type Admin struct {
	ID        uuid.UUID `gorm:"type:char(36);primaryKey" json:"id"`
	Username  string    `gorm:"type:varchar(255);uniqueIndex" json:"username"`
	Password  string    `gorm:"type:varchar(255)" json:"-"`
	Role      string    `gorm:"type:varchar(50);not null;default:'admin'" json:"role"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}

// TableName 设置表名
func (Admin) TableName() string {
	return "admins"
}

// BeforeCreate 在创建前生成UUID
func (a *Admin) BeforeCreate(tx *gorm.DB) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	return nil
}

// SetPassword 使用 bcrypt 设置密码哈希
func (a *Admin) SetPassword(plain string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	a.Password = string(hash)
	return nil
}

// CheckPassword 校验明文密码
func (a *Admin) CheckPassword(plain string) bool {
	return bcrypt.CompareHashAndPassword([]byte(a.Password), []byte(plain)) == nil
}