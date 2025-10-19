package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Order 订单模型 - 对应 public.orders 表
type Order struct {
	ID            uuid.UUID      `gorm:"type:char(36);primaryKey"`
	UserID        uuid.UUID      `gorm:"type:char(36);not null;index"`
	MasterID      uuid.UUID      `gorm:"type:char(36);not null;index"`
	Amount        float64        `gorm:"type:decimal(10,2);not null"`
	Status        OrderStatus    `gorm:"type:varchar(50);not null;default:'pending'"`
	PaymentMethod *PaymentMethod `gorm:"type:varchar(50)"`
	TransactionID *string        `gorm:"type:text"`
	PlatformFee   *float64       `gorm:"type:decimal(10,2)"`
	CreatedAt     time.Time      `gorm:"autoCreateTime"`
	UpdatedAt     time.Time      `gorm:"autoUpdateTime"`

	// 关联关系
	User   User   `gorm:"foreignKey:UserID"`
	Master Master `gorm:"foreignKey:MasterID"`
	Chats  []Chat `gorm:"foreignKey:OrderID"`
}

func (o *Order) BeforeCreate(tx *gorm.DB) error {
	if o.ID == uuid.Nil {
		o.ID = uuid.New()
	}
	return nil
}

// TableName 设置表名
func (Order) TableName() string {
	return "orders"
}
