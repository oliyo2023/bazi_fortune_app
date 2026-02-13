import 'package:flutter/material.dart';

/// 带动画效果的Logo组件
///
/// 动画效果：
/// - 缩放渐入
/// - 呼吸光效
class AnimatedLogo extends StatefulWidget {
  /// Logo大小
  final double size;

  /// 图标
  final IconData icon;

  /// 渐变色起始
  final Color gradientStart;

  /// 渐变色结束
  final Color gradientEnd;

  /// 是否启用呼吸动画
  final bool enableBreathing;

  const AnimatedLogo({
    super.key,
    this.size = 80,
    this.icon = Icons.auto_awesome,
    required this.gradientStart,
    required this.gradientEnd,
    this.enableBreathing = true,
  });

  @override
  State<AnimatedLogo> createState() => _AnimatedLogoState();
}

class _AnimatedLogoState extends State<AnimatedLogo>
    with TickerProviderStateMixin {
  late AnimationController _scaleController;
  late AnimationController _breathingController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _fadeAnimation;
  late Animation<double> _breathingAnimation;

  @override
  void initState() {
    super.initState();

    // 缩放和渐入动画
    _scaleController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );

    _scaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _scaleController, curve: Curves.elasticOut),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _scaleController,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );

    // 呼吸动画
    _breathingController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    );

    _breathingAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _breathingController, curve: Curves.easeInOut),
    );

    // 启动动画
    _scaleController.forward();

    if (widget.enableBreathing) {
      _breathingController.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _scaleController.dispose();
    _breathingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([_scaleController, _breathingController]),
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Opacity(
            opacity: _fadeAnimation.value,
            child: Container(
              width: widget.size,
              height: widget.size,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(widget.size * 0.25),
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Color.lerp(
                      widget.gradientStart,
                      widget.gradientStart.withWhite(30),
                      _breathingAnimation.value * 0.3,
                    )!,
                    Color.lerp(
                      widget.gradientEnd,
                      widget.gradientEnd.withWhite(30),
                      _breathingAnimation.value * 0.3,
                    )!,
                  ],
                ),
                boxShadow: [
                  BoxShadow(
                    color: widget.gradientStart.withValues(
                      alpha: 0.3 + (_breathingAnimation.value * 0.1),
                    ),
                    blurRadius: 20 + (_breathingAnimation.value * 5),
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Icon(
                widget.icon,
                color: Colors.white,
                size: widget.size * 0.5,
              ),
            ),
          ),
        );
      },
    );
  }
}

/// 扩展方法：调整颜色亮度
extension ColorExtension on Color {
  Color withWhite(int amount) {
    return Color.fromARGB(
      (a * 255.0).round().clamp(0, 255),
      (r * 255.0).round().clamp(0, 255) + amount,
      (g * 255.0).round().clamp(0, 255) + amount,
      (b * 255.0).round().clamp(0, 255) + amount,
    );
  }
}
