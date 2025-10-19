package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Message 消息模型 - 对应 public.messages 表
type Message struct {
	ID        uuid.UUID     `gorm:"type:char(36);primaryKey"`
	ChatID    uuid.UUID     `gorm:"type:char(36);not null;index"`
	Sender    MessageSender `gorm:"type:varchar(50);not null"`
	Content   string        `gorm:"type:text;not null"`
	Timestamp time.Time     `gorm:"autoCreateTime"`

	// 关联关系
	Chat Chat `gorm:"foreignKey:ChatID"`
}

func (m *Message) BeforeCreate(tx *gorm.DB) error {
	if m.ID == uuid.Nil {
		m.ID = uuid.New()
	}
	return nil
}

// TableName 设置表名
func (Message) TableName() string {
	return "messages"
}
