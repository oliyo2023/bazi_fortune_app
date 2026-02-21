import 'dart:async';
import 'dart:convert';

import 'package:get/get.dart';
import 'package:logger/logger.dart';

import '../../core/config/api_config.dart';
import '../models/almanac_model.dart';
import '../models/bazi_model.dart';
import '../models/user_model.dart';
import 'token_manager.dart';

class _ApiNotFoundException implements Exception {}

class ApiService extends GetxService {
  static ApiService get to => Get.find();

  final String _baseUrl = ApiConfig.baseUrl;
  final TokenManager _tokenManager = TokenManager();
  final GetConnect _client = GetConnect();
  final Logger _logger = Logger();

  bool _isRefreshing = false;
  Completer<bool>? _refreshCompleter;

  @override
  void onInit() {
    super.onInit();
    _client.timeout = const Duration(seconds: 20);

    _client.httpClient.addRequestModifier<dynamic>((request) {
      final token = _tokenManager.token;
      request.headers['Content-Type'] = 'application/json';
      if (token != null && token.isNotEmpty) {
        request.headers['Authorization'] = 'Bearer $token';
      }
      return request;
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
        return _client.request(url, method, body: body, headers: headers);
    }
  }

  Future<Response> _sendWithRetry(
    String method,
    String url, {
    dynamic body,
    Map<String, String>? headers,
    bool retryOnUnauthorized = true,
  }) async {
    Response res = await _dispatch(method, url, body: body, headers: headers);

    if (!retryOnUnauthorized || res.statusCode != 401) {
      return res;
    }

    final refreshed = await _refreshToken();
    if (!refreshed) {
      await _tokenManager.clear();
      if (Get.currentRoute != '/login') {
        Get.offAllNamed('/login');
      }
      return res;
    }

    final newHeaders = <String, String>{...?headers};
    newHeaders.remove('Authorization');
    return _dispatch(method, url, body: body, headers: newHeaders);
  }

  Future<bool> _refreshToken() async {
    if (_isRefreshing) {
      if (_refreshCompleter != null) {
        try {
          return await _refreshCompleter!.future;
        } catch (_) {
          return false;
        }
      }
      return false;
    }

    _isRefreshing = true;
    _refreshCompleter = Completer<bool>();

    try {
      final resp = await _dispatch('POST', '$_baseUrl/api/v1/auth/refresh', body: {});
      if (resp.statusCode != 200) {
        _refreshCompleter?.complete(false);
        return false;
      }

      final data = _unwrapCodeData(resp.body);
      final token = _asString(data['token']);
      final user = _asMap(data['user']);
      final uid = _asString(user['id']);

      if (token.isEmpty || uid.isEmpty) {
        _refreshCompleter?.complete(false);
        return false;
      }

      await _tokenManager.save(token, uid);
      _refreshCompleter?.complete(true);
      return true;
    } catch (e) {
      _refreshCompleter?.completeError(e);
      return false;
    } finally {
      _isRefreshing = false;
      _refreshCompleter = null;
    }
  }

  Map<String, dynamic> _asMap(dynamic value) {
    if (value is Map<String, dynamic>) return value;
    if (value is Map) return Map<String, dynamic>.from(value);
    return <String, dynamic>{};
  }

  List<dynamic> _asList(dynamic value) {
    if (value is List) return value;
    return <dynamic>[];
  }

  String _asString(dynamic value) => value?.toString() ?? '';

  int _asInt(dynamic value, {int fallback = 0}) {
    if (value is int) return value;
    if (value is num) return value.toInt();
    if (value is String) {
      return int.tryParse(value) ?? fallback;
    }
    return fallback;
  }

  String _extractMessage(dynamic body, {String fallback = '请求失败'}) {
    final map = _asMap(body);
    final message = _asString(map['message']);
    if (message.isNotEmpty) return message;
    final error = _asString(map['error']);
    if (error.isNotEmpty) return error;
    return fallback;
  }

  Map<String, dynamic> _unwrapCodeData(dynamic body) {
    final map = _asMap(body);
    if (map.isEmpty) {
      throw Exception('响应格式错误');
    }

    final code = _asInt(map['code'], fallback: -1);
    if (code != 0) {
      throw Exception(_extractMessage(map));
    }

    return _asMap(map['data']);
  }

  List<dynamic> _unwrapCodeListData(dynamic body) {
    final map = _asMap(body);
    if (map.isEmpty) {
      throw Exception('响应格式错误');
    }

    final code = _asInt(map['code'], fallback: -1);
    if (code != 0) {
      throw Exception(_extractMessage(map));
    }

    return _asList(map['data']);
  }

  Map<String, dynamic> _unwrapSuccessEnvelope(dynamic body) {
    final map = _asMap(body);
    if (map.isEmpty) {
      throw Exception('响应格式错误');
    }

    if (map.containsKey('success') && map['success'] != true) {
      throw Exception(_extractMessage(map));
    }

    return map;
  }

  String _phoneToEmail(String phone) {
    final normalized = phone.trim();
    return '$normalized@mobile.local';
  }

  Map<String, dynamic> _decodeMaybeJsonMap(dynamic value) {
    if (value is Map<String, dynamic>) return value;
    if (value is Map) return Map<String, dynamic>.from(value);

    if (value is String && value.trim().isNotEmpty) {
      try {
        final decoded = jsonDecode(value);
        if (decoded is Map) {
          return Map<String, dynamic>.from(decoded);
        }
      } catch (_) {}
    }

    return <String, dynamic>{};
  }

  Map<String, dynamic> _mergeBaziPayload({
    required Map<String, dynamic> record,
    Map<String, dynamic>? input,
    Map<String, dynamic>? result,
  }) {
    final inputMap = input ?? _decodeMaybeJsonMap(record['input_data'] ?? record['InputData']);
    final resultMap = result ?? _decodeMaybeJsonMap(record['result_data'] ?? record['ResultData']);
    final fiveElements = _asMap(resultMap['five_elements']);

    final createdAt = _asString(record['created_at'] ?? record['CreatedAt']);
    final updatedAt = _asString(record['updated_at'] ?? record['UpdatedAt']);

    return <String, dynamic>{
      'id': record['id'] ?? record['ID'] ?? '',
      'user_id': record['user_id'] ?? record['UserID'] ?? '',
      'created_at': createdAt.isNotEmpty ? createdAt : DateTime.now().toIso8601String(),
      'updated_at': updatedAt.isNotEmpty
          ? updatedAt
          : (createdAt.isNotEmpty ? createdAt : DateTime.now().toIso8601String()),
      'birth_year': inputMap['year'],
      'birth_month': inputMap['month'],
      'birth_day': inputMap['day'],
      'birth_hour': inputMap['hour'],
      'birth_minute': inputMap['minute'],
      'gender': inputMap['gender'],
      'name': inputMap['name'],
      'timezone': inputMap['timezone'] ?? 'Asia/Shanghai',
      'lunar_calendar': false,
      'year_pillar': resultMap['year_pillar'] ?? '',
      'month_pillar': resultMap['month_pillar'] ?? '',
      'day_pillar': resultMap['day_pillar'] ?? '',
      'hour_pillar': resultMap['hour_pillar'] ?? '',
      'wood_score': _asInt(fiveElements['木']),
      'fire_score': _asInt(fiveElements['火']),
      'earth_score': _asInt(fiveElements['土']),
      'metal_score': _asInt(fiveElements['金']),
      'water_score': _asInt(fiveElements['水']),
      'ai_analysis': _asString(record['analysis'] ?? record['Analysis']).isEmpty
          ? null
          : _asString(record['analysis'] ?? record['Analysis']),
      'input': inputMap,
      'result': resultMap,
    };
  }

  Future<UserModel> registerWithPhone({
    required String phone,
    required String username,
    required String password,
  }) async {
    try {
      final requestData = {
        'email': _phoneToEmail(phone),
        'password': password,
        'name': username,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/auth/register',
        body: requestData,
        retryOnUnauthorized: false,
      );

      if (response.statusCode != 200 && response.statusCode != 201) {
        throw Exception(_extractMessage(response.body, fallback: '注册失败'));
      }

      _unwrapCodeData(response.body);

      // Go 注册接口不返回 token，这里串接一次登录保证主链路有鉴权态。
      return loginWithPhone(phone: phone, password: password);
    } catch (e) {
      _logger.e('注册错误: $e');
      throw Exception('注册失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<UserModel> loginWithPhone({
    required String phone,
    required String password,
  }) async {
    try {
      final requestData = {
        'email': _phoneToEmail(phone),
        'password': password,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/auth/login',
        body: requestData,
        retryOnUnauthorized: false,
      );

      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '登录失败'));
      }

      final data = _unwrapCodeData(response.body);
      final userJson = _asMap(data['user']);
      final token = _asString(data['token']);

      final uid = _asString(userJson['id']);
      if (uid.isEmpty || token.isEmpty) {
        throw Exception('登录返回数据不完整');
      }

      await _tokenManager.save(token, uid);
      return UserModel.fromJson(userJson);
    } catch (e) {
      _logger.e('登录错误: $e');
      throw Exception('登录失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<void> logout() async {
    await _tokenManager.clear();
  }

  Future<int> sendSmsCode({
    required String phone,
    String purpose = 'login',
  }) async {
    try {
      final requestData = {
        'phone': phone,
        'purpose': purpose,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/auth/send-sms',
        body: requestData,
        retryOnUnauthorized: false,
      );

      if (response.statusCode == 429) {
        throw Exception('请求过于频繁，请稍后再试');
      }
      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '发送验证码失败'));
      }

