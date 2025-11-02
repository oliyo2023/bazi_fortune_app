import 'package:get/get.dart';
import '../../../data/services/astrology_service.dart';
import '../models/astrology_model.dart' as astro;

class FortuneController extends GetxController {
  final AstrologyService _astrologyService = AstrologyService.to;
  
  // 响应式变量
  final RxBool isLoading = false.obs;
  final Rx<astro.FortuneData?> todayFortune = Rx<astro.FortuneData?>(null);
  final Rx<astro.FortuneData?> tomorrowFortune = Rx<astro.FortuneData?>(null);
  final Rx<astro.FortuneData?> weekFortune = Rx<astro.FortuneData?>(null);
  final Rx<astro.FortuneData?> monthFortune = Rx<astro.FortuneData?>(null);
  
  // 用户出生数据
  RxInt birthYear = 1990.obs;
  RxInt birthMonth = 1.obs;
  RxInt birthDay = 1.obs;
  RxInt birthHour = 12.obs;
  RxInt birthMinute = 0.obs;
  RxString birthCity = "北京".obs;
  
  // 当前选中的运势类型
  final RxString selectedFortuneType = "today".obs;

  @override
  void onInit() {
    super.onInit();
    // 可以在这里加载保存的用户出生数据
    _loadSavedBirthData();
  }

  // 加载保存的出生数据
  void _loadSavedBirthData() {
    // 这里可以从本地存储加载用户之前输入的出生数据
    // 暂时使用默认值
  }

  // 更新出生数据
  void updateBirthData({
    int? year,
    int? month,
    int? day,
    int? hour,
    int? minute,
    String? city,
  }) {
    if (year != null) birthYear.value = year;
    if (month != null) birthMonth.value = month;
    if (day != null) birthDay.value = day;
    if (hour != null) birthHour.value = hour;
    if (minute != null) birthMinute.value = minute;
    if (city != null) birthCity.value = city;
  }

  // 获取今日运势
  Future<void> getTodayFortune() async {
    if (_isBirthDataValid()) {
      await _loadFortune('today');
    } else {
      Get.snackbar('提示', '请先完善出生信息');
    }
  }

  // 获取明日运势
  Future<void> getTomorrowFortune() async {
    if (_isBirthDataValid()) {
      await _loadFortune('tomorrow');
    } else {
      Get.snackbar('提示', '请先完善出生信息');
    }
  }

  // 获取本周运势
  Future<void> getWeekFortune() async {
    if (_isBirthDataValid()) {
      await _loadFortune('week');
    } else {
      Get.snackbar('提示', '请先完善出生信息');
    }
  }

  // 获取本月运势
  Future<void> getMonthFortune() async {
    if (_isBirthDataValid()) {
      await _loadFortune('month');
    } else {
      Get.snackbar('提示', '请先完善出生信息');
    }
  }

  // 加载运势数据
  Future<void> _loadFortune(String type) async {
    try {
      isLoading.value = true;
      selectedFortuneType.value = type;

      astro.FortuneData? fortuneData;

      switch (type) {
        case 'today':
          fortuneData = await _astrologyService.getTodayFortune(
            year: birthYear.value,
            month: birthMonth.value,
            day: birthDay.value,
            hour: birthHour.value,
            minute: birthMinute.value,
            city: birthCity.value,
          );
          todayFortune.value = fortuneData;
          break;
        case 'tomorrow':
          fortuneData = await _astrologyService.getTomorrowFortune(
            year: birthYear.value,
            month: birthMonth.value,
            day: birthDay.value,
            hour: birthHour.value,
            minute: birthMinute.value,
            city: birthCity.value,
          );
          tomorrowFortune.value = fortuneData;
          break;
        case 'week':
          fortuneData = await _astrologyService.getWeekFortune(
            year: birthYear.value,
            month: birthMonth.value,
            day: birthDay.value,
            hour: birthHour.value,
            minute: birthMinute.value,
            city: birthCity.value,
          );
          weekFortune.value = fortuneData;
          break;
        case 'month':
          fortuneData = await _astrologyService.getMonthFortune(
            year: birthYear.value,
            month: birthMonth.value,
            day: birthDay.value,
            hour: birthHour.value,
            minute: birthMinute.value,
            city: birthCity.value,
          );
          monthFortune.value = fortuneData;
          break;
      }
    } catch (e) {
      Get.snackbar('错误', '获取运势失败: $e');
    } finally {
      isLoading.value = false;
    }
  }

