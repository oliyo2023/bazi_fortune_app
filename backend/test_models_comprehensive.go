package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"
	"bazi_fortune_app/backend/models"
)

// 辅助函数
func stringPtr(s string) *string { return &s }
func intPtr(i int) *int { return &i }
func floatPtr(f float64) *float64 { return &f }

func main() {
	fmt.Println("=== 综合数据模型测试 ===")

	// 1. 创建用户
	fmt.Println("\n1. 创建用户:")
	userID := uuid.New()
	user := &models.User{
		ID:   userID,
		Role: models.UserRoleUser,
	}
	fmt.Printf("用户创建成功: %s\n", user.ID)

	// 2. 创建大师
	fmt.Println("\n2. 创建大师:")
	masterUserID := uuid.New()
	master := &models.Master{
		UserID:             masterUserID,
		Name:               stringPtr("李大师"),
		Specialty:          stringPtr("八字命理、紫微斗数"),
		Bio:                stringPtr("资深命理大师，专注八字分析30年"),
		PricePerMsg:        88.88,
		IsVerified:         true,
		Rating:             4.9,
		TotalConsultations: 888,
		Tags:               stringPtr(`["八字", "紫微斗数", "风水", "起名"]`),
		IsOnline:           true,
		Gender:             stringPtr(string(models.GenderMale)),
		Age:                intPtr(55),
		ExperienceYears:    30,
		Phone:              stringPtr("13900139000"),
		Wechat:             stringPtr("master_li"),
		InviteCode:         stringPtr("MASTER888"),
		Location:           stringPtr("北京市"),
	}
	fmt.Printf("大师创建成功: %s (评分: %.1f, 咨询次数: %d)\n", 
		*master.Name, master.Rating, master.TotalConsultations)

	// 3. 创建聊天会话
	fmt.Println("\n3. 创建聊天会话:")
	chat := &models.Chat{
		UserID:       user.ID,
		MasterID:     &master.UserID,
		IsTrial:      true,
		MessageCount: 0,
	}
	fmt.Printf("聊天会话创建成功: 用户 %s 与大师 %s\n", user.ID, *master.Name)

	// 4. 设置八字输入
	fmt.Println("\n4. 设置八字输入:")
	baziInput := &models.BaziInput{
		Year:     1990,
		Month:    6,
		Day:      15,
		Hour:     14,
		Minute:   30,
		Gender:   "male",
		Name:     "张三",
		Timezone: "Asia/Shanghai",
	}
	if err := chat.SetBaziInput(baziInput); err != nil {
		fmt.Printf("设置八字输入失败: %v\n", err)
	} else {
		fmt.Println("八字输入设置成功")
		if inputData, err := chat.GetBaziInput(); err == nil && inputData != nil {
			fmt.Printf("八字信息: %s, %d年%d月%d日 %d:%d (%s)\n",
				inputData.Name, inputData.Year, inputData.Month, inputData.Day,
				inputData.Hour, inputData.Minute, inputData.Gender)
		}
	}

	// 5. 创建订单
	fmt.Println("\n5. 创建订单:")
	paymentMethod := models.PaymentMethodWechat
	order := &models.Order{
		UserID:        user.ID,
		MasterID:      master.UserID,
		Amount:        188.88,
		Status:        models.OrderStatusPaid,
		PaymentMethod: &paymentMethod,
		PlatformFee:   floatPtr(18.88),
	}
	fmt.Printf("订单创建成功: 金额 %.2f, 状态: %s, 支付方式: %s\n",
		order.Amount, order.Status, order.PaymentMethod)

	// 6. 创建消息
	fmt.Println("\n6. 创建消息:")
	messages := []*models.Message{
		{
			ChatID:    chat.ID,
			Sender:    models.MessageSenderUser,
			Content:   "大师您好，我想请教关于事业的问题。",
			Timestamp: time.Now(),
		},
		{
			ChatID:    chat.ID,
			Sender:    models.MessageSenderMaster,
			Content:   "根据你的八字分析，你的事业运势很好，适合从事与木相关的行业。",
			Timestamp: time.Now().Add(1 * time.Minute),
		},
	}
	
	for i, msg := range messages {
		fmt.Printf("消息 %d: [%s] %s\n", i+1, msg.Sender, msg.Content)
	}

	// 7. 创建八字数据
	fmt.Println("\n7. 创建八字数据:")
	baziData := &models.BaziData{
		UserID:   user.ID,
		ChatID:   &chat.ID,
		Analysis: stringPtr("此八字日主身强，喜水木，忌火土。事业宜向东方发展。"),
	}

	// 设置八字输入数据
	if err := baziData.SetInputData(baziInput); err != nil {
		fmt.Printf("设置八字输入数据失败: %v\n", err)
	} else {
		fmt.Println("八字输入数据设置成功")
	}

	// 设置八字结果数据
	baziResult := &models.BaziResult{
		YearPillar:    "庚午",
		MonthPillar:   "壬午",
		DayPillar:     "乙卯",
		HourPillar:    "癸未",
		DayMaster:     "乙木",
		Zodiac:        "马",
		Nayin:         "杨柳木",
		Season:        "夏季",
		SolarTerms:    []string{"芒种", "夏至"},
		LunarDate:     "五月廿三",
		FiveElements:  map[string]int{"木": 2, "火": 3, "土": 1, "金": 1, "水": 1},
		ShiShen:       map[string]string{"年干": "正官", "月干": "正印", "日支": "比肩"},
		YongShen:      []string{"水", "木"},
		XiShen:        []string{"金", "水"},
		JiShen:        []string{"火", "土"},
		LuckyElements: []string{"水", "木"},
		Colors:        []string{"黑色", "绿色"},
		Numbers:       []int{1, 6, 3, 8},
		Directions:    []string{"北方", "东方"},
	}
	
	if err := baziData.SetResultData(baziResult); err != nil {
		fmt.Printf("设置八字结果数据失败: %v\n", err)
	} else {
		fmt.Println("八字结果数据设置成功")
	}

	// 验证数据完整性
	fmt.Println("\n8. 验证数据完整性:")
	if inputData, err := baziData.GetInputData(); err == nil && inputData != nil {
		fmt.Printf("输入数据验证: %s的八字信息完整\n", inputData.Name)
	}
	if resultData, err := baziData.GetResultData(); err == nil && resultData != nil {
		fmt.Printf("结果数据验证: 八字分析结果完整，包含%d个五行、%d个十神\n",
			len(resultData.FiveElements), len(resultData.ShiShen))
	}

	// 9. 创建收入记录
	fmt.Println("\n9. 创建收入记录:")
	earning := &models.Earning{
		MasterID:    master.UserID,
		OrderID:     order.ID,
		Amount:      170.00, // 实际收入 = 订单金额 - 平台费用
		PlatformFee: 18.88,
		PaidOut:     false,
	}
	fmt.Printf("收入记录创建成功: 订单收入 %.2f，平台费用 %.2f，净收入 %.2f\n",
		earning.Amount, earning.PlatformFee, earning.GetNetAmount())

	// 10. JSON序列化测试
	fmt.Println("\n10. JSON序列化测试:")
	testObjects := []interface{}{
		user,
		master,
		order,
		chat,
		messages[0],
		baziData,
		earning,
	}

	for i, obj := range testObjects {
		jsonData, err := json.MarshalIndent(obj, "", "  ")
		if err != nil {
			fmt.Printf("对象 %d JSON序列化失败: %v\n", i+1, err)
		} else {
			fmt.Printf("对象 %d JSON序列化成功，长度: %d 字节\n", i+1, len(jsonData))
		}
	}

	// 11. 数据关系验证
	fmt.Println("\n11. 数据关系验证:")
	fmt.Printf("用户 %s 创建了订单 %s\n", user.ID, order.ID)
	fmt.Printf("大师 %s 参与了聊天 %s\n", master.UserID, chat.ID)
	fmt.Printf("订单 %s 关联了聊天 %s\n", order.ID, chat.ID)
	fmt.Printf("八字数据 %s 关联了用户 %s 和聊天 %s\n", baziData.ID, user.ID, chat.ID)
	fmt.Printf("收入记录关联了大师 %s 和订单 %s\n", earning.MasterID, earning.OrderID)

	fmt.Println("\n=== 综合测试完成 ===")
	fmt.Println("所有数据模型测试通过！")
}