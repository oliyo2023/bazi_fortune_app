import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb, defaultTargetPlatform, TargetPlatform;
import 'package:get/get.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'controller.dart';

class AlmanacDetailPage extends GetView<AlmanacDetailController> {
  AlmanacDetailPage({super.key});

  InAppWebViewController? _webController;

  @override
  Widget build(BuildContext context) {
    // TODO: 替换为你的后端线上地址，例如 https://api.example.com/static/almanac_detail.html
    final remoteUrl = WebUri('http://localhost:8081/static/almanac_detail.html');

    final bool supportsPTR = !kIsWeb &&
        (defaultTargetPlatform == TargetPlatform.android ||
         defaultTargetPlatform == TargetPlatform.iOS);
    final PullToRefreshController? pullToRefreshController = supportsPTR
        ? PullToRefreshController(
            settings: PullToRefreshSettings(color: Colors.grey),
            onRefresh: () async {
              await _webController?.reload();
            },
          )
        : null;

    return Scaffold(
      appBar: AppBar(
        title: const Text('老黄历-易百查'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new),
          onPressed: () => Get.back(),
        ),
      ),
      body: InAppWebView(
        initialSettings: InAppWebViewSettings(
          javaScriptEnabled: true,
          transparentBackground: true,
          mediaPlaybackRequiresUserGesture: false,
          allowsInlineMediaPlayback: true,
          cacheEnabled: true,
        ),
        pullToRefreshController: pullToRefreshController,
        initialUrlRequest: URLRequest(url: remoteUrl),
        onWebViewCreated: (controller) {
          _webController = controller;
        },
        onLoadStop: (controller, url) async {
          pullToRefreshController?.endRefreshing();
          // 注入 GetX 控制器数据
          try {
            final data = {
              'monthTitle': this.controller.monthTitle.value,
              'lunarLine': this.controller.lunarLine.value,
              'yi': this.controller.yiList.value,
              'ji': this.controller.jiList.value,
              'wuXing': this.controller.wuXing.value,
              'chongSha': this.controller.chongSha.value,
              'zhiShen': this.controller.zhiShen.value,
              'shenYiQu': this.controller.shenYiQu.value,
              'taiShen': this.controller.taiShen.value,
              'xiongShen': this.controller.xiongShen.value,
              'baiLu': this.controller.baiLu.value,
              'currentHourTitle': this.controller.currentHourTitle.value,
              'xiShen': this.controller.xiShen.value,
              'hourYi': this.controller.hourYi.value,
              'hourJi': this.controller.hourJi.value,
              'hours': this.controller.hours, // [{label:'子',status:'吉',active:true}, ...]
            };
            final js = "window.renderAlmanac(${jsonEncode(data)});";
            await controller.evaluateJavascript(source: js);
          } catch (_) {
            // 忽略注入失败
          }
        },
        onReceivedError: (controller, request, error) async {
          pullToRefreshController?.endRefreshing();
          // 兜底加载本地 HTML，保证离线也能用
          try {
            final html = await rootBundle.loadString('assets/web/almanac_detail.html');
            await controller.loadData(
              data: html,
              baseUrl: WebUri('https://local.asset/'),
              mimeType: 'text/html',
              encoding: 'utf-8',
            );
          } catch (_) {}
        },
      ),
    );
  }
}