import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';

class AppController extends GetxController {
  // 当前语言
  final RxString _currentLanguage = 'zh'.obs;
  
  // 支持的语言列表
  final List<Map<String, String>> supportedLanguages = [
    {'code': 'zh', 'name': '中文', 'flag': '🇨🇳'},
    {'code': 'en', 'name': 'English', 'flag': '🇺🇸'},
  ];
  
  // 本地存储实例
  final _storage = GetStorage();
  
  String get currentLanguage => _currentLanguage.value;
  
  @override
  void onInit() {
    super.onInit();
    _loadSavedLanguage();
  }
  
  // 加载保存的语言设置
  void _loadSavedLanguage() {
    try {
      // 从本地存储加载语言设置，如果没有则使用系统语言或默认中文
      String savedLanguage = _storage.read('language') ?? _getSystemLanguage();
      _currentLanguage.value = savedLanguage;
      // 更新应用语言
      Get.updateLocale(Locale(savedLanguage));
    } catch (e) {
      // 如果加载失败，使用默认语言
      _currentLanguage.value = 'zh';
      Get.updateLocale(Locale('zh'));
    }
  }
  
  // 获取系统语言
  String _getSystemLanguage() {
    // 获取系统语言，如果不是支持的语言则返回中文
    String systemLanguageCode = Get.deviceLocale?.languageCode ?? 'zh';
    if (supportedLanguages.any((lang) => lang['code'] == systemLanguageCode)) {
      return systemLanguageCode;
    }
    return 'zh'; // 默认中文
  }
  
  // 切换语言
  void changeLanguage(String languageCode) {
    if (supportedLanguages.any((lang) => lang['code'] == languageCode)) {
      _currentLanguage.value = languageCode;
      Get.updateLocale(Locale(languageCode));
      
      // 保存语言设置到本地存储
      _saveLanguage(languageCode);
    }
  }
  
  // 保存语言设置
  void _saveLanguage(String languageCode) {
    try {
      _storage.write('language', languageCode);
    } catch (e) {
      // 保存失败时的处理
      Get.log('保存语言设置失败: $e');
    }
  }
  
  // 获取当前语言信息
  Map<String, String> getCurrentLanguageInfo() {
    return supportedLanguages.firstWhere(
      (lang) => lang['code'] == currentLanguage,
      orElse: () => supportedLanguages.first,
    );
  }
}