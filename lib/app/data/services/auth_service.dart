import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import '../models/user_model.dart';
import 'api_service.dart';

class AuthService extends GetxService {
  static AuthService get to => Get.find();
  
  final GetStorage _storage = GetStorage();
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
      print('检查登录状态错误: $e');
    }
  }

  Future<bool> login(String email, String password) async {
    try {
      final user = await ApiService.to.login(email, password);
      if (user != null) {
        currentUser.value = user;
        isLoggedIn.value = true;
        _storage.write('user_id', user.id);
        return true;
      }
      return false;
    } catch (e) {
      Get.snackbar('登录失败', e.toString());
      return false;
    }
  }

  Future<bool> register(String email, String password, String name) async {
    try {
      final user = await ApiService.to.register(email, password, name);
      if (user != null) {
        currentUser.value = user;
        isLoggedIn.value = true;
        _storage.write('user_id', user.id);
        return true;
      }
      return false;
    } catch (e) {
      Get.snackbar('注册失败', e.toString());
      return false;
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
      Get.snackbar('登出失败', e.toString());
    }
  }

  bool get isAuthenticated => isLoggedIn.value && currentUser.value != null;
  
  String? get userId => currentUser.value?.id;
  String? get userEmail => currentUser.value?.email;
  String? get userName => currentUser.value?.name;
}