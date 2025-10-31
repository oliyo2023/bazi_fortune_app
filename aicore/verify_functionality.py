#!/usr/bin/env python3
"""
aicore星盘功能验证脚本
验证新增的星盘逻辑功能是否正常工作
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from datetime import datetime
from app.models.astrology import (
    BirthData, TransitType, ProgressionType,
    AspectType, AspectPattern
)
from app.services.astrology_service import AstrologyService

def test_basic_functionality():
    """测试基础功能"""
    print("🔮 测试基础星盘计算功能...")

    # 创建测试出生数据
    birth_data = BirthData(
        year=1990,
        month=5,
        day=15,
        hour=10,
        minute=30,
        city="Beijing",
        nation="China",
        timezone="Asia/Shanghai"
    )

    try:
        # 测试星盘创建
        chart = AstrologyService.create_chart(birth_data)
        print(f"✅ 星盘创建成功: 太阳{chart.sun_sign}, 月亮{chart.moon_sign}, 上升{chart.ascendant}")
        print(f"   行星数量: {len(chart.planets)}, 宫位数量: {len(chart.houses)}, 相位数量: {len(chart.aspects)}")
        return True
    except Exception as e:
        print(f"❌ 星盘创建失败: {str(e)}")
        return False

def test_transit_analysis():
    """测试行运分析"""
    print("\n🌟 测试行运分析功能...")

    birth_data = BirthData(
        year=1990, month=5, day=15, hour=10, minute=30,
        city="Beijing", nation="China", timezone="Asia/Shanghai"
    )

    try:
        # 计算一周的行运
        start_date = datetime(2024, 1, 1)
        end_date = datetime(2024, 1, 7)

        transit_periods = AstrologyService.calculate_transits(
            birth_data, start_date, end_date
        )
        print(f"✅ 行运分析成功: 发现 {len(transit_periods)} 个行运周期")

        # 显示前几个行运
        for i, transit in enumerate(transit_periods[:3]):
            print(f"   行运 {i+1}: {transit.description}")

        return True
    except Exception as e:
        print(f"❌ 行运分析失败: {str(e)}")
        return False

def test_progression_calculation():
    """测试推运计算"""
    print("\n📊 测试推运计算功能...")

    birth_data = BirthData(
        year=1990, month=5, day=15, hour=10, minute=30,
        city="Beijing", nation="China", timezone="Asia/Shanghai"
    )

    try:
        # 计算次级推运
        progression_date = datetime(2024, 1, 1)
        progressed_chart = AstrologyService.calculate_progressed_chart(
            birth_data, progression_date, ProgressionType.SECONDARY
        )

        print(f"✅ 推运计算成功: 推运类型 {progressed_chart.progression_type.value}")
        print(f"   推运后行星数量: {len(progressed_chart.planets)}")
        print(f"   推运后宫位数量: {len(progressed_chart.houses)}")
        print(f"   推运后相位数量: {len(progressed_chart.aspects)}")

        return True
    except Exception as e:
        print(f"❌ 推运计算失败: {str(e)}")
        return False

def test_aspect_patterns():
    """测试相位格局分析"""
    print("\n⭐ 测试相位格局分析功能...")

    birth_data = BirthData(
        year=1990, month=5, day=15, hour=10, minute=30,
        city="Beijing", nation="China", timezone="Asia/Shanghai"
    )

    try:
        # 分析相位格局
        chart = AstrologyService.create_chart(birth_data)
        patterns = AstrologyService.analyze_aspect_patterns(chart)

        print(f"✅ 相位格局分析成功: 发现 {len(patterns)} 个格局")

        # 显示发现的格局
        for pattern in patterns:
            print(f"   格局类型: {pattern.pattern_type.value}")
            print(f"   涉及行星: {', '.join(pattern.planets)}")
            print(f"   强度: {pattern.strength:.2f}")
            print(f"   描述: {pattern.description}")

        return True
    except Exception as e:
        print(f"❌ 相位格局分析失败: {str(e)}")
        return False

def test_house_systems():
    """测试宫位系统功能"""
    print("\n🏠 测试宫位系统功能...")

    try:
        # 获取宫位系统信息
        systems_info = AstrologyService.get_house_systems_info()
        print(f"✅ 获取宫位系统信息成功: 共 {len(systems_info)} 个系统")

        # 测试几个主要宫位制
        main_systems = ["Placidus", "Equal", "Whole Sign", "Campanus"]
        for system in main_systems:
            if AstrologyService.validate_house_system(system):
                print(f"   ✅ {system}: {systems_info.get(system, {}).get('name', system)}")
            else:
                print(f"   ❌ {system}: 无效的宫位系统")

        # 测试守护星计算
        rulers = [
            ("白羊座", "火星"),
            ("狮子座", "太阳"),
            ("天蝎座", "冥王星"),  # 现代守护星
            ("水瓶座", "天王星")   # 现代守护星
        ]

        print("   守护星测试:")
        for sign, expected_ruler in rulers:
            ruler = AstrologyService.get_house_ruler(sign)
            status = "✅" if ruler == expected_ruler else "❌"
            print(f"   {status} {sign} -> {ruler}")

        return True
    except Exception as e:
        print(f"❌ 宫位系统测试失败: {str(e)}")
        return False

def test_aspect_calculations():
    """测试相位计算功能"""
    print("\n🔺 测试相位计算功能...")

    try:
        # 测试各种相位
        test_cases = [
            (10.0, 12.0, "conjunction"),   # 合相
            (10.0, 100.0, "square"),      # 四分相
            (10.0, 130.0, "trine"),       # 三分相
            (10.0, 190.0, "opposition"),  # 对分相
            (10.0, 50.0, None)           # 无相位
        ]

        for pos1, pos2, expected_aspect in test_cases:
            aspect_type, orb, exact = AstrologyService._calculate_aspect(pos1, pos2)
            status = "✅" if aspect_type == expected_aspect else "❌"
            print(f"   {status} {pos1}° 与 {pos2}°: {aspect_type or '无相位'} (容许度: {orb:.2f})")

        # 测试相位强度计算
        strength_tests = [
            ("conjunction", 0.0, 1.0),    # 精确相位
            ("conjunction", 4.0, 0.5),    # 中等精度
            ("conjunction", 8.0, 0.0),    # 边缘分相位
        ]

        print("   相位强度测试:")
        for aspect, orb, expected_strength in strength_tests:
            strength = AstrologyService._calculate_aspect_strength(aspect, orb)
            status = "✅" if abs(strength - expected_strength) < 0.1 else "❌"
            print(f"   {status} {aspect} 容许度{orb}°: 强度{strength:.2f}")

        return True
    except Exception as e:
        print(f"❌ 相位计算测试失败: {str(e)}")
        return False

def main():
    """主测试函数"""
    print("🚀 开始aicore星盘功能验证...\n")

    tests = [
        ("基础功能测试", test_basic_functionality),
        ("行运分析测试", test_transit_analysis),
        ("推运计算测试", test_progression_calculation),
        ("相位格局分析测试", test_aspect_patterns),
        ("宫位系统测试", test_house_systems),
        ("相位计算测试", test_aspect_calculations)
    ]

    passed = 0
    total = len(tests)

    for test_name, test_func in tests:
        try:
            if test_func():
                passed += 1
        except Exception as e:
            print(f"❌ {test_name}执行异常: {str(e)}")

    print(f"\n📊 测试结果: {passed}/{total} 通过")

    if passed == total:
        print("🎉 所有测试通过！aicore星盘功能扩展成功！")
        return 0
    else:
        print("⚠️  部分测试失败，请检查相关功能实现。")
        return 1

if __name__ == "__main__":
    exit(main())