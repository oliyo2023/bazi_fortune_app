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

  // 手机号注册方法
  Future<UserModel> registerWithPhone({
    required String phone,
    required String username,
    required String password,
  }) async {
    try {
      final user = await ApiService.to.registerWithPhone(
        phone: phone,
        username: username,
        password: password,
      );
      currentUser.value = user;
      isLoggedIn.value = true;
      _storage.write('user_id', user.id);
      return user;
    } catch (e) {
      _logger.e('手机号注册错误: $e');
      throw Exception('注册失败: ${ErrorMapper.hintFromException(e)}');
    }
  }

  // 手机号登录方法
  Future<UserModel> loginWithPhone({
    required String phone,
    required String password,
  }) async {
    try {
      final user = await ApiService.to.loginWithPhone(
        phone: phone,
        password: password,
      );
      currentUser.value = user;
      isLoggedIn.value = true;
      _storage.write('user_id', user.id);
      return user;
    } catch (e) {
      _logger.e('手机号登录错误: $e');
      throw Exception('登录失败: ${ErrorMapper.hintFromException(e)}');
    }
  }

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