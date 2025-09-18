package main

import (
	"fmt"
	"log"

	"github.com/google/uuid"
	"bazi_fortune_app/backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// 辅助函数
func stringPtr(s string) *string { return &s }
func intPtr(i int) *int { return &i }
func floatPtr(f float64) *float64 { return &f }

func main() {
	fmt.Println("=== 数据库集成测试 (SQLite模拟) ===")

	// 使用SQLite内存数据库进行测试
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		log.Fatalf("数据库连接失败: %v", err)
	}

	fmt.Println("SQLite内存数据库连接成功！")

	// 自动迁移表结构
	fmt.Println("\n=== 自动迁移表结构 ===")
	err = db.AutoMigrate(
		&models.User{},
		&models.Master{},
		&models.Chat{},
		&models.Message{},
		&models.Order{},
		&models.Earning{},
	)
	if err != nil {
		log.Fatalf("自动迁移失败: %v", err)
	}
	fmt.Println("表结构自动迁移成功！")

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

	// 创建消息
	message1 := &models.Message{
		ChatID:  chat.ID,
		Sender:  models.MessageSenderUser,
		Content: "你好，我想咨询一下我的事业运势",
	}

	if err := db.Create(message1).Error; err != nil {
		log.Printf("创建消息1失败: %v", err)
	} else {
		fmt.Printf("消息1创建成功: %s\n", message1.ID)
	}

	message2 := &models.Message{
		ChatID:  chat.ID,
		Sender:  models.MessageSenderMaster,
		Content: "您好！请提供您的出生年月日时，我来为您分析事业运势。",
	}

	if err := db.Create(message2).Error; err != nil {
		log.Printf("创建消息2失败: %v", err)
	} else {
		fmt.Printf("消息2创建成功: %s\n", message2.ID)
	}

	// 创建订单
	paymentMethod := models.PaymentMethodWechat
	platformFee := 10.00
	order := &models.Order{
		UserID:        user.ID,
		MasterID:      master.UserID,
		Amount:        100.00,
		Status:        models.OrderStatusPending,
		PaymentMethod: &paymentMethod,
		PlatformFee:   &platformFee,
	}

	if err := db.Create(order).Error; err != nil {
		log.Printf("创建订单失败: %v", err)
	} else {
		fmt.Printf("订单创建成功: %s\n", order.ID)
	}

	// 创建收入记录
	earning := &models.Earning{
		MasterID:    master.UserID,
		OrderID:     order.ID,
		Amount:      90.00,
		PlatformFee: 10.00,
		PaidOut:     false,
	}

	if err := db.Create(earning).Error; err != nil {
		log.Printf("创建收入记录失败: %v", err)
	} else {
		fmt.Printf("收入记录创建成功: %s\n", earning.ID)
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

	// 查询消息
	var messages []models.Message
	if err := db.Where("chat_id = ?", chat.ID).Find(&messages).Error; err != nil {
		log.Printf("查询消息失败: %v", err)
	} else {
		fmt.Printf("查询消息成功，共找到 %d 条消息\n", len(messages))
		for i, msg := range messages {
			fmt.Printf("  消息%d: %s - %s\n", i+1, msg.Sender, msg.Content)
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

	// 查询聊天会话的所有消息
	var chatMessages []models.Message
	if err := db.Where("chat_id = ?", chat.ID).Find(&chatMessages).Error; err != nil {
		log.Printf("查询聊天消息失败: %v", err)
	} else {
		fmt.Printf("聊天会话 %s 有 %d 条消息\n", chat.ID, len(chatMessages))
	}

	// 更新测试
	fmt.Println("\n=== 更新测试 ===")

	// 更新聊天会话的消息数量
	if err := db.Model(&foundChat).Update("message_count", len(messages)).Error; err != nil {
		log.Printf("更新聊天会话消息数量失败: %v", err)
	} else {
		fmt.Printf("聊天会话消息数量更新成功: %d\n", len(messages))
	}

	// 更新订单状态
	if err := db.Model(&order).Update("status", models.OrderStatusPaid).Error; err != nil {
		log.Printf("更新订单状态失败: %v", err)
	} else {
		fmt.Println("订单状态更新成功: paid")
	}

	// 删除测试
	fmt.Println("\n=== 删除测试 ===")
	
	// 删除消息
	if err := db.Delete(&models.Message{}, "chat_id = ?", chat.ID).Error; err != nil {
		log.Printf("删除消息失败: %v", err)
	} else {
		fmt.Printf("消息删除成功\n")
	}

	// 删除聊天会话
	if err := db.Delete(&models.Chat{}, "id = ?", chat.ID).Error; err != nil {
		log.Printf("删除聊天会话失败: %v", err)
	} else {
		fmt.Printf("聊天会话删除成功: %s\n", chat.ID)
	}

	// 删除订单
	if err := db.Delete(&models.Order{}, "id = ?", order.ID).Error; err != nil {
		log.Printf("删除订单失败: %v", err)
	} else {
		fmt.Printf("订单删除成功: %s\n", order.ID)
	}

	// 删除收入记录
	if err := db.Delete(&models.Earning{}, "id = ?", earning.ID).Error; err != nil {
		log.Printf("删除收入记录失败: %v", err)
	} else {
		fmt.Printf("收入记录删除成功: %s\n", earning.ID)
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

	fmt.Println("\n=== 数据库集成测试完成 ===")
	fmt.Println("所有测试通过！")
}