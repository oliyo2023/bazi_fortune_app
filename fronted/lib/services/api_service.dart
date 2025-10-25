import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:get_storage/get_storage.dart';
import 'package:get/get.dart';

/// API 服务类 - 处理与 Worker API 的通信
class ApiService {
  static const String _baseUrl =
      'https://bazi-fortune-api-prod.oliyo.workers.dev';

  final GetStorage _storage = GetStorage();

  /// 获取当前保存的 JWT Token
  String? get _token {
    return _storage.read('authToken');
  }

  /// 保存 JWT Token
  void _saveToken(String token) {
    _storage.write('authToken', token);
  }

  /// 清除 Token
  void _clearToken() {
    _storage.remove('authToken');
  }

  /// 通用 API 请求方法
  Future<Map<String, dynamic>> _request(
    String endpoint, {
    String? method = 'GET',
    Map<String, dynamic>? body,
    Map<String, String>? headers,
  }) async {
    try {
      final uri = Uri.parse('$_baseUrl$endpoint');

      // 构建请求头
      final requestHeaders = <String, String>{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      // 添加认证头
      final token = _token;
      if (token != null) {
        requestHeaders['Authorization'] = 'Bearer $token';
      }

      // 添加自定义头
      if (headers != null) {
        requestHeaders.addAll(headers);
      }

      http.Response response;

      if (method == 'GET') {
        response = await http.get(uri, headers: requestHeaders);
      } else if (method == 'POST') {
        response = await http.post(
          uri,
          headers: requestHeaders,
          body: body != null ? jsonEncode(body) : null,
        );
      } else if (method == 'PUT') {
        response = await http.put(
          uri,
          headers: requestHeaders,
          body: body != null ? jsonEncode(body) : null,
        );
      } else if (method == 'DELETE') {
        response = await http.delete(uri, headers: requestHeaders);
      }

      // 处理响应
      final responseData = jsonDecode(response.body);

      // 检查是否有错误
      if (responseData is Map && responseData.containsKey('error')) {
        throw ApiException(
          responseData['error'] ?? '未知错误',
          response.statusCode,
        );
      }

      return responseData as Map<String, dynamic>;
    } catch (e) {
      throw ApiException('网络请求失败: ${e.toString()}', 0);
    }
  }

  /// 用户注册
  Future<Map<String, dynamic>> register({
    required String email,
    required String username,
    required String password,
  }) async {
    return _request(
      '/api/v1/auth/register',
      method: 'POST',
      body: {'email': email, 'username': username, 'password': password},
    );
  }

  /// 用户登录
  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final response = await _request(
      '/api/v1/auth/login',
      method: 'POST',
      body: {'email': email, 'password': password},
    );

    // 保存 token
    if (response.containsKey('token')) {
      _saveToken(response['token']);
    }

    return response;
  }

  /// 获取用户信息
  Future<Map<String, dynamic>> getProfile() async {
    return _request('/api/v1/auth/profile');
  }

  /// 刷新 Token
  Future<Map<String, dynamic>> refreshToken() async {
    final response = await _request('/api/v1/auth/refresh', method: 'POST');

    // 更新保存的 token
    if (response.containsKey('token')) {
      _saveToken(response['token']);
    }

    return response;
  }

  /// 登出
  Future<void> logout() async {
    _clearToken();
  }

  /// 检查是否已登录
  bool get isLoggedIn {
    return _token != null;
  }

  /// 获取用户数据
  Map<String, dynamic>? get userData {
    final token = _token;
    if (token == null) return null;

    try {
      // 解析 JWT Token 获取用户信息（这里简化处理）
      // 在实际应用中，可能需要调用 getProfile 来获取最新信息
      return {'token': token, 'isLoggedIn': true};
    } catch (e) {
      return null;
    }
  }

  /// 八字计算
  Future<Map<String, dynamic>> calculateBazi({
    required Map<String, dynamic> baziData,
  }) async {
    return _request('/api/v1/bazi/calculate', method: 'POST', body: baziData);
  }

  /// 获取八字历史
  Future<Map<String, dynamic>> getBaziHistory({
    int page = 1,
    int limit = 10,
  }) async {
    return _request('/api/v1/bazi/history?page=$page&limit=$limit');
  }

  /// 获取八字详情
  Future<Map<String, dynamic>> getBaziDetail(String baziId) async {
    return _request('/api/v1/bazi/$baziId');
  }

  /// 删除八字记录
  Future<Map<String, dynamic>> deleteBazi(String baziId) async {
    return _request('/api/v1/bazi/$baziId', method: 'DELETE');
  }
}

/// API 异常类
class ApiException implements Exception {
  final String message;
  final int statusCode;

  ApiException(this.message, this.statusCode);

  @override
  String toString() {
    return 'ApiException: $message (Status: $statusCode)';
  }
}
