import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:async';

class LoginController extends GetxController {
  // 手机号登录相关
  final phoneController = TextEditingController();
  final otpController = TextEditingController();
  final countryCode = '+86'.obs;

  // 状态控制
  final RxBool isLoading = false.obs;
  final RxBool obscurePassword = true.obs;
  final RxBool isPhoneLogin = true.obs; // 默认手机号登录
  final RxBool canResendOtp = false.obs;
  final RxInt countdownSeconds = 0.obs;
  final RxBool isOtpSent = false.obs;
  
  // 优化：自动聚焦手机号输入框
  final FocusNode phoneFocusNode = FocusNode();
  final FocusNode otpFocusNode = FocusNode();

  final GlobalKey<FormState> phoneFormKey = GlobalKey<FormState>();

  Timer? _countdownTimer;

  @override
  void onClose() {
    phoneController.dispose();
    otpController.dispose();
    phoneFocusNode.dispose();
    otpFocusNode.dispose();
    _countdownTimer?.cancel();
    super.onClose();
  }

  void togglePasswordVisibility() {
    obscurePassword.value = !obscurePassword.value;
  }

  // 移除切换登录方式的方法，因为我们只保留手机号登录

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

  // 手机号+验证码登录 - 优化主要登录流程
  Future<void> loginWithPhone() async {
    if (!phoneFormKey.currentState!.validate()) return;

    // 验证码输入验证
    if (otpController.text.isEmpty) {
      Get.snackbar('验证码', '请输入验证码',
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.warning_amber, color: Color(0xFFD32F2F), size: 20),
      );
      return;
    }

    if (otpController.text.length < 4) {
      Get.snackbar('验证码', '验证码至少4位',
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.warning_amber, color: Color(0xFFD32F2F), size: 20),
      );
      return;
    }

    isLoading.value = true;

    try {
      // 实际的API调用应该在这里
      // await AuthService.to.loginWithPhone(phoneController.text, otpController.text);
      
      // 模拟API调用
      await Future.delayed(Duration(seconds: 2));

      // 假设登录成功
      Get.offAllNamed('/');
      Get.snackbar(
        '登录成功',
        '欢迎回来！',
        backgroundColor: Colors.green,
        colorText: Colors.white,
        icon: Icon(Icons.check_circle, color: Colors.white, size: 20),
      );
    } catch (e) {
      Get.snackbar(
        '登录失败',
        '验证码错误或网络异常，请重试',
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.error, color: Color(0xFFD32F2F), size: 20),
      );
    } finally {
      isLoading.value = false;
    }
  }

  // 移除邮箱密码登录方法

  // 简化登录方法，只支持手机号登录
  Future<void> login() async {
    await loginWithPhone();
  }

  // 优化：自动获取焦点到手机号输入框
  void autoFocusPhoneInput() {
    Future.delayed(Duration(milliseconds: 100), () {
      phoneFocusNode.requestFocus();
    });
  }

  // 移除账号密码登录方法

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

  // 移除邮箱验证方法

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
    if (value.length < 4) {
      return '验证码至少4位';
    }
    return null;
  }
}