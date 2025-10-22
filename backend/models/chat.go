package models

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)

// Chat 聊天模型 - 对应 public.chats 表
type Chat struct {
	ID           uuid.UUID      `gorm:"type:char(36);primaryKey"`
	OrderID      *uuid.UUID     `gorm:"type:char(36);index"`
	UserID       uuid.UUID      `gorm:"type:char(36);not null;index"`
	MasterID     *uuid.UUID     `gorm:"type:char(36);index"`
	BaziInput    datatypes.JSON `gorm:"type:json"` // 八字输入
	IsTrial      bool           `gorm:"not null;default:false;index"`
	MessageCount int            `gorm:"not null;default:0"`
	CreatedAt    time.Time      `gorm:"autoCreateTime"`

	// 关联关系
	Order    *Order    `gorm:"foreignKey:OrderID"`
	User     User      `gorm:"foreignKey:UserID"`
	Master   *Master   `gorm:"foreignKey:MasterID"`
	Messages []Message `gorm:"foreignKey:ChatID"`
}

// TableName 设置表名
func (Chat) TableName() string {
	return "chats"
}

// GetBaziInput 获取八字输入
func (c *Chat) GetBaziInput() (*BaziInput, error) {
	if c.BaziInput == nil {
		return nil, nil
	}

	var input BaziInput
	if err := json.Unmarshal(c.BaziInput, &input); err != nil {
		return nil, err
	}
	return &input, nil
}

// SetBaziInput 设置八字输入
func (c *Chat) SetBaziInput(input *BaziInput) error {
	if input == nil {
		c.BaziInput = nil
		return nil
	}

	data, err := json.Marshal(input)
	if err != nil {
		return err
	}

	c.BaziInput = datatypes.JSON(data)
	return nil
}
