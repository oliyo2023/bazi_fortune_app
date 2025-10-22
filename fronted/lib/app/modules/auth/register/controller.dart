import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:async';
import '../../../data/services/auth_service.dart';

class RegisterController extends GetxController {
  // 邮箱密码注册相关
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  
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
    emailController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
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
    
    isLoading.value = true;
    
    try {
      final success = await AuthService.to.register(
        emailController.text.trim(),
        passwordController.text,
        nameController.text.trim(),
      );
      
      if (success) {
        Get.offAllNamed('/');
        Get.snackbar(
          '注册成功',
          '欢迎加入八字算命！',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
      }
    } finally {
      isLoading.value = false;
    }
  }

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

  String? validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) {
      return '请确认密码';
    }
    if (value != passwordController.text) {
      return '两次密码输入不一致';
    }
    return null;
  }

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

  // 手机号+验证码注册
  Future<void> registerWithPhone() async {
    if (!formKey.currentState!.validate()) return;

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

      // 假设注册成功
      Get.offAllNamed('/');
      Get.snackbar(
        '注册成功',
        '欢迎加入八字算命！',
        backgroundColor: Colors.green,
        colorText: Colors.white,
      );
    } catch (e) {
      Get.snackbar(
        '注册失败',
        '验证码错误或网络异常',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading.value = false;
    }
  }
}