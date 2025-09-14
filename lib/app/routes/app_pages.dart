import 'package:get/get.dart';

import '../modules/home/bindings/home_binding.dart';
import '../modules/home/view.dart';
import '../modules/result/bindings/result_binding.dart';
import '../modules/result/view.dart';

part 'app_routes.dart';

class AppPages {
  static const INITIAL = Routes.HOME;

  static final routes = [
    GetPage(
      name: _Paths.HOME,
      page: () => HomePage(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: _Paths.RESULT,
      page: () => ResultPage(),
      binding: ResultBinding(),
    ),
  ];
}