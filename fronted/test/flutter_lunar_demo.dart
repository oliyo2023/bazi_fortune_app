// Flutter lunar库集成演示测试
import 'package:flutter/material.dart';
import 'package:lunar/lunar.dart';
import 'package:bazi_fortune_app/app/utils/bazi_calculator.dart';

void main() {
  runApp(LunarDemoApp());
}

class LunarDemoApp extends StatelessWidget {
  const LunarDemoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Lunar Demo',
      theme: ThemeData(
        primarySwatch: Colors.purple,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: LunarDemoPage(),
    );
  }
}

class LunarDemoPage extends StatefulWidget {
  const LunarDemoPage({super.key});

  @override
  _LunarDemoPageState createState() => _LunarDemoPageState();
}

class _LunarDemoPageState extends State<LunarDemoPage> {
  DateTime selectedDate = DateTime(1990, 8, 15);
  TimeOfDay selectedTime = TimeOfDay(hour: 14, minute: 30);
  String result = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter lunar库演示'),
        backgroundColor: Color(0xFF8A65F0),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDemoCard(),
            SizedBox(height: 20),
            _buildResultCard(),
          ],
        ),
      ),
    );
  }

  Widget _buildDemoCard() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'lunar库功能演示',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            
            // 日期选择
            Row(
              children: [
                Expanded(
                  child: Text('日期: ${selectedDate.year}-${selectedDate.month}-${selectedDate.day}'),
                ),
                ElevatedButton(
                  onPressed: () => _selectDate(),
                  child: Text('选择日期'),
                ),
              ],
            ),
            
            SizedBox(height: 12),
            
            // 时间选择
            Row(
              children: [
                Expanded(
                  child: Text('时间: ${selectedTime.hour}:${selectedTime.minute.toString().padLeft(2, '0')}'),
                ),
                ElevatedButton(
                  onPressed: () => _selectTime(),
                  child: Text('选择时间'),
                ),
              ],
            ),
            
            SizedBox(height: 16),
            
            // 测试按钮
            ElevatedButton(
              onPressed: _runDemo,
              child: Text('运行演示'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildResultCard() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '演示结果',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 12),
            Text(
              result.isEmpty ? '点击"运行演示"查看结果' : result,
              style: TextStyle(fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    
    if (picked != null) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  Future<void> _selectTime() async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: selectedTime,
    );
    
    if (picked != null) {
      setState(() {
        selectedTime = picked;
      });
    }
  }

  void _runDemo() {
    setState(() {
      try {
        // 1. 使用lunar库进行基本转换
        final lunar = Lunar.fromDate(selectedDate);
        final solar = lunar.getSolar();
        
        // 2. 使用我们的计算工具
        final baziData = BaziCalculator.calculateBazi(
          selectedDate,
          selectedTime.hour,
          birthMinute: selectedTime.minute,
        );
        
        // 3. 展示结果
        result = '''
🌟 Flutter lunar库集成演示结果：

📅 基本信息：
• 阳历日期: ${selectedDate.year}年${selectedDate.month}月${selectedDate.day}日
• 农历日期: ${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}
• 对应阳历: ${solar.toYmd()}

🐲 八字信息：
• 年柱: ${baziData['yearPillar']} (${baziData['zodiac']})
• 月柱: ${baziData['monthPillar']}
• 日柱: ${baziData['dayPillar']}
• 时柱: ${baziData['hourPillar']}

⏰ 时辰信息：
• 中文时辰: ${baziData['chineseHour']}
• 五行属性: ${baziData['hourElement']}
• 时间范围: ${baziData['hourTimeRange']}

🎊 节日信息：
• 主要节日: ${baziData['festivals'].join(', ')}
• 其他节日: ${baziData['otherFestivals']}

⭐ 五行分析：
• 木: ${baziData['fiveElements']['木']} | 火: ${baziData['fiveElements']['火']}
• 土: ${baziData['fiveElements']['土']} | 金: ${baziData['fiveElements']['金']} | 水: ${baziData['fiveElements']['水']}

✨ 建议：
• 最强五行: ${BaziCalculator.getStrongestElement(baziData['fiveElements'])}
• 最弱五行: ${BaziCalculator.getWeakestElement(baziData['fiveElements'])}
• 建议用神: ${BaziCalculator.getRecommendedElements(baziData['fiveElements']).join(', ')}
        ''';
      } catch (e) {
        result = '演示出错: $e';
      }
    });
  }
}