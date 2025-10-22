import 'package:flutter/material.dart';

class AppColors {
  static const Color primary = Color(0xFF8A65F0);
  static const Color primaryDark = Color(0xFF6B46C1);
  static const Color secondary = Color(0xFFE6E9F8);
  static const Color accent = Color(0xFFFFD700);
  
  static const Color background = Color(0xFFFDFBFF);
  static const Color surface = Colors.white;
  static const Color error = Color(0xFFE53E3E);
  static const Color success = Color(0xFF38A169);
  static const Color warning = Color(0xFFD69E2E);
  static const Color info = Color(0xFF3182CE);
  
  static const Color textPrimary = Color(0xFF1A202C);
  static const Color textSecondary = Color(0xFF718096);
  static const Color textLight = Color(0xFFA0AEC0);
  
  // 五行颜色
  static const Color wood = Color(0xFF4CAF50);
  static const Color fire = Color(0xFFF44336);
  static const Color earth = Color(0xFFFF9800);
  static const Color metal = Color(0xFFFFEB3B);
  static const Color water = Color(0xFF2196F3);
  
  // 渐变色
  static const LinearGradient primaryGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [primary, primaryDark],
  );
  
  static const LinearGradient backgroundGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [secondary, background],
  );
}