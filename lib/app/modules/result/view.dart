import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'controller.dart';

class ResultPage extends GetView<ResultController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Your Bazi Result'),
      ),
      body: Center(
        child: Text(
          'ResultPage is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}