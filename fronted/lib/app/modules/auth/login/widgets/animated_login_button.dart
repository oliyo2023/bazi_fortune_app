import 'package:flutter/material.dart';

/// 带动画效果的登录按钮
///
/// 状态：
/// - idle: 正常状态
/// - loading: 加载中（按钮收缩为圆形，显示进度条）
/// - success: 成功（显示打勾动画）
/// - error: 错误（抖动后恢复）
enum LoginButtonState { idle, loading, success, error }

class AnimatedLoginButton extends StatefulWidget {
  /// 按钮文字
  final String text;

  /// 点击回调
  final VoidCallback? onPressed;

  /// 按钮状态
  final LoginButtonState state;

  /// 按钮高度
  final double height;

  /// 最小宽度（加载状态时的圆形直径）
  final double minWidth;

  const AnimatedLoginButton({
    super.key,
    this.text = '登录',
    this.onPressed,
    this.state = LoginButtonState.idle,
    this.height = 50,
    this.minWidth = 50,
  });

  @override
  State<AnimatedLoginButton> createState() => _AnimatedLoginButtonState();
}

class _AnimatedLoginButtonState extends State<AnimatedLoginButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _checkAnimation;
  late Animation<double> _shakeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );

    _checkAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );

    _shakeAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 0, end: 10), weight: 1),
      TweenSequenceItem(tween: Tween(begin: 10, end: -10), weight: 1),
      TweenSequenceItem(tween: Tween(begin: -10, end: 10), weight: 1),
      TweenSequenceItem(tween: Tween(begin: 10, end: -5), weight: 1),
      TweenSequenceItem(tween: Tween(begin: -5, end: 0), weight: 1),
    ]).animate(CurvedAnimation(parent: _controller, curve: Curves.elasticIn));
  }

  @override
  void didUpdateWidget(AnimatedLoginButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.state != widget.state) {
      _handleStateChange(oldWidget.state, widget.state);
    }
  }

  void _handleStateChange(
    LoginButtonState oldState,
    LoginButtonState newState,
  ) {
    switch (newState) {
      case LoginButtonState.loading:
        _controller.forward();
        break;
      case LoginButtonState.success:
        _controller.forward();
        break;
      case LoginButtonState.error:
        _controller.forward(from: 0).then((_) {
          _controller.reverse();
        });
        break;
      case LoginButtonState.idle:
        _controller.reverse();
        break;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        // 根据状态计算宽度
        double width = double.infinity;
        if (widget.state == LoginButtonState.loading ||
            widget.state == LoginButtonState.success) {
          width = widget.height; // 变成圆形
        }

        // 抖动偏移
        double offsetX = 0;
        if (widget.state == LoginButtonState.error) {
          offsetX = _shakeAnimation.value;
        }

        return Transform.translate(
          offset: Offset(offsetX, 0),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut,
            width: width,
            height: widget.height,
            child: ElevatedButton(
              onPressed: widget.state == LoginButtonState.idle
                  ? widget.onPressed
                  : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: widget.state == LoginButtonState.error
                    ? colorScheme.error
                    : colorScheme.primary,
                foregroundColor: colorScheme.onPrimary,
                disabledBackgroundColor: colorScheme.primary,
                disabledForegroundColor: colorScheme.onPrimary,
                minimumSize: Size(widget.minWidth, widget.height),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(
                    widget.state == LoginButtonState.loading ||
                            widget.state == LoginButtonState.success
                        ? widget.height / 2
                        : 12,
                  ),
                ),
                elevation: 0,
                padding: EdgeInsets.zero,
              ),
              child: _buildChild(colorScheme),
            ),
          ),
        );
      },
    );
  }

  Widget _buildChild(ColorScheme colorScheme) {
    switch (widget.state) {
      case LoginButtonState.loading:
        return SizedBox(
          width: 24,
          height: 24,
          child: CircularProgressIndicator(
            strokeWidth: 2.5,
            valueColor: AlwaysStoppedAnimation<Color>(colorScheme.onPrimary),
          ),
        );
      case LoginButtonState.success:
        return _CheckIcon(animation: _checkAnimation);
      case LoginButtonState.error:
        return const Icon(Icons.close_rounded, size: 24);
      case LoginButtonState.idle:
        return Text(
          widget.text,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        );
    }
  }
}

/// 打勾动画图标
class _CheckIcon extends StatelessWidget {
  final Animation<double> animation;

  const _CheckIcon({required this.animation});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        return Icon(
          Icons.check_rounded,
          size: 24 + (animation.value * 4),
          color: Colors.white,
        );
      },
    );
  }
}
