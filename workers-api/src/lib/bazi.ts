export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: 'male' | 'female';
  name?: string;
  timezone?: string;
}

export interface BaziResult {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  dayMaster: string;
  zodiac: string;
  nayin: string;
  season: string;
  solarTerms: string[];
  lunarDate: string;
  fiveElements: Record<string, number>;
  shiShen: Record<string, string>;
  yongShen: string[];
  xiShen: string[];
  jiShen: string[];
  luckyElements: string[];
  colors: string[];
  numbers: number[];
  directions: string[];
}

export function calculateBaziResult(input: BaziInput): BaziResult {
  // 天干地支数组
  const tianGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const diZhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  // 生肖数组
  const zodiac = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];

  // 简化的八字计算（实际应使用专业的农历转换库）
  const yearIndex = (input.year - 4) % 60;
  const yearTianGan = tianGan[yearIndex % 10];
  const yearDiZhi = diZhi[yearIndex % 12];

  const monthIndex = (input.month - 1 + yearIndex * 12) % 60;
  const monthTianGan = tianGan[monthIndex % 10];
  const monthDiZhi = diZhi[monthIndex % 12];

  const dayIndex = (input.year * 365 + input.month * 30 + input.day) % 60;
  const dayTianGan = tianGan[dayIndex % 10];
  const dayDiZhi = diZhi[dayIndex % 12];

  const hourIndex = (Math.floor(input.hour / 2) + dayIndex * 12) % 60;
  const hourTianGan = tianGan[hourIndex % 10];
  const hourDiZhi = diZhi[hourIndex % 12];

  return {
    yearPillar: yearTianGan + yearDiZhi,
    monthPillar: monthTianGan + monthDiZhi,
    dayPillar: dayTianGan + dayDiZhi,
    hourPillar: hourTianGan + hourDiZhi,
    dayMaster: dayTianGan,
    zodiac: zodiac[(input.year - 4) % 12],
    nayin: "海中金", // 简化处理
    season: getSeason(input.month),
    solarTerms: ["立春", "雨水"], // 简化处理
    lunarDate: "农历正月初一", // 简化处理，实际需要转换
    fiveElements: {
      "木": 2,
      "火": 1,
      "土": 2,
      "金": 2,
      "水": 1,
    },
    shiShen: {
      "年": "正官",
      "月": "偏财",
      "日": "日主",
      "时": "食神",
    },
    yongShen: ["水", "木"],
    xiShen: ["金"],
    jiShen: ["火", "土"],
    luckyElements: ["水", "木", "金"],
    colors: ["黑色", "蓝色", "绿色", "白色"],
    numbers: [1, 6, 3, 8, 4, 9],
    directions: ["北方", "东方", "西方"],
  };
}

function getSeason(month: number): string {
  switch (true) {
    case month >= 3 && month <= 5:
      return "春季";
    case month >= 6 && month <= 8:
      return "夏季";
    case month >= 9 && month <= 11:
      return "秋季";
    default:
      return "冬季";
  }
}