      final data = _unwrapCodeData(response.body);
      return _asInt(data['expires_in'], fallback: 300);
    } catch (e) {
      _logger.e('发送验证码错误: $e');
      throw Exception('发送验证码失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<Map<String, dynamic>> loginWithSms({
    required String phone,
    required String code,
  }) async {
    try {
      final requestData = {
        'phone': phone,
        'code': code,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/auth/login-with-sms',
        body: requestData,
        retryOnUnauthorized: false,
      );

      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '登录失败'));
      }

      final data = _unwrapCodeData(response.body);
      final userJson = _asMap(data['user']);
      final token = _asString(data['token']);
      final isNew = data['is_new'] == true;

      if (token.isNotEmpty && _asString(userJson['id']).isNotEmpty) {
        await _tokenManager.save(token, _asString(userJson['id']));
      }

      return {
        'user': UserModel.fromJson(userJson),
        'token': token,
        'is_new': isNew,
      };
    } catch (e) {
      _logger.e('验证码登录错误: $e');
      throw Exception('登录失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<UserModel?> getCurrentUser() async {
    final uid = _tokenManager.userId;
    if (uid == null || uid.isEmpty) return null;

    final resp = await _sendWithRetry(
      'GET',
      '$_baseUrl/api/v1/auth/profile/$uid',
    );

    if (resp.statusCode == 200) {
      final data = _unwrapCodeData(resp.body);
      final userJson = _asMap(data['user']);
      if (userJson.isEmpty) return null;
      return UserModel.fromJson(userJson);
    }

    if (resp.statusCode == 401) {
      await _tokenManager.clear();
      return null;
    }

    throw Exception(_extractMessage(resp.body, fallback: '获取用户信息失败'));
  }

  Future<BaziModel> calculateBazi({
    required int birthYear,
    required int birthMonth,
    required int birthDay,
    required int birthHour,
    required int birthMinute,
    required String gender,
    required bool lunarCalendar,
    String? name,
    String timezone = 'Asia/Shanghai',
  }) async {
    try {
      final requestData = {
        'year': birthYear,
        'month': birthMonth,
        'day': birthDay,
        'hour': birthHour,
        'minute': birthMinute,
        'gender': gender,
        if (name != null && name.isNotEmpty) 'name': name,
        'timezone': timezone,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/bazi/calculate',
        body: requestData,
      );

      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '八字计算失败'));
      }

      final body = _asMap(response.body);
      if (_asInt(body['code'], fallback: -1) != 0) {
        throw Exception(_extractMessage(body, fallback: '八字计算失败'));
      }

      final record = _asMap(body['data']);
      final result = _asMap(body['result']);
      final merged = _mergeBaziPayload(record: record, input: requestData, result: result);
      return BaziModel.fromJson(merged);
    } catch (e) {
      _logger.e('八字计算错误: $e');
      throw Exception('八字计算失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<Map<String, dynamic>> getAiAnalysis(String baziId) async {
    try {
      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/ai/analyze',
        body: {
          'bazi_id': baziId,
          'language': 'zh',
        },
      );

      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: 'AI解读失败'));
      }

      final envelope = _unwrapSuccessEnvelope(response.body);
      return _asMap(envelope['data']);
    } catch (e) {
      _logger.e('AI解读错误: $e');
      throw Exception('AI解读失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<List<BaziModel>> getBaziHistory() async {
    try {
      final response = await _sendWithRetry(
        'GET',
        '$_baseUrl/api/v1/bazi/history',
      );

      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '获取历史记录失败'));
      }

      final list = _unwrapCodeListData(response.body);
      return list
          .whereType<Map>()
          .map((item) => _mergeBaziPayload(record: _asMap(item)))
          .map(BaziModel.fromJson)
          .toList();
    } catch (e) {
      _logger.e('获取历史记录错误: $e');
      throw Exception('获取历史记录失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<String> createBaziRecord({
    required String name,
    required String gender,
    required bool lunarCalendar,
    required int birthYear,
    required int birthMonth,
    required int birthDay,
    required int birthHour,
    required int birthMinute,
    required String location,
    String timezone = 'Asia/Shanghai',
  }) async {
    try {
      final requestData = {
        'name': name,
        'gender': gender,
        'year': birthYear,
        'month': birthMonth,
        'day': birthDay,
        'hour': birthHour,
        'minute': birthMinute,
        'timezone': timezone,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/api/v1/bazi',
        body: requestData,
      );

      if (response.statusCode != 201 && response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '创建排盘记录失败'));
      }

      final body = _asMap(response.body);
      if (_asInt(body['code'], fallback: -1) != 0) {
        throw Exception(_extractMessage(body, fallback: '创建排盘记录失败'));
      }

      final data = _asMap(body['data']);
      final id = _asString(data['id'] ?? data['ID']);
      if (id.isEmpty) {
        throw Exception('创建排盘记录失败：缺少记录ID');
      }
      return id;
    } catch (e) {
      _logger.e('创建排盘记录错误: $e');
      throw Exception('创建排盘记录失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<void> updateBaziResult(String id, BaziModel result) async {
    try {
      final requestData = {
        'year': result.birthYear,
        'month': result.birthMonth,
        'day': result.birthDay,
        'hour': result.birthHour,
        'minute': result.birthMinute,
        'gender': result.gender,
        'name': result.name,
        'timezone': result.timezone,
      };

      final response = await _sendWithRetry(
        'PUT',
        '$_baseUrl/api/v1/bazi/$id',
        body: requestData,
      );

      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '更新计算结果失败'));
      }

      final body = _asMap(response.body);
      if (_asInt(body['code'], fallback: -1) != 0) {
        throw Exception(_extractMessage(body, fallback: '更新计算结果失败'));
      }
    } catch (e) {
      _logger.e('更新计算结果错误: $e');
      throw Exception('更新计算结果失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<void> deleteBaziRecord(String id) async {
    try {
      final response = await _sendWithRetry(
        'DELETE',
        '$_baseUrl/api/v1/bazi/$id',
      );

      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '删除排盘记录失败'));
      }

      final body = _asMap(response.body);
      if (_asInt(body['code'], fallback: -1) != 0) {
        throw Exception(_extractMessage(body, fallback: '删除排盘记录失败'));
      }
    } catch (e) {
      _logger.e('删除排盘记录错误: $e');
      throw Exception('删除排盘记录失败: ${e.toString().replaceFirst('Exception: ', '')}');
    }
  }

  Future<BaziModel?> getBaziDetail(String baziId) async {
    try {
      final response = await _sendWithRetry(
        'GET',
        '$_baseUrl/api/v1/bazi/detail/$baziId',
      );

      if (response.statusCode != 200) {
        throw Exception(_extractMessage(response.body, fallback: '获取八字详情失败'));
      }

      final body = _asMap(response.body);
      if (_asInt(body['code'], fallback: -1) != 0) {
        throw Exception(_extractMessage(body, fallback: '获取八字详情失败'));
      }

      final record = _asMap(body['data']);
      final input = _asMap(body['input']);
      final result = _asMap(body['result']);
      final merged = _mergeBaziPayload(record: record, input: input, result: result);
      return BaziModel.fromJson(merged);
    } catch (e) {
      _logger.e('获取八字详情错误: $e');
      return null;
    }
  }

  String _formatDate(DateTime date) {
    final y = date.year.toString().padLeft(4, '0');
    final m = date.month.toString().padLeft(2, '0');
    final d = date.day.toString().padLeft(2, '0');
    return '$y-$m-$d';
  }

  Future<AlmanacModel> generateAlmanac({
    required DateTime date,
    String timezone = 'Asia/Shanghai',
    String language = 'zh',
    String providerPrefer = 'deepseek',
    String? baziId,
  }) async {
    final payload = {
      'date': _formatDate(date),
      'timezone': timezone,
      'language': language,
      'provider_prefer': providerPrefer,
      if (baziId != null && baziId.isNotEmpty) 'bazi_id': baziId,
    };

    final response = await _sendWithRetry(
      'POST',
      '$_baseUrl/api/v1/almanac/generate',
      body: payload,
    );

    if (response.statusCode != 200) {
      throw Exception(_extractMessage(response.body, fallback: '黄历生成失败'));
    }

    final envelope = _unwrapSuccessEnvelope(response.body);
    return AlmanacModel.fromResponse(envelope);
  }

  Future<AlmanacModel> getAlmanacDetail({
    required DateTime date,
    String? baziId,
  }) async {
    final dateText = _formatDate(date);
    final query = baziId != null && baziId.isNotEmpty
        ? '?date=$dateText&bazi_id=$baziId'
        : '?date=$dateText';

    final response = await _sendWithRetry(
      'GET',
      '$_baseUrl/api/v1/almanac/detail$query',
    );

    if (response.statusCode == 404) {
      throw _ApiNotFoundException();
    }

    if (response.statusCode != 200) {
      throw Exception(_extractMessage(response.body, fallback: '获取黄历详情失败'));
    }

    final envelope = _unwrapSuccessEnvelope(response.body);
    return AlmanacModel.fromResponse(envelope);
  }

  Future<AlmanacModel> getOrGenerateAlmanac({
    required DateTime date,
    String timezone = 'Asia/Shanghai',
    String language = 'zh',
    String providerPrefer = 'deepseek',
    String? baziId,
  }) async {
    try {
      return await getAlmanacDetail(date: date, baziId: baziId);
    } catch (e) {
      if (e is _ApiNotFoundException) {
        return generateAlmanac(
          date: date,
          timezone: timezone,
          language: language,
          providerPrefer: providerPrefer,
          baziId: baziId,
        );
      }
      rethrow;
    }
  }
}
