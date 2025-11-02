import 'package:get/get.dart';
import '../controllers/astrology_controller.dart';
import '../controllers/fortune_controller.dart';

class AstrologyBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AstrologyController>(
      () => AstrologyController(),
    );
    Get.lazyPut<FortuneController>(
      () => FortuneController(),
    );
  }
}
