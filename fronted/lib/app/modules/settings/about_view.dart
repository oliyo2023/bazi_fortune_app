import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../core/values/app_colors.dart';
import 'controller.dart';

class AboutPage extends GetView<SettingsController> {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.black87, size: 20),
          onPressed: () => Get.back(),
        ),
        centerTitle: true,
        title: const Text('关于我们', style: TextStyle(color: Color(0xFF1A1A1A), fontWeight: FontWeight.w600)),
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        children: [
          const SizedBox(height: 12),
          // Logo
          Center(
            child: Container(
              width: 72,
              height: 72,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                color: AppColors.secondary,
                image: const DecorationImage(
                  image: AssetImage('assets/images/splash_screen.png'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
          const SizedBox(height: 10),
          // 版本号
          Obx(() => Center(
                child: Text(
                  '版本号：${controller.appVersion.value}',
                  style: const TextStyle(fontSize: 14, color: Color(0xFF999999)),
                ),
              )),
          const SizedBox(height: 12),
          // 公司介绍
          Container(
            padding: const EdgeInsets.symmetric(vertical: 12),
            decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Color(0xFFF0F0F0), width: 8)),
            ),
            child: const Text(
              '北京流年观科技有限公司成立于2022年4月19日，平台定位：流年观智库AI互动问答平台，公司主要为广大易学爱好者提供排盘工具、题库练习、查阅知识宝典以及学习过程中遇到的问题解答服务。',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 14, height: 1.6, color: Color(0xFF666666)),
            ),
          ),
          // 信息项
          _infoItem('联系电话', '17610822786'),
          _divider(),
          _infoItem('商务合作', 'service@liuNianGuan.com'),
          _divider(),
          _infoItem('官方网站', 'www.liuNianGuan.com'),
          _divider(),
          _updateItem(),
          const SizedBox(height: 60),
          // 版权
          const Center(
            child: Text('版权所有', style: TextStyle(color: Color(0xFFB3B3B3), fontSize: 12)),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _divider() => const Divider(height: 1, thickness: 0.5, color: Color(0xFFEDEDED));

  Widget _row(String left, Widget right) {
    return Container(
      height: 52,
      alignment: Alignment.centerLeft,
      child: Row(
        children: [
          Expanded(
            child: Text(left, style: const TextStyle(fontSize: 16, color: Color(0xFF1F1F1F))),
          ),
          right,
        ],
      ),
    );
  }

  Widget _infoItem(String left, String right) {
    return _row(
      left,
      Text(right, style: const TextStyle(fontSize: 14, color: Color(0xFF666666))),
    );
  }

  Widget _updateItem() {
    return InkWell(
      onTap: () {
        // TODO: 触发版本检查逻辑
        Get.snackbar('提示', '已是最新版');
      },
      child: _row(
        '版本更新',
        const Text(
          '升级为最新版',
          style: TextStyle(fontSize: 14, color: Color(0xFF27A6FF)),
        ),
      ),
    );
  }
}