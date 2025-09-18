package main

import (
	"fmt"
	"log"

	"github.com/google/uuid"
	"bazi_fortune_app/backend/config"
	"bazi_fortune_app/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// 辅助函数
func stringPtr(s string) *string { return &s }
func intPtr(i int) *int { return &i }
func floatPtr(f float64) *float64 { return &f }

func main() {
	fmt.Println("=== 数据库集成测试 ===")

	// 加载配置
	cfg, err := config.LoadConfig("config.example.yaml")
	if err != nil {
		log.Fatalf("加载配置失败: %v", err)
	}

	fmt.Printf("使用Supabase配置: %s\n", cfg.Supabase.URL)

	// 由于配置文件中没有数据库配置，使用默认的本地数据库配置
	dsn := "host=localhost user=postgres password=postgres dbname=bazi_fortune port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("数据库连接失败: %v", err)
	}

	fmt.Println("数据库连接成功！")

	// 测试数据库连接
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("获取数据库实例失败: %v", err)
	}

	// 测试连接
	if err := sqlDB.Ping(); err != nil {
		log.Fatalf("数据库连接测试失败: %v", err)
	}

	fmt.Println("数据库连接测试通过！")

	// 获取数据库统计信息
	stats := sqlDB.Stats()
	fmt.Printf("数据库连接池状态: 打开连接=%d, 空闲连接=%d, 使用中连接=%d\n",
		stats.OpenConnections, stats.Idle, stats.InUse)

	// 创建测试数据
	fmt.Println("\n=== 创建测试数据 ===")

	// 创建用户
	user := &models.User{
		ID:   uuid.New(),
		Role: models.UserRoleUser,
	}
	
	if err := db.Create(user).Error; err != nil {
		log.Printf("创建用户失败: %v", err)
	} else {
		fmt.Printf("用户创建成功: %s\n", user.ID)
	}

	// 创建大师
	master := &models.Master{
		UserID:             uuid.New(),
		Name:               stringPtr("测试大师"),
		Specialty:          stringPtr("八字算命"),
		PricePerMsg:        50.00,
		IsVerified:         true,
		Rating:             4.8,
		TotalConsultations: 100,
		Tags:               stringPtr(`["八字", "算命"]`),
		IsOnline:           true,
		Gender:             stringPtr(string(models.GenderMale)),
		Age:                intPtr(45),
		ExperienceYears:    20,
		Phone:              stringPtr("13800138000"),
		Wechat:             stringPtr("test_master"),
		InviteCode:         stringPtr("TEST123"),
		Location:           stringPtr("北京市"),
	}

	if err := db.Create(master).Error; err != nil {
		log.Printf("创建大师失败: %v", err)
	} else {
		fmt.Printf("大师创建成功: %s (%s)\n", *master.Name, master.UserID)
	}

	// 创建聊天会话
	chat := &models.Chat{
		UserID:       user.ID,
		MasterID:     &master.UserID,
		IsTrial:      true,
		MessageCount: 0,
	}

	if err := db.Create(chat).Error; err != nil {
		log.Printf("创建聊天会话失败: %v", err)
	} else {
		fmt.Printf("聊天会话创建成功: %s\n", chat.ID)
	}

	// 设置八字输入
	baziInput := &models.BaziInput{
		Year:   1990,
		Month:  6,
		Day:    15,
		Hour:   14,
		Minute: 30,
		Gender: "male",
		Name:   "测试用户",
	}
	
	if err := chat.SetBaziInput(baziInput); err != nil {
		log.Printf("设置八字输入失败: %v", err)
	} else {
		fmt.Println("八字输入设置成功")
	}

	// 更新聊天会话
	if err := db.Save(chat).Error; err != nil {
		log.Printf("更新聊天会话失败: %v", err)
	} else {
		fmt.Println("聊天会话更新成功")
	}

	// 查询测试
	fmt.Println("\n=== 查询测试 ===")

	// 查询用户
	var foundUser models.User
	if err := db.First(&foundUser, "id = ?", user.ID).Error; err != nil {
		log.Printf("查询用户失败: %v", err)
	} else {
		fmt.Printf("查询用户成功: %s\n", foundUser.ID)
	}

	// 查询大师
	var foundMaster models.Master
	if err := db.First(&foundMaster, "user_id = ?", master.UserID).Error; err != nil {
		log.Printf("查询大师失败: %v", err)
	} else {
		fmt.Printf("查询大师成功: %s (%s)\n", *foundMaster.Name, foundMaster.UserID)
	}

	// 查询聊天会话
	var foundChat models.Chat
	if err := db.Preload("User").Preload("Master").First(&foundChat, "id = ?", chat.ID).Error; err != nil {
		log.Printf("查询聊天会话失败: %v", err)
	} else {
		fmt.Printf("查询聊天会话成功: %s\n", foundChat.ID)
		if inputData, err := foundChat.GetBaziInput(); err == nil && inputData != nil {
			fmt.Printf("八字信息: %s, %d年%d月%d日 %d:%d (%s)\n",
				inputData.Name, inputData.Year, inputData.Month, inputData.Day,
				inputData.Hour, inputData.Minute, inputData.Gender)
		}
	}

	// 关联查询测试
	fmt.Println("\n=== 关联查询测试 ===")

	// 查询用户的所有聊天会话
	var userChats []models.Chat
	if err := db.Preload("Master").Where("user_id = ?", user.ID).Find(&userChats).Error; err != nil {
		log.Printf("查询用户聊天会话失败: %v", err)
	} else {
		fmt.Printf("用户 %s 有 %d 个聊天会话\n", user.ID, len(userChats))
	}

	// 查询大师的所有聊天会话
	var masterChats []models.Chat
	if err := db.Preload("User").Where("master_id = ?", master.UserID).Find(&masterChats).Error; err != nil {
		log.Printf("查询大师聊天会话失败: %v", err)
	} else {
		fmt.Printf("大师 %s 有 %d 个聊天会话\n", master.UserID, len(masterChats))
	}

	// 清理测试数据
	fmt.Println("\n=== 清理测试数据 ===")
	
	// 删除聊天会话
	if err := db.Delete(&models.Chat{}, "id = ?", chat.ID).Error; err != nil {
		log.Printf("删除聊天会话失败: %v", err)
	} else {
		fmt.Printf("聊天会话删除成功: %s\n", chat.ID)
	}

	// 删除大师
	if err := db.Delete(&models.Master{}, "user_id = ?", master.UserID).Error; err != nil {
		log.Printf("删除大师失败: %v", err)
	} else {
		fmt.Printf("大师删除成功: %s\n", master.UserID)
	}

	// 删除用户
	if err := db.Delete(&models.User{}, "id = ?", user.ID).Error; err != nil {
		log.Printf("删除用户失败: %v", err)
	} else {
		fmt.Printf("用户删除成功: %s\n", user.ID)
	}

	// 关闭数据库连接
	if err := sqlDB.Close(); err != nil {
		log.Printf("关闭数据库连接失败: %v", err)
	} else {
		fmt.Println("数据库连接已关闭")
	}

	fmt.Println("\n=== 数据库集成测试完成 ===")
	fmt.Println("所有测试通过！")
}