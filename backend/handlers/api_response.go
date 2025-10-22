package handlers

import (
	"net/http"

	"bazi_fortune_app/backend/util"
	"github.com/gin-gonic/gin"
)

// JSONError 统一错误响应: {"code":错误码,"message":"错误信息","data":[]}
func JSONError(c *gin.Context, code int, messageKey string, httpStatus int) {
	// 从请求头获取语言
	lang := c.GetHeader("Accept-Language")
	if lang == "" {
		lang = "zh" // 默认中文
	}

	// 获取翻译消息
	message := util.GetMessage(lang, messageKey)

	c.JSON(httpStatus, gin.H{
		"code":    code,
		"message": message,
		"data":    []any{},
	})
}

// JSONErrorWithFormat 统一错误响应（带格式化）
func JSONErrorWithFormat(c *gin.Context, code int, messageKey string, httpStatus int, args ...interface{}) {
	// 从请求头获取语言
	lang := c.GetHeader("Accept-Language")
	if lang == "" {
		lang = "zh" // 默认中文
	}

	// 获取翻译消息
	message := util.GetMessageWithFormat(lang, messageKey, args...)

	c.JSON(httpStatus, gin.H{
		"code":    code,
		"message": message,
		"data":    []any{},
	})
}

// JSONOK 统一成功响应（可选使用，暂保留）
func JSONOK(c *gin.Context, data any) {
	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": util.GetMessage(c.GetHeader("Accept-Language"), "success"),
		"data":    data,
	})
}

// JSONOKWithMessage 统一成功响应（带消息）
func JSONOKWithMessage(c *gin.Context, messageKey string, data any) {
	// 从请求头获取语言
	lang := c.GetHeader("Accept-Language")
	if lang == "" {
		lang = "zh" // 默认中文
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": util.GetMessage(lang, messageKey),
		"data":    data,
	})
}
