import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lunar/lunar.dart';

class BaziTimePickResult {
  final DateTime dateTime; // 返回公历 DateTime（用于后端）
  final bool isLunar;      // 是否按农历选择的
  BaziTimePickResult({required this.dateTime, required this.isLunar});
}

// 弹出底部时辰选择器：四柱 / 公历 / 农历 / 输入
Future<BaziTimePickResult?> showBaziTimePickerBottomSheet(
  BuildContext context, {
  DateTime? initial,
  bool initialLunar = false,
  int startYear = 1900,
  int endYear = 2100,
}) {
  return showModalBottomSheet<BaziTimePickResult>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
    ),
    builder: (ctx) => _BaziTimePickerSheet(
      initial: initial ?? DateTime.now(),
      initialLunar: initialLunar,
      startYear: startYear,
      endYear: endYear,
    ),
  );
}

class _BaziTimePickerSheet extends StatefulWidget {
  final DateTime initial;
  final bool initialLunar;
  final int startYear;
  final int endYear;
  const _BaziTimePickerSheet({
    required this.initial,
    required this.initialLunar,
    required this.startYear,
    required this.endYear,
  });
  @override
  State<_BaziTimePickerSheet> createState() => _BaziTimePickerSheetState();
}

class _BaziTimePickerSheetState extends State<_BaziTimePickerSheet> {
  // 0: 四柱 1: 公历 2: 农历 3: 输入
  int _tab = 1;
  late DateTime _dt; // 内部统一以公历驱动
  bool _isLunar = false;

  // 时辰
  static const List<String> _zhi = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  static const List<int> _zhiStartHour = [23,1,3,5,7,9,11,13,15,17,19,21];

  @override
  void initState() {
    super.initState();
    _dt = widget.initial;
    _isLunar = widget.initialLunar;
    _tab = _isLunar ? 2 : 1;
  }

  List<int> _daysInMonth(int year, int month) {
    final lastDay = DateTime(year, month + 1, 0).day;
    return List<int>.generate(lastDay, (i) => i + 1);
  }

  String _lunarYearLabel(DateTime solar) {
    final l = Lunar.fromDate(solar);
    return '${l.getYearInChinese()}年';
  }

  String _lunarMonthLabel(DateTime solar) {
    final l = Lunar.fromDate(solar);
    // lunar 包的 getMonthInChinese 通常已包含闰月标识，这里直接使用
    return '${l.getMonthInChinese()}月';
  }

  String _lunarDayLabel(DateTime solar) {
    final l = Lunar.fromDate(solar);
    return l.getDayInChinese();
  }

  // 根据分钟对齐到整双小时的起始
  int _alignToShichenStartHour(DateTime dt) {
    // 直接用 floor 到对应时辰起始，分钟忽略（对齐）
    final h = dt.hour;
    // 找到最近的时辰起始（每两个小时一个）
    if (h == 23) return 23;
    for (int i = 0; i < _zhiStartHour.length; i++) {
      final sh = _zhiStartHour[i];
      final next = _zhiStartHour[(i + 1) % _zhiStartHour.length];
      if (sh == 23) continue;
      if (h >= sh && h < next) return sh;
    }
    return 23; // 0点也落在子时区间（23-0:59）
  }

