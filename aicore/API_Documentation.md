# AI Core 星盘计算API文档

## 基础信息

**API名称**: AI Core 星盘计算服务
**API版本**: v1.0.0
**基础URL**: `http://localhost:8000`
**认证方式**: 无需认证
**数据格式**: JSON
**字符编码**: UTF-8

---

## 通用响应格式

所有API响应都遵循统一格式：

```json
{
  "success": boolean,
  "message": "响应消息",
  "data": {}, // 具体数据
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## 数据模型

### BirthData (出生数据)

| 字段名 | 类型 | 必填 | 描述 | 示例 |
|--------|------|------|------|------|
| year | integer | 是 | 出生年份 | 1990 |
| month | integer | 是 | 出生月份 | 5 |
| day | integer | 是 | 出生日期 | 15 |
| hour | integer | 是 | 出生小时 | 10 |
| minute | integer | 是 | 出生分钟 | 30 |
| city | string | 是 | 出生城市 | "Beijing" |
| nation | string | 否 | 国家 | "China" |
| timezone | string | 否 | 时区 | "Asia/Shanghai" |

### PlanetPosition (行星位置)

| 字段名 | 类型 | 描述 | 示例 |
|--------|------|------|------|
| name | string | 行星名称 | "太阳" |
| sign | string | 所在星座 | "金牛座" |
| position | number | 精确位置（度） | 25.5 |
| house | integer | 所在宫位 | 2 |
| retrograde | boolean | 是否逆行 | false |

### House (宫位)

| 字段名 | 类型 | 描述 | 示例 |
|--------|------|------|------|
| number | integer | 宫位编号 | 1 |
| sign | string | 宫头星座 | "白羊座" |
| position | number | 宫头位置（度） | 10.5 |

### Aspect (相位)

| 字段名 | 类型 | 描述 | 示例 |
|--------|------|------|------|
| planet1 | string | 行星1 | "太阳" |
| planet2 | string | 行星2 | "月亮" |
| aspect_type | string | 相位类型 | "三分相" |
| orb | number | 容许度 | 2.5 |
| exact | boolean | 是否精确相位 | false |
| applying | boolean | 是否正在形成 | true |
| separating | boolean | 是否正在分离 | false |
| strength | number | 相位强度 | 0.8 |
| angularity | string | 角度性质 | "角宫相位" |

### AstrologyChart (星盘数据)

| 字段名 | 类型 | 描述 | 示例 |
|--------|------|------|------|
| birth_data | object | 出生数据 | BirthData |
| sun_sign | string | 太阳星座 | "金牛座" |
| moon_sign | string | 月亮星座 | "双子座" |
| ascendant | string | 上升星座 | "狮子座" |
| planets | array | 行星位置 | PlanetPosition[] |
| houses | array | 宫位信息 | House[] |
| aspects | array | 相位信息 | Aspect[] |
| created_at | string | 创建时间 | "2024-01-01T00:00:00Z" |

---

## API端点

### 1. 基础信息

#### 1.1 获取API信息

**接口地址**: `GET /`
**接口描述**: 获取API基础信息

**请求示例**:
```bash
curl -X GET "http://localhost:8000/"
```

**响应示例**:
```json
{
  "message": "AI Core 星盘计算API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

#### 1.2 健康检查

**接口地址**: `GET /health`
**接口描述**: 检查API服务状态

**请求示例**:
```bash
curl -X GET "http://localhost:8000/health"
```

**响应示例**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 2. 基础数据

#### 2.1 获取星座信息

**接口地址**: `GET /api/v1/signs`
**接口描述**: 获取所有星座信息

**请求示例**:
```bash
curl -X GET "http://localhost:8000/api/v1/signs"
```

**响应示例**:
```json
{
  "success": true,
  "message": "获取星座信息成功",
  "data": {
    "signs": [
      {
        "name": "白羊座",
        "english": "Aries",
        "date_range": "3月21日-4月19日",
        "element": "火象",
        "ruler": "火星"
      },
      // ... 其他星座
    ]
  }
}
```

#### 2.2 获取行星信息

**接口地址**: `GET /api/v1/planets`
**接口描述**: 获取所有行星信息

**请求示例**:
```bash
curl -X GET "http://localhost:8000/api/v1/planets"
```

**响应示例**:
```json
{
  "success": true,
  "message": "获取行星信息成功",
  "data": {
    "planets": [
      {
        "name": "太阳",
        "english": "Sun",
        "type": "恒星",
        "description": "生命力和自我"
      },
      // ... 其他行星
    ]
  }
}
```

#### 2.3 获取宫位系统信息

**接口地址**: `GET /api/v1/house-systems`
**接口描述**: 获取支持的宫位系统

**请求示例**:
```bash
curl -X GET "http://localhost:8000/api/v1/house-systems"
```

**响应示例**:
```json
{
  "success": true,
  "message": "获取宫位系统信息成功",
  "data": {
    "systems": [
      {
        "name": "Placidus",
        "chinese": "普拉西德宫位制",
        "description": "最常用的宫位系统，基于时间和地理纬度计算"
      },
      // ... 其他宫位系统
    ]
  }
}
```

### 3. 星盘计算

#### 3.1 创建星盘

**接口地址**: `POST /api/v1/chart`
**接口描述**: 根据出生数据计算星盘

**请求参数**:
```json
{
  "birth_data": {
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 10,
    "minute": 30,
    "city": "Beijing",
    "nation": "China",
    "timezone": "Asia/Shanghai"
  },
  "house_system": "Placidus"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:8000/api/v1/chart" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_data": {
      "year": 1990,
      "month": 5,
      "day": 15,
      "hour": 10,
      "minute": 30,
      "city": "Beijing",
      "nation": "China",
      "timezone": "Asia/Shanghai"
    },
    "house_system": "Placidus"
  }'
```

**响应示例**:
```json
{
  "success": true,
  "message": "星盘计算成功",
  "chart": {
    "birth_data": {
      // 出生数据
    },
    "sun_sign": "金牛座",
    "moon_sign": "双子座",
    "ascendant": "狮子座",
    "planets": [
      {
        "name": "太阳",
        "sign": "金牛座",
        "position": 25.5,
        "house": 2,
        "retrograde": false
      },
      // ... 其他行星
    ],
    "houses": [
      {
        "number": 1,
        "sign": "狮子座",
        "position": 10.5
      },
      // ... 其他宫位
    ],
    "aspects": [
      {
        "planet1": "太阳",
        "planet2": "月亮",
        "aspect_type": "三分相",
        "orb": 2.5,
        "exact": false,
        "applying": true,
        "separating": false,
        "strength": 0.8,
        "angularity": "续宫相位"
      },
      // ... 其他相位
    ],
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### 3.2 生成星盘报告

**接口地址**: `POST /api/v1/report`
**接口描述**: 生成星盘解读报告

**请求参数**: 同创建星盘接口

**请求示例**:
```bash
curl -X POST "http://localhost:8000/api/v1/report" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_data": {
      "year": 1990,
      "month": 5,
      "day": 15,
      "hour": 10,
      "minute": 30,
      "city": "Beijing",
      "nation": "China",
      "timezone": "Asia/Shanghai"
    },
    "house_system": "Placidus"
  }'
