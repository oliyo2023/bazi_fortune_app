package main

import (
	"io/fs"
	"log"
	"net/http"
	"os"

	"bazi_fortune_app/backend/config"
	"bazi_fortune_app/backend/handlers"
	"bazi_fortune_app/backend/models"

	"github.com/sirupsen/logrus"

	"embed"

	gzip "github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

//go:embed public/static/*
var embeddedStatic embed.FS

func main() {
	log.SetOutput(os.Stdout)
	logrus.SetLevel(logrus.DebugLevel)
	// 加载配置
	cfg, err := config.LoadConfig("./config.yaml")
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	var db *gorm.DB
	var dsn string

	switch cfg.Database.Type {
	case "sqlite":
		dsn = cfg.Database.SQLite.Path
		db, err = gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	case "mysql":
		dsn = cfg.Database.MySQL.DSN
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	default:
		log.Fatalf("Unsupported database type: %s", cfg.Database.Type)
	}

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// 初始化数据库
	ds := models.NewDatabaseSetup(db)
	if err := ds.FullDatabaseSetup(); err != nil {
		log.Fatalf("Failed to setup database: %v", err)
	}

	// AutoMigrate: 创建/更新表结构（首次运行必须）
	if err := db.AutoMigrate(
		&models.User{},
		&models.Master{},
		&models.Order{},
		&models.Chat{},
		&models.Message{},
		&models.Earning{},
		&models.BaziData{},
		&models.AlmanacDetail{},
	); err != nil {
		log.Fatalf("Failed to automigrate: %v", err)
	}

	// 验证数据库
	if err := ds.ValidateDatabase(); err != nil {
		log.Fatalf("Failed to validate database: %v", err)
	}
	gin.SetMode(gin.ReleaseMode)

	// 创建Gin引擎
	r := gin.New()
	// 关闭尾斜杠重定向，避免 307 导致的跨域问题
	r.RedirectTrailingSlash = false
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	// 启用 GZIP 压缩（静态与接口均生效）
	r.Use(gzip.Gzip(gzip.DefaultCompression))

	// 使用 go:embed 提供静态资源，避免工作目录导致的 404
	sub, err := fs.Sub(embeddedStatic, "public/static")
	if err != nil {
		log.Fatalf("failed to init embedded static: %v", err)
	}
	r.StaticFS("/static", http.FS(sub))

	// 添加一个简单的根路由用于测试
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to Bazi Fortune App API"})
	})

	log.Println("Before SetupRoutes")
	// 设置路由
	handlers.SetupRoutes(r, ds.DB, cfg)
	log.Println("After SetupRoutes")

	// 启动服务器
	port := cfg.Server.Port
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s...", port)
	log.Println("Before r.Run")
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
