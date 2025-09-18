import 'package:get/get.dart';
import '../../data/services/auth_service.dart';
import '../../data/services/api_service.dart';
import '../../data/models/bazi_model.dart';

class ProfileController extends GetxController {
  final RxBool isLoading = false.obs;
  final RxList<BaziModel> baziHistory = <BaziModel>[].obs;
  
  @override
  void onInit() {
    super.onInit();
    if (AuthService.to.isAuthenticated) {
      loadBaziHistory();
    }
  }

  Future<void> loadBaziHistory() async {
    isLoading.value = true;
    try {
      final history = await ApiService.to.getBaziHistory();
      baziHistory.value = history;
    } catch (e) {
      Get.snackbar('错误', '获取历史记录失败: ${e.toString()}');
    } finally {
      isLoading.value = false;
    }
  }

  void goToLogin() {
    Get.toNamed('/login');
  }

  void logout() {
    AuthService.to.logout();
  }

  void viewBaziDetail(BaziModel bazi) {
    Get.toNamed('/result', arguments: {
      'bazi': bazi,
      'name': AuthService.to.userName ?? '用户',
    });
  }

  String get userName => AuthService.to.userName ?? '未登录';
  String get userEmail => AuthService.to.userEmail ?? '';
  bool get isLoggedIn => AuthService.to.isAuthenticated;
}