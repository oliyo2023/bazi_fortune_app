import 'package:get/get.dart';
import '../../data/services/auth_service.dart';
import '../../data/services/api_service.dart';
import '../../data/models/bazi_model.dart';
import '../../core/utils/permission_util.dart';

class ProfileController extends GetxController {
  final RxBool isLoading = false.obs;
  final RxList<BaziModel> baziHistory = <BaziModel>[].obs;
  
  // 从图片中提取的静态数据
  final RxString balance = '¥0.0'.obs;
  final RxString yiZhu = '30'.obs;
  final RxString favorites = '0'.obs;

  @override
  void onInit() {
    super.onInit();
    // 请求基础权限（Android：存储等）
    PermissionUtil.requestEssential();

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

  // 功能网格的方法
  void onGridItemTap(String label) {
    Get.snackbar('提示', '你点击了 "$label"，该功能正在开发中...');
  }
  
  // 开通会员
  void openMembership() {
     Get.snackbar('提示', '“开通会员”功能正在开发中...');
  }

  // 意见反馈
  void onFeedbackTap() {
    Get.snackbar('提示', '“意见反馈”功能正在开发中...');
  }

  // 推广官
  void onPromotionTap() {
    Get.snackbar('提示', '“推广官”功能正在开发中...');
  }


  String? get userName => AuthService.to.userName;
  String? get userEmail => AuthService.to.userEmail;
  bool get isLoggedIn => AuthService.to.isAuthenticated;
}