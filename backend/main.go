package main

import (
	"bazi_fortune_app/backend/config"
	"bazi_fortune_app/backend/models"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 加载配置
	cfg, err := config.LoadConfig("config.yaml")
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// 初始化数据库连接
	if err := models.InitDB(cfg); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// 自动迁移数据库表结构
	if err := models.AutoMigrate(); err != nil {
		log.Printf("Warning: Failed to auto migrate: %v", err)
	}

	// 初始化 Gin 引擎
	r := gin.Default()

	// 设置一个简单的根路由用于健康检查
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Bazi Fortune App Backend is running! 嘿嘿~",
			"models":  len(models.GetAllModels()),
		})
	})

	// 模型信息接口（调试用）
	r.GET("/models", func(c *gin.Context) {
		modelInfos := models.GetAllModels()
		c.JSON(http.StatusOK, gin.H{
			"models": modelInfos,
		})
	})

	// 启动服务器
	addr := fmt.Sprintf(":%s", cfg.Server.Port)
	log.Printf("Server listening on %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
