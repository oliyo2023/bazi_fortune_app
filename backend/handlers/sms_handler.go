package handlers

import (
	"bazi_fortune_app/backend/config"
	"bazi_fortune_app/backend/models"
	"bazi_fortune_app/backend/services"
	"bazi_fortune_app/backend/util"
	"log"
	"net/http"
	"regexp"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SmsHandler 短信验证码处理器
type SmsHandler struct {
	db         *gorm.DB
	smsService services.SmsService
	cfg        *config.Config
}

// NewSmsHandler 创建短信验证码处理器
func NewSmsHandler(db *gorm.DB, smsService services.SmsService, cfg *config.Config) *SmsHandler {
	return &SmsHandler{
		db:         db,
		smsService: smsService,
		cfg:        cfg,
	}
}

// SendSmsRequest 发送短信请求结构
type SendSmsRequest struct {
	Phone   string `json:"phone" binding:"required"`
	Purpose string `json:"purpose"` // login, register, reset_password (默认 login)
}

// SendSmsResponse 发送短信响应结构
type SendSmsResponse struct {
	Success   bool   `json:"success"`
	Message   string `json:"message"`
	ExpiresIn int    `json:"expires_in,omitempty"` // 验证码有效期（秒）
}

// LoginWithSmsRequest 短信验证码登录请求结构
type LoginWithSmsRequest struct {
	Phone string `json:"phone" binding:"required"`
	Code  string `json:"code" binding:"required,len=4"`
}

// LoginWithSmsResponse 短信验证码登录响应结构
type LoginWithSmsResponse struct {
	Success bool      `json:"success"`
	Message string    `json:"message"`
	User    *SafeUser `json:"user,omitempty"`
	Token   string    `json:"token,omitempty"`
	IsNew   bool      `json:"is_new"` // 是否新用户
}

// 中国大陆手机号正则
var phoneRegex = regexp.MustCompile(`^1[3-9]\d{9}$`)

// validatePhone 验证手机号格式
func validatePhone(phone string) bool {
	return phoneRegex.MatchString(phone)
}

// SendSmsCode 发送短信验证码
// @Summary 发送短信验证码
// @Description 发送短信验证码到指定手机号
// @Tags 认证
// @Accept json
// @Produce json
// @Param request body SendSmsRequest true "发送验证码请求"
// @Success 200 {object} SendSmsResponse
// @Router /api/v1/auth/send-sms [post]
func (h *SmsHandler) SendSmsCode(c *gin.Context) {
	var req SendSmsRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		JSONError(c, 40002, "invalid_request", http.StatusBadRequest)
		return
	}

	// 验证手机号格式
	if !validatePhone(req.Phone) {
		JSONError(c, 40003, "invalid_phone_format", http.StatusBadRequest)
		return
	}

	// 设置默认用途
	purpose := req.Purpose
	if purpose == "" {
		purpose = "login"
	}

	// 检查发送频率限制（60秒内不能重复发送）
	var recentCode models.VerificationCode
	oneMinuteAgo := time.Now().Add(-60 * time.Second)
	if err := h.db.Where("phone = ? AND created_at > ?", req.Phone, oneMinuteAgo).
		First(&recentCode).Error; err == nil {
		JSONError(c, 42901, "too_many_requests", http.StatusTooManyRequests)
		return
	}

	// 检查每日发送次数限制（每天最多10次）
	today := time.Now().Format("2006-01-02")
	var count int64
	h.db.Model(&models.VerificationCode{}).
		Where("phone = ? AND DATE(created_at) = ?", req.Phone, today).
		Count(&count)
	if count >= 10 {
		JSONError(c, 42902, "daily_limit_exceeded", http.StatusTooManyRequests)
		return
	}

	// 生成4位验证码
	code := services.GenerateCode()

	// 发送短信
	if err := h.smsService.SendVerificationCode(req.Phone, code); err != nil {
		log.Printf("[sms.send] 发送短信失败: phone=%s, err=%v", req.Phone, err)
		JSONError(c, 50002, "sms_send_failed", http.StatusInternalServerError)
		return
	}

	// 保存验证码到数据库
	verificationCode := models.VerificationCode{
		Phone:     req.Phone,
		Code:      code,
		Purpose:   purpose,
		ExpiresAt: time.Now().Add(5 * time.Minute),
	}
	if err := h.db.Create(&verificationCode).Error; err != nil {
		log.Printf("[sms.send] 保存验证码失败: phone=%s, err=%v", req.Phone, err)
		JSONError(c, 50000, "database_error", http.StatusInternalServerError)
		return
	}

	log.Printf("[sms.send] 验证码发送成功: phone=%s", req.Phone)

	JSONOK(c, SendSmsResponse{
		Success:   true,
		Message:   "验证码已发送",
		ExpiresIn: 300,
	})
}

