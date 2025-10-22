import 'package:get/get.dart';
import '../controller.dart';

class GomokuBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<GomokuController>(() => GomokuController());
  }
}