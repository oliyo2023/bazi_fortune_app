package models

import (
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// User 用户模型 - 对应 public.users 表
type User struct {
	ID        uuid.UUID `gorm:"type:char(36);primaryKey" json:"id"`
	Username  string    `gorm:"type:varchar(255);uniqueIndex" json:"username"` // 暂时允许null，后续可以添加数据填充
	Email     string    `gorm:"type:varchar(255);uniqueIndex" json:"email"`    // 暂时允许null，后续可以添加数据填充
	Password  string    `gorm:"type:varchar(255)" json:"-"`                    // bcrypt 哈希
	Role      UserRole  `gorm:"type:varchar(50);not null;default:'user'" json:"role"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`

	// 关联关系
	Master *Master `gorm:"foreignKey:UserID" json:"-"`
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

// SetPassword 使用 bcrypt 设置密码哈希
func (u *User) SetPassword(plain string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hash)
	return nil
}

// CheckPassword 校验明文密码
func (u *User) CheckPassword(plain string) bool {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(plain)) == nil
}
