import 'package:get/get.dart';

class AlmanacDetailController extends GetxController {
  // 顶部日期信息（示例占位，后续可从后端获取）
  final monthTitle = '七月 廿九'.obs;
  final lunarLine = '乙巳年 七月 廿九日 属蛇 周六'.obs;

  // 宜忌（示例）
  final yiList = '嫁娶 纳采 订盟 祭祀 祈福 开光 出行 理发 作灶 出火 拆卸 修造 动土 进人口 入宅 移徙 安床 挂匾 栽种 纳畜 破土 安葬 入殓 除服 成服'.obs;
  final jiList = '开市 掘井 开渠 造桥 造船'.obs;

  // 顶部侧边按钮文案
  final sideActionText = '吉日\n查询'.obs;

  // 卡片矩阵区（简化分块文案）
  final wuXing = '五行\n长流水'.obs;
  final chongSha = '冲煞\n冲狗煞南'.obs;
  final zhiShen = '值神\n青龙'.obs;

  final shenYiQu = '吉神宜趋\n\n月德 禄神\n恩四 阳德\n福星 相日\n天喜 吉期\n金匮'.obs;
  final taiShen = '今日胎神\n\n仓库碓-厕北'.obs;
  final xiongShen = '凶神宜忌\n\n月厌 地火\n勾陈 血忌'.obs;

  final baiLu = '彭祖百忌\n\n丙不泣水 更难提防\n辰不哭泣 必主重丧'.obs;

  // 时辰吉凶简表
  final hours = [
    {'label': '子', 'status': '凶'},
    {'label': '丑', 'status': '吉'},
    {'label': '寅', 'status': '吉'},
    {'label': '卯', 'status': '吉'},
    {'label': '辰', 'status': '吉'},
    {'label': '巳', 'status': '凶'},
    {'label': '午', 'status': '凶', 'active': true},
    {'label': '未', 'status': '吉'},
    {'label': '申', 'status': '吉'},
    {'label': '酉', 'status': '吉'},
    {'label': '戌', 'status': '吉'},
    {'label': '亥', 'status': '吉'},
  ].obs;

  // 当前时辰详情
  final currentHourTitle = '丙午凶 11:00-12:59 冲鼠煞北'.obs;
  final xiShen = '喜神西南 财神西南 福神西北'.obs;
  final hourYi = '求嗣 订婚 嫁娶 开市 交易 安床'.obs;
  final hourJi = '赴任 出行 求财 祭祀 祈福 齐醮 开光'.obs;
}