import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controller.dart';
import '../../core/values/app_colors.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/language_switcher.dart';
import 'about_view.dart';
import 'delete_account_view.dart';
import 'webview_page.dart';
import 'category_select_view.dart';

class SettingsPage extends GetView<SettingsController> {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final divider = const Divider(height: 1, thickness: 0.5, color: Color(0xFFEDEDED));

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.black87, size: 20),
          onPressed: () => Get.back(),
        ),
        title: Text(
          'settings'.tr,
          style: const TextStyle(color: Color(0xFF1A1A1A), fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
      ),
      backgroundColor: Colors.white,
      body: Column(
        children: [
          const SizedBox(height: 4),
          // 列表
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
               _buildLanguageItem(),
               divider,
               _buildPlainItem(
                 title: 'category_selection'.tr,
                 onTap: () {
                   Get.to(const CategorySelectPage());
                 },
               ),
               divider,
               Obx(() => _buildPlainItem(
                     title: 'edit_identity'.tr,
                     rightText: controller.userRole.value,
                     onTap: () {
                       // TODO: 跳转到身份修改页
                     },
                   )),
               divider,
                _buildPlainItem(
                  title: 'about_us'.tr,
                  onTap: () {
                    Get.to(const AboutPage());
                  },
                ),
                divider,
                _buildPlainItem(
                  title: 'user_agreement'.tr,
                  onTap: () {
                    Get.to(() => WebviewPage(
                      title: 'user_agreement'.tr,
                      url: 'https://www.baidu.com',
                    ));
                  },
                ),
                divider,
                _buildPlainItem(
                  title: 'privacy_policy'.tr,
                  onTap: () {
                    Get.to(() => WebviewPage(
                      title: 'privacy_policy'.tr,
                      url: 'https://www.oschina.net',
                    ));
                  },
                ),
                divider,
                _buildPlainItem(
                  title: 'delete_account'.tr,
                  onTap: () {
                    Get.to(const DeleteAccountPage());
                  },
                ),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
          child: CustomButton(
            text: 'logout'.tr,
            onPressed: controller.logout,
            backgroundColor: AppColors.primary,
            textColor: Colors.white,
            width: double.infinity,
            height: 48,
            borderRadius: BorderRadius.circular(24),
          ),
        ),
      ),
    );
  }

  Widget _buildPlainItem({
    required String title,
    String? rightText,
    VoidCallback? onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Container(
        height: 52,
        alignment: Alignment.centerLeft,
        child: Row(
          children: [
            Expanded(
              child: Text(
                title,
                style: const TextStyle(fontSize: 16, color: Color(0xFF1F1F1F)),
              ),
            ),
            if (rightText != null)
              Padding(
                padding: const EdgeInsets.only(right: 6),
                child: Text(
                  rightText,
                  style: const TextStyle(fontSize: 14, color: Color(0xFFB3B3B3)),
                ),
              ),
            const Icon(Icons.arrow_forward_ios, size: 16, color: Color(0xFFBDBDBD)),
          ],
        ),
      ),
    );
  }

  // 构建语言切换项
  Widget _buildLanguageItem() {
    return Container(
      height: 52,
      alignment: Alignment.centerLeft,
      child: Row(
        children: [
          Text(
            'language'.tr,
            style: const TextStyle(fontSize: 16, color: Color(0xFF1F1F1F)),
          ),
          const Spacer(),
          const LanguageSwitcher(),
        ],
      ),
    );
  }
}