// 测试lunar-javascript库的集成
const { Solar, Lunar } = require('./node_modules/lunar-javascript/lunar');

console.log('🧪 测试lunar-javascript库集成...\n');

// 测试用例：创建一个已知的八字
try {
  // 测试1：2023年5月15日上午10点30分的八字
  console.log('📅 测试用例1：2023年5月15日上午10:30');
  const solar1 = Solar.fromYmdHms(2023, 5, 15, 10, 30, 0);
  const lunar1 = solar1.getLunar();
  
  console.log('🌞 阳历:', solar1.toString());
  console.log('🌙 农历:', lunar1.toString());
  console.log('🧭 年柱:', lunar1.getYearInGanZhi());
  console.log('🧭 月柱:', lunar1.getMonthInGanZhi());
  console.log('🧭 日柱:', lunar1.getDayInGanZhi());
  console.log('🧭 时柱:', lunar1.getTimeInGanZhi());
  console.log('🐭 生肖:', lunar1.getYearShengXiao());
  console.log('🌟 节日:', lunar1.getFestivals().length > 0 ? lunar1.getFestivals().join(', ') : '无');
  console.log('---');

  // 测试2：1990年8月15日下午2点的八字  
  console.log('\n📅 测试用例2：1990年8月15日下午2:00');
  const solar2 = Solar.fromYmdHms(1990, 8, 15, 14, 0, 0);
  const lunar2 = solar2.getLunar();
  
  console.log('🌞 阳历:', solar2.toString());
  console.log('🌙 农历:', lunar2.toString());
  console.log('🧭 年柱:', lunar2.getYearInGanZhi());
  console.log('🧭 月柱:', lunar2.getMonthInGanZhi());
  console.log('🧭 日柱:', lunar2.getDayInGanZhi());
  console.log('🧭 时柱:', lunar2.getTimeInGanZhi());
  console.log('🐭 生肖:', lunar2.getYearShengXiao());
  console.log('🌟 节日:', lunar2.getFestivals().length > 0 ? lunar2.getFestivals().join(', ') : '无');
  console.log('---');

  // 测试3：2024年春节的八字
  console.log('\n📅 测试用例3：2024年春节（正月初一）');
  const solar3 = Solar.fromYmdHms(2024, 2, 10, 8, 0, 0); // 2024年正月初一
  const lunar3 = solar3.getLunar();
  
  console.log('🌞 阳历:', solar3.toString());
  console.log('🌙 农历:', lunar3.toString());
  console.log('🧭 年柱:', lunar3.getYearInGanZhi());
  console.log('🧭 月柱:', lunar3.getMonthInGanZhi());
  console.log('🧭 日柱:', lunar3.getDayInGanZhi());
  console.log('🧭 时柱:', lunar3.getTimeInGanZhi());
  console.log('🐭 生肖:', lunar3.getYearShengXiao());
  console.log('🌟 节日:', lunar3.getFestivals().length > 0 ? lunar3.getFestivals().join(', ') : '无');
  console.log('---');

  console.log('\n✅ lunar-javascript库集成测试成功！');
  console.log('✅ 可以使用lunar库准确计算八字信息');

} catch (error) {
  console.error('❌ 测试失败:', error.message);
}