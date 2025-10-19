package handlers

import (
	"net/http"

	"bazi_fortune_app/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// AdminLogin godoc
// @Summary Admin login
// @Description Admin login
// @Tags admin
// @Accept  json
// @Produce  json
// @Param credentials body models.Admin true "Credentials"
// @Success 200 {object} map[string]string
// @Router /api/admin/login [post]
func AdminLogin(c *gin.Context) {
	var credentials models.Admin
	if err := c.ShouldBindJSON(&credentials); err != nil {
		JSONError(c, 40002, "invalid_request", http.StatusBadRequest)
		return
	}

	var admin models.Admin
	if err := models.DB.Where("username = ?", credentials.Username).First(&admin).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			JSONError(c, 40003, "invalid_credentials", http.StatusUnauthorized)
			return
		}
		JSONError(c, 50000, "database_error", http.StatusInternalServerError)
		return
	}

	if !admin.CheckPassword(credentials.Password) {
		JSONError(c, 40003, "invalid_credentials", http.StatusUnauthorized)
		return
	}

	// 简单的token生成，实际项目中应该使用JWT
	token := "admin_token_" + admin.ID.String()

	JSONOK(c, gin.H{"token": token})
}