import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../widgets/custom_button.dart';

class DeleteAccountPage extends StatelessWidget {
  const DeleteAccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    final divider = const Divider(height: 1, thickness: 0.5, color: Color(0xFFEDEDED));

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
        title: const Text(
          '注销账号',
          style: TextStyle(color: Color(0xFF1A1A1A), fontWeight: FontWeight.w600),
        ),
      ),
      body: Column(
        children: [
          // 顶部提示灰条
          Container(
            width: double.infinity,
            color: const Color(0xFFF2F2F2),
            padding: const EdgeInsets.symmetric(vertical: 18),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: const [
                CircleAvatar(
                  radius: 20,
                  backgroundColor: Colors.white,
                  child: Icon(Icons.error_outline, color: Color(0xFFE53935), size: 26),
                ),
                SizedBox(height: 10),
                Text(
                  '开始注销前，请先确认以下内容',
                  style: TextStyle(fontSize: 15, color: Color(0xFF1F1F1F), fontWeight: FontWeight.w500),
                ),
                SizedBox(height: 4),
                Text(
                  '一年内只能注销一次',
                  style: TextStyle(fontSize: 13, color: Color(0xFF999999)),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                const SizedBox(height: 16),
                _requirementItem(
                  '当前账号无任何剩余资产',
                  '当前账号无剩余待使用优惠券或未使用的钱包余额',
                ),
                divider,
                _requirementItem(
                  '当前账号无未完成的订单',
                  '无未完成的咨询、付费订单或服务',
                ),
                divider,
                _requirementItem(
                  '当前账号无任何违规行为',
                  '包括但不限于有未处处理的投诉/举报，因违规行为造成的系统惩罚或其他争议未完结的行为',
                ),
                divider,
                _requirementItem(
                  '当前账号无其他异常',
                  '指30天内无异常登录行为或当前账号非被限制或暂停状态',
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CustomButton(
                text: '开始注销',
                onPressed: () {
                  // TODO：接入真实注销流程与二次确认
                  Get.snackbar('提示', '请确认各项条件后继续注销流程');
                },
                backgroundColor: const Color(0xFFE53935),
                textColor: Colors.white,
                width: double.infinity,
                height: 48,
                borderRadius: BorderRadius.circular(28),
              ),
              const SizedBox(height: 10),
              // 帮助说明
              RichText(
                text: TextSpan(
                  text: '如需任何帮助，请联系',
                  style: const TextStyle(fontSize: 12, color: Color(0xFFB3B3B3)),
                  children: [
                    WidgetSpan(
                      alignment: PlaceholderAlignment.middle,
                      child: GestureDetector(
                        onTap: () {
                          // TODO：跳转在线客服页
                          Get.snackbar('提示', '即将前往在线客服');
                        },
                        child: const Padding(
                          padding: EdgeInsets.only(left: 4),
                          child: Text(
                            '在线客服',
                            style: TextStyle(
                              fontSize: 12,
                              color: Color(0xFF27A6FF),
                              decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // 左侧灰色方形“未选中”勾选框样式
  static Widget _uncheckedBox() {
    return Container(
      width: 18,
      height: 18,
      margin: const EdgeInsets.only(right: 10),
      decoration: BoxDecoration(
        color: const Color(0xFFF5F5F5),
        border: Border.all(color: const Color(0xFFD9D9D9)),
        borderRadius: BorderRadius.circular(4),
      ),
    );
  }

  // 条目
  static Widget _requirementItem(String title, String subTitle) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _uncheckedBox(),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontSize: 15, color: Color(0xFF1F1F1F), fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 6),
                Text(
                  subTitle,
                  style: const TextStyle(fontSize: 13, color: Color(0xFF999999), height: 1.5),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}