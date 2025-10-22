import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:bazi_fortune_app/app/data/models/payment_model.dart';
import 'package:bazi_fortune_app/app/data/services/token_manager.dart';

/// 支付服务
class PaymentService extends GetxService {
  final TokenManager _tokenManager = Get.find<TokenManager>();
  
  final String _baseUrl = 'http://127.0.0.1:8080/api/v1';
  
  // 获取带语言信息的请求头
  Map<String, String> get _headers => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': Get.locale?.languageCode ?? 'zh',
  };

  /// 获取会员套餐列表
  Future<List<MembershipPlan>> getMembershipPlans() async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.get(
        Uri.parse('$_baseUrl/membership/plans'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          final List<dynamic> plansData = responseData['data'];
          return plansData.map((plan) => MembershipPlan.fromJson(plan)).toList();
        } else {
          throw Exception(responseData['message'] ?? '获取会员套餐失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('获取会员套餐失败: $e');
    }
  }

  /// 获取用户当前订阅
  Future<UserSubscription?> getUserSubscription() async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.get(
        Uri.parse('$_baseUrl/membership/subscription'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          if (responseData['data'] != null) {
            return UserSubscription.fromJson(responseData['data']);
          } else {
            return null;
          }
        } else {
          throw Exception(responseData['message'] ?? '获取用户订阅失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('获取用户订阅失败: $e');
    }
  }

  /// 创建支付订单
  Future<CreatePaymentOrderResponse> createPaymentOrder({
    required String planId,
    required String paymentMethod,
    String? couponCode,
  }) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final request = CreatePaymentOrderRequest(
        planId: planId,
        paymentMethod: paymentMethod,
        couponCode: couponCode,
      );

      final response = await http.post(
        Uri.parse('$_baseUrl/payments/create'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(request.toJson()),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          return CreatePaymentOrderResponse.fromJson(responseData['data']);
        } else {
          throw Exception(responseData['message'] ?? '创建支付订单失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('创建支付订单失败: $e');
    }
  }

  /// 确认支付
  Future<ConfirmPaymentResponse> confirmPayment({
    required String orderId,
    required String paymentIntentId,
  }) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final request = ConfirmPaymentRequest(
        orderId: orderId,
        paymentIntentId: paymentIntentId,
      );

      final response = await http.post(
        Uri.parse('$_baseUrl/payments/confirm'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(request.toJson()),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          return ConfirmPaymentResponse.fromJson(responseData['data']);
        } else {
          throw Exception(responseData['message'] ?? '确认支付失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('确认支付失败: $e');
    }
  }

  /// 获取支付历史
  Future<PaymentHistoryResponse> getPaymentHistory({
    int page = 1,
    int limit = 10,
  }) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final params = PaymentHistoryParams(page: page, limit: limit);
      final uri = Uri.parse('$_baseUrl/payments/history').replace(queryParameters: params.toQuery());

      final response = await http.get(
        uri,
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          return PaymentHistoryResponse.fromJson(responseData['data']);
        } else {
          throw Exception(responseData['message'] ?? '获取支付历史失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('获取支付历史失败: $e');
    }
  }

  /// 申请退款
  Future<RequestRefundResponse> requestRefund({
    required String orderId,
    required String reason,
  }) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final request = RequestRefundRequest(
        orderId: orderId,
        reason: reason,
      );

      final response = await http.post(
        Uri.parse('$_baseUrl/refunds/request'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(request.toJson()),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          return RequestRefundResponse.fromJson(responseData['data']);
        } else {
          throw Exception(responseData['message'] ?? '申请退款失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('申请退款失败: $e');
    }
  }

  /// 获取用户优惠券列表
  Future<List<UserCoupon>> getUserCoupons() async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.get(
        Uri.parse('$_baseUrl/coupons/user'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          final List<dynamic> couponsData = responseData['data'];
          return couponsData.map((coupon) => UserCoupon.fromJson(coupon)).toList();
        } else {
          throw Exception(responseData['message'] ?? '获取用户优惠券失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('获取用户优惠券失败: $e');
    }
  }

  /// 验证优惠券
  Future<Coupon?> validateCoupon(String code) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final uri = Uri.parse('$_baseUrl/coupons/validate').replace(queryParameters: {'code': code});

      final response = await http.get(
        uri,
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          if (responseData['data'] != null) {
            return Coupon.fromJson(responseData['data']);
          } else {
            return null;
          }
        } else {
          throw Exception(responseData['message'] ?? '验证优惠券失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('验证优惠券失败: $e');
    }
  }

  /// 获取用户支付方式列表
  Future<List<PaymentMethod>> getUserPaymentMethods() async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.get(
        Uri.parse('$_baseUrl/payment-methods/user'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          final List<dynamic> methodsData = responseData['data'];
          return methodsData.map((method) => PaymentMethod.fromJson(method)).toList();
        } else {
          throw Exception(responseData['message'] ?? '获取支付方式失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('获取支付方式失败: $e');
    }
  }

  /// 添加支付方式
  Future<PaymentMethod> addPaymentMethod({
    required String type,
    required String provider,
    required String providerId,
    String? lastFour,
    int? expiryMonth,
    int? expiryYear,
    String? cardBrand,
    bool isDefault = false,
  }) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final Map<String, dynamic> data = {
        'type': type,
        'provider': provider,
        'provider_id': providerId,
        'is_default': isDefault,
      };

      if (lastFour != null) data['last_four'] = lastFour;
      if (expiryMonth != null) data['expiry_month'] = expiryMonth;
      if (expiryYear != null) data['expiry_year'] = expiryYear;
      if (cardBrand != null) data['card_brand'] = cardBrand;

      final response = await http.post(
        Uri.parse('$_baseUrl/payment-methods'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          return PaymentMethod.fromJson(responseData['data']);
        } else {
          throw Exception(responseData['message'] ?? '添加支付方式失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('添加支付方式失败: $e');
    }
  }

  /// 删除支付方式
  Future<bool> deletePaymentMethod(String paymentMethodId) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.delete(
        Uri.parse('$_baseUrl/payment-methods/$paymentMethodId'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        return responseData['success'] == true;
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('删除支付方式失败: $e');
    }
  }

  /// 设置默认支付方式
  Future<bool> setDefaultPaymentMethod(String paymentMethodId) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.put(
        Uri.parse('$_baseUrl/payment-methods/$paymentMethodId/default'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        return responseData['success'] == true;
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('设置默认支付方式失败: $e');
    }
  }

  /// 取消订阅
  Future<bool> cancelSubscription() async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.post(
        Uri.parse('$_baseUrl/membership/cancel'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        return responseData['success'] == true;
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('取消订阅失败: $e');
    }
  }

  /// 续费订阅
  Future<bool> renewSubscription() async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.post(
        Uri.parse('$_baseUrl/membership/renew'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        return responseData['success'] == true;
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('续费订阅失败: $e');
    }
  }

  /// 获取退款状态
  Future<Refund?> getRefundStatus(String refundId) async {
    try {
      final token = _tokenManager.token;
      if (token == null) {
        throw Exception('未登录');
      }

      final response = await http.get(
        Uri.parse('$_baseUrl/refunds/$refundId'),
        headers: {
          ..._headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        if (responseData['success'] == true) {
          return Refund.fromJson(responseData['data']);
        } else {
          throw Exception(responseData['message'] ?? '获取退款状态失败');
        }
      } else {
        throw Exception('网络错误: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('获取退款状态失败: $e');
    }
  }
}