```

**响应示例**:
```json
{
  "success": true,
  "message": "报告生成成功",
  "chart": {
    // 星盘数据
  },
  "report": "## 星盘解读报告\n\n### 基本信息\n- 太阳星座：金牛座\n- 月亮星座：双子座\n- 上升星座：狮子座\n\n### 个性特征\n..."
}
```

### 4. 行运分析

#### 4.1 计算行运

**接口地址**: `POST /api/v1/transits`
**接口描述**: 计算指定时间范围内的行运分析

**请求参数**:
```json
{
  "birth_data": {
    // 出生数据
  },
  "start_date": "2024-01-01T00:00:00Z",
  "end_date": "2024-01-31T23:59:59Z",
  "transit_type": "natal",
  "location": "Beijing"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:8000/api/v1/transits" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_data": {
      "year": 1990,
      "month": 5,
      "day": 15,
      "hour": 10,
      "minute": 30,
      "city": "Beijing",
      "nation": "China",
      "timezone": "Asia/Shanghai"
    },
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-01-31T23:59:59Z",
    "transit_type": "natal",
    "location": "Beijing"
  }'
```

**响应示例**:
```json
{
  "success": true,
  "message": "行运计算成功",
  "transit_periods": [
    {
      "transiting_planet": "木星",
      "start_date": "2024-01-05T00:00:00Z",
      "end_date": "2024-01-20T00:00:00Z",
      "peak_date": "2024-01-12T00:00:00Z",
      "transits": [
        {
          "transiting_planet": "木星",
          "natal_planet": "太阳",
          "aspect_type": "三分相",
          "orb": 1.5,
          "exact_date": "2024-01-12T00:00:00Z",
          "applying": true,
          "separating": false,
          "intensity": 0.8,
          "duration_days": 15
        }
      ],
      "overall_intensity": 0.8,
      "description": "木星三分太阳"
    }
    // ... 其他行运周期
  ],
  "natal_chart": {
    // 本命盘数据
  }
}
```

### 5. 推运计算

#### 5.1 计算推运星盘

**接口地址**: `POST /api/v1/progressions`
**接口描述**: 计算指定日期的推运星盘

**请求参数**:
```json
{
  "birth_data": {
    // 出生数据
  },
  "progression_date": "2024-01-01T00:00:00Z",
  "progression_type": "secondary",
  "house_system": "Placidus"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:8000/api/v1/progressions" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_data": {
      "year": 1990,
      "month": 5,
      "day": 15,
      "hour": 10,
      "minute": 30,
      "city": "Beijing",
      "nation": "China",
      "timezone": "Asia/Shanghai"
    },
    "progression_date": "2024-01-01T00:00:00Z",
    "progression_type": "secondary",
    "house_system": "Placidus"
  }'
