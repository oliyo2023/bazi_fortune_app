import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:intl/date_symbol_data_local.dart'; // 引入咒语
import 'package:supabase_flutter/supabase_flutter.dart';

import 'app/core/values/supabase_config.dart';
import 'app/routes/app_pages.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // 确保咒语能生效
  await initializeDateFormatting('zh_CN', null); // 念咒！
  await GetStorage.init();
  
  // 初始化 Supabase - 确保只初始化一次
  await Supabase.initialize(
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
  );
  
  runApp(
    GetMaterialApp(
      debugShowCheckedModeBanner: false, // 去掉Debug角标
      title: "Bazi Fortune",
      initialRoute: AppPages.initial,
      getPages: AppPages.routes,
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
    ),
  );
}
