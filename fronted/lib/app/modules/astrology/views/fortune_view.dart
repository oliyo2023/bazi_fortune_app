import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import '../controllers/fortune_controller.dart';
import '../models/astrology_model.dart' as astro;

class FortuneView extends GetView<FortuneController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF5F5F5),
      appBar: AppBar(
        title: Text(
          '星座运势',
          style: TextStyle(
            color: Colors.white,
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Color(0xFF667EEA),
        elevation: 0,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 出生信息输入区域
            _buildBirthInfoSection(),
            SizedBox(height: 20.h),
            
            // 运势类型选择
            _buildFortuneTypeSelector(),
            SizedBox(height: 20.h),
            
            // 运势内容显示
            Obx(() => _buildFortuneContent()),
          ],
        ),
      ),
    );
  }

  // 构建出生信息输入区域
  Widget _buildBirthInfoSection() {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '出生信息',
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 12.h),
          
          // 日期时间输入
          Row(
            children: [
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    labelText: '年份',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA), width: 2),
                    ),
                    prefixIcon: Icon(Icons.calendar_today, color: Color(0xFF667EEA)),
                  ),
                  keyboardType: TextInputType.number,
                  onChanged: (value) {
                    final year = int.tryParse(value);
                    if (year != null) controller.updateBirthData(year: year);
                  },
                ),
              ),
              SizedBox(width: 12.w),
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    labelText: '月份',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA), width: 2),
                    ),
                    prefixIcon: Icon(Icons.calendar_month, color: Color(0xFF667EEA)),
                  ),
                  keyboardType: TextInputType.number,
                  onChanged: (value) {
                    final month = int.tryParse(value);
                    if (month != null) controller.updateBirthData(month: month);
                  },
                ),
              ),
              SizedBox(width: 12.w),
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    labelText: '日期',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA), width: 2),
                    ),
                    prefixIcon: Icon(Icons.calendar_today, color: Color(0xFF667EEA)),
                  ),
                  keyboardType: TextInputType.number,
                  onChanged: (value) {
                    final day = int.tryParse(value);
                    if (day != null) controller.updateBirthData(day: day);
                  },
                ),
              ),
            ],
          ),
          SizedBox(height: 12.h),
          
          // 时间输入
          Row(
            children: [
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    labelText: '小时',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA), width: 2),
                    ),
                    prefixIcon: Icon(Icons.access_time, color: Color(0xFF667EEA)),
                  ),
                  keyboardType: TextInputType.number,
                  onChanged: (value) {
                    final hour = int.tryParse(value);
                    if (hour != null) controller.updateBirthData(hour: hour);
                  },
                ),
              ),
              SizedBox(width: 12.w),
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    labelText: '分钟',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.r),
                      borderSide: BorderSide(color: Color(0xFF667EEA), width: 2),
                    ),
                    prefixIcon: Icon(Icons.access_time, color: Color(0xFF667EEA)),
                  ),
                  keyboardType: TextInputType.number,
                  onChanged: (value) {
                    final minute = int.tryParse(value);
                    if (minute != null) controller.updateBirthData(minute: minute);
                  },
                ),
              ),
            ],
          ),
          SizedBox(height: 12.h),
          
          // 城市输入
          TextField(
            decoration: InputDecoration(
              labelText: '出生城市',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8.r),
                borderSide: BorderSide(color: Color(0xFF667EEA)),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8.r),
                borderSide: BorderSide(color: Color(0xFF667EEA), width: 2),
              ),
              prefixIcon: Icon(Icons.location_city, color: Color(0xFF667EEA)),
            ),
            onChanged: (value) {
              if (value.isNotEmpty) controller.updateBirthData(city: value);
            },
          ),
        ],
      ),
    );
  }

  // 构建运势类型选择器
  Widget _buildFortuneTypeSelector() {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '运势类型',
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 12.h),
          
          // 运势类型按钮
          Row(
            children: [
              Expanded(
                child: Obx(() => _buildFortuneTypeButton(
                  '今日',
                  'today',
                  controller.selectedFortuneType.value == 'today',
                )),
              ),
              SizedBox(width: 8.w),
              Expanded(
                child: Obx(() => _buildFortuneTypeButton(
                  '明日',
                  'tomorrow',
                  controller.selectedFortuneType.value == 'tomorrow',
                )),
              ),
              SizedBox(width: 8.w),
              Expanded(
                child: Obx(() => _buildFortuneTypeButton(
                  '本周',
                  'week',
                  controller.selectedFortuneType.value == 'week',
                )),
              ),
              SizedBox(width: 8.w),
              Expanded(
                child: Obx(() => _buildFortuneTypeButton(
                  '本月',
                  'month',
                  controller.selectedFortuneType.value == 'month',
                )),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // 构建运势类型按钮
  Widget _buildFortuneTypeButton(String title, String type, bool isSelected) {
    return GestureDetector(
      onTap: () {
        switch (type) {
          case 'today':
            controller.getTodayFortune();
            break;
          case 'tomorrow':
            controller.getTomorrowFortune();
            break;
          case 'week':
            controller.getWeekFortune();
            break;
          case 'month':
            controller.getMonthFortune();
            break;
        }
      },
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 12.h, horizontal: 16.w),
        decoration: BoxDecoration(
          color: isSelected ? Color(0xFF667EEA) : Colors.transparent,
          borderRadius: BorderRadius.circular(8.r),
          border: Border.all(
            color: isSelected ? Color(0xFF667EEA) : Color(0xFFE0E0E0),
            width: 1,
          ),
        ),
        child: Text(
          title,
          textAlign: TextAlign.center,
          style: TextStyle(
            color: isSelected ? Colors.white : Color(0xFF667EEA),
            fontSize: 14.sp,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  // 构建运势内容
  Widget _buildFortuneContent() {
    final currentFortune = controller.currentFortune;
    
    if (currentFortune == null) {
      return Container(
        padding: EdgeInsets.all(32.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            Icon(
              Icons.auto_awesome,
              size: 48.w,
              color: Color(0xFF667EEA),
            ),
            SizedBox(height: 16.h),
            Text(
              '请选择运势类型查看详细内容',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16.sp,
                color: Color(0xFF666666),
              ),
            ),
          ],
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // 整体运势评分
        _buildOverallScore(currentFortune!),
        SizedBox(height: 20.h),
        
        // 生活领域评分
        _buildLifeAreas(currentFortune!),
        SizedBox(height: 20.h),
        
        // 关键行运
        _buildKeyTransits(currentFortune!),
        SizedBox(height: 20.h),
        
        // 建议和提醒
        _buildAdvice(currentFortune!),
      ],
    );
  }

  // 构建整体运势评分
  Widget _buildOverallScore(astro.FortuneData fortune) {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '整体运势',
                style: TextStyle(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF333333),
                ),
              ),
              Row(
                children: [
                  Text(
                    controller.getMoodEmoji(fortune.overallMood),
                    style: TextStyle(fontSize: 20.sp),
                  ),
                  SizedBox(width: 8.w),
                  Text(
                    fortune.overallMood,
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: controller.getScoreColor(fortune.overallScore),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ],
          ),
          SizedBox(height: 12.h),
          
          // 评分进度条
          LinearProgressIndicator(
            value: fortune.overallScore,
            backgroundColor: Color(0xFFE0E0E0),
            valueColor: controller.getScoreColor(fortune.overallScore),
            minHeight: 8.h,
          ),
          SizedBox(height: 8.h),
          
          // 评分数字
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildScoreItem('低', 0.0, 0.33),
              _buildScoreItem('中', 0.33, 0.66),
              _buildScoreItem('高', 0.66, 1.0),
            ],
          ),
        ],
      ),
    );
  }

  // 构建评分项
  Widget _buildScoreItem(String label, double start, double end) {
    final isSelected = controller.overallScore.value >= start && controller.overallScore.value < end;
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 12.sp,
            color: isSelected ? Color(0xFF667EEA) : Color(0xFF999999),
          ),
        ),
        SizedBox(height: 4.h),
      ],
    );
  }

  // 构建生活领域评分
  Widget _buildLifeAreas(astro.FortuneData fortune) {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '生活领域运势',
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 16.h),
          
          // 生活领域项目
          Row(
            children: [
              Expanded(child: _buildLifeAreaItem('career', fortune.lifeAreas.career)),
              SizedBox(width: 12.w),
              Expanded(child: _buildLifeAreaItem('love', fortune.lifeAreas.love)),
            ],
          ),
          SizedBox(height: 12.h),
          Row(
            children: [
              Expanded(child: _buildLifeAreaItem('health', fortune.lifeAreas.health)),
              SizedBox(width: 12.w),
              Expanded(child: _buildLifeAreaItem('wealth', fortune.lifeAreas.wealth)),
            ],
          ),
        ],
      ),
    );
  }

  // 构建生活领域项
  Widget _buildLifeAreaItem(String area, double score) {
    return Container(
      padding: EdgeInsets.all(12.w),
      decoration: BoxDecoration(
        color: Color(0xFFF8F9FA),
        borderRadius: BorderRadius.circular(8.r),
        border: Border.all(color: Color(0xFFE0E0E0)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Text(
                controller.getLifeAreaIcon(area),
                style: TextStyle(fontSize: 20.sp),
              ),
              SizedBox(width: 8.w),
              Text(
                controller.getLifeAreaName(area),
                style: TextStyle(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF333333),
                ),
              ),
            ],
          ),
          SizedBox(height: 8.h),
          
          // 评分进度条
          LinearProgressIndicator(
            value: score,
            backgroundColor: Color(0xFFE0E0E0),
            valueColor: controller.getScoreColor(score),
            minHeight: 6.h,
          ),
          SizedBox(height: 4.h),
          
          // 评分
          Text(
            '${(score * 100).toInt()}%',
            style: TextStyle(
              fontSize: 12.sp,
              color: controller.getScoreColor(score),
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  // 构建关键行运
  Widget _buildKeyTransits(astro.FortuneData fortune) {
    if (fortune.keyTransits.isEmpty) {
      return SizedBox.shrink();
    }

    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '关键行运',
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 16.h),
          
          // 行运列表
          ...fortune.keyTransits.map((transit) => _buildTransitItem(transit)),
        ],
      ),
    );
  }

  // 构建行运项
  Widget _buildTransitItem(astro.KeyTransit transit) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      padding: EdgeInsets.all(12.w),
      decoration: BoxDecoration(
        color: Color(0xFFF8F9FA),
        borderRadius: BorderRadius.circular(8.r),
        border: Border.all(color: Color(0xFFE0E0E0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(8.w),
                decoration: BoxDecoration(
                  color: controller.getScoreColor(transit.intensity),
                  borderRadius: BorderRadius.circular(6.r),
                ),
                child: Text(
                  transit.planet,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 12.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(width: 12.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      transit.aspect,
                      style: TextStyle(
                        fontSize: 14.sp,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      transit.influence,
                      style: TextStyle(
                        fontSize: 12.sp,
                        color: Color(0xFF666666),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 8.h),
          
          // 强度指示器
          Row(
            children: [
              Text(
                '强度',
                style: TextStyle(
                  fontSize: 12.sp,
                  color: Color(0xFF999999),
                ),
              ),
              SizedBox(width: 8.w),
              Expanded(
                child: LinearProgressIndicator(
                  value: transit.intensity,
                  backgroundColor: Color(0xFFE0E0E0),
                  valueColor: controller.getScoreColor(transit.intensity),
                  minHeight: 4.h,
                ),
              ),
              SizedBox(width: 8.w),
              Text(
                '${(transit.intensity * 100).toInt()}%',
                style: TextStyle(
                  fontSize: 12.sp,
                  color: controller.getScoreColor(transit.intensity),
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // 构建建议和提醒
  Widget _buildAdvice(astro.FortuneData fortune) {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.lightbulb,
                color: Color(0xFF667EEA),
                size: 20.w,
              ),
              SizedBox(width: 8.w),
              Text(
                '建议与提醒',
                style: TextStyle(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF333333),
                ),
              ),
            ],
          ),
          SizedBox(height: 12.h),
          Text(
            fortune.advice,
            style: TextStyle(
              fontSize: 14.sp,
              color: Color(0xFF666666),
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}