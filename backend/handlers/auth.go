package handlers

import (
	"bazi_fortune_app/backend/config"
	"bazi_fortune_app/backend/models"
	"bazi_fortune_app/backend/util"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// AuthHandler 认证处理器
type AuthHandler struct {
	cfg *config.Config
	db  *gorm.DB
}

// NewAuthHandler 创建认证处理器
func NewAuthHandler(cfg *config.Config, db *gorm.DB) *AuthHandler {
	return &AuthHandler{cfg: cfg, db: db}
}

// LoginRequest 登录请求结构
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// LoginResponse 登录响应结构
type LoginResponse struct {
	Success bool         `json:"success"`
	Message string       `json:"message"`
	User    *models.User `json:"user,omitempty"`
	Token   string       `json:"token,omitempty"`
}

// RegisterRequest 注册请求结构
type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Name     string `json:"name" binding:"required,min=2"`
}

// RegisterResponse 注册响应结构
type RegisterResponse struct {
	Success bool         `json:"success"`
	Message string       `json:"message"`
	User    *models.User `json:"user,omitempty"`
}

// SafeUser 用于对外返回的用户安全信息（白名单）
type SafeUser struct {
	ID        uuid.UUID `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
}

func toSafeUser(u models.User) SafeUser {
	return SafeUser{
		ID:        u.ID,
		Email:     u.Email,
		Name:      u.Username,
		Role:      string(u.Role),
		CreatedAt: u.CreatedAt,
	}
}

// RefreshToken 刷新访问令牌（需要已登录）
func (h *AuthHandler) RefreshToken(c *gin.Context) {
	userIDStr := c.GetString("user_id")
	if userIDStr == "" {
		JSONError(c, 40001, "unauthorized", http.StatusUnauthorized)
		return
	}
	uid, err := uuid.Parse(userIDStr)
	if err != nil {
		JSONError(c, 40002, "invalid_user_id", http.StatusUnauthorized)
		return
	}
	var user models.User
	if err := h.db.First(&user, "id = ?", uid).Error; err != nil {
		JSONError(c, 40401, "user_not_found", http.StatusNotFound)
		return
	}
	token, err := util.GenerateJWT(h.cfg, user.ID, string(user.Role), 24*time.Hour)
	if err != nil {
		JSONError(c, 50001, "token_generation_failed", http.StatusInternalServerError)
		return
	}
	JSONOK(c, gin.H{
		"token": token,
		"user":  toSafeUser(user),
	})
}

// Login 用户登录
func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("[auth.login] bind error: %v", err)
		JSONError(c, 40002, "invalid_request", http.StatusBadRequest)
		return
	}

	// 根据 email 找用户
	var user models.User
	if err := h.db.Where("email = ?", req.Email).First(&user).Error; err != nil {
		log.Printf("[auth.login] db find user by email failed: email=%s err=%v", req.Email, err)
		JSONError(c, 40003, "invalid_credentials", http.StatusUnauthorized)
		return
	}
	// 校验密码
	if !user.CheckPassword(req.Password) {
		log.Printf("[auth.login] password mismatch: email=%s user_id=%s", req.Email, user.ID.String())
		JSONError(c, 40003, "invalid_credentials", http.StatusUnauthorized)
		return
	}
	// 生成 JWT
	token, err := util.GenerateJWT(h.cfg, user.ID, string(user.Role), 24*time.Hour)
	if err != nil {
		log.Printf("[auth.login] generate jwt failed: user_id=%s err=%v", user.ID.String(), err)
		JSONError(c, 50001, "token_generation_failed", http.StatusInternalServerError)
		return
	}

	JSONOK(c, gin.H{
		"user":  toSafeUser(user),
		"token": token,
	})
}

// Register 用户注册
func (h *AuthHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		JSONError(c, 40002, "invalid_request", http.StatusBadRequest)
		return
	}
	// email 唯一
	var count int64
	h.db.Model(&models.User{}).Where("email = ?", req.Email).Count(&count)
	if count > 0 {
		JSONError(c, 40901, "email_already_exists", http.StatusBadRequest)
		return
	}

	user := models.User{
		Email:     req.Email,
		Username:  req.Name,
		Role:      models.UserRoleUser,
		CreatedAt: time.Now(),
	}
	if err := user.SetPassword(req.Password); err != nil {
		JSONError(c, 50000, "password_set_failed", http.StatusInternalServerError)
		return
	}
	if err := h.db.Create(&user).Error; err != nil {
		JSONError(c, 50000, "user_creation_failed", http.StatusInternalServerError)
		return
	}

	JSONOK(c, gin.H{
		"user": toSafeUser(user),
	})
}

// GetProfile 获取用户资料
func (h *AuthHandler) GetProfile(c *gin.Context) {
	userID := c.Param("id")

	// 解析用户ID
	id, err := uuid.Parse(userID)
	if err != nil {
		JSONError(c, 40002, "invalid_user_id_format", http.StatusBadRequest)
		return
	}

	// 查找用户
	var user models.User
	if err := h.db.Preload("Master").First(&user, "id = ?", id).Error; err != nil {
		JSONError(c, 40401, "user_not_found", http.StatusNotFound)
		return
	}

	JSONOK(c, gin.H{
		"user": toSafeUser(user),
	})
}

// generateSimpleToken 生成简单的token（实际项目中应使用JWT）
func generateSimpleToken(userID uuid.UUID) string {
	return "token_" + userID.String() + "_" + time.Now().Format("20060102150405")
}
