import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:async';

/// 4位验证码输入框组件
///
/// 特性：
/// - 4个独立输入框
/// - 自动跳转下一格
/// - 支持粘贴完整验证码
/// - 输入动画效果
/// - 错误抖动动画
class OtpInputField extends StatefulWidget {
  /// 验证码长度
  final int length;

  /// 输入完成回调
  final ValueChanged<String> onCompleted;

  /// 输入变化回调
  final ValueChanged<String>? onChanged;

  /// 输入框宽度
  final double boxWidth;

  /// 输入框高度
  final double boxHeight;

  /// 输入框间距
  final double boxSpacing;

  /// 文字样式
  final TextStyle? textStyle;

  /// 是否显示错误状态
  final bool hasError;

  /// 是否禁用
  final bool enabled;

  const OtpInputField({
    super.key,
    this.length = 4,
    required this.onCompleted,
    this.onChanged,
    this.boxWidth = 50,
    this.boxHeight = 56,
    this.boxSpacing = 8,
    this.textStyle,
    this.hasError = false,
    this.enabled = true,
  });

  @override
  State<OtpInputField> createState() => OtpInputFieldState();
}

class OtpInputFieldState extends State<OtpInputField>
    with TickerProviderStateMixin {
  late List<FocusNode> _focusNodes;
  late List<TextEditingController> _controllers;
  late List<AnimationController> _shakeControllers;
  late List<Animation<double>> _shakeAnimations;

  bool _isShaking = false;

  @override
  void initState() {
    super.initState();
    _focusNodes = List.generate(widget.length, (_) => FocusNode());
    _controllers = List.generate(widget.length, (_) => TextEditingController());
    _shakeControllers = List.generate(
      widget.length,
      (_) => AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 400),
      ),
    );
    _shakeAnimations = _shakeControllers.map((controller) {
      return Tween<double>(
        begin: 0,
        end: 1,
      ).animate(CurvedAnimation(parent: controller, curve: Curves.elasticIn));
    }).toList();
  }

  @override
  void dispose() {
    for (var node in _focusNodes) {
      node.dispose();
    }
    for (var controller in _controllers) {
      controller.dispose();
    }
    for (var controller in _shakeControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  /// 触发错误抖动动画
  void shake() {
    if (_isShaking) return;
    _isShaking = true;

    for (var controller in _shakeControllers) {
      controller.forward(from: 0);
    }

    Future.delayed(const Duration(milliseconds: 500), () {
      _isShaking = false;
    });
  }

  /// 清空所有输入
  void clear() {
    for (var controller in _controllers) {
      controller.clear();
    }
    _focusNodes[0].requestFocus();
  }

  /// 获取当前输入的验证码
  String get otp => _controllers.map((c) => c.text).join();

  /// 设置验证码（用于自动填充）
  void setOtp(String code) {
    final chars = code.split('');
    for (var i = 0; i < widget.length && i < chars.length; i++) {
      _controllers[i].text = chars[i];
    }
    _onChanged();
  }

  void _onChanged() {
    final code = otp;
    widget.onChanged?.call(code);
    if (code.length == widget.length) {
      widget.onCompleted(code);
    }
  }

  void _onInput(int index, String value) {
    if (value.isEmpty) return;

    // 只保留最后一个字符
    if (value.length > 1) {
      // 检测是否为粘贴操作
      if (value.length == widget.length) {
        // 粘贴完整验证码
        for (var i = 0; i < widget.length; i++) {
          _controllers[i].text = value[i];
        }
        _focusNodes[widget.length - 1].requestFocus();
        _onChanged();
        return;
      }
      // 只保留最后一个字符
      _controllers[index].text = value[value.length - 1];
    }

    // 自动跳转到下一格
    if (index < widget.length - 1) {
      _focusNodes[index + 1].requestFocus();
    }

    _onChanged();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return LayoutBuilder(
      builder: (context, constraints) {
        // 计算自适应的输入框宽度
        final totalSpacing = widget.boxSpacing * (widget.length - 1);
        final availableWidth = constraints.maxWidth - totalSpacing;
        final adaptiveWidth = (availableWidth / widget.length).clamp(
          36.0,
          widget.boxWidth,
        );

        return Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(widget.length, (index) {
            return AnimatedBuilder(
              animation: _shakeAnimations[index],
              builder: (context, child) {
                final shakeValue = _shakeAnimations[index].value;
                final offset = shakeValue * 10 * (shakeValue < 0.5 ? 1 : -1);
                return Transform.translate(
                  offset: Offset(offset, 0),
                  child: child,
                );
              },
              child: Container(
                width: adaptiveWidth,
                height: widget.boxHeight,
                margin: EdgeInsets.symmetric(horizontal: widget.boxSpacing / 2),
                child: TextFormField(
                  controller: _controllers[index],
                  focusNode: _focusNodes[index],
                  enabled: widget.enabled,
                  keyboardType: TextInputType.number,
                  textAlign: TextAlign.center,
                  textAlignVertical: TextAlignVertical.center,
                  style:
                      widget.textStyle ??
                      TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: colorScheme.onSurface,
                      ),
                  inputFormatters: [
                    FilteringTextInputFormatter.digitsOnly,
                    LengthLimitingTextInputFormatter(1),
                  ],
                  onChanged: (value) => _onInput(index, value),
                  onFieldSubmitted: (_) {
                    if (index < widget.length - 1) {
                      _focusNodes[index + 1].requestFocus();
                    }
                  },
                  decoration: InputDecoration(
                    counterText: '',
                    contentPadding: EdgeInsets.zero,
                    filled: true,
                    fillColor: _getFillColor(index, colorScheme),
                    border: _getBorder(index, colorScheme),
                    enabledBorder: _getBorder(index, colorScheme),
                    focusedBorder: _getFocusedBorder(colorScheme),
                    errorBorder: _getErrorBorder(colorScheme),
                    focusedErrorBorder: _getErrorBorder(colorScheme),
                  ),
                ),
              ),
            );
          }),
        );
      },
    );
  }

  Color _getFillColor(int index, ColorScheme colorScheme) {
    if (widget.hasError) {
      return colorScheme.errorContainer.withValues(alpha: 0.3);
    }
    if (_controllers[index].text.isNotEmpty) {
      return colorScheme.primaryContainer.withValues(alpha: 0.3);
    }
    if (_focusNodes[index].hasFocus) {
      return colorScheme.surfaceContainerHigh;
    }
    return colorScheme.surfaceContainerHighest;
  }

  OutlineInputBorder _getBorder(int index, ColorScheme colorScheme) {
    if (widget.hasError) {
      return OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: colorScheme.error, width: 1),
      );
    }
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    );
  }

  OutlineInputBorder _getFocusedBorder(ColorScheme colorScheme) {
    if (widget.hasError) {
      return OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: colorScheme.error, width: 2),
      );
    }
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: colorScheme.primary, width: 2),
    );
  }

  OutlineInputBorder _getErrorBorder(ColorScheme colorScheme) {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: colorScheme.error, width: 1),
    );
  }
}
