package handlers

import (
	"bazi_fortune_app/backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// BaziHandler 八字处理器
type BaziHandler struct {
	db *gorm.DB
}

// NewBaziHandler 创建八字处理器
func NewBaziHandler(db *gorm.DB) *BaziHandler {
	return &BaziHandler{db: db}
}

// CalculateRequest 八字计算请求
type CalculateRequest struct {
	Year     int    `json:"year" binding:"required,min=1900,max=2100"`
	Month    int    `json:"month" binding:"required,min=1,max=12"`
	Day      int    `json:"day" binding:"required,min=1,max=31"`
	Hour     int    `json:"hour" binding:"required,min=0,max=23"`
	Minute   int    `json:"minute" binding:"required,min=0,max=59"`
	Gender   string `json:"gender" binding:"required,oneof=male female"`
	Name     string `json:"name"`
	Timezone string `json:"timezone"`
	// UserID   string `json:"user_id" binding:"required"` // 从 JWT 中获取用户ID
}

// Calculate 计算八字
func (h *BaziHandler) Calculate(c *gin.Context) {
	var req CalculateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		JSONError(c, 42001, "invalid_request", http.StatusBadRequest)
		return
	}

	// 从 Gin 上下文获取用户ID（来自 JWT 中间件）
	uid := c.GetString("user_id")
	if uid == "" {
		JSONError(c, 42002, "unauthorized", http.StatusUnauthorized)
		return
	}
	userID, err := uuid.Parse(uid)
	if err != nil {
		JSONError(c, 42003, "invalid_token", http.StatusUnauthorized)
		return
	}

	// 验证用户是否存在 (可选，因为JWT已验证用户，但可以作为额外检查)
	var user models.User
	if err := h.db.First(&user, "id = ?", userID).Error; err != nil {
		JSONError(c, 42004, "user_not_found", http.StatusNotFound)
		return
	}

	// 创建输入数据
	input := &models.BaziInput{
		Year:     req.Year,
		Month:    req.Month,
		Day:      req.Day,
		Hour:     req.Hour,
		Minute:   req.Minute,
		Gender:   req.Gender,
		Name:     req.Name,
		Timezone: req.Timezone,
	}

	// 计算八字结果
	result := calculateBaziResult(input)

	// 创建八字数据记录
	baziData := models.BaziData{
		UserID:    userID,
		CreatedAt: time.Now(),
	}

	// 设置输入和结果数据
	if err := baziData.SetInputData(input); err != nil {
		JSONError(c, 42005, "data_validation_failed", http.StatusInternalServerError)
		return
	}

	if err := baziData.SetResultData(result); err != nil {
		JSONError(c, 42006, "data_validation_failed", http.StatusInternalServerError)
		return
	}

	// 保存到数据库
	if err := h.db.Create(&baziData).Error; err != nil {
		JSONError(c, 42007, "database_error", http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "ok",
		"data":    baziData,
		"result":  result,
	})
}

// GetHistory 获取用户八字历史记录
func (h *BaziHandler) GetHistory(c *gin.Context) {
	// 从 JWT 中间件写入的上下文读取用户ID
	uid := c.GetString("user_id")
	if uid == "" {
		JSONError(c, 40101, "unauthorized", http.StatusUnauthorized)
		return
	}
	userID, err := uuid.Parse(uid)
	if err != nil {
		JSONError(c, 42012, "invalid_user_id_format", http.StatusUnauthorized)
		return
	}

	// 查询用户的八字记录
	var baziRecords []models.BaziData
	if err := h.db.
		Where("user_id = ?", userID).
		Order("created_at DESC").
		Find(&baziRecords).Error; err != nil {
		JSONError(c, 42013, "database_error", http.StatusInternalServerError)
		return
	}

	// 统一响应格式：{"code":0,"message":"ok","data":[...]}
	JSONOK(c, baziRecords)
}

