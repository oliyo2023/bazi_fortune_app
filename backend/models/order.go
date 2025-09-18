package models

import (
	"time"

	"github.com/google/uuid"
)

// Order 订单模型 - 对应 public.orders 表
type Order struct {
	ID            uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	UserID        uuid.UUID      `gorm:"type:uuid;not null;index"`
	MasterID      uuid.UUID      `gorm:"type:uuid;not null;index"`
	Amount        float64        `gorm:"type:decimal(10,2);not null"`
	Status        OrderStatus    `gorm:"type:order_status;not null;default:'pending'"`
	PaymentMethod *PaymentMethod `gorm:"type:payment_method"`
	TransactionID *string        `gorm:"type:text"`
	PlatformFee   *float64       `gorm:"type:decimal(10,2)"`
	CreatedAt     time.Time      `gorm:"autoCreateTime"`
	UpdatedAt     time.Time      `gorm:"autoUpdateTime"`

	// 关联关系
	User   User   `gorm:"foreignKey:UserID"`
	Master Master `gorm:"foreignKey:MasterID"`
	Chats  []Chat  `gorm:"foreignKey:OrderID"`
}

// TableName 设置表名
func (Order) TableName() string {
	return "orders"
}