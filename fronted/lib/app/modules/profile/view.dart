import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controller.dart';

class ProfilePage extends GetView<ProfileController> {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F6FA),
      body: Obx(() {
        if (controller.isLoggedIn) {
          return const _ProfileBody();
        } else {
          // 未登录直接跳转到登录页面
          WidgetsBinding.instance.addPostFrameCallback((_) {
            if (Get.currentRoute != '/login') {
              Get.toNamed('/login');
            }
          });
          // 返回空视图避免闪烁
          return const SizedBox.shrink();
        }
      }),
    );
  }
}

class _ProfileBody extends GetView<ProfileController> {
  const _ProfileBody();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Container(
              decoration: const BoxDecoration(
                gradient: _UI.gradientHeader,
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(24),
                  bottomRight: Radius.circular(24),
                ),
              ),
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
              child: Column(
                children: const [
                  _TopNoticeBar(),
                  SizedBox(height: 12),
                  _UserCard(),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: _UI.pagePadding,
              child: const _VipPrivilegeBar(),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 0),
              child: const _FeatureGrid(),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: const _LuckBanner(),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  _ArrowTile(
                    icon: Icons.edit_note_rounded,
                    title: "feedback".tr,
                    onTap: Get.find<ProfileController>().onFeedbackTap,
                  ),
                  const SizedBox(height: 8),
                  _ArrowTile(
                    icon: Icons.headset_mic_rounded,
                    title: "promotion".tr,
                    onTap: Get.find<ProfileController>().onPromotionTap,
                  ),
                ],
              ),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 16)),
        ],
      ),
    );
  }
}



/// 视觉常量与样式
class _UI {
  static const radiusL = 16.0;
  static const radiusXL = 20.0;
  static const pagePadding = EdgeInsets.symmetric(horizontal: 16, vertical: 12);

  static const gradientHeader = LinearGradient(
    colors: [Color(0xFFB0D7FF), Color(0xFFEEDCFF)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const gradientUserCard = LinearGradient(
    colors: [Color(0xFF9BB7FF), Color(0xFFF0D2FF)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const gradientVip = LinearGradient(
    colors: [Color(0xFFFFE3B3), Color(0xFFFFD599)],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  static const shadowSoft = [
    BoxShadow(
      color: Color(0x1A000000),
      blurRadius: 10,
      offset: Offset(0, 4),
    )
  ];
}

/// 顶部会员提示条
class _TopNoticeBar extends StatelessWidget {
  const _TopNoticeBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFFFF3C8), Color(0xFFD8FFE9)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(_UI.radiusXL),
        boxShadow: _UI.shadowSoft,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          const Icon(Icons.campaign, color: Color(0xFFFF8A00)),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              "member_notice".tr,
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
              boxShadow: _UI.shadowSoft,
            ),
            child: IconButton(
              icon: const Icon(Icons.settings, color: Color(0xFF222222)),
              onPressed: () => Get.toNamed('/settings'),
              constraints: const BoxConstraints(minWidth: 40, minHeight: 40),
              padding: EdgeInsets.zero,
              splashRadius: 22,
            ),
          )
        ],
      ),
    );
  }
}

/// 用户信息大卡片（读取控制器数据）
class _UserCard extends GetView<ProfileController> {
  const _UserCard();

  Widget _stat(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w800,
            color: Colors.black87,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: const TextStyle(
            fontSize: 13,
            color: Colors.black54,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final name = controller.userName ?? '用户';
    final phoneOrEmail = controller.userEmail ?? '未设置联系方式';
    return Container(
      decoration: BoxDecoration(
        gradient: _UI.gradientUserCard,
        borderRadius: BorderRadius.circular(_UI.radiusXL),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Row(
            children: [
              // 头像占位
              Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 64,
                    height: 64,
                    decoration: const BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.white,
                    ),
                  ),
                  const CircleAvatar(
                    radius: 28,
                    backgroundColor: Colors.white,
                    backgroundImage: AssetImage('assets/images/bagua_overlay.png'),
                  ),
                ],
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          name,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            gradient: _UI.gradientVip,
                            borderRadius: BorderRadius.circular(999),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.star_rate_rounded, size: 16, color: Color(0xFFB46A00)),
                              const SizedBox(width: 2),
                              Text(
                                "ordinary_user".tr,
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: Color(0xFF7A4A00),
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              const SizedBox(width: 2),
                              const Icon(Icons.subdirectory_arrow_left_rounded, size: 14, color: Color(0xFFB46A00)),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      phoneOrEmail,
                      style: const TextStyle(fontSize: 14, color: Colors.black54, letterSpacing: 0.2),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Obx(() {
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _stat(controller.balance.value, "balance".tr),
                _stat(controller.yiZhu.value, "view_tickets".tr),
                _stat(controller.favorites.value, "favorites".tr),
              ],
            );
          }),
        ],
      ),
    );
  }
}

