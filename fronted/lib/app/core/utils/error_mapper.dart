import 'package:get/get.dart';

/// 统一错误码到友好提示的映射器
/// 用法：ErrorMapper.hintFromException(e)
class ErrorMapper {
  /// 常见认证/网络错误码映射
  static const Map<String, String> _map = {
    // 认证类
    'invalid_credentials': '登录失败，账号或者密码不正确',
    'user_not_found': '账户不存在，请检查邮箱或前往注册',
    'email_already_in_use': '该邮箱已被注册，请直接登录',
    'weak_password': '密码太简单，请使用更复杂的密码',
    'invalid_email': '邮箱格式不正确，请重新填写',
    'otp_expired': '验证码已过期，请重新获取',
    'otp_invalid': '验证码错误，请重新输入',
    'provider_token': '第三方登录失败，请重试',
    'mfa_required': '需要二次验证，请完成后再登录',

    // 鉴权/权限
    'unauthorized': '未授权访问，请先登录',
    'forbidden': '没有权限执行该操作',
    'session_expired': '登录状态已过期，请重新登录',

    // 网络/系统
    'rate_limited': '操作过于频繁，请稍后再试',
    'network_error': '网络异常，请检查网络后重试',
    'server_error': '服务器繁忙，请稍后再试',
    'timeout': '请求超时，请稍后再试',

    // 兜底
    'unknown_error': '出错了，请稍后重试',
  };

  /// 从异常对象中解析错误码，并返回友好提示
  static String hintFromException(Object e) {
    final code = _extractCode(e);
    return _map[code] ?? _map['unknown_error']!;
  }

  /// 提供直接通过错误码取提示的能力（便于手动传 code）
  static String hintFromCode(String? code, {String? fallback}) {
    if (code == null || code.isEmpty) {
      return fallback ?? _map['unknown_error']!;
    }
    return _map[code] ?? fallback ?? _map['unknown_error']!;
  }

  /// 简易解析：尽量从 Supabase/Auth/HTTP 异常里提取 code
  /// 兼容以下情况：
  /// - AuthApiException(message: xxx, statusCode: 400, code: invalid_credentials)
  /// - 文本包含 "code: invalid_credentials"
  /// - 文本包含关键字 "Invalid login credentials"
  static String _extractCode(Object e) {
    final s = e.toString();

    // 1) 明确包含 code: xxx
    final codeMatch = RegExp(r'code:\s*([a-zA-Z0-9_.-]+)').firstMatch(s);
    if (codeMatch != null) {
      return codeMatch.group(1)!.toLowerCase();
    }

    // 2) 常见文案关键字归一
    final lower = s.toLowerCase();
    if (lower.contains('invalid login credentials') ||
        lower.contains('invalid_credentials')) {
      return 'invalid_credentials';
    }
    if (lower.contains('user not found') || lower.contains('user_not_found')) {
      return 'user_not_found';
    }
    if (lower.contains('email already') || lower.contains('already registered') ||
        lower.contains('email_already_in_use')) {
      return 'email_already_in_use';
    }
    if (lower.contains('weak password') || lower.contains('weak_password')) {
      return 'weak_password';
    }
    if (lower.contains('rate limit') || lower.contains('too many requests') ||
        lower.contains('rate_limited')) {
      return 'rate_limited';
    }
    if (lower.contains('timeout')) {
      return 'timeout';
    }
    if (lower.contains('network') || lower.contains('socket') || lower.contains('failed host lookup')) {
      return 'network_error';
    }
    if (lower.contains('401')) {
      return 'unauthorized';
    }
    if (lower.contains('403')) {
      return 'forbidden';
    }
    if (lower.contains('500')) {
      return 'server_error';
    }

    return 'unknown_error';
  }

  /// 统一的 Snackbar 弹出（便捷调用）
  static void showError(Object e, {String title = '提示'}) {
    final hint = hintFromException(e);
    Get.snackbar(title, hint);
  }
}