import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:in_app_update/in_app_update.dart';
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
  var updateProgress = 0.0.obs;
  var isDownloading = false.obs;

  var userRole = 'ordinary_user'.tr.obs;

  @override
  void onInit() {
    super.onInit();
    selectedLanguage.value = 'chinese'.tr;
    appVersion.value = currentAppVersion;
    userRole.value = userRole.value;
  }

  /// 检查版本更新
  Future<void> checkForUpdate() async {
    if (isCheckingUpdate.value) return;

    isCheckingUpdate.value = true;
    updateAvailable.value = false;

    try {
      if (Platform.isAndroid) {
        await _checkAndroidUpdate();
      } else if (Platform.isIOS) {
        await _checkIOSUpdate();
      } else {
        // 其他平台使用模拟检查
        await _simulateUpdateCheck();
      }
    } catch (e) {
      // 如果应用内更新失败，回退到模拟检查
      await _simulateUpdateCheck();
    } finally {
      isCheckingUpdate.value = false;
    }
  }

  /// Android 应用内更新
  Future<void> _checkAndroidUpdate() async {
    try {
      final AppUpdateInfo updateInfo = await InAppUpdate.checkForUpdate();

      if (updateInfo.updateAvailability == UpdateAvailability.updateAvailable) {
        updateAvailable.value = true;
        latestVersion.value = updateInfo.availableVersionCode?.toString() ?? '新版本';

        // 显示更新确认对话框
        _showUpdateDialog(
          isImmediate: updateInfo.immediateUpdateAllowed,
          isFlexible: updateInfo.flexibleUpdateAllowed,
        );
      } else {
        Get.snackbar('提示', '已是最新版', snackPosition: SnackPosition.BOTTOM);
      }
    } catch (e) {
      // Android 应用内更新失败，回退到模拟检查
      await _simulateUpdateCheck();
    }
  }

  /// iOS 更新检查（iOS 需要通过 App Store）
  Future<void> _checkIOSUpdate() async {
    // iOS 暂时使用模拟检查
    // 实际项目中可以使用 open_app_store 或其他插件
    await _simulateUpdateCheck();
  }

  /// 显示更新确认对话框
  void _showUpdateDialog({required bool isImmediate, required bool isFlexible}) {
    Get.dialog(
      AlertDialog(
        title: const Text('发现新版本'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('最新版本: ${latestVersion.value}'),
            const SizedBox(height: 8),
            const Text('是否立即更新？'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Get.back(),
            child: const Text('稍后提醒'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.back();
              if (isFlexible) {
                _startFlexibleUpdate();
              } else if (isImmediate) {
                _startImmediateUpdate();
              } else {
                _simulateUpdateCheck();
              }
            },
            child: const Text('立即更新'),
          ),
        ],
      ),
      barrierDismissible: false,
    );
  }

  /// 启动灵活更新（后台下载，下次启动安装）
  Future<void> _startFlexibleUpdate() async {
    try {
      isDownloading.value = true;
      updateProgress.value = 0.0;

      // 显示下载进度对话框
      _showDownloadProgress();

      // 启动灵活更新
      await InAppUpdate.startFlexibleUpdate();

      // 模拟进度更新（实际进度需要通过其他方式获取）
      for (int i = 0; i <= 100; i += 10) {
        await Future.delayed(const Duration(milliseconds: 200));
        updateProgress.value = i / 100;
      }

      Get.back(); // 关闭进度对话框

      // 下载完成，提示用户重启安装
      _showRestartDialog();
    } catch (e) {
      Get.back();
      Get.snackbar('更新失败', '请稍后重试', snackPosition: SnackPosition.BOTTOM);
    } finally {
      isDownloading.value = false;
    }
  }

  /// 启动立即更新（强制更新）
  Future<void> _startImmediateUpdate() async {
    try {
      await InAppUpdate.performImmediateUpdate();
    } catch (e) {
      Get.snackbar('更新失败', '请稍后重试', snackPosition: SnackPosition.BOTTOM);
    }
  }

  /// 显示下载进度对话框
  void _showDownloadProgress() {
    Get.dialog(
      PopScope(
        canPop: false,
        child: AlertDialog(
          title: const Text('正在下载更新'),
          content: Obx(() => Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              LinearProgressIndicator(value: updateProgress.value),
              const SizedBox(height: 16),
              Text('${(updateProgress.value * 100).toInt()}%'),
            ],
          )),
        ),
      ),
      barrierDismissible: false,
    );
  }

  /// 显示重启安装对话框
  void _showRestartDialog() {
    Get.dialog(
      AlertDialog(
        title: const Text('更新已下载'),
        content: const Text('更新已下载完成，需要重启应用以完成安装。是否立即重启？'),
        actions: [
          TextButton(
            onPressed: () => Get.back(),
            child: const Text('稍后重启'),
          ),
          ElevatedButton(
            onPressed: () async {
              Get.back();
              try {
                await InAppUpdate.completeFlexibleUpdate();
              } catch (e) {
                // 忽略错误
              }
            },
            child: const Text('立即重启'),
          ),
        ],
      ),
      barrierDismissible: false,
    );
  }

  /// 模拟更新检查（用于测试或不支持的平台上）
  Future<void> _simulateUpdateCheck() async {
    await Future.delayed(const Duration(seconds: 1));

    latestVersion.value = '1.0.1';

    final currentVersion = _parseVersion(appVersion.value);
    final newVersion = _parseVersion(latestVersion.value);

    if (_compareVersions(currentVersion, newVersion) < 0) {
      updateAvailable.value = true;
      _showSimulatedUpdateDialog();
    } else {
      Get.snackbar('提示', '已是最新版', snackPosition: SnackPosition.BOTTOM);
    }
  }

  /// 显示模拟更新对话框
  void _showSimulatedUpdateDialog() {
    Get.dialog(
      AlertDialog(
        title: const Text('发现新版本'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('最新版本: ${latestVersion.value}'),
            const SizedBox(height: 8),
            const Text('当前为模拟环境，请在真机上测试应用内更新功能。'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Get.back(),
            child: const Text('知道了'),
          ),
        ],
      ),
    );
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