```

**响应示例**:
```json
{
  "success": true,
  "message": "推运计算成功",
  "progressed_chart": {
    "birth_data": {
      // 出生数据
    },
    "progression_date": "2024-01-01T00:00:00Z",
    "progression_type": "secondary",
    "planets": [
      {
        "name": "太阳",
        "sign": "双子座",
        "position": 45.2,
        "house": 5,
        "retrograde": false
      }
      // ... 推运后其他行星
    ],
    "houses": [
      {
        "number": 1,
        "sign": "巨蟹座",
        "position": 15.3
      }
      // ... 推运后其他宫位
    ],
    "aspects": [
      {
        "planet1": "太阳",
        "planet2": "月亮",
        "aspect_type": "四分相",
        "orb": 3.2,
        "exact": false,
        "applying": true,
        "separating": false,
        "strength": 0.6,
        "angularity": "角宫相位"
      }
      // ... 推运后其他相位
    ],
    "created_at": "2024-01-01T00:00:00Z"
  },
  "natal_chart": {
    // 本命盘数据
  }
}
```

### 6. 相位格局分析

#### 6.1 分析相位格局

**接口地址**: `POST /api/v1/aspect-patterns`
**接口描述**: 分析星盘中的相位格局

**请求参数**:
```json
{
  "birth_data": {
    // 出生数据
  },
  "house_system": "Placidus"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:8000/api/v1/aspect-patterns" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_data": {
      "year": 1990,
      "month": 5,
      "day": 15,
      "hour": 10,
      "minute": 30,
      "city": "Beijing",
      "nation": "China",
      "timezone": "Asia/Shanghai"
    },
    "house_system": "Placidus"
  }'
