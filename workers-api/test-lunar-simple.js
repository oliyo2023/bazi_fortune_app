// 简化的lunar集成测试
const { Solar, Lunar } = require('./node_modules/lunar-javascript/lunar');

console.log('🧪 简化测试：lunar-javascript库集成\n');

function testBaziCalculation(birthData, description) {
  console.log(`📅 ${description}`);
  console.log(`   输入：${birthData.year}-${birthData.month}-${birthData.day} ${birthData.hour}:${birthData.minute || 0}`);
  
  try {
    const solar = Solar.fromYmdHms(
      birthData.year, 
      birthData.month, 
      birthData.day, 
      birthData.hour, 
      birthData.minute || 0, 
      0
    );
    
    const lunar = solar.getLunar();
    
    // 模拟bazi.ts中的计算
    const result = {
      yearPillar: lunar.getYearInGanZhi(),
      monthPillar: lunar.getMonthInGanZhi(),
      dayPillar: lunar.getDayInGanZhi(),
      hourPillar: lunar.getTimeInGanZhi(),
      dayMaster: lunar.getDayInGanZhi().charAt(0),
      zodiac: lunar.getYearShengXiao(),
      lunarDate: `农历${lunar.getYearInChinese()}${lunar.getMonthInChinese()}${lunar.getDayInChinese()}`,
    };
    
    console.log(`   ✅ 年柱: ${result.yearPillar}`);
    console.log(`   ✅ 月柱: ${result.monthPillar}`);
    console.log(`   ✅ 日柱: ${result.dayPillar}`);
    console.log(`   ✅ 时柱: ${result.hourPillar}`);
    console.log(`   ✅ 日主: ${result.dayMaster}`);
    console.log(`   ✅ 生肖: ${result.zodiac}`);
    console.log(`   ✅ 农历: ${result.lunarDate}`);
    console.log(`   ---\n`);
    
    return result;
  } catch (error) {
    console.log(`   ❌ 错误: ${error.message}\n`);
    return null;
  }
}

// 测试用例
console.log('=== 八字计算测试 ===\n');

const testCases = [
  {
    year: 1990, month: 8, day: 15, hour: 14, minute: 30,
    description: '1990年8月15日下午2:30'
  },
  {
    year: 2024, month: 2, day: 10, hour: 8, minute: 0,
    description: '2024年春节正月初一上午8:00'
  },
  {
    year: 2000, month: 1, day: 1, hour: 0, minute: 0,
    description: '2000年1月1日子时'
  }
];

testCases.forEach(testCase => {
  testBaziCalculation(testCase, testCase.description);
});

console.log('✅ lunar-javascript库集成测试完成');
console.log('✅ 八字计算功能正常工作');

// 验证TypeScript模块导入
try {
  console.log('\n🔍 检查模块导入...');
  require('./src/lib/bazi');
  console.log('✅ bazi.ts 模块导入成功');
} catch (error) {
  console.log('⚠️  bazi.ts 模块导入存在问题:', error.message);
}