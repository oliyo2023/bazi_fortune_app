import 'package:get/get.dart';

class MainNavigationController extends GetxController {
  final RxInt currentIndex = 0.obs;
  
  void changeTab(int index) {
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
    Get.snackbar('提示', '消息功能开发中...');
  }
  
  void goToProfile() {
    currentIndex.value = 4;
  }
}