package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
	"bazi_fortune_app/backend/models"
)

func main() {
	fmt.Println("=== 数据模型测试 ===")

	// 测试枚举类型
	fmt.Println("\n1. 测试枚举类型:")
	fmt.Printf("用户角色: %s\n", models.UserRoleUser)
	fmt.Printf("订单状态: %s\n", models.OrderStatusPaid)
	fmt.Printf("支付方式: %s\n", models.PaymentMethodAlipay)
	fmt.Printf("消息发送者: %s\n", models.MessageSenderMaster)
	fmt.Printf("性别: %s\n", models.GenderFemale)

	// 测试用户模型
	fmt.Println("\n2. 测试用户模型:")
	userID := uuid.New()
	user := &models.User{
		ID:   userID,
		Role: models.UserRoleUser,
	}
	fmt.Printf("用户ID: %s, 角色: %s\n", user.ID, user.Role)

	// 测试大师模型
	fmt.Println("\n3. 测试大师模型:")
	masterUserID := uuid.New()
	master := &models.Master{
		UserID:            masterUserID,
		Name:              stringPtr("张大师"),
		Specialty:         stringPtr("八字算命"),
		PricePerMsg:       50.00,
		IsVerified:        true,
		Rating:            4.8,
		TotalConsultations: 100,
		Tags:              stringPtr(`["八字", "算命", "风水"]`),
		IsOnline:          true,
		Gender:            stringPtr(string(models.GenderMale)),
		Age:               intPtr(45),
		ExperienceYears:   20,
		Phone:             stringPtr("13800138000"),
		InviteCode:        stringPtr("CODE123"),
	}
	fmt.Printf("大师姓名: %s, 专业: %s, 价格: %.2f, 评分: %.1f\n", 
		master.Name, master.Specialty, master.PricePerMsg, master.Rating)

	// 测试订单模型
	fmt.Println("\n4. 测试订单模型:")
	order := &models.Order{
		UserID:        user.ID,
		MasterID:      master.UserID,
		Amount:        100.00,
		Status:        models.OrderStatusPending,
		PaymentMethod: models.PaymentMethodAlipay,
		PlatformFee:   10.00,
	}
	fmt.Printf("订单金额: %.2f, 状态: %s, 支付方式: %s\n", 
		order.Amount, order.Status, order.PaymentMethod)

	// 添加辅助函数
	stringPtr := func(s string) *string { return &s }
	intPtr := func(i int) *int { return &i }

	// 测试聊天模型
	fmt.Println("\n5. 测试聊天模型:")
	chat := &models.Chat{
		UserID:       user.ID,
		MasterID:     &master.UserID,
		IsTrial:      false,
		MessageCount: 5,
	}

	// 测试八字输入
	baziInput := &models.BaziInput{
		Year:   1990,
		Month:  6,
		Day:    15,
		Hour:   14,
		Minute: 30,
		Gender: "male",
		Name:   "李四",
	}

	err := chat.SetBaziInput(baziInput)
	if err != nil {
		log.Printf("设置八字输入失败: %v", err)
	} else {
		fmt.Println("八字输入设置成功")
	}

	// 测试消息模型
	fmt.Println("\n6. 测试消息模型:")
	message := &models.Message{
		ChatID:    1,
		Sender:    models.MessageSenderMaster,
		Content:   "根据你的八字分析，你的财运很好。",
		Timestamp: time.Now(),
	}
	fmt.Printf("消息发送者: %s, 内容: %s\n", message.Sender, message.Content)

	// 测试收入模型
	fmt.Println("\n7. 测试收入模型:")
	earning := &models.Earning{
		MasterID:   master.UserID,
		OrderID:    1,
		Amount:     90.00,
		PlatformFee: 10.00,
		PaidOut:    false,
	}
	fmt.Printf("收入金额: %.2f, 平台费用: %.2f, 净收入: %.2f\n", 
		earning.Amount, earning.PlatformFee, earning.GetNetAmount())

	// 测试八字数据模型
	fmt.Println("\n8. 测试八字数据模型:")
	baziData := &models.BaziData{
		UserID:   user.ID,
		ChatID:   nil, // 暂时设置为nil，因为chat.ID还未生成
		Analysis: "这是一个很好的八字配置。",
	}

	// 设置输入数据
	err = baziData.SetInputData(baziInput)
	if err != nil {
		log.Printf("设置输入数据失败: %v", err)
	} else {
		fmt.Println("输入数据设置成功")
	}

	// 设置结果数据
	baziResult := &models.BaziResult{
		YearPillar:   "庚午",
		MonthPillar:  "丙午",
		DayPillar:    "戊寅",
		HourPillar:   "己未",
		DayMaster:    "戊土",
		MonthOrder:   "建禄",
		FiveElements: map[string]int{"木": 2, "火": 3, "土": 2, "金": 1, "水": 0},
	}

	err = baziData.SetResultData(baziResult)
	if err != nil {
		log.Printf("设置结果数据失败: %v", err)
	} else {
		fmt.Println("结果数据设置成功")
	}

	// 测试JSON序列化
	fmt.Println("\n9. 测试JSON序列化:")
	userJSON, err := json.MarshalIndent(user, "", "  ")
	if err != nil {
		log.Printf("JSON序列化失败: %v", err)
	} else {
		fmt.Printf("用户JSON: %s\n", userJSON)
	}

	fmt.Println("\n=== 测试完成 ===")
}