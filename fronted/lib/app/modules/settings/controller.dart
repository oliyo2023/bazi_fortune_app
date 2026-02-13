import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../data/services/auth_service.dart';

class SettingsController extends GetxController {
  // 通知开关（保留逻辑，UI已简化）
  var notificationsEnabled = true.obs;

  // 语言选择（保留逻辑，后续可能挂到“通用”里）
  var selectedLanguage = 'chinese'.tr.obs;

  // 版本信息（保留）
  // 注意：版本号应与 pubspec.yaml 中的 version 保持一致
  static const String currentAppVersion = '1.0.0';
  var appVersion = currentAppVersion.obs;

  // 版本更新状态
  var isCheckingUpdate = false.obs;
  var updateAvailable = false.obs;
  var latestVersion = ''.obs;
  var updateUrl = ''.obs;

  // 身份（用于设置页右侧灰字显示）
  var userRole = 'ordinary_user'.tr.obs;

  @override
  void onInit() {
    super.onInit();
    selectedLanguage.value = 'chinese'.tr;
    appVersion.value = currentAppVersion;
    userRole.value = userRole.value; // 占位，未来可从用户资料加载
  }

  // 检查版本更新 - 已移除 PackageInfo 依赖，使用固定版本号

  // 检查版本更新
  Future<void> checkForUpdate() async {
    if (isCheckingUpdate.value) return;
    
    isCheckingUpdate.value = true;
    updateAvailable.value = false;
    
    try {
      // TODO: 这里可以调用后端 API 获取最新版本
      // 目前使用模拟数据进行版本比较
      
      // 模拟从服务器获取最新版本信息
      await Future.delayed(const Duration(seconds: 1));
      
      // 假设最新版本是 1.0.1（实际应该从服务器获取）
      latestVersion.value = '1.0.1';
      updateUrl.value = 'https://www.liunianguan.com/download';
      
      // 比较版本号
      final currentVersion = _parseVersion(appVersion.value);
      final newVersion = _parseVersion(latestVersion.value);
      
      if (_compareVersions(currentVersion, newVersion) < 0) {
        updateAvailable.value = true;
        Get.snackbar('发现新版本', '最新版本: ${latestVersion.value}');
      } else {
        Get.snackbar('提示', '已是最新版');
      }
    } catch (e) {
      Get.snackbar('错误', '检查更新失败，请稍后重试');
    } finally {
      isCheckingUpdate.value = false;
    }
  }

  // 解析版本号字符串为列表
  List<int> _parseVersion(String version) {
    final parts = version.split('.');
    return parts.map((e) => int.tryParse(e) ?? 0).toList();
  }

  // 比较版本号: 返回负数表示 v1 < v2, 0 表示相等, 正数表示 v1 > v2
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

  // 跳转到应用商店更新
  Future<void> goToUpdate() async {
    if (updateUrl.value.isEmpty) {
      Get.snackbar('提示', '暂无可用下载链接');
      return;
    }
    
    try {
      final uri = Uri.parse(updateUrl.value);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        Get.snackbar('错误', '无法打开链接');
      }
    } catch (e) {
      Get.snackbar('错误', '打开下载页面失败');
    }
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
