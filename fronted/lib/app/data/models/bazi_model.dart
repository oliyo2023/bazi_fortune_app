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

  factory BaziModel.fromJson(Map<String, dynamic> json) {
    return BaziModel(
      id: json['id'],
      userId: json['user_id'],
      birthYear: json['birth_year'],
      birthMonth: json['birth_month'],
      birthDay: json['birth_day'],
      birthHour: json['birth_hour'],
      birthMinute: json['birth_minute'] ?? 0,
      gender: json['gender'],
      lunarCalendar: json['lunar_calendar'] ?? false,
      timezone: json['timezone'] ?? 'Asia/Shanghai',
      name: json['name'],
      yearPillar: json['year_pillar'],
      monthPillar: json['month_pillar'],
      dayPillar: json['day_pillar'],
      hourPillar: json['hour_pillar'],
      woodScore: json['wood_score'] ?? 0,
      fireScore: json['fire_score'] ?? 0,
      earthScore: json['earth_score'] ?? 0,
      metalScore: json['metal_score'] ?? 0,
      waterScore: json['water_score'] ?? 0,
      aiAnalysis: json['ai_analysis'],
      aiAnalysisEn: json['ai_analysis_en'],
      personalityTraits: json['personality_traits'],
      careerAdvice: json['career_advice'],
      healthAdvice: json['health_advice'],
      relationshipAdvice: json['relationship_advice'],
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
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