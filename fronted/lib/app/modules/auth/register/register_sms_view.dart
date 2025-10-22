import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'controller.dart';

class RegisterSmsPage extends GetView<RegisterController> {
  const RegisterSmsPage({super.key});

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
                padding: EdgeInsets.symmetric(horizontal: 0),
                child: Column(
                  children: [
                    // 返回按钮
                    _buildHeader(),
                    
                    SizedBox(height: 80.h),
                    
                    // Logo
                    _buildLogo(),
                    
                    SizedBox(height: 80.h),
                    
                    // 注册表单
                    _buildRegisterForm(),
                    
                    SizedBox(height: 28.h),
                    
                    // 获取验证码按钮
                    _buildGetCodeButton(),
                    
                    SizedBox(height: 20.h),
                    
                    // 协议复选框
                    _buildAgreementCheckbox(),
                    
                    SizedBox(height: 80.h),
                    
                    // 账号密码登录链接
                    _buildAccountLoginLink(),
                    
                    SizedBox(height: 16.h),
                    
                    // 微信客服
                    _buildWechatService(),
                    
                    SizedBox(height: 30.h),
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

  Widget _buildHeader() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
      child: Align(
        alignment: Alignment.centerLeft,
        child: GestureDetector(
          onTap: () => Get.back(),
          child: Icon(
            Icons.arrow_back_ios,
            color: Color(0xFF333333),
            size: 24.sp,
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return Center(
      child: Container(
        width: 120.w,
        height: 120.h,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF9B6FD9),
              Color(0xFFD358D0),
            ],
          ),
          boxShadow: [
            BoxShadow(
              color: Color(0xFFB78FE5).withValues(alpha: 0.4),
              blurRadius: 20,
              offset: Offset(0, 8),
            ),
          ],
        ),
        child: Center(
          child: Text(
            'S',
            style: TextStyle(
              fontSize: 60.sp,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRegisterForm() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Form(
        key: controller.formKey,
        child: Column(
          children: [
            // 手机号输入框
            Container(
              height: 56.h,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(28.r),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.1),
                    blurRadius: 14,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 18.w),
                child: Row(
                  children: [
                    // 国家代码
                    Text(
                      '+86',
                      style: TextStyle(
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF333333),
                      ),
                    ),
                    SizedBox(width: 10.w),
                    // 分隔线
                    Container(
                      width: 1.2.w,
                      height: 24.h,
                      color: Color(0xFFDDDDDD),
                    ),
                    SizedBox(width: 14.w),
                    // 手机号输入框
                    Expanded(
                      child: TextFormField(
                        controller: controller.phoneController,
                        keyboardType: TextInputType.phone,
                        validator: controller.validatePhone,
                        style: TextStyle(
                          color: Color(0xFF333333),
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w400,
                        ),
                        decoration: InputDecoration(
                          hintText: '手机号码',
                          hintStyle: TextStyle(
                            color: Color(0xFFD0D0D0),
                            fontSize: 14.sp,
                          ),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.zero,
                          isDense: true,
                        ),
                      ),
                    ),
                    // 清空按钮
                    ValueListenableBuilder<TextEditingValue>(
                      valueListenable: controller.phoneController,
                      builder: (context, value, child) {
                        return value.text.isNotEmpty
                            ? GestureDetector(
                                onTap: () => controller.phoneController.clear(),
                                child: Container(
                                  width: 24.w,
                                  height: 24.h,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: Color(0xFFDDDDDD),
                                  ),
                                  child: Icon(
                                    Icons.clear,
                                    color: Colors.white,
                                    size: 14.sp,
                                  ),
                                ),
                              )
                            : SizedBox.shrink();
                      },
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGetCodeButton() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Obx(
        () => GestureDetector(
          onTap: controller.isLoading.value ? null : controller.sendOtp,
          child: Container(
            height: 56.h,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(28.r),
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color(0xFFA587DC),
                  Color(0xFF8B6FD9),
                ],
              ),
              boxShadow: [
                BoxShadow(
                  color: Color(0xFF8B6FD9).withValues(alpha: 0.35),
                  blurRadius: 16,
                  offset: Offset(0, 6),
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
                      '获取验证码',
                      style: TextStyle(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        letterSpacing: 0.5,
                      ),
                    ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAgreementCheckbox() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Row(
        children: [
          SizedBox(
            width: 24.w,
            height: 24.h,
            child: Checkbox(
              value: true,
              onChanged: (value) {},
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(6.r),
              ),
              fillColor: WidgetStateProperty.all(Color(0xFF8B6FD9)),
              checkColor: Colors.white,
            ),
          ),
          SizedBox(width: 8.w),
          Expanded(
            child: RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                    text: '我已阅读并同意',
                    style: TextStyle(
                      fontSize: 12.sp,
                      color: Color(0xFF333333),
                    ),
                  ),
                  TextSpan(
                    text: '服务使用协议和隐私政策',
                    style: TextStyle(
                      fontSize: 12.sp,
                      color: Color(0xFF8B6FD9),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAccountLoginLink() {
    return Center(
      child: GestureDetector(
        onTap: () => Get.back(),
        child: Text(
          '账号密码登录',
          style: TextStyle(
            fontSize: 15.sp,
            fontWeight: FontWeight.w600,
            color: Color(0xFF8B6FD9),
            decoration: TextDecoration.underline,
            decorationColor: Color(0xFF8B6FD9),
          ),
        ),
      ),
    );
  }

  Widget _buildWechatService() {
    return Center(
      child: Text(
        '如遇注册登录问题，点此复制并打开微信ebaicha005',
        style: TextStyle(
          fontSize: 12.sp,
          color: Color(0xFF999999),
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
