package handlers

import (
	"bazi_fortune_app/backend/config"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SetupRoutes 设置所有路由
func SetupRoutes(r *gin.Engine, db *gorm.DB, cfg *config.Config) {
	// 添加全局中间件
	r.Use(CORSMiddleware())
	r.Use(LoggerMiddleware())
	r.Use(ErrorHandlerMiddleware())

	// 静态资源改到 main.go 用 go:embed 挂载，避免工作目录问题

	// 创建处理器实例
	authHandler := NewAuthHandler(cfg, db)
	baziHandler := NewBaziHandler(db)
	aiHandler := NewAIHandler(cfg)
	almanacHandler := NewAlmanacHandler(db, cfg)

	// API版本分组
	v1 := r.Group("/api/v1")
	{
		// 认证相关路由（无需认证）
		auth := v1.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		// 需要认证的路由组
		protected := v1.Group("/")
		// 兼容两种 JWT：Supabase 签发或我们后端签发
		// 移除 Supabase 中间件，统一使用后端自签 JWT
		protected.Use(JwtAuthMiddleware(cfg))
		{
			// 用户资料路由
			protected.GET("/auth/profile/:id", authHandler.GetProfile)
			protected.POST("/auth/refresh", authHandler.RefreshToken)

			// 八字相关路由
			baziRoutes := protected.Group("/bazi")
			{
				baziRoutes.POST("/calculate", baziHandler.Calculate)
				baziRoutes.GET("/history", baziHandler.GetHistory)
				baziRoutes.GET("/detail/:id", baziHandler.GetBaziDetail)
				baziRoutes.POST("", baziHandler.CreateBaziRecord)
				baziRoutes.POST("/", baziHandler.CreateBaziRecord)
				baziRoutes.PUT("/:id", baziHandler.UpdateBaziRecord)
				baziRoutes.DELETE("/:id", baziHandler.DeleteBaziRecord)
			}

			// AI分析相关路由
			aiRoutes := protected.Group("/ai")
			{
				aiRoutes.POST("/analyze", aiHandler.Analyze)
			}

			// 老黄历相关路由
			almanac := protected.Group("/almanac")
			{
				almanac.POST("/generate", almanacHandler.Generate)
				almanac.GET("/detail", almanacHandler.GetDetail)
			}

			// Admin 路由组
			adminRoutes := protected.Group("/admin")
			adminRoutes.Use(AuthMiddleware())
			adminRoutes.Use(AdminAuthMiddleware())
			{
				// 用户管理
				userHandler := NewUserHandler(db)
				adminRoutes.GET("/users", userHandler.GetUsers)
				adminRoutes.GET("/users/:id", userHandler.GetUserByID)
				adminRoutes.PUT("/users/:id", userHandler.UpdateUser)
				adminRoutes.DELETE("/users/:id", userHandler.DeleteUser)
			}
		}
	}

	// API文档路由
	r.GET("/api/docs", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"title":   "Bazi Fortune App API",
			"version": "1.0.0",
			"endpoints": gin.H{
				"auth": gin.H{
					"POST /api/v1/auth/register":   "用户注册",
					"POST /api/v1/auth/login":      "用户登录",
					"GET /api/v1/auth/profile/:id": "获取用户资料",
				},
				"bazi": gin.H{
					"POST /api/v1/bazi/calculate":       "计算八字",
					"GET /api/v1/bazi/history/:user_id": "获取用户八字历史",
					"GET /api/v1/bazi/detail/:id":       "获取八字详情",
				},
				"ai": gin.H{
					"POST /api/v1/ai/analyze": "AI分析八字",
				},
			},
		})
	})
}
