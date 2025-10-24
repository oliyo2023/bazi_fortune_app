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
                    // 登录表单（手机号+验证码）
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
    return Stack(
      children: [
        Positioned(
          top: -50.h,
          right: -80.w,
          child: Container(
            width: 250.w,
            height: 250.h,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Color(0xFF667EEA).withValues(alpha: 0.08),
            ),
          ),
        ),
        Positioned(
          bottom: -40.h,
          left: -60.w,
          child: Container(
            width: 180.w,
            height: 180.h,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Color(0xFF764BA2).withValues(alpha: 0.06),
            ),
          ),
        ),
      ],
    );
  }

  // 头部标题
  Widget _buildHeader() {
    return Column(
      children: [
        // Logo容器
        Container(
          width: 100.w,
          height: 100.h,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
              colors: [
                Color(0xFF667EEA).withValues(alpha: 0.2),
                Color(0xFF764BA2).withValues(alpha: 0.1),
              ],
            ),
            border: Border.all(
              color: Color(0xFF667EEA).withValues(alpha: 0.3),
              width: 2.w,
            ),
          ),
          child: Icon(
            Icons.auto_awesome,
            size: 50.sp,
            color: Color(0xFF667EEA),
          ),
        ),

        SizedBox(height: 20.h),

        // 主标题
        Text(
          '八字算命',
          style: TextStyle(
            fontSize: 36.sp,
            fontWeight: FontWeight.bold,
            color: Color(0xFF333333),
            letterSpacing: 1,
          ),
        ),

        SizedBox(height: 8.h),

        // 副标题
        Text(
          '探索命运的奥秘',
          style: TextStyle(
            fontSize: 14.sp,
            color: Color(0xFF666666),
            letterSpacing: 0.5,
          ),
        ),
      ],
    );
  }

  // 手机号登录表单
  Widget _buildPhoneLoginForm() {
    return _buildGlassContainer(
      child: Form(
        key: controller.phoneFormKey,
        child: Column(
          children: [
            // 手机号输入行 - 优化样式，更加突出
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 18.h),
              child: Row(
                children: [
                  // 国家代码显示 - 增加点击选择功能
                  GestureDetector(
                    onTap: () {
                      Get.snackbar('国家代码', '当前为中国 +86，暂不支持其他国家');
                    },
                    child: Container(
                      width: 70.w,
                      height: 44.h,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12.r),
                        border: Border.all(
                          color: Color(0xFFE8E8E8),
                          width: 1.w,
                        ),
                        color: Colors.white,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.05),
                            blurRadius: 8,
                            offset: Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Center(
                        child: Obx(() => Text(
                          controller.countryCode.value,
                          style: TextStyle(
                            color: Color(0xFF333333),
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w600,
                          ),
                        )),
                      ),
                    ),
                  ),
                  SizedBox(width: 12.w),
                  // 手机号输入框 - 增大尺寸，更好体验
                  Expanded(
                    child: TextFormField(
                      controller: controller.phoneController,
                      focusNode: controller.phoneFocusNode,
                      keyboardType: TextInputType.phone,
                      validator: controller.validatePhone,
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
                    ),
                  ),
                ],
              ),
            ),
            Divider(
              height: 1.h,
              color: Color(0xFFE8E8E8),
              indent: 16.w,
              endIndent: 16.w,
            ),
            // 验证码输入和发送按钮行 - 优化布局
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 18.h),
              child: Row(
                children: [
                  // 验证码输入框 - 增加输入体验优化
                  Expanded(
                    flex: 2,
                    child: Obx(() => controller.isOtpSent.value
                      ? Container(
                          height: 44.h,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12.r),
                            border: Border.all(
                              color: Color(0xFFE8E8E8),
                              width: 1.w,
                            ),
                            color: Colors.white,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.05),
                                blurRadius: 8,
                                offset: Offset(0, 2),
                              ),
                            ],
                          ),
                          child: TextFormField(
                            controller: controller.otpController,
                            focusNode: controller.otpFocusNode,
                            keyboardType: TextInputType.number,
                            maxLength: 6,
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Color(0xFF333333),
                              fontSize: 16.sp,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 4,
                            ),
                            decoration: InputDecoration(
                              hintText: '验证码',
                              hintStyle: TextStyle(
                                color: Color(0xFF999999),
                                fontSize: 14.sp,
                              ),
                              border: InputBorder.none,
                              counterText: '',
                              contentPadding: EdgeInsets.symmetric(
                                horizontal: 12.w,
                                vertical: 12.h,
                              ),
                            ),
                            onChanged: (value) {
                              // 当输入6位验证码时自动聚焦到发送按钮
                              if (value.length == 6) {
                                Future.delayed(Duration(milliseconds: 100), () {
                                  // 可以在这里添加自动登录逻辑
                                });
                              }
                            },
                          ),
                        )
                      : GestureDetector(
                          onTap: () {
                            // 点击验证码输入框区域时自动发送验证码
                            if (controller.phoneController.text.isNotEmpty) {
                              controller.sendOtp();
                            } else {
                              // 如果手机号为空，聚焦到手机号输入框
                              controller.phoneFocusNode.requestFocus();
                            }
                          },
                          child: Container(
                            height: 44.h,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(12.r),
                              border: Border.all(
                                color: Color(0xFFE8E8E8),
                                width: 1.w,
                              ),
                              color: Colors.white,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.05),
                                  blurRadius: 8,
                                  offset: Offset(0, 2),
                                ),
                              ],
                            ),
                            child: Center(
                              child: Text(
                                '获取验证码',
                                style: TextStyle(
                                  color: Color(0xFF667EEA),
                                  fontSize: 14.sp,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                        )),
                  ),
                  SizedBox(width: 12.w),
                  // 发送验证码按钮 - 优化样式
                  Obx(() => controller.countdownSeconds.value > 0
                    ? Container(
                        width: 95.w,
                        height: 44.h,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12.r),
                          color: Color(0xFFF5F5F5),
                          border: Border.all(
                            color: Color(0xFFE8E8E8),
                            width: 1.w,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.05),
                              blurRadius: 8,
                              offset: Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Center(
                          child: Text(
                            '${controller.countdownSeconds.value}s',
                            style: TextStyle(
                              color: Color(0xFF999999),
                              fontSize: 13.sp,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      )
                    : GestureDetector(
                        onTap: controller.sendOtp,
                        child: Container(
                          width: 95.w,
                          height: 44.h,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12.r),
                            gradient: LinearGradient(
                              colors: [
                                Color(0xFF667EEA),
                                Color(0xFF764BA2),
                              ],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Color(0xFF667EEA).withValues(alpha: 0.3),
                                blurRadius: 8,
                                offset: Offset(0, 2),
                              ),
                            ],
                          ),
                          child: Center(
                            child: Text(
                              '获取验证码',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 13.sp,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                      )),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // 自定义容器
  Widget _buildGlassContainer({
    required Widget child,
    double? height,
    double? width,
  }) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16.r),
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16.r),
          color: Colors.white,
          border: Border.all(
            color: Color(0xFFE8E8E8),
            width: 1.w,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: child,
      ),
    );
  }

  // 登录按钮
  Widget _buildLoginButton() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Obx(
        () => GestureDetector(
          onTap: controller.isLoading.value ? null : controller.login,
          child: Container(
            height: 50.h,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24.r),
              gradient: LinearGradient(
                colors: [
                  Color(0xFF667EEA),
                  Color(0xFF764BA2),
                ],
              ),
              boxShadow: [
                BoxShadow(
                  color: Color(0xFF667EEA).withValues(alpha: 0.3),
                  blurRadius: 12,
                  offset: Offset(0, 4),
                ),
              ],
            ),
            child: Center(
              child: controller.isLoading.value
                  ? SizedBox(
                      width: 20.w,
                      height: 20.h,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.w,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : Text(
                      '登录',
                      style: TextStyle(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
            ),
          ),
        ),
      ),
    );
  }

  // 其他操作
  Widget _buildOtherActions() {
    return Column(
      children: [
        SizedBox(height: 20.h),

        // 移除账号密码登录链接，因为我们只保留手机号登录

        SizedBox(height: 20.h),

        // 注册链接
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '还没有账号？',
              style: TextStyle(
                color: Color(0xFF666666),
                fontSize: 13.sp,
              ),
            ),
            GestureDetector(
              onTap: controller.goToRegister,
              child: Text(
                ' 立即注册',
                style: TextStyle(
                  color: Color(0xFF667EEA),
                  fontWeight: FontWeight.bold,
                  fontSize: 13.sp,
                  decoration: TextDecoration.underline,
                  decorationColor: Color(0xFF667EEA),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
