import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:logger/logger.dart';
import '../models/user_model.dart';
import 'api_service.dart';
import '../../core/utils/error_mapper.dart';

class AuthService extends GetxService {
  static AuthService get to => Get.find();

  final GetStorage _storage = GetStorage();
  final Logger _logger = Logger();
  final Rx<UserModel?> currentUser = Rx<UserModel?>(null);
  final RxBool isLoggedIn = false.obs;

  @override
  void onInit() {
    super.onInit();
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    try {
      final user = await ApiService.to.getCurrentUser();
      if (user != null) {
        currentUser.value = user;
        isLoggedIn.value = true;
      }
    } catch (e) {
      _logger.e('检查登录状态错误: $e');
    }
  }

  // 移除邮箱密码登录方法，因为我们只支持手机号登录

  // 移除邮箱注册方法，因为我们只支持手机号注册

  Future<void> logout() async {
    try {
      await ApiService.to.logout();
      currentUser.value = null;
      isLoggedIn.value = false;
      _storage.remove('user_id');
      Get.offAllNamed('/');
    } catch (e) {
      Get.snackbar('提示', ErrorMapper.hintFromException(e));
    }
  }

  bool get isAuthenticated => isLoggedIn.value && currentUser.value != null;
  
  String? get userId => currentUser.value?.id;
  String? get userEmail => currentUser.value?.email;
  String? get userName => currentUser.value?.name;
}