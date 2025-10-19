import 'package:get/get.dart';
import '../controller.dart';

class BaziInputBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<BaziInputController>(() => BaziInputController());
  }
}