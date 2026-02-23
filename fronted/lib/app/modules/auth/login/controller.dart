import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:async';
import '../../../data/models/user_model.dart';
import '../../../data/services/auth_service.dart';
import '../../../data/services/api_service.dart';
import 'widgets/animated_login_button.dart' show LoginButtonState;

class LoginController extends GetxController {
  // 手机号输入控制器
  final phoneController = TextEditingController();

  // 验证码输入控制器（用于访问OTP输入框组件的方法）
  final GlobalKey otpFieldKey = GlobalKey();

  // 状态控制
  final RxBool isLoading = false.obs;
  final RxBool isSendingCode = false.obs;
  final RxBool hasError = false.obs;
  final RxString errorMessage = ''.obs;

  // 登录步骤：1=输入手机号，2=输入验证码
  final RxInt currentStep = 1.obs;

  // 手机号是否有效
  final RxBool isPhoneValid = false.obs;

  // 验证码倒计时
  final RxInt countdown = 0.obs;
  Timer? _countdownTimer;

  // 登录按钮状态
  final Rx<LoginButtonState> buttonState = LoginButtonState.idle.obs;

  // 当前输入的验证码
  final RxString currentOtp = ''.obs;

  // 手机号输入框焦点
  final FocusNode phoneFocusNode = FocusNode();

  // 主链路默认直连后端
  static const bool testMode = false;

  @override
  void onInit() {
    super.onInit();
    // 监听手机号输入变化
    phoneController.addListener(_onPhoneChanged);
  }

  @override
  void onClose() {
    phoneController.dispose();
    phoneFocusNode.dispose();
    _countdownTimer?.cancel();
    super.onClose();
  }

  /// 手机号输入变化
  void _onPhoneChanged() {
    final phone = phoneController.text.trim();
    isPhoneValid.value = validatePhoneFormat(phone);
  }

  /// 验证手机号格式
  bool validatePhoneFormat(String phone) {
    final regex = RegExp(r'^1[3-9]\d{9}$');
    return regex.hasMatch(phone);
  }

  /// 发送验证码
  Future<void> sendSmsCode() async {
    final phone = phoneController.text.trim();

    // 验证手机号
    if (phone.isEmpty) {
      _showError('请输入手机号');
      return;
    }

    if (!validatePhoneFormat(phone)) {
      _showError('请输入有效的手机号');
      return;
    }

    // 检查是否在倒计时中
    if (countdown.value > 0) {
      return;
    }

    isSendingCode.value = true;
    hasError.value = false;

    // 测试模式：不请求网络，直接进入第二步
    if (testMode) {
      // 模拟网络延迟
      await Future.delayed(const Duration(milliseconds: 500));

      // 开始60秒倒计时
      _startCountdown(60);

      // 进入第二步
      currentStep.value = 2;
      isSendingCode.value = false;

      Get.snackbar(
        '测试模式',
        '已跳过网络请求，直接进入验证码界面\n手机号: $phone',
        backgroundColor: Colors.orange,
        colorText: Colors.white,
        icon: const Icon(Icons.info, color: Colors.white, size: 20),
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 2),
      );
      return;
    }

