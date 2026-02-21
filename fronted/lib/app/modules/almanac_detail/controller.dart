import 'package:get/get.dart';
import 'package:lunar/lunar.dart';

import '../../data/models/almanac_model.dart';
import '../../data/services/api_service.dart';
import '../../data/services/auth_service.dart';

class AlmanacDetailController extends GetxController {
  final Rx<DateTime> _selectedDate = DateTime.now().obs;
  DateTime get selectedDate => _selectedDate.value;

  final monthTitle = ''.obs;
  final lunarLine = ''.obs;

  final yiList = ''.obs;
  final jiList = ''.obs;

  final sideActionText = '吉日\n查询'.obs;

  final wuXing = ''.obs;
  final chongSha = ''.obs;
  final zhiShen = ''.obs;
  final shenYiQu = ''.obs;
  final taiShen = ''.obs;
  final xiongShen = ''.obs;
  final baiLu = ''.obs;
  final jianChu = ''.obs;

  final hours = <Map<String, Object>>[].obs;

  final currentHourTitle = ''.obs;
  final xiShen = ''.obs;
  final hourYi = ''.obs;
  final hourJi = ''.obs;

  final isLoading = false.obs;
  final errorMessage = ''.obs;

  @override
  void onInit() {
    super.onInit();
    ever(_selectedDate, (date) => updateAlmanacData(date));
    updateAlmanacData(selectedDate);
  }

  Future<void> updateAlmanacData(DateTime date) async {
    if (!AuthService.to.isAuthenticated) {
      if (Get.currentRoute != '/login') {
        Get.toNamed('/login');
      }
      _applyLocalFallback(date);
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    try {
      final data = await ApiService.to.getOrGenerateAlmanac(date: date);
      _applyApiData(data);
    } catch (e) {
      errorMessage.value = e.toString().replaceFirst('Exception: ', '');
      _applyLocalFallback(date);
      Get.snackbar('提示', '黄历服务暂不可用，已切换本地数据');
    } finally {
      isLoading.value = false;
    }
  }

  void _applyApiData(AlmanacModel data) {
    monthTitle.value = data.monthTitle;
    lunarLine.value = data.lunarLine;

    yiList.value = data.yi.join(' ');
    jiList.value = data.ji.join(' ');

    wuXing.value = '五行\n${data.wuXing}';
    chongSha.value = '冲煞\n${data.chongSha}';
    zhiShen.value = '值神\n${data.zhiShen}';
    shenYiQu.value = '吉神宜趋\n\n${data.shenYiQu}';
    taiShen.value = '今日胎神\n\n${data.taiShen}';
    xiongShen.value = '凶神宜忌\n\n${data.xiongShen.join(' ')}';
    baiLu.value = '彭祖百忌\n\n${data.baiLu}';
    jianChu.value = data.zhiShen;

    hours.value = data.hours
        .map((item) => <String, Object>{
              'label': item.label,
              'status': item.status.isEmpty ? '平' : item.status,
              'active': item.active,
            })
        .toList();

    currentHourTitle.value = data.currentHourTitle;
    xiShen.value = data.xiShen;
    hourYi.value = data.hourYi.join(' ');
    hourJi.value = data.hourJi.join(' ');
  }

  void _applyLocalFallback(DateTime date) {
    final lunar = Lunar.fromDate(date);

    monthTitle.value = '${lunar.getMonthInChinese()}月 ${lunar.getDayInChinese()}';
    lunarLine.value =
        '公历 ${lunar.getYear()}年${lunar.getMonth()}月${lunar.getDay()}日 农历 ${lunar.getYearInGanZhi()}${lunar.getYearShengXiao()}年 ${lunar.getMonthInGanZhi()}月${lunar.getDayInGanZhi()}日 ${lunar.getWeekInChinese()}';

    yiList.value = lunar.getDayYi().join(' ');
    jiList.value = lunar.getDayJi().join(' ');

    wuXing.value = '五行\n${lunar.getDayNaYin()}';
    chongSha.value = '冲煞\n冲${lunar.getDayChongShengXiao()}煞${lunar.getDaySha()}';
    zhiShen.value = '值神\n${lunar.getZhiXing()}';
    shenYiQu.value = '吉神宜趋\n\n数据加载中';
    taiShen.value = '今日胎神\n\n数据加载中';
    xiongShen.value = '凶神宜忌\n\n数据加载中';
    baiLu.value = '彭祖百忌\n\n数据加载中';
    jianChu.value = lunar.getZhiXing();

    final hourLabels = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    hours.value = hourLabels
        .map((label) => <String, Object>{
              'label': label,
              'status': '平',
              'active': false,
            })
        .toList();

    currentHourTitle.value = '当前时辰';
    xiShen.value = '';
    hourYi.value = '';
    hourJi.value = '';
  }

  void nextDay() {
    _selectedDate.value = selectedDate.add(const Duration(days: 1));
  }

  void prevDay() {
    _selectedDate.value = selectedDate.subtract(const Duration(days: 1));
  }
}
