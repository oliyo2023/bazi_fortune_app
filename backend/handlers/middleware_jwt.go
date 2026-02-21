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
		authHeader := strings.TrimSpace(c.GetHeader("Authorization"))
		if authHeader == "" {
			JSONError(c, 40101, "unauthorized", http.StatusUnauthorized)
			c.Abort()
			return
		}

		if !strings.HasPrefix(strings.ToLower(authHeader), "bearer ") {
			JSONError(c, 40102, "invalid_token", http.StatusUnauthorized)
			c.Abort()
			return
		}

		token := strings.TrimSpace(authHeader[len("Bearer "):])
		if token == "" {
			JSONError(c, 40103, "invalid_token", http.StatusUnauthorized)
			c.Abort()
			return
		}

		claims, err := util.ParseJWT(cfg, token)
		if err != nil {
			JSONError(c, 40104, "invalid_token", http.StatusUnauthorized)
			c.Abort()
			return
		}

		if claims.Sub == "" {
			JSONError(c, 40105, "invalid_token", http.StatusUnauthorized)
			c.Abort()
			return
		}

		c.Set("user_id", claims.Sub)
		c.Set("role", claims.Role)
		// Backward compatibility for middleware/handlers still reading legacy keys.
		c.Set("userID", claims.Sub)
		c.Set("userRole", claims.Role)
		c.Next()
	}
}
