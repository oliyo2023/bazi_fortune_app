import 'astrology_model.dart';

class AstrologyConstants {
  // 12个星座数据
  static final List<ZodiacSign> zodiacSigns = [
    ZodiacSign(
      name: 'Aries',
      cnName: '白羊座',
      symbol: '♈',
      number: 1,
      dateRange: '3.21-4.19',
      element: '火',
      quality: '基本',
      ruler: '火星',
    ),
    ZodiacSign(
      name: 'Taurus',
      cnName: '金牛座',
      symbol: '♉',
      number: 2,
      dateRange: '4.20-5.20',
      element: '土',
      quality: '固定',
      ruler: '金星',
    ),
    ZodiacSign(
      name: 'Gemini',
      cnName: '双子座',
      symbol: '♊',
      number: 3,
      dateRange: '5.21-6.20',
      element: '风',
      quality: '变动',
      ruler: '水星',
    ),
    ZodiacSign(
      name: 'Cancer',
      cnName: '巨蟹座',
      symbol: '♋',
      number: 4,
      dateRange: '6.21-7.22',
      element: '水',
      quality: '基本',
      ruler: '月球',
    ),
    ZodiacSign(
      name: 'Leo',
      cnName: '狮子座',
      symbol: '♌',
      number: 5,
      dateRange: '7.23-8.22',
      element: '火',
      quality: '固定',
      ruler: '太阳',
    ),
    ZodiacSign(
      name: 'Virgo',
      cnName: '处女座',
      symbol: '♍',
      number: 6,
      dateRange: '8.23-9.22',
      element: '土',
      quality: '变动',
      ruler: '水星',
    ),
    ZodiacSign(
      name: 'Libra',
      cnName: '天秤座',
      symbol: '♎',
      number: 7,
      dateRange: '9.23-10.22',
      element: '风',
      quality: '基本',
      ruler: '金星',
    ),
    ZodiacSign(
      name: 'Scorpio',
      cnName: '天蝎座',
      symbol: '♏',
      number: 8,
      dateRange: '10.23-11.21',
      element: '水',
      quality: '固定',
      ruler: '冥王星',
    ),
    ZodiacSign(
      name: 'Sagittarius',
      cnName: '射手座',
      symbol: '♐',
      number: 9,
      dateRange: '11.22-12.21',
      element: '火',
      quality: '变动',
      ruler: '木星',
    ),
    ZodiacSign(
      name: 'Capricorn',
      cnName: '摩羯座',
      symbol: '♑',
      number: 10,
      dateRange: '12.22-1.19',
      element: '土',
      quality: '基本',
      ruler: '土星',
    ),
    ZodiacSign(
      name: 'Aquarius',
      cnName: '水瓶座',
      symbol: '♒',
      number: 11,
      dateRange: '1.20-2.18',
      element: '风',
      quality: '固定',
      ruler: '天王星',
    ),
    ZodiacSign(
      name: 'Pisces',
      cnName: '双鱼座',
      symbol: '♓',
      number: 12,
      dateRange: '2.19-3.20',
      element: '水',
      quality: '变动',
      ruler: '海王星',
    ),
  ];

  // 12个宫位的含义
  static final Map<int, String> housesMeanings = {
    1: '自我 · 外表',
    2: '金钱 · 所有物',
    3: '交通 · 兄弟姐妹',
    4: '家 · 基础',
    5: '创意 · 浪漫',
    6: '工作 · 健康',
    7: '关系 · 婚姻',
    8: '转变 · 共有资源',
    9: '哲学 · 旅行',
    10: '事业 · 名声',
    11: '友谊 · 希望',
    12: '潜意识 · 灵性',
  };

  static final Map<int, String> housesMeaningsEn = {
    1: 'Self · Appearance',
    2: 'Money · Possessions',
    3: 'Communication · Siblings',
    4: 'Home · Foundation',
    5: 'Creativity · Romance',
    6: 'Work · Health',
    7: 'Relationships · Marriage',
    8: 'Transformation · Shared Resources',
    9: 'Philosophy · Travel',
    10: 'Career · Public Image',
    11: 'Friendship · Hopes',
    12: 'Unconscious · Spirituality',
  };

  // 五行对应
  static final Map<String, String> elements = {
    '火': 'Fire',
    '土': 'Earth',
    '风': 'Air',
    '水': 'Water',
  };

  // 性质对应
  static final Map<String, String> qualities = {
    '基本': 'Cardinal',
    '固定': 'Fixed',
    '变动': 'Mutable',
  };

  // 行星
  static final List<String> planets = [
    'Sun', // 太阳
    'Moon', // 月亮
    'Mercury', // 水星
    'Venus', // 金星
    'Mars', // 火星
    'Jupiter', // 木星
    'Saturn', // 土星
    'Uranus', // 天王星
    'Neptune', // 海王星
    'Pluto', // 冥王星
  ];

  static final List<String> planetsCn = [
    '太阳',
    '月亮',
    '水星',
    '金星',
    '火星',
    '木星',
    '土星',
    '天王星',
    '海王星',
    '冥王星',
  ];

  // 星座编号查询
  static int getZodiacNumberByDate(DateTime date) {
    int month = date.month;
    int day = date.day;

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 1; // Aries
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 2; // Taurus
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 3; // Gemini
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 4; // Cancer
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 5; // Leo
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 6; // Virgo
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 7; // Libra
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 8; // Scorpio
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 9; // Sagittarius
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return 10; // Capricorn
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 11; // Aquarius
    return 12; // Pisces
  }

  // 获取星座信息
  static ZodiacSign? getZodiacByNumber(int number) {
    try {
      return zodiacSigns[number - 1];
    } catch (e) {
      return null;
    }
  }

  // 获取星座名称
  static String getZodiacName(int number) {
    final sign = getZodiacByNumber(number);
    return sign?.name ?? 'Unknown';
  }

  // 获取宫位含义
  static String getHouseMeaning(int house, {bool isEnglish = false}) {
    return isEnglish 
      ? housesMeaningsEn[house] ?? 'Unknown'
      : housesMeanings[house] ?? '未知';
  }
}
