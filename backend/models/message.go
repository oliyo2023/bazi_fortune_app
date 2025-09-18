package models

import (
	"time"

	"github.com/google/uuid"
)

// Message 消息模型 - 对应 public.messages 表
type Message struct {
	ID        uuid.UUID     `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	ChatID    uuid.UUID     `gorm:"type:uuid;not null;index"`
	Sender    MessageSender `gorm:"type:message_sender;not null"`
	Content   string        `gorm:"type:text;not null"`
	Timestamp time.Time     `gorm:"autoCreateTime"`

	// 关联关系
	Chat Chat `gorm:"foreignKey:ChatID"`
}

// TableName 设置表名
func (Message) TableName() string {
	return "messages"
}