package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"bazi_fortune_app/backend/config"
	"bazi_fortune_app/backend/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// AlmanacHandler 负责老黄历生成与查询
type AlmanacHandler struct {
	db  *gorm.DB
	cfg *config.Config
}

func NewAlmanacHandler(db *gorm.DB, cfg *config.Config) *AlmanacHandler {
	return &AlmanacHandler{db: db, cfg: cfg}
}

type GenerateAlmanacRequest struct {
	Date           string `json:"date" binding:"required"` // YYYY-MM-DD
	Timezone       string `json:"timezone"`                // 默认 Asia/Shanghai
	BaziID         string `json:"bazi_id,omitempty"`
	Language       string `json:"language"`        // zh/en
	ProviderPrefer string `json:"provider_prefer"` // deepseek/openai
}

type GenerateAlmanacResponse struct {
	Success bool               `json:"success"`
	Message string             `json:"message"`
	Data    *models.AlmanacDTO `json:"data,omitempty"`
	Vendor  string             `json:"vendor,omitempty"`
}

type GetAlmanacQuery struct {
	Date   string `form:"date" binding:"required"`
	BaziID string `form:"bazi_id"`
}

// POST /api/v1/almanac/generate
func (h *AlmanacHandler) Generate(c *gin.Context) {
	var req GenerateAlmanacRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid request: " + err.Error()})
		return
	}
	if req.Language == "" {
		req.Language = "zh"
	}
	if req.Timezone == "" {
		req.Timezone = "Asia/Shanghai"
	}
	prefer := strings.ToLower(req.ProviderPrefer)
	if prefer != "openai" {
		prefer = "deepseek"
	}

	// 解析日期
	theDay, err := time.Parse("2006-01-02", req.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid date format, use YYYY-MM-DD"})
		return
	}

	// 解析可选 baziID
	var baziUUID *uuid.UUID
	if req.BaziID != "" {
		id, err := uuid.Parse(req.BaziID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid bazi_id"})
			return
		}
		baziUUID = &id
	}

	// 组装 Prompt
	systemPrompt := h.systemPrompt(req.Language)
	userPrompt := h.userPrompt(theDay, req.Timezone, req.Language)

	// 编排调用
	orch := NewOrchestrator(prefer, h.cfg, h.chooseModel(prefer))
	vendor, content, err := orch.ChatJSON(systemPrompt, userPrompt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "AI call failed: " + err.Error()})
		return
	}

	// 解析严格 JSON
	dto := &models.AlmanacDTO{}
	if err := json.Unmarshal([]byte(h.extractJSON(content)), dto); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Invalid JSON from AI: " + err.Error()})
		return
	}
	// 字段兜底（防止空值导致前端异常）
	h.fillDefaults(dto)

	// upsert（user_id 从 JWT 解析，项目已有 SupabaseAuthMiddleware，但此处简单从 Header 的 claim 注入到 context）
	var userID *uuid.UUID
	if sub := c.GetString("user_id"); sub != "" {
		if uid, err := uuid.Parse(sub); err == nil {
			userID = &uid
		}
	}

	// 幂等：同 user/date 唯一，冲突则更新
	var record models.AlmanacDetail
	err = h.db.Where("user_id = ? AND date = ?", userID, theDay).
		Take(&record).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "DB error: " + err.Error()})
		return
	}

	if err == gorm.ErrRecordNotFound {
		record = models.AlmanacDetail{
			UserID: userID,
			BaziID: baziUUID,
			Date:   theDay,
			Lang:   req.Language,
			Vendor: vendor,
		}
		if err := record.SetData(dto); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "encode data failed: " + err.Error()})
			return
		}
		if err := h.db.Create(&record).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "insert failed: " + err.Error()})
			return
		}
	} else {
		record.Lang = req.Language
		record.Vendor = vendor
		if err := record.SetData(dto); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "encode data failed: " + err.Error()})
			return
		}
		if err := h.db.Save(&record).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "update failed: " + err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, GenerateAlmanacResponse{
		Success: true,
		Message: "ok",
		Data:    dto,
		Vendor:  vendor,
	})
}

// GET /api/v1/almanac/detail?date=YYYY-MM-DD
func (h *AlmanacHandler) GetDetail(c *gin.Context) {
	var q GetAlmanacQuery
	if err := c.ShouldBindQuery(&q); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid query: " + err.Error()})
		return
	}
	theDay, err := time.Parse("2006-01-02", q.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid date format"})
		return
	}

	var userID *uuid.UUID
	if sub := c.GetString("user_id"); sub != "" {
		if uid, err := uuid.Parse(sub); err == nil {
			userID = &uid
		}
	}

	var rec models.AlmanacDetail
	if err := h.db.Where("user_id = ? AND date = ?", userID, theDay).Take(&rec).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "DB error: " + err.Error()})
		return
	}

	dto, err := rec.GetData()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "parse data error: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "ok",
		"data":    dto,
		"vendor":  rec.Vendor,
		"lang":    rec.Lang,
	})
}

