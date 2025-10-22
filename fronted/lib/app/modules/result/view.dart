import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controller.dart';

class ResultPage extends GetView<ResultController> {
  const ResultPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('八字解读'),
        backgroundColor: Color(0xFF8A65F0),
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.share),
            onPressed: controller.shareResult,
          ),
          IconButton(
            icon: Icon(Icons.bookmark_add),
            onPressed: controller.saveToHistory,
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF8A65F0), Colors.white],
            stops: [0.0, 0.2],
          ),
        ),
        child: Obx(
          () => controller.baziResult.value == null
              ? Center(child: Text('暂无数据'))
              : SingleChildScrollView(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    children: [
                      _buildUserInfo(),
                      SizedBox(height: 16),
                      _buildBaziChart(),
                      SizedBox(height: 16),
                      _buildWuxingAnalysis(),
                      SizedBox(height: 16),
                      _buildAiAnalysis(),
                      SizedBox(height: 16),
                      _buildAdviceCards(),
                      SizedBox(height: 20),
                    ],
                  ),
                ),
        ),
      ),
    );
  }

  Widget _buildUserInfo() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          gradient: LinearGradient(
            colors: [Color(0xFF8A65F0), Color(0xFF6B46C1)],
          ),
        ),
        child: Column(
          children: [
            CircleAvatar(
              radius: 30,
              backgroundColor: Colors.white.withValues(alpha: 0.2),
              child: Text(
                controller.userName.value.isNotEmpty 
                    ? controller.userName.value[0] 
                    : '?',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            SizedBox(height: 12),
            Text(
              controller.userName.value,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 8),
            Text(
              '${controller.baziResult.value!.gender == 'male' ? '男' : '女'} • ${controller.baziResult.value!.birthYear}年${controller.baziResult.value!.birthMonth}月${controller.baziResult.value!.birthDay}日',
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withValues(alpha: 0.8),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBaziChart() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.auto_awesome, color: Color(0xFF8A65F0)),
                SizedBox(width: 8),
                Text(
                  '八字命盘',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF8A65F0),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Text('年柱', style: TextStyle(fontSize: 12, color: Colors.grey)),
                      Text('月柱', style: TextStyle(fontSize: 12, color: Colors.grey)),
                      Text('日柱', style: TextStyle(fontSize: 12, color: Colors.grey)),
                      Text('时柱', style: TextStyle(fontSize: 12, color: Colors.grey)),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildPillarCard(controller.baziResult.value!.yearPillar),
                      _buildPillarCard(controller.baziResult.value!.monthPillar),
                      _buildPillarCard(controller.baziResult.value!.dayPillar),
                      _buildPillarCard(controller.baziResult.value!.hourPillar),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPillarCard(String pillar) {
    return Container(
      width: 60,
      height: 80,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Color(0xFF8A65F0)),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: pillar.split('').map((char) => Text(
          char,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Color(0xFF8A65F0),
          ),
        )).toList(),
      ),
    );
  }

  Widget _buildWuxingAnalysis() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.donut_large, color: Color(0xFF8A65F0)),
                SizedBox(width: 8),
                Text(
                  '五行分析',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF8A65F0),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            ...controller.wuxingData.map((data) => _buildWuxingBar(
              data['element'],
              data['score'],
              Color(data['color']),
            )),
            SizedBox(height: 12),
            Container(
              padding: EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(Icons.lightbulb, color: Colors.blue, size: 20),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      '最强元素：${controller.baziResult.value!.strongestElement}，最弱元素：${controller.baziResult.value!.weakestElement}',
                      style: TextStyle(fontSize: 14, color: Colors.blue.shade700),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWuxingBar(String element, int score, Color color) {
    final maxScore = controller.maxScore;
    final percentage = maxScore > 0 ? score / maxScore : 0.0;
    
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          SizedBox(
            width: 20,
            child: Text(
              element,
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Container(
              height: 20,
              decoration: BoxDecoration(
                color: Colors.grey.shade200,
                borderRadius: BorderRadius.circular(10),
              ),
              child: FractionallySizedBox(
                alignment: Alignment.centerLeft,
                widthFactor: percentage,
                child: Container(
                  decoration: BoxDecoration(
                    color: color,
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ),
          ),
          SizedBox(width: 12),
          SizedBox(
            width: 30,
            child: Text(
              score.toString(),
              textAlign: TextAlign.right,
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAiAnalysis() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.psychology, color: Color(0xFF8A65F0)),
                SizedBox(width: 8),
                Text(
                  'AI智能解读',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF8A65F0),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            Obx(
              () => controller.isLoadingAi.value
                  ? Center(
                      child: Column(
                        children: [
                          CircularProgressIndicator(
                            valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF8A65F0)),
                          ),
                          SizedBox(height: 12),
                          Text('AI正在分析中...', style: TextStyle(color: Colors.grey)),
                        ],
                      ),
                    )
                  : Container(
                      padding: EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.grey.shade50,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        controller.aiAnalysis.value,
                        style: TextStyle(
                          fontSize: 14,
                          height: 1.6,
                          color: Colors.grey.shade800,
                        ),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAdviceCards() {
    return Column(
      children: [
        Row(
          children: [
            Expanded(child: _buildAdviceCard('性格特质', Icons.person, Colors.purple)),
            SizedBox(width: 12),
            Expanded(child: _buildAdviceCard('事业建议', Icons.work, Colors.blue)),
          ],
        ),
        SizedBox(height: 12),
        Row(
          children: [
            Expanded(child: _buildAdviceCard('健康提醒', Icons.favorite, Colors.red)),
            SizedBox(width: 12),
            Expanded(child: _buildAdviceCard('感情运势', Icons.favorite_border, Colors.pink)),
          ],
        ),
      ],
    );
  }

  Widget _buildAdviceCard(String title, IconData icon, Color color) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () => Get.snackbar('提示', '$title详细分析功能开发中...'),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            children: [
              Icon(icon, color: color, size: 32),
              SizedBox(height: 8),
              Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: Colors.grey.shade700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
