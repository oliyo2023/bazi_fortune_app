import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'controller.dart';

class AlmanacListDetailPage extends GetView<AlmanacListDetailController> {
  const AlmanacListDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final typeLabel = controller.type.value == 0 ? '宜' : '忌';
          return Text('今日$typeLabel做的事');
        }),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new),
          onPressed: () => Get.back(),
        ),
        elevation: 0,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFFE6E9F8), Color(0xFFFDFBFF)],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            child: Obx(
              () => Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // 标题卡片
                  Card(
                    elevation: 2,
                    color: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12),
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: controller.type.value == 0
                              ? [Color(0xFF4CAF50), Color(0xFF45a049)]
                              : [Color(0xFFF44336), Color(0xFFda190b)],
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            controller.type.value == 0 ? '宜' : '忌',
                            style: const TextStyle(
                              fontSize: 48,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 12),
                          Text(
                            controller.type.value == 0
                                ? '今天适宜做以下事情'
                                : '今天应避免做以下事情',
                            style: const TextStyle(
                              fontSize: 18,
                              color: Colors.white,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '共 ${controller.items.length} 项',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.white.withAlpha(200),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  // 列表项
                  if (controller.items.isEmpty)
                    Center(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 40),
                        child: Text(
                          '暂无数据',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ),
                    )
                  else
                    ..._buildItemsList(),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _buildItemsList() {
    return controller.items.asMap().entries.map((entry) {
      final index = entry.key;
      final item = entry.value;

      return Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: Card(
          elevation: 1,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(
              color: controller.type.value == 0
                  ? Color(0xFF4CAF50).withAlpha(100)
                  : Color(0xFFF44336).withAlpha(100),
              width: 1,
            ),
          ),
          child: Container(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: controller.type.value == 0
                          ? [Color(0xFF4CAF50), Color(0xFF45a049)]
                          : [Color(0xFFF44336), Color(0xFFda190b)],
                    ),
                  ),
                  child: Center(
                    child: Text(
                      '${index + 1}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item,
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        _getDescriptionForItem(item),
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey.shade600,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
                Icon(
                  controller.type.value == 0 ? Icons.check_circle : Icons.cancel,
                  color: controller.type.value == 0
                      ? Color(0xFF4CAF50)
                      : Color(0xFFF44336),
                  size: 24,
                ),
              ],
            ),
          ),
        ),
      );
    }).toList();
  }

  // 获取每个项目的描述信息
  String _getDescriptionForItem(String item) {
    // 这里可以根据实际需求返回每个活动的详细描述
    final descriptions = {
      '嫁娶': '适宜举办婚礼、订婚仪式',
      '纳采': '适宜进行求婚、订婚等仪式',
      '祭祀': '适宜进行祭祀、祈福等宗教活动',
      '祈福': '适宜祈求福气、平安',
      '开光': '适宜为佛像、神像等进行开光仪式',
      '出行': '适宜出远门、旅游',
      '理发': '适宜理发、修剪头发',
      '作灶': '适宜修造灶台',
      '出火': '适宜点火、使用火',
      '拆卸': '适宜拆除、拆卸建筑',
      '修造': '适宜进行维修、改造',
      '动土': '适宜进行建筑施工',
      '进人口': '适宜迎接新成员',
      '入宅': '适宜搬家、新居入住',
      '移徙': '适宜搬迁、移动',
      '安床': '适宜安置床位',
      '挂匾': '适宜悬挂匾额',
      '栽种': '适宜种植、播种',
      '纳畜': '适宜购买畜生',
      '破土': '适宜进行土地开发',
      '安葬': '适宜进行安葬仪式',
      '入殓': '适宜进行入殓仪式',
      '除服': '适宜举办脱服仪式',
      '成服': '适宜穿着新服装',
      '开市': '适宜开市、开业',
      '掘井': '适宜挖井',
      '开渠': '适宜开凿渠道',
      '造桥': '适宜建造桥梁',
      '造船': '适宜建造船只',
      '伐木': '不适宜砍树',
      '行丧': '不适宜出丧',
      '作梁': '不适宜做梁',
    };
    return descriptions[item] ?? '';
  }
}
