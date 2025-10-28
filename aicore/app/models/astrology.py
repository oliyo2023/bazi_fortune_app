"""星盘相关数据模型"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class BirthData(BaseModel):
    """出生数据"""
    year: int = Field(..., ge=1900, le=2100, description="出生年份")
    month: int = Field(..., ge=1, le=12, description="出生月份")
    day: int = Field(..., ge=1, le=31, description="出生日期")
    hour: int = Field(..., ge=0, le=23, description="出生小时")
    minute: int = Field(..., ge=0, le=59, description="出生分钟")
    city: str = Field(..., description="出生城市")
    nation: str = Field(default="China", description="国家")
    timezone: Optional[float] = Field(None, description="时区偏移")


class PlanetPosition(BaseModel):
    """行星位置"""
    name: str = Field(..., description="行星名称")
    sign: str = Field(..., description="所在星座")
    position: float = Field(..., description="精确位置（度）")
    house: int = Field(..., description="所在宫位")
    retrograde: bool = Field(default=False, description="是否逆行")


class House(BaseModel):
    """宫位"""
    number: int = Field(..., description="宫位编号")
    sign: str = Field(..., description="宫头星座")
    position: float = Field(..., description="宫头位置（度）")


class Aspect(BaseModel):
    """相位"""
    planet1: str = Field(..., description="行星1")
    planet2: str = Field(..., description="行星2")
    aspect_type: str = Field(..., description="相位类型")
    orb: float = Field(..., description="容许度")
    exact: bool = Field(default=False, description="是否精确相位")


class AstrologyChart(BaseModel):
    """星盘数据"""
    birth_data: BirthData = Field(..., description="出生数据")
    sun_sign: str = Field(..., description="太阳星座")
    moon_sign: str = Field(..., description="月亮星座")
    ascendant: str = Field(..., description="上升星座")
    planets: List[PlanetPosition] = Field(..., description="行星位置")
    houses: List[House] = Field(..., description="宫位信息")
    aspects: List[Aspect] = Field(..., description="相位信息")
    created_at: datetime = Field(default_factory=datetime.now, description="创建时间")


class ChartRequest(BaseModel):
    """星盘计算请求"""
    birth_data: BirthData = Field(..., description="出生数据")
    house_system: str = Field(default="Placidus", description="宫位系统")


class ChartResponse(BaseModel):
    """星盘计算响应"""
    success: bool = Field(..., description="是否成功")
    message: str = Field(..., description="响应消息")
    chart: Optional[AstrologyChart] = Field(None, description="星盘数据")