  // 验证出生数据是否有效
  bool _isBirthDataValid() {
    return birthYear.value > 1900 &&
        birthMonth.value >= 1 && birthMonth.value <= 12 &&
        birthDay.value >= 1 && birthDay.value <= 31 &&
        birthHour.value >= 0 && birthHour.value <= 23 &&
        birthMinute.value >= 0 && birthMinute.value <= 59 &&
        birthCity.value.isNotEmpty;
  }

  // 获取当前显示的运势数据
  astro.FortuneData? get currentFortune {
    switch (selectedFortuneType.value) {
      case 'today':
        return todayFortune.value;
      case 'tomorrow':
        return tomorrowFortune.value;
      case 'week':
        return weekFortune.value;
      case 'month':
        return monthFortune.value;
      default:
        return null;
    }
  }

  // 获取运势评分颜色
  String getScoreColor(double score) {
    if (score >= 0.8) {
      return '#4CAF50'; // 绿色 - 极佳
    } else if (score >= 0.6) {
      return '#8BC34A'; // 浅绿 - 积极
    } else if (score >= 0.4) {
      return '#FF9800'; // 橙色 - 平稳
    } else {
      return '#F44336'; // 红色 - 需谨慎
    }
  }

  // 获取运势心情文字
  String getMoodEmoji(String mood) {
    switch (mood) {
      case '极佳':
        return '😄';
      case '积极':
        return '😊';
      case '平稳':
        return '😐';
      case '需谨慎':
        return '😟';
      default:
        return '😐';
    }
  }

  // 获取生活领域图标
  String getLifeAreaIcon(String area) {
    switch (area) {
      case 'career':
        return '💼';
      case 'love':
        return '❤️';
      case 'health':
        return '🏃';
      case 'wealth':
        return '💰';
      default:
        return '⭐';
    }
  }

  // 获取生活领域名称
  String getLifeAreaName(String area) {
    switch (area) {
      case 'career':
        return '事业';
      case 'love':
        return '爱情';
      case 'health':
        return '健康';
      case 'wealth':
        return '财运';
      default:
        return '综合';
    }
  }

  // 刷新所有运势
  Future<void> refreshAllFortune() async {
    if (_isBirthDataValid()) {
      try {
        isLoading.value = true;
        
        // 并行加载所有类型的运势
        final futures = await Future.wait([
          _astrologyService.getTodayFortune(
            year: birthYear.value,
            month: birthMonth.value,
            day: birthDay.value,
            hour: birthHour.value,
            minute: birthMinute.value,
            city: birthCity.value,
          ),
          _astrologyService.getTomorrowFortune(
            year: birthYear.value,
            month: birthMonth.value,
            day: birthDay.value,
            hour: birthHour.value,
            minute: birthMinute.value,
            city: birthCity.value,
          ),
          _astrologyService.getWeekFortune(
            year: birthYear.value,
            month: birthMonth.value,
            day: birthDay.value,
            hour: birthHour.value,
            minute: birthMinute.value,
            city: birthCity.value,
          ),
          _astrologyService.getMonthFortune(
            year: birthYear.value,
            month: birthMonth.value,
            day: birthDay.value,
            hour: birthHour.value,
            minute: birthMinute.value,
            city: birthCity.value,
          ),
        ]);

        todayFortune.value = futures[0];
        tomorrowFortune.value = futures[1];
        weekFortune.value = futures[2];
        monthFortune.value = futures[3];
        
        Get.snackbar('成功', '运势数据已更新');
      } catch (e) {
        Get.snackbar('错误', '刷新运势失败: $e');
      } finally {
        isLoading.value = false;
      }
    } else {
      Get.snackbar('提示', '请先完善出生信息');
    }
  }

  // 清除所有运势数据
  void clearAllFortune() {
    todayFortune.value = null;
    tomorrowFortune.value = null;
    weekFortune.value = null;
    monthFortune.value = null;
  }

  // 获取出生日期字符串
  String get birthDateString {
    return '${birthYear.value}年${birthMonth.value}月${birthDay.value}日 ${birthHour.value}时${birthMinute.value}分';
  }
}