```

**响应示例**:
```json
{
  "success": true,
  "message": "相位格局分析成功",
  "patterns": [
    {
      "pattern_type": "t_square",
      "planets": ["太阳", "月亮", "火星"],
      "description": "T三角：太阳、月亮、火星形成压力与挑战格局",
      "strength": 0.75
    },
    {
      "pattern_type": "grand_trine",
      "planets": ["金星", "木星", "土星"],
      "description": "大三角：金星、木星、土星形成和谐与天赋格局",
      "strength": 0.9
    }
    // ... 其他相位格局
  ],
  "chart": {
    // 星盘数据
  }
}
```

### 7. 关系合盘

#### 7.1 关系合盘分析

**接口地址**: `POST /api/v1/synastry`
**接口描述**: 分析两个人的关系合盘

**请求参数**:
```json
{
  "person1_birth_data": {
    // 人物1出生数据
  },
  "person2_birth_data": {
    // 人物2出生数据
  },
  "house_system": "Placidus"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:8000/api/v1/synastry" \
  -H "Content-Type: application/json" \
  -d '{
    "person1_birth_data": {
      "year": 1990,
      "month": 5,
      "day": 15,
      "hour": 10,
      "minute": 30,
      "city": "Beijing",
      "nation": "China",
      "timezone": "Asia/Shanghai"
    },
    "person2_birth_data": {
      "year": 1992,
      "month": 8,
      "day": 20,
      "hour": 14,
      "minute": 45,
      "city": "Shanghai",
      "nation": "China",
      "timezone": "Asia/Shanghai"
    },
    "house_system": "Placidus"
  }'
