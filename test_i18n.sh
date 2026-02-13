#!/bin/bash

echo "========================================="
echo "多语言支持测试脚本"
echo "========================================="
echo ""

BASE_URL="http://localhost:8080"

echo "【测试1】后端 API - 中文请求 (Accept-Language: zh-CN)"
echo "-------------------------------------------------------"
RESULT=$(curl -s -H "Accept-Language: zh-CN" \
  -H "Content-Type: application/json" \
  -X POST "$BASE_URL/api/v1/auth/login" \
  -d '{"email":"test@example.com","password":"wrong"}')

echo "响应: $RESULT"
echo ""

echo "【测试2】后端 API - 英文请求 (Accept-Language: en-US)"
echo "-------------------------------------------------------"
RESULT=$(curl -s -H "Accept-Language: en-US" \
  -H "Content-Type: application/json" \
  -X POST "$BASE_URL/api/v1/auth/login" \
  -d '{"email":"test@example.com","password":"wrong"}')

echo "响应: $RESULT"
echo ""

echo "【测试3】后端 API - 查询参数语言 (?lang=zh)"
echo "-------------------------------------------------------"
RESULT=$(curl -s \
  -H "Content-Type: application/json" \
  -X POST "$BASE_URL/api/v1/auth/login?lang=zh" \
  -d '{"email":"test@example.com","password":"wrong"}')

echo "响应: $RESULT"
echo ""

echo "【测试4】后端 API - 查询参数语言 (?lang=en)"
echo "-------------------------------------------------------"
RESULT=$(curl -s \
  -H "Content-Type: application/json" \
  -X POST "$BASE_URL/api/v1/auth/login?lang=en" \
  -d '{"email":"test@example.com","password":"wrong"}')

echo "响应: $RESULT"
echo ""

echo "【测试5】后端健康检查"
echo "-------------------------------------------------------"
curl -s "$BASE_URL/health"
echo ""
echo ""

echo "【测试6】API 文档"
echo "-------------------------------------------------------"
curl -s "$BASE_URL/api/docs" | head -20
echo ""

echo "========================================="
echo "测试完成"
echo "========================================="
echo ""
echo "说明："
echo "1. 测试1-4验证后端API是否根据Accept-Language头部或查询参数返回对应语言的错误消息"
echo "2. 中文请求应该返回中文错误消息（如：'无效的凭据'）"
echo "3. 英文请求应该返回英文错误消息（如：'Invalid credentials'）"
echo "4. 如果后端未启动，请先运行后端服务：cd backend && go run main.go"
echo ""
