package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"bazi_fortune_app/backend/config"
)

// 统一消息结构
type aiMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// 通用请求体
type aiChatRequest struct {
	Model    string      `json:"model"`
	Messages []aiMessage `json:"messages"`
	// 可扩展：temperature等
}

// 通用响应体（兼容 openai/deepseek 的 choices[0].message.content）
type aiChatResponse struct {
	Choices []struct {
		Message struct {
			Role    string `json:"role"`
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

// AIProvider 抽象
type AIProvider interface {
	Name() string
	Chat(model string, systemPrompt string, userPrompt string) (string, error)
}

// DeepSeekProvider 实现
type DeepSeekProvider struct {
	cfg *config.Config
}

func (p *DeepSeekProvider) Name() string { return "deepseek" }

func (p *DeepSeekProvider) Chat(model string, systemPrompt string, userPrompt string) (string, error) {
	body := aiChatRequest{
		Model: model,
		Messages: []aiMessage{
			{Role: "system", Content: systemPrompt},
			{Role: "user", Content: userPrompt},
		},
	}
	bs, _ := json.Marshal(body)
	req, err := http.NewRequest("POST", p.cfg.Deepseek.APIBaseURL+"/chat/completions", bytes.NewBuffer(bs))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+p.cfg.Deepseek.APIKey)

	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	out, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("deepseek status %d: %s", resp.StatusCode, string(out))
	}

	var parsed aiChatResponse
	if err := json.Unmarshal(out, &parsed); err != nil {
		return "", err
	}
	if len(parsed.Choices) == 0 {
		return "", fmt.Errorf("deepseek empty choices")
	}
	return parsed.Choices[0].Message.Content, nil
}

// OpenAIProvider 实现
type OpenAIProvider struct {
	cfg *config.Config
}

func (p *OpenAIProvider) Name() string { return "openai" }

func (p *OpenAIProvider) Chat(model string, systemPrompt string, userPrompt string) (string, error) {
	body := aiChatRequest{
		Model: model,
		Messages: []aiMessage{
			{Role: "system", Content: systemPrompt},
			{Role: "user", Content: userPrompt},
		},
	}
	bs, _ := json.Marshal(body)
	url := p.cfg.OpenAI.APIBaseURL + "/chat/completions"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(bs))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+p.cfg.OpenAI.APIKey)

	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	out, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("openai status %d: %s", resp.StatusCode, string(out))
	}

	var parsed aiChatResponse
	if err := json.Unmarshal(out, &parsed); err != nil {
		return "", err
	}
	if len(parsed.Choices) == 0 {
		return "", fmt.Errorf("openai empty choices")
	}
	return parsed.Choices[0].Message.Content, nil
}

// Orchestrator 供应商编排：首选 preferred，失败则切换
type Orchestrator struct {
	providers []AIProvider
	model     string
}

func NewOrchestrator(preferred string, cfg *config.Config, model string) *Orchestrator {
	// 构造顺序：preferred 优先
	order := []AIProvider{}
	ds := &DeepSeekProvider{cfg: cfg}
	oa := &OpenAIProvider{cfg: cfg}
	if preferred == "openai" {
		order = []AIProvider{oa, ds}
	} else {
		order = []AIProvider{ds, oa}
	}
	return &Orchestrator{
		providers: order,
		model:     model,
	}
}

func (o *Orchestrator) ChatJSON(systemPrompt string, userPrompt string) (string, string, error) {
	var lastErr error
	for _, p := range o.providers {
		content, err := p.Chat(o.model, systemPrompt, userPrompt)
		if err == nil {
			return p.Name(), content, nil
		}
		lastErr = err
	}
	return "", "", fmt.Errorf("all providers failed: %w", lastErr)
}
