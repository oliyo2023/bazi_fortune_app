import {
  AIAnalysisRequest,
  AIAnalysisResult,
  analyzeBaziWithAI,
  analyzeBaziWithGLM46,
  compareAIAnalysis,
} from "./ai";
import { Solar, Lunar, LunarYear } from "lunar-javascript";

export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: "male" | "female";
  name?: string;
  timezone?: string;
  aiProvider?: "deepseek" | "glm46"; // 新增：AI提供商选择
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

// 重新导出AI分析函数以保持向后兼容性
export { analyzeBaziWithAI, analyzeBaziWithGLM46, compareAIAnalysis } from "./ai";

// 为现有代码提供便捷函数
export async function compareBaziAnalysis(
  input: BaziInput,
  language: "zh" | "en" = "zh",
  aspects?: string[],
): Promise<{
  baziResult: BaziResult;
  comparison: { deepseek: AIAnalysisResult; glm46: AIAnalysisResult };
}> {
  const baziResult = calculateBaziResult(input);
  const comparison = await compareAIAnalysis(
    input,
    baziResult,
    language,
    aspects,
  );

  return {
    baziResult,
    comparison,
  };
}

export function calculateBaziResult(input: BaziInput): BaziResult {
  try {
    // 使用lunar-javascript库创建太阳日期
    const solar = Solar.fromYmdHms(
      input.year,
      input.month,
      input.day,
      input.hour,
      input.minute || 0,
      0
    );
    
    const lunar = solar.getLunar();
    
    // 获取八字干支
    const yearPillar = lunar.getYearInGanZhi();
    const monthPillar = lunar.getMonthInGanZhi();
    const dayPillar = lunar.getDayInGanZhi();
    const hourPillar = lunar.getTimeInGanZhi();
    
    // 获取基本信息
    const zodiac = lunar.getYearShengXiao();
    const lunarYear = lunar.getYearInChinese();
    const lunarMonth = lunar.getMonthInChinese();
    const lunarDay = lunar.getDayInChinese();
    const lunarDate = `农历${lunarYear}${lunarMonth}${lunarDay}`;
    
    // 获取五行属性
    const fiveElements = calculateFiveElements(yearPillar + monthPillar + dayPillar + hourPillar);
    
    return {
      yearPillar,
      monthPillar,
      dayPillar,
      hourPillar,
      dayMaster: dayPillar.charAt(0), // 日主是天干
      zodiac,
      nayin: getNaYin(yearPillar),
      season: getSeason(input.month),
      solarTerms: getSolarTerms(input.month, input.day),
      lunarDate,
      fiveElements,
      shiShen: calculateShiShen(dayPillar, monthPillar),
      yongShen: calculateYongShen(fiveElements),
      xiShen: calculateXiShen(fiveElements),
      jiShen: calculateJiShen(fiveElements),
      luckyElements: calculateLuckyElements(fiveElements),
      colors: calculateColors(fiveElements),
      numbers: calculateNumbers(fiveElements),
      directions: calculateDirections(fiveElements),
    };
  } catch (error) {
    console.error('计算八字时出错:', error);
    throw new Error('八字计算失败，请检查输入的日期时间是否正确');
  }
}

// 计算五行属性
function calculateFiveElements(bazi: string): Record<string, number> {
  const fiveElements: Record<string, number> = {
    木: 0,
    火: 0,
    土: 0,
    金: 0,
    水: 0,
  };
  
  const tianGanToElements: Record<string, string> = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水',
  };
  
  for (const char of bazi) {
    const element = tianGanToElements[char];
    if (element) {
      fiveElements[element]++;
    }
  }
  
  return fiveElements;
}

