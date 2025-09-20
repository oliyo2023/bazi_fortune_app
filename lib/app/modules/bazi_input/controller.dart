import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lunar/lunar.dart';
import '../../data/services/api_service.dart';
import '../../data/services/auth_service.dart';

import '../profile/controller.dart';

class BaziInputController extends GetxController {
  final nameController = TextEditingController();
  
  final RxInt selectedGender = 0.obs; // 0: 男, 1: 女
  final RxBool isLunarCalendar = false.obs;
  final RxString selectedLocation = '北京市'.obs;
  
  // 生日选择
  final Rx<DateTime> selectedDate = DateTime.now().obs;
  final Rx<TimeOfDay> selectedTime = TimeOfDay.now().obs;
  
  final RxBool isLoading = false.obs;
  final RxBool isCalculating = false.obs;

  @override
  void onClose() {
    nameController.dispose();
    super.onClose();
  }

  void selectGender(int gender) {
    selectedGender.value = gender;
  }

  void toggleCalendarType() {
    isLunarCalendar.value = !isLunarCalendar.value;
  }

  Future<void> selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: Get.context!,
      initialDate: selectedDate.value,
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
      locale: Locale('zh', 'CN'),
    );
    
    if (picked != null) {
      selectedDate.value = picked;
    }
  }

  Future<void> selectTime() async {
    final TimeOfDay? picked = await showTimePicker(
      context: Get.context!,
      initialTime: selectedTime.value,
    );
    
    if (picked != null) {
      selectedTime.value = picked;
    }
  }

  Future<void> selectLocation() async {
    // 这里可以实现地区选择器
    final locations = [
      '北京市', '上海市', '广州市', '深圳市', '杭州市', 
      '南京市', '成都市', '重庆市', '西安市', '武汉市'
    ];
    
    final selected = await Get.bottomSheet(
      Container(
        height: 300,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(16),
              child: Text(
                '选择出生地区',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: locations.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(locations[index]),
                    onTap: () => Get.back(result: locations[index]),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
    
    if (selected != null) {
      selectedLocation.value = selected;
    }
  }

  String get formattedDate {
    if (isLunarCalendar.value) {
      final lunar = Lunar.fromDate(selectedDate.value);
      return '${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}';
    } else {
      return '${selectedDate.value.year}年${selectedDate.value.month}月${selectedDate.value.day}日';
    }
  }

  String get formattedTime {
    return '${selectedTime.value.hour.toString().padLeft(2, '0')}:${selectedTime.value.minute.toString().padLeft(2, '0')}';
  }

  bool get canCalculate {
    return nameController.text.trim().isNotEmpty;
  }

  Future<void> calculateBazi() async {
    // 1) 基本校验
    if (!canCalculate) {
      Get.snackbar('提示', '请填写完整信息');
      return;
    }

    // 2) 登录校验：未登录先去登录
    if (!AuthService.to.isAuthenticated) {
      Get.snackbar('提示', '请先登录');
      Get.toNamed('/login');
      return;
    }

    // 3) 已登录：先写入排盘记录 → 后端计算 → 回填结果 → 跳转结果页
    isCalculating.value = true;
    try {
      final id = await ApiService.to.createBaziRecord(
        name: nameController.text.trim(),
        gender: selectedGender.value == 0 ? 'male' : 'female',
        lunarCalendar: isLunarCalendar.value,
        birthYear: selectedDate.value.year,
        birthMonth: selectedDate.value.month,
        birthDay: selectedDate.value.day,
        birthHour: selectedTime.value.hour,
        birthMinute: selectedTime.value.minute,
        location: selectedLocation.value,
        timezone: 'Asia/Shanghai',
      );

      // 后台计算（调用已有后端计算接口）
      final result = await ApiService.to.calculateBazi(
        birthYear: selectedDate.value.year,
        birthMonth: selectedDate.value.month,
        birthDay: selectedDate.value.day,
        birthHour: selectedTime.value.hour,
        birthMinute: selectedTime.value.minute,
        gender: selectedGender.value == 0 ? 'male' : 'female',
        lunarCalendar: isLunarCalendar.value,
        timezone: 'Asia/Shanghai',
      );

      // 回填结果
      await ApiService.to.updateBaziResult(id, result);

      // 刷新“历史记录”页数据（如果控制器已注册则触发刷新）
      if (Get.isRegistered<ProfileController>()) {
        try {
          Get.find<ProfileController>().loadBaziHistory();
        } catch (_) {}
      }

      // 跳转结果页
      Get.toNamed('/result', arguments: {
        'bazi': result,
        'name': nameController.text.trim(),
      });

      Get.snackbar(
        '计算完成',
        '已保存并生成结果',
        backgroundColor: Colors.green,
        colorText: Colors.white,
      );
    } catch (e) {
      Get.snackbar(
        '处理失败',
        e.toString(),
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isCalculating.value = false;
    }
  }

  // 获取时辰名称
  String getChineseHour(int hour) {
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
}