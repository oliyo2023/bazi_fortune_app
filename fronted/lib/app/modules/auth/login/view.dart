import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'controller.dart';

class LoginPage extends GetView<LoginController> {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: Size(375, 812));

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFE6E9F8),
              Color(0xFFFDFBFF),
            ],
          ),
        ),
        child: Stack(
          children: [
            _buildBackground(),
            SafeArea(
              child: SingleChildScrollView(
                physics: BouncingScrollPhysics(),
                padding: EdgeInsets.symmetric(horizontal: 20.w),
                child: Column(
                  children: [
                    SizedBox(height: 50.h),
                    // Logo和标题
                    _buildHeader(),
                    SizedBox(height: 60.h),
                    // 登录表单（手机号+密码）
                    _buildPhoneLoginForm(),
                    SizedBox(height: 24.h),
                    // 登录按钮
                    _buildLoginButton(),
                    SizedBox(height: 20.h),
                    // 其他操作
                    _buildOtherActions(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBackground() {
    return Positioned(
      top: -100.h,
      right: -100.w,
      child: Container(
        width: 300.w,
        height: 300.h,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Color(0xFF667EEA).withOpacity(0.1),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Container(
          width: 80.w,
          height: 80.h,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20.r),
            gradient: LinearGradient(
              colors: [Color(0xFF667EEA), Color(0xFF764BA2)],
            ),
            boxShadow: [
              BoxShadow(
                color: Color(0xFF667EEA).withOpacity(0.3),
                blurRadius: 20,
                offset: Offset(0, 10),
              ),
            ],
          ),
          child: Icon(
            Icons.auto_awesome,
            color: Colors.white,
            size: 40.sp,
          ),
        ),
        SizedBox(height: 20.h),
        Text(
          '八字算命',
          style: TextStyle(
            fontSize: 28.sp,
            fontWeight: FontWeight.bold,
            color: Color(0xFF1F2937),
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '洞察命运，指引人生',
          style: TextStyle(
            fontSize: 16.sp,
            color: Color(0xFF6B7280),
          ),
        ),
      ],
    );
  }

  Widget _buildPhoneLoginForm() {
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 20,
            offset: Offset(0, 10),
          ),
        ],
      ),
      child: Form(
        key: controller.phoneFormKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '手机号登录',
              style: TextStyle(
                fontSize: 18.sp,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1F2937),
              ),
            ),
            SizedBox(height: 20.h),
            // 手机号输入框
            Container(
              height: 50.h,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12.r),
                border: Border.all(
                  color: Color(0xFFE8E8E8),
                  width: 1.w,
                ),
                color: Colors.white,
              ),
              child: Row(
                children: [
                  SizedBox(width: 16.w),
                  Text(
                    '+86',
                    style: TextStyle(
                      color: Color(0xFF333333),
                      fontSize: 15.sp,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  SizedBox(width: 8.w),
                  Container(
                    width: 1.w,
                    height: 24.h,
                    color: Color(0xFFE8E8E8),
                  ),
                  SizedBox(width: 12.w),
                  Expanded(
                    child: TextFormField(
                      controller: controller.phoneController,
                      focusNode: controller.phoneFocusNode,
                      keyboardType: TextInputType.phone,
                      style: TextStyle(
                        color: Color(0xFF333333),
                        fontSize: 15.sp,
                        fontWeight: FontWeight.w500,
                      ),
                      decoration: InputDecoration(
                        hintText: '请输入手机号',
                        hintStyle: TextStyle(
                          color: Color(0xFF999999),
                          fontSize: 15.sp,
                        ),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
                      ),
                      validator: controller.validatePhone,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 16.h),
            // 密码输入框
            Container(
              height: 50.h,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12.r),
                border: Border.all(
                  color: Color(0xFFE8E8E8),
                  width: 1.w,
                ),
                color: Colors.white,
              ),
              child: Obx(() => TextFormField(
                controller: controller.passwordController,
                focusNode: controller.passwordFocusNode,
                obscureText: controller.obscurePassword.value,
                keyboardType: TextInputType.visiblePassword,
                style: TextStyle(
                  color: Color(0xFF333333),
                  fontSize: 15.sp,
                  fontWeight: FontWeight.w500,
                ),
                decoration: InputDecoration(
                  hintText: '请输入密码',
                  hintStyle: TextStyle(
                    color: Color(0xFF999999),
                    fontSize: 15.sp,
                  ),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
                  suffixIcon: IconButton(
                    icon: Icon(
                      controller.obscurePassword.value ? Icons.visibility_off : Icons.visibility,
                      color: Color(0xFF999999),
                      size: 20,
                    ),
                    onPressed: controller.togglePasswordVisibility,
                  ),
                ),
                validator: controller.validatePassword,
              )),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLoginButton() {
    return Obx(() => ElevatedButton(
      onPressed: controller.isLoading.value ? null : controller.login,
      style: ElevatedButton.styleFrom(
        backgroundColor: Color(0xFF667EEA),
        foregroundColor: Colors.white,
        minimumSize: Size(double.infinity, 50.h),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.r),
        ),
        elevation: 0,
      ),
      child: controller.isLoading.value
          ? SizedBox(
              width: 20.w,
              height: 20.h,
              child: CircularProgressIndicator(
                color: Colors.white,
                strokeWidth: 2,
              ),
            )
          : Text(
              '登录',
              style: TextStyle(
                fontSize: 16.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
    ));
  }

  Widget _buildOtherActions() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        TextButton(
          onPressed: controller.goToRegister,
          child: Text(
            '还没有账号？立即注册',
            style: TextStyle(
              color: Color(0xFF667EEA),
              fontSize: 14.sp,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
        TextButton(
          onPressed: controller.goToForgotPassword,
          child: Text(
            '忘记密码？',
            style: TextStyle(
              color: Color(0xFF6B7280),
              fontSize: 14.sp,
            ),
          ),
        ),
      ],
    );
  }
}