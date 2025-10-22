package models

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

// AlmanacDetail 老黄历详情模型，承载前端需要的结构化数据
type AlmanacDetail struct {
	ID        uuid.UUID      `gorm:"type:char(36);primaryKey"`
	UserID    *uuid.UUID     `gorm:"type:char(36);index:uniq_user_date,unique"`
	BaziID    *uuid.UUID     `gorm:"type:char(36);index"`
	Date      time.Time      `gorm:"type:date;not null;index:uniq_user_date,unique"` // 仅日期部分
	Lang      string         `gorm:"type:varchar(8);not null;default:'zh'"`
	Vendor    string         `gorm:"type:text"` // deepseek | openai | mixed
	Data      datatypes.JSON `gorm:"type:json;not null"`
	CreatedAt time.Time      `gorm:"autoCreateTime"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime"`

	// 关联（可选）
	Bazi *BaziData `gorm:"foreignKey:BaziID"`
	User *User     `gorm:"foreignKey:UserID"`
}

func (AlmanacDetail) TableName() string {
	return "almanac_detail"
}

func (a *AlmanacDetail) BeforeCreate(tx *gorm.DB) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	return nil
}

// AlmanacDTO 用于强类型 JSON 读写，字段与前端 window.renderAlmanac 对齐
type AlmanacDTO struct {
	MonthTitle       string           `json:"monthTitle"`
	LunarLine        string           `json:"lunarLine"`
	Yi               []string         `json:"yi"`
	Ji               []string         `json:"ji"`
	WuXing           string           `json:"wuXing"`
	ChongSha         string           `json:"chongSha"`
	ZhiShen          string           `json:"zhiShen"`
	ShenYiQu         string           `json:"shenYiQu"`
	TaiShen          string           `json:"taiShen"`
	XiongShen        []string         `json:"xiongShen"`
	BaiLu            string           `json:"baiLu"`
	CurrentHourTitle string           `json:"currentHourTitle"`
	XiShen           string           `json:"xiShen"`
	HourYi           []string         `json:"hourYi"`
	HourJi           []string         `json:"hourJi"`
	Hours            []map[string]any `json:"hours"` // [{label:'子',status:'吉',active:true}, ...]
}

/* GetData 反序列化 JSON 到 DTO */
func (a *AlmanacDetail) GetData() (*AlmanacDTO, error) {
	if a.Data == nil || len(a.Data) == 0 {
		return nil, nil
	}
	var dto AlmanacDTO
	if err := json.Unmarshal(a.Data, &dto); err != nil {
		return nil, err
	}
	return &dto, nil
}

/* SetData 序列化 DTO 到 JSON */
func (a *AlmanacDetail) SetData(dto *AlmanacDTO) error {
	if dto == nil {
		a.Data = datatypes.JSON([]byte("{}"))
		return nil
	}
	b, err := json.Marshal(dto)
	if err != nil {
		return err
	}
	a.Data = datatypes.JSON(b)
	return nil
}
