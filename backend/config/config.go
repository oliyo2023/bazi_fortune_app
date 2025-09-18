package config

import (
	"os"
	"gopkg.in/yaml.v3"
)

// Config 结构体映射 config.yaml 文件
type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Supabase SupabaseConfig `yaml:"supabase"`
	Deepseek DeepseekConfig `yaml:"deepseek"`
}

type ServerConfig struct {
	Port string `yaml:"port"`
}

type SupabaseConfig struct {
	URL            string `yaml:"url"`
	AnonKey        string `yaml:"anon_key"`
	ServiceRoleKey string `yaml:"service_role_key"`
}

type DeepseekConfig struct {
	APIKey      string `yaml:"api_key"`
	APIBaseURL  string `yaml:"api_base_url"`
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