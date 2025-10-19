import 'dart:convert';
import 'dart:async';
import 'package:get/get.dart';


import '../models/user_model.dart';
import '../models/bazi_model.dart';
import 'token_manager.dart';

class ApiService extends GetxService {
  static ApiService get to => Get.find();

  final String _baseUrl = 'http://localhost:8081/api/v1'; // 后端API地址（统一为 localhost）
  final TokenManager _tokenManager = TokenManager();
  final GetConnect _client = GetConnect();

  bool _isRefreshing = false;
  Completer<bool>? _refreshCompleter;

  @override
  void onInit() {
    super.onInit();
    // 基础设置
    _client.timeout = const Duration(seconds: 20);
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

  Map<String, String> _authHeaders() {
    // 保持兼容局部调用（多数场景由拦截器注入）
    final t = _tokenManager.token;
    return {
      'Content-Type': 'application/json',
      if (t != null) 'Authorization': 'Bearer $t',
    };
  }

  Future<Response> _dispatch(String method, String url, {dynamic body, Map<String, String>? headers}) {
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

  Future<Response> _sendWithRetry(String method, String url, {dynamic body, Map<String, String>? headers}) async {
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
      final resp = await _client.post('$_baseUrl/auth/refresh', {});
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





  // 用户认证相关（统一走后端）
  Future<UserModel?> login(String email, String password) async {
    final response = await _client.post(
      '$_baseUrl/auth/login',
      {'email': email, 'password': password},
      headers: {'Content-Type': 'application/json'},
    );
    if (response.statusCode == 200) {
      final body = response.body;
      final wrapper = (body is Map) ? body : {};
      final data = wrapper['data'] ?? wrapper; // 兼容老格式
      final token = (data is Map) ? data['token'] : null;
      final userJson = (data is Map) ? data['user'] : null;
      if (token != null && userJson is Map) {
        final userMap = Map<String, dynamic>.from(userJson);
        final user = UserModel.fromJson(userMap);
        await _tokenManager.save(token, user.id);
        return user;
      }
    }
    throw Exception(response.body?['message'] ?? '登录失败');
  }

  Future<UserModel?> register(String email, String password, String name) async {
    final response = await _client.post(
      '$_baseUrl/auth/register',
      {'email': email, 'password': password, 'name': name},
      headers: {'Content-Type': 'application/json'},
    );

    final sc = response.statusCode ?? 0;
    if (sc == 200 || sc == 201) {
      final body = response.body;
      final wrapper = (body is Map) ? body : {};
      final data = wrapper['data'] ?? wrapper; // 兼容老格式
      final token = (data is Map) ? data['token'] : null;
      final userJson = (data is Map) ? data['user'] : null;

      if (userJson is Map) {
        final userMap = Map<String, dynamic>.from(userJson);
        final user = UserModel.fromJson(userMap);
        if (token != null) {
          await _tokenManager.save(token, user.id);
        }
        return user;
      }
    }

    throw Exception(response.body?['message'] ?? response.statusText ?? '注册失败');
  }

  Future<void> logout() async {
    await _tokenManager.clear();
  }

  Future<UserModel?> getCurrentUser() async {
    final uid = _tokenManager.userId;
    if (uid == null) return null;
    final resp = await _sendWithRetry(
      'GET',
      '$_baseUrl/auth/profile/$uid',
      headers: _authHeaders(),
    );
    if (resp.statusCode == 200) {
      final body = resp.body;
      final wrapper = (body is Map) ? body : {};
      final data = wrapper['data'] ?? wrapper; // 兼容老格式
      final userJson = (data is Map) ? (data['user'] ?? data) : null;
      if (userJson is Map) {
        final userMap = Map<String, dynamic>.from(userJson);
        return UserModel.fromJson(userMap);
      }
      return null;
    }
    if (resp.statusCode == 401) {
      await _tokenManager.clear();
      return null;
    }
    return null;
  }

  // 八字计算相关
  Future<BaziModel> calculateBazi({
    required int birthYear,
    required int birthMonth,
    required int birthDay,
    required int birthHour,
    required int birthMinute,
    required String gender,
    required bool lunarCalendar,
    String timezone = 'Asia/Shanghai',
  }) async {
    try {
      final requestData = {
        'birth_year': birthYear,
        'birth_month': birthMonth,
        'birth_day': birthDay,
        'birth_hour': birthHour,
        'birth_minute': birthMinute,
        'gender': gender,
        'lunar_calendar': lunarCalendar,
        'timezone': timezone,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/bazi/calculate',
        body: requestData,
        headers: _authHeaders(),
      );

      if (response.statusCode == 200) {
        return BaziModel.fromJson(response.body['data']);
      } else {
        throw Exception('八字计算失败: ${response.body['message']}');
      }
    } catch (e) {
      print('八字计算错误: $e');
      throw Exception('八字计算失败: ${e.toString()}');
    }
  }

  // 获取AI解读
  Future<Map<String, dynamic>> getAiAnalysis(String baziId) async {
    try {
      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/ai/analyze',
        body: {'bazi_id': baziId},
        headers: _authHeaders(),
      );

      if (response.statusCode == 200) {
        return response.body['data'];
      } else {
        throw Exception('AI解读失败: ${response.body['message']}');
      }
    } catch (e) {
      print('AI解读错误: $e');
      throw Exception('AI解读失败: ${e.toString()}');
    }
  }

  // 获取八字历史记录
  Future<List<BaziModel>> getBaziHistory() async {
    try {
      final response = await _sendWithRetry(
        'GET',
        '$_baseUrl/bazi/history',
        headers: _authHeaders(),
      );

      if (response.statusCode == 200 && response.body != null) {
        final List<dynamic> data = response.body['data'];
        return data.map((json) => BaziModel.fromJson(json)).toList();
      } else {
        throw Exception('获取历史记录失败: ${response.body?['message'] ?? response.statusText}');
      }
    } catch (e) {
      print('获取历史记录错误: $e');
      throw Exception('获取历史记录失败: ${e.toString()}');
    }
  }

  // 创建排盘记录（先写表，不计算）
  Future<String> createBaziRecord({
    required String name,
    required String gender, // 'male' | 'female'
    required bool lunarCalendar,
    required int birthYear,
    required int birthMonth,
    required int birthDay,
    required int birthHour,
    required int birthMinute,
    required String location, // 出生地区（文本）
    String timezone = 'Asia/Shanghai',
  }) async {
    try {
      final requestData = {
        'name': name,
        'gender': gender,
        'lunar_calendar': lunarCalendar,
        'year': birthYear,
        'month': birthMonth,
        'day': birthDay,
        'hour': birthHour,
        'minute': birthMinute,
        'timezone': timezone,
      };

      final response = await _sendWithRetry(
        'POST',
        '$_baseUrl/bazi',
        body: requestData,
        headers: _authHeaders(),
      );

      if (response.statusCode == 201 && response.body != null) {
        return response.body['data']['id'];
      } else {
        throw Exception('创建排盘记录失败: ${response.body?['message'] ?? response.statusText}');
      }
    } catch (e) {
      print('创建排盘记录错误: $e');
      throw Exception('创建排盘记录失败: ${e.toString()}');
    }
  }

  // 回填计算结果到 bazi_data
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
        '$_baseUrl/bazi/$id',
        body: requestData,
        headers: _authHeaders(),
      );

      if (response.statusCode != 200) {
        throw Exception('更新计算结果失败: ${response.body?['message'] ?? response.statusText}');
      }
    } catch (e) {
      print('更新计算结果错误: $e');
      throw Exception('更新计算结果失败: ${e.toString()}');
    }
  }

  // 获取八字详情
  Future<BaziModel?> getBaziDetail(String baziId) async {
    try {
      final response = await _sendWithRetry(
        'GET',
        '$_baseUrl/bazi/detail/$baziId',
        headers: _authHeaders(),
      );

      if (response.statusCode == 200 && response.body != null) {
        final Map<String, dynamic> responseBody = response.body;
        final Map<String, dynamic> baziData = responseBody['data'];
        final Map<String, dynamic> baziInput = responseBody['input'];
        final Map<String, dynamic> baziResult = responseBody['result'];

        Map<String, dynamic> combinedJson = {};

        // Fields from baziData
        combinedJson['id'] = baziData['id'];
        combinedJson['user_id'] = baziData['user_id'];
        combinedJson['created_at'] = baziData['created_at'];
        combinedJson['updated_at'] = baziData['updated_at'];

        // Fields from baziInput
        combinedJson['birth_year'] = baziInput['year'];
        combinedJson['birth_month'] = baziInput['month'];
        combinedJson['birth_day'] = baziInput['day'];
        combinedJson['birth_hour'] = baziInput['hour'];
        combinedJson['birth_minute'] = baziInput['minute'];
        combinedJson['gender'] = baziInput['gender'];
        combinedJson['name'] = baziInput['name'];
        combinedJson['timezone'] = baziInput['timezone'];
        // lunar_calendar is not provided by Go backend, default to false
        combinedJson['lunar_calendar'] = false;

        // Fields from baziResult
        combinedJson['year_pillar'] = baziResult['year_pillar'];
        combinedJson['month_pillar'] = baziResult['month_pillar'];
        combinedJson['day_pillar'] = baziResult['day_pillar'];
        combinedJson['hour_pillar'] = baziResult['hour_pillar'];

        // Extract five_elements scores
        final Map<String, dynamic> fiveElements = baziResult['five_elements'] ?? {};
        combinedJson['wood_score'] = fiveElements['木'] ?? 0;
        combinedJson['fire_score'] = fiveElements['火'] ?? 0;
        combinedJson['earth_score'] = fiveElements['土'] ?? 0;
        combinedJson['metal_score'] = fiveElements['金'] ?? 0;
        combinedJson['water_score'] = fiveElements['水'] ?? 0;

        // Parse analysis data if available
        if (baziData['analysis'] != null && baziData['analysis'].isNotEmpty) {
          final Map<String, dynamic> analysisMap = jsonDecode(baziData['analysis']);
          combinedJson['ai_analysis'] = analysisMap['ai_analysis'];
          combinedJson['ai_analysis_en'] = analysisMap['ai_analysis_en'];
          combinedJson['personality_traits'] = analysisMap['personality_traits'];
          combinedJson['career_advice'] = analysisMap['career_advice'];
          combinedJson['health_advice'] = analysisMap['health_advice'];
          combinedJson['relationship_advice'] = analysisMap['relationship_advice'];
        }

        return BaziModel.fromJson(combinedJson);
      }
      return null;
    } catch (e) {
      print('获取八字详情错误: $e');
      return null;
    }
  }
}
