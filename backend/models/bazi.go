package models

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

// BaziData 八字数据模型 - 用于存储八字计算结果
type BaziData struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	UserID      uuid.UUID `gorm:"type:uuid;not null;index"`
	ChatID      *uuid.UUID `gorm:"type:uuid;index"`
	InputData   string    `gorm:"type:text;not null"` // JSON字符串格式的输入数据
	ResultData  string    `gorm:"type:text"`          // JSON字符串格式的计算结果
	Analysis    *string   `gorm:"type:text"`          // AI分析结果
	CreatedAt   time.Time `gorm:"autoCreateTime"`

	// 关联关系
	User User `gorm:"foreignKey:UserID"`
	Chat *Chat `gorm:"foreignKey:ChatID"`
}

// TableName 设置表名
func (BaziData) TableName() string {
	return "bazi_data"
}

// BaziInput 八字输入数据结构
type BaziInput struct {
	Year     int    `json:"year"`
	Month    int    `json:"month"`
	Day      int    `json:"day"`
	Hour     int    `json:"hour"`
	Minute   int    `json:"minute"`
	Gender   string `json:"gender"`
	Name     string `json:"name,omitempty"`
	Timezone string `json:"timezone,omitempty"`
}

// BaziResult 八字计算结果
type BaziResult struct {
	YearPillar    string   `json:"year_pillar"`    // 年柱
	MonthPillar   string   `json:"month_pillar"`   // 月柱
	DayPillar     string   `json:"day_pillar"`     // 日柱
	HourPillar    string   `json:"hour_pillar"`    // 时柱
	DayMaster     string   `json:"day_master"`     // 日主
	Zodiac        string   `json:"zodiac"`         // 生肖
	Nayin         string   `json:"nayin"`          // 纳音
	Season        string   `json:"season"`         // 季节
	SolarTerms    []string `json:"solar_terms"`      // 节气
	LunarDate     string   `json:"lunar_date"`       // 农历日期
	FiveElements  map[string]int `json:"five_elements"` // 五行统计
	ShiShen       map[string]string `json:"shi_shen"`   // 十神分布
	YongShen      []string `json:"yong_shen"`        // 用神
	XiShen        []string `json:"xi_shen"`          // 喜神
	JiShen        []string `json:"ji_shen"`          // 忌神
	LuckyElements []string `json:"lucky_elements"`   // 有利五行
	Colors        []string `json:"colors"`           // 有利颜色
	Numbers       []int    `json:"numbers"`          // 有利数字
	Directions    []string `json:"directions"`       // 有利方位
}

// GetInputData 获取输入数据
func (b *BaziData) GetInputData() (*BaziInput, error) {
	if b.InputData == "" {
		return nil, nil
	}
	
	var input BaziInput
	if err := json.Unmarshal([]byte(b.InputData), &input); err != nil {
		return nil, err
	}
	return &input, nil
}

// SetInputData 设置输入数据
func (b *BaziData) SetInputData(input *BaziInput) error {
	if input == nil {
		b.InputData = ""
		return nil
	}
	
	data, err := json.Marshal(input)
	if err != nil {
		return err
	}
	b.InputData = string(data)
	return nil
}

// GetResultData 获取计算结果
func (b *BaziData) GetResultData() (*BaziResult, error) {
	if b.ResultData == "" {
		return nil, nil
	}
	
	var result BaziResult
	if err := json.Unmarshal([]byte(b.ResultData), &result); err != nil {
		return nil, err
	}
	return &result, nil
}

// SetResultData 设置计算结果
func (b *BaziData) SetResultData(result *BaziResult) error {
	if result == nil {
		b.ResultData = ""
		return nil
	}
	
	data, err := json.Marshal(result)
	if err != nil {
		return err
	}
	b.ResultData = string(data)
	return nil
}