// 获取纳音
function getNaYin(yearPillar: string): string {
  const naYinTable: Record<string, string> = {
    '甲子': '海中金', '乙丑': '海中金',
    '丙寅': '炉中火', '丁卯': '炉中火',
    '戊辰': '大林木', '己巳': '大林木',
    '庚午': '路旁土', '辛未': '路旁土',
    '壬申': '剑锋金', '癸酉': '剑锋金',
    '甲戌': '山头火', '乙亥': '山头火',
    '丙子': '涧下水', '丁丑': '涧下水',
    '戊寅': '城头土', '己卯': '城头土',
    '庚辰': '白蜡金', '辛巳': '白蜡金',
    '壬午': '杨柳木', '癸未': '杨柳木',
    '甲申': '泉中水', '乙酉': '泉中水',
    '丙戌': '屋上土', '丁亥': '屋上土',
    '戊子': '霹雳火', '己丑': '霹雳火',
    '庚寅': '松柏木', '辛卯': '松柏木',
    '壬辰': '长流水', '癸巳': '长流水',
    '甲午': '砂中金', '乙未': '砂中金',
    '丙申': '山下火', '丁酉': '山下火',
    '戊戌': '平地木', '己亥': '平地木',
    '庚子': '壁上土', '辛丑': '壁上土',
    '壬寅': '金簿金', '癸卯': '金簿金',
    '甲辰': '覆灯火', '乙巳': '覆灯火',
    '丙午': '天河水', '丁未': '天河水',
    '戊申': '大驿土', '己酉': '大驿土',
    '庚戌': '钗钏金', '辛亥': '钗钏金',
    '壬子': '桑柘木', '癸丑': '桑柘木',
    '甲寅': '大溪水', '乙卯': '大溪水',
    '丙辰': '砂中土', '丁巳': '砂中土',
    '戊午': '天上火', '己未': '天上火',
    '庚申': '石榴木', '辛酉': '石榴木',
    '壬戌': '大海水', '癸亥': '大海水',
  };
  
  return naYinTable[yearPillar] || '海中金';
}

// 计算十神
function calculateShiShen(dayPillar: string, monthPillar: string): Record<string, string> {
  const dayMaster = dayPillar.charAt(0);
  const monthGan = monthPillar.charAt(0);
  
  // 简化的十神计算
  const defaultShishen: Record<string, string> = {
    '年': '比肩',
    '月': '比肩',
    '日': '日主',
    '时': '食神'
  };
  
  return defaultShishen;
}

// 计算用神
function calculateYongShen(fiveElements: Record<string, number>): string[] {
  const maxElement = Object.entries(fiveElements).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  return [maxElement];
}

// 计算喜神
function calculateXiShen(fiveElements: Record<string, number>): string[] {
  return Object.keys(fiveElements).filter(key => fiveElements[key] > 0);
}

// 计算忌神
function calculateJiShen(fiveElements: Record<string, number>): string[] {
  return Object.keys(fiveElements).filter(key => fiveElements[key] === 0);
}

// 计算幸运五行
function calculateLuckyElements(fiveElements: Record<string, number>): string[] {
  return Object.entries(fiveElements)
    .filter(([_, count]) => count > 0)
    .map(([element, _]) => element);
}

// 计算幸运颜色
function calculateColors(fiveElements: Record<string, number>): string[] {
  const colorMap: Record<string, string[]> = {
    '木': ['绿色', '青色'],
    '火': ['红色', '紫色'],
    '土': ['黄色', '棕色'],
    '金': ['白色', '金色'],
    '水': ['黑色', '蓝色']
  };
  
  const colors: string[] = [];
  Object.entries(fiveElements).forEach(([element, count]) => {
    if (count > 0 && colorMap[element]) {
      colors.push(...colorMap[element]);
    }
  });
  
  return colors;
}

// 计算幸运数字
function calculateNumbers(fiveElements: Record<string, number>): number[] {
  const numberMap: Record<string, number[]> = {
    '木': [1, 2],
    '火': [3, 4],
    '土': [5, 6],
    '金': [7, 8],
    '水': [9, 0]
  };
  
  const numbers: number[] = [];
  Object.entries(fiveElements).forEach(([element, count]) => {
    if (count > 0 && numberMap[element]) {
      numbers.push(...numberMap[element]);
    }
  });
  
  return [...new Set(numbers)]; // 去重
}

// 计算幸运方向
function calculateDirections(fiveElements: Record<string, number>): string[] {
  const directionMap: Record<string, string[]> = {
    '木': ['东方'],
    '火': ['南方'],
    '土': ['中央'],
    '金': ['西方'],
    '水': ['北方']
  };
  
  const directions: string[] = [];
  Object.entries(fiveElements).forEach(([element, count]) => {
    if (count > 0 && directionMap[element]) {
      directions.push(...directionMap[element]);
    }
  });
  
  return [...new Set(directions)];
}

// 获取季节
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

// 获取二十四节气
function getSolarTerms(month: number, day: number): string[] {
  // 简化的节气计算
  const solarTermsByMonth: Record<number, string[]> = {
    1: ['小寒', '大寒'],
    2: ['立春', '雨水'],
    3: ['惊蛰', '春分'],
    4: ['清明', '谷雨'],
    5: ['立夏', '小满'],
    6: ['芒种', '夏至'],
    7: ['小暑', '大暑'],
    8: ['立秋', '处暑'],
    9: ['白露', '秋分'],
    10: ['寒露', '霜降'],
    11: ['立冬', '小雪'],
    12: ['大雪', '冬至']
  };
  
  return solarTermsByMonth[month] || ['立春', '雨水'];
}
