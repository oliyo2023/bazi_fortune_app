import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../data/services/auth_service.dart';

class SettingsController extends GetxController {
  var notificationsEnabled = true.obs;
  var selectedLanguage = 'chinese'.tr.obs;

  static const String currentAppVersion = '1.0.0';
  var appVersion = currentAppVersion.obs;

  var isCheckingUpdate = false.obs;
  var updateAvailable = false.obs;
  var latestVersion = ''.obs;
  var updateUrl = ''.obs;

  var userRole = 'ordinary_user'.tr.obs;

  @override
  void onInit() {
    super.onInit();
    selectedLanguage.value = 'chinese'.tr;
    appVersion.value = currentAppVersion;
    userRole.value = userRole.value;
  }

  Future<void> checkForUpdate() async {
    if (isCheckingUpdate.value) return;

    isCheckingUpdate.value = true;
    updateAvailable.value = false;

    try {
      await _simulateUpdateCheck();
    } finally {
      isCheckingUpdate.value = false;
    }
  }

  Future<void> _simulateUpdateCheck() async {
    await Future.delayed(const Duration(seconds: 1));

    latestVersion.value = '1.0.1';

    final currentVersion = _parseVersion(appVersion.value);
    final newVersion = _parseVersion(latestVersion.value);

    if (_compareVersions(currentVersion, newVersion) < 0) {
      updateAvailable.value = true;
      Get.snackbar('发现新版本', '最新版本: ${latestVersion.value}');
    } else {
      Get.snackbar('提示', '已是最新版');
    }
  }

  List<int> _parseVersion(String version) {
    final parts = version.split('.');
    return parts.map((e) => int.tryParse(e) ?? 0).toList();
  }

  int _compareVersions(List<int> v1, List<int> v2) {
    final maxLength = v1.length > v2.length ? v1.length : v2.length;
    for (var i = 0; i < maxLength; i++) {
      final part1 = i < v1.length ? v1[i] : 0;
      final part2 = i < v2.length ? v2[i] : 0;
      if (part1 != part2) {
        return part1 - part2;
      }
    }
    return 0;
  }

  void toggleNotifications(bool value) {
    notificationsEnabled.value = value;
  }

  void changeLanguage(String lang) {
    selectedLanguage.value = lang;
  }

  void clearCache() {
    Get.snackbar('hint'.tr, 'cache_cleared'.tr);
  }

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
