import 'dart:async';
import 'package:get/get.dart';
import 'package:logger/logger.dart';

import '../../modules/astrology/models/astrology_model.dart';
import 'token_manager.dart';
import '../../core/config/api_config.dart';

class AstrologyService extends GetxService {
  static AstrologyService get to => Get.find();

  final String _baseUrl = ApiConfig.baseUrl;
  final TokenManager _tokenManager = TokenManager();
  final GetConnect _client = GetConnect();
  final Logger _logger = Logger();

  bool _isRefreshing = false;
  Completer<bool>? _refreshCompleter;

  @override
  void onInit() {
    super.onInit();
    // 基础设置
    _client.timeout = const Duration(seconds: 30);
    // 全局请求拦截：自动注入 Authorization
    _client.httpClient.addRequestModifier<dynamic>((request) {
      final t = _tokenManager.token;
      request.headers['Content-Type'] = 'application/json';
      if (t != null && t.isNotEmpty) {
        request.headers['Authorization'] = 'Bearer $t';
      }
      return request;
    });
    // 全局响应拦截：统一透传（401 刷新与重放由 _sendWithRetry 负责）
    _client.httpClient.addResponseModifier<dynamic>((request, response) async {
      return response;
    });
  }


  Future<Response> _dispatch(
    String method,
    String url, {
    dynamic body,
    Map<String, String>? headers,
  }) {
    switch (method.toUpperCase()) {
      case 'GET':
        return _client.get(url, headers: headers);
      case 'POST':
        return _client.post(url, body, headers: headers);
      case 'PUT':
        return _client.put(url, body, headers: headers);
      case 'PATCH':
        return _client.patch(url, body, headers: headers);
      case 'DELETE':
        return _client.delete(url, headers: headers);
      default:
        return _client.request(method, url, body: body, headers: headers);
    }
  }

  Future<Response> _sendWithRetry(
    String method,
    String url, {
    dynamic body,
    Map<String, String>? headers,
  }) async {
    // 第一次请求
    Response res = await _dispatch(method, url, body: body, headers: headers);
    if (res.statusCode != 401) return res;

    // 401 -> 刷新一次
    final ok = await _refreshToken();
    if (!ok) {
      await _tokenManager.clear();
      if (Get.currentRoute != '/login') Get.offAllNamed('/login');
      return res;
    }

    // 刷新成功后重试一次
    final newHeaders = <String, String>{...?headers};
    newHeaders.remove('Authorization'); // 让请求拦截器用新 token 注入
    return await _dispatch(method, url, body: body, headers: newHeaders);
  }

  Future<bool> _refreshToken() async {
    // 单飞刷新：如果正在刷新，等待同一个 Completer
    if (_isRefreshing) {
      if (_refreshCompleter != null) {
        try {
          return await _refreshCompleter!.future;
        } catch (_) {
          return false;
        }
      }
    }

    _isRefreshing = true;
    _refreshCompleter = Completer<bool>();

    try {
      final resp = await _client.post('$_baseUrl/api/v1/auth/refresh', {});
      if (resp.statusCode == 200) {
        final body = resp.body;
        final wrapper = (body is Map) ? body : {};
        final data = wrapper['data'] ?? wrapper; // 兼容老格式
        final newToken = (data is Map) ? data['token'] as String? : null;
        final user = (data is Map) ? data['user'] : null;
        final uid = (user is Map) ? user['id'] as String? : null;
        final ok = (newToken != null && uid != null);
        if (ok) {
          await _tokenManager.save(newToken, uid);
          _refreshCompleter?.complete(true);
          return true;
        }
      }
      _refreshCompleter?.complete(false);
      return false;
    } catch (e) {
      _refreshCompleter?.completeError(e);
      return false;
    } finally {
      _isRefreshing = false;
      _refreshCompleter = null;
    }
  }

  // 创建星盘
  Future<AstrologyChart> createChart({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    String nation = "China",
    String? timezone,
    String houseSystem = "Placidus",
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
          'nation': nation,
          if (timezone != null) 'timezone': timezone,
        },
        'house_system': houseSystem,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/chart',
        body: requestData,
      );

      if (response.statusCode == 200) {
        final chartData = response.body['chart'];
        return AstrologyChart.fromJson(chartData);
      } else {
        throw Exception('创建星盘失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('创建星盘错误: $e');
      throw Exception('创建星盘失败: ${e.toString()}');
    }
  }

