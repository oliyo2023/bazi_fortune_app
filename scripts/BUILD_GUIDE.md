# Flutter 应用编译指南

## 📋 概述

本目录包含用于编译 Flutter 应用的脚本：

- **build.sh** - Linux/macOS Shell 脚本 (推荐)
- **build.ps1** - Windows PowerShell 脚本

## 🚀 快速开始

### Linux / macOS

```bash
# 赋予执行权限 (首次运行需要)
chmod +x scripts/build.sh

# 编译 APK (arm64-v8a)
./scripts/build.sh apk-arm64

# 或使用完整路径
bash scripts/build.sh apk-arm64
```

### Windows

```powershell
# 使用 PowerShell 运行
pwsh -File scripts/build.ps1

# 或指定任务
pwsh -File scripts/build.ps1 -Task apk-arm64
```

---

## 📦 可用任务

### apk-arm64 (默认)
编译仅支持 arm64-v8a 架构的 APK 文件。

```bash
./scripts/build.sh apk-arm64
# 输出: fronted/build/app/outputs/flutter-apk/app-arm64-v8a-release.apk
```

**最快编译速度，文件最小，仅适用于现代 Android 设备。**

### apk-all
编译支持 armeabi-v7a 和 arm64-v8a 两种架构的 APK 文件。

```bash
./scripts/build.sh apk-all
# 输出: 
# - app-armeabi-v7a-release.apk (32位设备)
# - app-arm64-v8a-release.apk (64位设备)
```

**兼容性最好，文件较大，支持所有 Android 设备。**

### aab
编译 Android App Bundle 格式，用于 Google Play Store 上传。

```bash
./scripts/build.sh aab
# 输出: fronted/build/app/outputs/bundle/release/app-release.aab
```

**推荐用于 Play Store 发布，Google 会自动优化分发包。**

### apk-arm64-tag
编译 arm64-v8a APK 并添加版本号和时间戳标记。

```bash
./scripts/build.sh apk-arm64-tag
# 输出: app-arm64-v8a-release-v1.0.0+0-20250115-143022.apk
```

**便于版本管理和多版本发布。**

### clean
清除编译缓存和中间文件。

```bash
./scripts/build.sh clean
```

**当遇到编译问题时运行此命令。**

---

## 🔧 环境要求

### 必需
- ✅ Flutter SDK (最新稳定版本)
- ✅ Android SDK (API 21+)
- ✅ Java Development Kit (JDK 11+)
- ✅ Bash Shell (Linux/macOS) 或 PowerShell (Windows)

### 检查环境

```bash
# 检查 Flutter
flutter --version

# 检查 Android SDK
flutter doctor

# 检查 Java
java -version
```

---

## 📱 编译过程

脚本自动执行以下步骤：

1. **清理缓存**
   ```bash
   flutter clean
   ```

2. **获取依赖**
   ```bash
   flutter pub get
   ```

3. **编译应用**
   ```bash
   flutter build apk --release [选项]
   ```

4. **优化输出** (可选)
   - `--obfuscate` - 代码混淆
   - `--split-debug-info` - 分离调试信息
   - `--tree-shake-icons` - 移除未使用的图标

---

## 📊 编译输出

### APK 文件位置
```
fronted/build/app/outputs/flutter-apk/
├── app-arm64-v8a-release.apk
├── app-armeabi-v7a-release.apk
└── app-arm64-v8a-release-v1.0.0+0-20250115-143022.apk
```

### AAB 文件位置
```
fronted/build/app/outputs/bundle/release/
└── app-release.aab
```

---

## ⚙️ 自定义编译

### 修改编译选项

编辑 `scripts/build.sh`，在 `flutter build` 命令后添加选项：

```bash
flutter build apk --release \
    --split-per-abi \
    --target-platform=android-arm64 \
    --obfuscate \
    --split-debug-info=build/symbols \
    --tree-shake-icons \
    --dart-define=FLAVOR=prod  # 自定义变量
```

### 版本管理

修改 `fronted/pubspec.yaml` 中的版本号：

```yaml
version: 1.0.0+1
#       ↑     ↑
#    版本号  构建号
```

---

## 🐛 常见问题

### Q: 编译失败，提示 "SDK location not found"
**A:** 运行 `flutter doctor` 检查 Android SDK 配置。

### Q: 编译太慢
**A:** 首次编译会下载所有依赖，较慢属正常。可使用 `apk-arm64` 加速。

### Q: 想要调试版本（非 Release）
**A:** 修改脚本中 `--release` 为 `--debug`。

### Q: 脚本无法执行
**A:** 
```bash
# Linux/macOS - 赋予执行权限
chmod +x scripts/build.sh

# 或使用 bash 直接执行
bash scripts/build.sh apk-arm64
```

### Q: Windows 上运行 PowerShell 提示权限错误
**A:**
```powershell
# 临时允许脚本执行
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# 或使用管理员权限
pwsh -File scripts/build.ps1
```

---

## 📚 相关资源

- [Flutter 官方编译指南](https://flutter.dev/docs/deployment/android)
- [Android 开发者文档](https://developer.android.com/)
- [Gradle 编译文档](https://gradle.org/)

---

## 💡 编译优化建议

### 1. 首次编译准备
```bash
# 清理所有缓存，重新开始
./scripts/build.sh clean
./scripts/build.sh apk-arm64
```

### 2. 增量编译
```bash
# 第二次编译会更快，只编译修改部分
./scripts/build.sh apk-arm64
```

### 3. 并行编译
```bash
# 在脚本后添加 Gradle 选项
# 修改 build.sh，找到 flutter build 命令，添加：
# --gradle-options="-Porg.gradle.workers.max=4"
```

### 4. 使用分离调试符号
脚本已包含 `--split-debug-info=build/symbols`，这样：
- APK 文件大小减小 30-50%
- 调试符号单独保存在 `build/symbols`
- 便于崩溃分析

---

## 🔐 安全建议

1. **签名配置** - 生产环境必须配置正确的签名密钥
2. **代码混淆** - 脚本已包含 `--obfuscate` 选项
3. **版本控制** - 提交前更新版本号
4. **测试** - 编译前运行单元测试
5. **扫描** - 定期扫描依赖包安全问题

```bash
# 检查依赖安全
flutter pub outdated
```

---

## 📝 Shell 脚本特性

Linux/macOS 版本脚本特点：

✅ **跨平台兼容** - 支持 Linux, macOS, WSL2  
✅ **自动路径检测** - 无需手动切换目录  
✅ **彩色输出** - 清晰的执行日志  
✅ **错误处理** - 遇到错误自动停止  
✅ **版本标记** - 自动获取版本信息  
✅ **时间戳** - 编译文件自动带时间戳  

---

## 🎯 典型工作流

### 开发阶段
```bash
# 检查代码
flutter analyze

# 运行测试
flutter test

# 开发构建
flutter run
```

### 测试阶段
```bash
# 编译测试 APK (arm64)
./scripts/build.sh apk-arm64

# 安装并测试
adb install -r build/app/outputs/flutter-apk/app-arm64-v8a-release.apk
```

### 发布阶段
```bash
# 更新版本号在 pubspec.yaml

# 编译发布包
./scripts/build.sh aab

# 上传到 Play Store
```

---

**最后更新**: 2025年1月  
**脚本版本**: 2.0  
**兼容系统**: Linux, macOS, Windows (PowerShell)

