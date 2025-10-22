package handlers

import (
	"bazi_fortune_app/backend/config"
	"bazi_fortune_app/backend/models"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// AIHandler AI处理器
type AIHandler struct {
	config *config.Config
}

// NewAIHandler 创建AI处理器
func NewAIHandler(cfg *config.Config) *AIHandler {
	return &AIHandler{
		config: cfg,
	}
}

// AnalyzeRequest AI分析请求
type AnalyzeRequest struct {
	BaziID   string `json:"bazi_id" binding:"required"`
	Language string `json:"language"` // zh, en
}

// AnalyzeResponse AI分析响应
type AnalyzeResponse struct {
	Success  bool   `json:"success"`
	Message  string `json:"message"`
	Analysis string `json:"analysis,omitempty"`
}

// DeepSeekRequest DeepSeek API请求结构
type DeepSeekRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}

// Message DeepSeek消息结构
type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// DeepSeekResponse DeepSeek API响应结构
type DeepSeekResponse struct {
	Choices []Choice `json:"choices"`
}

// Choice DeepSeek选择结构
type Choice struct {
	Message Message `json:"message"`
}

// Analyze 使用AI分析八字
func (h *AIHandler) Analyze(c *gin.Context) {
	var req AnalyzeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, AnalyzeResponse{
			Success: false,
			Message: "Invalid request format: " + err.Error(),
		})
		return
	}

	// 解析八字ID
	baziID, err := uuid.Parse(req.BaziID)
	if err != nil {
		c.JSON(http.StatusBadRequest, AnalyzeResponse{
			Success: false,
			Message: "Invalid bazi ID format",
		})
		return
	}

	// 查询八字记录
	var baziData models.BaziData
	if err := models.GetDB().First(&baziData, "id = ?", baziID).Error; err != nil {
		c.JSON(http.StatusNotFound, AnalyzeResponse{
			Success: false,
			Message: "Bazi record not found",
		})
		return
	}

	// 获取八字输入和结果数据
	input, err := baziData.GetInputData()
	if err != nil {
		c.JSON(http.StatusInternalServerError, AnalyzeResponse{
			Success: false,
			Message: "Failed to parse input data",
		})
		return
	}

	result, err := baziData.GetResultData()
	if err != nil {
		c.JSON(http.StatusInternalServerError, AnalyzeResponse{
			Success: false,
			Message: "Failed to parse result data",
		})
		return
	}

	// 设置默认语言
	if req.Language == "" {
		req.Language = "zh"
	}

	// 调用DeepSeek API进行分析
	analysis, err := h.callDeepSeekAPI(input, result, req.Language)
	if err != nil {
		c.JSON(http.StatusInternalServerError, AnalyzeResponse{
			Success: false,
			Message: "Failed to analyze with AI: " + err.Error(),
		})
		return
	}

	// 更新八字记录的分析结果
	baziData.Analysis = &analysis
	if err := models.GetDB().Save(&baziData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, AnalyzeResponse{
			Success: false,
			Message: "Failed to save analysis result",
		})
		return
	}

	c.JSON(http.StatusOK, AnalyzeResponse{
		Success:  true,
		Message:  "AI analysis completed",
		Analysis: analysis,
	})
}

// callDeepSeekAPI 调用DeepSeek API
func (h *AIHandler) callDeepSeekAPI(input *models.BaziInput, result *models.BaziResult, language string) (string, error) {
	// 构建提示词
	prompt := h.buildPrompt(input, result, language)

	// 构建请求
	reqBody := DeepSeekRequest{
		Model: "deepseek-chat",
		Messages: []Message{
			{
				Role:    "system",
				Content: h.getSystemPrompt(language),
			},
			{
				Role:    "user",
				Content: prompt,
			},
		},
	}

	// 序列化请求
	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return "", fmt.Errorf("failed to marshal request: %w", err)
	}

	// 创建HTTP请求
	url := h.config.Deepseek.APIBaseURL + "/chat/completions"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	// 设置请求头
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+h.config.Deepseek.APIKey)

	// 发送请求
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	// 读取响应
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("API request failed with status %d: %s", resp.StatusCode, string(body))
	}

	// 解析响应
	var deepSeekResp DeepSeekResponse
	if err := json.Unmarshal(body, &deepSeekResp); err != nil {
		return "", fmt.Errorf("failed to parse response: %w", err)
	}

	if len(deepSeekResp.Choices) == 0 {
		return "", fmt.Errorf("no choices in response")
	}

	return deepSeekResp.Choices[0].Message.Content, nil
}

