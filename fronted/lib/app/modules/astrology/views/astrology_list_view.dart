import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import '../controllers/astrology_controller.dart';

class AstrologyListPage extends GetView<AstrologyController> {
  const AstrologyListPage({super.key});

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
          child: Column(
            children: [
              // 顶部标题栏
              _buildHeader(),
              
              Expanded(
                child: SingleChildScrollView(
                  padding: EdgeInsets.all(16.w),
                  physics: BouncingScrollPhysics(),
                  child: Column(
                    children: [
                      // 快速创建占星图表
                      _buildQuickCreateCard(),
                      
                      SizedBox(height: 24.h),
                      
                      // 占星图表列表
                      _buildChartsList(),
                    ],
                  ),
                ),
              ),
            ],
          ),
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
                'astrology'.tr,
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

  // 快速创建卡片
  Widget _buildQuickCreateCard() {
    return GestureDetector(
      onTap: () {
        // 导航到创建占星图表页面
        Get.toNamed('/astrology-chart');
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16.r),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFFA587DC),
              Color(0xFF8B6FD9),
            ],
          ),
          boxShadow: [
            BoxShadow(
              color: Color(0xFF8B6FD9).withOpacity(0.3),
              blurRadius: 12,
              offset: Offset(0, 4),
            ),
          ],
        ),
        padding: EdgeInsets.all(20.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(
              Icons.add_circle_outline,
              color: Colors.white,
              size: 32.sp,
            ),
            SizedBox(height: 12.h),
            Text(
              'instant_chart'.tr,
              style: TextStyle(
                fontSize: 18.sp,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 8.h),
            Text(
              '快速创建新的占星图表',
              style: TextStyle(
                fontSize: 13.sp,
                color: Colors.white.withOpacity(0.9),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // 占星图表列表
  Widget _buildChartsList() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'chart_history'.tr,
          style: TextStyle(
            fontSize: 16.sp,
            fontWeight: FontWeight.bold,
            color: Color(0xFF333333),
          ),
        ),
        SizedBox(height: 12.h),
        // 模拟列表项
        _buildChartItem(
          title: '我的占星图表',
          date: '2025-01-15',
          sunSign: 'Capricorn',
          moonSign: 'Pisces',
        ),
        _buildChartItem(
          title: '朋友的占星图表',
          date: '2025-01-10',
          sunSign: 'Leo',
          moonSign: 'Libra',
        ),
      ],
    );
  }

  // 占星图表项
  Widget _buildChartItem({
    required String title,
    required String date,
    required String sunSign,
    required String moonSign,
  }) {
    return GestureDetector(
      onTap: () {
        // 导航到占星图表详情页
        Get.toNamed('/astrology-detail');
      },
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12.r),
          color: Colors.white,
          border: Border.all(
            color: Color(0xFFE8E8E8),
            width: 1.w,
          ),
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
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          fontSize: 16.sp,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF333333),
                        ),
                      ),
                      SizedBox(height: 4.h),
                      Text(
                        date,
                        style: TextStyle(
                          fontSize: 12.sp,
                          color: Color(0xFF999999),
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.chevron_right,
                  color: Color(0xFFCCCCCC),
                  size: 24.sp,
                ),
              ],
            ),
            SizedBox(height: 12.h),
            Row(
              children: [
                Expanded(
                  child: _buildSignBadge('☉', sunSign, Colors.orange),
                ),
                SizedBox(width: 8.w),
                Expanded(
                  child: _buildSignBadge('☽', moonSign, Colors.grey),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // 星座徽章
  Widget _buildSignBadge(String symbol, String sign, Color color) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.r),
        color: color.withOpacity(0.1),
        border: Border.all(
          color: color.withOpacity(0.3),
          width: 1.w,
        ),
      ),
      padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 6.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            symbol,
            style: TextStyle(
              fontSize: 14.sp,
              color: color,
            ),
          ),
          SizedBox(width: 4.w),
          Text(
            sign,
            style: TextStyle(
              fontSize: 12.sp,
              fontWeight: FontWeight.w500,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}
