"""应用配置"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """应用设置"""
    
    # 应用基础配置
    APP_NAME: str = "AI Core 星盘计算API"
    VERSION: str = "0.1.0"
    DEBUG: bool = False
    
    # CORS配置
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # 数据库配置（如果需要）
    DATABASE_URL: str = ""
    
    # 其他配置
    SECRET_KEY: str = "your-secret-key-here"
    
    class Config:
        env_file = ".env"


# 创建全局设置实例
settings = Settings()