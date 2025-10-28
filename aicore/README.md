# AI Core 星盘计算API

基于FastAPI和Kerykeion库的专业星盘计算服务。

## 功能特性

- 星盘计算
- 行星位置分析
- 宫位计算
- 相位分析
- 星盘图表生成

## 安装

使用uv安装依赖：

```bash
uv venv
source .venv/bin/activate  # Linux/Mac
# 或 .venv\Scripts\activate  # Windows
uv pip install -e .
```

## 运行

```bash
uvicorn app.main:app --reload
```

## API文档

启动服务后访问 http://localhost:8000/docs 查看API文档。