// GetBaziDetail 获取八字详情
func (h *BaziHandler) GetBaziDetail(c *gin.Context) {
	baziIDStr := c.Param("id")

	// 从 Gin 上下文获取用户ID（来自 JWT 中间件）
	uid := c.GetString("user_id")
	if uid == "" {
		JSONError(c, 42020, "unauthorized", http.StatusUnauthorized)
		return
	}
	requestUserID, err := uuid.Parse(uid)
	if err != nil {
		JSONError(c, 42021, "invalid_token", http.StatusUnauthorized)
		return
	}

	// 解析八字ID
	baziID, err := uuid.Parse(baziIDStr)
	if err != nil {
		JSONError(c, 42022, "invalid_parameters", http.StatusBadRequest)
		return
	}

	// 查询八字记录
	var baziData models.BaziData
	if err := h.db.First(&baziData, "id = ?", baziID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			JSONError(c, 42023, "not_found", http.StatusNotFound)
			return
		}
		JSONError(c, 42024, "database_error", http.StatusInternalServerError)
		return
	}

	// 验证用户是否有权限访问该八字记录
	if baziData.UserID != requestUserID {
		JSONError(c, 42025, "forbidden", http.StatusForbidden)
		return
	}

	// 获取输入和结果数据
	input, err := baziData.GetInputData()
	if err != nil {
		JSONError(c, 42026, "data_validation_failed", http.StatusInternalServerError)
		return
	}
	result, err := baziData.GetResultData()
	if err != nil {
		JSONError(c, 42027, "data_validation_failed", http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "ok",
		"data":    baziData,
		"input":   input,
		"result":  result,
	})
}

// calculateBaziResult 计算八字结果（简化版本）
func calculateBaziResult(input *models.BaziInput) *models.BaziResult {
	// 天干地支数组
	tianGan := []string{"甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"}
	diZhi := []string{"子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"}

	// 生肖数组
	zodiac := []string{"鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"}

	// 简化的八字计算（实际应使用专业的农历转换库）
	yearIndex := (input.Year - 4) % 60
	yearTianGan := tianGan[yearIndex%10]
	yearDiZhi := diZhi[yearIndex%12]

	monthIndex := (input.Month - 1 + yearIndex*12) % 60
	monthTianGan := tianGan[monthIndex%10]
	monthDiZhi := diZhi[monthIndex%12]

	dayIndex := (input.Year*365 + input.Month*30 + input.Day) % 60
	dayTianGan := tianGan[dayIndex%10]
	dayDiZhi := diZhi[dayIndex%12]

	hourIndex := (input.Hour/2 + dayIndex*12) % 60
	hourTianGan := tianGan[hourIndex%10]
	hourDiZhi := diZhi[hourIndex%12]

	return &models.BaziResult{
		YearPillar:  yearTianGan + yearDiZhi,
		MonthPillar: monthTianGan + monthDiZhi,
		DayPillar:   dayTianGan + dayDiZhi,
		HourPillar:  hourTianGan + hourDiZhi,
		DayMaster:   dayTianGan,
		Zodiac:      zodiac[(input.Year-4)%12],
		Nayin:       "海中金", // 简化处理
		Season:      getSeason(input.Month),
		SolarTerms:  []string{"立春", "雨水"}, // 简化处理
		LunarDate:   "农历正月初一",             // 简化处理，实际需要转换
		FiveElements: map[string]int{
			"木": 2,
			"火": 1,
			"土": 2,
			"金": 2,
			"水": 1,
		},
		ShiShen: map[string]string{
			"年": "正官",
			"月": "偏财",
			"日": "日主",
			"时": "食神",
		},
		YongShen:      []string{"水", "木"},
		XiShen:        []string{"金"},
		JiShen:        []string{"火", "土"},
		LuckyElements: []string{"水", "木", "金"},
		Colors:        []string{"黑色", "蓝色", "绿色", "白色"},
		Numbers:       []int{1, 6, 3, 8, 4, 9},
		Directions:    []string{"北方", "东方", "西方"},
	}
}

// getSeason 根据月份获取季节
func getSeason(month int) string {
	switch {
	case month >= 3 && month <= 5:
		return "春季"
	case month >= 6 && month <= 8:
		return "夏季"
	case month >= 9 && month <= 11:
		return "秋季"
	default:
		return "冬季"
	}
}

// CreateBaziRecord 创建八字记录
func (h *BaziHandler) CreateBaziRecord(c *gin.Context) {
	var req CalculateRequest // 复用 CalculateRequest 结构体
	if err := c.ShouldBindJSON(&req); err != nil {
		JSONError(c, 42030, "invalid_request", http.StatusBadRequest)
		return
	}

	// 从 Gin 上下文获取用户ID（来自 JWT 中间件）
	uid := c.GetString("user_id")
	if uid == "" {
		JSONError(c, 42031, "unauthorized", http.StatusUnauthorized)
		return
	}
	userID, err := uuid.Parse(uid)
	if err != nil {
		JSONError(c, 42032, "invalid_token", http.StatusUnauthorized)
		return
	}

	// 创建输入数据
	input := &models.BaziInput{
		Year:     req.Year,
		Month:    req.Month,
		Day:      req.Day,
		Hour:     req.Hour,
		Minute:   req.Minute,
		Gender:   req.Gender,
		Name:     req.Name,
		Timezone: req.Timezone,
	}

	// 计算八字结果 (这里可以根据实际需求选择是否重新计算，或者只保存前端传来的结果)
	result := calculateBaziResult(input)

	// 创建八字数据记录
	baziData := models.BaziData{
		UserID:    userID,
		CreatedAt: time.Now(),
	}

	// 设置输入和结果数据
	if err := baziData.SetInputData(input); err != nil {
		JSONError(c, 42033, "data_validation_failed", http.StatusInternalServerError)
		return
	}

	if err := baziData.SetResultData(result); err != nil {
		JSONError(c, 42034, "data_validation_failed", http.StatusInternalServerError)
		return
	}

	// 保存到数据库
	if err := h.db.Create(&baziData).Error; err != nil {
		JSONError(c, 42035, "database_error", http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"code":    0,
		"message": "ok",
		"data":    baziData,
		"result":  result,
	})
}

