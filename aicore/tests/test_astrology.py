"""星盘API测试"""
import pytest
from fastapi.testclient import TestClient
from datetime import datetime, timedelta
from app.main import app
from app.models.astrology import (
    BirthData, AstrologyChart, TransitType, ProgressionType,
    AspectType, AspectPattern
)
from app.services.astrology_service import AstrologyService

# 创建测试客户端
client = TestClient(app)


class TestAstrologyAPI:
    """星盘API测试类"""
    
    def test_root_endpoint(self):
        """测试根路径"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "AI Core 星盘计算API"
        assert "version" in data
        assert "docs" in data
    
    def test_health_check(self):
        """测试健康检查"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
    
    def test_get_zodiac_signs(self):
        """测试获取星座信息"""
        response = client.get("/api/v1/signs")
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "signs" in data
        assert len(data["signs"]) == 12
    
    def test_get_planets(self):
        """测试获取行星信息"""
        response = client.get("/api/v1/planets")
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "planets" in data
        assert len(data["planets"]) >= 10
    
    def test_get_house_systems(self):
        """测试获取宫位系统信息"""
        response = client.get("/api/v1/house-systems")
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "systems" in data
        assert len(data["systems"]) >= 5
    
    def test_create_chart_valid_data(self):
        """测试创建星盘 - 有效数据"""
        chart_data = {
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
        
        response = client.post("/api/v1/chart", json=chart_data)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "chart" in data
        assert "sun_sign" in data["chart"]
        assert "moon_sign" in data["chart"]
        assert "ascendant" in data["chart"]
    
    def test_create_chart_invalid_data(self):
        """测试创建星盘 - 无效数据"""
        chart_data = {
            "birth_data": {
                "year": 1800,  # 无效年份
                "month": 13,   # 无效月份
                "day": 32,     # 无效日期
                "hour": 25,    # 无效小时
                "minute": 70,  # 无效分钟
                "city": "",
                "nation": "China",
                "timezone": "Asia/Shanghai"
            },
            "house_system": "Placidus"
        }
        
        response = client.post("/api/v1/chart", json=chart_data)
        # 应该返回错误，但具体错误码取决于验证逻辑
        assert response.status_code in [400, 422]
    
    def test_generate_report(self):
        """测试生成报告"""
        chart_data = {
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
        
        response = client.post("/api/v1/report", json=chart_data)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "chart" in data
        assert "report" in data


class TestAstrologyService:
    """星盘服务测试类"""

    @pytest.fixture
    def sample_birth_data(self):
        """示例出生数据"""
        return BirthData(
            year=1990,
            month=5,
            day=15,
            hour=10,
            minute=30,
            city="Beijing",
            nation="China",
            timezone="Asia/Shanghai"
        )

    def test_create_chart_service(self, sample_birth_data):
        """测试星盘创建服务"""
        chart = AstrologyService.create_chart(sample_birth_data)

        assert isinstance(chart, AstrologyChart)
        assert chart.sun_sign is not None
        assert chart.moon_sign is not None
        assert chart.ascendant is not None
        assert len(chart.planets) > 0
        assert len(chart.houses) == 12
        assert len(chart.aspects) >= 0

    def test_transit_calculation(self, sample_birth_data):
        """测试行运计算"""
        start_date = datetime(2024, 1, 1)
        end_date = datetime(2024, 1, 7)  # 一周时间

        transit_periods = AstrologyService.calculate_transits(
            sample_birth_data, start_date, end_date
        )

        assert isinstance(transit_periods, list)
        # 应该有一些行运周期
        assert len(transit_periods) >= 0

    def test_progression_calculation(self, sample_birth_data):
        """测试推运计算"""
        progression_date = datetime(2024, 1, 1)

        progressed_chart = AstrologyService.calculate_progressed_chart(
            sample_birth_data, progression_date, ProgressionType.SECONDARY
        )

        assert progressed_chart is not None
        assert progressed_chart.birth_data == sample_birth_data
        assert progressed_chart.progression_type == ProgressionType.SECONDARY
        assert len(progressed_chart.planets) > 0
        assert len(progressed_chart.houses) > 0

    def test_aspect_pattern_analysis(self, sample_birth_data):
        """测试相位格局分析"""
        chart = AstrologyService.create_chart(sample_birth_data)
        patterns = AstrologyService.analyze_aspect_patterns(chart)

        assert isinstance(patterns, list)
        # 每个格局都应该是有效的
        for pattern in patterns:
            assert pattern.pattern_type in AspectPattern
            assert len(pattern.planets) >= 3  # 至少3颗行星才能形成格局
            assert pattern.strength >= 0
            assert pattern.strength <= 1

    def test_house_systems_info(self):
        """测试宫位系统信息"""
        systems_info = AstrologyService.get_house_systems_info()

        assert isinstance(systems_info, dict)
        assert len(systems_info) > 0

        # 检查每个系统都有必要的信息
        for system_name, info in systems_info.items():
            assert "name" in info
            assert "description" in info
            assert "features" in info
            assert isinstance(info["features"], list)

    def test_house_system_validation(self):
        """测试宫位系统验证"""
        # 有效的宫位系统
        assert AstrologyService.validate_house_system("Placidus") is True
        assert AstrologyService.validate_house_system("Equal") is True
        assert AstrologyService.validate_house_system("Whole Sign") is True

        # 无效的宫位系统
        assert AstrologyService.validate_house_system("Invalid") is False
        assert AstrologyService.validate_house_system("") is False

    def test_house_ruler_calculation(self):
        """测试守护星计算"""
        # 测试传统守护星
        assert AstrologyService.get_house_ruler("白羊座") == "火星"
        assert AstrologyService.get_house_ruler("狮子座") == "太阳"
        assert AstrologyService.get_house_ruler("摩羯座") == "土星"

        # 测试现代守护星
        assert AstrologyService.get_house_ruler("天蝎座") == "冥王星"
        assert AstrologyService.get_house_ruler("水瓶座") == "天王星"
        assert AstrologyService.get_house_ruler("双鱼座") == "海王星"

    def test_house_meanings_calculation(self, sample_birth_data):
        """测试宫位含义计算"""
        chart = AstrologyService.create_chart(sample_birth_data)
        meanings = AstrologyService.calculate_house_meanings(chart)

        assert isinstance(meanings, dict)
        assert len(meanings) == 12

        # 检查每个宫位都有基础信息
        for i in range(1, 13):
            assert i in meanings
            house_info = meanings[i]
            assert "theme" in house_info
            assert "keywords" in house_info
            assert "planets" in house_info
            assert "strength" in house_info
            assert isinstance(house_info["planets"], list)
            assert isinstance(house_info["strength"], int)

    def test_aspect_calculation(self):
        """测试相位计算"""
        # 测试合相 (0度)
        aspect_type, orb, exact = AstrologyService._calculate_aspect(10.0, 12.0)
        assert aspect_type == "conjunction"
        assert orb <= 8.0  # 合相容许度
        assert isinstance(exact, bool)

        # 测试对分相 (180度)
        aspect_type, orb, exact = AstrologyService._calculate_aspect(10.0, 190.0)
        assert aspect_type == "opposition"
        assert orb <= 8.0

        # 测试三分相 (120度)
        aspect_type, orb, exact = AstrologyService._calculate_aspect(10.0, 130.0)
        assert aspect_type == "trine"
        assert orb <= 8.0

        # 测试四分相 (90度)
        aspect_type, orb, exact = AstrologyService._calculate_aspect(10.0, 100.0)
        assert aspect_type == "square"
        assert orb <= 8.0

        # 测试无相位
        aspect_type, orb, exact = AstrologyService._calculate_aspect(10.0, 50.0)
        assert aspect_type is None

    def test_transit_intensity_calculation(self):
        """测试行运强度计算"""
        intensity = AstrologyService._calculate_transit_intensity(
            "conjunction", 1.0, "Sun", "Moon"
        )
        assert isinstance(intensity, float)
        assert 0 <= intensity <= 1

    def test_aspect_strength_calculation(self):
        """测试相位强度计算"""
        # 精确相位
        strength = AstrologyService._calculate_aspect_strength("conjunction", 0.0)
        assert strength == 1.0

        # 边缘分相位
        strength = AstrologyService._calculate_aspect_strength("conjunction", 8.0)
        assert strength == 0.0

        # 中等精度
        strength = AstrologyService._calculate_aspect_strength("conjunction", 4.0)
        assert 0 < strength < 1

    def test_sign_from_position(self):
        """测试从位置获取星座"""
        assert AstrologyService._get_sign_from_position(15.0) == "白羊座"
        assert AstrologyService._get_sign_from_position(45.0) == "金牛座"
        assert AstrologyService._get_sign_from_position(75.0) == "双子座"
        assert AstrologyService._get_sign_from_position(350.0) == "双鱼座"

    def test_house_from_position(self, sample_birth_data):
        """测试从位置获取宫位"""
        house = AstrologyService._get_house_from_position(15.0, sample_birth_data)
        assert 1 <= house <= 12
        assert isinstance(house, int)

    def test_available_house_systems(self):
        """测试获取可用宫位系统"""
        systems = AstrologyService.get_available_house_systems()

        assert isinstance(systems, list)
        assert len(systems) > 0
        assert "Placidus" in systems
        assert "Equal" in systems
        assert "Whole Sign" in systems

    def test_house_system_identifier(self):
        """测试获取宫位系统标识符"""
        assert AstrologyService.get_house_system_identifier("Placidus") == "P"
        assert AstrologyService.get_house_system_identifier("Equal") == "A"
        assert AstrologyService.get_house_system_identifier("Whole Sign") == "W"
        # 无效系统应返回默认值
        assert AstrologyService.get_house_system_identifier("Invalid") == "P"


class TestAstrologyModels:
    """星盘模型测试类"""

    def test_birth_data_model(self):
        """测试出生数据模型"""
        birth_data = BirthData(
            year=1990,
            month=5,
            day=15,
            hour=10,
            minute=30,
            city="Beijing",
            nation="China"
        )

        assert birth_data.year == 1990
        assert birth_data.month == 5
        assert birth_data.city == "Beijing"

    def test_aspect_type_enum(self):
        """测试相位类型枚举"""
        assert AspectType.CONJUNCTION == "conjunction"
        assert AspectType.OPPOSITION == "opposition"
        assert AspectType.TRINE == "trine"
        assert AspectType.SQUARE == "square"

    def test_progression_type_enum(self):
        """测试推运类型枚举"""
        assert ProgressionType.SECONDARY == "secondary"
        assert ProgressionType.SOLAR_ARC == "solar_arc"
        assert ProgressionType.TERTIARY == "tertiary"

    def test_transit_type_enum(self):
        """测试行运类型枚举"""
        assert TransitType.NATAL == "natal"
        assert TransitType.PROGRESSED == "progressed"
        assert TransitType.SOLAR_RETURN == "solar_return"


if __name__ == "__main__":
    pytest.main([__file__])