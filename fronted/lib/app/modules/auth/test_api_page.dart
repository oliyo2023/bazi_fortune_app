import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../data/services/auth_service.dart' as auth;

class TestApiPage extends StatefulWidget {
  @override
  _TestApiPageState createState() => _TestApiPageState();
}

class _TestApiPageState extends State<TestApiPage> {
  final _phoneController = TextEditingController(text: '13800138006');
  final _usernameController = TextEditingController(text: 'testuser6');
  final _passwordController = TextEditingController(text: '123456');
  bool _isLoading = false;
  String _result = '';

  void _showSnackBar(String message, {bool isError = false}) {
    Get.snackbar(
      isError ? '错误' : '成功',
      message,
      backgroundColor: isError ? Colors.red : Colors.green,
      colorText: Colors.white,
    );
  }

  Future<void> _register() async {
    setState(() {
      _isLoading = true;
      _result = '';
    });

    try {
      final user = await auth.AuthService.to.registerWithPhone(
        phone: _phoneController.text,
        username: _usernameController.text,
        password: _passwordController.text,
      );

      setState(() {
        _result = '注册成功！\n用户: ${user.name}\n手机号: ${user.phone}\n角色: ${user.role}';
      });
      _showSnackBar('注册成功！');
    } catch (e) {
      setState(() {
        _result = '注册失败：${e.toString()}';
      });
      _showSnackBar(e.toString(), isError: true);
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _login() async {
    setState(() {
      _isLoading = true;
      _result = '';
    });

    try {
      final user = await auth.AuthService.to.loginWithPhone(
        phone: _phoneController.text,
        password: _passwordController.text,
      );

      setState(() {
        _result = '登录成功！\n用户: ${user.name}\n手机号: ${user.phone}\n角色: ${user.role}';
      });
      _showSnackBar('登录成功！');
    } catch (e) {
      setState(() {
        _result = '登录失败：${e.toString()}';
      });
      _showSnackBar(e.toString(), isError: true);
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('API测试'),
        backgroundColor: Colors.blue,
      ),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Workers API 测试',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 20),

            TextField(
              controller: _phoneController,
              decoration: InputDecoration(
                labelText: '手机号',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.phone,
            ),
            SizedBox(height: 10),

            TextField(
              controller: _usernameController,
              decoration: InputDecoration(
                labelText: '用户名',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),

            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                labelText: '密码',
                border: OutlineInputBorder(),
              ),
              obscureText: true,
            ),
            SizedBox(height: 20),

            if (_isLoading)
              Center(child: CircularProgressIndicator())
            else
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _register,
                      child: Text('注册'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        padding: EdgeInsets.symmetric(vertical: 15),
                      ),
                    ),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _login,
                      child: Text('登录'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        padding: EdgeInsets.symmetric(vertical: 15),
                      ),
                    ),
                  ),
                ],
              ),
            SizedBox(height: 20),

            if (_result.isNotEmpty)
              Container(
                padding: EdgeInsets.all(15),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _result,
                  style: TextStyle(fontSize: 14),
                ),
              ),
          ],
        ),
      ),
    );
  }
}