import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controller.dart';

class MessagesPage extends GetView<MessagesController> {
  const MessagesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final themePrimary = const Color(0xFF5C7CFF);
    final cardRadius = 14.0;

    return Scaffold(
      backgroundColor: const Color(0xFFF7F7F9),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(child: _QuickActions(themePrimary: themePrimary)),
          const SliverToBoxAdapter(child: SizedBox(height: 8)),
          SliverToBoxAdapter(
            child: _SectionTitle(text: '会话列表'),
          ),
          SliverToBoxAdapter(
            child: _ConversationList(cardRadius: cardRadius),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(
            child: _SectionTitle(text: '为您推荐大师', color: const Color(0xFF7A8CFF)),
          ),
          SliverList.builder(
            itemCount: controller.masters.length,
            itemBuilder: (_, i) => _MasterCard(
              item: controller.masters[i],
              cardRadius: cardRadius,
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 16)),
        ],
      ),
    );
  }
}

class _QuickActions extends GetView<MessagesController> {
  const _QuickActions({required this.themePrimary});
  final Color themePrimary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 12, 12, 4),
      child: Row(
        children: [
          _QAItem(
            color: const LinearGradient(colors: [Color(0xFF63B3FF), Color(0xFF4A7BFF)]),
            label: '问题反馈',
            icon: Icons.person_outline,
          ),
          const SizedBox(width: 12),
          Obx(
            () => _QAItem(
              color: const LinearGradient(colors: [Color(0xFFFFB46B), Color(0xFFFF6B00)]),
              label: '系统通知',
              icon: Icons.notifications_none,
              badge: controller.systemNotifyBadge.value,
            ),
          ),
          const SizedBox(width: 12),
          _QAItem(
            color: const LinearGradient(colors: [Color(0xFFC1A689), Color(0xFF7C5B3A)]),
            label: '大师说',
            icon: Icons.content_paste_outlined,
          ),
        ],
      ),
    );
  }
}

class _QAItem extends StatelessWidget {
  const _QAItem({
    required this.color,
    required this.label,
    required this.icon,
    this.badge,
  });

  final LinearGradient color;
  final String label;
  final IconData icon;
  final int? badge;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(.06), blurRadius: 12, offset: const Offset(0, 4))],
        ),
        alignment: Alignment.center,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    gradient: color,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(icon, color: Colors.white),
                ),
                const SizedBox(height: 8),
                Text(label, style: const TextStyle(fontSize: 13, color: Color(0xFF3C4043))),
              ],
            ),
            if (badge != null && badge! > 0)
              Positioned(
                top: -2,
                right: 16,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFF3B30),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: Colors.white, width: 2),
                  ),
                  child: Text('$badge', style: const TextStyle(color: Colors.white, fontSize: 11)),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({required this.text, this.color});
  final String text;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final c = color ?? const Color(0xFF9AA0A6);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Column(
        children: [
          Text('— $text —', style: TextStyle(color: c, fontSize: 13)),
          const SizedBox(height: 8),
          Container(
            width: 160,
            height: 1,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.transparent, Color(0xFFdadce0), Colors.transparent],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ConversationList extends GetView<MessagesController> {
  const _ConversationList({required this.cardRadius});
  final double cardRadius;

  @override
  Widget build(BuildContext context) {
    return Obx(
      () => Container(
        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(cardRadius),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(.05), blurRadius: 14, offset: const Offset(0, 6))],
        ),
        child: Column(
          children: [
            for (int i = 0; i < controller.conversations.length; i++) ...[
              _ConversationTile(item: controller.conversations[i]),
              if (i != controller.conversations.length - 1)
                const Divider(height: 1, color: Color(0xFFEEEEEF)),
            ]
          ],
        ),
      ),
    );
  }
}

class _ConversationTile extends StatelessWidget {
  const _ConversationTile({required this.item});
  final ConversationItem item;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 44,
            height: 44,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: const Color(0xFFEEF2FF),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(item.avatarText, style: const TextStyle(color: Color(0xFF5B6CFF), fontWeight: FontWeight.w700)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(children: [
                  Text(item.name, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Color(0xFF2B2F33))),
                  if (item.unread > 0)
                    Container(
                      margin: const EdgeInsets.only(left: 6),
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFF3B30),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text('${item.unread}', style: const TextStyle(color: Colors.white, fontSize: 11)),
                    ),
                  const Spacer(),
                  Text(item.time, style: const TextStyle(fontSize: 12, color: Color(0xFF9AA0A6))),
                ]),
                const SizedBox(height: 6),
                Text(
                  item.preview,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontSize: 13, color: Color(0xFF5F6368)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _MasterCard extends StatelessWidget {
  const _MasterCard({required this.item, required this.cardRadius});
  final MasterItem item;
  final double cardRadius;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(12, 10, 12, 0),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(cardRadius),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(.05), blurRadius: 14, offset: const Offset(0, 6))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(width: 52, height: 52, decoration: BoxDecoration(color: const Color(0xFFEAEFF6), borderRadius: BorderRadius.circular(12))),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Wrap(
                      crossAxisAlignment: WrapCrossAlignment.center,
                      spacing: 8,
                      runSpacing: 4,
                      children: [
                        Text(item.name, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Color(0xFF2B2F33))),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(color: const Color(0xFFE9F0FF), borderRadius: BorderRadius.circular(999)),
                          child: const Text('新晋', style: TextStyle(fontSize: 11, color: Color(0xFF5C7CFF))),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(color: const Color(0xFFF1F4FF), borderRadius: BorderRadius.circular(999)),
                          child: const Text('观点精辟', style: TextStyle(fontSize: 12, color: Color(0xFF6482FF))),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 6,
                      runSpacing: 6,
                      children: item.capsules
                          .map((t) => Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(color: const Color(0xFFF5F6F8), borderRadius: BorderRadius.circular(999)),
                                child: Text(t, style: const TextStyle(fontSize: 11, color: Color(0xFF5F6368))),
                              ))
                          .toList(),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        ...List.generate(5, (i) => Icon(Icons.star, size: 14, color: const Color(0xFFF7B500).withOpacity(i < item.score.round() ? 1 : .5))),
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(color: const Color(0xFFFFF7E6), borderRadius: BorderRadius.circular(6)),
                          child: Text('${item.score.toStringAsFixed(2)}分',
                              style: const TextStyle(fontSize: 12, color: Color(0xFF9C7B28))),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(item.desc, style: const TextStyle(fontSize: 13, color: Color(0xFF3C4043), height: 1.5)),
          const SizedBox(height: 10),
          Row(
            children: [
              _Meta(icon: Icons.chat_bubble_outline, text: '${item.answers}解答'),
              const SizedBox(width: 16),
              _Meta(icon: Icons.group_outlined, text: '${item.fans}粉丝'),
              const SizedBox(width: 16),
              _Meta(icon: Icons.access_time, text: '${item.minutesAgo}分钟'),
            ],
          ),
        ],
      ),
    );
  }
}

class _Meta extends StatelessWidget {
  const _Meta({required this.icon, required this.text});
  final IconData icon;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, size: 16, color: const Color(0xFF8B949E)),
        const SizedBox(width: 4),
        Text(text, style: const TextStyle(fontSize: 12, color: Color(0xFF6B7280))),
      ],
    );
  }
}