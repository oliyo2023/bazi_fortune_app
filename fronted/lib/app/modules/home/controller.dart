import 'package:get/get.dart';
import 'package:intl/intl.dart'; // 用来格式化日期
import 'package:lunar/lunar.dart'; // 农历库
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:city_pickers/city_pickers.dart';
import '../../data/services/auth_service.dart';
import '../../data/services/api_service.dart';
import '../../widgets/bazi_time_picker_bottom_sheet.dart';

class HomeController extends GetxController {
  // 万年历数据
  final RxString lunarDate = '七月廿三'.obs;
  final RxString solarDate = ''.obs;
  final RxString weekDay = ''.obs;
  final RxString solarTerm = '白露(第8天)'.obs;
  final RxString yearZodiac = '蛇年'.obs;
  final RxInt weekOfYear = 0.obs;

  // 宜忌列表
  final RxList<String> suitableItems = <String>[
    '嫁娶',
    '纳采',
    '订盟',
    '祭祀',
    '祈福',
    '开光',
    '出行',
    '理发',
    '作灶',
    '出火',
    '拆卸',
    '修造',
    '动土',
    '进人口',
    '入宅',
    '移徙',
    '安床',
    '挂匾',
    '栽种',
    '纳畜',
    '破土',
    '安葬',
    '入殓',
    '除服',
    '成服',
  ].obs;

  final RxList<String> unsuitableItems = <String>[
    '开市',
    '掘井',
    '开渠',
    '造桥',
    '造船',
  ].obs;

  // 排盘输入数据
  final RxInt selectedGender = 0.obs; // 0 for 男, 1 for 女
  final RxInt selectedChartType = 0.obs; // 0 for 四柱盘, 1 for 紫微盘, etc.

  // 首页表单字段
  final Rx<DateTime?> birthDateTime = Rx<DateTime?>(null);
  final RxString birthRegion = ''.obs;
  final RxString name = ''.obs;
  final RxBool trueSolarTime = false.obs;

  // 姓名输入控制器，避免在构建期触发 Obx 更新
  final TextEditingController nameController = TextEditingController();

  // 提交状态
  final RxBool submitting = false.obs;

  // UI 开关：是否保存记录、分组名称（用于姓名行右侧控件）
  final RxBool saveRecord = true.obs;
  final RxString groupName = '未分组'.obs;

  @override
  void onInit() {
    super.onInit();
    _loadDateInfo();
  }

  @override
  void onClose() {
    // 不销毁 nameController，避免 Tab 切换或控制器回收导致
    // 已挂载的 TextField 仍引用旧 controller 而崩溃
    super.onClose();
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

  // 选择生辰（日期+时间）- 使用自定义“时辰选择器”底部弹层（支持四柱/公历/农历/输入）
  Future<void> pickBirthDateTime(BuildContext context) async {
    final DateTime initial = birthDateTime.value ?? DateTime.now();
    final result = await showBaziTimePickerBottomSheet(
      context,
      initial: initial,
      initialLunar: false,
    );
    if (result == null) return;
    final dt = result.dateTime;
    birthDateTime.value = dt;
    Get.snackbar(
      '已选择',
      DateFormat('yyyy-MM-dd HH:mm').format(dt) + (result.isLunar ? '（农历）' : '（公历）'),
      snackPosition: SnackPosition.BOTTOM,
      duration: const Duration(seconds: 1),
    );
  }

  // 选择出生地区（使用 city_pickers 三联动省/市/区）
  Future<void> pickRegion(BuildContext context) async {
    final res = await CityPickers.showCityPicker(
      context: context,
      height: 260,
      cancelWidget: const Text('清空', style: TextStyle(color: Color(0xFF7C3AED))),
      confirmWidget: const Text('确定', style: TextStyle(color: Color(0xFF7C3AED))),
    );
    if (res == null) {
      birthRegion.value = '';
      return;
    }
    final province = res.provinceName ?? '';
    final city = res.cityName ?? '';
    final area = res.areaName ?? '';
    final text = <String>[province, city, area].where((e) => e.isNotEmpty).join(' ');
    birthRegion.value = text;
    if (text.isNotEmpty) {
      Get.snackbar('已选择', '出生地区：$text',
          snackPosition: SnackPosition.BOTTOM, duration: const Duration(seconds: 1));
    }
  }

  // 提交排盘（不跳转，直接入库）
  Future<void> submitBazi() async {
    if (submitting.value) return;
    // 未登录则先去登录，不发请求
    if (!AuthService.to.isAuthenticated) {
      Get.toNamed('/login');
      return;
    }
    // 校验
    if (name.value.trim().isEmpty) {
      Get.snackbar('hint'.tr, 'please_enter_name'.tr);
      return;
    }
    if (birthDateTime.value == null) {
      Get.snackbar('hint'.tr, 'please_select_birth'.tr);
      return;
    }
    if (birthRegion.value.trim().isEmpty) {
      Get.snackbar('hint'.tr, 'place_required'.tr);
      return;
    }

    submitting.value = true;
    try {
      final dt = birthDateTime.value!;
      final genderText = selectedGender.value == 0 ? 'male' : 'female';
      final id = await ApiService.to.createBaziRecord(
        name: name.value.trim(),
        gender: genderText,
        lunarCalendar: false, // 先按公历，真太阳时仅影响换算，后端可再做处理
        birthYear: dt.year,
        birthMonth: dt.month,
        birthDay: dt.day,
        birthHour: dt.hour,
        birthMinute: dt.minute,
        location: birthRegion.value, // 暂传文本
        timezone: 'Asia/Shanghai',
      );
      Get.snackbar('success'.tr, '${'chart_created'.tr}：$id');
    } catch (e) {
      Get.snackbar('submit_failed'.tr, e.toString());
    } finally {
      submitting.value = false;
    }
  }

  void goToBaziInput() {
    if (AuthService.to.isAuthenticated) {
      Get.toNamed('/bazi-input');
    } else {
      Get.toNamed('/login');
    }
  }

  void goToLogin() {
    Get.toNamed('/login');
  }
}
