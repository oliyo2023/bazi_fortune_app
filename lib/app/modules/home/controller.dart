import 'package:get/get.dart';
import 'package:intl/intl.dart'; // 用来格式化日期
import 'package:lunar/lunar.dart'; // 农历库

class HomeController extends GetxController {
  // 万年历数据
  final RxString lunarDate = '七月廿三'.obs;
  final RxString solarDate = ''.obs;
  final RxString weekDay = ''.obs;
  final RxString solarTerm = '白露(第8天)'.obs;
  final RxString yearZodiac = '蛇年'.obs;
  final RxInt weekOfYear = 0.obs;

  // 排盘输入数据
  final RxInt selectedGender = 0.obs; // 0 for 男, 1 for 女
  final RxInt selectedChartType = 0.obs; // 0 for 四柱盘, 1 for 紫微盘, etc.

  @override
  void onInit() {
    super.onInit();
    _loadDateInfo();
  }

  void _loadDateInfo() {
    final now = DateTime.now();
    solarDate.value = DateFormat('M月d日').format(now);
    weekDay.value = DateFormat('EEEE', 'zh_CN').format(now); // 指定中文 locale

    // 计算一年中的第几周
    final firstDayOfYear = DateTime(now.year, 1, 1);
    final dayOfYear = now.difference(firstDayOfYear).inDays;
    weekOfYear.value = (dayOfYear / 7).ceil();

    // 使用lunar库计算农历信息
    final lunar = Lunar.fromDate(now);
    lunarDate.value = '${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}';
    yearZodiac.value = '${lunar.getYearShengXiao()}年';

    // 获取节气信息
    final jieQi = lunar.getJieQi();
    if (jieQi.isNotEmpty) {
      solarTerm.value = jieQi;
    } else {
      solarTerm.value = '无节气';
    }
  }

  void selectGender(int index) {
    selectedGender.value = index;
  }

  void selectChartType(int index) {
    selectedChartType.value = index;
  }
}
