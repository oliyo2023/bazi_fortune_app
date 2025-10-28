"""FastAPI主应用"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import astrology
from app.core.config import settings

# 创建FastAPI应用实例
app = FastAPI(
    title="AI Core 星盘计算API",
    description="基于Kerykeion库的专业星盘计算服务",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 包含路由
app.include_router(astrology.router, prefix="/api/v1", tags=["星盘计算"])


@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "AI Core 星盘计算API",
        "version": "0.1.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy"}