// 占星宫位模型
class ZodiacSign {
  final String name;        // 星座英文名
  final String cnName;      // 星座中文名
  final String symbol;      // 星座符号
  final int number;         // 宫位序号 (1-12)
  final String dateRange;   // 日期范围
  final String element;     // 元素 (火土风水)
  final String quality;     // 性质 (基本固定变动)
  final String ruler;       // 守护行星

  ZodiacSign({
    required this.name,
    required this.cnName,
    required this.symbol,
    required this.number,
    required this.dateRange,
    required this.element,
    required this.quality,
    required this.ruler,
  });

  factory ZodiacSign.fromJson(Map<String, dynamic> json) {
    return ZodiacSign(
      name: json['name'] ?? '',
      cnName: json['cnName'] ?? json['cn_name'] ?? '',
      symbol: json['symbol'] ?? '',
      number: json['number'] ?? 1,
      dateRange: json['dateRange'] ?? json['date_range'] ?? '',
      element: json['element'] ?? '',
      quality: json['quality'] ?? '',
      ruler: json['ruler'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'cnName': cnName,
      'symbol': symbol,
      'number': number,
      'dateRange': dateRange,
      'element': element,
      'quality': quality,
      'ruler': ruler,
    };
  }
}

// 行星模型
class Planet {
  final String name;        // 行星名
  final String cnName;      // 中文名
  final String symbol;      // 符号
  final int position;       // 位置 (0-360)
  final String sign;        // 所在星座
  final int house;          // 所在宫位
  final double speed;       // 运行速度
  final bool retrograde;    // 是否逆行

  Planet({
    required this.name,
    required this.cnName,
    required this.symbol,
    required this.position,
    required this.sign,
    required this.house,
    required this.speed,
    this.retrograde = false,
  });

  factory Planet.fromJson(Map<String, dynamic> json) {
    return Planet(
      name: json['name'] ?? '',
      cnName: json['cnName'] ?? json['cn_name'] ?? '',
      symbol: json['symbol'] ?? '',
      position: json['position'] ?? 0,
      sign: json['sign'] ?? '',
      house: json['house'] ?? 1,
      speed: (json['speed'] ?? 0).toDouble(),
      retrograde: json['retrograde'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'cnName': cnName,
      'symbol': symbol,
      'position': position,
      'sign': sign,
      'house': house,
      'speed': speed,
      'retrograde': retrograde,
    };
  }
}

// 宫位模型
class House {
  final int number;        // 宫位号
  final String sign;        // 宫头星座
  final double position;    // 宫头位置

  House({
    required this.number,
    required this.sign,
    required this.position,
  });

  factory House.fromJson(Map<String, dynamic> json) {
    return House(
      number: json['number'] ?? 1,
      sign: json['sign'] ?? '',
      position: (json['position'] ?? 0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'number': number,
      'sign': sign,
      'position': position,
    };
  }
}

// 占星宫位系统模型
class AstrologyChart {
  final String chartId;
  final DateTime birthTime;
  final double latitude;     // 纬度
  final double longitude;    // 经度
  final List<Planet> planets;
  final String sunSign;      // 太阳星座
  final String moonSign;     // 月亮星座
  final String risingSign;   // 上升星座
  final List<House> houses;
  final DateTime createdAt;

  AstrologyChart({
    required this.chartId,
    required this.birthTime,
    required this.latitude,
    required this.longitude,
    required this.planets,
    required this.sunSign,
    required this.moonSign,
    required this.risingSign,
    required this.houses,
    required this.createdAt,
  });

