import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'controller.dart';

class ResetPasswordPage extends GetView<LoginController> {
  const ResetPasswordPage({super.key});

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
                    // 返回按钮和标题
                    _buildHeader(),
                    
                    SizedBox(height: 120.h),
                    
                    // 重置密码表单
                    _buildResetForm(),
                    
                    SizedBox(height: 24.h),
                    
                    // 下一步按钮
                    _buildNextButton(),
                    
                    SizedBox(height: 20.h),
                    
                    // 协议复选框
                    _buildAgreementCheckbox(),
                    
                    SizedBox(height: 80.h),
                    
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
              color: Color(0xFF667EEA).withOpacity(0.08),
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
              color: Color(0xFF764BA2).withOpacity(0.06),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => Get.back(),
            child: Icon(
              Icons.arrow_back_ios,
              color: Color(0xFF333333),
              size: 24.sp,
            ),
          ),
          Expanded(
            child: Center(
              child: Text(
                '设置新密码',
                style: TextStyle(
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF333333),
                ),
              ),
            ),
          ),
          SizedBox(width: 24.sp),
        ],
      ),
    );
  }

  Widget _buildResetForm() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Form(
        key: controller.phoneFormKey,
        child: Column(
          children: [
            // 手机号显示框（只读，已验证）
            Container(
              height: 56.h,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(28.r),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
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
                    // 手机号显示
                    Expanded(
                      child: Text(
                        controller.phoneController.text.isEmpty
                            ? '15009549773'
                            : controller.phoneController.text,
                        style: TextStyle(
                          color: Color(0xFF333333),
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w400,
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

            SizedBox(height: 14.h),

            // 新密码输入框
            Container(
              height: 56.h,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(28.r),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 14,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 18.w),
                child: Obx(() => Row(
                  children: [
                    // 新密码输入框
                    Expanded(
                      child: TextFormField(
                        controller: controller.passwordController,
                        obscureText: controller.obscurePassword.value,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return '请输入新密码';
                          }
                          if (value.length < 6 || value.length > 20) {
                            return '密码长度为6-20位';
                          }
                          if (!RegExp(r'^[a-zA-Z0-9]+$').hasMatch(value)) {
                            return '仅支持数字与字母';
                          }
                          return null;
                        },
                        style: TextStyle(
                          color: Color(0xFF333333),
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w400,
                        ),
                        decoration: InputDecoration(
                          hintText: '请输入6-20位数字与字母组合',
                          hintStyle: TextStyle(
                            color: Color(0xFFD0D0D0),
                            fontSize: 13.sp,
                          ),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.zero,
                          isDense: true,
                        ),
                      ),
                    ),
                    // 眼睛图标
                    GestureDetector(
                      onTap: controller.togglePasswordVisibility,
                      child: Icon(
                        controller.obscurePassword.value
                            ? Icons.visibility_off_outlined
                            : Icons.visibility_outlined,
                        color: Color(0xFFD0D0D0),
                        size: 20.sp,
                      ),
                    ),
                  ],
                )),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNextButton() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Obx(
        () => GestureDetector(
          onTap: controller.isLoading.value ? null : _handleResetPassword,
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
                  color: Color(0xFF8B6FD9).withOpacity(0.35),
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
                      '下一步',
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
            width: 20.w,
            height: 20.h,
            child: Checkbox(
              value: false,
              onChanged: (value) {},
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4.r),
              ),
              side: BorderSide(
                color: Color(0xFFE8E8E8),
                width: 1.5,
              ),
            ),
          ),
          SizedBox(width: 8.w),
          Expanded(
            child: Text(
              '我已阅读并同意服务使用协议和隐私政策',
              style: TextStyle(
                fontSize: 12.sp,
                color: Color(0xFF999999),
              ),
            ),
          ),
        ],
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

  void _handleResetPassword() {
    if (controller.phoneFormKey.currentState!.validate()) {
      controller.isLoading.value = true;
      
      // 模拟重置密码
      Future.delayed(Duration(seconds: 2), () {
        controller.isLoading.value = false;
        Get.snackbar(
          '成功',
          '密码重置成功，请使用新密码登录',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
        // 返回到登录页面
        Get.offAllNamed('/login');
      });
    }
  }
}
