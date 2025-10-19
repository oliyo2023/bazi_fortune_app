import 'package:get/get.dart';
import '../models/astrology_model.dart';
import '../models/astrology_constants.dart';

class AstrologyController extends GetxController {
  // 响应式变量
  final RxBool isLoading = false.obs;
  final Rx<AstrologyChart?> astrologyChart = Rx<AstrologyChart?>(null);
  final Rx<AstrologyInterpretation?> interpretation = Rx<AstrologyInterpretation?>(null);
  
  // 选中的宫位
  final RxInt selectedHouse = 0.obs;
  
  // 用户信息
  late DateTime birthDateTime;
  late double latitude;
  late double longitude;

  // 初始化占星图表
  Future<void> initializeChart({
    required DateTime birthTime,
    required double lat,
    required double lng,
  }) async {
    isLoading.value = true;
    birthDateTime = birthTime;
    latitude = lat;
    longitude = lng;

    try {
      // 计算占星图表数据
      final chart = await _calculateChart(birthTime, lat, lng);
      astrologyChart.value = chart;
      
      // 生成占星解读
      final interp = await _generateInterpretation(chart);
      interpretation.value = interp;
    } catch (e) {
      Get.snackbar('错误', '占星计算失败: $e');
    } finally {
      isLoading.value = false;
    }
  }

  // 计算占星图表
  Future<AstrologyChart> _calculateChart(
    DateTime birthTime,
    double latitude,
    double longitude,
  ) async {
    // 这里应该调用真实的占星计算库或API
    // 为演示目的，我们生成模拟数据
    
    // 获取太阳星座、月亮星座等
    final sunSignNumber = AstrologyConstants.getZodiacNumberByDate(birthTime);
    final sunSign = AstrologyConstants.getZodiacName(sunSignNumber);
    
    // 模拟月亮星座（实际需要复杂计算）
    final moonSignNumber = (sunSignNumber + 5) % 12;
    final moonSign = AstrologyConstants.getZodiacName(
      moonSignNumber == 0 ? 12 : moonSignNumber
    );
    
    // 模拟上升星座
    final risingSignNumber = (sunSignNumber + 3) % 12;
    final risingSign = AstrologyConstants.getZodiacName(
      risingSignNumber == 0 ? 12 : risingSignNumber
    );

    // 生成行星数据
    final planets = _generatePlanets();
    
    // 生成12宫位数据
    final houses = _generateHouses();

    return AstrologyChart(
      chartId: '${birthTime.millisecondsSinceEpoch}',
      birthTime: birthTime,
      latitude: latitude,
      longitude: longitude,
      planets: planets,
      sunSign: sunSign,
      moonSign: moonSign,
      risingSign: risingSign,
      houses: houses,
    );
  }

  // 生成行星数据
  List<Planet> _generatePlanets() {
    final planets = <Planet>[];
    final planetNames = AstrologyConstants.planets;
    final planetNamesCn = AstrologyConstants.planetsCn;

    for (int i = 0; i < planetNames.length; i++) {
      final position = (i * 30 + 45) % 360;
      final signNumber = (position ~/ 30) + 1;
      final sign = AstrologyConstants.getZodiacName(signNumber);
      
      planets.add(Planet(
        name: planetNames[i],
        cnName: planetNamesCn[i],
        symbol: _getPlanetSymbol(i),
        position: position.toInt(),
        sign: sign,
        house: (position ~/ 30) + 1,
        speed: (i + 1) * 0.5,
      ));
    }

    return planets;
  }

  // 生成宫位数据
  List<ZodiacSignData> _generateHouses() {
    final houses = <ZodiacSignData>[];

    for (int i = 1; i <= 12; i++) {
      final sign = AstrologyConstants.getZodiacName(i);
      final meaning = AstrologyConstants.getHouseMeaning(i);
      
      houses.add(ZodiacSignData(
        house: i,
        sign: sign,
        interpretation: meaning,
      ));
    }

    return houses;
  }

  // 获取行星符号
  String _getPlanetSymbol(int index) {
    const symbols = ['☉', '☽', '☿', '♀', '♂', '♃', '♄', '♅', '♆', '♇'];
    return index < symbols.length ? symbols[index] : '?';
  }

  // 生成占星解读
  Future<AstrologyInterpretation> _generateInterpretation(
    AstrologyChart chart,
  ) async {
    // 这里应该使用AI或预设的解读模板
    // 为演示目的，我们返回模拟数据
    
    return AstrologyInterpretation(
      personality: '${chart.sunSign}位置的太阳表明你是个有决心的人',
      career: '${chart.moonSign}位置的月亮预示你在创意工作中会表现突出',
      love: '${chart.risingSign}上升星座暗示你在人际关系中很有吸引力',
      health: '你需要关注身体的平衡和充足的休息',
      wealth: '你有积累财富的潜力，需要学会投资理财',
      luck: '今年整体运势平稳，会有不少机遇出现',
      recommendations: [
        '加强自律和专注力的培养',
        '与他人建立更深层的联系',
        '投资于个人成长和学习',
      ],
    );
  }

  // 选择宫位
  void selectHouse(int house) {
    selectedHouse.value = house;
  }

  // 获取宫位详情
  String getHouseDetail(int house) {
    if (astrologyChart.value == null) return '';
    
    final houseData = astrologyChart.value!.houses
        .firstWhere((h) => h.house == house, orElse: () => astrologyChart.value!.houses[0]);
    
    return '${houseData.sign} - ${houseData.interpretation}';
  }
}
