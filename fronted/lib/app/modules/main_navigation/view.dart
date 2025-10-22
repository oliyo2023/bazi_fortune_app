import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../home/view.dart';
import '../profile/view.dart';
import '../messages/view.dart';
import 'controller.dart';

class MainNavigationPage extends GetView<MainNavigationController> {
  const MainNavigationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Obx(() => _getPage(controller.currentIndex.value)),
      bottomNavigationBar: Obx(
        () => BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          currentIndex: controller.currentIndex.value,
          onTap: controller.changeTab,
          selectedItemColor: Color(0xFF8A65F0),
          unselectedItemColor: Colors.grey,
          selectedLabelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
          unselectedLabelStyle: TextStyle(fontSize: 12),
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_outlined),
              activeIcon: Icon(Icons.home),
              label: 'home'.tr,
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.show_chart_outlined),
              activeIcon: Icon(Icons.show_chart),
              label: 'fortune'.tr,
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.people_outline),
              activeIcon: Icon(Icons.people),
              label: 'masters_consultation'.tr,
            ),
            BottomNavigationBarItem(
              icon: _messageIcon(false),
              activeIcon: _messageIcon(true),
              label: 'messages'.tr,
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_outline),
              activeIcon: Icon(Icons.person),
              label: 'profile'.tr,
            ),
          ],
        ),
      ),
    );
  }

  Widget _getPage(int index) {
    switch (index) {
      case 0:
        return HomePage();
      case 1:
        return _buildComingSoonPage('fortune'.tr, Icons.show_chart);
      case 2:
        return _buildComingSoonPage('masters_consultation'.tr, Icons.people);
      case 3:
        return const MessagesPage();
      case 4:
        return ProfilePage();
      default:
        return HomePage();
    }
  }

  Widget _buildComingSoonPage(String title, IconData icon) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
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
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 80,
                color: Colors.white.withValues(alpha: 0.8),
              ),
              SizedBox(height: 24),
              Text(
                'feature_coming_soon'.trParams({'feature': title}),
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 16),
              Text(
                'coming_soon'.tr,
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.white.withValues(alpha: 0.8),
                ),
              ),
              SizedBox(height: 32),
              ElevatedButton(
                onPressed: () => controller.goToHome(),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Color(0xFF8A65F0),
                  padding: EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                ),
                child: Text(
                  'back_to_home'.tr,
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _messageIcon(bool active) {
    final count = controller.messageUnread.value;
    final baseIcon = Icon(
      active ? Icons.message : Icons.message_outlined,
    );
    if (count <= 0) return baseIcon;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        baseIcon,
        Positioned(
          top: -2,
          right: -10,
          child: Container(
            constraints: const BoxConstraints(minWidth: 18, minHeight: 18),
            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
            decoration: BoxDecoration(
              color: const Color(0xFFFF3B30),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: Colors.white, width: 2),
            ),
            child: Text(
              count > 99 ? '99+' : '$count',
              style: const TextStyle(color: Colors.white, fontSize: 11),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ],
    );
  }
}