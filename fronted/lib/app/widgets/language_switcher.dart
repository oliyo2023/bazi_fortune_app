import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bazi_fortune_app/app/controllers/app_controller.dart';

class LanguageSwitcher extends StatelessWidget {
  const LanguageSwitcher({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final AppController controller = Get.find<AppController>();

    return PopupMenuButton<String>(
      icon: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(controller.getCurrentLanguageInfo()['flag'] ?? '🇨🇳'),
          const SizedBox(width: 4),
          Text(controller.getCurrentLanguageInfo()['name']?.tr ?? '中文'.tr),
          const Icon(Icons.arrow_drop_down, size: 16),
        ],
      ),
      onSelected: (String languageCode) {
        controller.changeLanguage(languageCode);
      },
      itemBuilder: (BuildContext context) {
        return controller.supportedLanguages.map((language) {
          return PopupMenuItem<String>(
            value: language['code'],
            child: Row(
              children: [
                Text(language['flag'] ?? '🇨🇳'),
                const SizedBox(width: 8),
                Text(language['name']?.tr ?? '中文'.tr),
                if (language['code'] == controller.currentLanguage)
                  const Icon(Icons.check, size: 16),
              ],
            ),
          );
        }).toList();
      },
    );
  }
}