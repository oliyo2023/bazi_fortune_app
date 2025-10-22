import 'package:flutter/material.dart';
import 'dart:math';
import '../models/astrology_model.dart';
import '../models/astrology_constants.dart';

class AstrologyChartPainter extends CustomPainter {
  final AstrologyChart chart;
  final int? selectedHouse;
  final Color primaryColor;
  final Color secondaryColor;

  AstrologyChartPainter({
    required this.chart,
    this.selectedHouse,
    this.primaryColor = const Color(0xFF667EEA),
    this.secondaryColor = const Color(0xFF764BA2),
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = min(size.width, size.height) / 2 * 0.85;

    // 绘制背景圆形
    _drawBackground(canvas, center, radius);

    // 绘制12宫位圆环
    _drawHouses(canvas, center, radius);

    // 绘制星座符号
    _drawZodiacSigns(canvas, center, radius);

    // 绘制行星
    _drawPlanets(canvas, center, radius);

    // 绘制中心信息
    _drawCenterInfo(canvas, center);
  }

  // 绘制背景
  void _drawBackground(Canvas canvas, Offset center, double radius) {
    final paint = Paint()
      ..color = Colors.white.withOpacity(0.95)
      ..style = PaintingStyle.fill;

    canvas.drawCircle(center, radius, paint);

    // 绘制外圆框
    final borderPaint = Paint()
      ..color = primaryColor.withOpacity(0.3)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    canvas.drawCircle(center, radius, borderPaint);
  }

  // 绘制12宫位
  void _drawHouses(Canvas canvas, Offset center, double radius) {
    final outerRadius = radius * 0.95;
    final innerRadius = radius * 0.6;
    final mid = (outerRadius + innerRadius) / 2;

    // 绘制宫位分隔线
    for (int i = 0; i < 12; i++) {
      final angle = (i * 360 / 12 - 90) * pi / 180;
      final start = Offset(
        center.dx + innerRadius * cos(angle),
        center.dy + innerRadius * sin(angle),
      );
      final end = Offset(
        center.dx + outerRadius * cos(angle),
        center.dy + outerRadius * sin(angle),
      );

      final paint = Paint()
        ..color = primaryColor.withOpacity(0.2)
        ..strokeWidth = 1;

      canvas.drawLine(start, end, paint);
    }

    // 绘制宫位数字和含义
    for (int i = 0; i < 12; i++) {
      final angle = (i * 360 / 12 - 90 + 15) * pi / 180;
      final offset = Offset(
        center.dx + mid * cos(angle),
        center.dy + mid * sin(angle),
      );

      // 绘制宫位号
      final textPainter = TextPainter(
        text: TextSpan(
          text: '${i + 1}',
          style: TextStyle(
            color: selectedHouse == i + 1 ? primaryColor : Colors.grey[600],
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        textDirection: TextDirection.ltr,
      );

      textPainter.layout();
      textPainter.paint(
        canvas,
        offset - Offset(textPainter.width / 2, textPainter.height / 2),
      );
    }
  }

  // 绘制星座符号
  void _drawZodiacSigns(Canvas canvas, Offset center, double radius) {
    final symbolRadius = radius * 0.45;

    for (int i = 0; i < 12; i++) {
      final angle = (i * 360 / 12 - 90) * pi / 180;
      final offset = Offset(
        center.dx + symbolRadius * cos(angle),
        center.dy + symbolRadius * sin(angle),
      );

      final zodiac = AstrologyConstants.zodiacSigns[i];

      // 绘制星座符号背景圆
      final bgPaint = Paint()
        ..color = selectedHouse == i + 1
            ? primaryColor.withOpacity(0.3)
            : Colors.grey.withOpacity(0.1)
        ..style = PaintingStyle.fill;

      canvas.drawCircle(offset, 16, bgPaint);

      // 绘制星座符号
      final textPainter = TextPainter(
        text: TextSpan(
          text: zodiac.symbol,
          style: const TextStyle(
            color: Colors.black87,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        textDirection: TextDirection.ltr,
      );

      textPainter.layout();
      textPainter.paint(
        canvas,
        offset - Offset(textPainter.width / 2, textPainter.height / 2),
      );
    }
  }

  // 绘制行星
  void _drawPlanets(Canvas canvas, Offset center, double radius) {
    final planetRadius = radius * 0.3;

    for (int i = 0; i < chart.planets.length; i++) {
      final planet = chart.planets[i];
      final angle = (planet.position - 90) * pi / 180;
      final offset = Offset(
        center.dx + planetRadius * cos(angle),
        center.dy + planetRadius * sin(angle),
      );

      // 绘制行星背景圆
      final paint = Paint()
        ..color = _getPlanetColor(i)
        ..style = PaintingStyle.fill;

      canvas.drawCircle(offset, 10, paint);

      // 绘制行星符号
      final textPainter = TextPainter(
        text: TextSpan(
          text: planet.symbol,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 12,
            fontWeight: FontWeight.bold,
          ),
        ),
        textDirection: TextDirection.ltr,
      );

      textPainter.layout();
      textPainter.paint(
        canvas,
        offset - Offset(textPainter.width / 2, textPainter.height / 2),
      );

      // 绘制行星名称提示
      final nameText = TextPainter(
        text: TextSpan(
          text: planet.cnName,
          style: const TextStyle(
            color: Colors.black54,
            fontSize: 10,
          ),
        ),
        textDirection: TextDirection.ltr,
      );

      nameText.layout();
      nameText.paint(
        canvas,
        offset + Offset(12, -8),
      );
    }
  }

  // 绘制中心信息（太阳、月亮、上升星座）
  void _drawCenterInfo(Canvas canvas, Offset center) {

    // 太阳
    _drawCenterItem(
      canvas,
      center + Offset(-40, -40),
      '☉',
      chart.sunSign,
      Colors.orange,
    );

    // 月亮
    _drawCenterItem(
      canvas,
      center + Offset(40, -40),
      '☽',
      chart.moonSign,
      Colors.grey[400]!,
    );

    // 上升星座
    _drawCenterItem(
      canvas,
      center + Offset(0, 40),
      '↑',
      chart.risingSign,
      primaryColor,
    );
  }

  // 绘制中心项目
  void _drawCenterItem(
    Canvas canvas,
    Offset offset,
    String symbol,
    String sign,
    Color color,
  ) {
    // 背景圆
    final bgPaint = Paint()
      ..color = color.withOpacity(0.2)
      ..style = PaintingStyle.fill;

    canvas.drawCircle(offset, 18, bgPaint);

    // 符号
    final symbolText = TextPainter(
      text: TextSpan(
        text: symbol,
        style: TextStyle(
          color: color,
          fontSize: 14,
          fontWeight: FontWeight.bold,
        ),
      ),
      textDirection: TextDirection.ltr,
    );

    symbolText.layout();
    symbolText.paint(
      canvas,
      offset - Offset(symbolText.width / 2, symbolText.height / 2),
    );

    // 星座名称
    final nameText = TextPainter(
      text: TextSpan(
        text: sign,
        style: const TextStyle(
          color: Colors.black54,
          fontSize: 9,
        ),
      ),
      textDirection: TextDirection.ltr,
    );

    nameText.layout();
    nameText.paint(
      canvas,
      offset + Offset(-nameText.width / 2, 20),
    );
  }

  // 获取行星颜色
  Color _getPlanetColor(int index) {
    const colors = [
      Color(0xFFFFB74D), // 太阳-橙色
      Color(0xFFB39DDB), // 月亮-紫色
      Color(0xFF64B5F6), // 水星-蓝色
      Color(0xFFEF9A9A), // 金星-红色
      Color(0xFFFF8A65), // 火星-深橙色
      Color(0xFFFFD54F), // 木星-黄色
      Color(0xFF90CAF9), // 土星-浅蓝色
      Color(0xFF80DEEA), // 天王星-青色
      Color(0xFF81C784), // 海王星-绿色
      Color(0xFFA1887F), // 冥王星-棕色
    ];

    return colors[index % colors.length];
  }

  @override
  bool shouldRepaint(AstrologyChartPainter oldDelegate) {
    return oldDelegate.chart != chart ||
        oldDelegate.selectedHouse != selectedHouse;
  }
}
