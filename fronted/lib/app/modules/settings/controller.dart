import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../data/services/auth_service.dart';

class SettingsController extends GetxController {
  // 通知开关（保留逻辑，UI已简化）
  var notificationsEnabled = true.obs;

  // 语言选择（保留逻辑，后续可能挂到“通用”里）
  var selectedLanguage = 'chinese'.tr.obs;

  // 版本信息（保留）
  var appVersion = '1.0.0'.obs;

  // 身份（用于设置页右侧灰字显示）
  var userRole = 'ordinary_user'.tr.obs;

  @override
  void onInit() {
    super.onInit();
    selectedLanguage.value = 'chinese'.tr;
    appVersion.value = '1.0.0';
    userRole.value = userRole.value; // 占位，未来可从用户资料加载
  }

  // 切换通知
  void toggleNotifications(bool value) {
    notificationsEnabled.value = value;
  }

  // 切换语言
  void changeLanguage(String lang) {
    selectedLanguage.value = lang;
    // 可扩展：Get.updateLocale(...)
  }

  // 清除缓存
  void clearCache() {
    Get.snackbar('hint'.tr, 'cache_cleared'.tr);
  }

  // 退出登录
  void logout() {
    Get.dialog(
      AlertDialog(
        title: Text('logout'.tr),
        content: Text('logout_confirm'.tr),
        actions: [
          TextButton(onPressed: () => Get.back(), child: Text('cancel'.tr)),
          TextButton(
            onPressed: () {
              Get.back();
              Get.find<AuthService>().logout();
              Get.offAllNamed('/login');
            },
            child: Text('confirm'.tr),
          ),
        ],
      ),
    );
  }
}