// UpdateBaziRecord 更新八字记录
func (h *BaziHandler) UpdateBaziRecord(c *gin.Context) {
	baziIDStr := c.Param("id")

	// 从 Gin 上下文获取用户ID（来自 JWT 中间件）
	uid := c.GetString("user_id")
	if uid == "" {
		JSONError(c, 42040, "unauthorized", http.StatusUnauthorized)
		return
	}
	requestUserID, err := uuid.Parse(uid)
	if err != nil {
		JSONError(c, 42041, "invalid_token", http.StatusUnauthorized)
		return
	}

	// 解析八字ID
	baziID, err := uuid.Parse(baziIDStr)
	if err != nil {
		JSONError(c, 42042, "invalid_parameters", http.StatusBadRequest)
		return
	}

	var existingBaziData models.BaziData
	if err := h.db.First(&existingBaziData, "id = ?", baziID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			JSONError(c, 42043, "not_found", http.StatusNotFound)
			return
		}
		JSONError(c, 42044, "database_error", http.StatusInternalServerError)
		return
	}

	// 验证用户是否有权限更新该八字记录
	if existingBaziData.UserID != requestUserID {
		JSONError(c, 42045, "forbidden", http.StatusForbidden)
		return
	}

	var req CalculateRequest // 复用 CalculateRequest 结构体
	if err := c.ShouldBindJSON(&req); err != nil {
		JSONError(c, 42046, "invalid_request", http.StatusBadRequest)
		return
	}

	// 更新输入数据
	input := &models.BaziInput{
		Year:     req.Year,
		Month:    req.Month,
		Day:      req.Day,
		Hour:     req.Hour,
		Minute:   req.Minute,
		Gender:   req.Gender,
		Name:     req.Name,
		Timezone: req.Timezone,
	}

	// 重新计算八字结果
	result := calculateBaziResult(input)

	// 更新八字数据记录
	if err := existingBaziData.SetInputData(input); err != nil {
		JSONError(c, 42047, "data_validation_failed", http.StatusInternalServerError)
		return
	}

	if err := existingBaziData.SetResultData(result); err != nil {
		JSONError(c, 42048, "data_validation_failed", http.StatusInternalServerError)
		return
	}

	// 保存到数据库
	if err := h.db.Save(&existingBaziData).Error; err != nil {
		JSONError(c, 42049, "database_error", http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "ok",
		"data":    existingBaziData,
		"result":  result,
	})
}

// DeleteBaziRecord 删除八字记录
func (h *BaziHandler) DeleteBaziRecord(c *gin.Context) {
	baziIDStr := c.Param("id")

	// 从 Gin 上下文获取用户ID（来自 JWT 中间件）
	uid := c.GetString("user_id")
	if uid == "" {
		JSONError(c, 42050, "unauthorized", http.StatusUnauthorized)
		return
	}
	requestUserID, err := uuid.Parse(uid)
	if err != nil {
		JSONError(c, 42051, "invalid_token", http.StatusUnauthorized)
		return
	}

	// 解析八字ID
	baziID, err := uuid.Parse(baziIDStr)
	if err != nil {
		JSONError(c, 42052, "invalid_parameters", http.StatusBadRequest)
		return
	}

	var existingBaziData models.BaziData
	if err := h.db.First(&existingBaziData, "id = ?", baziID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			JSONError(c, 42053, "not_found", http.StatusNotFound)
			return
		}
		JSONError(c, 42054, "database_error", http.StatusInternalServerError)
		return
	}

	// 验证用户是否有权限删除该八字记录
	if existingBaziData.UserID != requestUserID {
		JSONError(c, 42055, "forbidden", http.StatusForbidden)
		return
	}

	// 从数据库中删除
	if err := h.db.Delete(&existingBaziData).Error; err != nil {
		JSONError(c, 42056, "database_error", http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "ok",
	})
}
