import 'package:get/get.dart';

import '../controller.dart';

class AlmanacListDetailBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AlmanacListDetailController>(
      () => AlmanacListDetailController(),
    );
  }
}
