/// 会员套餐模型
class MembershipPlan {
  final String id;
  final String name;
  final String? description;
  final double price;
  final String currency;
  final int duration;
  final String durationUnit;
  final List<String> features;
  final bool isActive;
  final int sortOrder;

  const MembershipPlan({
    required this.id,
    required this.name,
    this.description,
    required this.price,
    required this.currency,
    required this.duration,
    required this.durationUnit,
    required this.features,
    required this.isActive,
    required this.sortOrder,
  });

  factory MembershipPlan.fromJson(Map<String, dynamic> json) {
    return MembershipPlan(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
      price: (json['price'] as num).toDouble(),
      currency: json['currency'] as String,
      duration: json['duration'] as int,
      durationUnit: json['duration_unit'] as String,
      features: List<String>.from(json['features'] as List),
      isActive: json['is_active'] as bool,
      sortOrder: json['sort_order'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'price': price,
      'currency': currency,
      'duration': duration,
      'duration_unit': durationUnit,
      'features': features,
      'is_active': isActive,
      'sort_order': sortOrder,
    };
  }

  /// 获取格式化的价格
  String get formattedPrice => '$currency$price';

  /// 获取格式化的期限
  String get formattedDuration {
    switch (durationUnit) {
      case 'day':
        return '$duration天';
      case 'month':
        return '$duration个月';
      case 'year':
        return '$duration年';
      default:
        return '$duration$durationUnit';
    }
  }

  /// 获取格式化的功能列表
  String get formattedFeatures {
    if (features.isEmpty) return '';
    return features.map((feature) => '• $feature').join('\n');
  }
}

/// 用户订阅模型
class UserSubscription {
  final String id;
  final String userId;
  final String planId;
  final String planName;
  final String status;
  final DateTime startDate;
  final DateTime endDate;
  final bool autoRenewal;
  final double amount;
  final String currency;
  final DateTime createdAt;
  final DateTime updatedAt;
  final MembershipPlan? plan;

  const UserSubscription({
    required this.id,
    required this.userId,
    required this.planId,
    required this.planName,
    required this.status,
    required this.startDate,
    required this.endDate,
    required this.autoRenewal,
    required this.amount,
    required this.currency,
    required this.createdAt,
    required this.updatedAt,
    this.plan,
  });

  factory UserSubscription.fromJson(Map<String, dynamic> json) {
    return UserSubscription(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      planId: json['plan_id'] as String,
      planName: json['plan_name'] as String,
      status: json['status'] as String,
      startDate: DateTime.parse(json['start_date'] as String),
      endDate: DateTime.parse(json['end_date'] as String),
      autoRenewal: json['auto_renewal'] as bool,
      amount: (json['amount'] as num).toDouble(),
      currency: json['currency'] as String,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
      plan: json['plan'] != null ? MembershipPlan.fromJson(json['plan'] as Map<String, dynamic>) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'plan_id': planId,
      'plan_name': planName,
      'status': status,
      'start_date': startDate.toIso8601String(),
      'end_date': endDate.toIso8601String(),
      'auto_renewal': autoRenewal,
      'amount': amount,
      'currency': currency,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'plan': plan?.toJson(),
    };
  }

  /// 是否为活跃订阅
  bool get isActive => status == 'active';

  /// 获取剩余天数
  int get remainingDays {
    final now = DateTime.now();
    if (endDate.isBefore(now)) return 0;
    return endDate.difference(now).inDays;
  }

  /// 获取格式化的剩余时间
  String get formattedRemainingTime {
    final days = remainingDays;
    if (days == 0) return '今天到期';
    if (days == 1) return '明天到期';
    if (days < 30) return '$days天后到期';
    if (days < 365) return '${(days / 30).floor()}个月后到期';
    return '${(days / 365).floor()}年后到期';
  }

