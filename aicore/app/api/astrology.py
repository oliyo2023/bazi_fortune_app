"""星盘计算API路由"""
from fastapi import APIRouter, HTTPException
from typing import List

from app.models.astrology import ChartRequest, ChartResponse, AstrologyChart
from app.services.astrology_service import AstrologyService

# 创建路由器
router = APIRouter()


@router.post("/chart", response_model=ChartResponse)
async def create_astrology_chart(request: ChartRequest):
    """
    创建星盘
    
    - **birth_data**: 出生数据（年、月、日、时、分、城市）
    - **house_system**: 宫位系统（默认Placidus）
    """
    try:
        # 创建星盘
        chart = AstrologyService.create_chart(
            birth_data=request.birth_data,
            house_system=request.house_system
        )
        
        return ChartResponse(
            success=True,
            message="星盘创建成功",
            chart=chart
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"服务器内部错误: {str(e)}")


@router.post("/report")
async def generate_chart_report(request: ChartRequest):
    """
    生成星盘解读报告
    
    - **birth_data**: 出生数据
    - **house_system**: 宫位系统
    """
    try:
        # 创建星盘
        chart = AstrologyService.create_chart(
            birth_data=request.birth_data,
            house_system=request.house_system
        )
        
        # 生成报告
        report = AstrologyService.generate_report(chart)
        
        return {
            "success": True,
            "message": "报告生成成功",
            "chart": chart,
            "report": report
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"服务器内部错误: {str(e)}")


@router.get("/signs")
async def get_zodiac_signs():
    """获取十二星座信息"""
    signs = [
        {"name": "白羊座", "english": "Aries", "date_range": "3月21日-4月19日"},
        {"name": "金牛座", "english": "Taurus", "date_range": "4月20日-5月20日"},
        {"name": "双子座", "english": "Gemini", "date_range": "5月21日-6月21日"},
        {"name": "巨蟹座", "english": "Cancer", "date_range": "6月22日-7月22日"},
        {"name": "狮子座", "english": "Leo", "date_range": "7月23日-8月22日"},
        {"name": "处女座", "english": "Virgo", "date_range": "8月23日-9月22日"},
        {"name": "天秤座", "english": "Libra", "date_range": "9月23日-10月23日"},
        {"name": "天蝎座", "english": "Scorpio", "date_range": "10月24日-11月22日"},
        {"name": "射手座", "english": "Sagittarius", "date_range": "11月23日-12月21日"},
        {"name": "摩羯座", "english": "Capricorn", "date_range": "12月22日-1月19日"},
        {"name": "水瓶座", "english": "Aquarius", "date_range": "1月20日-2月18日"},
        {"name": "双鱼座", "english": "Pisces", "date_range": "2月19日-3月20日"}
    ]
    
    return {
        "success": True,
        "signs": signs
    }


@router.get("/planets")
async def get_planets():
    """获取行星信息"""
    planets = [
        {"name": "太阳", "english": "Sun", "type": "恒星"},
        {"name": "月亮", "english": "Moon", "type": "卫星"},
        {"name": "水星", "english": "Mercury", "type": "行星"},
        {"name": "金星", "english": "Venus", "type": "行星"},
        {"name": "火星", "english": "Mars", "type": "行星"},
        {"name": "木星", "english": "Jupiter", "type": "行星"},
        {"name": "土星", "english": "Saturn", "type": "行星"},
        {"name": "天王星", "english": "Uranus", "type": "行星"},
        {"name": "海王星", "english": "Neptune", "type": "行星"},
        {"name": "冥王星", "english": "Pluto", "type": "矮行星"}
    ]
    
    return {
        "success": True,
        "planets": planets
    }


@router.get("/house-systems")
async def get_house_systems():
    """获取宫位系统信息"""
    systems = [
        {"name": "Placidus", "description": "普拉西德宫位系统，最常用"},
        {"name": "Koch", "description": "科赫宫位系统"},
        {"name": "Equal", "description": "等宫位系统"},
        {"name": "Whole Sign", "description": "整宫位系统"},
        {"name": "Regiomontanus", "description": "雷乔蒙塔努斯宫位系统"},
        {"name": "Campanus", "description": "坎帕努斯宫位系统"}
    ]
    
    return {
        "success": True,
        "systems": systems
    }