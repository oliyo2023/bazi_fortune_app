import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'controller.dart';
import 'register_sms_view.dart';

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
                    
                    // 注册表单
                    _buildRegisterForm(),
                    
                    SizedBox(height: 20.h),
                    
                    // 注册按钮
                    _buildRegisterButton(),
                    
                    SizedBox(height: 20.h),
                    
                    // 协议复选框
                    _buildAgreementCheckbox(),
                    
                    SizedBox(height: 40.h),
                    
                    // 短信注册链接
                    _buildSmsRegisterLink(),
                    
                    SizedBox(height: 12.h),
                    
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

  Widget _buildRegisterForm() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Form(
        key: controller.formKey,
        child: Column(
          children: [
            // 姓名输入框
            _buildInputField(
              controller: controller.nameController,
              label: '姓名',
              hintText: '请输入姓名',
              validator: controller.validateName,
              icon: Icons.person_outlined,
            ),
            SizedBox(height: 14.h),
            
            // 邮箱输入框
            _buildInputField(
              controller: controller.emailController,
              label: '邮箱',
              hintText: '请输入邮箱',
              validator: controller.validateEmail,
              icon: Icons.email_outlined,
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: 14.h),
            
            // 密码输入框
            Obx(() => _buildPasswordField(
              controller: controller.passwordController,
              label: '密码',
              hintText: '请输入密码',
              validator: controller.validatePassword,
              obscureText: controller.obscurePassword.value,
              onVisibilityToggle: controller.togglePasswordVisibility,
            )),
            SizedBox(height: 14.h),
            
            // 确认密码输入框
            Obx(() => _buildPasswordField(
              controller: controller.confirmPasswordController,
              label: '确认密码',
              hintText: '请确认密码',
              validator: controller.validateConfirmPassword,
              obscureText: controller.obscureConfirmPassword.value,
              onVisibilityToggle: controller.toggleConfirmPasswordVisibility,
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
            color: Colors.black.withOpacity(0.08),
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

  Widget _buildPasswordField({
    required TextEditingController controller,
    required String label,
    required String hintText,
    required String? Function(String?) validator,
    required bool obscureText,
    required VoidCallback onVisibilityToggle,
  }) {
    return Container(
      height: 52.h,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(26.r),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 12,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        child: Row(
          children: [
            Icon(
              Icons.lock_outlined,
              color: Color(0xFFD0D0D0),
              size: 18.sp,
            ),
            SizedBox(width: 8.w),
            Expanded(
              child: TextFormField(
                controller: controller,
                obscureText: obscureText,
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
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(vertical: 12.h),
                  isDense: true,
                ),
              ),
            ),
            GestureDetector(
              onTap: onVisibilityToggle,
              child: Icon(
                obscureText ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                color: Color(0xFFD0D0D0),
                size: 18.sp,
              ),
            ),
          ],
        ),
      ),
    );
  }

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
                  color: Color(0xFF8B6FD9).withOpacity(0.3),
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

  Widget _buildSmsRegisterLink() {
    return GestureDetector(
      onTap: () => Get.to(() => RegisterSmsPage(), binding: BindingsBuilder(() {
        Get.put(RegisterController());
      })),
      child: Center(
        child: Text(
          '短信登录注册',
          style: TextStyle(
            fontSize: 14.sp,
            fontWeight: FontWeight.w600,
            color: Color(0xFF8B6FD9),
            decoration: TextDecoration.underline,
            decorationColor: Color(0xFF8B6FD9),
          ),
        ),
      ),
    );
  }

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