  /// 获取格式化的价格
  String get formattedPrice => '$currency$amount';
}

/// 订单模型
class Order {
  final String id;
  final String userId;
  final String orderNumber;
  final String type;
  final String status;
  final double amount;
  final String currency;
  final Map<String, dynamic> items;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Order({
    required this.id,
    required this.userId,
    required this.orderNumber,
    required this.type,
    required this.status,
    required this.amount,
    required this.currency,
    required this.items,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      orderNumber: json['order_number'] as String,
      type: json['type'] as String,
      status: json['status'] as String,
      amount: (json['amount'] as num).toDouble(),
      currency: json['currency'] as String,
      items: json['items'] as Map<String, dynamic>,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'order_number': orderNumber,
      'type': type,
      'status': status,
      'amount': amount,
      'currency': currency,
      'items': items,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  /// 是否为待支付状态
  bool get isPending => status == 'pending';

  /// 是否已支付
  bool get isPaid => status == 'paid';

  /// 是否已取消
  bool get isCancelled => status == 'cancelled';

  /// 是否已退款
  bool get isRefunded => status == 'refunded';

  /// 获取格式化的金额
  String get formattedAmount => '$currency$amount';

  /// 获取套餐名称
  String? get planName => items['plan_name'] as String?;

  /// 获取支付方式
  String? get paymentMethod => items['payment_method'] as String?;
}

/// 支付记录模型
class Payment {
  final String id;
  final String userId;
  final String orderId;
  final String paymentMethod;
  final double amount;
  final String currency;
  final String status;
  final String? transactionId;
  final Map<String, dynamic>? gatewayResponse;
  final DateTime? paymentDate;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Order? order;

  const Payment({
    required this.id,
    required this.userId,
    required this.orderId,
    required this.paymentMethod,
    required this.amount,
    required this.currency,
    required this.status,
    this.transactionId,
    this.gatewayResponse,
    this.paymentDate,
    required this.createdAt,
    required this.updatedAt,
    this.order,
  });

  factory Payment.fromJson(Map<String, dynamic> json) {
    return Payment(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      orderId: json['order_id'] as String,
      paymentMethod: json['payment_method'] as String,
      amount: (json['amount'] as num).toDouble(),
      currency: json['currency'] as String,
      status: json['status'] as String,
      transactionId: json['transaction_id'] as String?,
      gatewayResponse: json['gateway_response'] as Map<String, dynamic>?,
      paymentDate: json['payment_date'] != null ? DateTime.parse(json['payment_date'] as String) : null,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
      order: json['order'] != null ? Order.fromJson(json['order'] as Map<String, dynamic>) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'order_id': orderId,
      'payment_method': paymentMethod,
      'amount': amount,
      'currency': currency,
      'status': status,
      'transaction_id': transactionId,
      'gateway_response': gatewayResponse,
      'payment_date': paymentDate?.toIso8601String(),
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'order': order?.toJson(),
    };
  }

  /// 是否为待处理状态
  bool get isPending => status == 'pending';

  /// 是否已完成
  bool get isCompleted => status == 'completed';

  /// 是否失败
  bool get isFailed => status == 'failed';

  /// 是否已退款
  bool get isRefunded => status == 'refunded';

  /// 获取格式化的金额
  String get formattedAmount => '$currency$amount';

  /// 获取格式化的支付日期
  String get formattedPaymentDate {
    if (paymentDate == null) return '';
    return '${paymentDate!.year}-${paymentDate!.month.toString().padLeft(2, '0')}-${paymentDate!.day.toString().padLeft(2, '0')}';
  }

  /// 获取支付方式显示名称
  String get paymentMethodDisplayName {
    switch (paymentMethod) {
      case 'stripe':
        return 'Stripe信用卡';
      case 'paypal':
        return 'PayPal';
      case 'alipay':
        return '支付宝';
      case 'wechat':
        return '微信支付';
      default:
        return paymentMethod;
    }
  }
}

/// 退款记录模型
class Refund {
  final String id;
  final String userId;
  final String orderId;
  final String paymentId;
  final double amount;
  final String currency;
  final String reason;
  final String status;
  final String? processedBy;
  final DateTime? processedAt;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Refund({
    required this.id,
    required this.userId,
    required this.orderId,
    required this.paymentId,
    required this.amount,
    required this.currency,
    required this.reason,
    required this.status,
    this.processedBy,
    this.processedAt,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Refund.fromJson(Map<String, dynamic> json) {
    return Refund(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      orderId: json['order_id'] as String,
      paymentId: json['payment_id'] as String,
      amount: (json['amount'] as num).toDouble(),
      currency: json['currency'] as String,
      reason: json['reason'] as String,
      status: json['status'] as String,
      processedBy: json['processed_by'] as String?,
      processedAt: json['processed_at'] != null ? DateTime.parse(json['processed_at'] as String) : null,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'order_id': orderId,
      'payment_id': paymentId,
      'amount': amount,
      'currency': currency,
      'reason': reason,
      'status': status,
      'processed_by': processedBy,
      'processed_at': processedAt?.toIso8601String(),
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  /// 是否为待处理状态
  bool get isPending => status == 'pending';

  /// 是否已批准
  bool get isApproved => status == 'approved';

  /// 是否已拒绝
  bool get isRejected => status == 'rejected';

  /// 是否已处理
  bool get isProcessed => status == 'processed';

  /// 获取格式化的金额
  String get formattedAmount => '$currency$amount';

  /// 获取格式化的处理时间
  String get formattedProcessedAt {
    if (processedAt == null) return '';
    return '${processedAt!.year}-${processedAt!.month.toString().padLeft(2, '0')}-${processedAt!.day.toString().padLeft(2, '0')}';
  }

  /// 获取状态显示名称
  String get statusDisplayName {
    switch (status) {
      case 'pending':
        return '处理中';
      case 'approved':
        return '已批准';
      case 'rejected':
        return '已拒绝';
      case 'processed':
        return '已处理';
      default:
        return status;
    }
  }
}

/// 优惠券模型
class Coupon {
  final String id;
  final String code;
  final String? description;
  final String discountType;
  final double discountValue;
  final double? minimumAmount;
  final int? usageLimit;
  final int usageCount;
  final DateTime? validFrom;
  final DateTime? validUntil;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Coupon({
    required this.id,
    required this.code,
    this.description,
    required this.discountType,
    required this.discountValue,
    this.minimumAmount,
    this.usageLimit,
    required this.usageCount,
    this.validFrom,
    this.validUntil,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Coupon.fromJson(Map<String, dynamic> json) {
    return Coupon(
      id: json['id'] as String,
      code: json['code'] as String,
      description: json['description'] as String?,
      discountType: json['discount_type'] as String,
      discountValue: (json['discount_value'] as num).toDouble(),
      minimumAmount: json['minimum_amount'] != null ? (json['minimum_amount'] as num).toDouble() : null,
      usageLimit: json['usage_limit'] as int?,
      usageCount: json['usage_count'] as int,
      validFrom: json['valid_from'] != null ? DateTime.parse(json['valid_from'] as String) : null,
      validUntil: json['valid_until'] != null ? DateTime.parse(json['valid_until'] as String) : null,
      isActive: json['is_active'] as bool,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'code': code,
      'description': description,
      'discount_type': discountType,
      'discount_value': discountValue,
      'minimum_amount': minimumAmount,
      'usage_limit': usageLimit,
      'usage_count': usageCount,
      'valid_from': validFrom?.toIso8601String(),
      'valid_until': validUntil?.toIso8601String(),
      'is_active': isActive,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  /// 是否有效
  bool get isValid {
    if (!isActive) return false;
    
    final now = DateTime.now();
    
    // 检查有效期
    if (validFrom != null && now.isBefore(validFrom!)) return false;
    if (validUntil != null && now.isAfter(validUntil!)) return false;
    
    // 检查使用次数限制
    if (usageLimit != null && usageCount >= usageLimit!) return false;
    
    return true;
  }

  /// 是否已过期
  bool get isExpired {
    if (validUntil == null) return false;
    return DateTime.now().isAfter(validUntil!);
  }

  /// 是否已用完
  bool get isUsedUp {
    if (usageLimit == null) return false;
    return usageCount >= usageLimit!;
  }

  /// 获取折扣显示文本
  String get discountDisplayText {
    if (discountType == 'percentage') {
      return '${discountValue.toInt()}%折扣';
    } else {
      return '减$discountValue';
    }
  }

  /// 获取使用情况显示文本
  String get usageDisplayText {
    if (usageLimit == null) {
      return '已使用$usageCount次';
    }
    return '已使用$usageCount/$usageLimit次';
  }
}

/// 用户优惠券模型
class UserCoupon {
  final String id;
  final String userId;
  final String couponId;
  final String status;
  final DateTime? usedAt;
  final String? orderId;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Coupon? coupon;

  const UserCoupon({
    required this.id,
    required this.userId,
    required this.couponId,
    required this.status,
    this.usedAt,
    this.orderId,
    required this.createdAt,
    required this.updatedAt,
    this.coupon,
  });

  factory UserCoupon.fromJson(Map<String, dynamic> json) {
    return UserCoupon(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      couponId: json['coupon_id'] as String,
      status: json['status'] as String,
      usedAt: json['used_at'] != null ? DateTime.parse(json['used_at'] as String) : null,
      orderId: json['order_id'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
      coupon: json['coupon'] != null ? Coupon.fromJson(json['coupon'] as Map<String, dynamic>) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'coupon_id': couponId,
      'status': status,
      'used_at': usedAt?.toIso8601String(),
      'order_id': orderId,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'coupon': coupon?.toJson(),
    };
  }

  /// 是否可用
  bool get isAvailable => status == 'available';

  /// 是否已使用
  bool get isUsed => status == 'used';

  /// 是否已过期
  bool get isExpired => status == 'expired';

  /// 获取状态显示名称
  String get statusDisplayName {
    switch (status) {
      case 'available':
        return '可用';
      case 'used':
        return '已使用';
      case 'expired':
        return '已过期';
      default:
        return status;
    }
  }
}

/// 支付方式模型
class PaymentMethod {
  final String id;
  final String userId;
  final String type;
  final String provider;
  final String providerId;
  final String? lastFour;
  final int? expiryMonth;
  final int? expiryYear;
  final String? cardBrand;
  final bool isDefault;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  const PaymentMethod({
    required this.id,
    required this.userId,
    required this.type,
    required this.provider,
    required this.providerId,
    this.lastFour,
    this.expiryMonth,
    this.expiryYear,
    this.cardBrand,
    required this.isDefault,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory PaymentMethod.fromJson(Map<String, dynamic> json) {
    return PaymentMethod(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      type: json['type'] as String,
      provider: json['provider'] as String,
      providerId: json['provider_id'] as String,
      lastFour: json['last_four'] as String?,
      expiryMonth: json['expiry_month'] as int?,
      expiryYear: json['expiry_year'] as int?,
      cardBrand: json['card_brand'] as String?,
      isDefault: json['is_default'] as bool,
      isActive: json['is_active'] as bool,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'type': type,
      'provider': provider,
      'provider_id': providerId,
      'last_four': lastFour,
      'expiry_month': expiryMonth,
      'expiry_year': expiryYear,
      'card_brand': cardBrand,
      'is_default': isDefault,
      'is_active': isActive,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  /// 获取显示名称
  String get displayName {
    switch (provider) {
      case 'stripe':
        return '$cardBrand ****$lastFour';
      case 'paypal':
        return 'PayPal';
      case 'alipay':
        return '支付宝';
      case 'wechat':
        return '微信支付';
      default:
        return provider;
    }
  }

  /// 获取到期时间显示文本
  String get expiryDisplay {
    if (expiryMonth == null || expiryYear == null) return '';
    final month = expiryMonth.toString().padLeft(2, '0');
    final year = expiryYear.toString().substring(2);
    return '$month/$year';
  }

  /// 是否已过期
  bool get isExpired {
    if (expiryMonth == null || expiryYear == null) return false;
    
    final now = DateTime.now();
    final expiry = DateTime(expiryYear!, expiryMonth!, 1);
    return now.isAfter(expiry);
  }
}

/// 支付历史查询参数
class PaymentHistoryParams {
  final int page;
  final int limit;

  const PaymentHistoryParams({
    this.page = 1,
    this.limit = 10,
  });

  Map<String, dynamic> toQuery() {
    return {
      'page': page,
      'limit': limit,
    };
  }
}

/// 支付历史响应模型
class PaymentHistoryResponse {
  final List<Payment> payments;
  final int total;
  final int page;
  final int limit;

  const PaymentHistoryResponse({
    required this.payments,
    required this.total,
    required this.page,
    required this.limit,
  });

  factory PaymentHistoryResponse.fromJson(Map<String, dynamic> json) {
    return PaymentHistoryResponse(
      payments: (json['payments'] as List).map((payment) => Payment.fromJson(payment as Map<String, dynamic>)).toList(),
      total: json['total'] as int,
      page: json['page'] as int,
      limit: json['limit'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'payments': payments.map((payment) => payment.toJson()).toList(),
      'total': total,
      'page': page,
      'limit': limit,
    };
  }

  /// 是否有更多数据
  bool get hasMoreData {
    return page * limit < total;
  }

  /// 获取下一页页码
  int get nextPage {
    if (hasMoreData) {
      return page + 1;
    }
    return page;
  }
}

/// 创建支付订单请求模型
class CreatePaymentOrderRequest {
  final String planId;
  final String paymentMethod;
  final String? couponCode;

  const CreatePaymentOrderRequest({
    required this.planId,
    required this.paymentMethod,
    this.couponCode,
  });

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {
      'plan_id': planId,
      'payment_method': paymentMethod,
    };
    
    if (couponCode != null) {
      data['coupon_code'] = couponCode;
    }
    
    return data;
  }
}

/// 创建支付订单响应模型
class CreatePaymentOrderResponse {
  final String orderId;
  final String orderNumber;
  final double amount;
  final String currency;
  final String paymentIntentId;

  const CreatePaymentOrderResponse({
    required this.orderId,
    required this.orderNumber,
    required this.amount,
    required this.currency,
    required this.paymentIntentId,
  });

  factory CreatePaymentOrderResponse.fromJson(Map<String, dynamic> json) {
    return CreatePaymentOrderResponse(
      orderId: json['order_id'] as String,
      orderNumber: json['order_number'] as String,
      amount: (json['amount'] as num).toDouble(),
      currency: json['currency'] as String,
      paymentIntentId: json['payment_intent_id'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'order_id': orderId,
      'order_number': orderNumber,
      'amount': amount,
      'currency': currency,
      'payment_intent_id': paymentIntentId,
    };
  }

  /// 获取格式化的金额
  String get formattedAmount => '$currency$amount';
}

/// 确认支付请求模型
class ConfirmPaymentRequest {
  final String orderId;
  final String paymentIntentId;

  const ConfirmPaymentRequest({
    required this.orderId,
    required this.paymentIntentId,
  });

  Map<String, dynamic> toJson() {
    return {
      'order_id': orderId,
      'payment_intent_id': paymentIntentId,
    };
  }
}

/// 确认支付响应模型
class ConfirmPaymentResponse {
  final String paymentId;
  final String status;
  final String transactionId;

  const ConfirmPaymentResponse({
    required this.paymentId,
    required this.status,
    required this.transactionId,
  });

  factory ConfirmPaymentResponse.fromJson(Map<String, dynamic> json) {
    return ConfirmPaymentResponse(
      paymentId: json['payment_id'] as String,
      status: json['status'] as String,
      transactionId: json['transaction_id'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'payment_id': paymentId,
      'status': status,
      'transaction_id': transactionId,
    };
  }

  /// 是否支付成功
  bool get isPaymentSuccessful => status == 'completed';

  /// 获取状态显示名称
  String get statusDisplayName {
    switch (status) {
      case 'pending':
        return '处理中';
      case 'completed':
        return '支付成功';
      case 'failed':
        return '支付失败';
      case 'refunded':
        return '已退款';
      default:
        return status;
    }
  }
}

/// 申请退款请求模型
class RequestRefundRequest {
  final String orderId;
  final String reason;

  const RequestRefundRequest({
    required this.orderId,
    required this.reason,
  });

  Map<String, dynamic> toJson() {
    return {
      'order_id': orderId,
      'reason': reason,
    };
  }
}

/// 申请退款响应模型
class RequestRefundResponse {
  final String refundId;
  final String status;

  const RequestRefundResponse({
    required this.refundId,
    required this.status,
  });

  factory RequestRefundResponse.fromJson(Map<String, dynamic> json) {
    return RequestRefundResponse(
      refundId: json['refund_id'] as String,
      status: json['status'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'refund_id': refundId,
      'status': status,
    };
  }

  /// 获取状态显示名称
  String get statusDisplayName {
    switch (status) {
      case 'pending':
        return '处理中';
      case 'approved':
        return '已批准';
      case 'rejected':
        return '已拒绝';
      case 'processed':
        return '已处理';
      default:
        return status;
    }
  }
}