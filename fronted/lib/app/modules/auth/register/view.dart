import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'controller.dart';

class RegisterPage extends GetView<RegisterController> {
  const RegisterPage({super.key});

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
                    
                    SizedBox(height: 50.h),
                    
                    // 注册表单 - 默认显示手机号注册
                    _buildPhoneRegisterForm(),
                    
                    SizedBox(height: 20.h),
                    
                    // 注册按钮
                    _buildRegisterButton(),
                    
                    SizedBox(height: 20.h),
                    
                    // 协议复选框
                    _buildAgreementCheckbox(),
                    
                    SizedBox(height: 40.h),
                    
                    // 登录链接
                    _buildLoginLink(),
                    
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
                '创建账号',
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

  Widget _buildPhoneRegisterForm() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Form(
        key: controller.formKey,
        child: Column(
          children: [
            // 手机号输入框 - 作为第一个字段
            _buildPhoneInputField(),
            SizedBox(height: 14.h),
            
            // 姓名输入框
            _buildInputField(
              controller: controller.nameController,
              label: '姓名',
              hintText: '请输入姓名',
              validator: controller.validateName,
              icon: Icons.person_outlined,
            ),
            SizedBox(height: 14.h),
            
            // 验证码输入框
            _buildOtpInputField(),
            SizedBox(height: 14.h),
            
            // 移除密码输入框，因为我们只支持手机号+验证码注册
          ],
        ),
      ),
    );
  }

  Widget _buildPhoneInputField() {
    return Container(
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
    );
  }

  Widget _buildOtpInputField() {
    return Container(
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
            // 验证码输入框
            Expanded(
              child: Obx(() => controller.isOtpSent.value
                ? TextFormField(
                    controller: controller.otpController,
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
                        color: Color(0xFFCCCCCC),
                        fontSize: 14.sp,
                      ),
                      border: InputBorder.none,
                      counterText: '',
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: 10.w,
                        vertical: 12.h,
                      ),
                    ),
                  )
                : Center(
                    child: Text(
                      '请先获取验证码',
                      style: TextStyle(
                        color: Color(0xFFCCCCCC),
                        fontSize: 14.sp,
                      ),
                    ),
                  )),
            ),
            SizedBox(width: 14.w),
            // 发送验证码按钮
            Obx(() => controller.countdownSeconds.value > 0
              ? Container(
                  width: 95.w,
                  height: 38.h,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.r),
                    color: Color(0xFFF5F5F5),
                    border: Border.all(
                      color: Color(0xFFE8E8E8),
                      width: 1.w,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      '${controller.countdownSeconds.value}s',
                      style: TextStyle(
                        color: Color(0xFF999999),
                        fontSize: 12.sp,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                )
              : GestureDetector(
                  onTap: controller.sendOtp,
                  child: Container(
                    width: 95.w,
                    height: 38.h,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.r),
                      gradient: LinearGradient(
                        colors: [
                          Color(0xFF667EEA),
                          Color(0xFF764BA2),
                        ],
                      ),
                    ),
                    child: Center(
                      child: Text(
                        '获取验证码',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 11.sp,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                )),
          ],
        ),
      ),
    );
  }

  Widget _buildInputField({
    required TextEditingController controller,
    required String label,
    required String hintText,
    required String? Function(String?) validator,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return Container(
      height: 52.h,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(26.r),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 12,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        child: TextFormField(
          controller: controller,
          keyboardType: keyboardType,
          validator: validator,
          style: TextStyle(
            color: Color(0xFF333333),
            fontSize: 13.sp,
          ),
          decoration: InputDecoration(
            hintText: hintText,
            hintStyle: TextStyle(
              color: Color(0xFFCCCCCC),
              fontSize: 13.sp,
            ),
            prefixIcon: Icon(
              icon,
              color: Color(0xFFD0D0D0),
              size: 18.sp,
            ),
            prefixIconConstraints: BoxConstraints(
              minWidth: 0,
              minHeight: 0,
            ),
            border: InputBorder.none,
            contentPadding: EdgeInsets.symmetric(vertical: 12.h, horizontal: 8.w),
            isDense: true,
          ),
        ),
      ),
    );
  }

  // 移除未使用的密码字段构建方法

  Widget _buildRegisterButton() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Obx(
        () => GestureDetector(
          onTap: controller.isLoading.value ? null : controller.register,
          child: Container(
            height: 52.h,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(26.r),
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
                  color: Color(0xFF8B6FD9).withValues(alpha: 0.3),
                  blurRadius: 14,
                  offset: Offset(0, 5),
                ),
              ],
            ),
            child: Center(
              child: controller.isLoading.value
                  ? SizedBox(
                      width: 18.w,
                      height: 18.h,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.w,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : Text(
                      '注册',
                      style: TextStyle(
                        fontSize: 15.sp,
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
                fontSize: 11.sp,
                color: Color(0xFF999999),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // 移除切换到邮箱注册的链接

  Widget _buildLoginLink() {
    return Center(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            '已有账号？',
            style: TextStyle(
              fontSize: 13.sp,
              color: Color(0xFF666666),
            ),
          ),
          GestureDetector(
            onTap: controller.goToLogin,
            child: Text(
              '立即登录',
              style: TextStyle(
                fontSize: 13.sp,
                fontWeight: FontWeight.bold,
                color: Color(0xFF8B6FD9),
                decoration: TextDecoration.underline,
                decorationColor: Color(0xFF8B6FD9),
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
          fontSize: 11.sp,
          color: Color(0xFF999999),
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
