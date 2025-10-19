import 'package:get/get.dart';

import '../modules/main_navigation/bindings/main_navigation_binding.dart';
import '../modules/main_navigation/view.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/view.dart';
import '../modules/result/bindings/result_binding.dart';
import '../modules/result/view.dart';
import '../modules/auth/login/bindings/login_binding.dart';
import '../modules/auth/login/view.dart';
import '../modules/auth/register/bindings/register_binding.dart';
import '../modules/auth/register/view.dart';
import '../modules/bazi_input/bindings/bazi_input_binding.dart';
import '../modules/bazi_input/view.dart';
import '../modules/profile/bindings/profile_binding.dart';
import '../modules/profile/view.dart';
import '../modules/settings/bindings/settings_binding.dart';
import '../modules/settings/view.dart';
import '../modules/almanac_detail/bindings/almanac_detail_binding.dart';
import '../modules/almanac_detail/view.dart';
import '../modules/gomoku/bindings/gomoku_binding.dart';
import '../modules/gomoku/view.dart';

part 'app_routes.dart';

class AppPages {
  static const initial = Routes.main;

  static final routes = [
    GetPage(
      name: _Paths.main,
      page: () => MainNavigationPage(),
      binding: MainNavigationBinding(),
    ),
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
    GetPage(
      name: _Paths.login,
      page: () => LoginPage(),
      binding: LoginBinding(),
    ),
    GetPage(
      name: _Paths.register,
      page: () => RegisterPage(),
      binding: RegisterBinding(),
    ),
    GetPage(
      name: _Paths.baziInput,
      page: () => BaziInputPage(),
      binding: BaziInputBinding(),
    ),
    GetPage(
      name: _Paths.profile,
      page: () => ProfilePage(),
      binding: ProfileBinding(),
    ),
    GetPage(
      name: _Paths.settings,
      page: () => const SettingsPage(),
      binding: SettingsBinding(),
    ),
    GetPage(
      name: _Paths.almanacDetail,
      page: () => AlmanacDetailPage(),
      binding: AlmanacDetailBinding(),
    ),
    GetPage(
      name: _Paths.gomoku,
      page: () => GomokuPage(),
      binding: GomokuBinding(),
    ),
  ];
}