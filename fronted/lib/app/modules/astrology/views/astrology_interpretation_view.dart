import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import '../controllers/astrology_controller.dart';

class AstrologyInterpretationPage extends GetView<AstrologyController> {
  const AstrologyInterpretationPage({super.key});

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
            if (controller.interpretation.value == null) {
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

            final interp = controller.interpretation.value!;

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

                        // 性格分析
                        _buildSection(
                          icon: '🌟',
                          title: 'personality_traits'.tr,
                          content: interp.personality,
                        ),

                        SizedBox(height: 16.h),

                        // 事业指导
                        _buildSection(
                          icon: '💼',
                          title: 'career_guidance'.tr,
                          content: interp.career,
                        ),

                        SizedBox(height: 16.h),

                        // 感情洞察
                        _buildSection(
                          icon: '💕',
                          title: 'relationship_insights'.tr,
                          content: interp.love,
                        ),

                        SizedBox(height: 16.h),

                        // 健康建议
                        _buildSection(
                          icon: '🏥',
                          title: 'health_tips'.tr,
                          content: interp.health,
                        ),

                        SizedBox(height: 16.h),

                        // 财富预测
                        _buildSection(
                          icon: '💰',
                          title: 'wealth_analysis'.tr,
                          content: interp.wealth,
                        ),

                        SizedBox(height: 16.h),

                        // 运势预测
                        _buildSection(
                          icon: '🎯',
                          title: 'ai_advice'.tr,
                          content: interp.luck,
                        ),

                        SizedBox(height: 16.h),

                        // 建议列表
                        _buildRecommendations(interp.recommendations),

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
                'ai_interpretation'.tr,
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

  // 内容分析区块
  Widget _buildSection({
    required String icon,
    required String title,
    required String content,
  }) {
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
          Row(
            children: [
              Text(
                icon,
                style: TextStyle(fontSize: 24.sp),
              ),
              SizedBox(width: 12.w),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF333333),
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 12.h),
          Text(
            content,
            style: TextStyle(
              fontSize: 13.sp,
              color: Color(0xFF666666),
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }

  // 建议列表
  Widget _buildRecommendations(List<String> recommendations) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.r),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFFFFE6CC).withOpacity(0.5),
            Color(0xFFFFCCCC).withOpacity(0.5),
          ],
        ),
        border: Border.all(
          color: Color(0xFFFFB74D).withOpacity(0.3),
          width: 1.w,
        ),
      ),
      padding: EdgeInsets.all(16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                '💡',
                style: TextStyle(fontSize: 24.sp),
              ),
              SizedBox(width: 12.w),
              Text(
                '建议和指导',
                style: TextStyle(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF333333),
                ),
              ),
            ],
          ),
          SizedBox(height: 12.h),
          ...List.generate(
            recommendations.length,
            (index) => Padding(
              padding: EdgeInsets.only(bottom: 8.h),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '•',
                    style: TextStyle(
                      fontSize: 16.sp,
                      color: Color(0xFFFF8A65),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(width: 8.w),
                  Expanded(
                    child: Text(
                      recommendations[index],
                      style: TextStyle(
                        fontSize: 13.sp,
                        color: Color(0xFF666666),
                        height: 1.5,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