// buildPrompt 构建分析提示词
func (h *AIHandler) buildPrompt(input *models.BaziInput, result *models.BaziResult, language string) string {
	if language == "en" {
		return fmt.Sprintf(`Please analyze the following Bazi (Chinese astrology) chart:

Birth Information:
- Date: %d-%02d-%02d %02d:%02d
- Gender: %s
- Name: %s

Bazi Chart:
- Year Pillar: %s
- Month Pillar: %s  
- Day Pillar: %s
- Hour Pillar: %s
- Day Master: %s
- Zodiac: %s
- Nayin: %s
- Season: %s

Five Elements Distribution:
- Wood: %d, Fire: %d, Earth: %d, Metal: %d, Water: %d

Please provide a comprehensive analysis covering:
1. Personality traits and characteristics
2. Career and wealth prospects
3. Relationships and marriage
4. Health considerations
5. Lucky elements, colors, numbers, and directions
6. Life advice and recommendations

Please write in English and provide detailed explanations.`,
			input.Year, input.Month, input.Day, input.Hour, input.Minute,
			input.Gender, input.Name,
			result.YearPillar, result.MonthPillar, result.DayPillar, result.HourPillar,
			result.DayMaster, result.Zodiac, result.Nayin, result.Season,
			result.FiveElements["木"], result.FiveElements["火"], result.FiveElements["土"],
			result.FiveElements["金"], result.FiveElements["水"])
	}

	return fmt.Sprintf(`请分析以下八字命盘：

出生信息：
- 出生日期：%d年%02d月%02d日 %02d时%02d分
- 性别：%s
- 姓名：%s

八字排盘：
- 年柱：%s
- 月柱：%s
- 日柱：%s
- 时柱：%s
- 日主：%s
- 生肖：%s
- 纳音：%s
- 季节：%s

五行分布：
- 木：%d个，火：%d个，土：%d个，金：%d个，水：%d个

请提供全面的命理分析，包括：
1. 性格特点和个性分析
2. 事业财运发展趋势
3. 感情婚姻状况
4. 健康注意事项
5. 有利的五行、颜色、数字、方位
6. 人生建议和改运方法

请用中文详细分析，字数在3000字以上。`,
		input.Year, input.Month, input.Day, input.Hour, input.Minute,
		input.Gender, input.Name,
		result.YearPillar, result.MonthPillar, result.DayPillar, result.HourPillar,
		result.DayMaster, result.Zodiac, result.Nayin, result.Season,
		result.FiveElements["木"], result.FiveElements["火"], result.FiveElements["土"],
		result.FiveElements["金"], result.FiveElements["水"])
}

// getSystemPrompt 获取系统提示词
func (h *AIHandler) getSystemPrompt(language string) string {
	if language == "en" {
		return `You are a professional Chinese astrology (Bazi) master with deep knowledge of traditional Chinese metaphysics. You specialize in analyzing Bazi charts and providing insightful, accurate, and helpful interpretations. Your analysis should be comprehensive, detailed, and practical, helping people understand their destiny and make better life decisions.`
	}

	return `你是一位专业的八字命理大师，精通中华传统玄学文化，擅长分析八字命盘并提供准确、有用的解读。你的分析应该全面、详细、实用，帮助人们了解自己的命运并做出更好的人生决策。请用专业而通俗易懂的语言进行分析。`
}