  // 生成星盘报告
  Future<Map<String, dynamic>> generateReport({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    String nation = "China",
    String? timezone,
    String houseSystem = "Placidus",
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
          'nation': nation,
          if (timezone != null) 'timezone': timezone,
        },
        'house_system': houseSystem,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/report',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return response.body;
      } else {
        throw Exception('生成报告失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('生成报告错误: $e');
      throw Exception('生成报告失败: ${e.toString()}');
    }
  }

  // 计算行运
  Future<Map<String, dynamic>> calculateTransits({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    required String startDate,
    required String endDate,
    String transitType = "natal",
    String? location,
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
        },
        'start_date': startDate,
        'end_date': endDate,
        'transit_type': transitType,
        if (location != null) 'location': location,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/transits',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return response.body;
      } else {
        throw Exception('计算行运失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('计算行运错误: $e');
      throw Exception('计算行运失败: ${e.toString()}');
    }
  }

  // 计算推运
  Future<Map<String, dynamic>> calculateProgressions({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    required String progressionDate,
    String progressionType = "secondary",
    String houseSystem = "Placidus",
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
        },
        'progression_date': progressionDate,
        'progression_type': progressionType,
        'house_system': houseSystem,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/progressions',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return response.body;
      } else {
        throw Exception('计算推运失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('计算推运错误: $e');
      throw Exception('计算推运失败: ${e.toString()}');
    }
  }

  // 分析相位格局
  Future<Map<String, dynamic>> analyzeAspectPatterns({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    String houseSystem = "Placidus",
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
        },
        'house_system': houseSystem,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/aspect-patterns',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return response.body;
      } else {
        throw Exception('分析相位格局失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('分析相位格局错误: $e');
      throw Exception('分析相位格局失败: ${e.toString()}');
    }
  }

