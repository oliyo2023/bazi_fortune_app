import 'package:get/get.dart';

import '../modules/home/bindings/home_binding.dart';
import '../modules/home/view.dart';
import '../modules/result/bindings/result_binding.dart';
import '../modules/result/view.dart';

part 'app_routes.dart';

class AppPages {
  static const initial = Routes.home;

  static final routes = [
    GetPage(
      name: _Paths.home,
      page: () => HomePage(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: _Paths.result,
      page: () => ResultPage(),
      binding: ResultBinding(),
    ),
  ];
}