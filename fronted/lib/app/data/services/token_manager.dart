import 'package:get_storage/get_storage.dart';

class TokenManager {
  static const _kTokenKey = 'auth_token';
  static const _kUserIdKey = 'user_id';

  final GetStorage _storage = GetStorage();

  String? get token => _storage.read<String>(_kTokenKey);
  String? get userId => _storage.read<String>(_kUserIdKey);

  Future<void> save(String token, String userId) async {
    await _storage.write(_kTokenKey, token);
    await _storage.write(_kUserIdKey, userId);
  }

  Future<void> clear() async {
    await _storage.remove(_kTokenKey);
    await _storage.remove(_kUserIdKey);
  }
}