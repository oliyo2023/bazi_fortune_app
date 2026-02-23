package services

import (
	"fmt"
	"log"
	"math/rand"
	"time"
)

// SmsService 短信服务接口
type SmsService interface {
	SendVerificationCode(phone string, code string) error
}

// MockSmsService 模拟短信服务（开发环境使用）
type MockSmsService struct{}

// NewMockSmsService 创建模拟短信服务
func NewMockSmsService() *MockSmsService {
	return &MockSmsService{}
}

// SendVerificationCode 发送验证码（模拟）
func (s *MockSmsService) SendVerificationCode(phone string, code string) error {
	// 在控制台输出验证码，方便开发调试
	log.Printf("====================================")
	log.Printf("[短信服务] 发送验证码到手机: %s", phone)
	log.Printf("[短信服务] 验证码: %s", code)
	log.Printf("[短信服务] 有效期: 5分钟")
	log.Printf("====================================")
	return nil
}

// GenerateCode 生成4位数字验证码
func GenerateCode() string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return fmt.Sprintf("%04d", r.Intn(10000))
}

// AliyunSmsService 阿里云短信服务（生产环境使用）
// TODO: 实现阿里云短信服务
type AliyunSmsService struct {
	AccessKeyID     string
	AccessKeySecret string
	SignName        string
	TemplateCode    string
}

// NewAliyunSmsService 创建阿里云短信服务
func NewAliyunSmsService(accessKeyID, accessKeySecret, signName, templateCode string) *AliyunSmsService {
	return &AliyunSmsService{
		AccessKeyID:     accessKeyID,
		AccessKeySecret: accessKeySecret,
		SignName:        signName,
		TemplateCode:    templateCode,
	}
}

// SendVerificationCode 发送验证码（阿里云）
func (s *AliyunSmsService) SendVerificationCode(phone string, code string) error {
	// TODO: 实现阿里云短信API调用
	// 参考文档: https://help.aliyun.com/document_detail/101414.html
	log.Printf("[阿里云短信] 发送验证码到 %s: %s (未实现，请配置阿里云短信服务)", phone, code)
	return fmt.Errorf("阿里云短信服务未实现")
}

// TencentSmsService 腾讯云短信服务（生产环境使用）
// TODO: 实现腾讯云短信服务
type TencentSmsService struct {
	SecretID     string
	SecretKey    string
	AppID        string
	SignName     string
	TemplateID   string
}

// NewTencentSmsService 创建腾讯云短信服务
func NewTencentSmsService(secretID, secretKey, appID, signName, templateID string) *TencentSmsService {
	return &TencentSmsService{
		SecretID:   secretID,
		SecretKey:  secretKey,
		AppID:      appID,
		SignName:   signName,
		TemplateID: templateID,
	}
}

// SendVerificationCode 发送验证码（腾讯云）
func (s *TencentSmsService) SendVerificationCode(phone string, code string) error {
	// TODO: 实现腾讯云短信API调用
	// 参考文档: https://cloud.tencent.com/document/product/382/43196
	log.Printf("[腾讯云短信] 发送验证码到 %s: %s (未实现，请配置腾讯云短信服务)", phone, code)
	return fmt.Errorf("腾讯云短信服务未实现")
}
