import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import '../controllers/astrology_controller.dart';

class AstrologyDetailPage extends GetView<AstrologyController> {
  const AstrologyDetailPage({super.key});

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
            if (controller.astrologyChart.value == null) {
              return Center(
                child: Text(
                  'loading'.tr,
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
                    padding: EdgeInsets.symmetric(horizontal: 16.w),
                    child: Column(
                      children: [
                        SizedBox(height: 12.h),

                        // 基本信息
                        _buildBasicInfo(chart),

                        SizedBox(height: 20.h),

                        // 出生信息
                        _buildBirthInfo(chart),

                        SizedBox(height: 20.h),

                        // 行星表
                        _buildPlanetsTable(chart),

                        SizedBox(height: 20.h),

                        // 宫位详情
                        _buildHousesDetail(chart),

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
                'order_detail'.tr,
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

  // 基本信息
  Widget _buildBasicInfo(AstrologyChart chart) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.r),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF667EEA).withOpacity(0.1),
            Color(0xFF764BA2).withOpacity(0.1),
          ],
        ),
        border: Border.all(
          color: Color(0xFF667EEA).withOpacity(0.2),
          width: 1.w,
        ),
      ),
      padding: EdgeInsets.all(16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'basic_info'.tr,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 12.h),
          Row(
            children: [
              Expanded(
                child: _buildInfoItem('Sun', chart.sunSign, Colors.orange),
              ),
              SizedBox(width: 12.w),
              Expanded(
                child: _buildInfoItem('Moon', chart.moonSign, Colors.grey),
              ),
            ],
          ),
          SizedBox(height: 12.h),
          _buildInfoItem('Rising', chart.risingSign, Color(0xFF667EEA)),
        ],
      ),
    );
  }

  // 信息项
  Widget _buildInfoItem(String label, String value, Color color) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.r),
        color: Colors.white,
        border: Border.all(
          color: color.withOpacity(0.2),
          width: 1.w,
        ),
      ),
      padding: EdgeInsets.all(10.w),
      child: Column(
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 11.sp,
              color: Color(0xFF999999),
            ),
          ),
          SizedBox(height: 4.h),
          Text(
            value,
            style: TextStyle(
              fontSize: 13.sp,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ],
      ),
    );
  }

  // 出生信息
  Widget _buildBirthInfo(AstrologyChart chart) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.r),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      padding: EdgeInsets.all(16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'birth_info'.tr,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 12.h),
          _buildInfoRow('Birth Time', _formatDateTime(chart.birthTime)),
          _buildInfoRow('Latitude', '${chart.latitude.toStringAsFixed(4)}°'),
          _buildInfoRow('Longitude', '${chart.longitude.toStringAsFixed(4)}°'),
          _buildInfoRow('Chart ID', chart.chartId),
        ],
      ),
    );
  }

  // 信息行
  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.only(bottom: 10.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
              fontSize: 12.sp,
              fontWeight: FontWeight.w500,
              color: Color(0xFF333333),
            ),
          ),
        ],
      ),
    );
  }

  // 行星表
  Widget _buildPlanetsTable(AstrologyChart chart) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.r),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      padding: EdgeInsets.all(16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Planets',
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 12.h),
          ...List.generate(
            chart.planets.length,
            (index) {
              final planet = chart.planets[index];
              return Container(
                padding: EdgeInsets.symmetric(vertical: 8.h),
                decoration: BoxDecoration(
                  border: Border(
                    bottom: index < chart.planets.length - 1
                        ? BorderSide(
                            color: Color(0xFFF0F0F0),
                            width: 1.w,
                          )
                        : BorderSide.none,
                  ),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 28.w,
                      height: 28.w,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(6.r),
                        color: _getPlanetColor(index).withOpacity(0.1),
                      ),
                      child: Center(
                        child: Text(
                          planet.symbol,
                          style: TextStyle(
                            fontSize: 14.sp,
                            color: _getPlanetColor(index),
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
                            planet.name,
                            style: TextStyle(
                              fontSize: 12.sp,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFF333333),
                            ),
                          ),
                          Text(
                            '${planet.sign} - House ${planet.house}',
                            style: TextStyle(
                              fontSize: 10.sp,
                              color: Color(0xFF999999),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Text(
                      '${planet.position}°',
                      style: TextStyle(
                        fontSize: 11.sp,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF666666),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  // 宫位详情
  Widget _buildHousesDetail(AstrologyChart chart) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.r),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      padding: EdgeInsets.all(16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Houses',
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
              color: Color(0xFF333333),
            ),
          ),
          SizedBox(height: 12.h),
          ...List.generate(
            chart.houses.length,
            (index) {
              final house = chart.houses[index];
              return Container(
                padding: EdgeInsets.symmetric(vertical: 10.h),
                decoration: BoxDecoration(
                  border: Border(
                    bottom: index < chart.houses.length - 1
                        ? BorderSide(
                            color: Color(0xFFF0F0F0),
                            width: 1.w,
                          )
                        : BorderSide.none,
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 28.w,
                          height: 28.w,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(6.r),
                            color: Color(0xFF667EEA).withOpacity(0.1),
                          ),
                          child: Center(
                            child: Text(
                              '${index + 1}',
                              style: TextStyle(
                                fontSize: 12.sp,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF667EEA),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(width: 12.w),
                        Expanded(
                          child: Text(
                            house.sign,
                            style: TextStyle(
                              fontSize: 12.sp,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFF333333),
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 6.h),
                    Padding(
                      padding: EdgeInsets.only(left: 40.w),
                      child: Text(
                        house.interpretation,
                        style: TextStyle(
                          fontSize: 11.sp,
                          color: Color(0xFF999999),
                          height: 1.4,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  // 格式化日期时间
  String _formatDateTime(DateTime dt) {
    return '${dt.year}-${dt.month.toString().padLeft(2, '0')}-${dt.day.toString().padLeft(2, '0')} '
        '${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
  }

  // 获取行星颜色
  Color _getPlanetColor(int index) {
    const colors = [
      Color(0xFFFFB74D), // 太阳
      Color(0xFFB39DDB), // 月亮
      Color(0xFF64B5F6), // 水星
      Color(0xFFEF9A9A), // 金星
      Color(0xFFFF8A65), // 火星
      Color(0xFFFFD54F), // 木星
      Color(0xFF90CAF9), // 土星
      Color(0xFF80DEEA), // 天王星
      Color(0xFF81C784), // 海王星
      Color(0xFFA1887F), // 冥王星
    ];

    return colors[index % colors.length];
  }
}
