package handlers

import (
	"fmt"
	"net/http"
	"runtime/debug"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/sirupsen/logrus"
)

// CORSMiddleware CORS中间件
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		c.Header("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

// AuthMiddleware 认证中间件（简化版本）
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 获取Authorization头
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			JSONError(c, 40001, "Authorization header required", http.StatusUnauthorized)
			c.Abort()
			return
		}

		// 检查Bearer token格式
		if !strings.HasPrefix(authHeader, "Bearer ") {
			JSONError(c, 40001, "Invalid authorization format", http.StatusUnauthorized)
			c.Abort()
			return
		}

		// 提取token
		token := strings.TrimPrefix(authHeader, "Bearer ")
		if token == "" {
			JSONError(c, 40001, "Token required", http.StatusUnauthorized)
			c.Abort()
			return
		}

		// 简化的token验证（实际项目中应使用JWT验证）
		if !strings.HasPrefix(token, "token_") {
			JSONError(c, 40001, "Invalid token", http.StatusUnauthorized)
			c.Abort()
			return
		}

		// 将token信息存储到上下文中
		c.Set("token", token)
		c.Next()
	}
}

// LoggerMiddleware 日志中间件
func LoggerMiddleware() gin.HandlerFunc {
	return gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		return fmt.Sprintf("%s - [%s] \"%s %s %s %d %s \"%s\" %s\"\n",
			param.ClientIP,
			param.TimeStamp.Format("2006/01/02 - 15:04:05"),
			param.Method,
			param.Path,
			param.Request.Proto,
			param.StatusCode,
			param.Latency,
			param.Request.UserAgent(),
			param.ErrorMessage,
		)
	})
}

// ErrorHandlerMiddleware 错误处理中间件
func ErrorHandlerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// 打印 panic 堆栈，便于快速定位
				stack := debug.Stack()
				logrus.Errorf("panic recovered: %v\n%s", err, string(stack))
				JSONError(c, 50000, "Internal server error", http.StatusInternalServerError)
				c.Abort()
			}
		}()
		c.Next()
	}
}

// SupabaseAuthMiddleware 是一个 Gin 中间件，用于验证 Supabase JWT 并将用户 ID 存储在上下文中。
func SupabaseAuthMiddleware(supabaseKey string) gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1) 获取访问令牌：Authorization 头 → Supabase Cookie → 查询参数
		var tokenSource string
		authHeader := strings.TrimSpace(c.GetHeader("Authorization"))
		var tokenString string

		// Header: Authorization: Bearer xxx
		if authHeader != "" {
			tokenSource = "header"
			tokenString = authHeader
			if idx := strings.Index(strings.ToLower(authHeader), "bearer "); idx == 0 {
				tokenString = strings.TrimSpace(authHeader[len("Bearer "):])
			}
		}

		// Cookie: sb-access-token / sb_access_token / access_token
		if tokenString == "" {
			if v, err := c.Cookie("sb-access-token"); err == nil && strings.TrimSpace(v) != "" {
				tokenSource = "cookie:sb-access-token"
				tokenString = strings.TrimSpace(v)
			}
		}
		if tokenString == "" {
			if v, err := c.Cookie("sb_access_token"); err == nil && strings.TrimSpace(v) != "" {
				tokenSource = "cookie:sb_access_token"
				tokenString = strings.TrimSpace(v)
			}
		}
		if tokenString == "" {
			if v, err := c.Cookie("access_token"); err == nil && strings.TrimSpace(v) != "" {
				tokenSource = "cookie:access_token"
				tokenString = strings.TrimSpace(v)
			}
		}

		// Query: ?access_token=xxx（便于调试）
		if tokenString == "" {
			if v := strings.TrimSpace(c.Query("access_token")); v != "" {
				tokenSource = "query"
				tokenString = v
			}
		}

		if tokenString == "" {
			JSONError(c, 40001, "Unauthorized: token missing", http.StatusUnauthorized)
			return
		}
		logrus.WithField("source", tokenSource).Debug("Auth token located")

		// 额外提示：密钥为空或过短，直接告警（常见配置错误）
		if len(strings.TrimSpace(supabaseKey)) < 10 {
			logrus.WithField("length", len(strings.TrimSpace(supabaseKey))).Warn("Supabase JWT_SECRET seems invalid; please check backend config")
		}

		// 3) 解析与验签（仅验签名与有效期）
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// 仅接受 HMAC
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(supabaseKey), nil
		})

		if err != nil {
			// 打印更详细的错误，帮助快速定位密钥不匹配/过期等问题
			logrus.WithError(err).Error("Auth token parse/verify failed")
			JSONError(c, 40001, "Invalid token", http.StatusUnauthorized)
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			// 4) 取 sub 作为用户ID
			userID, ok := claims["sub"].(string)
			if !ok || userID == "" {
				logrus.Warn("Auth token claims missing sub (user id)")
				JSONError(c, 40001, "User ID not found in token", http.StatusUnauthorized)
				return
			}
			c.Set("userID", userID)

			// 5) 角色可选
			role := "user"
			if v, ok := claims["role"].(string); ok && v != "" {
				role = v
			}
			c.Set("userRole", role)

			c.Next()
			return
		}

		logrus.Warn("Auth token claims invalid or token not valid")
		JSONError(c, 40001, "Invalid token claims", http.StatusUnauthorized)
	}
}

// AdminAuthMiddleware 管理员认证中间件
func AdminAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 从上下文中获取用户角色
		role, exists := c.Get("userRole") // 假设 SupabaseAuthMiddleware 会设置 userRole
		if !exists || role != "admin" {
			JSONError(c, 40005, "Forbidden: Admin access required", http.StatusForbidden)
			return
		}
		c.Next()
	}
}

// StaticHeadersMiddleware 为静态资源设置缓存策略（带 ?v=version 长缓存，否则 no-cache）
func StaticHeadersMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/static/") {
			if c.Query("v") != "" {
				// 带版本号，给长缓存
				c.Header("Cache-Control", "public, max-age=31536000, immutable")
			} else {
				// 无版本，禁止缓存，便于调试
				c.Header("Cache-Control", "no-cache")
			}
		}
		c.Next()
	}
}
