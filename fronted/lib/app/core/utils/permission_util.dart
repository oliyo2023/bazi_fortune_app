import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:permission_handler/permission_handler.dart';

class PermissionUtil {
  /// 请求应用常用的基础权限（Web 无需处理；移动端按需申请）
  static Future<void> requestEssential() async {
    // Web 端不支持运行时权限，直接返回，避免 Platform/permission 调用导致异常
    if (kIsWeb) return;

    try {
      // 尝试申请通用存储权限（在 Android 上适配；iOS/其他平台会自动按插件适配或忽略）
      final storageStatus = await Permission.storage.status;
      if (!storageStatus.isGranted) {
        await Permission.storage.request();
      }

      // 可选：根据需要追加更细粒度媒体权限（try/catch 防御不同平台差异）
      // await Permission.photos.request();
      // await Permission.videos.request();
      // await Permission.audio.request();
    } catch (_) {
      // 忽略权限框架在某些平台的异常，保证应用不崩
    }
  }
}