// LoginWithSms 使用短信验证码登录/注册
// @Summary 短信验证码登录
// @Description 使用手机号和验证码登录，如果用户不存在则自动注册
// @Tags 认证
// @Accept json
// @Produce json
// @Param request body LoginWithSmsRequest true "登录请求"
// @Success 200 {object} LoginWithSmsResponse
// @Router /api/v1/auth/login-with-sms [post]
func (h *SmsHandler) LoginWithSms(c *gin.Context) {
	var req LoginWithSmsRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		JSONError(c, 40002, "invalid_request", http.StatusBadRequest)
		return
	}

	// 验证手机号格式
	if !validatePhone(req.Phone) {
		JSONError(c, 40003, "invalid_phone_format", http.StatusBadRequest)
		return
	}

	// 查找最新的未使用验证码
	var verificationCode models.VerificationCode
	if err := h.db.Where("phone = ? AND code = ? AND used_at IS NULL",
		req.Phone, req.Code).
		Order("created_at DESC").
		First(&verificationCode).Error; err != nil {
		log.Printf("[sms.login] 验证码无效: phone=%s, code=%s, err=%v", req.Phone, req.Code, err)
		JSONError(c, 40004, "invalid_verification_code", http.StatusBadRequest)
		return
	}

	// 检查验证码是否过期
	if verificationCode.IsExpired() {
		JSONError(c, 40005, "verification_code_expired", http.StatusBadRequest)
		return
	}

	// 标记验证码为已使用
	verificationCode.MarkAsUsed()
	h.db.Save(&verificationCode)

	// 查找用户
	var user models.User
	isNewUser := false
	if err := h.db.Where("phone = ?", req.Phone).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// 用户不存在，自动注册
			isNewUser = true
			user = models.User{
				Phone:     req.Phone,
				Username:  "用户" + req.Phone[7:], // 默认用户名：手机号后4位
				Role:      models.UserRoleUser,
				CreatedAt: time.Now(),
			}
			if err := h.db.Create(&user).Error; err != nil {
				log.Printf("[sms.login] 创建用户失败: phone=%s, err=%v", req.Phone, err)
				JSONError(c, 50000, "user_creation_failed", http.StatusInternalServerError)
				return
			}
			log.Printf("[sms.login] 新用户注册成功: phone=%s, user_id=%s", req.Phone, user.ID)
		} else {
			log.Printf("[sms.login] 查询用户失败: phone=%s, err=%v", req.Phone, err)
			JSONError(c, 50000, "database_error", http.StatusInternalServerError)
			return
		}
	}

	// 生成 JWT Token
	token, err := util.GenerateJWT(h.cfg, user.ID, string(user.Role), 24*time.Hour)
	if err != nil {
		log.Printf("[sms.login] 生成Token失败: user_id=%s, err=%v", user.ID, err)
		JSONError(c, 50001, "token_generation_failed", http.StatusInternalServerError)
		return
	}

	log.Printf("[sms.login] 登录成功: phone=%s, user_id=%s, is_new=%v", req.Phone, user.ID, isNewUser)

	safeUser := toSafeUser(user)
	JSONOK(c, LoginWithSmsResponse{
		Success: true,
		Message: "登录成功",
		User:    &safeUser,
		Token:   token,
		IsNew:   isNewUser,
	})
}