  // 关系合盘
  Future<Map<String, dynamic>> synastryAnalysis({
    required Map<String, dynamic> person1BirthData,
    required Map<String, dynamic> person2BirthData,
    String houseSystem = "Placidus",
  }) async {
    try {
      final requestData = {
        'person1_birth_data': person1BirthData,
        'person2_birth_data': person2BirthData,
        'house_system': houseSystem,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/synastry',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return response.body;
      } else {
        throw Exception('关系合盘分析失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('关系合盘分析错误: $e');
      throw Exception('关系合盘分析失败: ${e.toString()}');
    }
  }

  // 太阳返照
  Future<Map<String, dynamic>> solarReturn({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    required int returnYear,
    String? location,
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
        },
        'return_year': returnYear,
        if (location != null) 'location': location,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/solar-return',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return response.body;
      } else {
        throw Exception('太阳返照计算失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('太阳返照计算错误: $e');
      throw Exception('太阳返照计算失败: ${e.toString()}');
    }
  }

  // 获取星座信息
  Future<List<Map<String, dynamic>>> getZodiacSigns() async {
    try {
      final response = await _sendWithRetry(
        'GET',
        '$_baseUrl/api/v1/astrology/signs',
      );

      if (response.statusCode == 200) {
        return List<Map<String, dynamic>>.from(response.body['signs']);
      } else {
        throw Exception('获取星座信息失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('获取星座信息错误: $e');
      throw Exception('获取星座信息失败: ${e.toString()}');
    }
  }

  // 获取行星信息
  Future<List<Map<String, dynamic>>> getPlanets() async {
    try {
      final response = await _sendWithRetry(
        'GET',
        '$_baseUrl/api/v1/astrology/planets',
      );

      if (response.statusCode == 200) {
        return List<Map<String, dynamic>>.from(response.body['planets']);
      } else {
        throw Exception('获取行星信息失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('获取行星信息错误: $e');
      throw Exception('获取行星信息失败: ${e.toString()}');
    }
  }

  // 获取宫位系统信息
  Future<List<Map<String, dynamic>>> getHouseSystems() async {
    try {
      final response = await _sendWithRetry(
        'GET',
        '$_baseUrl/api/v1/astrology/house-systems',
      );

      if (response.statusCode == 200) {
        return List<Map<String, dynamic>>.from(response.body['systems']);
      } else {
        throw Exception('获取宫位系统信息失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('获取宫位系统信息错误: $e');
      throw Exception('获取宫位系统信息失败: ${e.toString()}');
    }
  }

  // 运势相关方法

  // 今日运势
  Future<FortuneData> getTodayFortune({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    String? location,
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
        },
        if (location != null) 'location': location,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/fortune/today',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return FortuneData.fromJson(response.body['data']);
      } else {
        throw Exception('获取今日运势失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('获取今日运势错误: $e');
      throw Exception('获取今日运势失败: ${e.toString()}');
    }
  }

  // 明日运势
  Future<FortuneData> getTomorrowFortune({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    String? location,
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
        },
        if (location != null) 'location': location,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/fortune/tomorrow',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return FortuneData.fromJson(response.body['data']);
      } else {
        throw Exception('获取明日运势失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('获取明日运势错误: $e');
      throw Exception('获取明日运势失败: ${e.toString()}');
    }
  }

  // 本周运势
  Future<FortuneData> getWeekFortune({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    String? location,
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
        },
        if (location != null) 'location': location,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/fortune/week',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return FortuneData.fromJson(response.body['data']);
      } else {
        throw Exception('获取本周运势失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('获取本周运势错误: $e');
      throw Exception('获取本周运势失败: ${e.toString()}');
    }
  }

  // 本月运势
  Future<FortuneData> getMonthFortune({
    required int year,
    required int month,
    required int day,
    required int hour,
    required int minute,
    required String city,
    String? location,
  }) async {
    try {
      final requestData = {
        'birth_data': {
          'year': year,
          'month': month,
          'day': day,
          'hour': hour,
          'minute': minute,
          'city': city,
        },
        if (location != null) 'location': location,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/astrology/fortune/month',
        body: requestData,
      );

      if (response.statusCode == 200) {
        return FortuneData.fromJson(response.body['data']);
      } else {
        throw Exception('获取本月运势失败: ${response.body?['error'] ?? response.statusText}');
      }
    } catch (e) {
      _logger.e('获取本月运势错误: $e');
      throw Exception('获取本月运势失败: ${e.toString()}');
    }
  }
}

// 运势数据模型
class FortuneData {
  final String period;
  final String dateRange;
  final double overallScore;
  final String overallMood;
  final List<KeyTransit> keyTransits;
  final LifeAreas lifeAreas;
  final String advice;
  final int transitCount;

  FortuneData({
    required this.period,
    required this.dateRange,
    required this.overallScore,
    required this.overallMood,
    required this.keyTransits,
    required this.lifeAreas,
    required this.advice,
    required this.transitCount,
  });

  factory FortuneData.fromJson(Map<String, dynamic> json) {
    return FortuneData(
      period: json['period'] ?? '',
      dateRange: json['date_range'] ?? '',
      overallScore: (json['overall_score'] ?? 0).toDouble(),
      overallMood: json['overall_mood'] ?? '',
      keyTransits: (json['key_transits'] as List?)
          ?.map((item) => KeyTransit.fromJson(item))
          .toList() ?? [],
      lifeAreas: LifeAreas.fromJson(json['life_areas'] ?? {}),
      advice: json['advice'] ?? '',
      transitCount: json['transit_count'] ?? 0,
    );
  }
}

class KeyTransit {
  final String planet;
  final String aspect;
  final double intensity;
  final String influence;

  KeyTransit({
    required this.planet,
    required this.aspect,
    required this.intensity,
    required this.influence,
  });

  factory KeyTransit.fromJson(Map<String, dynamic> json) {
    return KeyTransit(
      planet: json['planet'] ?? '',
      aspect: json['aspect'] ?? '',
      intensity: (json['intensity'] ?? 0).toDouble(),
      influence: json['influence'] ?? '',
    );
  }
}

class LifeAreas {
  final double career;
  final double love;
  final double health;
  final double wealth;

  LifeAreas({
    required this.career,
    required this.love,
    required this.health,
    required this.wealth,
  });

  factory LifeAreas.fromJson(Map<String, dynamic> json) {
    return LifeAreas(
      career: (json['career'] ?? 0).toDouble(),
      love: (json['love'] ?? 0).toDouble(),
      health: (json['health'] ?? 0).toDouble(),
      wealth: (json['wealth'] ?? 0).toDouble(),
    );
  }
}