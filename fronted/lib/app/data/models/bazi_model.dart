import 'dart:convert';

class BaziModel {
  final String id;
  final String userId;
  final int birthYear;
  final int birthMonth;
  final int birthDay;
  final int birthHour;
  final int birthMinute;
  final String gender;
  final bool lunarCalendar;
  final String timezone;
  final String? name; // 添加姓名字段
  
  // 八字计算结果
  final String yearPillar;
  final String monthPillar;
  final String dayPillar;
  final String hourPillar;
  
  // 五行分析
  final int woodScore;
  final int fireScore;
  final int earthScore;
  final int metalScore;
  final int waterScore;
  
  // AI解读结果
  final String? aiAnalysis;
  final String? aiAnalysisEn;
  final Map<String, dynamic>? personalityTraits;
  final Map<String, dynamic>? careerAdvice;
  final Map<String, dynamic>? healthAdvice;
  final Map<String, dynamic>? relationshipAdvice;
  
  final DateTime createdAt;
  final DateTime updatedAt;

  BaziModel({
    required this.id,
    required this.userId,
    required this.birthYear,
    required this.birthMonth,
    required this.birthDay,
    required this.birthHour,
    required this.birthMinute,
    required this.gender,
    required this.lunarCalendar,
    required this.timezone,
    this.name,
    required this.yearPillar,
    required this.monthPillar,
    required this.dayPillar,
    required this.hourPillar,
    required this.woodScore,
    required this.fireScore,
    required this.earthScore,
    required this.metalScore,
    required this.waterScore,
    this.aiAnalysis,
    this.aiAnalysisEn,
    this.personalityTraits,
    this.careerAdvice,
    this.healthAdvice,
    this.relationshipAdvice,
    required this.createdAt,
    required this.updatedAt,
  });

  static Map<String, dynamic> _toMap(dynamic value) {
    if (value is Map<String, dynamic>) return value;
    if (value is Map) return Map<String, dynamic>.from(value);
    if (value is String && value.isNotEmpty) {
      try {
        final decoded = jsonDecode(value);
        if (decoded is Map) return Map<String, dynamic>.from(decoded);
      } catch (_) {}
    }
    return <String, dynamic>{};
  }

  static String _pickString(Map<String, dynamic> json, List<String> keys, {String fallback = ''}) {
    for (final key in keys) {
      final value = json[key];
      if (value != null && value.toString().isNotEmpty) {
        return value.toString();
      }
    }
    return fallback;
  }

  static int _pickInt(Map<String, dynamic> json, List<String> keys, {int fallback = 0}) {
    for (final key in keys) {
      final value = json[key];
      if (value is int) return value;
      if (value is num) return value.toInt();
      if (value is String) {
        final parsed = int.tryParse(value);
        if (parsed != null) return parsed;
      }
    }
    return fallback;
  }