// Prompt 构造
func (h *AlmanacHandler) systemPrompt(lang string) string {
	if lang == "en" {
		return "You are a Chinese Almanac (Huangli) expert. Output STRICT JSON only with keys exactly: monthTitle,lunarLine,yi,ji,wuXing,chongSha,zhiShen,shenYiQu,taiShen,xiongShen,baiLu,currentHourTitle,xiShen,hourYi,hourJi,hours. No extra text."
	}
	return "你是专业的黄历大师。严格输出 JSON，且仅包含这些键：monthTitle,lunarLine,yi,ji,wuXing,chongSha,zhiShen,shenYiQu,taiShen,xiongShen,baiLu,currentHourTitle,xiShen,hourYi,hourJi,hours。不要输出任何多余文字。"
}

func (h *AlmanacHandler) userPrompt(day time.Time, tz string, lang string) string {
	dateStr := day.Format("2006-01-02")
	if lang == "en" {
		return fmt.Sprintf(`Generate Chinese Almanac for "%s" in timezone "%s". 
Describe:
- monthTitle (e.g., "Xin You Month")
- lunarLine (lunar date summary)
- yi: array of auspicious activities
- ji: array of inauspicious activities
- wuXing: day's element
- chongSha
- zhiShen
- shenYiQu
- taiShen
- xiongShen: array
- baiLu
- currentHourTitle
- xiShen
- hourYi: array
- hourJi: array
- hours: 12 items, each {"label":"子","status":"吉|凶|平","active":true|false}.
Output STRICT JSON only.`, dateStr, tz)
	}
	return fmt.Sprintf(`生成 "%s"（时区 %s）的老黄历：
- monthTitle：如“九月甲戌月”
- lunarLine：农历日期与干支简述
- yi：宜（数组）
- ji：忌（数组）
- wuXing：当日五行
- chongSha：冲煞
- zhiShen：值神
- shenYiQu：神煞/益趋
- taiShen：胎神
- xiongShen：凶神（数组）
- baiLu：节气/白露提示
- currentHourTitle：当前时辰标题
- xiShen：喜神方位
- hourYi：当时辰宜
- hourJi：当时辰忌
- hours：12 时辰数组，每项 {"label":"子","status":"吉|凶|平","active":true|false}
严格输出 JSON。`, dateStr, tz)
}

// 从模型回复中提取 JSON（有些模型会包裹```json ... ```）
func (h *AlmanacHandler) extractJSON(s string) string {
	trim := strings.TrimSpace(s)
	trim = strings.Trim(trim, " \n\r\t")
	if strings.HasPrefix(trim, "```") {
		trim = strings.TrimPrefix(trim, "```json")
		trim = strings.TrimPrefix(trim, "```JSON")
		trim = strings.TrimPrefix(trim, "```")
		trim = strings.TrimSuffix(trim, "```")
		trim = strings.TrimSpace(trim)
	}
	return trim
}

func (h *AlmanacHandler) fillDefaults(d *models.AlmanacDTO) {
	if d.Yi == nil {
		d.Yi = []string{}
	}
	if d.Ji == nil {
		d.Ji = []string{}
	}
	if d.XiongShen == nil {
		d.XiongShen = []string{}
	}
	if d.HourYi == nil {
		d.HourYi = []string{}
	}
	if d.HourJi == nil {
		d.HourJi = []string{}
	}
	if d.Hours == nil {
		d.Hours = []map[string]any{}
	}
	// 规范化 hours 项，确保 label/status/active 键存在
	for i := range d.Hours {
		item := d.Hours[i]
		// label
		if _, ok := item["label"]; !ok || item["label"] == nil {
			item["label"] = ""
		}
		// status
		if _, ok := item["status"]; !ok || item["status"] == nil {
			item["status"] = "平"
		}
		// active
		if _, ok := item["active"]; !ok || item["active"] == nil {
			item["active"] = false
		}
		d.Hours[i] = item
	}
}

func (h *AlmanacHandler) chooseModel(prefer string) string {
	if prefer == "openai" {
		return "gpt-4o-mini" // 轻量且价格友好，可根据需要调整
	}
	return "deepseek-chat"
}
