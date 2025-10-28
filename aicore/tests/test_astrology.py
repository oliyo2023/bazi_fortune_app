"""星盘API测试"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

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
                "nation": "China"
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
                "nation": "China"
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
                "nation": "China"
            },
            "house_system": "Placidus"
        }
        
        response = client.post("/api/v1/report", json=chart_data)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "chart" in data
        assert "report" in data


if __name__ == "__main__":
    pytest.main([__file__])