"""星盘计算服务"""
from typing import List, Optional, Tuple, Dict, Any
from datetime import datetime, timedelta
from kerykeion import AstrologicalSubject, KerykeionException, ReportGenerator
import math

from app.models.astrology import (
    BirthData,
    AstrologyChart,
    PlanetPosition,
    House,
    Aspect,
    Transit,
    TransitPeriod,
    TransitType,
    AspectType,
    ProgressionType,
    ProgressedChart,
    AspectPatternInfo,
    AspectPattern,
    SynastryAspect,
    SynastryChart,
    SolarReturn
)


class AstrologyService:
    """星盘计算服务类"""
    
    # 宫位系统映射 - 清理重复项，支持更多宫位制
    HOUSE_SYSTEM_MAP = {
        # 常用宫位制
        "Placidus": "P",
        "Koch": "K",
        "Equal": "A",
        "Whole Sign": "W",
        "Regiomontanus": "R",
        "Campanus": "C",

        # 专业宫位制
        "Porphyry": "O",
        "Morinus": "M",
        "Alcabitius": "B",
        "Topocentric": "T",
        "Krusinski-Pisa-Goichr": "F",
        "Meridian": "A",  # 与Equal系统相同
        "Sripati": "S",
        "Carter": "D",
        "Sunshine": "N",
        "Equal (MC)": "I",
        "Vehlow": "V",
        "Axial Rotation": "X",
        "Azimuthal": "Y",
        "Apollonius": "Q",
        "Polich-Page": "H",
        "Placidus (Mc)": "i",

        # 简化名称映射
        "Placidus": "P",
        "Koch": "K",
        "Equal": "A",
        "Whole": "W",
        "Regio": "R",
        "Cam": "C"
    }

    # 宫位系统详细信息
    HOUSE_SYSTEM_INFO = {
        "Placidus": {
            "name": "普拉西德宫位制",
            "description": "最常用的宫位系统，基于时间和地理纬度计算",
            "features": ["精确度高", "适合中高纬度", "考虑地球曲率"]
        },
        "Koch": {
            "name": "科赫宫位制",
            "description": "基于空间分割的宫位系统，强调上升点的重要性",
            "features": ["时间敏感", "适合预测", "强调个人发展"]
        },
        "Equal": {
            "name": "等宫制",
            "description": "每个宫位30度，从上升点开始计算",
            "features": ["简单均匀", "适合初学者", "计算快速"]
        },
        "Whole Sign": {
            "name": "全宫制",
            "description": "整个星座作为一个宫位，古希臘占星常用",
            "features": ["古老传统", "简化解读", "适合古典占星"]
        },
        "Campanus": {
            "name": "坎帕纳斯宫位制",
            "description": "基于空间投影的宫位系统",
            "features": ["空间导向", "几何精确", "适合定位分析"]
        },
        "Regiomontanus": {
            "name": "雷乔蒙塔努斯宫位制",
            "description": "基于天球赤道投影的宫位系统",
            "features": ["历史悠长", "天文精确", "适合事件预测"]
        },
        "Topocentric": {
            "name": "地形宫位制",
            "description": "考虑观测者位置的宫位系统",
            "features": ["地理位置敏感", "现代计算", "精确度高"]
        },
        "Porphyry": {
            "name": "波菲利宫位制",
            "description": "将四分点等分的古老宫位制",
            "features": ["几何简单", "历史悠久", "适合基础分析"]
        }
    }
    
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
        "sesquisquare": "补八分相", "semisextile": "十二分相", "semisquare": "八分相",
        "quintile": "五分相", "biquintile": "十分相"
    }

    # 相度角度和容许度
    ASPECT_ANGLES = {
        "conjunction": 0,
        "semisextile": 30,
        "semisquare": 45,
        "sextile": 60,
        "quintile": 72,
        "square": 90,
        "trine": 120,
        "sesquisquare": 135,
        "quincunx": 150,
        "opposition": 180,
        "biquintile": 144
    }

    # 相位容许度
    ASPECT_ORBS = {
        "conjunction": 8,
        "opposition": 8,
        "trine": 8,
        "square": 8,
        "sextile": 6,
        "quincunx": 3,
        "sesquisquare": 2,
        "semisextile": 2,
        "semisquare": 2,
        "quintile": 2,
        "biquintile": 2
    }
    
    @staticmethod
    def create_chart(birth_data: BirthData, house_system: str = "P") -> AstrologyChart:
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
            # 转换宫位系统名称
            house_system_id = AstrologyService.HOUSE_SYSTEM_MAP.get(house_system, house_system)
            
            # 使用离线模式，提供北京坐标
            subject = AstrologicalSubject(
                year=birth_data.year,
                month=birth_data.month,
                day=birth_data.day,
                hour=birth_data.hour,
                minute=birth_data.minute,
                city=birth_data.city,
                nation=birth_data.nation,
                tz_str=birth_data.timezone,
                houses_system_identifier=house_system_id,
                online=False,
                lng=116.4074,  # 北京经度
                lat=39.9042    # 北京纬度
            )
            
            # 获取 kerykeion 模型对象
            kerykeion_obj = subject.model()
            
            # 获取行星位置
            planets = AstrologyService._get_planets(subject)
            
            # 获取宫位信息
            houses = AstrologyService._get_houses(subject)
            
            # 获取相位信息
            aspects = AstrologyService._get_aspects(subject)
            
            # 创建星盘对象
            chart = AstrologyChart(
                birth_data=birth_data,
                sun_sign=AstrologyService._translate_sign(kerykeion_obj.sun.sign),
                moon_sign=AstrologyService._translate_sign(kerykeion_obj.moon.sign),
                ascendant=AstrologyService._translate_sign(kerykeion_obj.ascendant.sign),
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
        
        # 获取 kerykeion 模型对象
        kerykeion_obj = subject.model()
        
        # 主要行星
        planet_list = [
            ("Sun", kerykeion_obj.sun),
            ("Moon", kerykeion_obj.moon),
            ("Mercury", kerykeion_obj.mercury),
            ("Venus", kerykeion_obj.venus),
            ("Mars", kerykeion_obj.mars),
            ("Jupiter", kerykeion_obj.jupiter),
            ("Saturn", kerykeion_obj.saturn),
            ("Uranus", kerykeion_obj.uranus),
            ("Neptune", kerykeion_obj.neptune),
            ("Pluto", kerykeion_obj.pluto)
        ]
        
        for name, planet in planet_list:
            # 处理宫位信息，如果是字符串则提取数字
            house_value = planet.house
            if isinstance(house_value, str):
                # 从字符串中提取数字，如 "Eleventh_House" -> 11
                import re
                match = re.search(r'\d+', house_value)
                if match:
                    house_value = int(match.group())
                else:
                    # 如果没有数字，尝试映射
                    house_map = {
                        "First_House": 1, "Second_House": 2, "Third_House": 3,
                        "Fourth_House": 4, "Fifth_House": 5, "Sixth_House": 6,
                        "Seventh_House": 7, "Eighth_House": 8, "Ninth_House": 9,
                        "Tenth_House": 10, "Eleventh_House": 11, "Twelfth_House": 12
                    }
                    house_value = house_map.get(house_value, 1)
            
            planets.append(PlanetPosition(
                name=AstrologyService.PLANET_MAP.get(name, name),
                sign=AstrologyService._translate_sign(planet.sign),
                position=planet.position,
                house=house_value,
                retrograde=planet.retrograde
            ))
        
        return planets
    
    @staticmethod
    def _get_houses(subject: AstrologicalSubject) -> List[House]:
        """获取宫位信息"""
        houses = []
        
        # 获取 kerykeion 模型对象
        kerykeion_obj = subject.model()
        
        # 宫位信息直接作为属性存在
        house_attributes = [
            "first_house", "second_house", "third_house", "fourth_house",
            "fifth_house", "sixth_house", "seventh_house", "eighth_house",
            "ninth_house", "tenth_house", "eleventh_house", "twelfth_house"
        ]
        
        for i, house_attr in enumerate(house_attributes, 1):
            if hasattr(kerykeion_obj, house_attr):
                house = getattr(kerykeion_obj, house_attr)
                if house is not None:
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
        
        # 获取 kerykeion 模型对象
        kerykeion_obj = subject.model()
        
        # 检查是否有 get_aspects 方法
        if hasattr(subject, 'get_aspects'):
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
                tz_str=chart.birth_data.timezone,
                online=False,
                lng=116.4074,  # 北京经度
                lat=39.9042    # 北京纬度
            )

            # 生成报告
            kerykeion_obj = subject.model()
            report_generator = ReportGenerator(kerykeion_obj)
            return report_generator.generate_report()

        except Exception as e:
            return f"生成报告时出错: {str(e)}"

    @staticmethod
    def calculate_transits(birth_data: BirthData, start_date: datetime, end_date: datetime,
                          location: str = None) -> List[TransitPeriod]:
        """
        计算行运分析

        Args:
            birth_data: 出生数据
            start_date: 开始日期
            end_date: 结束日期
            location: 行运地点

        Returns:
            List[TransitPeriod]: 行运周期列表
        """
        try:
            # 创建本命盘
            natal_chart = AstrologyService.create_chart(birth_data)

            # 行运周期列表
            transit_periods = []

            # 要跟踪的主要行星
            transiting_planets = ["Sun", "Moon", "Mercury", "Venus", "Mars",
                                "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"]

            # 逐日计算行运
            current_date = start_date
            while current_date <= end_date:
                # 创建行运星盘
                transiting_subject = AstrologicalSubject(
                    year=current_date.year,
                    month=current_date.month,
                    day=current_date.day,
                    hour=12,  # 使用中午时间
                    minute=0,
                    city=location or birth_data.city,
                    nation=birth_data.nation,
                    tz_str=birth_data.timezone,
                    online=False,
                    lng=116.4074,
                    lat=39.9042
                )

                # 计算当日行运
                daily_transits = AstrologyService._calculate_daily_transits(
                    transiting_subject, natal_chart, current_date
                )

                # 将行运添加到周期中
                for transit in daily_transits:
                    transit_periods.append(TransitPeriod(
                        transiting_planet=transit.transiting_planet,
                        start_date=current_date - timedelta(days=transit.duration_days // 2),
                        end_date=current_date + timedelta(days=transit.duration_days // 2),
                        peak_date=current_date,
                        transits=[transit],
                        overall_intensity=transit.intensity,
                        description=f"{transit.transiting_planet} {transit.aspect_type.value} {transit.natal_planet}"
                    ))

                current_date += timedelta(days=1)

            # 合并相近的行运周期
            return AstrologyService._merge_transit_periods(transit_periods)

        except Exception as e:
            raise ValueError(f"行运计算错误: {str(e)}")

    @staticmethod
    def _calculate_daily_transits(transiting_subject: AstrologicalSubject,
                                natal_chart: AstrologyChart,
                                date: datetime) -> List[Transit]:
        """计算单日行运"""
        transits = []

        # 获取行运行星位置
        transiting_positions = AstrologyService._get_planet_positions(transiting_subject)

        # 遍历所有行运行星和本命行星的组合
        for transiting_planet, transiting_pos in transiting_positions.items():
            for natal_planet in natal_chart.planets:
                # 计算相位
                aspect_type, orb, exact = AstrologyService._calculate_aspect(
                    transiting_pos['position'],
                    AstrologyService._get_planet_position(natal_chart, natal_planet.name)
                )

                if aspect_type:
                    # 计算行运强度
                    intensity = AstrologyService._calculate_transit_intensity(
                        aspect_type, orb, transiting_planet, natal_planet.name
                    )

                    # 计算影响持续时间
                    duration = AstrologyService._calculate_transit_duration(
                        aspect_type, transiting_planet
                    )

                    transits.append(Transit(
                        transiting_planet=AstrologyService.PLANET_MAP.get(transiting_planet, transiting_planet),
                        natal_planet=natal_planet.name,
                        aspect_type=AspectType(aspect_type),
                        orb=orb,
                        exact_date=date,
                        applying=orb > 0,
                        separating=orb <= 0,
                        intensity=intensity,
                        duration_days=duration
                    ))

        return transits

    @staticmethod
    def _get_planet_positions(subject: AstrologicalSubject) -> dict:
        """获取行星位置字典"""
        kerykeion_obj = subject.model()
        positions = {}

        planet_map = {
            'Sun': kerykeion_obj.sun,
            'Moon': kerykeion_obj.moon,
            'Mercury': kerykeion_obj.mercury,
            'Venus': kerykeion_obj.venus,
            'Mars': kerykeion_obj.mars,
            'Jupiter': kerykeion_obj.jupiter,
            'Saturn': kerykeion_obj.saturn,
            'Uranus': kerykeion_obj.uranus,
            'Neptune': kerykeion_obj.neptune,
            'Pluto': kerykeion_obj.pluto
        }

        for name, planet in planet_map.items():
            positions[name] = {
                'position': planet.position,
                'sign': planet.sign,
                'retrograde': planet.retrograde
            }

        return positions

    @staticmethod
    def _get_planet_position(chart: AstrologyChart, planet_name: str) -> float:
        """从星盘获取行星位置"""
        for planet in chart.planets:
            if planet.name == planet_name:
                return planet.position
        return 0.0

    @staticmethod
    def _calculate_aspect(pos1: float, pos2: float) -> Tuple[Optional[str], float, bool]:
        """计算两个位置之间的相位"""
        diff = abs(pos1 - pos2)

        # 处理圆周角度
        if diff > 180:
            diff = 360 - diff

        # 检查所有相位
        for aspect_type, angle in AstrologyService.ASPECT_ANGLES.items():
            orb = AstrologyService.ASPECT_ORBS[aspect_type]
            if abs(diff - angle) <= orb:
                return aspect_type, abs(diff - angle), abs(diff - angle) == 0

        return None, 0.0, False

    @staticmethod
    def _calculate_transit_intensity(aspect_type: str, orb: float,
                                   transiting_planet: str, natal_planet: str) -> float:
        """计算行运强度"""
        # 基础强度
        base_intensity = {
            "conjunction": 1.0,
            "opposition": 0.9,
            "trine": 0.8,
            "square": 0.85,
            "sextile": 0.6,
            "quincunx": 0.5,
            "semisextile": 0.3,
            "semisquare": 0.4,
            "sesquisquare": 0.45,
            "quintile": 0.5,
            "biquintile": 0.55
        }.get(aspect_type, 0.5)

        # 根据容许度调整强度
        orb_factor = 1.0 - (orb / AstrologyService.ASPECT_ORBS[aspect_type])

        # 行星权重
        planet_weights = {
            "Sun": 1.0, "Moon": 0.9, "Mercury": 0.7, "Venus": 0.8,
            "Mars": 0.85, "Jupiter": 0.9, "Saturn": 0.95,
            "Uranus": 0.8, "Neptune": 0.75, "Pluto": 0.85
        }

        transiting_weight = planet_weights.get(transiting_planet, 0.5)
        natal_weight = planet_weights.get(natal_planet, 0.5)

        return base_intensity * orb_factor * (transiting_weight + natal_weight) / 2

    @staticmethod
    def _calculate_transit_duration(aspect_type: str, planet: str) -> int:
        """计算行运影响持续时间（天）"""
        base_duration = {
            "Sun": 3, "Moon": 1, "Mercury": 2, "Venus": 2,
            "Mars": 5, "Jupiter": 15, "Saturn": 30,
            "Uranus": 60, "Neptune": 90, "Pluto": 120
        }.get(planet, 5)

        # 根据相位类型调整
        aspect_multiplier = {
            "conjunction": 1.2,
            "opposition": 1.1,
            "trine": 1.0,
            "square": 1.1,
            "sextile": 0.8,
            "quincunx": 0.7,
            "semisextile": 0.5,
            "semisquare": 0.6,
            "sesquisquare": 0.7,
            "quintile": 0.7,
            "biquintile": 0.7
        }.get(aspect_type, 1.0)

        return int(base_duration * aspect_multiplier)

    @staticmethod
    def _merge_transit_periods(transit_periods: List[TransitPeriod]) -> List[TransitPeriod]:
        """合并相近的行运周期"""
        if not transit_periods:
            return []

        # 按行星和开始日期排序
        transit_periods.sort(key=lambda x: (x.transiting_planet, x.start_date))

        merged = []
        current = transit_periods[0]

        for next_period in transit_periods[1:]:
            # 如果是同一行星且时间相近，则合并
            if (current.transiting_planet == next_period.transiting_planet and
                abs((next_period.start_date - current.end_date).days) <= 3):

                # 合并周期
                current.transits.extend(next_period.transits)
                current.end_date = max(current.end_date, next_period.end_date)
                current.peak_date = next_period.peak_date
                current.overall_intensity = max(current.overall_intensity, next_period.overall_intensity)
                current.description += f"; {next_period.description}"
            else:
                merged.append(current)
                current = next_period

        merged.append(current)
        return merged

    @staticmethod
    def analyze_aspect_patterns(chart: AstrologyChart) -> List[AspectPatternInfo]:
        """
        分析相位格局

        Args:
            chart: 星盘数据

        Returns:
            List[AspectPatternInfo]: 相位格局列表
        """
        patterns = []

        # 检查T三角
        t_square_patterns = AstrologyService._find_t_squares(chart)
        patterns.extend(t_square_patterns)

        # 检查大三角
        grand_trine_patterns = AstrologyService._find_grand_trines(chart)
        patterns.extend(grand_trine_patterns)

        # 检查大十字
        grand_cross_patterns = AstrologyService._find_grand_crosses(chart)
        patterns.extend(grand_cross_patterns)

        # 检查手指
        yod_patterns = AstrologyService._find_yods(chart)
        patterns.extend(yod_patterns)

        # 检查风筝
        kite_patterns = AstrologyService._find_kites(chart)
        patterns.extend(kite_patterns)

        # 检查神秘矩形
        mystic_rectangle_patterns = AstrologyService._find_mystic_rectangles(chart)
        patterns.extend(mystic_rectangle_patterns)

        # 检查星群
        stellium_patterns = AstrologyService._find_stelliums(chart)
        patterns.extend(stellium_patterns)

        return patterns

    @staticmethod
    def _find_t_squares(chart: AstrologyChart) -> List[AspectPatternInfo]:
        """查找T三角格局"""
        patterns = []

        # T三角由两个对分相和两个四分相组成
        for planet1 in chart.planets:
            for planet2 in chart.planets:
                for planet3 in chart.planets:
                    if len({planet1.name, planet2.name, planet3.name}) < 3:
                        continue

                    # 检查是否形成T三角
                    if AstrologyService._is_t_square(chart, planet1, planet2, planet3):
                        pattern = AspectPatternInfo(
                            pattern_type=AspectPattern.T_SQUARE,
                            planets=[planet1.name, planet2.name, planet3.name],
                            description=f"T三角：{planet1.name}、{planet2.name}、{planet3.name}形成压力与挑战格局",
                            strength=AstrologyService._calculate_pattern_strength(
                                [planet1, planet2, planet3], chart
                            )
                        )
                        patterns.append(pattern)

        return patterns

    @staticmethod
    def _find_grand_trines(chart: AstrologyChart) -> List[AspectPatternInfo]:
        """查找大三角格局"""
        patterns = []

        # 大三角由三个三分相组成
        for planet1 in chart.planets:
            for planet2 in chart.planets:
                for planet3 in chart.planets:
                    if len({planet1.name, planet2.name, planet3.name}) < 3:
                        continue

                    if AstrologyService._is_grand_trine(chart, planet1, planet2, planet3):
                        pattern = AspectPatternInfo(
                            pattern_type=AspectPattern.GRAND_TRINE,
                            planets=[planet1.name, planet2.name, planet3.name],
                            description=f"大三角：{planet1.name}、{planet2.name}、{planet3.name}形成和谐与天赋格局",
                            strength=AstrologyService._calculate_pattern_strength(
                                [planet1, planet2, planet3], chart
                            )
                        )
                        patterns.append(pattern)

        return patterns

    @staticmethod
    def _find_grand_crosses(chart: AstrologyChart) -> List[AspectPatternInfo]:
        """查找大十字格局"""
        patterns = []

        # 大十字由四个四分相和两个对分相组成
        for planet1 in chart.planets:
            for planet2 in chart.planets:
                for planet3 in chart.planets:
                    for planet4 in chart.planets:
                        if len({planet1.name, planet2.name, planet3.name, planet4.name}) < 4:
                            continue

                        if AstrologyService._is_grand_cross(chart, planet1, planet2, planet3, planet4):
                            pattern = AspectPatternInfo(
                                pattern_type=AspectPattern.GRAND_CROSS,
                                planets=[planet1.name, planet2.name, planet3.name, planet4.name],
                                description=f"大十字：{planet1.name}、{planet2.name}、{planet3.name}、{planet4.name}形成重大挑战格局",
                                strength=AstrologyService._calculate_pattern_strength(
                                    [planet1, planet2, planet3, planet4], chart
                                )
                            )
                            patterns.append(pattern)

        return patterns

    @staticmethod
    def _find_yods(chart: AstrologyChart) -> List[AspectPatternInfo]:
        """查找手指格局"""
        patterns = []

        # 手指由两个六分相和一个补十二分相组成
        for planet1 in chart.planets:
            for planet2 in chart.planets:
                for planet3 in chart.planets:
                    if len({planet1.name, planet2.name, planet3.name}) < 3:
                        continue

                    if AstrologyService._is_yod(chart, planet1, planet2, planet3):
                        pattern = AspectPatternInfo(
                            pattern_type=AspectPattern.YOD,
                            planets=[planet1.name, planet2.name, planet3.name],
                            description=f"手指：{planet1.name}、{planet2.name}、{planet3.name}形成命运转折格局",
                            strength=AstrologyService._calculate_pattern_strength(
                                [planet1, planet2, planet3], chart
                            )
                        )
                        patterns.append(pattern)

        return patterns

    @staticmethod
    def _find_kites(chart: AstrologyChart) -> List[AspectPatternInfo]:
        """查找风筝格局"""
        patterns = []

        # 风筝是大三角加上两个六分相
        grand_trines = AstrologyService._find_grand_trines(chart)
        for gt in grand_trines:
            # 查找与三角形成六分相的第四颗行星
            for planet in chart.planets:
                if planet.name not in gt.planets:
                    if AstrologyService._forms_kite(chart, gt.planets + [planet.name]):
                        pattern = AspectPatternInfo(
                            pattern_type=AspectPattern.KITE,
                            planets=gt.planets + [planet.name],
                            description=f"风筝：{', '.join(gt.planets + [planet.name])}形成成功与机遇格局",
                            strength=AstrologyService._calculate_pattern_strength(
                                [p for p in chart.planets if p.name in gt.planets + [planet.name]], chart
                            )
                        )
                        patterns.append(pattern)

        return patterns

    @staticmethod
    def _find_mystic_rectangles(chart: AstrologyChart) -> List[AspectPatternInfo]:
        """查找神秘矩形格局"""
        patterns = []

        # 神秘矩形由两个对分相和两个三分相组成
        for planet1 in chart.planets:
            for planet2 in chart.planets:
                for planet3 in chart.planets:
                    for planet4 in chart.planets:
                        if len({planet1.name, planet2.name, planet3.name, planet4.name}) < 4:
                            continue

                        if AstrologyService._is_mystic_rectangle(chart, planet1, planet2, planet3, planet4):
                            pattern = AspectPatternInfo(
                                pattern_type=AspectPattern.MYSTIC_RECTANGLE,
                                planets=[planet1.name, planet2.name, planet3.name, planet4.name],
                                description=f"神秘矩形：{planet1.name}、{planet2.name}、{planet3.name}、{planet4.name}形成平衡与和谐格局",
                                strength=AstrologyService._calculate_pattern_strength(
                                    [planet1, planet2, planet3, planet4], chart
                                )
                            )
                            patterns.append(pattern)

        return patterns

    @staticmethod
    def _find_stelliums(chart: AstrologyChart) -> List[AspectPatternInfo]:
        """查找星群格局"""
        patterns = []

        # 星群：三颗或更多行星在同一个星座或宫位
        # 按星座分组
        sign_groups = {}
        for planet in chart.planets:
            sign = planet.sign
            if sign not in sign_groups:
                sign_groups[sign] = []
            sign_groups[sign].append(planet)

        # 检查星群
        for sign, planets in sign_groups.items():
            if len(planets) >= 3:
                pattern = AspectPatternInfo(
                    pattern_type=AspectPattern.STELLIUM,
                    planets=[p.name for p in planets],
                    description=f"星群：{', '.join([p.name for p in planets])}在{sign}座聚集，形成强烈能量焦点",
                    strength=AstrologyService._calculate_pattern_strength(planets, chart)
                )
                patterns.append(pattern)

        # 按宫位分组
        house_groups = {}
        for planet in chart.planets:
            house = planet.house
            if house not in house_groups:
                house_groups[house] = []
            house_groups[house].append(planet)

        # 检查宫位星群
        for house, planets in house_groups.items():
            if len(planets) >= 3:
                pattern = AspectPatternInfo(
                    pattern_type=AspectPattern.STELLIUM,
                    planets=[p.name for p in planets],
                    description=f"宫位星群：{', '.join([p.name for p in planets])}在第{house}宫聚集，形成生活领域焦点",
                    strength=AstrologyService._calculate_pattern_strength(planets, chart)
                )
                patterns.append(pattern)

        return patterns

    @staticmethod
    def _is_t_square(chart: AstrologyChart, planet1: PlanetPosition,
                     planet2: PlanetPosition, planet3: PlanetPosition) -> bool:
        """检查是否为T三角"""
        # 简化的T三角检测：需要两个对分相和两个四分相
        oppositions = 0
        squares = 0

        for p1, p2 in [(planet1, planet2), (planet2, planet3), (planet1, planet3)]:
            aspect_type, _, _ = AstrologyService._calculate_aspect(p1.position, p2.position)
            if aspect_type == "opposition":
                oppositions += 1
            elif aspect_type == "square":
                squares += 1

        return oppositions >= 1 and squares >= 2

    @staticmethod
    def _is_grand_trine(chart: AstrologyChart, planet1: PlanetPosition,
                       planet2: PlanetPosition, planet3: PlanetPosition) -> bool:
        """检查是否为大三角"""
        trines = 0
        for p1, p2 in [(planet1, planet2), (planet2, planet3), (planet1, planet3)]:
            aspect_type, _, _ = AstrologyService._calculate_aspect(p1.position, p2.position)
            if aspect_type == "trine":
                trines += 1
        return trines >= 3

    @staticmethod
    def _is_grand_cross(chart: AstrologyChart, planet1: PlanetPosition,
                       planet2: PlanetPosition, planet3: PlanetPosition,
                       planet4: PlanetPosition) -> bool:
        """检查是否为大十字"""
        # 简化检测：需要至少4个四分相和2个对分相
        planets = [planet1, planet2, planet3, planet4]
        squares = 0
        oppositions = 0

        for i in range(len(planets)):
            for j in range(i + 1, len(planets)):
                aspect_type, _, _ = AstrologyService._calculate_aspect(
                    planets[i].position, planets[j].position
                )
                if aspect_type == "square":
                    squares += 1
                elif aspect_type == "opposition":
                    oppositions += 1

        return squares >= 4 and oppositions >= 2

    @staticmethod
    def _is_yod(chart: AstrologyChart, planet1: PlanetPosition,
                planet2: PlanetPosition, planet3: PlanetPosition) -> bool:
        """检查是否为手指"""
        # 手指：两个六分相和一个补十二分相
        sextiles = 0
        quincunxes = 0

        for p1, p2 in [(planet1, planet2), (planet2, planet3), (planet1, planet3)]:
            aspect_type, _, _ = AstrologyService._calculate_aspect(p1.position, p2.position)
            if aspect_type == "sextile":
                sextiles += 1
            elif aspect_type == "quincunx":
                quincunxes += 1

        return sextiles >= 2 and quincunxes >= 1

    @staticmethod
    def _forms_kite(chart: AstrologyChart, planet_names: List[str]) -> bool:
        """检查是否形成风筝"""
        # 简化检测：大三角基础上增加六分相
        if len(planet_names) != 4:
            return False

        planets = [p for p in chart.planets if p.name in planet_names]
        if len(planets) != 4:
            return False

        # 检查是否有足够的六分相
        sextiles = 0
        for i in range(len(planets)):
            for j in range(i + 1, len(planets)):
                aspect_type, _, _ = AstrologyService._calculate_aspect(
                    planets[i].position, planets[j].position
                )
                if aspect_type == "sextile":
                    sextiles += 1

        return sextiles >= 2

    @staticmethod
    def _is_mystic_rectangle(chart: AstrologyChart, planet1: PlanetPosition,
                            planet2: PlanetPosition, planet3: PlanetPosition,
                            planet4: PlanetPosition) -> bool:
        """检查是否为神秘矩形"""
        planets = [planet1, planet2, planet3, planet4]
        oppositions = 0
        trines = 0

        for i in range(len(planets)):
            for j in range(i + 1, len(planets)):
                aspect_type, _, _ = AstrologyService._calculate_aspect(
                    planets[i].position, planets[j].position
                )
                if aspect_type == "opposition":
                    oppositions += 1
                elif aspect_type == "trine":
                    trines += 1

        return oppositions >= 2 and trines >= 2

    @staticmethod
    def _calculate_pattern_strength(planets: List[PlanetPosition], chart: AstrologyChart) -> float:
        """计算格局强度"""
        if not planets:
            return 0.0

        # 基于行星数量和相位精确度计算强度
        base_strength = min(len(planets) * 0.2, 1.0)

        # 计算相位的精确度
        exact_aspects = 0
        total_aspects = 0

        for i in range(len(planets)):
            for j in range(i + 1, len(planets)):
                aspect_type, orb, exact = AstrologyService._calculate_aspect(
                    planets[i].position, planets[j].position
                )
                if aspect_type:
                    total_aspects += 1
                    if exact or orb < 1.0:
                        exact_aspects += 1

        if total_aspects > 0:
            aspect_precision = exact_aspects / total_aspects
            return base_strength * (0.5 + 0.5 * aspect_precision)

        return base_strength

    @staticmethod
    def calculate_progressed_chart(birth_data: BirthData, progression_date: datetime,
                                progression_type: ProgressionType = ProgressionType.SECONDARY,
                                house_system: str = "Placidus") -> ProgressedChart:
        """
        计算推运星盘

        Args:
            birth_data: 出生数据
            progression_date: 推运日期
            progression_type: 推运类型
            house_system: 宫位系统

        Returns:
            ProgressedChart: 推运星盘
        """
        try:
            # 创建本命盘
            natal_chart = AstrologyService.create_chart(birth_data, house_system)

            # 计算推运后的行星位置
            progressed_planets = AstrologyService._calculate_progressed_planets(
                birth_data, progression_date, progression_type
            )

            # 计算推运后的宫位
            progressed_houses = AstrologyService._calculate_progressed_houses(
                birth_data, progression_date, house_system
            )

            # 计算推运后的相位
            progressed_aspects = AstrologyService._calculate_progressed_aspects(
                progressed_planets, progressed_houses
            )

            # 创建推运星盘
            progressed_chart = ProgressedChart(
                birth_data=birth_data,
                progression_date=progression_date,
                progression_type=progression_type,
                planets=progressed_planets,
                houses=progressed_houses,
                aspects=progressed_aspects,
                created_at=datetime.now()
            )

            return progressed_chart

        except Exception as e:
            raise ValueError(f"推运计算错误: {str(e)}")

    @staticmethod
    def _calculate_progressed_planets(birth_data: BirthData, progression_date: datetime,
                                     progression_type: ProgressionType) -> List[PlanetPosition]:
        """计算推运后的行星位置"""
        progressed_planets = []

        # 计算出生到推运日期的天数差
        birth_datetime = datetime(birth_data.year, birth_data.month, birth_data.day,
                                 birth_data.hour, birth_data.minute)
        days_diff = (progression_date - birth_datetime).days

        # 创建本命盘获取初始位置
        natal_subject = AstrologicalSubject(
            year=birth_data.year,
            month=birth_data.month,
            day=birth_data.day,
            hour=birth_data.hour,
            minute=birth_data.minute,
            city=birth_data.city,
            nation=birth_data.nation,
            tz_str=birth_data.timezone,
            online=False,
            lng=116.4074,
            lat=39.9042
        )

        natal_kerykeion_obj = natal_subject.model()

        # 主要行星列表
        planet_map = {
            "Sun": natal_kerykeion_obj.sun,
            "Moon": natal_kerykeion_obj.moon,
            "Mercury": natal_kerykeion_obj.mercury,
            "Venus": natal_kerykeion_obj.venus,
            "Mars": natal_kerykeion_obj.mars,
            "Jupiter": natal_kerykeion_obj.jupiter,
            "Saturn": natal_kerykeion_obj.saturn,
            "Uranus": natal_kerykeion_obj.uranus,
            "Neptune": natal_kerykeion_obj.neptune,
            "Pluto": natal_kerykeion_obj.pluto
        }

        # 根据推运类型计算新位置
        for planet_name, planet_obj in planet_map.items():
            if progression_type == ProgressionType.SECONDARY:
                # 次级推运：一天代表一年
                years_progressed = days_diff
                new_position = AstrologyService._calculate_secondary_progression(
                    planet_obj.position, years_progressed, planet_name
                )
            elif progression_type == ProgressionType.SOLAR_ARC:
                # 太阳弧推运：太阳的运动弧度应用于所有行星
                sun_arc = AstrologyService._calculate_solar_arc(natal_kerykeion_obj, days_diff)
                new_position = planet_obj.position + sun_arc
            elif progression_type == ProgressionType.TERTIARY:
                # 三级推运：一天代表一个月
                months_progressed = days_diff / 30.44  # 平均月长度
                new_position = AstrologyService._calculate_tertiary_progression(
                    planet_obj.position, months_progressed, planet_name
                )
            else:
                # 默认使用次级推运
                years_progressed = days_diff
                new_position = AstrologyService._calculate_secondary_progression(
                    planet_obj.position, years_progressed, planet_name
                )

            # 规范化角度到0-360度
            new_position = new_position % 360

            # 确定星座和宫位
            sign = AstrologyService._get_sign_from_position(new_position)
            house = AstrologyService._get_house_from_position(new_position, birth_data)

            progressed_planets.append(PlanetPosition(
                name=AstrologyService.PLANET_MAP.get(planet_name, planet_name),
                sign=sign,
                position=new_position,
                house=house,
                retrograde=planet_obj.retrograde  # 推运中逆行状态保持不变
            ))

        return progressed_planets

    @staticmethod
    def _calculate_secondary_progression(initial_position: float, years: float, planet_name: str) -> float:
        """计算次级推运位置"""
        # 次级推运：每天象征一年
        # 行星每日平均运动速度（度）
        daily_speeds = {
            "Sun": 0.9856,      # 约1度/天
            "Moon": 13.1764,    # 约13度/天
            "Mercury": 1.0,     # 变化较大，取平均值
            "Venus": 1.0,       # 变化较大，取平均值
            "Mars": 0.5240,     # 约0.5度/天
            "Jupiter": 0.0831,  # 约0.08度/天
            "Saturn": 0.0335,   # 约0.03度/天
            "Uranus": 0.0117,   # 约0.01度/天
            "Neptune": 0.0060,  # 约0.006度/天
            "Pluto": 0.0040     # 约0.004度/天
        }

        daily_speed = daily_speeds.get(planet_name, 1.0)
        movement = daily_speed * years
        return initial_position + movement

    @staticmethod
    def _calculate_solar_arc(natal_kerykeion_obj, days_diff: int) -> float:
        """计算太阳弧推运的弧度"""
        # 太阳每日运动约0.9856度
        solar_daily_motion = 0.9856
        return solar_daily_motion * days_diff

    @staticmethod
    def _calculate_tertiary_progression(initial_position: float, months: float, planet_name: str) -> float:
        """计算三级推运位置"""
        # 三级推运：一天象征一个月
        # 使用比次级推运更慢的速度
        monthly_speeds = {
            "Sun": 30.0,        # 太阳每月运动30度
            "Moon": 395.0,      # 月亮每月约395度
            "Mercury": 30.0,    # 水星平均每月运动
            "Venus": 30.0,      # 金星平均每月运动
            "Mars": 15.8,       # 火星每月运动
            "Jupiter": 2.5,     # 木星每月运动
            "Saturn": 1.0,      # 土星每月运动
            "Uranus": 0.35,     # 天王星每月运动
            "Neptune": 0.18,    # 海王星每月运动
            "Pluto": 0.12       # 冥王星每月运动
        }

        monthly_speed = monthly_speeds.get(planet_name, 30.0)
        movement = monthly_speed * months
        return initial_position + movement

    @staticmethod
    def _calculate_progressed_houses(birth_data: BirthData, progression_date: datetime,
                                   house_system: str) -> List[House]:
        """计算推运后的宫位"""
        # 推运宫位基于推运日期的计算
        try:
            # 使用推运日期创建星盘来获取宫位
            progressed_subject = AstrologicalSubject(
                year=progression_date.year,
                month=progression_date.month,
                day=progression_date.day,
                hour=progression_date.hour,
                minute=progression_date.minute,
                city=birth_data.city,
                nation=birth_data.nation,
                tz_str=birth_data.timezone,
                houses_system_identifier=AstrologyService.HOUSE_SYSTEM_MAP.get(house_system, house_system),
                online=False,
                lng=116.4074,
                lat=39.9042
            )

            progressed_kerykeion_obj = progressed_subject.model()
            houses = []

            house_attributes = [
                "first_house", "second_house", "third_house", "fourth_house",
                "fifth_house", "sixth_house", "seventh_house", "eighth_house",
                "ninth_house", "tenth_house", "eleventh_house", "twelfth_house"
            ]

            for i, house_attr in enumerate(house_attributes, 1):
                if hasattr(progressed_kerykeion_obj, house_attr):
                    house = getattr(progressed_kerykeion_obj, house_attr)
                    if house is not None:
                        houses.append(House(
                            number=i,
                            sign=AstrologyService._translate_sign(house.sign),
                            position=house.position
                        ))

            return houses

        except Exception:
            # 如果推运宫位计算失败，返回本命宫位
            natal_chart = AstrologyService.create_chart(birth_data, house_system)
            return natal_chart.houses

    @staticmethod
    def _calculate_progressed_aspects(planets: List[PlanetPosition],
                                     houses: List[House]) -> List[Aspect]:
        """计算推运后的相位"""
        aspects = []

        # 计算行星之间的相位
        for i, planet1 in enumerate(planets):
            for planet2 in planets[i+1:]:
                aspect_type, orb, exact = AstrologyService._calculate_aspect(
                    planet1.position, planet2.position
                )
                if aspect_type:
                    aspects.append(Aspect(
                        planet1=planet1.name,
                        planet2=planet2.name,
                        aspect_type=AstrologyService.ASPECT_MAP.get(aspect_type, aspect_type),
                        orb=orb,
                        exact=exact,
                        applying=orb > 1.0,
                        separating=orb <= 1.0,
                        strength=AstrologyService._calculate_aspect_strength(aspect_type, orb),
                        angularity=AstrologyService._get_aspect_angularity(aspect_type)
                    ))

        # 计算行星与宫主星的相位
        for planet in planets:
            # 查找行星所在的宫位
            if planet.house <= len(houses):
                house_cusp_sign = houses[planet.house - 1].sign
                # 这里可以添加更多宫主星相位计算逻辑
                pass

        return aspects

    @staticmethod
    def _calculate_aspect_strength(aspect_type: str, orb: float) -> float:
        """计算相位强度"""
        max_orb = AstrologyService.ASPECT_ORBS.get(aspect_type, 8)
        if max_orb > 0:
            return 1.0 - (orb / max_orb)
        return 0.0

    @staticmethod
    def _get_aspect_angularity(aspect_type: str) -> str:
        """获取相位角度性质"""
        angular_aspects = ["conjunction", "opposition", "square"]
        succedent_aspects = ["trine", "sextile"]
        cadent_aspects = ["semisextile", "semisquare", "quincunx"]

        if aspect_type in angular_aspects:
            return "角宫相位"
        elif aspect_type in succedent_aspects:
            return "续宫相位"
        elif aspect_type in cadent_aspects:
            return "陷宫相位"
        return "中性相位"

    @staticmethod
    def _get_sign_from_position(position: float) -> str:
        """根据位置获取星座"""
        sign_positions = [
            ("白羊座", 0, 30), ("金牛座", 30, 60), ("双子座", 60, 90),
            ("巨蟹座", 90, 120), ("狮子座", 120, 150), ("处女座", 150, 180),
            ("天秤座", 180, 210), ("天蝎座", 210, 240), ("射手座", 240, 270),
            ("摩羯座", 270, 300), ("水瓶座", 300, 330), ("双鱼座", 330, 360)
        ]

        for sign, start, end in sign_positions:
            if start <= position < end:
                return sign
        return "白羊座"  # 默认

    @staticmethod
    def _get_house_from_position(position: float, birth_data: BirthData) -> int:
        """根据位置获取宫位（简化计算）"""
        # 这里使用简化的等宫制计算
        house_size = 30  # 每个宫位30度
        house = int(position / house_size) + 1
        return min(house, 12)

    @staticmethod
    def get_house_systems_info() -> Dict[str, Dict[str, Any]]:
        """获取所有宫位系统的详细信息"""
        return AstrologyService.HOUSE_SYSTEM_INFO

    @staticmethod
    def get_available_house_systems() -> List[str]:
        """获取所有可用的宫位系统名称"""
        return list(AstrologyService.HOUSE_SYSTEM_INFO.keys())

    @staticmethod
    def validate_house_system(house_system: str) -> bool:
        """验证宫位系统是否有效"""
        return house_system in AstrologyService.HOUSE_SYSTEM_MAP

    @staticmethod
    def get_house_system_identifier(house_system: str) -> str:
        """获取宫位系统标识符"""
        return AstrologyService.HOUSE_SYSTEM_MAP.get(house_system, "P")  # 默认使用Placidus

    @staticmethod
    def calculate_house_cusps(subject: AstrologicalSubject, house_system: str = "Placidus") -> List[House]:
        """
        计算宫位头位置

        Args:
            subject: Kerykeion星盘对象
            house_system: 宫位系统

        Returns:
            List[House]: 宫位信息列表
        """
        try:
            # 获取宫位系统标识符
            system_id = AstrologyService.get_house_system_identifier(house_system)

            # 如果需要重新计算宫位（与当前设置不同）
            if subject.houses_system_identifier != system_id:
                # 这里可以根据需要重新创建subject对象
                pass

            kerykeion_obj = subject.model()
            houses = []

            house_attributes = [
                "first_house", "second_house", "third_house", "fourth_house",
                "fifth_house", "sixth_house", "seventh_house", "eighth_house",
                "ninth_house", "tenth_house", "eleventh_house", "twelfth_house"
            ]

            for i, house_attr in enumerate(house_attributes, 1):
                if hasattr(kerykeion_obj, house_attr):
                    house = getattr(kerykeion_obj, house_attr)
                    if house is not None:
                        houses.append(House(
                            number=i,
                            sign=AstrologyService._translate_sign(house.sign),
                            position=house.position
                        ))

            return houses

        except Exception as e:
            # 如果计算失败，返回空列表
            return []

    @staticmethod
    def get_house_ruler(sign: str) -> str:
        """
        获取星座的守护星

        Args:
            sign: 星座名称

        Returns:
            str: 守护星名称
        """
        # 传统守护星映射
        traditional_rulers = {
            "白羊座": "火星",
            "金牛座": "金星",
            "双子座": "水星",
            "巨蟹座": "月亮",
            "狮子座": "太阳",
            "处女座": "水星",
            "天秤座": "金星",
            "天蝎座": "火星",
            "射手座": "木星",
            "摩羯座": "土星",
            "水瓶座": "土星",
            "双鱼座": "木星"
        }

        # 现代守护星映射（外行星）
        modern_rulers = {
            "天蝎座": "冥王星",
            "水瓶座": "天王星",
            "双鱼座": "海王星"
        }

        # 优先使用现代守护星
        if sign in modern_rulers:
            return modern_rulers[sign]

        return traditional_rulers.get(sign, "")

    @staticmethod
    def calculate_house_meanings(chart: AstrologyChart) -> Dict[int, Dict[str, Any]]:
        """
        计算宫位含义

        Args:
            chart: 星盘数据

        Returns:
            Dict[int, Dict[str, Any]]: 宫位含义字典
        """
        house_meanings = {}

        # 宫位基础含义
        base_meanings = {
            1: {"theme": "自我", "keywords": ["个性", "外貌", "第一印象", "身份"]},
            2: {"theme": "财富", "keywords": ["金钱", "价值观", "物质资源", "自尊"]},
            3: {"theme": "沟通", "keywords": ["思维", "学习", "交流", "兄弟姐妹"]},
            4: {"theme": "家庭", "keywords": ["家", "父母", "根基", "私人生活"]},
            5: {"theme": "创造", "keywords": ["爱情", "子女", "娱乐", "自我表达"]},
            6: {"theme": "服务", "keywords": ["工作", "健康", "日常", "责任"]},
            7: {"theme": "关系", "keywords": ["伙伴", "婚姻", "合作", "公开敌人"]},
            8: {"theme": "转化", "keywords": ["性", "死亡", "再生", "共同资源"]},
            9: {"theme": "扩张", "keywords": ["哲学", "旅行", "教育", "宗教"]},
            10: {"theme": "事业", "keywords": ["成就", "社会地位", "权威", "母亲"]},
            11: {"theme": "社群", "keywords": ["朋友", "团体", "理想", "希望"]},
            12: {"theme": "灵性", "keywords": ["潜意识", "隐退", "业力", "灵性成长"]}
        }

        for i in range(1, 13):
            house_info = base_meanings[i].copy()

            # 添加宫位头星座
            if i <= len(chart.houses):
                house_info["cusp_sign"] = chart.houses[i-1].sign
                house_info["ruler"] = AstrologyService.get_house_ruler(chart.houses[i-1].sign)

            # 添加宫位内行星
            planets_in_house = [p.name for p in chart.planets if p.house == i]
            house_info["planets"] = planets_in_house

            # 添加宫位强度（基于行星数量）
            house_info["strength"] = len(planets_in_house)

            house_meanings[i] = house_info

        return house_meanings

    @staticmethod
    def compare_house_systems(birth_data: BirthData, systems: List[str]) -> Dict[str, AstrologyChart]:
        """
        比较不同宫位系统的星盘差异

        Args:
            birth_data: 出生数据
            systems: 要比较的宫位系统列表

        Returns:
            Dict[str, AstrologyChart]: 不同宫位系统的星盘
        """
        charts = {}

        for system in systems:
            if AstrologyService.validate_house_system(system):
                try:
                    chart = AstrologyService.create_chart(birth_data, system)
                    charts[system] = chart
                except Exception as e:
                    # 记录错误但继续处理其他系统
                    print(f"宫位系统 {system} 计算失败: {str(e)}")

        return charts