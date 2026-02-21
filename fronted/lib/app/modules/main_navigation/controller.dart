import 'package:get/get.dart';
import '../../data/services/auth_service.dart';

class MainNavigationController extends GetxController {
  final RxInt currentIndex = 0.obs;
  // 消息未读角标
  final RxInt messageUnread = 27.obs;
  DateTime? _lastBackPressedAt;
  
  void changeTab(int index) {
    // 未登录点击“我的”时直接跳转登录
    if (index == 4 && !AuthService.to.isAuthenticated) {
      Get.toNamed('/login');
      return;
    }
    currentIndex.value = index;
  }
  
  void goToHome() {
    currentIndex.value = 0;
  }
  
  void goToFortune() {
    currentIndex.value = 1;
    Get.snackbar('提示', '运势功能开发中...');
  }
  
  void goToMaster() {
    currentIndex.value = 2;
    Get.snackbar('提示', '大师咨询功能开发中...');
  }
  
  void goToMessage() {
    currentIndex.value = 3;
  }
  
  void goToProfile() {
    currentIndex.value = 4;
  }

  Future<bool> onWillPop() async {
    // 非首页时，返回键先回到首页而不是退出应用
    if (currentIndex.value != 0) {
      currentIndex.value = 0;
      return false;
    }

    final now = DateTime.now();
    if (_lastBackPressedAt == null ||
        now.difference(_lastBackPressedAt!) > const Duration(seconds: 2)) {
      _lastBackPressedAt = now;
      Get.snackbar(
        '提示',
        '再按一次退出应用',
        snackPosition: SnackPosition.BOTTOM,
        duration: const Duration(seconds: 2),
      );
      return false;
    }

    return true;
  }
}
