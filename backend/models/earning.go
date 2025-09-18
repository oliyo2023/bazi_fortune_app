package models

import (
	"time"

	"github.com/google/uuid"
)

// Earning 收入模型 - 对应 public.earnings 表
type Earning struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	MasterID    uuid.UUID `gorm:"type:uuid;not null;index"`
	OrderID     uuid.UUID `gorm:"type:uuid;not null;uniqueIndex"`
	Amount      float64   `gorm:"type:decimal(10,2);not null"`
	PlatformFee float64   `gorm:"type:decimal(10,2);not null"`
	PaidOut     bool      `gorm:"not null;default:false"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`

	// 关联关系
	Master Master `gorm:"foreignKey:MasterID"`
	Order  Order  `gorm:"foreignKey:OrderID"`
}

// TableName 设置表名
func (Earning) TableName() string {
	return "earnings"
}

// GetNetAmount 获取净收入（扣除平台费用）
func (e *Earning) GetNetAmount() float64 {
	return e.Amount - e.PlatformFee
}