"""星盘计算服务"""
from typing import List, Optional
from datetime import datetime
from kerykeion import AstrologicalSubject, KerykeionException, ReportGenerator

from app.models.astrology import (
    BirthData, 
    AstrologyChart, 
    PlanetPosition, 
    House, 
    Aspect
)


class AstrologyService:
    """星盘计算服务类"""
    
    # 星座映射
    SIGN_MAP = {
        "Ari": "白羊座", "Tau": "金牛座", "Gem": "双子座", "Can": "巨蟹座",
        "Leo": "狮子座", "Vir": "处女座", "Lib": "天秤座", "Sco": "天蝎座",
        "Sag": "射手座", "Cap": "摩羯座", "Aqu": "水瓶座", "Pis": "双鱼座"
    }
    
    # 行星中文名映射
    PLANET_MAP = {
        "Sun": "太阳", "Moon": "月亮", "Mercury": "水星", "Venus": "金星",
        "Mars": "火星", "Jupiter": "木星", "Saturn": "土星", "Uranus": "天王星",
        "Neptune": "海王星", "Pluto": "冥王星", "Chiron": "凯龙星",
        "North Node": "北交点", "South Node": "南交点"
    }
    
    # 相位类型映射
    ASPECT_MAP = {
        "conjunction": "合相", "opposition": "对分相", "trine": "三分相",
        "square": "四分相", "sextile": "六分相", "quincunx": "补十二分相",
        "sesquisquare": "补八分相", "semisextile": "十二分相", "semisquare": "八分相"
    }
    
    @staticmethod
    def create_chart(birth_data: BirthData, house_system: str = "Placidus") -> AstrologyChart:
        """
        创建星盘
        
        Args:
            birth_data: 出生数据
            house_system: 宫位系统
            
        Returns:
            AstrologyChart: 星盘数据
        """
        try:
            # 创建Kerykeion星盘对象
            subject = AstrologicalSubject(
                year=birth_data.year,
                month=birth_data.month,
                day=birth_data.day,
                hour=birth_data.hour,
                minute=birth_data.minute,
                city=birth_data.city,
                nation=birth_data.nation,
                tz_offset=birth_data.timezone,
                house_system=house_system
            )
            
            # 获取行星位置
            planets = AstrologyService._get_planets(subject)
            
            # 获取宫位信息
            houses = AstrologyService._get_houses(subject)
            
            # 获取相位信息
            aspects = AstrologyService._get_aspects(subject)
            
            # 创建星盘对象
            chart = AstrologyChart(
                birth_data=birth_data,
                sun_sign=AstrologyService._translate_sign(subject.sun.sign),
                moon_sign=AstrologyService._translate_sign(subject.moon.sign),
                ascendant=AstrologyService._translate_sign(subject.ascendant.sign),
                planets=planets,
                houses=houses,
                aspects=aspects,
                created_at=datetime.now()
            )
            
            return chart
            
        except KerykeionException as e:
            raise ValueError(f"星盘计算错误: {str(e)}")
        except Exception as e:
            raise ValueError(f"未知错误: {str(e)}")
    
    @staticmethod
    def _get_planets(subject: AstrologicalSubject) -> List[PlanetPosition]:
        """获取行星位置"""
        planets = []
        
        # 主要行星
        planet_list = [
            ("Sun", subject.sun),
            ("Moon", subject.moon),
            ("Mercury", subject.mercury),
            ("Venus", subject.venus),
            ("Mars", subject.mars),
            ("Jupiter", subject.jupiter),
            ("Saturn", subject.saturn),
            ("Uranus", subject.uranus),
            ("Neptune", subject.neptune),
            ("Pluto", subject.pluto)
        ]
        
        for name, planet in planet_list:
            planets.append(PlanetPosition(
                name=AstrologyService.PLANET_MAP.get(name, name),
                sign=AstrologyService._translate_sign(planet.sign),
                position=planet.position,
                house=planet.house,
                retrograde=planet.retrograde
            ))
        
        return planets
    
    @staticmethod
    def _get_houses(subject: AstrologicalSubject) -> List[House]:
        """获取宫位信息"""
        houses = []
        for i, house in enumerate(subject.houses, 1):
            houses.append(House(
                number=i,
                sign=AstrologyService._translate_sign(house.sign),
                position=house.position
            ))
        return houses
    
    @staticmethod
    def _get_aspects(subject: AstrologicalSubject) -> List[Aspect]:
        """获取相位信息"""
        aspects = []
        
        # 获取所有相位
        for aspect in subject.get_aspects():
            aspects.append(Aspect(
                planet1=AstrologyService.PLANET_MAP.get(aspect.p1_name, aspect.p1_name),
                planet2=AstrologyService.PLANET_MAP.get(aspect.p2_name, aspect.p2_name),
                aspect_type=AstrologyService.ASPECT_MAP.get(aspect.aspect_name, aspect.aspect_name),
                orb=aspect.orb,
                exact=aspect.exact
            ))
        
        return aspects
    
    @staticmethod
    def _translate_sign(sign_abbrev: str) -> str:
        """翻译星座缩写为中文名"""
        return AstrologyService.SIGN_MAP.get(sign_abbrev, sign_abbrev)
    
    @staticmethod
    def generate_report(chart: AstrologyChart) -> str:
        """生成星盘解读报告"""
        try:
            # 重新创建Kerykeion对象用于生成报告
            subject = AstrologicalSubject(
                year=chart.birth_data.year,
                month=chart.birth_data.month,
                day=chart.birth_data.day,
                hour=chart.birth_data.hour,
                minute=chart.birth_data.minute,
                city=chart.birth_data.city,
                nation=chart.birth_data.nation,
                tz_offset=chart.birth_data.timezone
            )
            
            # 生成报告
            report_generator = ReportGenerator(subject)
            return report_generator.get_report()
            
        except Exception as e:
            return f"生成报告时出错: {str(e)}"