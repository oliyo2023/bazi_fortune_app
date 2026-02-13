package handlers

import (
	"bazi_fortune_app/backend/util"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	LanguageKey = "language"
	LangHeader  = "Accept-Language"
	LangQuery   = "lang"
)

// I18nMiddleware 国际化中间件，从请求头或查询参数中获取语言设置
func I18nMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		var lang string

		if langQuery := c.Query(LangQuery); langQuery != "" {
			lang = langQuery
		} else if acceptLang := c.GetHeader(LangHeader); acceptLang != "" {
			lang = util.GetLanguageFromHeader(acceptLang)
		} else {
			lang = util.LangZh
		}

		c.Set(LanguageKey, lang)
		c.Next()
	}
}

// GetLanguage 从上下文获取语言
func GetLanguage(c *gin.Context) string {
	if lang, exists := c.Get(LanguageKey); exists {
		if langStr, ok := lang.(string); ok {
			return langStr
		}
	}
	return util.LangZh
}

// LocalizedResponse 本地化响应结构
type LocalizedResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// JSONLocalizedSuccess 返回本地化的成功响应
func JSONLocalizedSuccess(c *gin.Context, messageKey string, data interface{}, status int) {
	lang := GetLanguage(c)
	message := util.GetMessage(lang, messageKey)
	c.JSON(status, LocalizedResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// JSONLocalizedError 返回本地化的错误响应
func JSONLocalizedError(c *gin.Context, messageKey string, status int) {
	lang := GetLanguage(c)
	message := util.GetMessage(lang, messageKey)
	c.JSON(status, LocalizedResponse{
		Success: false,
		Message: message,
	})
}

// JSONLocalizedErrorWithData 返回本地化的错误响应（带数据）
func JSONLocalizedErrorWithData(c *gin.Context, messageKey string, data interface{}, status int) {
	lang := GetLanguage(c)
	message := util.GetMessage(lang, messageKey)
	c.JSON(status, LocalizedResponse{
		Success: false,
		Message: message,
		Data:    data,
	})
}

// JSONLocalizedSuccessWithFormat 返回本地化的成功响应（带格式化参数）
func JSONLocalizedSuccessWithFormat(c *gin.Context, messageKey string, args []interface{}, data interface{}, status int) {
	lang := GetLanguage(c)
	message := util.GetMessageWithFormat(lang, messageKey, args...)
	c.JSON(status, LocalizedResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// JSONLocalizedErrorWithFormat 返回本地化的错误响应（带格式化参数）
func JSONLocalizedErrorWithFormat(c *gin.Context, messageKey string, args []interface{}, status int) {
	lang := GetLanguage(c)
	message := util.GetMessageWithFormat(lang, messageKey, args...)
	c.JSON(status, LocalizedResponse{
		Success: false,
		Message: message,
	})
}

// ParseAcceptLanguage 解析 Accept-Language 头部，返回最匹配的语言代码
func ParseAcceptLanguage(acceptLanguage string, supportedLanguages []string) string {
	if acceptLanguage == "" {
		return supportedLanguages[0]
	}

	acceptedLanguages := strings.Split(acceptLanguage, ",")
	for _, lang := range acceptedLanguages {
		trimmed := strings.TrimSpace(lang)
		if strings.Contains(trimmed, ";") {
			trimmed = strings.Split(trimmed, ";")[0]
		}
		trimmed = strings.ToLower(trimmed)

		for _, supported := range supportedLanguages {
			if strings.HasPrefix(trimmed, strings.ToLower(supported)) {
				return supported
			}
		}
	}

	return supportedLanguages[0]
}
