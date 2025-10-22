import 'package:get/get.dart';

class MessagesController extends GetxController {
  // 顶部角标与未读
  final RxInt systemNotifyBadge = 25.obs;
  final RxInt tabUnread = 27.obs;

  // 会话数据（示例数据，可后续接入接口）
  final conversations = [
    ConversationItem(
      name: '系统消息',
      time: '下午 12:11',
      preview: '您好，若在使用我们平台过程中有任何问题…',
      unread: 2,
      avatarText: 'S',
    ),
    ConversationItem(
      name: '王瑜',
      time: '7月10日 上午 08:57',
      preview: '您好，我是王瑜老师，请详细描述您的问题…',
      unread: 0,
      avatarText: '王',
    ),
  ].obs;

  // 推荐大师（示例数据）
  final masters = [
    MasterItem(
      name: '葛玄',
      tag: '新晋',
      capsules: ['责任心强', '满意度高', '就业预测', '职场达人'],
      score: 4.95,
      desc:
          '来都来了。缘分使然。山人略通易数，能观星盘推命理，起六爻断吉凶。有甚迷惘？不妨坐下聊聊，借三枚铜钱一盏茶……',
      answers: 146,
      fans: 91,
      minutesAgo: 3,
    ),
    MasterItem(
      name: '陈沐易',
      tag: '白银武者',
      capsules: ['责任心强', '商业认知高', '格局广'],
      score: 4.74,
      desc:
          '少时书签名校，深耕命理运筹十余载；融合天文地理逻辑之力，累计预测案例逾数千，秉承“知无不言”…',
      answers: 128,
      fans: 73,
      minutesAgo: 5,
    ),
  ].obs;
}

class ConversationItem {
  final String name;
  final String time;
  final String preview;
  final int unread;
  final String avatarText;

  ConversationItem({
    required this.name,
    required this.time,
    required this.preview,
    required this.unread,
    required this.avatarText,
  });
}

class MasterItem {
  final String name;
  final String tag;
  final List<String> capsules;
  final double score;
  final String desc;
  final int answers;
  final int fans;
  final int minutesAgo;

  MasterItem({
    required this.name,
    required this.tag,
    required this.capsules,
    required this.score,
    required this.desc,
    required this.answers,
    required this.fans,
    required this.minutesAgo,
  });
}