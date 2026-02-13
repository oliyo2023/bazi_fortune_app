import 'package:flutter/material.dart';

/// 页面入场动画组件
/// 
/// 为子元素添加依次延迟的入场动画
class StaggeredAnimation extends StatefulWidget {
  /// 子组件
  final Widget child;

  /// 延迟时间（毫秒）
  final int delay;

  /// 动画持续时间（毫秒）
  final int duration;

  /// 动画类型
  final StaggeredAnimationType type;

  /// 滑动偏移量
  final Offset offset;

  const StaggeredAnimation({
    super.key,
    required this.child,
    this.delay = 0,
    this.duration = 350,
    this.type = StaggeredAnimationType.fadeSlideUp,
    this.offset = const Offset(0, 30),
  });

  @override
  State<StaggeredAnimation> createState() => _StaggeredAnimationState();
}

class _StaggeredAnimationState extends State<StaggeredAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: widget.duration),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeOut,
      ),
    );

    _slideAnimation = Tween<Offset>(
      begin: widget.offset,
      end: Offset.zero,
    ).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeOutCubic,
      ),
    );

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.elasticOut,
      ),
    );

    // 延迟启动动画
    Future.delayed(Duration(milliseconds: widget.delay), () {
      if (mounted) {
        _controller.forward();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        Widget animatedChild = widget.child;

        switch (widget.type) {
          case StaggeredAnimationType.fade:
            animatedChild = Opacity(
              opacity: _fadeAnimation.value,
              child: widget.child,
            );
            break;
          case StaggeredAnimationType.slideUp:
            animatedChild = Transform.translate(
              offset: _slideAnimation.value,
              child: widget.child,
            );
            break;
          case StaggeredAnimationType.fadeSlideUp:
            animatedChild = Opacity(
              opacity: _fadeAnimation.value,
              child: Transform.translate(
                offset: _slideAnimation.value,
                child: widget.child,
              ),
            );
            break;
          case StaggeredAnimationType.scale:
            animatedChild = Transform.scale(
              scale: _scaleAnimation.value,
              child: widget.child,
            );
            break;
          case StaggeredAnimationType.fadeScale:
            animatedChild = Opacity(
              opacity: _fadeAnimation.value,
              child: Transform.scale(
                scale: _scaleAnimation.value,
                child: widget.child,
              ),
            );
            break;
        }

        return animatedChild;
      },
      child: widget.child,
    );
  }
}

/// 动画类型枚举
enum StaggeredAnimationType {
  /// 仅渐入
  fade,

  /// 仅向上滑动
  slideUp,

  /// 渐入 + 向上滑动
  fadeSlideUp,

  /// 仅缩放
  scale,

  /// 渐入 + 缩放
  fadeScale,
}

/// 页面入场动画配置
class LoginPageAnimations {
  LoginPageAnimations._();

  /// Logo动画延迟
  static const int logoDelay = 0;

  /// 标题动画延迟
  static const int titleDelay = 100;

  /// 副标题动画延迟
  static const int subtitleDelay = 200;

  /// 手机号输入框动画延迟
  static const int phoneInputDelay = 300;

  /// 验证码区域动画延迟
  static const int otpAreaDelay = 400;

  /// 登录按钮动画延迟
  static const int loginButtonDelay = 500;

  /// 底部链接动画延迟
  static const int footerDelay = 600;

  /// 动画持续时间
  static const int animationDuration = 350;
}
