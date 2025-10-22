package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Earning 收入模型 - 对应 public.earnings 表
type Earning struct {
	ID          uuid.UUID `gorm:"type:char(36);primaryKey"`
	MasterID    uuid.UUID `gorm:"type:char(36);not null;index"`
	OrderID     uuid.UUID `gorm:"type:char(36);not null;uniqueIndex"`
	Amount      float64   `gorm:"type:decimal(10,2);not null"`
	PlatformFee float64   `gorm:"type:decimal(10,2);not null"`
	PaidOut     bool      `gorm:"not null;default:false"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`

	// 关联关系
	Master Master `gorm:"foreignKey:MasterID"`
	Order  Order  `gorm:"foreignKey:OrderID"`
}

func (e *Earning) BeforeCreate(tx *gorm.DB) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return nil
}

// TableName 设置表名
func (Earning) TableName() string {
	return "earnings"
}

// GetNetAmount 获取净收入（扣除平台费用）
func (e *Earning) GetNetAmount() float64 {
	return e.Amount - e.PlatformFee
}
