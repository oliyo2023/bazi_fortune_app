package config

import (
	"os"

	"gopkg.in/yaml.v3"
)

// Config 结构体映射 config.yaml 文件
type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Database DatabaseConfig `yaml:"database"`
	Deepseek DeepseekConfig `yaml:"deepseek"`
	OpenAI   OpenAIConfig   `yaml:"openai"`
	Auth     AuthConfig     `yaml:"auth"`
}

type ServerConfig struct {
	Port string `yaml:"port"`
}

type DatabaseConfig struct {
	Type   string       `yaml:"type"`
	SQLite SQLiteConfig `yaml:"sqlite"`
	MySQL  MySQLConfig  `yaml:"mysql"`
}

type SQLiteConfig struct {
	Path string `yaml:"path"`
}

type MySQLConfig struct {
	DSN          string `yaml:"dsn"`
	MaxOpenConns int    `yaml:"max_open_conns"`
	MaxIdleConns int    `yaml:"max_idle_conns"`
	ConnMaxLife  int    `yaml:"conn_max_life_seconds"`
}

type AuthConfig struct {
	JWTSecret string `yaml:"jwt_secret"`
}

type DeepseekConfig struct {
	APIKey     string `yaml:"api_key"`
	APIBaseURL string `yaml:"api_base_url"`
}

type OpenAIConfig struct {
	APIKey     string `yaml:"api_key"`
	APIBaseURL string `yaml:"api_base_url"`
}

// LoadConfig 从指定路径加载配置，并替换环境变量
func LoadConfig(path string) (*Config, error) {
	// 读取 YAML 文件内容
	yamlFile, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	// 替换环境变量
	expandedYaml := os.ExpandEnv(string(yamlFile))

	// 解析 YAML
	var cfg Config
	err = yaml.Unmarshal([]byte(expandedYaml), &cfg)
	if err != nil {
		return nil, err
	}

	return &cfg, nil
}
