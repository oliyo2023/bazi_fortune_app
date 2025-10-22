import 'package:get/get.dart';
import '../controllers/astrology_controller.dart';

class AstrologyBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AstrologyController>(
      () => AstrologyController(),
    );
  }
}
