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

  Planet({
    required this.name,
    required this.cnName,
    required this.symbol,
    required this.position,
    required this.sign,
    required this.house,
    required this.speed,
  });
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
  final List<ZodiacSignData> houses;

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
  });
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
}
