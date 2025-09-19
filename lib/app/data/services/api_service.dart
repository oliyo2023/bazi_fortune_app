import 'package:get/get.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/user_model.dart';
import '../models/bazi_model.dart';

class ApiService extends GetxService {
  static ApiService get to => Get.find();

  final SupabaseClient _supabase = Supabase.instance.client;
  final String _baseUrl = 'http://127.0.0.1:8080/api/v1'; // 后端API地址

  // 用户认证相关
  Future<UserModel?> login(String email, String password) async {
    try {
      final response = await _supabase.auth.signInWithPassword(
        email: email,
        password: password,
      );

      if (response.user != null) {
        // 获取用户详细信息
        final userResponse = await _supabase
            .from('users')
            .select()
            .eq('id', response.user!.id)
            .single();

        return UserModel.fromJson(userResponse);
      }
      return null;
    } catch (e) {
      print('登录错误: $e');
      throw Exception('登录失败: ${e.toString()}');
    }
  }

  Future<UserModel?> register(
    String email,
    String password,
    String name,
  ) async {
    try {
      final response = await _supabase.auth.signUp(
        email: email,
        password: password,
      );

      if (response.user != null) {
        // 创建用户资料
        final userProfile = {
          'id': response.user!.id,
          'email': email,
          'name': name,
          'role': 'user',
          'created_at': DateTime.now().toIso8601String(),
          'updated_at': DateTime.now().toIso8601String(),
        };

        await _supabase.from('users').insert(userProfile);
        return UserModel.fromJson(userProfile);
      }
      return null;
    } catch (e) {
      print('注册错误: $e');
      throw Exception('注册失败: ${e.toString()}');
    }
  }

  Future<void> logout() async {
    try {
      await _supabase.auth.signOut();
    } catch (e) {
      print('登出错误: $e');
      throw Exception('登出失败: ${e.toString()}');
    }
  }

  Future<UserModel?> getCurrentUser() async {
    try {
      final user = _supabase.auth.currentUser;
      if (user != null) {
        final userResponse = await _supabase
            .from('users')
            .select()
            .eq('id', user.id)
            .single();

        return UserModel.fromJson(userResponse);
      }
      return null;
    } catch (e) {
      print('获取当前用户错误: $e');
      return null;
    }
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

      final response = await GetConnect().post(
        '$_baseUrl/bazi/calculate',
        requestData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
              'Bearer ${_supabase.auth.currentSession?.accessToken}',
        },
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
      final response = await GetConnect().post(
        '$_baseUrl/ai/analyze',
        {'bazi_id': baziId},
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
              'Bearer ${_supabase.auth.currentSession?.accessToken}',
        },
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
      final user = _supabase.auth.currentUser;
      if (user == null) throw Exception('用户未登录');

      final response = await _supabase
          .from('bazi_data')
          .select()
          .eq('user_id', user.id)
          .order('created_at', ascending: false);

      return response
          .map<BaziModel>((json) => BaziModel.fromJson(json))
          .toList();
    } on PostgrestException catch (e) {
      if (e.code == 'PGRST205') {
        // 表不存在错误
        print('数据库表 bazi_data 不存在，请运行迁移');
        throw Exception('数据库准备中，请稍后重试或联系管理员');
      }
      print('获取历史记录错误: $e');
      throw Exception('获取历史记录失败: ${e.toString()}');
    } catch (e) {
      print('获取历史记录错误: $e');
      throw Exception('获取历史记录失败: ${e.toString()}');
    }
  }

  // 获取八字详情
  Future<BaziModel?> getBaziDetail(String baziId) async {
    try {
      final response = await GetConnect().get(
        '$_baseUrl/bazi/detail/$baziId',
        headers: {
          'Authorization':
              'Bearer ${_supabase.auth.currentSession?.accessToken}',
        },
      );

      if (response.statusCode == 200) {
        return BaziModel.fromJson(response.body['data']);
      }
      return null;
    } catch (e) {
      print('获取八字详情错误: $e');
      return null;
    }
  }
}
