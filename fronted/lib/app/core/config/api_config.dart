import 'dart:io';

/// API配置文件
class ApiConfig {
  /// API基础URL配置
  /// 根据环境自动选择合适的API地址
  static String get baseUrl {
    // 开发环境
    if (isDebugMode) {
      // Web开发环境可以使用本地API
      if (isWeb) {
        return 'http://localhost:8788';
      }
      // 移动端开发环境使用公共域名
      return 'https://bzdev.oliyo.com';
    }

    // 生产环境
    return 'https://bzdev.oliyo.com';
  }

  /// 是否为Web平台
  static bool get isWeb => identical(0, 0.0);

  /// 是否为Android平台
  static bool get isAndroid => !isWeb && Platform.isAndroid;

  /// 是否为调试模式
  static bool get isDebugMode {
    bool inDebugMode = false;
    assert(inDebugMode = true);
    return inDebugMode;
  }

  /// 获取完整的API端点URL
  static String getEndpoint(String endpoint) {
    return '$baseUrl$endpoint';
  }

  /// 超时配置
  static const Duration connectionTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
  static const Duration sendTimeout = Duration(seconds: 30);
}

/// API端点常量
class ApiEndpoints {
  static const String register = '/api/v1/auth/register';
  static const String login = '/api/v1/auth/login';
  static const String refresh = '/api/v1/auth/refresh';
  static const String profile = '/api/v1/auth/profile';
  static const String logout = '/api/v1/auth/logout';
  static const String baziCalculate = '/api/v1/bazi/calculate';
  static const String baziHistory = '/api/v1/bazi/history';
  static const String baziDetail = '/api/v1/bazi/detail';
  static const String aiAnalyze = '/api/v1/ai/analyze';
  static const String health = '/health';
  
  // 星运相关端点
  static const String astrologyChart = '/api/v1/astrology/chart';
  static const String astrologyReport = '/api/v1/astrology/report';
  static const String astrologyTransits = '/api/v1/astrology/transits';
  static const String astrologyProgressions = '/api/v1/astrology/progressions';
  static const String astrologyAspectPatterns = '/api/v1/astrology/aspect-patterns';
  static const String astrologySynastry = '/api/v1/astrology/synastry';
  static const String astrologySolarReturn = '/api/v1/astrology/solar-return';
  static const String astrologySigns = '/api/v1/astrology/signs';
  static const String astrologyPlanets = '/api/v1/astrology/planets';
  static const String astrologyHouseSystems = '/api/v1/astrology/house-systems';
  
  // 运势相关端点
  static const String fortuneToday = '/api/v1/astrology/fortune/today';
  static const String fortuneTomorrow = '/api/v1/astrology/fortune/tomorrow';
  static const String fortuneWeek = '/api/v1/astrology/fortune/week';
  static const String fortuneMonth = '/api/v1/astrology/fortune/month';
}