import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'controller.dart';
import 'widgets/animated_logo.dart';
import 'widgets/otp_input_field.dart';
import 'widgets/animated_login_button.dart';
import 'widgets/staggered_animation.dart';
import '../../../core/theme/app_theme.dart';

class LoginPage extends GetView<LoginController> {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: const Size(375, 812));

    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: Colors.transparent,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios_new,
            color: LoginColors.textPrimary,
            size: 22.w,
          ),
          onPressed: () {
            if (controller.currentStep.value == 2) {
              controller.goToPreviousStep();
            } else {
              Navigator.of(context).pop();
            }
          },
        ),
      ),
      extendBodyBehindAppBar: true,
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [LoginColors.backgroundStart, LoginColors.backgroundEnd],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            padding: EdgeInsets.symmetric(horizontal: 24.w),
            child: Column(
              children: [
                SizedBox(height: 60.h),
                // Logo
                _buildLogo(),
                SizedBox(height: 24.h),
                // 标题
                _buildTitle(),
                SizedBox(height: 8.h),
                // 副标题
                _buildSubtitle(),
                SizedBox(height: 48.h),
                // 登录表单卡片 - 根据步骤显示不同内容
                Obx(() => _buildLoginFormCard(colorScheme)),
                SizedBox(height: 24.h),
                // 底部链接
                _buildFooter(),
                SizedBox(height: 40.h),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return StaggeredAnimation(
      delay: LoginPageAnimations.logoDelay,
      type: StaggeredAnimationType.fadeScale,
      child: AnimatedLogo(
        size: 80.w,
        gradientStart: LoginColors.gradientStart,
        gradientEnd: LoginColors.gradientEnd,
      ),
    );
  }

  Widget _buildTitle() {
    return StaggeredAnimation(
      delay: LoginPageAnimations.titleDelay,
      type: StaggeredAnimationType.fadeSlideUp,
      child: Text(
        '八字算命',
        style: TextStyle(
          fontSize: 28.sp,
          fontWeight: FontWeight.bold,
          color: LoginColors.textPrimary,
        ),
      ),
    );
  }

  Widget _buildSubtitle() {
    return StaggeredAnimation(
      delay: LoginPageAnimations.subtitleDelay,
      type: StaggeredAnimationType.fade,
      child: Text(
        '洞察命运，指引人生',
        style: TextStyle(fontSize: 16.sp, color: LoginColors.textSecondary),
      ),
    );
  }

  Widget _buildLoginFormCard(ColorScheme colorScheme) {
    return StaggeredAnimation(
      delay: LoginPageAnimations.phoneInputDelay,
      type: StaggeredAnimationType.fadeSlideUp,
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        transitionBuilder: (child, animation) {
          return FadeTransition(
            opacity: animation,
            child: SlideTransition(
              position: Tween<Offset>(
                begin: const Offset(0.1, 0),
                end: Offset.zero,
              ).animate(animation),
              child: child,
            ),
          );
        },
        child: controller.currentStep.value == 1
            ? _buildStepOnePhone(colorScheme)
            : _buildStepTwoOtp(colorScheme),
      ),
    );
  }

  /// 第一步：输入手机号
  Widget _buildStepOnePhone(ColorScheme colorScheme) {
    return Container(
      key: const ValueKey('step1'),
      padding: EdgeInsets.all(24.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 标题
          Text(
            '手机号登录',
            style: TextStyle(
              fontSize: 20.sp,
              fontWeight: FontWeight.bold,
              color: LoginColors.textPrimary,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            '请输入手机号获取验证码',
            style: TextStyle(fontSize: 14.sp, color: LoginColors.textSecondary),
          ),
          SizedBox(height: 24.h),
          // 手机号输入框
          _buildPhoneInput(),
          SizedBox(height: 24.h),
          // 获取验证码按钮
          _buildGetCodeButton(colorScheme),
        ],
      ),
    );
  }

  /// 第二步：输入验证码
  Widget _buildStepTwoOtp(ColorScheme colorScheme) {
    return Container(
      key: const ValueKey('step2'),
      padding: EdgeInsets.all(24.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 标题
          Text(
            '输入验证码',
            style: TextStyle(
              fontSize: 20.sp,
              fontWeight: FontWeight.bold,
              color: LoginColors.textPrimary,
            ),
          ),
          SizedBox(height: 8.h),
          // 显示手机号
          Row(
            children: [
              Text(
                '验证码已发送至 ',
                style: TextStyle(
                  fontSize: 14.sp,
                  color: LoginColors.textSecondary,
                ),
              ),
              Text(
                controller.phoneController.text.trim(),
                style: TextStyle(
                  fontSize: 14.sp,
                  color: LoginColors.textPrimary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          SizedBox(height: 24.h),
          // 验证码输入框
          Obx(
            () => OtpInputField(
              key: controller.otpFieldKey,
              length: 6,
              boxWidth: 48.w,
              boxHeight: 56.h,
              boxSpacing: 6.w,
              hasError: controller.hasError.value,
              onChanged: controller.onOtpChanged,
              onCompleted: controller.onOtpCompleted,
            ),
          ),
          SizedBox(height: 16.h),
          // 重新发送验证码
          Obx(() => _buildResendCodeButton()),
          SizedBox(height: 24.h),
          // 登录按钮
          Obx(
            () => AnimatedLoginButton(
              text: '登录',
              state: controller.buttonState.value,
              onPressed: controller.login,
              height: 50.h,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPhoneInput() {
    return Container(
      height: 56.h,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.r),
        color: Theme.of(Get.context!).colorScheme.surfaceContainerHighest,
      ),
      child: Row(
        children: [
          SizedBox(width: 16.w),
          Text(
            '+86',
            style: TextStyle(
              color: LoginColors.textPrimary,
              fontSize: 16.sp,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(width: 8.w),
          Container(width: 1.w, height: 24.h, color: LoginColors.otpBoxBorder),
          SizedBox(width: 12.w),
          Expanded(
            child: TextField(
              controller: controller.phoneController,
              focusNode: controller.phoneFocusNode,
              keyboardType: TextInputType.phone,
              style: TextStyle(
                color: LoginColors.textPrimary,
                fontSize: 16.sp,
                fontWeight: FontWeight.w500,
              ),
              decoration: InputDecoration(
                hintText: '请输入手机号',
                hintStyle: TextStyle(
                  color: LoginColors.textHint,
                  fontSize: 16.sp,
                ),
                border: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 12.w,
                  vertical: 16.h,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// 第一步的获取验证码按钮
  Widget _buildGetCodeButton(ColorScheme colorScheme) {
    return Obx(() {
      final isValidPhone = controller.isPhoneValid.value;
      final isSending = controller.isSendingCode.value;

      return GestureDetector(
        onTap: (isValidPhone && !isSending) ? controller.sendSmsCode : null,
        child: Container(
          height: 50.h,
          decoration: BoxDecoration(
            gradient: (isValidPhone && !isSending)
                ? LinearGradient(
                    colors: [
                      colorScheme.primary,
                      colorScheme.primary.withBlue(200),
                    ],
                  )
                : null,
            color: (isValidPhone && !isSending) ? null : Colors.grey.shade300,
            borderRadius: BorderRadius.circular(25.r),
          ),
          child: Center(
            child: isSending
                ? SizedBox(
                    width: 20.w,
                    height: 20.w,
                    child: const CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : Text(
                    '获取验证码',
                    style: TextStyle(
                      fontSize: 16.sp,
                      fontWeight: FontWeight.w600,
                      color: (isValidPhone && !isSending)
                          ? Colors.white
                          : Colors.grey.shade500,
                    ),
                  ),
          ),
        ),
      );
    });
  }

  /// 重新发送验证码按钮
  Widget _buildResendCodeButton() {
    final countdown = controller.countdown.value;
    final isSending = controller.isSendingCode.value;

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          '没有收到验证码？',
          style: TextStyle(fontSize: 14.sp, color: LoginColors.textSecondary),
        ),
        GestureDetector(
          onTap: (countdown == 0 && !isSending)
              ? controller.resendSmsCode
              : null,
          child: isSending
              ? Padding(
                  padding: EdgeInsets.symmetric(horizontal: 12.w),
                  child: SizedBox(
                    width: 14.w,
                    height: 14.w,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Theme.of(Get.context!).colorScheme.primary,
                    ),
                  ),
                )
              : Text(
                  countdown > 0 ? '${countdown}s后重发' : '重新发送',
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: countdown > 0
                        ? LoginColors.textHint
                        : Theme.of(Get.context!).colorScheme.primary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
        ),
      ],
    );
  }

  Widget _buildFooter() {
    return StaggeredAnimation(
      delay: LoginPageAnimations.footerDelay,
      type: StaggeredAnimationType.fade,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            '还没有账号？',
            style: TextStyle(color: LoginColors.textSecondary, fontSize: 14.sp),
          ),
          TextButton(
            onPressed: controller.goToRegister,
            child: Text(
              '立即注册',
              style: TextStyle(
                color: Theme.of(Get.context!).colorScheme.primary,
                fontSize: 14.sp,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
