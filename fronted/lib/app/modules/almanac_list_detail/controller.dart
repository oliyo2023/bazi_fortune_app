import 'package:get/get.dart';

class AlmanacListDetailController extends GetxController {
  // 0 for 宜, 1 for 忌
  late RxInt type;
  late RxList<String> items;
  late RxString title;

  @override
  void onInit() {
    super.onInit();
    // 从路由参数获取数据
    final args = Get.arguments as Map<String, dynamic>?;
    if (args != null) {
      type = (args['type'] as int? ?? 0).obs;
      items = List<String>.from(args['items'] as List<dynamic>? ?? []).obs;
      title = (args['title'] as String? ?? '').obs;
    } else {
      type = 0.obs;
      items = <String>[].obs;
      title = ''.obs;
    }
  }
}
