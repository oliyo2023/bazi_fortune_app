import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controller.dart';

class LoginPage extends GetView<LoginController> {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: const [
              Color(0xFFB08CFF), // pastel purple
              Color(0xFF7BB3FF), // soft blue
              Color(0xFF5FD1C6), // teal
              Color(0xFFA8F0D1), // mint
              Color(0xFFFFF1A6), // soft yellow
              Color(0xFFFFC6B3), // peach
            ],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: EdgeInsets.all(24),
            child: Column(
              children: [
                SizedBox(height: 60),
                // Logo和标题
                _buildHeader(),
                SizedBox(height: 60),
                // 登录表单
                _buildLoginForm(),
                SizedBox(height: 24),
                // 登录按钮
                _buildLoginButton(),
                SizedBox(height: 16),
                // 忘记密码
                _buildForgotPassword(),
                SizedBox(height: 40),
                // 注册链接
                _buildRegisterLink(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(50),
          ),
          child: Icon(
            Icons.auto_awesome,
            size: 50,
            color: Colors.white,
          ),
        ),
        SizedBox(height: 16),
        Text(
          '八字算命',
          style: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        SizedBox(height: 8),
        Text(
          '探索命运的奥秘',
          style: TextStyle(
            fontSize: 16,
            color: Colors.white.withValues(alpha: 0.8),
          ),
        ),
      ],
    );
  }

  Widget _buildLoginForm() {
    return Container(
      padding: EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Form(
        key: controller.formKey,
        child: Column(
          children: [
            // 邮箱输入框
            TextFormField(
              controller: controller.emailController,
              keyboardType: TextInputType.emailAddress,
              validator: controller.validateEmail,
              decoration: InputDecoration(
                labelText: '邮箱',
                prefixIcon: Icon(Icons.email_outlined),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Color(0xFF7B61FF)),
                ),
              ),
            ),
            SizedBox(height: 16),
            // 密码输入框
            Obx(
              () => TextFormField(
                controller: controller.passwordController,
                obscureText: controller.obscurePassword.value,
                validator: controller.validatePassword,
                decoration: InputDecoration(
                  labelText: '密码',
                  prefixIcon: Icon(Icons.lock_outlined),
                  suffixIcon: IconButton(
                    icon: Icon(
                      controller.obscurePassword.value
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                    ),
                    onPressed: controller.togglePasswordVisibility,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(color: Color(0xFF7B61FF)),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLoginButton() {
    return Obx(
      () => SizedBox(
        width: double.infinity,
        height: 50,
        child: ElevatedButton(
          onPressed: controller.isLoading.value ? null : controller.login,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.white,
            foregroundColor: Color(0xFF7B61FF),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(25),
            ),
            elevation: 2,
          ),
          child: controller.isLoading.value
              ? SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF7B61FF)),
                  ),
                )
              : Text(
                  '登录',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
        ),
      ),
    );
  }

  Widget _buildForgotPassword() {
    return TextButton(
      onPressed: controller.goToForgotPassword,
      child: Text(
        '忘记密码？',
        style: TextStyle(
          color: Colors.white.withValues(alpha: 0.8),
          fontSize: 14,
        ),
      ),
    );
  }

  Widget _buildRegisterLink() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          '还没有账号？',
          style: TextStyle(
            color: Colors.white.withValues(alpha: 0.8),
          ),
        ),
        TextButton(
          onPressed: controller.goToRegister,
          child: Text(
            '立即注册',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }
}