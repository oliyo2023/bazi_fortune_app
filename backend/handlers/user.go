package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"bazi_fortune_app/backend/models"
)

// UserHandler 处理用户相关的请求
type UserHandler struct {
	DB *gorm.DB
}

// NewUserHandler 创建新的 UserHandler
func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{DB: db}
}

// GetUsers 获取所有用户
// @Summary 获取所有用户
// @Description 获取所有用户列表
// @Tags Admin-Users
// @Accept json
// @Produce json
// @Success 200 {array} models.User "用户列表"
// @Failure 500 {object} map[string]string "服务器错误"
// @Router /admin/users [get]
func (h *UserHandler) GetUsers(c *gin.Context) {
	var users []models.User
	if err := h.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法获取用户列表"})
		return
	}
	c.JSON(http.StatusOK, users)
}

// GetUserByID 根据ID获取用户
// @Summary 根据ID获取用户
// @Description 根据用户ID获取单个用户详情
// @Tags Admin-Users
// @Accept json
// @Produce json
// @Param id path string true "用户ID"
// @Success 200 {object} models.User "用户详情"
// @Failure 400 {object} map[string]string "无效的用户ID"
// @Failure 404 {object} map[string]string "用户未找到"
// @Failure 500 {object} map[string]string "服务器错误"
// @Router /admin/users/{id} [get]
func (h *UserHandler) GetUserByID(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := h.DB.First(&user, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "用户未找到"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "无法获取用户详情"})
		}
		return
	}
	c.JSON(http.StatusOK, user)
}

// UpdateUser 更新用户信息
// @Summary 更新用户信息
// @Description 根据用户ID更新用户信息
// @Tags Admin-Users
// @Accept json
// @Produce json
// @Param id path string true "用户ID"
// @Param user body models.User true "用户信息"
// @Success 200 {object} models.User "更新后的用户信息"
// @Failure 400 {object} map[string]string "无效的用户ID或请求体"
// @Failure 404 {object} map[string]string "用户未找到"
// @Failure 500 {object} map[string]string "服务器错误"
// @Router /admin/users/{id} [put]
func (h *UserHandler) UpdateUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := h.DB.First(&user, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "用户未找到"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "无法获取用户详情"})
		}
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求体"})
		return
	}

	if err := h.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法更新用户信息"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// DeleteUser 删除用户
// @Summary 删除用户
// @Description 根据用户ID删除用户
// @Tags Admin-Users
// @Accept json
// @Produce json
// @Param id path string true "用户ID"
// @Success 204 "用户删除成功"
// @Failure 400 {object} map[string]string "无效的用户ID"
// @Failure 404 {object} map[string]string "用户未找到"
// @Failure 500 {object} map[string]string "服务器错误"
// @Router /admin/users/{id} [delete]
func (h *UserHandler) DeleteUser(c *gin.Context) {
	id := c.Param("id")

	result := h.DB.Delete(&models.User{}, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法删除用户"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "用户未找到"})
		return
	}

	c.Status(http.StatusNoContent)
}