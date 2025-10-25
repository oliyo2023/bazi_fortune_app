import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:async';
import '../../../data/services/auth_service.dart';

class RegisterController extends GetxController {
  // 手机号注册相关
  final nameController = TextEditingController();
  final phoneController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();

  final RxBool isLoading = false.obs;
  final RxBool obscurePassword = true.obs;
  final RxBool obscureConfirmPassword = true.obs;

  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  @override
  void onClose() {
    nameController.dispose();
    phoneController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
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

  // 密码验证方法
  String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return '请输入密码';
    }
    if (value.length < 6) {
      return '密码至少6位';
    }
    return null;
  }

  // 确认密码验证方法
  String? validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) {
      return '请确认密码';
    }
    if (value != passwordController.text) {
      return '两次输入的密码不一致';
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

  
  // 手机号+密码注册
  Future<void> registerWithPhone() async {
    if (!formKey.currentState!.validate()) return;

    // 验证密码和确认密码
    if (passwordController.text != confirmPasswordController.text) {
      Get.snackbar('密码', '两次输入的密码不一致',
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.warning_amber, color: Color(0xFFD32F2F), size: 20),
      );
      return;
    }

    isLoading.value = true;

    try {
      // 调用实际的API
      await AuthService.to.registerWithPhone(
        phone: phoneController.text,
        username: nameController.text,
        password: passwordController.text,
      );

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
        e.toString(),
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.error, color: Color(0xFFD32F2F), size: 20),
      );
    } finally {
      isLoading.value = false;
    }
  }
}