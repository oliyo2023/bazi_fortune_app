// Package models 包含所有数据库模型定义
package models

import (
	"fmt"
	"reflect"
	"strings"
	"time"

	"gorm.io/gorm"
)

// ModelInfo 模型信息结构
type ModelInfo struct {
	TableName  string
	StructName string
	Fields     []FieldInfo
}

// FieldInfo 字段信息结构
type FieldInfo struct {
	Name      string
	Type      string
	DBType    string
	IsPrimary bool
	IsUnique  bool
	IsIndex   bool
	Nullable  bool
	Default   string
	Comment   string
}

// GetAllModels 获取所有模型信息
func GetAllModels() []ModelInfo {
	models := []interface{}{
		&User{},
		&Master{},
		&Order{},
		&Chat{},
		&Message{},
		&Earning{},
		&BaziData{},
	}

	var modelInfos []ModelInfo
	for _, model := range models {
		info := getModelInfo(model)
		modelInfos = append(modelInfos, info)
	}

	return modelInfos
}

// getModelInfo 获取单个模型信息
func getModelInfo(model interface{}) ModelInfo {
	t := reflect.TypeOf(model).Elem()
	v := reflect.ValueOf(model).Elem()

	info := ModelInfo{
		StructName: t.Name(),
	}

	// 获取表名
	if tableNamer, ok := model.(interface{ TableName() string }); ok {
		info.TableName = tableNamer.TableName()
	} else {
		// 默认表名转换：驼峰命名转下划线
		info.TableName = toSnakeCase(t.Name()) + "s"
	}

	// 获取字段信息
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		value := v.Field(i)

		// 跳过非导出字段和关联字段
		if field.PkgPath != "" || isAssociationField(field) {
			continue
		}

		fieldInfo := FieldInfo{
			Name: field.Name,
			Type: field.Type.String(),
		}

		// 解析GORM标签
		if gormTag := field.Tag.Get("gorm"); gormTag != "" {
			parseGormTag(gormTag, &fieldInfo)
		}

		// 设置默认值
		if fieldInfo.Default == "" && !fieldInfo.Nullable {
			var _ reflect.Value = value
			fieldInfo.Default = getDefaultValue(field.Type)
		}

		info.Fields = append(info.Fields, fieldInfo)
	}

	return info
}

// isAssociationField 判断是否为关联字段
func isAssociationField(field reflect.StructField) bool {
	// 简单的启发式判断：如果字段类型是结构体或切片，且没有gorm标签中的column定义，则认为是关联字段
	if field.Type.Kind() == reflect.Struct || field.Type.Kind() == reflect.Slice {
		if gormTag := field.Tag.Get("gorm"); gormTag != "" {
			return !strings.Contains(gormTag, "column:") && !strings.Contains(gormTag, "type:")
		}
		return true
	}
	return false
}

// parseGormTag 解析GORM标签
func parseGormTag(tag string, info *FieldInfo) {
	parts := strings.Split(tag, ";")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		switch {
		case strings.HasPrefix(part, "type:"):
			info.DBType = strings.TrimPrefix(part, "type:")
		case strings.HasPrefix(part, "default:"):
			info.Default = strings.TrimPrefix(part, "default:")
		case part == "primaryKey":
			info.IsPrimary = true
		case strings.HasPrefix(part, "unique"):
			info.IsUnique = true
		case strings.HasPrefix(part, "index"):
			info.IsIndex = true
		case strings.Contains(part, "not null"):
			info.Nullable = false
		}
	}
}

// toSnakeCase 驼峰命名转下划线
func toSnakeCase(s string) string {
	var result []rune
	for i, r := range s {
		if i > 0 && r >= 'A' && r <= 'Z' {
			result = append(result, '_')
		}
		result = append(result, r)
	}
	return strings.ToLower(string(result))
}

// getDefaultValue 获取默认值
func getDefaultValue(fieldType reflect.Type) string {
	switch fieldType.Kind() {
	case reflect.Bool:
		return "false"
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return "0"
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return "0"
	case reflect.Float32, reflect.Float64:
		return "0.0"
	case reflect.String:
		return "''"
	case reflect.Struct:
		if fieldType.String() == "time.Time" {
			return "CURRENT_TIMESTAMP"
		}
		if fieldType.String() == "uuid.UUID" {
			return ""
		}
	}
	return ""
}

// ValidateModel 验证模型结构
func ValidateModel(model interface{}) error {
	return nil // 这里可以添加具体的验证逻辑
}

// PrintModelSchema 打印模型结构（调试用）
func PrintModelSchema() {
	models := GetAllModels()
	for _, model := range models {
		fmt.Printf("\n=== %s (%s) ===\n", model.StructName, model.TableName)
		for _, field := range model.Fields {
			fmt.Printf("  %s: %s", field.Name, field.Type)
			if field.DBType != "" {
				fmt.Printf(" -> %s", field.DBType)
			}
			if field.IsPrimary {
				fmt.Print(" [PRIMARY KEY]")
			}
			if field.IsUnique {
				fmt.Print(" [UNIQUE]")
			}
			if field.IsIndex {
				fmt.Print(" [INDEX]")
			}
			if field.Nullable {
				fmt.Print(" [NULLABLE]")
			}
			if field.Default != "" {
				fmt.Printf(" DEFAULT %s", field.Default)
			}
			fmt.Println()
		}
	}
}

// BaseModel 定义了所有模型通用的字段
type BaseModel struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

// Paginate 分页查询
func Paginate(page, pageSize int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if page <= 0 {
			page = 1
		}
		if pageSize <= 0 {
			pageSize = 10
		}
		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}
