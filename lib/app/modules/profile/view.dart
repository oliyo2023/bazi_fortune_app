import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controller.dart';

class ProfilePage extends GetView<ProfileController> {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('我的'),
        backgroundColor: Color(0xFF8A65F0),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF8A65F0), Colors.white],
            stops: [0.0, 0.3],
          ),
        ),
        child: Obx(
          () => controller.isLoggedIn
              ? _buildLoggedInView()
              : _buildLoginPrompt(),
        ),
      ),
    );
  }

  Widget _buildLoggedInView() {
    return SingleChildScrollView(
      child: Column(
        children: [
          SizedBox(height: 20),
          _buildUserInfo(),
          SizedBox(height: 20),
          _buildMenuItems(),
          SizedBox(height: 20),
          _buildBaziHistory(),
        ],
      ),
    );
  }

  Widget _buildLoginPrompt() {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.person_outline,
              size: 80,
              color: Colors.white.withOpacity(0.8),
            ),
            SizedBox(height: 24),
            Text(
              '登录后查看更多功能',
              style: TextStyle(
                fontSize: 20,
                color: Colors.white,
                fontWeight: FontWeight.w500,
              ),
            ),
            SizedBox(height: 16),
            Text(
              '登录后可以保存八字记录\n查看历史分析结果',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withOpacity(0.8),
              ),
            ),
            SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: controller.goToLogin,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Color(0xFF8A65F0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                ),
                child: Text(
                  '立即登录',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildUserInfo() {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Row(
          children: [
            CircleAvatar(
              radius: 30,
              backgroundColor: Color(0xFF8A65F0),
              child: Text(
                controller.userName.isNotEmpty ? controller.userName[0] : 'U',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    controller.userName,
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    controller.userEmail,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey.shade600,
                    ),
                  ),
                ],
              ),
            ),
            Icon(Icons.arrow_forward_ios, color: Colors.grey),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuItems() {
    final menuItems = [
      {'icon': Icons.history, 'title': '排盘记录', 'onTap': () {}},
      {'icon': Icons.favorite, 'title': '我的收藏', 'onTap': () {}},
      {'icon': Icons.settings, 'title': '设置', 'onTap': () {}},
      {'icon': Icons.help, 'title': '帮助与反馈', 'onTap': () {}},
      {'icon': Icons.info, 'title': '关于我们', 'onTap': () {}},
    ];

    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Column(
        children: menuItems.map((item) => _buildMenuItem(
          icon: item['icon'] as IconData,
          title: item['title'] as String,
          onTap: item['onTap'] as VoidCallback,
        )).toList(),
      ),
    );
  }

  Widget _buildMenuItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(icon, color: Color(0xFF8A65F0)),
      title: Text(title),
      trailing: Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
      onTap: onTap,
    );
  }

  Widget _buildBaziHistory() {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.auto_awesome, color: Color(0xFF8A65F0)),
                SizedBox(width: 8),
                Text(
                  '最近排盘',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Spacer(),
                TextButton(
                  onPressed: controller.loadBaziHistory,
                  child: Text('刷新'),
                ),
              ],
            ),
            SizedBox(height: 12),
            Obx(
              () => controller.isLoading.value
                  ? Center(child: CircularProgressIndicator())
                  : controller.baziHistory.isEmpty
                      ? Center(
                          child: Padding(
                            padding: EdgeInsets.all(20),
                            child: Text(
                              '暂无排盘记录',
                              style: TextStyle(color: Colors.grey),
                            ),
                          ),
                        )
                      : Column(
                          children: controller.baziHistory
                              .take(3)
                              .map((bazi) => _buildBaziHistoryItem(bazi))
                              .toList(),
                        ),
            ),
            if (controller.baziHistory.length > 3)
              Center(
                child: TextButton(
                  onPressed: () => Get.snackbar('提示', '查看更多功能开发中...'),
                  child: Text('查看更多'),
                ),
              ),
            SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: controller.logout,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red.shade400,
                  foregroundColor: Colors.white,
                ),
                child: Text('退出登录'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBaziHistoryItem(dynamic bazi) {
    return ListTile(
      leading: CircleAvatar(
        backgroundColor: Color(0xFF8A65F0).withOpacity(0.1),
        child: Icon(Icons.auto_awesome, color: Color(0xFF8A65F0), size: 20),
      ),
      title: Text(bazi.fullBazi ?? '八字记录'),
      subtitle: Text(
        '${bazi.birthYear}年${bazi.birthMonth}月${bazi.birthDay}日',
        style: TextStyle(fontSize: 12),
      ),
      trailing: Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
      onTap: () => controller.viewBaziDetail(bazi),
    );
  }
}