import 'package:get/get.dart';
import '../controller.dart';
import '../../home/bindings/home_binding.dart';
import '../../profile/bindings/profile_binding.dart';

class MainNavigationBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<MainNavigationController>(() => MainNavigationController());
    
    // 预加载其他页面的控制器
    HomeBinding().dependencies();
    ProfileBinding().dependencies();
  }
}