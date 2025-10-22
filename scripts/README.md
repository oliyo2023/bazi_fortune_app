# 编译脚本 (Build Scripts)

## 🚀 快速开始

### Linux / macOS
```bash
./scripts/build.sh apk-arm64        # 编译 APK (arm64)
./scripts/build.sh apk-all          # 编译 APK (全架构)
./scripts/build.sh aab              # 编译 App Bundle
./scripts/build.sh apk-arm64-tag    # 编译 APK (带时间戳)
./scripts/build.sh clean            # 清除缓存
```

### Windows
```powershell
pwsh -File scripts/build.ps1 -Task apk-arm64
```

## 📋 任务列表

| 任务 | 说明 | 输出 |
|------|------|------|
| **apk-arm64** | ARM64 架构 APK | app-arm64-v8a-release.apk |
| **apk-all** | 所有架构 APK | app-{arch}-release.apk |
| **aab** | App Bundle (Play Store) | app-release.aab |
| **apk-arm64-tag** | ARM64 APK + 版本标记 | app-arm64-v8a-release-v*.apk |
| **clean** | 清除编译缓存 | - |

## 📖 详细文档

查看 [BUILD_GUIDE.md](BUILD_GUIDE.md) 获取详细说明。

## ✅ 检查清单

运行编译前：
- [ ] Flutter SDK 已安装
- [ ] Android SDK 已配置
- [ ] Java JDK 已安装
- [ ] 运行 `flutter doctor` 检查环境

## 🔍 故障排除

**问题**: 脚本无法执行  
**解决**: `chmod +x scripts/build.sh`

**问题**: Flutter 找不到  
**解决**: 将 Flutter SDK 加入 PATH

**问题**: 编译超时  
**解决**: 使用 `apk-arm64` 加速编译

更多问题参考 [BUILD_GUIDE.md](BUILD_GUIDE.md#-常见问题)

