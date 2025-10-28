import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../utils/bazi_calculator.dart';

/// 增强的八字预览卡片 - 展示lunar库的强大功能
class EnhancedBaziPreviewCard extends StatelessWidget {
  final DateTime birthDate;
  final TimeOfDay birthTime;
  final bool isLunarCalendar;

  const EnhancedBaziPreviewCard({
    Key? key,
    required this.birthDate,
    required this.birthTime,
    this.isLunarCalendar = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // 使用lunar库计算完整的八字信息
    final baziData = BaziCalculator.calculateBazi(
      birthDate,
      birthTime.hour,
      birthMinute: birthTime.minute,
    );

    return Card(
      elevation: 8,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 标题
            Row(
              children: [
                Icon(Icons.auto_awesome, color: Color(0xFF8A65F0)),
                SizedBox(width: 8),
                Text(
                  '八字预览',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    color: Color(0xFF8A65F0),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),

            // 日期信息
            _buildDateInfoSection(baziData),
            Divider(),

            // 八字四柱
            _buildBaziPillarsSection(baziData),
            Divider(),

            // 生肖和节日
            _buildZodiacFestivalsSection(baziData),
            Divider(),

            // 时辰信息
            _buildHourInfoSection(baziData),
            Divider(),

            // 五行分析
            _buildFiveElementsSection(baziData),
          ],
        ),
      ),
    );
  }

  Widget _buildDateInfoSection(Map<String, dynamic> baziData) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '日期信息',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: _buildInfoTile('阳历', baziData['solarDate']),
            ),
            SizedBox(width: 12),
            Expanded(
              child: _buildInfoTile('农历', baziData['lunarDate']),
            ),
          ],
        ),
        if (baziData['isLeapMonth'] == true) ...[
          SizedBox(height: 8),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.orange.shade100,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              '闰月',
              style: TextStyle(
                color: Colors.orange.shade800,
                fontSize: 12,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildBaziPillarsSection(Map<String, dynamic> baziData) {
    final pillars = [
      {'label': '年柱', 'value': baziData['yearPillar'], 'subtitle': baziData['yearPillarExact']},
      {'label': '月柱', 'value': baziData['monthPillar'], 'subtitle': baziData['monthPillarExact']},
      {'label': '日柱', 'value': baziData['dayPillar'], 'subtitle': baziData['dayPillarExact']},
      {'label': '时柱', 'value': baziData['hourPillar'], 'subtitle': baziData['chineseHour']},
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '八字四柱',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        SizedBox(height: 8),
        ...pillars.map((pillar) => Padding(
          padding: EdgeInsets.symmetric(vertical: 4),
          child: Row(
            children: [
              SizedBox(
                width: 50,
                child: Text(
                  pillar['label']!,
                  style: TextStyle(fontWeight: FontWeight.w500),
                ),
              ),
              Expanded(
                child: Text(
                  pillar['value']!,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF8A65F0),
                  ),
                ),
              ),
              if (pillar['subtitle'] != pillar['value'])
                Text(
                  pillar['subtitle']!,
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey.shade600,
                  ),
                ),
            ],
          ),
        )),
      ],
    );
  }

  Widget _buildZodiacFestivalsSection(Map<String, dynamic> baziData) {
    final festivals = baziData['festivals'] as List<String>;
    final otherFestivals = baziData['otherFestivals'] as String;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '生肖与节日',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        SizedBox(height: 8),
        Row(
          children: [
            Icon(Icons.pets, color: Color(0xFF8A65F0)),
            SizedBox(width: 8),
            Text(
              '生肖: ${baziData['zodiac']}',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
            ),
          ],
        ),
        if (festivals.isNotEmpty) ...[
          SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.celebration, color: Colors.orange),
              SizedBox(width: 8),
              Text(
                '节日: ${festivals.join(", ")}',
                style: TextStyle(fontSize: 14),
              ),
            ],
          ),
        ],
        if (otherFestivals.isNotEmpty) ...[
          SizedBox(height: 4),
          Text(
            '其他: $otherFestivals',
            style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
          ),
        ],
      ],
    );
  }

  Widget _buildHourInfoSection(Map<String, dynamic> baziData) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '时辰信息',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: _buildInfoTile('时辰', baziData['chineseHour']),
            ),
            SizedBox(width: 12),
            Expanded(
              child: _buildInfoTile('五行', baziData['hourElement']),
            ),
            SizedBox(width: 12),
            Expanded(
              child: _buildInfoTile('时间', baziData['hourTimeRange']),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildFiveElementsSection(Map<String, dynamic> baziData) {
    final fiveElements = baziData['fiveElements'] as Map<String, int>;
    final strongest = BaziCalculator.getStrongestElement(fiveElements);
    final weakest = BaziCalculator.getWeakestElement(fiveElements);
    final recommendations = BaziCalculator.getRecommendedElements(fiveElements);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '五行分析',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        SizedBox(height: 8),
        
        // 五行分布
        ...fiveElements.entries.map((entry) {
          final color = _getElementColor(entry.key);
          final percentage = (entry.value / 8 * 100).round(); // 假设最多8个五行
            
          return Padding(
            padding: EdgeInsets.symmetric(vertical: 2),
            child: Row(
              children: [
                SizedBox(
                  width: 30,
                  child: Text(entry.key),
                ),
                Expanded(
                  child: Stack(
                    children: [
                      Container(
                        height: 20,
                        decoration: BoxDecoration(
                          color: Colors.grey.shade200,
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      FractionallySizedBox(
                        widthFactor: percentage / 100,
                        child: Container(
                          height: 20,
                          decoration: BoxDecoration(
                            color: color,
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(width: 8),
                Text(
                  '${entry.value}',
                  style: TextStyle(fontWeight: FontWeight.w500),
                ),
              ],
            ),
          );
        }),
        
        SizedBox(height: 12),
        
        // 分析结果
        Container(
          padding: EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.blue.shade50,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.blue.shade200),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '分析结果',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Colors.blue.shade800,
                ),
              ),
              SizedBox(height: 4),
              Text(
                '最强: $strongest | 最弱: $weakest',
                style: TextStyle(fontSize: 12),
              ),
              if (recommendations.isNotEmpty)
                Text(
                  '建议: ${recommendations.join(", ")}',
                  style: TextStyle(fontSize: 12),
                ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInfoTile(String label, String value) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey.shade600,
            ),
          ),
          Text(
            value,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Color _getElementColor(String element) {
    switch (element) {
      case '木':
        return Colors.green.shade400;
      case '火':
        return Colors.red.shade400;
      case '土':
        return Colors.orange.shade400;
      case '金':
        return Colors.yellow.shade600;
      case '水':
        return Colors.blue.shade400;
      default:
        return Colors.grey.shade400;
    }
  }
}