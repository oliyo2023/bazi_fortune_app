import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:async';

class RegisterController extends GetxController {
  // 手机号注册相关
  final nameController = TextEditingController();
  
  // 手机号注册相关
  final phoneController = TextEditingController();
  final otpController = TextEditingController();
  
  final RxBool isLoading = false.obs;
  final RxBool obscurePassword = true.obs;
  final RxBool obscureConfirmPassword = true.obs;
  
  final RxInt countdownSeconds = 0.obs;
  final RxBool isOtpSent = false.obs;
  
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  
  Timer? _countdownTimer;

  @override
  void onClose() {
    nameController.dispose();
    phoneController.dispose();
    otpController.dispose();
    _countdownTimer?.cancel();
    super.onClose();
  }

  void togglePasswordVisibility() {
    obscurePassword.value = !obscurePassword.value;
  }

  void toggleConfirmPasswordVisibility() {
    obscureConfirmPassword.value = !obscureConfirmPassword.value;
  }

  Future<void> register() async {
    if (!formKey.currentState!.validate()) return;
    
    // 只支持手机号注册
    if (phoneController.text.isNotEmpty) {
      await registerWithPhone();
      return;
    }
    
    Get.snackbar('提示', '请填写手机号');
  }

  // 移除邮箱注册方法

  void goToLogin() {
    Get.back();
  }

  String? validateName(String? value) {
    if (value == null || value.isEmpty) {
      return '请输入姓名';
    }
    if (value.length < 2) {
      return '姓名至少2个字符';
    }
    return null;
  }

  // 移除邮箱验证方法

  // 移除密码验证方法

  // 移除确认密码验证方法

  // 移除可选密码验证方法

  String? validatePhone(String? value) {
    if (value == null || value.isEmpty) {
      return '请输入手机号';
    }
    if (!GetUtils.isPhoneNumber(value)) {
      return '请输入有效的手机号';
    }
    return null;
  }

  // 发送验证码
  Future<void> sendOtp() async {
    if (phoneController.text.isEmpty) {
      Get.snackbar('提示', '请输入手机号');
      return;
    }

    if (!GetUtils.isPhoneNumber(phoneController.text)) {
      Get.snackbar('提示', '请输入有效的手机号');
      return;
    }

    isLoading.value = true;

    try {
      // 模拟发送验证码API调用
      await Future.delayed(Duration(seconds: 1));

      isOtpSent.value = true;
      _startCountdown();

      Get.snackbar(
        '验证码已发送',
        '验证码已发送至 +86 ${phoneController.text}',
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
    _countdownTimer?.cancel();
    countdownSeconds.value = 60;

    _countdownTimer = Timer.periodic(Duration(seconds: 1), (timer) {
      if (countdownSeconds.value > 1) {
        countdownSeconds.value--;
      } else {
        countdownSeconds.value = 0;
        timer.cancel();
      }
    });
  }

  // 手机号+验证码注册 - 优化包含姓名验证
  Future<void> registerWithPhone() async {
    if (!formKey.currentState!.validate()) return;

    // 验证姓名
    if (nameController.text.isEmpty) {
      Get.snackbar('姓名', '请输入姓名',
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.warning_amber, color: Color(0xFFD32F2F), size: 20),
      );
      return;
    }

    // 验证验证码
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
      // await AuthService.to.registerWithPhone(phoneController.text, otpController.text, nameController.text, passwordController.text);
      
      // 模拟API调用
      await Future.delayed(Duration(seconds: 2));

      // 假设注册成功
      Get.offAllNamed('/');
      Get.snackbar(
        '注册成功',
        '欢迎加入八字算命！',
        backgroundColor: Colors.green,
        colorText: Colors.white,
        icon: Icon(Icons.check_circle, color: Colors.white, size: 20),
      );
    } catch (e) {
      Get.snackbar(
        '注册失败',
        '验证码错误或网络异常，请重试',
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.error, color: Color(0xFFD32F2F), size: 20),
      );
    } finally {
      isLoading.value = false;
    }
  }
}