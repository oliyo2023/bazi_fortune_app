import 'package:lunar/lunar.dart';

/// 八字计算工具类 - 使用lunar库实现准确计算
class BaziCalculator {
  /// 计算完整八字信息
  static Map<String, dynamic> calculateBazi(
    DateTime birthDate,
    int birthHour, {
    int birthMinute = 0,
  }) {
    final lunar = Lunar.fromDate(birthDate);
    
    return {
      // 基本信息
      'solarDate': _formatDate(birthDate),
      'lunarDate': '${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}',
      
      // 八字干支 - 使用lunar库获得准确结果
      'yearPillar': lunar.getYearInGanZhi(),
      'yearPillarByLiChun': lunar.getYearInGanZhiByLiChun(),
      'yearPillarExact': lunar.getYearInGanZhiExact(),
      
      'monthPillar': lunar.getMonthInGanZhi(),
      'monthPillarExact': lunar.getMonthInGanZhiExact(),
      
      'dayPillar': lunar.getDayInGanZhi(),
      'dayPillarExact': lunar.getDayInGanZhiExact(),
      'dayPillarExact2': lunar.getDayInGanZhiExact2(),
      
      // 时柱计算 - 使用birthHour而不是24小时制
      'hourPillar': lunar.getTimeInGanZhi(),
      
      // 生肖和节日
      'zodiac': lunar.getYearShengXiao(),
      'festivals': lunar.getFestivals(),
      'otherFestivals': lunar.getOtherFestivals(),
      
      // 时辰信息
      'chineseHour': _getChineseHour(birthHour),
      'hourElement': _getHourElement(birthHour),
      'hourTimeRange': _getHourTimeRange(birthHour),
      
      // 农历详细信息
      'lunarYear': lunar.getYear(),
      'lunarMonth': lunar.getMonth(),
      'lunarDay': lunar.getDay(),
      'lunarYearInChinese': lunar.getYearInChinese(),
      'lunarMonthInChinese': lunar.getMonthInChinese(),
      'lunarDayInChinese': lunar.getDayInChinese(),
      
      // 是否闰月
      'isLeapMonth': lunar.getMonthInChinese().contains('闰'),
      
      // 节气信息
      'solarTerms': _getSolarTerms(lunar, birthDate.month, birthDate.day),
      
      // 五行分析（简化版）
      'fiveElements': _calculateFiveElements(
        lunar.getYearInGanZhi(),
        lunar.getMonthInGanZhi(),
        lunar.getDayInGanZhi(),
        lunar.getTimeInGanZhi(),
      ),
    };
  }

  /// 获取时辰对应的中文名称
  static String _getChineseHour(int hour) {
    final hours = [
      '子时', '丑时', '寅时', '卯时', '辰时', '巳时',
      '午时', '未时', '申时', '酉时', '戌时', '亥时'
    ];
    
    int index;
    if (hour == 23) {
      index = 0; // 23点是子时
    } else {
      index = ((hour + 1) / 2).floor();
    }
    
    return hours[index % 12];
  }

  /// 获取时辰对应的五行
  static String _getHourElement(int hour) {
    // 子(水) 丑(土) 寅(木) 卯(木) 辰(土) 巳(火)
    // 午(火) 未(土) 申(金) 酉(金) 戌(土) 亥(水)
    final elements = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];
    
