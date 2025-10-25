class UserModel {
  final String id;
  final String? email;
  final String phone;
  final String? name;
  final String? avatar;
  final String role;
  final DateTime createdAt;
  final DateTime updatedAt;

  UserModel({
    required this.id,
    this.email,
    required this.phone,
    this.name,
    this.avatar,
    required this.role,
    required this.createdAt,
    required this.updatedAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? '',
      email: json['email'],
      phone: json['phone'] ?? json['email'] ?? '', // 兼容旧API返回email的情况
      name: json['name'] ?? json['username'],
      avatar: json['avatar'],
      role: json['role'] ?? 'USER',
      createdAt: DateTime.tryParse(json['created_at'] ?? DateTime.now().toIso8601String()) ?? DateTime.now(),
      updatedAt: DateTime.tryParse(json['updated_at'] ?? DateTime.now().toIso8601String()) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'phone': phone,
      'name': name,
      'avatar': avatar,
      'role': role,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}