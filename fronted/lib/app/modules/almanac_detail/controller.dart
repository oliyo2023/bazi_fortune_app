import 'package:get/get.dart';
import 'package:lunar/lunar.dart';

class AlmanacDetailController extends GetxController {
  // 当前选中的日期
  final Rx<DateTime> _selectedDate = DateTime.now().obs;
  DateTime get selectedDate => _selectedDate.value;

  // 顶部日期信息
  final monthTitle = ''.obs;
  final lunarLine = ''.obs;

  // 宜忌
  final yiList = ''.obs;
  final jiList = ''.obs;

  // 顶部侧边按钮文案
  final sideActionText = '吉日\n查询'.obs;

  // 卡片矩阵区
  final wuXing = ''.obs;
  final chongSha = ''.obs;
  final zhiShen = ''.obs;
  final shenYiQu = ''.obs;
  final taiShen = ''.obs;
  final xiongShen = ''.obs;
  final baiLu = ''.obs;
  final jianChu = ''.obs;

  // 时辰吉凶简表
  final hours = <Map<String, Object>>[].obs;

  // 当前时辰详情
  final currentHourTitle = ''.obs;
  final xiShen = ''.obs;
  final hourYi = ''.obs;
  final hourJi = ''.obs;

  @override
  void onInit() {
    super.onInit();
    // 监听日期变化，自动更新数据
    ever(_selectedDate, (date) => updateAlmanacData(date));
    // 初始化时加载当天数据
    updateAlmanacData(selectedDate);
  }

  // 更新所有黄历数据
  void updateAlmanacData(DateTime date) {
    final lunar = Lunar.fromDate(date);

    // 更新顶部信息
    monthTitle.value = '${lunar.getMonthInChinese()}月 ${lunar.getDayInChinese()}';
    
    // 临时硬编码节日，待后续完善
    String festivalNames = '';
    if (date.month == 10 && date.day == 9) {
      festivalNames = ' 重阳节';
    }
    
    lunarLine.value = '公历 ${lunar.getYear()}年${lunar.getMonth()}月${lunar.getDay()}日 农历 ${lunar.getYearInGanZhi()}${lunar.getYearShengXiao()}年 ${lunar.getMonthInGanZhi()}月${lunar.getDayInGanZhi()}日 ${lunar.getWeekInChinese()}$festivalNames';

    // 更新宜忌
    yiList.value = lunar.getDayYi().join(' ');
    jiList.value = lunar.getDayJi().join(' ');

    // 更新卡片矩阵
    wuXing.value = '五行\n${lunar.getDayNaYin()}';
    chongSha.value = '冲煞\n冲${lunar.getDayChongShengXiao()}煞${lunar.getDaySha()}';
    zhiShen.value = '值神\n${lunar.getZhiXing()}';
    
    // 神煞信息 - 使用占位符，待后续完善
    shenYiQu.value = '吉神宜趋\n\n月德 禄神\n恩四 阳德\n福星 相日\n天喜 吉期\n金匮';
    xiongShen.value = '凶神宜忌\n\n月厌 地火\n勾陈 血忌';
    taiShen.value = '今日胎神\n\n仓库碓-厕北';
    baiLu.value = '彭祖百忌\n\n丙不泣水 更难提防\n辰不哭泣 必主重丧';
    jianChu.value = '收日';

    // 更新时辰吉凶 - 使用占位符，待后续完善
    final hourList = <Map<String, Object>>[];
    final hourLabels = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    final hourStatus = ['凶', '吉', '吉', '吉', '吉', '凶', '凶', '吉', '吉', '吉', '吉', '吉'];
    final now = Lunar.fromDate(DateTime.now());
    final currentGanZhi = now.getTime().getGanZhi();

    for (int i = 0; i < 12; i++) {
      hourList.add({
        'label': hourLabels[i],
        'status': hourStatus[i],
        'active': hourLabels[i] == currentGanZhi.substring(1), // 简单匹配地支
      });
    }
    hours.value = hourList;

    // 更新当前时辰详情 - 使用占位符，待后续完善
    if (date.year == DateTime.now().year && date.month == DateTime.now().month && date.day == DateTime.now().day) {
      currentHourTitle.value = '丙午凶 11:00-12:59 冲鼠煞北';
      xiShen.value = '喜神西南 财神西南 福神西北';
      hourYi.value = '求嗣 订婚 嫁娶 开市 交易 安床';
      hourJi.value = '赴任 出行 求财 祭祀 祈福 齐醮 开光';
    } else {
      currentHourTitle.value = '非今日，无当前时辰';
      xiShen.value = '';
      hourYi.value = '';
      hourJi.value = '';
    }
  }

  //- 切换到后一天
  void nextDay() {
    _selectedDate.value = selectedDate.add(const Duration(days: 1));
  }

  //- 切换到前一天
  void prevDay() {
    _selectedDate.value = selectedDate.subtract(const Duration(days: 1));
  }
}