/// 会员权益横条
class _VipPrivilegeBar extends StatelessWidget {
  const _VipPrivilegeBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: _UI.gradientVip,
        borderRadius: BorderRadius.circular(_UI.radiusL),
        boxShadow: _UI.shadowSoft,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Row(
        children: [
          const Icon(Icons.diamond_rounded, color: Color(0xFFB46A00)),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              "view_privileges".tr,
              style: const TextStyle(
                color: Color(0xFF7A4A00),
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF0D6),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: const Color(0xFFFFD6A1)),
            ),
            child: Text(
              "activate_membership".tr,
              style: const TextStyle(
                color: Color(0xFFB46A00),
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// 九宫格功能
class _FeatureGrid extends GetView<ProfileController> {
  const _FeatureGrid();

  @override
  Widget build(BuildContext context) {
    final tiles = [
      _FeatureTile(icon: Icons.folder_copy_rounded, label: "consultation_orders".tr, color: Color(0xFF27A6FF)),
      _FeatureTile(icon: Icons.help_center_rounded, label: "qa_orders".tr, color: Color(0xFF27C79A)),
      _FeatureTile(icon: Icons.menu_book_rounded, label: "my_courses".tr, color: Color(0xFFFFB74D)),
      _FeatureTile(icon: Icons.card_giftcard_rounded, label: "coupons".tr, color: Color(0xFFFF5C93)),
      _FeatureTile(icon: Icons.store_mall_directory_rounded, label: "distributors".tr, color: Color(0xFFFFA726)),
      _FeatureTile(icon: Icons.smart_toy_rounded, label: "ai_qa".tr, color: Color(0xFF7C4DFF)),
      _FeatureTile(icon: Icons.verified_user_rounded, label: "teacher_application".tr, color: Color(0xFF42A5F5)),
      _FeatureTile(icon: Icons.change_circle_rounded, label: "fortune_orders".tr, color: Color(0xFFFF5252)),
    ];

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(_UI.radiusXL),
        boxShadow: _UI.shadowSoft,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
      child: GridView.count(
        crossAxisCount: 4,
        mainAxisSpacing: 16,
        crossAxisSpacing: 8,
        childAspectRatio: 1,
        physics: const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        children: tiles.map((t) {
          return GestureDetector(onTap: () => controller.onGridItemTap(t.label), child: t);
        }).toList(),
      ),
    );
  }
}

class _FeatureTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  const _FeatureTile({required this.icon, required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.12),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: color, size: 26),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontSize: 13)),
      ],
    );
  }
}

/// 广告横幅（2025流年运势）
class _LuckBanner extends StatelessWidget {
  const _LuckBanner();

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(_UI.radiusXL),
      child: AspectRatio(
        aspectRatio: 3.2,
        child: Image.asset(
          'assets/images/year_luck_2025.png',
          fit: BoxFit.cover,
          errorBuilder: (_, _, _) {
            return Container(
              color: const Color(0xFFFF6A00),
              alignment: Alignment.center,
              child: Text(
                "2025_fortune".tr,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

/// 列表条目
class _ArrowTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback? onTap;
  const _ArrowTile({required this.icon, required this.title, this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(_UI.radiusXL),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 8),
        leading: Icon(icon, color: const Color(0xFF7C8BA1)),
        title: Text(
          title,
          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
        ),
        trailing: const Icon(Icons.chevron_right_rounded, color: Colors.black26),
        onTap: onTap,
      ),
    );
  }
}