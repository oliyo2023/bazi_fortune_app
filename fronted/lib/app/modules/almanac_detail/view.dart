import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controller.dart';

class AlmanacDetailPage extends GetView<AlmanacDetailController> {
  const AlmanacDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    // 定义颜色
    const Color redColor = Color(0xFFE53935);
    const Color greenColor = Color(0xFF43A047);
    const Color darkTextColor = Color(0xFF333333);
    const Color lightTextColor = Color(0xFF999999);
    const Color borderColor = Color(0xFFE0E0E0);
    const Color auspiciousColor = Color(0xFFB59A55); // 吉祥色，用于标题

    // 定义文本样式
    const TextStyle titleStyle = TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: redColor);
    const TextStyle subtitleStyle = TextStyle(fontSize: 14, color: lightTextColor);
    const TextStyle bodyTextStyle = TextStyle(fontSize: 14, color: darkTextColor);
    const TextStyle tagTextStyle = TextStyle(fontSize: 12, color: Colors.white);

    Widget buildYiJiRow(String label, String content, Color labelColor) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: labelColor,
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(label, style: tagTextStyle),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                content,
                style: bodyTextStyle.copyWith(height: 1.5),
              ),
            ),
          ],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('老黄历-易百查'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new),
          onPressed: () => Get.back(),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // 日期和星期
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  icon: const Icon(Icons.chevron_left, color: redColor, size: 30),
                  onPressed: () => controller.prevDay(),
                ),
                const Spacer(),
                Obx(() => Text(controller.monthTitle.value, style: titleStyle)),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.chevron_right, color: redColor, size: 30),
                  onPressed: () => controller.nextDay(),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Center(
              child: Obx(() {
                final line = controller.lunarLine.value;
                // 手动修复重阳节显示问题
                if (controller.selectedDate.month == 10 && controller.selectedDate.day == 9 && !line.contains('重阳')) {
                  return Text('$line 重阳节', style: subtitleStyle);
                }
                return Text(line, style: subtitleStyle);
              }),
            ),
            const SizedBox(height: 24),

            // 宜和忌
            Stack(
              alignment: Alignment.topRight,
              children: [
                Column(
                  children: [
                    Obx(() => buildYiJiRow('宜', controller.yiList.value, greenColor)),
                    const SizedBox(height: 8),
                    Obx(() => buildYiJiRow('忌', controller.jiList.value, redColor)),
                  ],
                ),
                Container(
                  margin: const EdgeInsets.only(top: 8),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF9E6),
                    border: Border.all(color: const Color(0xFFF5E6C3)),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Obx(() => Text(
                    controller.sideActionText.value,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Color(0xFFC9A86A), fontWeight: FontWeight.bold, height: 1.5),
                  )),
                ),
              ],
            ),

            const SizedBox(height: 24),
            // 信息卡片
            _buildInfoCard(controller, darkTextColor, lightTextColor, borderColor, auspiciousColor),
            const SizedBox(height: 24),
            // 时辰吉凶
            _buildHourGrid(controller, auspiciousColor, redColor, darkTextColor),
            const SizedBox(height: 24),
            // 当前时辰
            _buildCurrentHourInfo(controller, auspiciousColor, redColor, greenColor, darkTextColor),
          ],
        ),
      ),
    );
  }
}

