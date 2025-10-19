import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../core/values/app_colors.dart';

class CategorySelectPage extends StatefulWidget {
  const CategorySelectPage({super.key});

  @override
  State<CategorySelectPage> createState() => _CategorySelectPageState();
}

class _CategorySelectPageState extends State<CategorySelectPage> {
  // 可选项
  final List<String> categories = const [
    '紫微斗数','四柱','堪舆','奇门遁甲','梅花易数','六爻',
    '手相面相','大六壬','数字能量','七政四余','金口诀','塔罗',
    '占星','国学文化','太乙神数','姓名学',
  ];

  // 已选（按选择顺序记录）
  final List<String> selected = [];

  bool get canConfirm => selected.isNotEmpty && selected.length <= 4;

  void toggle(String item) {
    setState(() {
      if (selected.contains(item)) {
        selected.remove(item);
      } else {
        if (selected.length < 4) {
          selected.add(item);
        } else {
          Get.snackbar('提示', '最多选择4个关注领域');
        }
      }
    });
  }

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
        title: const Text('选择你感兴趣的分类',
            style: TextStyle(color: Color(0xFF1A1A1A), fontWeight: FontWeight.w600)),
      ),
      body: Column(
        children: [
          // 标题与提示
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                '请选择术数',
                style: TextStyle(
                  fontSize: 16,
                  color: AppColors.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Wrap(
                spacing: 12,
                runSpacing: 12,
                children: categories.map((c) {
                  final isSelected = selected.contains(c);
                  final isPrimary = isSelected && selected.isNotEmpty && selected.first == c;
                  return _chip(
                    label: c,
                    selected: isSelected,
                    primary: isPrimary,
                    onTap: () => toggle(c),
                  );
                }).toList(),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 4, 16, 12),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                '提示：以第一个选择为主，最多选择4个关注领域',
                style: const TextStyle(fontSize: 12, color: Color(0xFF8A65F0)),
              ),
            ),
          ),
          // 底部确认按钮（渐变、圆角）
          SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              child: GestureDetector(
                onTap: canConfirm
                    ? () {
                        // TODO: 将结果回传或存储
                        Get.back(result: selected);
                      }
                    : null,
                child: Opacity(
                  opacity: canConfirm ? 1 : 0.5,
                  child: Container(
                    height: 48,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(28),
                      gradient: const LinearGradient(
                        colors: [Color(0xFF8A65F0), Color(0xFF6B46C1)],
                      ),
                    ),
                    child: const Text(
                      '确定',
                      style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _chip({required String label, required bool selected, bool primary = false, VoidCallback? onTap}) {
    final borderColor = selected ? AppColors.primary : const Color(0xFFE0E0E0);
    final bgColor = selected ? AppColors.primary.withOpacity(0.12) : Colors.white;
    final textColor = selected ? AppColors.primary : const Color(0xFF333333);

    return GestureDetector(
      onTap: onTap,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: BorderRadius.circular(22),
              border: Border.all(color: borderColor),
            ),
            child: Text(
              label,
              style: TextStyle(fontSize: 14, color: textColor, fontWeight: FontWeight.w500),
            ),
          ),
          if (primary)
            Positioned(
              right: -6,
              top: -6,
              child: Container(
                width: 18,
                height: 18,
                decoration: const BoxDecoration(
                  color: Color(0xFF8A65F0),
                  shape: BoxShape.circle,
                ),
                alignment: Alignment.center,
                child: const Text('1', style: TextStyle(color: Colors.white, fontSize: 11)),
              ),
            ),
        ],
      ),
    );
  }
}