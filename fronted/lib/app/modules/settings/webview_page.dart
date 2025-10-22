import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:url_launcher/url_launcher.dart';

class WebviewPage extends StatefulWidget {
  final String title;
  final String url;
  const WebviewPage({super.key, required this.title, required this.url});

  @override
  State<WebviewPage> createState() => _WebviewPageState();
}

class _WebviewPageState extends State<WebviewPage> {
  InAppWebViewController? _controller;
  late final Uri _initialUri;
  bool _isLoading = true;
  bool _hasError = false;

  PullToRefreshController? _pullToRefreshController;

  @override
  void initState() {
    super.initState();
    _initialUri = Uri.parse(widget.url);
    if (Platform.isAndroid || Platform.isIOS) {
      _pullToRefreshController = PullToRefreshController(
        settings: PullToRefreshSettings(color: Colors.white, backgroundColor: Colors.black54),
        onRefresh: () async {
          _hasError = false;
          _isLoading = true;
          setState(() {});
          if (Platform.isAndroid) {
            await _controller?.reload();
          } else {
            final url = await _controller?.getUrl();
            if (url != null) {
              await _controller?.loadUrl(urlRequest: URLRequest(url: url));
            } else {
              await _controller?.reload();
            }
          }
        },
      );
    } else {
      _pullToRefreshController = null;
    }

  }

  @override
  void dispose() {
    _pullToRefreshController?.dispose();
    super.dispose();
  }

  // 外部打开链接
  Future<void> _openExternal(Uri uri) async {
    await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  NavigationActionPolicy _navigationPolicy(InAppWebViewController controller, NavigationAction action) {
    final uri = action.request.url;
    if (uri == null) return NavigationActionPolicy.CANCEL;

    // 非 http/https 统一外部打开
    if (uri.scheme != 'http' && uri.scheme != 'https') {
      _openExternal(uri);
      return NavigationActionPolicy.CANCEL;
    }

    // 外链拦截：与初始 host 不同则外部打开
    if (uri.host != _initialUri.host) {
      _openExternal(uri);
      return NavigationActionPolicy.CANCEL;
    }

    return NavigationActionPolicy.ALLOW;
  }

  // 如果平台/环境不支持内嵌 WebView，则外部打开并返回
  Future<void> _fallbackOpenExternally() async {
    await _openExternal(_initialUri);
    if (mounted) Get.back();
  }

  @override
  Widget build(BuildContext context) {
    // Web 平台不走内嵌（此插件虽支持 Web，但根据你的场景我们统一外部打开更稳）
    if (kIsWeb) {
      Future.microtask(_fallbackOpenExternally);
    }

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.black87, size: 20),
          onPressed: () => Get.back(),
        ),
        centerTitle: true,
        title: Text(
          widget.title,
          style: const TextStyle(color: Color(0xFF1A1A1A), fontWeight: FontWeight.w600),
        ),
        actions: [
          // 进度中的小圈
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.only(right: 12),
              child: SizedBox(
                width: 18, height: 18,
                child: CircularProgressIndicator(strokeWidth: 2),
              ),
            ),
        ],
      ),
      body: Stack(
        children: [
          if (!_hasError)
            InAppWebView(
              initialUrlRequest: URLRequest(url: WebUri(widget.url)),
              initialSettings: InAppWebViewSettings(
                javaScriptEnabled: true,
                mediaPlaybackRequiresUserGesture: true,
                transparentBackground: false,
                allowsBackForwardNavigationGestures: true, // iOS 左右滑返回
              ),
              pullToRefreshController: _pullToRefreshController,
              onWebViewCreated: (controller) {
                _controller = controller;
              },
              shouldOverrideUrlLoading: (controller, action) async {
                return _navigationPolicy(controller, action);
              },
              onLoadStart: (controller, url) {
                setState(() {
                  _isLoading = true;
                  _hasError = false;
                });
              },
              onLoadStop: (controller, url) async {
                setState(() {
                  _isLoading = false;
                });
                _pullToRefreshController?.endRefreshing();
              },
              onReceivedError: (controller, request, error) {
                setState(() {
                  _isLoading = false;
                  _hasError = true;
                });
                _pullToRefreshController?.endRefreshing();
              },
              onProgressChanged: (controller, progress) {
                if (progress == 100) {
                  _pullToRefreshController?.endRefreshing();
                }
              },
            ),
          if (_hasError)
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.error_outline, color: Color(0xFFE53935), size: 32),
                  const SizedBox(height: 8),
                  const Text('加载失败，请检查网络后重试', style: TextStyle(color: Color(0xFF999999))),
                  const SizedBox(height: 12),
                  OutlinedButton(
                    onPressed: () async {
                      setState(() {
                        _hasError = false;
                        _isLoading = true;
                      });
                      await _controller?.reload();
                    },
                    child: const Text('重试'),
                  ),
                  const SizedBox(height: 8),
                  TextButton(
                    onPressed: () => _fallbackOpenExternally(),
                    child: const Text('用系统浏览器打开'),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}