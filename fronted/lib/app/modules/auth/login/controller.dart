import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:async';
import '../../../data/services/auth_service.dart';

class LoginController extends GetxController {
  // 手机号登录相关
  final phoneController = TextEditingController();
  final passwordController = TextEditingController();
  final countryCode = '+86'.obs;

  // 状态控制
  final RxBool isLoading = false.obs;
  final RxBool obscurePassword = true.obs;
  final RxBool isPhoneLogin = true.obs; // 默认手机号登录

  // 优化：自动聚焦手机号输入框
  final FocusNode phoneFocusNode = FocusNode();
  final FocusNode passwordFocusNode = FocusNode();

  final GlobalKey<FormState> phoneFormKey = GlobalKey<FormState>();

  @override
  void onClose() {
    phoneController.dispose();
    passwordController.dispose();
    phoneFocusNode.dispose();
    passwordFocusNode.dispose();
    super.onClose();
  }

  void togglePasswordVisibility() {
    obscurePassword.value = !obscurePassword.value;
  }

  // 移除切换登录方式的方法，因为我们只保留手机号登录

  // 手机号+密码登录
  Future<void> loginWithPhone() async {
    if (!phoneFormKey.currentState!.validate()) return;

    // 密码输入验证
    if (passwordController.text.isEmpty) {
      Get.snackbar('密码', '请输入密码',
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.warning_amber, color: Color(0xFFD32F2F), size: 20),
      );
      return;
    }

    if (passwordController.text.length < 6) {
      Get.snackbar('密码', '密码至少6位',
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.warning_amber, color: Color(0xFFD32F2F), size: 20),
      );
      return;
    }

    isLoading.value = true;

    try {
      // 调用实际的API
      await AuthService.to.loginWithPhone(
        phone: phoneController.text,
        password: passwordController.text,
      );

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
        e.toString(),
        backgroundColor: Color(0xFFFBE6E6),
        colorText: Color(0xFFD32F2F),
        icon: Icon(Icons.error, color: Color(0xFFD32F2F), size: 20),
      );
    } finally {
      isLoading.value = false;
    }
  }

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
}