  int _hourToZhiIndex(int hour) {
    // 将 23,1,3,... 映射为 0..11
    for (int i = 0; i < _zhiStartHour.length; i++) {
      final sh = _zhiStartHour[i];
      final next = _zhiStartHour[(i + 1) % _zhiStartHour.length];
      if (sh == 23) {
        if (hour >= 23 || hour < 1) return 0;
      } else {
        if (hour >= sh && hour < next) return i;
      }
    }
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final years = List<int>.generate(widget.endYear - widget.startYear + 1, (i) => widget.startYear + i);
    final months = List<int>.generate(12, (i) => i + 1);
    final days = _daysInMonth(_dt.year, _dt.month);
    final hours = List<int>.generate(24, (i) => i);
    final minutes = List<int>.generate(60, (i) => i);

    int yearIndex = _dt.year - widget.startYear;
    int monthIndex = _dt.month - 1;
    int dayIndex = (_dt.day - 1).clamp(0, days.length - 1);
    int hourIndex = _dt.hour;
    int minuteIndex = _dt.minute;

    Widget buildWheel<T>({
      required List<T> items,
      required int initialIndex,
      required ValueChanged<int> onSelected,
      double width = 70,
      String Function(T)? label,
    }) {
      return SizedBox(
        width: width,
        height: 200,
        child: CupertinoPicker(
          scrollController: FixedExtentScrollController(initialItem: initialIndex),
          itemExtent: 36,
          magnification: 1.05,
          useMagnifier: true,
          onSelectedItemChanged: onSelected,
          children: items.map((e) {
            final text = label != null ? label(e) : e.toString();
            return Center(child: Text(text, style: const TextStyle(fontSize: 16)));
          }).toList(),
        ),
      );
    }

    Widget buildHeader() {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        child: Row(
          children: [
            Expanded(
              child: TextButton(
                onPressed: () => Navigator.of(context).pop(null),
                child: Text('cancel'.tr, style: const TextStyle(color: Color(0xFF7C3AED), fontSize: 14)),
              ),
            ),
            Expanded(
              flex: 3,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFF5F3FF),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _tabChip('four_pillar_chart'.tr, 0),
                    const SizedBox(width: 4),
                    _tabChip('solar_birthday'.tr, 1),
                    const SizedBox(width: 4),
                    _tabChip('lunar_birthday'.tr, 2),
                    const SizedBox(width: 4),
                    _tabChip('input'.tr, 3),
                  ],
                ),
              ),
            ),
            Expanded(
              child: TextButton(
                onPressed: () {
                  // 如果是四柱页签，将小时对齐到时辰起始，分钟置0
                  DateTime out = _dt;
                  if (_tab == 0) {
                    final h = _alignToShichenStartHour(_dt);
                    out = DateTime(_dt.year, _dt.month, _dt.day, h, 0);
                  }
                  Navigator.of(context).pop(BaziTimePickResult(
                    dateTime: out,
                    isLunar: _tab == 2,
                  ));
                },
                child: Text('confirm'.tr, style: const TextStyle(color: Color(0xFF7C3AED), fontSize: 14)),
              ),
            ),
          ],
        ),
      );
    }

    Widget buildSolarWheels({bool lunarLabel = false}) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            buildWheel<int>(
              items: years,
              initialIndex: yearIndex,
              width: 90,
              label: (y) => lunarLabel ? _lunarYearLabel(DateTime(y, _dt.month, _dt.day)) : '$y年',
              onSelected: (i) {
                setState(() {
                  final newYear = years[i];
                  final newDay = _dt.day.clamp(1, DateTime(newYear, _dt.month + 1, 0).day);
                  _dt = DateTime(newYear, _dt.month, newDay, _dt.hour, _dt.minute);
                });
              },
            ),
            buildWheel<int>(
              items: months,
              initialIndex: monthIndex,
              label: (m) => lunarLabel ? _lunarMonthLabel(DateTime(_dt.year, m, _dt.day)) : '$m月',
              onSelected: (i) {
                setState(() {
                  final newMonth = months[i];
                  final newDay = _dt.day.clamp(1, DateTime(_dt.year, newMonth + 1, 0).day);
                  _dt = DateTime(_dt.year, newMonth, newDay, _dt.hour, _dt.minute);
                });
              },
            ),
            buildWheel<int>(
              items: days,
              initialIndex: dayIndex,
              label: (d) => lunarLabel ? _lunarDayLabel(DateTime(_dt.year, _dt.month, d)) : '$d日',
              onSelected: (i) {
                setState(() {
                  final newDay = days[i];
                  _dt = DateTime(_dt.year, _dt.month, newDay, _dt.hour, _dt.minute);
                });
              },
            ),
            buildWheel<int>(
              items: hours,
              initialIndex: hourIndex,
              label: (h) => '${h.toString().padLeft(2, '0')}时',
              onSelected: (i) {
                setState(() {
                  _dt = DateTime(_dt.year, _dt.month, _dt.day, hours[i], _dt.minute);
                });
              },
            ),
            buildWheel<int>(
              items: minutes,
              initialIndex: minuteIndex,
              label: (m) => '${m.toString().padLeft(2, '0')}分',
              onSelected: (i) {
                setState(() {
                  _dt = DateTime(_dt.year, _dt.month, _dt.day, _dt.hour, minutes[i]);
                });
              },
            ),
          ],
        ),
      );
    }

    // 未使用的方法，保留以备将来使用
    // Widget buildZhiWheel() {
    //   final zIndex = _hourToZhiIndex(_dt.hour);
    //   return Padding(
    //     padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
    //     child: Row(
    //       mainAxisAlignment: MainAxisAlignment.spaceBetween,
    //       children: [
    //         // 年-月-日仍用公历滚轮
    //         buildSolarWheels(lunarLabel: false),
    //         // 替换最后两列为一个"时辰"—用子丑...展示，并将分钟固定为0
    //       ],
    //     ),
    //   );
    // }

    Widget buildFourPillarsWheels() {
      // 简化：年/月/日用公历滚轮，时用12地支；分钟固定0
      final years = List<int>.generate(widget.endYear - widget.startYear + 1, (i) => widget.startYear + i);
      final months = List<int>.generate(12, (i) => i + 1);
      final days = _daysInMonth(_dt.year, _dt.month);
      int yearIndex = _dt.year - widget.startYear;
      int monthIndex = _dt.month - 1;
      int dayIndex = (_dt.day - 1).clamp(0, days.length - 1);
      int zIndex = _hourToZhiIndex(_dt.hour);

      Widget buildWheelSimple<T>({
        required List<T> items,
        required int initialIndex,
        required ValueChanged<int> onSelected,
        double width = 70,
        String Function(T)? label,
      }) {
        return SizedBox(
          width: width,
          height: 200,
          child: CupertinoPicker(
            scrollController: FixedExtentScrollController(initialItem: initialIndex),
            itemExtent: 36,
            magnification: 1.05,
            useMagnifier: true,
            onSelectedItemChanged: onSelected,
            children: items.map((e) {
              final text = label != null ? label(e) : e.toString();
              return Center(child: Text(text, style: const TextStyle(fontSize: 16)));
            }).toList(),
          ),
        );
      }

      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            buildWheelSimple<int>(
              items: years,
              initialIndex: yearIndex,
              width: 90,
              label: (y) => '$y年',
              onSelected: (i) {
                setState(() {
                  final newYear = years[i];
                  final newDay = _dt.day.clamp(1, DateTime(newYear, _dt.month + 1, 0).day);
                  _dt = DateTime(newYear, _dt.month, newDay, _dt.hour, 0);
                });
              },
            ),
            buildWheelSimple<int>(
              items: months,
              initialIndex: monthIndex,
              label: (m) => '$m月',
              onSelected: (i) {
                setState(() {
                  final newMonth = months[i];
                  final newDay = _dt.day.clamp(1, DateTime(_dt.year, newMonth + 1, 0).day);
                  _dt = DateTime(_dt.year, newMonth, newDay, _dt.hour, 0);
                });
              },
            ),
            buildWheelSimple<int>(
              items: days,
              initialIndex: dayIndex,
              label: (d) => '$d日',
              onSelected: (i) {
                setState(() {
                  final newDay = days[i];
                  _dt = DateTime(_dt.year, _dt.month, newDay, _dt.hour, 0);
                });
              },
            ),
            buildWheelSimple<String>(
              items: _zhi,
              initialIndex: zIndex,
              width: 70,
              label: (z) => '$z时',
              onSelected: (i) {
                setState(() {
                  final h = _zhiStartHour[i];
                  _dt = DateTime(_dt.year, _dt.month, _dt.day, h, 0);
                });
              },
            ),
            SizedBox(
              width: 70,
              child: Center(
                child: Text('00分', style: const TextStyle(fontSize: 16, color: Colors.grey)),
              ),
            ),
          ],
        ),
      );
    }

    return SafeArea(
      top: false,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(height: 8),
          Container(width: 40, height: 4, decoration: BoxDecoration(color: Colors.black12, borderRadius: BorderRadius.circular(2))),
          buildHeader(),
          const Divider(height: 1),
          if (_tab == 1) buildSolarWheels(lunarLabel: false),
          if (_tab == 2) buildSolarWheels(lunarLabel: true), // 用 lunar 标签展示
          if (_tab == 0) buildFourPillarsWheels(),
          if (_tab == 3) buildSolarWheels(lunarLabel: false),
          const SizedBox(height: 12),
        ],
      ),
    );
  }

  Widget _tabChip(String text, int index) {
    final active = _tab == index;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2),
      child: GestureDetector(
        onTap: () => setState(() => _tab = index),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
          decoration: BoxDecoration(
            color: active ? const Color(0xFF7C3AED) : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            text,
            style: TextStyle(
              color: active ? Colors.white : const Color(0xFF7C3AED),
              fontSize: 11,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}