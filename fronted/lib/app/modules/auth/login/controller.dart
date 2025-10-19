import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:async';
import '../../../data/services/auth_service.dart';

class LoginController extends GetxController {
  // 手机号登录相关
  final phoneController = TextEditingController();
  final otpController = TextEditingController();
  final countryCode = '+86'.obs;

  // 原有邮箱密码登录（保留切换功能）
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  // 状态控制
  final RxBool isLoading = false.obs;
  final RxBool obscurePassword = true.obs;
  final RxBool isPhoneLogin = true.obs; // 默认手机号登录
  final RxBool canResendOtp = false.obs;
  final RxInt countdownSeconds = 0.obs;
  final RxBool isOtpSent = false.obs;

  final GlobalKey<FormState> phoneFormKey = GlobalKey<FormState>();
  final GlobalKey<FormState> emailFormKey = GlobalKey<FormState>();

  Timer? _countdownTimer;

  @override
  void onClose() {
    phoneController.dispose();
    otpController.dispose();
    emailController.dispose();
    passwordController.dispose();
    _countdownTimer?.cancel();
    super.onClose();
  }

  void togglePasswordVisibility() {
    obscurePassword.value = !obscurePassword.value;
  }

  void toggleLoginMethod() {
    isPhoneLogin.value = !isPhoneLogin.value;
    isOtpSent.value = false;
    countdownSeconds.value = 0;
    canResendOtp.value = false;
    _countdownTimer?.cancel();
  }

  // 发送验证码
  Future<void> sendOtp() async {
    if (!phoneFormKey.currentState!.validate()) return;

    isLoading.value = true;

    try {
      // 模拟发送验证码API调用
      await Future.delayed(Duration(seconds: 1));

      isOtpSent.value = true;
      _startCountdown();

      Get.snackbar(
        '验证码已发送',
        '验证码已发送至 ${countryCode.value} ${phoneController.text}',
        backgroundColor: Colors.green,
        colorText: Colors.white,
        duration: Duration(seconds: 3),
      );
    } catch (e) {
      Get.snackbar(
        '发送失败',
        '验证码发送失败，请重试',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading.value = false;
    }
  }

  void _startCountdown() {
    _countdownTimer?.cancel(); // 取消之前的计时器
    countdownSeconds.value = 60;
    canResendOtp.value = false;

    _countdownTimer = Timer.periodic(Duration(seconds: 1), (timer) {
      if (countdownSeconds.value > 1) {
        countdownSeconds.value--;
      } else {
        countdownSeconds.value = 0;
        timer.cancel();
        canResendOtp.value = true;
      }
    });
  }

  // 手机号+验证码登录
  Future<void> loginWithPhone() async {
    if (!phoneFormKey.currentState!.validate()) return;

    // 验证码输入验证
    if (otpController.text.isEmpty) {
      Get.snackbar('提示', '请输入验证码');
      return;
    }

    if (otpController.text.length < 4) {
      Get.snackbar('提示', '验证码至少4位');
      return;
    }

    isLoading.value = true;

    try {
      // 模拟API调用
      await Future.delayed(Duration(seconds: 2));

      // 假设登录成功
      Get.offAllNamed('/');
      Get.snackbar(
        '登录成功',
        '欢迎回来！',
        backgroundColor: Colors.green,
        colorText: Colors.white,
      );
    } catch (e) {
      Get.snackbar(
        '登录失败',
        '验证码错误或网络异常',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading.value = false;
    }
  }

  // 邮箱+密码登录（保留原功能）
  Future<void> loginWithEmail() async {
    if (!emailFormKey.currentState!.validate()) return;

    isLoading.value = true;

    try {
      final success = await AuthService.to.login(
        emailController.text.trim(),
        passwordController.text,
      );

      if (success) {
        Get.offAllNamed('/');
        Get.snackbar(
          '登录成功',
          '欢迎回来！',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
      }
    } finally {
      isLoading.value = false;
    }
  }

  // 统一登录方法
  Future<void> login() async {
    if (isPhoneLogin.value) {
      await loginWithPhone();
    } else {
      await loginWithEmail();
    }
  }

  void goToRegister() {
    Get.toNamed('/register');
  }

  void goToForgotPassword() {
    Get.snackbar('提示', '忘记密码功能开发中...');
  }

  // 验证方法
  String? validatePhone(String? value) {
    if (value == null || value.isEmpty) {
      return '请输入手机号';
    }
    if (!GetUtils.isPhoneNumber(value)) {
      return '请输入有效的手机号';
    }
    return null;
  }

  String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return '请输入邮箱';
    }
    if (!GetUtils.isEmail(value)) {
      return '请输入有效的邮箱地址';
    }
    return null;
  }

  String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return '请输入密码';
    }
    if (value.length < 6) {
      return '密码至少6位';
    }
    return null;
  }

  String? validateOtp(String? value) {
    if (value == null || value.isEmpty) {
      return '请输入验证码';
    }
    if (value.length != 6) {
      return '请输入6位验证码';
    }
    return null;
  }
}