package handlers

import (
	"net/http"
	"strings"

	"bazi_fortune_app/backend/config"
	"bazi_fortune_app/backend/util"

	"github.com/gin-gonic/gin"
)

func JwtAuthMiddleware(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth == "" || !strings.HasPrefix(auth, "Bearer ") {
			c.Next()
			return
		}
		token := strings.TrimPrefix(auth, "Bearer ")
		claims, err := util.ParseJWT(cfg, token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"success": false, "message": "invalid token"})
			return
		}
		c.Set("user_id", claims.Sub)
		c.Set("role", claims.Role)
		c.Next()
	}
}
