package models

// UserRole 用户角色枚举
type UserRole string

const (
	UserRoleUser  UserRole = "user"
	UserRoleMaster UserRole = "master"
	UserRoleAdmin  UserRole = "admin"
)

// OrderStatus 订单状态枚举
type OrderStatus string

const (
	OrderStatusPending   OrderStatus = "pending"
	OrderStatusPaid      OrderStatus = "paid"
	OrderStatusCancelled OrderStatus = "cancelled"
	OrderStatusRefunded  OrderStatus = "refunded"
)

// PaymentMethod 支付方式枚举
type PaymentMethod string

const (
	PaymentMethodAlipay PaymentMethod = "alipay"
	PaymentMethodWechat PaymentMethod = "wechat"
)

// MessageSender 消息发送者枚举
type MessageSender string

const (
	MessageSenderUser    MessageSender = "user"
	MessageSenderMaster  MessageSender = "master"
	MessageSenderDeepseek MessageSender = "deepseek"
)

// Gender 性别枚举
type Gender string

const (
	GenderMale   Gender = "male"
	GenderFemale Gender = "female"
	GenderOther  Gender = "other"
)

// String 方法实现
func (r UserRole) String() string {
	return string(r)
}

func (s OrderStatus) String() string {
	return string(s)
}

func (p PaymentMethod) String() string {
	return string(p)
}

func (s MessageSender) String() string {
	return string(s)
}

func (g Gender) String() string {
	return string(g)
}