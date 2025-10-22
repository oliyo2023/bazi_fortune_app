import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:get/get.dart';

class HttpService extends GetxService {
  static HttpService get to => Get.find();

  final String _baseUrl = 'http://127.0.0.1:8081/api/v1';

  // 请求头基础配置
  final Map<String, String> _baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // 获取带语言信息的请求头
  Map<String, String> get _headers {
    final headers = Map<String, String>.from(_baseHeaders);
    headers['Accept-Language'] = Get.locale?.languageCode ?? 'zh';
    return headers;
  }

  void setToken(String token) {
    _headers['Authorization'] = 'Bearer $token';
  }

  void clearToken() {
    _headers.remove('Authorization');
  }

  // 用户认证
  Future<Map<String, dynamic>?> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/auth/login'),
        headers: _headers,
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['token'] != null) {
          setToken(data['token']);
        }
        return data;
      }
      return null;
    } catch (e) {
      Get.log('Login error: $e');
      return null;
    }
  }

  Future<Map<String, dynamic>?> register(
    String name,
    String email,
    String password,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/auth/register'),
        headers: _headers,
        body: jsonEncode({'name': name, 'email': email, 'password': password}),
      );

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        if (data['token'] != null) {
          setToken(data['token']);
        }
        return data;
      }
      return null;
    } catch (e) {
      Get.log('Register error: $e');
      return null;
    }
  }

  // 八字计算
  Future<Map<String, dynamic>?> calculateBazi({
    required String name,
    required String gender,
    required DateTime birthDate,
    required String birthTime,
    required bool isLunar,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/bazi/calculate'),
        headers: _headers,
        body: jsonEncode({
          'name': name,
          'gender': gender,
          'birth_date': birthDate.toIso8601String(),
          'birth_time': birthTime,
          'is_lunar': isLunar,
          'language': Get.locale?.languageCode ?? 'zh',
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return null;
    } catch (e) {
      Get.log('Calculate bazi error: $e');
      return null;
    }
  }

  // AI分析
  Future<Map<String, dynamic>?> analyzeBazi(String baziId) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/ai/analyze'),
        headers: _headers,
        body: jsonEncode({'bazi_id': baziId, 'language': Get.locale?.languageCode ?? 'zh'}),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return null;
    } catch (e) {
      Get.log('AI analyze error: $e');
      return null;
    }
  }

  // 获取历史记录
  Future<List<Map<String, dynamic>>?> getBaziHistory(String userId) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/bazi/history/$userId'),
        headers: _headers,
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return List<Map<String, dynamic>>.from(data['data'] ?? []);
      }
      return null;
    } catch (e) {
      Get.log('Get history error: $e');
      return null;
    }
  }

  // 健康检查
  Future<bool> checkHealth() async {
    try {
      final response = await http.get(
        Uri.parse('http://127.0.0.1:8081/health'),
        headers: _headers,
      );
      return response.statusCode == 200;
    } catch (e) {
      Get.log('Health check error: $e');
      return false;
    }
  }
}
