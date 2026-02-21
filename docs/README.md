# 八字算命 App (Bazi Fortune App)

一款基于 Flutter 开发的八字算命应用，融合中国传统文化与现代 AI 技术，为用户提供专业的命理分析和指导。

## API Governance

- Primary backend decision (ADR): `adr/0001-primary-backend-go.md`
- Frozen API contract (OpenAPI): `../backend/openapi/openapi.yaml`

## 🌟 项目特色

- **八字排盘**: 根据公历出生日期自动计算八字、大运、流年
- **AI 智能解读**: 集成 DeepSeek AI 模型，生成上万字详细解读
- **紫微斗数**: 支持多种命理学派，提供全面分析
- **大师咨询**: 付费咨询真实命理大师，支持免费试聊
- **占星分析**: 西方占星学与中国传统命理结合
- **多语言支持**: 中文/英文界面切换
- **跨平台**: 支持 iOS、Android、Web

## 📱 功能模块

### 核心功能
- **八字输入**: 精确的出生日期时间选择器
- **命理分析**: 事业、财运、感情、健康等多维度解读
- **运势预测**: 年运势、月运势分析
- **历史记录**: 保存和查看历史测算结果

### 大师咨询
- **大师列表**: 浏览认证命理大师资料
- **免费试聊**: AI 模拟大师回复，体验服务
- **付费咨询**: 与真实大师实时聊天
- **订单管理**: 查看咨询历史和支付记录

### 占星功能
- **占星图表**: 12宫位圆形图表展示
- **行星分析**: 太阳、月亮、上升星座解读
- **性格分析**: 基于占星学的性格特征分析
- **运势指导**: 占星学角度的生活建议

## 🛠 技术架构

### 前端技术栈
- **Flutter**: 跨平台开发框架
- **GetX**: 状态管理和路由管理
- **Supabase**: 后端服务 (认证、数据库、实时通信)
- **GetStorage**: 本地数据存储

### 核心依赖
```yaml
dependencies:
  flutter:
    sdk: flutter
  get: ^4.7.2
  get_storage: ^2.1.1
  supabase_flutter: ^2.0.0
  lunar: ^1.0.0
  http: ^1.2.2
  logger: ^2.0.2
  flutter_screenutil: ^5.9.0
  intl: ^0.20.2
  webview_flutter: ^4.7.0
```

### 后端服务
- **Supabase**: 提供 Auth、Postgres、Realtime、Edge Functions
- **DeepSeek API**: AI 智能解读服务
- **支付集成**: 支付宝、微信支付

## 📁 项目结构

```
lib/
├── app/
│   ├── data/                    # 数据层
│   │   ├── models/             # 数据模型
│   │   └── services/           # 服务层
│   ├── modules/                # 功能模块
│   │   ├── auth/              # 认证模块
│   │   ├── bazi_input/        # 八字输入
│   │   ├── result/            # 结果展示
│   │   ├── astrology/         # 占星模块
│   │   ├── profile/           # 个人资料
│   │   ├── settings/          # 设置
│   │   └── ...
│   ├── core/                   # 核心功能
│   │   ├── utils/             # 工具类
│   │   ├── values/            # 常量
│   │   └── theme/             # 主题
│   ├── routes/                 # 路由配置
│   ├── translations.dart       # 国际化翻译
│   └── widgets/                # 公共组件
└── main.dart                   # 应用入口
```

## 🚀 快速开始

### 环境要求
- Flutter SDK: ^3.9.2
- Dart SDK: ^3.9.2
- Android Studio / VS Code
- iOS Xcode (iOS 开发)

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd bazi_fortune_app
```

2. **安装依赖**
```bash
flutter pub get
```

3. **配置环境变量**
创建 `lib/app/core/values/supabase_config.dart`:
```dart
class SupabaseConfig {
  static const String url = 'your-supabase-url';
  static const String anonKey = 'your-supabase-anon-key';
}
```

4. **运行应用**
```bash
flutter run
```

### 构建发布版本

**Android**
```bash
flutter build apk --release
flutter build appbundle --release
```

**iOS**
```bash
flutter build ios --release
```

**Web**
```bash
flutter build web
```

## 🔧 开发指南

### 添加新功能模块

1. 在 `lib/app/modules/` 下创建新模块文件夹
2. 创建必要的文件：`controller.dart`, `view.dart`, `bindings/`
3. 在 `app_routes.dart` 中添加路由定义
4. 在 `app_pages.dart` 中注册路由
5. 在 `translations.dart` 中添加翻译

### 状态管理

项目使用 GetX 进行状态管理：

```dart
// 控制器示例
class MyController extends GetxController {
  final RxString title = 'My Title'.obs;
  
  void updateTitle(String newTitle) {
    title.value = newTitle;
  }
}

// 在视图中使用
class MyView extends GetView<MyController> {
  @override
  Widget build(BuildContext context) {
    return Obx(() => Text(controller.title.value));
  }
}
```

### 国际化

使用 GetX 的国际化方案：

```dart
// 使用翻译
Text('login'.tr)

// 切换语言
Get.updateLocale(Locale('en'));
```

## 📊 数据库设计

### 主要表结构

- **users**: 用户基本信息
- **masters**: 命理大师信息
- **orders**: 订单记录
- **chats**: 聊天会话
- **messages**: 聊天消息
- **earnings**: 收入记录

详细的数据库设计请参考 [MASTER_MANAGEMENT_PRD.md](MASTER_MANAGEMENT_PRD.md)

## 🧪 测试

### 运行测试
```bash
flutter test
```

### 集成测试
```bash
flutter test integration_test/
```

## 📱 应用截图

### 主要界面
- 八字输入界面
- 命理分析结果
- 大师列表
- 聊天界面
- 占星图表

## 🌍 国际化支持

目前支持：
- 简体中文 (默认)
- English

添加新语言步骤：
1. 在 `translations.dart` 中添加语言键值对
2. 在设置页面添加语言选项
3. 更新 `app_strings.dart`

## 🔐 安全考虑

- API 密钥通过环境变量管理
- 用户数据使用 Supabase RLS 保护
- 支付信息加密传输
- 敏感信息本地加密存储

## 📈 性能优化

- 使用 GetX 的懒加载减少内存占用
- 图片资源压缩和缓存
- 列表虚拟化
- 异步计算八字排盘

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目维护者: Sonoma
- 邮箱: [your-email@example.com]
- 项目链接: [https://github.com/your-username/bazi_fortune_app]

## 🙏 致谢

- Flutter 团队提供优秀的跨平台框架
- Supabase 提供强大的后端服务
- DeepSeek 提供 AI 模型支持
- 所有贡献者和用户的支持

---

**八字算命 App** - 传承中华智慧，指引人生方向 ✨
