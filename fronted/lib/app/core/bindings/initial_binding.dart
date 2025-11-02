import 'package:get/get.dart';
import '../../data/services/api_service.dart';
import '../../data/services/auth_service.dart';
import '../../data/services/astrology_service.dart';

class InitialBinding extends Bindings {
  @override
  void dependencies() {
    // 初始化核心服务
    Get.put<ApiService>(ApiService(), permanent: true);
    Get.put<AuthService>(AuthService(), permanent: true);
    Get.put<AstrologyService>(AstrologyService(), permanent: true);
  }
}