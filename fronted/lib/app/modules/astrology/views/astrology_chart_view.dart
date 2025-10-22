import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import '../controllers/astrology_controller.dart';
import '../models/astrology_model.dart';
import '../widgets/astrology_chart_painter.dart';

class AstrologyChartPage extends GetView<AstrologyController> {
  const AstrologyChartPage({super.key});

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: Size(375, 812));

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFE6E9F8),
              Color(0xFFFDFBFF),
            ],
          ),
        ),
        child: SafeArea(
          child: Obx(() {
            if (controller.isLoading.value) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation<Color>(
                        Color(0xFF667EEA),
                      ),
                    ),
                    SizedBox(height: 16.h),
                    Text(
                      'calculating'.tr,
                      style: TextStyle(
                        fontSize: 14.sp,
                        color: Color(0xFF666666),
                      ),
                    ),
                  ],
                ),
              );
            }

            if (controller.astrologyChart.value == null) {
              return Center(
                child: Text(
                  'no_data_available'.tr,
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: Color(0xFF999999),
                  ),
                ),
              );
            }

            final chart = controller.astrologyChart.value!;

            return Column(
              children: [
                // 顶部标题栏
                _buildHeader(),

                Expanded(
                  child: SingleChildScrollView(
                    physics: BouncingScrollPhysics(),
                    child: Column(
                      children: [
                        // 占星宫位图
                        _buildChartArea(chart),

                        SizedBox(height: 24.h),

                        // 中心信息
                        _buildCenterInfo(chart),

                        SizedBox(height: 24.h),

                        // 宫位列表
                        _buildHousesList(chart),

                        SizedBox(height: 24.h),
                      ],
                    ),
                  ),
                ),
              ],
            );
          }),
        ),
      ),
    );
  }

  // 顶部标题栏
  Widget _buildHeader() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => Get.back(),
            child: Icon(
              Icons.arrow_back_ios,
              color: Color(0xFF333333),
              size: 24.sp,
            ),
          ),
          Expanded(
            child: Center(
              child: Text(
                'bazi_chart'.tr,
                style: TextStyle(
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF333333),
                ),
              ),
            ),
          ),
          SizedBox(width: 24.sp),
        ],
      ),
    );
  }

  // 占星宫位图绘制区
  Widget _buildChartArea(AstrologyChart chart) {
    return Container(
      margin: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16.r),
        boxShadow: [
          BoxShadow(
            color: Color(0xFF667EEA).withValues(alpha: 0.2),
            blurRadius: 16,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16.r),
        child: Obx(
          () => CustomPaint(
            painter: AstrologyChartPainter(
              chart: chart,
              selectedHouse: controller.selectedHouse.value,
              primaryColor: Color(0xFF667EEA),
              secondaryColor: Color(0xFF764BA2),
            ),
            size: Size(343.w, 340.h),
          ),
        ),
      ),
    );
  }

  // 中心信息卡片
  Widget _buildCenterInfo(AstrologyChart chart) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'ai_analysis'.tr,
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 12.h),
          _buildInfoCard(
            icon: '☉',
            label: 'Sun',
            value: chart.sunSign,
            color: Colors.orange,
          ),
          _buildInfoCard(
            icon: '☽',
            label: 'Moon',
            value: chart.moonSign,
            color: Colors.grey,
          ),
          _buildInfoCard(
            icon: '↑',
            label: 'Rising',
            value: chart.risingSign,
            color: Color(0xFF667EEA),
          ),
        ],
      ),
    );
  }

  // 信息卡片
  Widget _buildInfoCard({
    required String icon,
    required String label,
    required String value,
    required Color color,
  }) {
    return Container(
      margin: EdgeInsets.only(bottom: 8.h),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.r),
        color: Colors.white,
        border: Border.all(
          color: color.withValues(alpha: 0.2),
          width: 1.w,
        ),
      ),
      padding: EdgeInsets.all(12.w),
      child: Row(
        children: [
          Container(
            width: 40.w,
            height: 40.w,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10.r),
              color: color.withValues(alpha: 0.1),
            ),
            child: Center(
              child: Text(
                icon,
                style: TextStyle(
                  fontSize: 20.sp,
                  color: color,
                ),
              ),
            ),
          ),
          SizedBox(width: 12.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    fontSize: 12.sp,
                    color: Color(0xFF999999),
                  ),
                ),
                Text(
                  value,
                  style: TextStyle(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF333333),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // 宫位列表
  Widget _buildHousesList(AstrologyChart chart) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'House Meanings',
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 12.h),
          Wrap(
            spacing: 8.w,
            runSpacing: 8.h,
            children: List.generate(
              12,
              (index) => Obx(
                () => GestureDetector(
                  onTap: () {
                    controller.selectHouse(index + 1);
                  },
                  child: Container(
                    width: (343.w - 8.w * 2) / 3,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.r),
                      color: controller.selectedHouse.value == index + 1
                          ? Color(0xFF667EEA)
                          : Colors.white,
                      border: Border.all(
                        color: controller.selectedHouse.value == index + 1
                            ? Color(0xFF667EEA)
                            : Color(0xFFE8E8E8),
                        width: 1.w,
                      ),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 8.h),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'House ${index + 1}',
                          style: TextStyle(
                            fontSize: 12.sp,
                            fontWeight: FontWeight.bold,
                            color: controller.selectedHouse.value == index + 1
                                ? Colors.white
                                : Color(0xFF333333),
                          ),
                        ),
                        Text(
                          chart.houses[index].sign,
                          style: TextStyle(
                            fontSize: 10.sp,
                            color: controller.selectedHouse.value == index + 1
                                ? Colors.white.withValues(alpha: 0.8)
                                : Color(0xFF999999),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          if (controller.selectedHouse.value > 0) ...[
            SizedBox(height: 16.h),
            _buildHouseDetail(chart),
          ],
        ],
      ),
    );
  }

  // 宫位详情
  Widget _buildHouseDetail(AstrologyChart chart) {
    final house = controller.selectedHouse.value;
    final houseData = chart.houses[house - 1];

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.r),
        color: Color(0xFF667EEA).withValues(alpha: 0.1),
        border: Border.all(
          color: Color(0xFF667EEA).withValues(alpha: 0.3),
          width: 1.w,
        ),
      ),
      padding: EdgeInsets.all(12.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'House $house - ${houseData.sign}',
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF667EEA),
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            houseData.interpretation,
            style: TextStyle(
              fontSize: 12.sp,
              color: Color(0xFF666666),
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}