    int index;
    if (hour == 23) {
      index = 0;
    } else {
      index = ((hour + 1) / 2).floor();
    }
    return elements[index % 12];
  }

  /// 获取时辰对应的时间范围
  static String _getHourTimeRange(int hour) {
    final ranges = [
      '23:00-01:00', // 子时
      '01:00-03:00', // 丑时
      '03:00-05:00', // 寅时
      '05:00-07:00', // 卯时
      '07:00-09:00', // 辰时
      '09:00-11:00', // 巳时
      '11:00-13:00', // 午时
      '13:00-15:00', // 未时
      '15:00-17:00', // 申时
      '17:00-19:00', // 酉时
      '19:00-21:00', // 戌时
      '21:00-23:00', // 亥时
    ];
    
    int index;
    if (hour == 23) {
      index = 0;
    } else {
      index = ((hour + 1) / 2).floor();
    }
    return ranges[index % 12];
  }

  /// 计算五行分布
  static Map<String, int> _calculateFiveElements(
    String yearPillar,
    String monthPillar,
    String dayPillar,
    String hourPillar,
  ) {
    final allPillars = [yearPillar, monthPillar, dayPillar, hourPillar];
    final fiveElements = <String, int>{
      '木': 0,
      '火': 0,
      '土': 0,
      '金': 0,
      '水': 0,
    };

    // 天干五行对应表
    final tianGanWuXing = {
      '甲': '木', '乙': '木',
      '丙': '火', '丁': '火',
      '戊': '土', '己': '土',
      '庚': '金', '辛': '金',
      '壬': '水', '癸': '水',
    };

    // 地支五行对应表
    final diZhiWuXing = {
      '子': '水', '丑': '土', '寅': '木', '卯': '木',
      '辰': '土', '巳': '火', '午': '火', '未': '土',
      '申': '金', '酉': '金', '戌': '土', '亥': '水',
    };

    for (final pillar in allPillars) {
      if (pillar.length >= 2) {
        final tianGan = pillar[0];
        final diZhi = pillar[1];
        
        if (tianGanWuXing[tianGan] != null) {
          fiveElements[tianGanWuXing[tianGan]!] = 
            fiveElements[tianGanWuXing[tianGan]!]! + 1;
        }
        
        if (diZhiWuXing[diZhi] != null) {
          fiveElements[diZhiWuXing[diZhi]!] = 
            fiveElements[diZhiWuXing[diZhi]!]! + 1;
        }
      }
    }

    return fiveElements;
  }

  /// 获取节气信息
  static List<String> _getSolarTerms(Lunar lunar, int month, int day) {
    // 这里可以扩展更详细的节气计算
    // 目前返回简化版本
    final solarTerms = <String>[];
    
    // 简单的节气判断（实际应用中需要更精确的算法）
    switch (month) {
      case 2:
        if (day >= 3 && day <= 5) solarTerms.add('立春');
        if (day >= 18 && day <= 20) solarTerms.add('雨水');
        break;
      case 3:
        if (day >= 5 && day <= 7) solarTerms.add('惊蛰');
        if (day >= 20 && day <= 22) solarTerms.add('春分');
        break;
      case 4:
        if (day >= 4 && day <= 6) solarTerms.add('清明');
        if (day >= 19 && day <= 21) solarTerms.add('谷雨');
        break;
      case 5:
        if (day >= 5 && day <= 7) solarTerms.add('立夏');
        if (day >= 20 && day <= 22) solarTerms.add('小满');
        break;
    }
    
    return solarTerms;
  }

  /// 格式化日期
  static String _formatDate(DateTime date) {
    return '${date.year}年${date.month}月${date.day}日';
  }

  /// 验证日期是否有效
  static bool isValidBirthDate(DateTime date) {
    // 基本的日期验证
    if (date.year < 1900 || date.year > DateTime.now().year) {
      return false;
    }
    if (date.month < 1 || date.month > 12) {
      return false;
    }
    if (date.day < 1 || date.day > 31) {
      return false;
    }
    return true;
  }

  /// 获取最强的五行
  static String getStrongestElement(Map<String, int> fiveElements) {
    return fiveElements.entries
        .reduce((a, b) => a.value > b.value ? a : b)
        .key;
  }

  /// 获取最弱的五行
  static String getWeakestElement(Map<String, int> fiveElements) {
    return fiveElements.entries
        .reduce((a, b) => a.value < b.value ? a : b)
        .key;
  }

  /// 获取建议的用神五行
  static List<String> getRecommendedElements(Map<String, int> fiveElements) {
    final strongest = getStrongestElement(fiveElements);
    final weakest = getWeakestElement(fiveElements);
    
    // 简化的用神推荐逻辑
    final recommendations = <String>[];
    
    // 根据最强和最弱的五行推荐平衡的元素
    switch (strongest) {
      case '木':
        recommendations.addAll(['金', '火']);
        break;
      case '火':
        recommendations.addAll(['水', '木']);
        break;
      case '土':
        recommendations.addAll(['木', '水']);
        break;
      case '金':
        recommendations.addAll(['火', '土']);
        break;
      case '水':
        recommendations.addAll(['土', '金']);
        break;
    }
    
    return recommendations;
  }
}