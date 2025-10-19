import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bazi_fortune_app/app/data/models/payment_model.dart';
import 'package:bazi_fortune_app/app/data/services/payment_service.dart';

import 'package:bazi_fortune_app/app/widgets/language_switcher.dart';

/// 会员套餐列表组件
class MembershipPlansWidget extends StatefulWidget {
  const MembershipPlansWidget({super.key});

  @override
  State<MembershipPlansWidget> createState() => _MembershipPlansWidgetState();
}

class _MembershipPlansWidgetState extends State<MembershipPlansWidget> {
  final PaymentService _paymentService = Get.find<PaymentService>();
  
  List<MembershipPlan> _plans = [];
  bool _isLoading = true;
  String? _error;
  MembershipPlan? _selectedPlan;
  String _selectedPaymentMethod = 'stripe';
  String? _couponCode;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    _loadMembershipPlans();
  }

  Future<void> _loadMembershipPlans() async {
    try {
      final plans = await _paymentService.getMembershipPlans();
      setState(() {
        _plans = plans.where((plan) => plan.isActive).toList();
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _createPaymentOrder() async {
    if (_selectedPlan == null) return;
    
    setState(() {
      _isProcessing = true;
    });

    try {
      final orderResponse = await _paymentService.createPaymentOrder(
        planId: _selectedPlan!.id,
        paymentMethod: _selectedPaymentMethod,
        couponCode: _couponCode,
      );

      // 这里应该跳转到支付界面
      _showPaymentDialog(orderResponse);
    } catch (e) {
      _showErrorSnackBar('创建支付订单失败: ${e.toString()}');
    } finally {
      setState(() {
        _isProcessing = false;
      });
    }
  }

  void _showPaymentDialog(CreatePaymentOrderResponse orderResponse) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text('payment'.tr),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('${'order_number'.tr}: ${orderResponse.orderNumber}'),
            const SizedBox(height: 8),
            Text('${'amount'.tr}: ${orderResponse.formattedAmount}'),
            const SizedBox(height: 8),
            Text('${'payment_method'.tr}: ${_getPaymentMethodDisplayName(_selectedPaymentMethod)}'),
            if (_couponCode != null) ...[
              const SizedBox(height: 8),
              Text('${'coupon_code'.tr}: $_couponCode'),
            ],
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              // 这里应该跳转到实际的支付界面
              _simulatePayment(orderResponse);
            },
            child: Text('pay_now'.tr),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: Text('cancel'.tr),
          ),
        ],
      ),
    );
  }

  Future<void> _simulatePayment(CreatePaymentOrderResponse orderResponse) async {
    try {
      // 模拟支付过程
      await Future.delayed(const Duration(seconds: 2));
      
      // 模拟支付成功
      final confirmResponse = ConfirmPaymentResponse(
        paymentId: 'payment_${DateTime.now().millisecondsSinceEpoch}',
        status: 'completed',
        transactionId: 'txn_${DateTime.now().millisecondsSinceEpoch}',
      );
      
      _showPaymentSuccessDialog(confirmResponse);
    } catch (e) {
      _showErrorSnackBar('支付失败: ${e.toString()}');
    }
  }

  void _showPaymentSuccessDialog(ConfirmPaymentResponse response) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('payment_successful'.tr),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.check_circle,
              color: Colors.green,
              size: 48,
            ),
            const SizedBox(height: 16),
            Text('payment_successful'.tr),
            const SizedBox(height: 8),
            Text('${'transaction_id'.tr}: ${response.transactionId}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.of(context).pop();
              // 刷新用户订阅状态
              _loadMembershipPlans();
            },
            child: Text('ok'.tr),
          ),
        ],
      ),
    );
  }

  void _showErrorSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
      ),
    );
  }

  String _getPaymentMethodDisplayName(String method) {
    switch (method) {
      case 'stripe':
        return 'Stripe信用卡';
      case 'paypal':
        return 'PayPal';
      case 'alipay':
        return '支付宝';
      case 'wechat':
        return '微信支付';
      default:
        return method;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('membership_plans'.tr),
        actions: [
          const LanguageSwitcher(),
        ],
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            const SizedBox(height: 16),
            Text('loading'.tr),
          ],
        ),
      );
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.error_outline,
              size: 48,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              'error'.tr,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              _error!,
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey[500],
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _loadMembershipPlans,
              child: Text('retry'.tr),
            ),
          ],
        ),
      );
    }

    if (_plans.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.inbox_outlined,
              size: 48,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              'no_membership_plans'.tr,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey,
              ),
            ),
          ],
        ),
      );
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'choose_membership_plan'.tr,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          ..._plans.map((plan) => _buildPlanCard(plan)),
          const SizedBox(height: 24),
          _buildPaymentOptions(),
          const SizedBox(height: 24),
          _buildCouponField(),
          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            height: 50,
            child: ElevatedButton(
              onPressed: _selectedPlan != null && !_isProcessing
                  ? _createPaymentOrder
                  : null,
              
              child: _isProcessing
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          Colors.white,
                        ),
                      ),
                    )
                  : Text('subscribe_now'.tr),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlanCard(MembershipPlan plan) {
    final isSelected = _selectedPlan?.id == plan.id;
    
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedPlan = plan;
        });
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected ? Colors.blue[50] : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? Colors.blue[600]! : Colors.grey[300]!,
            width: isSelected ? 2 : 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  plan.name,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  plan.formattedPrice,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue[600],
                  ),
                ),
              ],
            ),
            if (plan.description != null) ...[
              const SizedBox(height: 8),
              Text(
                plan.description!,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey,
                ),
              ),
            ],
            const SizedBox(height: 12),
            Text(
              '${'duration'.tr}: ${plan.formattedDuration}',
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
            if (plan.features.isNotEmpty) ...[
              Text(
                '${'features'.tr}:',
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                plan.formattedFeatures,
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildPaymentOptions() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'payment_method'.tr,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _buildPaymentMethodOption('stripe', 'Stripe信用卡'),
            _buildPaymentMethodOption('paypal', 'PayPal'),
            _buildPaymentMethodOption('alipay', '支付宝'),
            _buildPaymentMethodOption('wechat', '微信支付'),
          ],
        ),
      ],
    );
  }

  Widget _buildPaymentMethodOption(String value, String label) {
    final isSelected = _selectedPaymentMethod == value;
    
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedPaymentMethod = value;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? Colors.blue[50] : Colors.grey[100],
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? Colors.blue[600]! : Colors.transparent,
            width: isSelected ? 2 : 0,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: isSelected ? FontWeight.w500 : FontWeight.normal,
            color: isSelected ? Colors.blue[600] : Colors.grey[700],
          ),
        ),
      ),
    );
  }

  Widget _buildCouponField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'coupon_code'.tr,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          onChanged: (value) {
            setState(() {
              _couponCode = value.isEmpty ? null : value;
            });
          },
          decoration: InputDecoration(
            hintText: 'enter_coupon_code'.tr,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          ),
        ),
      ],
    );
  }
}