package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// VerificationCode 验证码模型
type VerificationCode struct {
	ID        uuid.UUID  `gorm:"type:char(36);primaryKey" json:"id"`
	Phone     string     `gorm:"type:varchar(20);index" json:"phone"`
	Code      string     `gorm:"type:varchar(6)" json:"-"`
	Purpose   string     `gorm:"type:varchar(20)" json:"purpose"` // login, register, reset_password
	ExpiresAt time.Time  `json:"expires_at"`
	UsedAt    *time.Time `json:"used_at"`
	CreatedAt time.Time  `gorm:"autoCreateTime" json:"created_at"`
}

// TableName 设置表名
func (VerificationCode) TableName() string {
	return "verification_codes"
}

// BeforeCreate 在创建前生成UUID
func (v *VerificationCode) BeforeCreate(tx *gorm.DB) error {
	if v.ID == uuid.Nil {
		v.ID = uuid.New()
	}
	return nil
}

// IsExpired 检查验证码是否过期
func (v *VerificationCode) IsExpired() bool {
	return time.Now().After(v.ExpiresAt)
}

// IsUsed 检查验证码是否已使用
func (v *VerificationCode) IsUsed() bool {
	return v.UsedAt != nil
}

// MarkAsUsed 标记验证码为已使用
func (v *VerificationCode) MarkAsUsed() {
	now := time.Now()
	v.UsedAt = &now
}

// IsValid 检查验证码是否有效（未过期且未使用）
func (v *VerificationCode) IsValid() bool {
	return !v.IsExpired() && !v.IsUsed()
}
