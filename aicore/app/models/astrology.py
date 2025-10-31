"""星盘相关数据模型"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class AspectType(str, Enum):
    """相位类型枚举"""
    CONJUNCTION = "conjunction"  # 合相
    OPPOSITION = "opposition"  # 对分相
    TRINE = "trine"  # 三分相
    SQUARE = "square"  # 四分相
    SEXTILE = "sextile"  # 六分相
    SEMISEXTILE = "semisextile"  # 十二分相
    SEMISQUARE = "semisquare"  # 八分相
    SESQUISQUARE = "sesquisquare"  # 补八分相
    QUINTILE = "quintile"  # 五分相
    BIQUINTILE = "biquintile"  # 十分相
    QUINCUNX = "quincunx"  # 补十二分相


class AspectPattern(str, Enum):
    """相位格局类型"""
    T_SQUARE = "t_square"  # T三角
    GRAND_TRINE = "grand_trine"  # 大三角
    GRAND_CROSS = "grand_cross"  # 大十字
    YOD = "yod"  # 手指
    KITE = "kite"  # 风筝
    MYSTIC_RECTANGLE = "mystic_rectangle"  # 神秘矩形
    STELLIUM = "stellium"  # 星群


class ProgressionType(str, Enum):
    """推运类型"""
    SECONDARY = "secondary"  # 次级推运
    SOLAR_ARC = "solar_arc"  # 太阳弧
    TERTIARY = "tertiary"  # 三级推运
    MINOR = "minor"  # 小推运


class TransitType(str, Enum):
    """行运类型"""
    NATAL = "natal"  # 本命盘行运
    PROGRESSED = "progressed"  # 推运盘行运
    SOLAR_RETURN = "solar_return"  # 太阳返照
    LUNAR_RETURN = "lunar_return"  # 月亮返照


class BirthData(BaseModel):
    """出生数据"""
    year: int = Field(..., ge=1900, le=2100, description="出生年份")
    month: int = Field(..., ge=1, le=12, description="出生月份")
    day: int = Field(..., ge=1, le=31, description="出生日期")
    hour: int = Field(..., ge=0, le=23, description="出生小时")
    minute: int = Field(..., ge=0, le=59, description="出生分钟")
    city: str = Field(..., description="出生城市")
    nation: str = Field(default="China", description="国家")
    timezone: Optional[str] = Field(None, description="时区字符串（如 Asia/Shanghai）")


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
    applying: bool = Field(default=False, description="是否正在形成")
    separating: bool = Field(default=False, description="是否正在分离")
    strength: float = Field(default=0.0, description="相位强度")
    angularity: str = Field(default="", description="角度性质")


class AspectPatternInfo(BaseModel):
    """相位格局信息"""
    pattern_type: AspectPattern = Field(..., description="格局类型")
    planets: List[str] = Field(..., description="涉及的行星")
    description: str = Field(..., description="格局描述")
    strength: float = Field(default=0.0, description="格局强度")


class Transit(BaseModel):
    """行运信息"""
    transiting_planet: str = Field(..., description="行运行星")
    natal_planet: str = Field(..., description="本命行星")
    aspect_type: AspectType = Field(..., description="相位类型")
    orb: float = Field(..., description="容许度")
    exact_date: datetime = Field(..., description="精确日期")
    applying: bool = Field(default=True, description="是否正在接近")
    separating: bool = Field(default=False, description="是否正在分离")
    intensity: float = Field(default=0.0, description="行运强度")
    duration_days: int = Field(default=0, description="影响持续天数")


class TransitPeriod(BaseModel):
    """行运周期"""
    transiting_planet: str = Field(..., description="行运行星")
    start_date: datetime = Field(..., description="开始日期")
    end_date: datetime = Field(..., description="结束日期")
    peak_date: datetime = Field(..., description="高峰日期")
    transits: List[Transit] = Field(..., description="包含的行运")
    overall_intensity: float = Field(default=0.0, description="整体强度")
    description: str = Field(default="", description="周期描述")


class ProgressedChart(BaseModel):
    """推运星盘"""
    birth_data: BirthData = Field(..., description="出生数据")
    progression_date: datetime = Field(..., description="推运日期")
    progression_type: ProgressionType = Field(..., description="推运类型")
    planets: List[PlanetPosition] = Field(..., description="推运后行星位置")
    houses: List[House] = Field(..., description="推运后宫位信息")
    aspects: List[Aspect] = Field(..., description="推运后相位信息")
    created_at: datetime = Field(default_factory=datetime.now, description="创建时间")


class SolarReturn(BaseModel):
    """太阳返照盘"""
    birth_data: BirthData = Field(..., description="出生数据")
    return_year: int = Field(..., description="返照年份")
    return_date: datetime = Field(..., description="返照时间")
    location: str = Field(..., description="返照地点")
    planets: List[PlanetPosition] = Field(..., description="返照盘行星位置")
    houses: List[House] = Field(..., description="返照盘宫位信息")
    aspects: List[Aspect] = Field(..., description="返照盘相位信息")
    created_at: datetime = Field(default_factory=datetime.now, description="创建时间")


class SynastryAspect(BaseModel):
    """关系相位"""
    person1_planet: str = Field(..., description="人物1行星")
    person2_planet: str = Field(..., description="人物2行星")
    aspect_type: AspectType = Field(..., description="相位类型")
    orb: float = Field(..., description="容许度")
    strength: float = Field(default=0.0, description="相位强度")
    description: str = Field(default="", description="相位描述")


class SynastryChart(BaseModel):
    """关系合盘"""
    person1_birth_data: BirthData = Field(..., description="人物1出生数据")
    person2_birth_data: BirthData = Field(..., description="人物2出生数据")
    synastry_aspects: List[SynastryAspect] = Field(..., description="关系相位")
    compatibility_score: float = Field(default=0.0, description="合盘分数")
    created_at: datetime = Field(default_factory=datetime.now, description="创建时间")


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


class TransitRequest(BaseModel):
    """行运分析请求"""
    birth_data: BirthData = Field(..., description="出生数据")
    start_date: datetime = Field(..., description="开始日期")
    end_date: datetime = Field(..., description="结束日期")
    transit_type: TransitType = Field(default=TransitType.NATAL, description="行运类型")
    location: Optional[str] = Field(None, description="行运地点")


class TransitResponse(BaseModel):
    """行运分析响应"""
    success: bool = Field(..., description="是否成功")
    message: str = Field(..., description="响应消息")
    transit_periods: List[TransitPeriod] = Field(default=[], description="行运周期")
    natal_chart: Optional[AstrologyChart] = Field(None, description="本命盘")


class ProgressionRequest(BaseModel):
    """推运计算请求"""
    birth_data: BirthData = Field(..., description="出生数据")
    progression_date: datetime = Field(..., description="推运日期")
    progression_type: ProgressionType = Field(default=ProgressionType.SECONDARY, description="推运类型")
    house_system: str = Field(default="Placidus", description="宫位系统")


class ProgressionResponse(BaseModel):
    """推运计算响应"""
    success: bool = Field(..., description="是否成功")
    message: str = Field(..., description="响应消息")
    progressed_chart: Optional[ProgressedChart] = Field(None, description="推运星盘")
    natal_chart: Optional[AstrologyChart] = Field(None, description="本命盘")


class SolarReturnRequest(BaseModel):
    """太阳返照请求"""
    birth_data: BirthData = Field(..., description="出生数据")
    return_year: int = Field(..., description="返照年份")
    location: Optional[str] = Field(None, description="返照地点")


class SolarReturnResponse(BaseModel):
    """太阳返照响应"""
    success: bool = Field(..., description="是否成功")
    message: str = Field(..., description="响应消息")
    solar_return_chart: Optional[SolarReturn] = Field(None, description="太阳返照盘")


class SynastryRequest(BaseModel):
    """关系合盘请求"""
    person1_birth_data: BirthData = Field(..., description="人物1出生数据")
    person2_birth_data: BirthData = Field(..., description="人物2出生数据")
    house_system: str = Field(default="Placidus", description="宫位系统")


class SynastryResponse(BaseModel):
    """关系合盘响应"""
    success: bool = Field(..., description="是否成功")
    message: str = Field(..., description="响应消息")
    synastry_chart: Optional[SynastryChart] = Field(None, description="关系合盘")


class AspectPatternRequest(BaseModel):
    """相位格局分析请求"""
    birth_data: BirthData = Field(..., description="出生数据")
    house_system: str = Field(default="Placidus", description="宫位系统")


class AspectPatternResponse(BaseModel):
    """相位格局分析响应"""
    success: bool = Field(..., description="是否成功")
    message: str = Field(..., description="响应消息")
    patterns: List[AspectPatternInfo] = Field(default=[], description="相位格局")
    chart: Optional[AstrologyChart] = Field(None, description="星盘数据")