```

**响应示例**:
```json
{
  "success": true,
  "message": "关系合盘分析成功",
  "synastry_chart": {
    "person1_birth_data": {
      // 人物1出生数据
    },
    "person2_birth_data": {
      // 人物2出生数据
    },
    "synastry_aspects": [
      {
        "person1_planet": "太阳",
        "person2_planet": "月亮",
        "aspect_type": "三分相",
        "orb": 2.5,
        "strength": 0.8,
        "description": "太阳三分月亮：情感和谐，相互理解"
      }
      // ... 其他关系相位
    ],
    "compatibility_score": 0.85,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "person1_chart": {
    // 人物1星盘数据
  },
  "person2_chart": {
    // 人物2星盘数据
  }
}
```

### 8. 太阳返照

#### 8.1 计算太阳返照

**接口地址**: `POST /api/v1/solar-return`
**接口描述**: 计算指定年份的太阳返照盘

**请求参数**:
```json
{
  "birth_data": {
    // 出生数据
  },
  "return_year": 2024,
  "location": "Beijing"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:8000/api/v1/solar-return" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_data": {
      "year": 1990,
      "month": 5,
      "day": 15,
      "hour": 10,
      "minute": 30,
      "city": "Beijing",
      "nation": "China",
      "timezone": "Asia/Shanghai"
    },
    "return_year": 2024,
    "location": "Beijing"
  }'
```

**响应示例**:
```json
{
  "success": true,
  "message": "太阳返照计算成功",
  "solar_return_chart": {
    "birth_data": {
      // 出生数据
    },
    "return_year": 2024,
    "return_date": "2024-05-15T10:30:00Z",
    "location": "Beijing",
    "planets": [
      {
        "name": "太阳",
        "sign": "金牛座",
        "position": 25.0,
        "house": 1,
        "retrograde": false
      }
      // ... 太阳返照盘其他行星
    ],
    "houses": [
      {
        "number": 1,
        "sign": "金牛座",
        "position": 25.0
      }
      // ... 太阳返照盘其他宫位
    ],
    "aspects": [
      {
        "planet1": "太阳",
        "planet2": "月亮",
        "aspect_type": "对分相",
        "orb": 5.0,
        "exact": false,
        "applying": true,
        "separating": false,
        "strength": 0.4,
        "angularity": "角宫相位"
      }
      // ... 太阳返照盘其他相位
    ],
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## 错误处理

### 错误响应格式

```json
{
  "success": false,
  "message": "错误描述",
  "error_code": "ERROR_CODE",
  "details": {
    // 详细错误信息
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 常见错误码

| 错误码 | HTTP状态码 | 描述 |
|--------|------------|------|
| INVALID_INPUT | 400 | 输入参数无效 |
| CALCULATION_ERROR | 500 | 星盘计算错误 |
| VALIDATION_ERROR | 422 | 数据验证失败 |
| INTERNAL_ERROR | 500 | 服务器内部错误 |

### 错误示例

```json
{
  "success": false,
  "message": "输入数据验证失败",
  "error_code": "VALIDATION_ERROR",
  "details": {
    "field": "birth_data.year",
    "issue": "年份必须在1900-2100之间"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Apifox导入配置

您可以复制以下JSON配置直接导入到Apifox：

```json
{
  "info": {
    "name": "AI Core 星盘计算API",
    "description": "专业的星盘计算和占星分析API服务",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:8000",
      "description": "开发服务器"
    }
  ],
  "paths": {
    "/": {
      "get": {
        "summary": "获取API信息",
        "description": "获取API基础信息",
        "responses": {
          "200": {
            "description": "成功",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {"type": "string"},
                    "version": {"type": "string"},
                    "docs": {"type": "string"}
                  }
                }
              }
            }
          }
        }
      },
      "/health": {
        "get": {
          "summary": "健康检查",
          "description": "检查API服务状态",
          "responses": {
            "200": {
              "description": "成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {"type": "string"},
                      "timestamp": {"type": "string"}
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/signs": {
        "get": {
          "summary": "获取星座信息",
          "description": "获取所有星座信息",
          "responses": {
            "200": {
              "description": "成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean"},
                      "message": {"type": "string"},
                      "data": {
                        "type": "object",
                        "properties": {
                          "signs": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/chart": {
        "post": {
          "summary": "创建星盘",
          "description": "根据出生数据计算星盘",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "birth_data": {
                      "type": "object",
                      "properties": {
                        "year": {"type": "integer"},
                        "month": {"type": "integer"},
                        "day": {"type": "integer"},
                        "hour": {"type": "integer"},
                        "minute": {"type": "integer"},
                        "city": {"type": "string"},
                        "nation": {"type": "string"},
                        "timezone": {"type": "string"}
                      }
                    },
                    "house_system": {"type": "string"}
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "成功",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean"},
                      "message": {"type": "string"},
                      "chart": {
                        "type": "object",
                        "properties": {
                          "birth_data": {"type": "object"},
                          "sun_sign": {"type": "string"},
                          "moon_sign": {"type": "string"},
                          "ascendant": {"type": "string"},
                          "planets": {
                            "type": "array",
                            "items": {"type": "object"}
                          },
                          "houses": {
                            "type": "array",
                            "items": {"type": "object"}
                          },
                          "aspects": {
                            "type": "array",
                            "items": {"type": "object"}
                          },
                          "created_at": {"type": "string"}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

---

## 注意事项

1. **时间格式**: 所有日期时间字段使用ISO 8601格式 (YYYY-MM-DDTHH:MM:SSZ)
2. **字符编码**: 统一使用UTF-8编码
3. **错误处理**: 请检查响应中的`success`字段来判断操作是否成功
4. **性能考虑**: 复杂计算（如行运分析）可能需要较长时间，建议设置合理的超时时间
5. **数据验证**: 所有输入数据都会进行验证，请确保参数格式正确

---

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 支持基础星盘计算
- 支持行运分析
- 支持推运计算
- 支持相位格局分析
- 支持关系合盘
- 支持太阳返照

---

*最后更新时间: 2024-01-01*