    try {
      // 调用API发送验证码
      await ApiService.to.sendSmsCode(phone: phone);

      // 开始60秒倒计时
      _startCountdown(60);

      // 进入第二步
      currentStep.value = 2;

      Get.snackbar(
        '发送成功',
        '验证码已发送到 $phone',
        backgroundColor: Colors.green,
        colorText: Colors.white,
        icon: const Icon(Icons.check_circle, color: Colors.white, size: 20),
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 2),
      );
    } catch (e) {
      _showError(e.toString().replaceAll('Exception: ', ''));
    } finally {
      isSendingCode.value = false;
    }
  }

  /// 开始倒计时
  void _startCountdown(int seconds) {
    countdown.value = seconds;
    _countdownTimer?.cancel();
    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        timer.cancel();
      }
    });
  }

  /// 验证码输入变化
  void onOtpChanged(String otp) {
    currentOtp.value = otp;
    hasError.value = false;
  }

  /// 验证码输入完成
  void onOtpCompleted(String otp) {
    // 自动触发登录
    login();
  }

  /// 登录
  Future<void> login() async {
    final phone = phoneController.text.trim();
    final code = currentOtp.value;

    // 验证手机号
    if (phone.isEmpty) {
      _showError('请输入手机号');
      _shakeOtpField();
      return;
    }

    if (!validatePhoneFormat(phone)) {
      _showError('请输入有效的手机号');
      _shakeOtpField();
      return;
    }

    // 验证验证码
    if (code.length != 4) {
      _showError('请输入4位验证码');
      _shakeOtpField();
      return;
    }

    isLoading.value = true;
    buttonState.value = LoginButtonState.loading;
    hasError.value = false;

    // 测试模式：不请求网络，直接模拟登录成功
    if (testMode) {
      // 模拟网络延迟
      await Future.delayed(const Duration(milliseconds: 800));

      // 创建测试用户
      final testUser = UserModel(
        id: 'test_user_001',
        phone: phone,
        name: '测试用户',
        role: 'USER',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );

      // 更新认证服务状态
      AuthService.to.currentUser.value = testUser;
      AuthService.to.isLoggedIn.value = true;

      // 显示成功状态
      buttonState.value = LoginButtonState.success;

      // 延迟跳转，让用户看到成功动画
      await Future.delayed(const Duration(milliseconds: 800));

      // 跳转到首页
      Get.offAllNamed('/');

      Get.snackbar(
        '测试模式登录成功',
        '已跳过网络请求，使用测试账号登录\n手机号: $phone',
        backgroundColor: Colors.orange,
        colorText: Colors.white,
        icon: const Icon(Icons.check_circle, color: Colors.white, size: 20),
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 2),
      );

      isLoading.value = false;
      return;
    }

    try {
      // 调用验证码登录API
      final result = await ApiService.to.loginWithSms(
        phone: phone,
        code: code,
      );

      final user = result['user'] as UserModel?;
      final isNew = result['is_new'] as bool? ?? false;

      // 更新认证服务状态
      if (user != null) {
        AuthService.to.currentUser.value = user;
        AuthService.to.isLoggedIn.value = true;
      }

      // 显示成功状态
      buttonState.value = LoginButtonState.success;

      // 延迟跳转，让用户看到成功动画
      await Future.delayed(const Duration(milliseconds: 800));

      // 跳转到首页
      Get.offAllNamed('/');

      Get.snackbar(
        isNew ? '注册成功' : '登录成功',
        isNew ? '欢迎加入八字算命！' : '欢迎回来！',
        backgroundColor: Colors.green,
        colorText: Colors.white,
        icon: const Icon(Icons.check_circle, color: Colors.white, size: 20),
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 2),
      );
    } catch (e) {
      buttonState.value = LoginButtonState.error;
      hasError.value = true;
      _shakeOtpField();
      _showError(e.toString().replaceAll('Exception: ', ''));

      // 延迟恢复按钮状态
      await Future.delayed(const Duration(milliseconds: 1500));
      buttonState.value = LoginButtonState.idle;
    } finally {
      isLoading.value = false;
    }
  }

  /// 触发验证码输入框抖动动画
  void _shakeOtpField() {
    // 通过设置hasError来触发抖动
    hasError.value = true;
  }

  /// 显示错误提示
  void _showError(String message) {
    errorMessage.value = message;
    Get.snackbar(
      '提示',
      message,
      backgroundColor: const Color(0xFFFBE6E6),
      colorText: const Color(0xFFD32F2F),
      icon: const Icon(Icons.warning_amber, color: Color(0xFFD32F2F), size: 20),
      snackPosition: SnackPosition.TOP,
      duration: const Duration(seconds: 3),
    );
  }

  /// 跳转到注册页面
  void goToRegister() {
    Get.toNamed('/register');
  }

  /// 跳转到忘记密码页面
  void goToForgotPassword() {
    Get.snackbar('提示', '忘记密码功能开发中...');
  }

  /// 清空验证码
  void clearOtp() {
    currentOtp.value = '';
  }

  /// 返回上一步
  void goToPreviousStep() {
    currentStep.value = 1;
    clearOtp();
    hasError.value = false;
  }

  /// 重新发送验证码
  Future<void> resendSmsCode() async {
    await sendSmsCode();
  }
}
