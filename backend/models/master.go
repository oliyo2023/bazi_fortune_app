package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Master 大师模型 - 对应 public.masters 表
type Master struct {
	ID                 uuid.UUID `gorm:"type:char(36);primaryKey"`
	UserID             uuid.UUID `gorm:"type:char(36);not null;uniqueIndex"`
	Name               *string   `gorm:"type:text"`
	Specialty          *string   `gorm:"type:text"`
	PricePerMsg        float64   `gorm:"type:decimal(10,2);not null;default:0.00"`
	IsVerified         bool      `gorm:"not null;default:false"`
	InviteCode         *string   `gorm:"type:varchar(32);uniqueIndex"`
	Bio                *string   `gorm:"type:text"`
	AvatarURL          *string   `gorm:"type:text"`
	Gender             *string   `gorm:"type:text"`
	Age                *int      `gorm:"check:age >= 18 AND age <= 100"`
	ExperienceYears    int       `gorm:"default:0"`
	Rating             float64   `gorm:"type:decimal(3,2);default:0.00"`
	TotalConsultations int       `gorm:"default:0"`
	Phone              *string   `gorm:"type:text"`
	Wechat             *string   `gorm:"type:text"`
	Location           *string   `gorm:"type:text"`
	Tags               *string   `gorm:"type:text"` // JSON array stored as string
	IsOnline           bool      `gorm:"default:false"`
	LastActiveAt       time.Time
	CreatedAt          time.Time `gorm:"autoCreateTime"`

	// 关联关系
	User     User      `gorm:"foreignKey:UserID"`
	Orders   []Order   `gorm:"foreignKey:MasterID"`
	Chats    []Chat    `gorm:"foreignKey:MasterID"`
	Earnings []Earning `gorm:"foreignKey:MasterID"`
}

func (m *Master) BeforeCreate(tx *gorm.DB) error {
	if m.ID == uuid.Nil {
		m.ID = uuid.New()
	}
	return nil
}

// TableName 设置表名
func (Master) TableName() string {
	return "masters"
}
