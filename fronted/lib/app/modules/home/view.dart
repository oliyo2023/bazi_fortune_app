import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../routes/app_pages.dart';

import 'controller.dart';

class HomePage extends GetView<HomeController> {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // 1. 修改背景为渐变色
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFFE6E9F8), Color(0xFFFDFBFF)],
          ),
        ),
        child: SafeArea(
          // 使用SafeArea防止内容被刘海屏遮挡
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              children: [
                SizedBox(height: 16),
                // 2. 添加顶部的搜索栏
                _buildSearchBar(),
                SizedBox(height: 20),
                // 万年历卡片
                GestureDetector(
                  onTap: () => Get.toNamed(Routes.almanacDetail),
                  child: _buildAlmanacCard(),
                ),
                SizedBox(height: 20),
                // 排盘类型切换
                _buildChartTypeTabs(),
                SizedBox(height: 20),
                // 排盘输入区
                _buildInputCard(context),
                SizedBox(height: 20),
                // 底部快捷功能区
                _buildQuickActions(),
              ],
            ),
          ),
        ),
      ),

    );
  }

  // 顶部搜索栏
  Widget _buildSearchBar() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(13),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Row(
        children: [
          Icon(Icons.search, color: Colors.grey),
          SizedBox(width: 8),
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'search_hint'.tr,
                border: InputBorder.none,
                hintStyle: TextStyle(color: Colors.grey),
              ),
            ),
          ),
          SizedBox(width: 8),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.amber.shade100,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.amber),
            ),
            child: Row(
              children: [
                Text(
                  'sign'.tr,
                  style: TextStyle(
                    color: Colors.orange,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'view_tickets'.tr,
                  style: TextStyle(color: Colors.orange.shade700, fontSize: 10),
                ),
              ],
            ),
          ),
          SizedBox(width: 8),
          CircleAvatar(
            backgroundColor: Colors.deepPurple.shade400,
            foregroundColor: Colors.white,
            child: Icon(Icons.add),
          ),
        ],
      ),
    );
  }

  // 万年历卡片
  Widget _buildAlmanacCard() {
    return Card(
      elevation: 2,
      color: Colors.white.withAlpha(204), // 加点透明度，更有层次感
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Container(
        padding: EdgeInsets.all(16),
        child: Obx(
          () => Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    controller.lunarDate.value,
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.red.shade700,
                    ),
                  ),
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [Color(0xFF8A65F0), Color(0xFF6B46C1)],
                      ),
                    ),
                    child: Icon(
                      Icons.wb_sunny,
                      size: 24,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 8),
              Row(
                children: [
                  Text(
                    '${controller.yearZodiac.value} ${controller.solarDate.value}',
                    style: TextStyle(color: Colors.grey.shade700),
                  ),
                  SizedBox(width: 8),
                  Text(
                    controller.weekDay.value,
                    style: TextStyle(color: Colors.grey.shade700),
                  ),
                  SizedBox(width: 8),
                  Text(
                    '第${controller.weekOfYear.value}周',
                    style: TextStyle(color: Colors.grey.shade700),
                  ),
                  Spacer(),
                  Text(
                    controller.solarTerm.value,
                    style: TextStyle(color: Colors.grey.shade700),
                  ),
                ],
              ),
              Divider(height: 24),
              GestureDetector(
                onTap: () => _navigateToAlmanacDetail(0),
                child: Row(
                  children: [
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.green.shade500,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        'suitable'.tr,
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                    ),
                    SizedBox(width: 8),
                    Expanded(
                      child: Obx(
                        () => Text(
                          controller.suitableItems.join(' '),
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(color: Colors.grey.shade800),
                        ),
                      ),
                    ),
                    Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
                  ],
                ),
              ),
              SizedBox(height: 8),
              GestureDetector(
                onTap: () => _navigateToAlmanacDetail(1),
                child: Row(
                  children: [
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.red.shade500,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        'unsuitable'.tr,
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                    ),
                    SizedBox(width: 8),
                    Expanded(
                      child: Obx(
                        () => Text(
                          controller.unsuitableItems.join(' '),
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(color: Colors.grey.shade800),
                        ),
                      ),
                    ),
                    Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // 排盘类型切换
  Widget _buildChartTypeTabs() {
    final chartTypes = ['four_pillar_chart'.tr, 'ziwei_chart'.tr, 'qimen_chart'.tr, 'liuyao_chart'.tr, 'meihua_chart'.tr];
    return SizedBox(
      height: 40,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: chartTypes.length,
        itemBuilder: (context, index) {
          return Obx(() {
            bool isSelected = controller.selectedChartType.value == index;
            return GestureDetector(
              onTap: () => controller.selectChartType(index),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16),
                margin: EdgeInsets.only(right: 10),
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(
                      color: isSelected
                          ? Color(0xFF8A65F0)
                          : Colors.transparent,
                      width: 3,
                    ),
                  ),
                ),
                child: Center(
                  child: Text(
                    chartTypes[index],
                    style: TextStyle(
                      fontSize: isSelected ? 18 : 16,
                      fontWeight: isSelected
                          ? FontWeight.bold
                          : FontWeight.normal,
                      color: isSelected
                          ? Color(0xFF8A65F0)
                          : Colors.grey.shade600,
                    ),
                  ),
                ),
              ),
            );
          });
        },
      ),
    );
  }

  // 排盘输入卡片
  Widget _buildInputCard(BuildContext context) {
    return Card(
      elevation: 2,
      color: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // 性别选择（优化尺寸，使页面更精致）
            Row(
              children: [
                Text('${'gender'.tr}:', style: TextStyle(fontSize: 14, color: Colors.grey.shade700)),
                SizedBox(width: 16),
                Obx(() {
                  final sel = controller.selectedGender.value;
                  Widget genderItem(int index, IconData icon, String label) {
                    final bool active = sel == index;
                    return GestureDetector(
                      onTap: () => controller.selectGender(index),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                        decoration: BoxDecoration(
                          color: active ? const Color(0xFFEDE7FF) : Colors.white,
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(
                            color: active ? const Color(0xFF8A65F0) : Colors.grey.shade300,
                            width: 1.2,
                          ),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              width: 20,
                              height: 20,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: active ? const Color(0xFF8A65F0) : Colors.grey.shade300,
                              ),
                              child: Icon(
                                icon,
                                color: Colors.white,
                                size: 14,
                              ),
                            ),
                            const SizedBox(width: 4),
                            Text(
                              label,
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: active ? FontWeight.w600 : FontWeight.w400,
                                color: active ? const Color(0xFF8A65F0) : Colors.black87,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }

                  return Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      genderItem(0, Icons.male, 'male'.tr),
                      const SizedBox(width: 8),
                      genderItem(1, Icons.female, 'female'.tr),
                    ],
                  );
                }),
              ],
            ),
            Divider(height: 30),
            // 生辰选择
            InkWell(
              onTap: () => controller.pickBirthDateTime(context),
              child: Row(
                children: [
                  Text('${'birth_info'.tr}:', style: TextStyle(fontSize: 14, color: Colors.grey.shade700)),
                  SizedBox(width: 16),
                  Expanded(
                    child: Obx(() {
                      final dt = controller.birthDateTime.value;
                      String text;
                      if (dt == null) {
                        text = 'please_select_birth'.tr;
                      } else {
                        // 直接格式化日期时间字符串，不使用trParams
                        text = '${dt.year}年${dt.month}月${dt.day}日${dt.hour.toString().padLeft(2, '0')}时${dt.minute.toString().padLeft(2, '0')}分';
                      }
                      return Text(
                        text,
                        style: TextStyle(
                          fontSize: 14,
                          color: dt == null ? Colors.grey : Colors.black87,
                        ),
                      );
                    }),
                  ),
                  Icon(Icons.arrow_forward_ios, size: 14, color: Colors.grey),
                ],
              ),
            ),
            Divider(height: 30),
            // 出生地区
            InkWell(
              onTap: () => controller.pickRegion(context),
              child: Row(
                children: [
                  Text('${'birth_region'.tr}:', style: TextStyle(fontSize: 14, color: Colors.grey.shade700)),
                  SizedBox(width: 16),
                  Expanded(
                    child: Obx(() {
                      final region = controller.birthRegion.value;
                      final has = region.isNotEmpty;
                      return Text(
                        has ? region : 'click_to_select'.tr,
                        style: TextStyle(
                          fontSize: 14,
                          color: has ? Colors.black87 : Colors.grey,
                        ),
                      );
                    }),
                  ),
                  const SizedBox(width: 12),
                  Text('${'true_solar_time'.tr}:', style: TextStyle(fontSize: 14, color: Colors.grey.shade700)),
                  const SizedBox(width: 8),
                  Obx(() => Checkbox(
                        value: controller.trueSolarTime.value,
                        onChanged: (v) => controller.trueSolarTime.value = v ?? false,
                        shape: const CircleBorder(),
                        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        visualDensity: VisualDensity.compact,
                        activeColor: Color(0xFF8A65F0),
                      )),
                  const SizedBox(width: 8),
                  Icon(Icons.arrow_forward_ios, size: 14, color: Colors.grey),
                ],
              ),
            ),
            Divider(height: 30),
            // 姓名输入 + 保存开关 + 分组
            Row(
              children: [
                Text('${'name'.tr}:', style: TextStyle(fontSize: 14, color: Colors.grey.shade700)),
                SizedBox(width: 16),
                Expanded(
                  child: TextField(
                    controller: controller.nameController,
                    decoration: InputDecoration(
                      hintText: 'please_enter_name'.tr,
                      hintStyle: TextStyle(fontSize: 14, color: Colors.grey),
                      border: InputBorder.none,
                    ),
                    style: TextStyle(fontSize: 14),
                    onChanged: (v) => controller.name.value = v,
                  ),
                ),
                const SizedBox(width: 8),
                Text('save'.tr, style: TextStyle(fontSize: 14, color: Colors.grey.shade700)),
                const SizedBox(width: 6),
                Obx(() => Switch(
                      value: controller.saveRecord.value,
                      onChanged: (v) => controller.saveRecord.value = v,
                      activeThumbColor: Color(0xFF8A65F0),
                      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    )),
                const SizedBox(width: 8),
                Obx(() => PopupMenuButton<String>(
                      padding: EdgeInsets.zero,
                      onSelected: (v) => controller.groupName.value = v,
                      itemBuilder: (ctx) => [
                        PopupMenuItem(value: 'ungrouped', child: Text('ungrouped'.tr)),
                        PopupMenuItem(value: 'family', child: Text('family'.tr)),
                        PopupMenuItem(value: 'friends', child: Text('friends'.tr)),
                      ],
                      child: Row(
                        children: [
                          Text(controller.groupName.value,
                              style: const TextStyle(color: Color(0xFF8A65F0), fontSize: 14)),
                          const Icon(Icons.arrow_drop_down, color: Color(0xFF8A65F0), size: 20),
                        ],
                      ),
                    )),
              ],
            ),
            SizedBox(height: 20),
            // 马上排盘按钮（提交，不跳转）
            Obx(() => ElevatedButton(
                  onPressed:
                      controller.submitting.value ? null : controller.submitBazi,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF8A65F0),
                    minimumSize: const Size(double.infinity, 50),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(25),
                    ),
                  ),
                  child: Text(
                    controller.submitting.value ? 'submitting'.tr : 'submit_chart'.tr,
                    style: const TextStyle(fontSize: 18, color: Colors.white),
                  ),
                )),
          ],
        ),
      ),
    );
  }

  // 底部快捷功能区
  Widget _buildQuickActions() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        _buildQuickActionButton(icon: Icons.people_alt, label: 'chart_compatibility'.tr),
        _buildQuickActionButton(icon: Icons.calendar_today, label: 'instant_chart'.tr),
        _buildQuickActionButton(icon: Icons.history, label: 'chart_history'.tr),
        _buildQuickActionButton(icon: Icons.extension, label: '五子棋', onTap: () => Get.toNamed(Routes.gomoku)),
      ],
    );
  }

  Widget _buildQuickActionButton({
    required IconData icon,
    required String label,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Icon(icon, color: Color(0xFF8A65F0), size: 30),
          SizedBox(height: 4),
          Text(label),
        ],
      ),
    );
  }

  void _navigateToAlmanacDetail(int type) {
    Get.toNamed(
      Routes.almanacListDetail,
      arguments: {
        'type': type,
        'items': type == 0 ? controller.suitableItems : controller.unsuitableItems,
        'title': type == 0 ? '宜' : '忌',
      },
    );
  }
}