  factory BaziModel.fromJson(Map<String, dynamic> json) {
    final map = _toMap(json);
    final input = _toMap(map['input']);
    final result = _toMap(map['result']);
    final dynamic inputDataRaw = map['input_data'] ?? map['InputData'];
    final dynamic resultDataRaw = map['result_data'] ?? map['ResultData'];
    final inputData = _toMap(inputDataRaw);
    final resultData = _toMap(resultDataRaw);
    final fiveElements = _toMap(
      map['five_elements'] ??
          result['five_elements'] ??
          resultData['five_elements'],
    );

    final createdAtRaw = _pickString(map, ['created_at', 'CreatedAt'], fallback: DateTime.now().toIso8601String());
    final updatedAtRaw = _pickString(
      map,
      ['updated_at', 'UpdatedAt'],
      fallback: createdAtRaw,
    );

    final parsedName = _pickString(
      map,
      ['name'],
      fallback: _pickString(input, ['name'], fallback: _pickString(inputData, ['name'])),
    );

    return BaziModel(
      id: _pickString(map, ['id', 'ID']),
      userId: _pickString(map, ['user_id', 'UserID']),
      birthYear: _pickInt(map, ['birth_year'], fallback: _pickInt(input, ['year'], fallback: _pickInt(inputData, ['year']))),
      birthMonth: _pickInt(map, ['birth_month'], fallback: _pickInt(input, ['month'], fallback: _pickInt(inputData, ['month']))),
      birthDay: _pickInt(map, ['birth_day'], fallback: _pickInt(input, ['day'], fallback: _pickInt(inputData, ['day']))),
      birthHour: _pickInt(map, ['birth_hour'], fallback: _pickInt(input, ['hour'], fallback: _pickInt(inputData, ['hour']))),
      birthMinute: _pickInt(
        map,
        ['birth_minute'],
        fallback: _pickInt(input, ['minute'], fallback: _pickInt(inputData, ['minute'])),
      ),
      gender: _pickString(map, ['gender'], fallback: _pickString(input, ['gender'], fallback: _pickString(inputData, ['gender']))),
      lunarCalendar: map['lunar_calendar'] == true,
      timezone: _pickString(
        map,
        ['timezone'],
        fallback: _pickString(input, ['timezone'], fallback: _pickString(inputData, ['timezone'], fallback: 'Asia/Shanghai')),
      ),
      name: parsedName.isEmpty ? null : parsedName,
      yearPillar: _pickString(
        map,
        ['year_pillar'],
        fallback: _pickString(result, ['year_pillar'], fallback: _pickString(resultData, ['year_pillar'])),
      ),
      monthPillar: _pickString(
        map,
        ['month_pillar'],
        fallback: _pickString(result, ['month_pillar'], fallback: _pickString(resultData, ['month_pillar'])),
      ),
      dayPillar: _pickString(
        map,
        ['day_pillar'],
        fallback: _pickString(result, ['day_pillar'], fallback: _pickString(resultData, ['day_pillar'])),
      ),
      hourPillar: _pickString(
        map,
        ['hour_pillar'],
        fallback: _pickString(result, ['hour_pillar'], fallback: _pickString(resultData, ['hour_pillar'])),
      ),
      woodScore: _pickInt(map, ['wood_score'], fallback: _pickInt(fiveElements, ['木'])),
      fireScore: _pickInt(map, ['fire_score'], fallback: _pickInt(fiveElements, ['火'])),
      earthScore: _pickInt(map, ['earth_score'], fallback: _pickInt(fiveElements, ['土'])),
      metalScore: _pickInt(map, ['metal_score'], fallback: _pickInt(fiveElements, ['金'])),
      waterScore: _pickInt(map, ['water_score'], fallback: _pickInt(fiveElements, ['水'])),
      aiAnalysis: map['ai_analysis']?.toString() ?? map['analysis']?.toString(),
      aiAnalysisEn: map['ai_analysis_en']?.toString(),
      personalityTraits: map['personality_traits'] is Map
          ? Map<String, dynamic>.from(map['personality_traits'] as Map)
          : null,
      careerAdvice: map['career_advice'] is Map
          ? Map<String, dynamic>.from(map['career_advice'] as Map)
          : null,
      healthAdvice: map['health_advice'] is Map
          ? Map<String, dynamic>.from(map['health_advice'] as Map)
          : null,
      relationshipAdvice: map['relationship_advice'] is Map
          ? Map<String, dynamic>.from(map['relationship_advice'] as Map)
          : null,
      createdAt: DateTime.tryParse(createdAtRaw) ?? DateTime.now(),
      updatedAt: DateTime.tryParse(updatedAtRaw) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'birth_year': birthYear,
      'birth_month': birthMonth,
      'birth_day': birthDay,
      'birth_hour': birthHour,
      'birth_minute': birthMinute,
      'gender': gender,
      'lunar_calendar': lunarCalendar,
      'timezone': timezone,
      'name': name,
      'year_pillar': yearPillar,
      'month_pillar': monthPillar,
      'day_pillar': dayPillar,
      'hour_pillar': hourPillar,
      'wood_score': woodScore,
      'fire_score': fireScore,
      'earth_score': earthScore,
      'metal_score': metalScore,
      'water_score': waterScore,
      'ai_analysis': aiAnalysis,
      'ai_analysis_en': aiAnalysisEn,
      'personality_traits': personalityTraits,
      'career_advice': careerAdvice,
      'health_advice': healthAdvice,
      'relationship_advice': relationshipAdvice,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  // 获取五行最强和最弱的元素
  String get strongestElement {
    final scores = {
      '木': woodScore,
      '火': fireScore,
      '土': earthScore,
      '金': metalScore,
      '水': waterScore,
    };
    return scores.entries.reduce((a, b) => a.value > b.value ? a : b).key;
  }

  String get weakestElement {
    final scores = {
      '木': woodScore,
      '火': fireScore,
      '土': earthScore,
      '金': metalScore,
      '水': waterScore,
    };
    return scores.entries.reduce((a, b) => a.value < b.value ? a : b).key;
  }

  // 获取完整的八字字符串
  String get fullBazi => '$yearPillar $monthPillar $dayPillar $hourPillar';
}
