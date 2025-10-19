import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bazi_fortune_app/app/data/models/payment_model.dart';
import 'package:bazi_fortune_app/app/data/services/payment_service.dart';
import 'package:bazi_fortune_app/app/widgets/language_switcher.dart';

/// 用户订阅状态组件
class UserSubscriptionWidget extends StatefulWidget {
  const UserSubscriptionWidget({Key? key}) : super(key: key);

  @override
  State<UserSubscriptionWidget> createState() => _UserSubscriptionWidgetState();
}

class _UserSubscriptionWidgetState extends State<UserSubscriptionWidget> {
  final PaymentService _paymentService = Get.find<PaymentService>();
  
  UserSubscription? _subscription;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadUserSubscription();
  }

  Future<void> _loadUserSubscription() async {
    try {
      final subscription = await _paymentService.getUserSubscription();
      setState(() {
        _subscription = subscription;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _cancelSubscription() async {
    if (_subscription == null) return;
    
    final confirmed = await _showConfirmDialog('cancel_subscription'.tr, 'cancel_subscription_confirm'.tr);
    if (!confirmed) return;
    
    try {
      final success = await _paymentService.cancelSubscription();
      if (success) {
        _showSuccessSnackBar('subscription_cancelled'.tr);
        _loadUserSubscription();
      } else {
        _showErrorSnackBar('cancel_subscription_failed'.tr);
      }
    } catch (e) {
      _showErrorSnackBar('cancel_subscription_failed: ${e.toString()}');
    }
  }

  Future<void> _renewSubscription() async {
    if (_subscription == null) return;
    
    try {
      final success = await _paymentService.renewSubscription();
      if (success) {
        _showSuccessSnackBar('subscription_renewed'.tr);
        _loadUserSubscription();
      } else {
        _showErrorSnackBar('renew_subscription_failed'.tr);
      }
    } catch (e) {
      _showErrorSnackBar('renew_subscription_failed: ${e.toString()}');
    }
  }

  Future<bool> _showConfirmDialog(String title, String content) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text('cancel'.tr),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: Text('confirm'.tr),
          ),
        ],
      ),
    );
    return result ?? false;
  }

  void _showSuccessSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.green,
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

  String _getSubscriptionStatusDisplayName(String status) {
    switch (status) {
      case 'active':
        return 'active'.tr;
      case 'expired':
        return 'expired'.tr;
      case 'cancelled':
        return 'cancelled'.tr;
      case 'pending':
        return 'pending'.tr;
      default:
        return status;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('my_subscription'.tr),
        actions: [
          const LanguageSwitcher(),
        ],
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 16),
            Text('Loading'),
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
                color: Colors.grey[600],
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
              onPressed: _loadUserSubscription,
              child: Text('retry'.tr),
            ),
          ],
        ),
      );
    }

    if (_subscription == null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.card_membership_outlined,
              size: 48,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              'no_active_subscription'.tr,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                // 跳转到会员套餐页面
                Get.toNamed('/membership-plans');
              },
              child: Text('upgrade_to_premium'.tr),
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
          _buildSubscriptionCard(),
          const SizedBox(height: 24),
          _buildSubscriptionDetails(),
          const SizedBox(height: 24),
          _buildActionButtons(),
        ],
      ),
    );
  }

  Widget _buildSubscriptionCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue[400]!, Colors.blue[600]!],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12),
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
                'membership_status'.tr,
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.white,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  _getSubscriptionStatusDisplayName(_subscription!.status),
                  style: const TextStyle(
                    fontSize: 12,
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            _subscription!.planName,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            _subscription!.formattedPrice,
            style: const TextStyle(
              fontSize: 18,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            _subscription!.formattedRemainingTime,
            style: const TextStyle(
              fontSize: 14,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubscriptionDetails() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[300]!),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'subscription_details'.tr,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          _buildDetailRow('start_date'.tr, 
              '${_subscription!.startDate.year}-${_subscription!.startDate.month.toString().padLeft(2, '0')}-${_subscription!.startDate.day.toString().padLeft(2, '0')}'),
          const SizedBox(height: 8),
          _buildDetailRow('end_date'.tr, 
              '${_subscription!.endDate.year}-${_subscription!.endDate.month.toString().padLeft(2, '0')}-${_subscription!.endDate.day.toString().padLeft(2, '0')}'),
          const SizedBox(height: 8),
          _buildDetailRow('auto_renewal'.tr, 
              _subscription!.autoRenewal ? 'enabled'.tr : 'disabled'.tr),
          if (_subscription!.plan != null) ...[
            const SizedBox(height: 8),
            _buildDetailRow('plan_features'.tr, 
                _subscription!.plan!.formattedFeatures),
          ],
        ],
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 100,
          child: Text(
            '$label:',
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
        Expanded(
          child: Text(
            value,
            style: const TextStyle(
              fontSize: 14,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildActionButtons() {
    return Column(
      children: [
        if (_subscription!.isActive) ...[
          SizedBox(
            width: double.infinity,
            height: 50,
            child: ElevatedButton(
              onPressed: _cancelSubscription,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red[600],
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: Text('cancel_subscription'.tr),
            ),
          ),
        ] else ...[
          SizedBox(
            width: double.infinity,
            height: 50,
            child: ElevatedButton(
              onPressed: _renewSubscription,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue[600],
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: Text('renew_membership'.tr),
            ),
          ),
        ],
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          height: 50,
          child: OutlinedButton(
            onPressed: () {
              // 跳转到会员套餐页面
              Get.toNamed('/membership-plans');
            },
            style: OutlinedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: Text('view_membership_plans'.tr),
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          height: 50,
          child: OutlinedButton(
            onPressed: () {
              // 跳转到支付历史页面
              Get.toNamed('/payment-history');
            },
            style: OutlinedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: Text('view_payment_history'.tr),
          ),
        ),
      ],
    );
  }
}