  factory AstrologyChart.fromJson(Map<String, dynamic> json) {
    return AstrologyChart(
      chartId: json['chartId'] ?? json['chart_id'] ?? '',
      birthTime: DateTime.parse(json['birthTime'] ?? json['birth_time'] ?? DateTime.now().toIso8601String()),
      latitude: (json['latitude'] ?? 0).toDouble(),
      longitude: (json['longitude'] ?? 0).toDouble(),
      planets: (json['planets'] as List?)
          ?.map((item) => Planet.fromJson(item))
          .toList() ?? [],
      sunSign: json['sunSign'] ?? json['sun_sign'] ?? '',
      moonSign: json['moonSign'] ?? json['moon_sign'] ?? '',
      risingSign: json['risingSign'] ?? json['rising_sign'] ?? '',
      houses: (json['houses'] as List?)
          ?.map((item) => House.fromJson(item))
          .toList() ?? [],
      createdAt: DateTime.parse(json['createdAt'] ?? json['created_at'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'chartId': chartId,
      'birthTime': birthTime.toIso8601String(),
      'latitude': latitude,
      'longitude': longitude,
      'planets': planets.map((p) => p.toJson()).toList(),
      'sunSign': sunSign,
      'moonSign': moonSign,
      'risingSign': risingSign,
      'houses': houses.map((h) => h.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

// 占星宫位数据
class ZodiacSignData {
  final int house;          // 宫位号 (1-12)
  final String sign;        // 星座
  final String interpretation; // 解读

  ZodiacSignData({
    required this.house,
    required this.sign,
    required this.interpretation,
  });

  factory ZodiacSignData.fromJson(Map<String, dynamic> json) {
    return ZodiacSignData(
      house: json['house'] ?? 1,
      sign: json['sign'] ?? '',
      interpretation: json['interpretation'] ?? json['interpretation'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'house': house,
      'sign': sign,
      'interpretation': interpretation,
    };
  }
}

// 占星解读模型
class AstrologyInterpretation {
  final String personality;   // 性格
  final String career;        // 事业
  final String love;          // 感情
  final String health;        // 健康
  final String wealth;        // 财运
  final String luck;          // 运势
  final List<String> recommendations; // 建议

  AstrologyInterpretation({
    required this.personality,
    required this.career,
    required this.love,
    required this.health,
    required this.wealth,
    required this.luck,
    required this.recommendations,
  });

  factory AstrologyInterpretation.fromJson(Map<String, dynamic> json) {
    return AstrologyInterpretation(
      personality: json['personality'] ?? '',
      career: json['career'] ?? '',
      love: json['love'] ?? '',
      health: json['health'] ?? '',
      wealth: json['wealth'] ?? '',
      luck: json['luck'] ?? '',
      recommendations: List<String>.from(json['recommendations'] ?? []),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'personality': personality,
      'career': career,
      'love': love,
      'health': health,
      'wealth': wealth,
      'luck': luck,
      'recommendations': recommendations,
    };
  }
}

// 运势数据模型
class FortuneData {
  final String period;
  final String dateRange;
  final double overallScore;
  final String overallMood;
  final List<KeyTransit> keyTransits;
  final LifeAreas lifeAreas;
  final String advice;
  final int transitCount;

  FortuneData({
    required this.period,
    required this.dateRange,
    required this.overallScore,
    required this.overallMood,
    required this.keyTransits,
    required this.lifeAreas,
    required this.advice,
    required this.transitCount,
  });

  factory FortuneData.fromJson(Map<String, dynamic> json) {
    return FortuneData(
      period: json['period'] ?? '',
      dateRange: json['date_range'] ?? '',
      overallScore: (json['overall_score'] ?? 0).toDouble(),
      overallMood: json['overall_mood'] ?? '',
      keyTransits: (json['key_transits'] as List?)
          ?.map((item) => KeyTransit.fromJson(item))
          .toList() ?? [],
      lifeAreas: LifeAreas.fromJson(json['life_areas'] ?? {}),
      advice: json['advice'] ?? '',
      transitCount: json['transit_count'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'period': period,
      'date_range': dateRange,
      'overall_score': overallScore,
      'overall_mood': overallMood,
      'key_transits': keyTransits.map((t) => t.toJson()).toList(),
      'life_areas': lifeAreas.toJson(),
      'advice': advice,
      'transit_count': transitCount,
    };
  }
}

// 关键行运模型
class KeyTransit {
  final String planet;
  final String aspect;
  final double intensity;
  final String influence;

  KeyTransit({
    required this.planet,
    required this.aspect,
    required this.intensity,
    required this.influence,
  });

  factory KeyTransit.fromJson(Map<String, dynamic> json) {
    return KeyTransit(
      planet: json['planet'] ?? '',
      aspect: json['aspect'] ?? '',
      intensity: (json['intensity'] ?? 0).toDouble(),
      influence: json['influence'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'planet': planet,
      'aspect': aspect,
      'intensity': intensity,
      'influence': influence,
    };
  }
}

// 生活领域模型
class LifeAreas {
  final double career;
  final double love;
  final double health;
  final double wealth;

  LifeAreas({
    required this.career,
    required this.love,
    required this.health,
    required this.wealth,
  });

  factory LifeAreas.fromJson(Map<String, dynamic> json) {
    return LifeAreas(
      career: (json['career'] ?? 0).toDouble(),
      love: (json['love'] ?? 0).toDouble(),
      health: (json['health'] ?? 0).toDouble(),
      wealth: (json['wealth'] ?? 0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'career': career,
      'love': love,
      'health': health,
      'wealth': wealth,
    };
  }
}