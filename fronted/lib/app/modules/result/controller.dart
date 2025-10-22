import 'package:get/get.dart';
import '../../data/models/bazi_model.dart';
import '../../data/services/api_service.dart';

class ResultController extends GetxController {
  final Rx<BaziModel?> baziResult = Rx<BaziModel?>(null);
  final RxString userName = ''.obs;
  final RxBool isLoadingAi = false.obs;
  final RxString aiAnalysis = ''.obs;
  
  @override
  void onInit() {
    super.onInit();
    _loadArguments();
  }

  void _loadArguments() {
    final arguments = Get.arguments as Map<String, dynamic>?;
    if (arguments != null) {
      baziResult.value = arguments['bazi'] as BaziModel?;
      userName.value = arguments['name'] as String? ?? '';
      
      // 如果没有AI解读，则请求AI解读
      if (baziResult.value?.aiAnalysis == null) {
        _loadAiAnalysis();
      } else {
        aiAnalysis.value = baziResult.value!.aiAnalysis!;
      }
    }
  }

  Future<void> _loadAiAnalysis() async {
    if (baziResult.value == null) return;
    
    isLoadingAi.value = true;
    
    try {
      final analysis = await ApiService.to.getAiAnalysis(baziResult.value!.id);
      aiAnalysis.value = analysis['analysis'] ?? '暂无AI解读';
    } catch (e) {
      aiAnalysis.value = '获取AI解读失败，请稍后重试';
      Get.snackbar('错误', '获取AI解读失败: ${e.toString()}');
    } finally {
      isLoadingAi.value = false;
    }
  }

  void shareResult() {
    Get.snackbar('分享', '分享功能开发中...');
  }

  void saveToHistory() {
    Get.snackbar('保存成功', '八字结果已保存到历史记录');
  }

  void goBack() {
    Get.back();
  }

  // 获取五行分析数据
  List<Map<String, dynamic>> get wuxingData {
    if (baziResult.value == null) return [];
    
    return [
      {'element': '木', 'score': baziResult.value!.woodScore, 'color': 0xFF4CAF50},
      {'element': '火', 'score': baziResult.value!.fireScore, 'color': 0xFFF44336},
      {'element': '土', 'score': baziResult.value!.earthScore, 'color': 0xFFFF9800},
      {'element': '金', 'score': baziResult.value!.metalScore, 'color': 0xFFFFEB3B},
      {'element': '水', 'score': baziResult.value!.waterScore, 'color': 0xFF2196F3},
    ];
  }

  // 获取最大分数用于计算比例
  int get maxScore {
    if (baziResult.value == null) return 100;
    
    final scores = [
      baziResult.value!.woodScore,
      baziResult.value!.fireScore,
      baziResult.value!.earthScore,
      baziResult.value!.metalScore,
      baziResult.value!.waterScore,
    ];
    
    return scores.reduce((a, b) => a > b ? a : b);
  }
}