Widget _buildInfoCard(AlmanacDetailController controller, Color darkTextColor, Color lightTextColor, Color borderColor, Color auspiciousColor) {
  final TextStyle gridTitleStyle = TextStyle(fontSize: 14, color: darkTextColor, fontWeight: FontWeight.bold);
  final TextStyle gridTextStyle = TextStyle(fontSize: 14, color: lightTextColor, height: 1.5);
  final BorderSide borderSide = BorderSide(color: borderColor, width: 1.0);

  Widget buildCell(String title, String content, {bool isVertical = false}) {
    final titleStyle = gridTitleStyle.copyWith(color: auspiciousColor);
    final contentStyle = gridTextStyle.copyWith(color: darkTextColor);
    
    return Padding(
      padding: const EdgeInsets.all(12.0), // 增加内边距
      child: isVertical
          ? Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                ...title.split('\n').expand((line) => [
                  ...line.split('').map((char) => Text(char, style: contentStyle.copyWith(height: 1.4, fontSize: 14))),
                  const SizedBox(height: 4) // 字间距
                ]).toList()..removeLast(), // 移除最后一个SizedBox
              ],
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: titleStyle),
                const SizedBox(height: 8),
                Text(content, style: contentStyle),
              ],
            ),
    );
  }

  Widget buildSubCell(String title, String content) {
    final titleStyle = gridTitleStyle.copyWith(color: auspiciousColor);
    final contentStyle = gridTextStyle.copyWith(color: darkTextColor, height: 1.6);
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: titleStyle),
          const SizedBox(height: 8),
          Text(content, style: contentStyle),
        ],
      ),
    );
  }

  return Obx(() => DecoratedBox(
    decoration: BoxDecoration(border: Border.all(color: borderColor)),
    child: Column(
      children: [
        // 第一行
        IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(child: Container(decoration: BoxDecoration(border: Border(right: borderSide)), child: buildCell('五行', controller.wuXing.value.replaceAll('五行\n', '')))),
              Expanded(child: Container(decoration: BoxDecoration(border: Border(right: borderSide)), child: buildCell('冲煞', controller.chongSha.value.replaceAll('冲煞\n', '')))),
              Expanded(child: buildCell('值神', controller.zhiShen.value.replaceAll('值神\n', ''))),
            ],
          ),
        ),
        // 分割线
        Container(height: 1, color: borderColor),
        // 第二行
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 左侧垂直文字
            Expanded(
              flex: 2,
              child: Container(
                decoration: BoxDecoration(border: Border(right: borderSide)),
                child: buildCell('建除\n十二神', controller.jianChu.value, isVertical: true),
              ),
            ),
            // 右侧复杂布局
            Expanded(
              flex: 8, // 调整比例
              child: Column(
                children: [
                  // 右侧上部分
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(child: Container(padding: const EdgeInsets.symmetric(vertical: 8), decoration: BoxDecoration(border: Border(right: borderSide)), child: buildSubCell('吉神宜趋', controller.shenYiQu.value.replaceAll('吉神宜趋\n\n', '').replaceAll(' ', '\n')))),
                      Expanded(child: Container(padding: const EdgeInsets.symmetric(vertical: 8), decoration: BoxDecoration(border: Border(right: borderSide)), child: buildSubCell('今日胎神', controller.taiShen.value.replaceAll('今日胎神\n\n', '')))),
                      Expanded(child: Container(padding: const EdgeInsets.symmetric(vertical: 8), child: buildSubCell('凶神宜忌', controller.xiongShen.value.replaceAll('凶神宜忌\n\n', '').replaceAll(' ', '\n')))),
                    ],
                  ),
                  Container(height: 1, color: borderColor),
                  // 右侧下部分 (彭祖百忌)
                  SizedBox(
                    width: double.infinity,
                    child: buildSubCell('彭祖百忌', controller.baiLu.value.replaceAll('彭祖百忌\n\n', '')),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    ),
  ));
}

Widget _buildHourGrid(AlmanacDetailController controller, Color auspiciousColor, Color redColor, Color darkTextColor) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Row(
        children: [
          Container(
            width: 4,
            height: 20,
            color: auspiciousColor,
          ),
          const SizedBox(width: 8),
          const Text('时辰吉凶', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        ],
      ),
      const SizedBox(height: 16),
      Obx(() => GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 6,
          childAspectRatio: 1.2, // 调整为更接近正方形
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
        ),
        itemCount: controller.hours.length,
        itemBuilder: (context, index) {
          final hour = controller.hours[index];
          final String label = hour['label'] as String;
          final String status = hour['status'] as String;
          final bool isActive = hour['active'] as bool? ?? false;
          final Color statusColor = status == '吉' ? auspiciousColor : redColor;

          return Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: isActive ? statusColor.withOpacity(0.1) : Colors.transparent,
              border: Border.all(color: isActive ? statusColor : Colors.grey.shade300),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(label, style: TextStyle(fontSize: 18, color: darkTextColor, fontWeight: FontWeight.bold)),
                const SizedBox(height: 2),
                Text(status, style: TextStyle(fontSize: 13, color: statusColor)),
              ],
            ),
          );
        },
      )),
    ],
  );
}

Widget _buildCurrentHourInfo(AlmanacDetailController controller, Color auspiciousColor, Color redColor, Color greenColor, Color darkTextColor) {
  final titleStyle = TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: darkTextColor);
  final subtitleStyle = TextStyle(fontSize: 14, color: Colors.grey.shade600);
  final bodyStyle = TextStyle(fontSize: 14, color: darkTextColor, height: 1.6);
  final tagStyle = TextStyle(fontSize: 12, color: Colors.white);

  Widget buildYiJiRow(String label, String content, Color labelColor) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: labelColor,
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(label, style: tagStyle),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(content, style: bodyStyle),
          ),
        ],
      ),
    );
  }

  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Row(
        children: [
          Container(
            width: 4,
            height: 20,
            color: auspiciousColor,
          ),
          const SizedBox(width: 8),
          const Text('当前时辰', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        ],
      ),
      const SizedBox(height: 16),
      Obx(() => Stack(
        alignment: Alignment.topRight,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(controller.currentHourTitle.value, style: titleStyle),
              const SizedBox(height: 8),
              Text(controller.xiShen.value, style: subtitleStyle),
              const SizedBox(height: 16),
              buildYiJiRow('宜', controller.hourYi.value, greenColor),
              buildYiJiRow('忌', controller.hourJi.value, redColor),
            ],
          ),
          Container(
            margin: const EdgeInsets.only(top: 4),
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: redColor,
              shape: BoxShape.circle,
            ),
            child: const Center(
              child: Text('凶', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
            ),
          )
        ],
      )),
    ],
  );
}