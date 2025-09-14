import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'controller.dart';

class HomePage extends GetView<HomeController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // 1. 修改背景为渐变色
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFE6E9F8),
              Color(0xFFFDFBFF),
            ],
          ),
        ),
        child: SafeArea( // 使用SafeArea防止内容被刘海屏遮挡
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              children: [
                SizedBox(height: 16),
                // 2. 添加顶部的搜索栏
                _buildSearchBar(),
                SizedBox(height: 20),
                // 万年历卡片
                _buildAlmanacCard(),
                SizedBox(height: 20),
                // 排盘类型切换
                _buildChartTypeTabs(),
                SizedBox(height: 20),
                // 排盘输入区
                _buildInputCard(),
                SizedBox(height: 20),
                // 底部快捷功能区
                _buildQuickActions(),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: _buildBottomNavBar(),
    );
  }

  // 顶部搜索栏
  Widget _buildSearchBar() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(13),
            blurRadius: 10,
            offset: Offset(0, 5),
          )
        ],
      ),
      child: Row(
        children: [
          Icon(Icons.search, color: Colors.grey),
          SizedBox(width: 8),
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                hintText: '易百查｜2025年运势报告',
                border: InputBorder.none,
                hintStyle: TextStyle(color: Colors.grey),
              ),
            ),
          ),
          SizedBox(width: 8),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.amber.shade100,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.amber),
            ),
            child: Row(
              children: [
                Text('签', style: TextStyle(color: Colors.orange, fontWeight: FontWeight.bold)),
                Text('+10易铢', style: TextStyle(color: Colors.orange.shade700, fontSize: 10)),
              ],
            ),
          ),
          SizedBox(width: 8),
          CircleAvatar(
            backgroundColor: Colors.deepPurple.shade400,
            foregroundColor: Colors.white,
            child: Icon(Icons.add),
          ),
        ],
      ),
    );
  }


  // 万年历卡片
  Widget _buildAlmanacCard() {
    return Card(
      elevation: 2,
      color: Colors.white.withAlpha(204), // 加点透明度，更有层次感
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Container(
        padding: EdgeInsets.all(16),
        child: Obx(() => Column( 
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  controller.lunarDate.value,
                  style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.red.shade700),
                ),
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    image: DecorationImage(
                      image: NetworkImage('https://via.placeholder.com/48/FFFFFF/000000?text=Weather'),
                      fit: BoxFit.cover,
                    ),
                  ),
                )
              ],
            ),
            SizedBox(height: 8),
            Row(
              children: [
                Text('${controller.yearZodiac.value} ${controller.solarDate.value}', style: TextStyle(color: Colors.grey.shade700)),
                SizedBox(width: 8),
                Text(controller.weekDay.value, style: TextStyle(color: Colors.grey.shade700)),
                SizedBox(width: 8),
                Text('第${controller.weekOfYear.value}周', style: TextStyle(color: Colors.grey.shade700)),
                Spacer(),
                Text(controller.solarTerm.value, style: TextStyle(color: Colors.grey.shade700)),
              ],
            ),
            Divider(height: 24),
            Row(
              children: [
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.green.shade100,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text('宜', style: TextStyle(color: Colors.green.shade800, fontWeight: FontWeight.bold)),
                ),
                SizedBox(width: 8),
                Expanded(child: Text('嫁娶 祭祀 塑绘 开光 出行 解除', overflow: TextOverflow.ellipsis, style: TextStyle(color: Colors.grey.shade800))),
                 Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
              ],
            ),
            SizedBox(height: 8),
            Row(
              children: [
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.red.shade100,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text('忌', style: TextStyle(color: Colors.red.shade800, fontWeight: FontWeight.bold)),
                ),
                SizedBox(width: 8),
                Expanded(child: Text('伐木 行丧 作灶 作梁 安葬', overflow: TextOverflow.ellipsis, style: TextStyle(color: Colors.grey.shade800))),
                 Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
              ],
            ),
          ],
        )),
      ),
    );
  }

  // 排盘类型切换
  Widget _buildChartTypeTabs() {
    final chartTypes = ['四柱盘', '紫微盘', '奇门盘', '六爻盘', '梅花盘'];
    return SizedBox(
      height: 40,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: chartTypes.length,
        itemBuilder: (context, index) {
          return Obx(() {
            bool isSelected = controller.selectedChartType.value == index;
            return GestureDetector(
              onTap: () => controller.selectChartType(index),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16),
                margin: EdgeInsets.only(right: 10),
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(
                      color: isSelected ? Color(0xFF8A65F0) : Colors.transparent,
                      width: 3,
                    ),
                  ),
                ),
                child: Center(
                  child: Text(
                    chartTypes[index],
                    style: TextStyle(
                      fontSize: isSelected ? 18 : 16,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      color: isSelected ? Color(0xFF8A65F0) : Colors.grey.shade600,
                    ),
                  ),
                ),
              ),
            );
          });
        },
      ),
    );
  }


  // 排盘输入卡片
  Widget _buildInputCard() {
    return Card(
      elevation: 2,
      color: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // 性别选择
            Row(
              children: [
                Text('性    别:', style: TextStyle(fontSize: 16)),
                SizedBox(width: 20),
                Obx(() => ToggleButtons(
                  isSelected: [controller.selectedGender.value == 0, controller.selectedGender.value == 1],
                  onPressed: (index) => controller.selectGender(index),
                  borderRadius: BorderRadius.circular(20),
                  selectedColor: Colors.white,
                  fillColor: Color(0xFF8A65F0),
                  splashColor: Color(0xFF8A65F0).withAlpha(31),
                  hoverColor: Color(0xFF8A65F0).withAlpha(10),
                  renderBorder: false,
                  children: [
                     Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: Row(children: [Icon(Icons.male), SizedBox(width:4), Text('男')]),
                    ),
                     Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: Row(children: [Icon(Icons.female), SizedBox(width:4), Text('女')]),
                    ),
                  ],
                )),
              ],
            ),
            Divider(height: 30),
            // 生辰选择
             Row(
              children: [
                Text('生    辰:', style: TextStyle(fontSize: 16)),
                SizedBox(width: 20),
                Expanded(child: Text('请选择生辰', style: TextStyle(color: Colors.grey))),
                Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
              ],
            ),
            Divider(height: 30),
            // 出生地区
             Row(
              children: [
                Text('出生地区:', style: TextStyle(fontSize: 16)),
                SizedBox(width: 20),
                Expanded(child: Text('点击选取', style: TextStyle(color: Colors.grey))),
                Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
              ],
            ),
            Divider(height: 30),
            // 姓名输入
            Row(
              children: [
                Text('姓    名:', style: TextStyle(fontSize: 16)),
                SizedBox(width: 20),
                Expanded(child: TextField(
                  decoration: InputDecoration(
                    hintText: '请输入姓名',
                    border: InputBorder.none,
                  ),
                )),
              ],
            ),
            SizedBox(height: 20),
            // 马上排盘按钮
            ElevatedButton(
              onPressed: () {},
              child: Text('马上排盘', style: TextStyle(fontSize: 18, color: Colors.white)),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF8A65F0),
                minimumSize: Size(double.infinity, 50),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(25),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
  
  // 底部快捷功能区
  Widget _buildQuickActions() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        _buildQuickActionButton(icon: Icons.people_alt, label: '合盘'),
        _buildQuickActionButton(icon: Icons.calendar_today, label: '即时盘'),
        _buildQuickActionButton(icon: Icons.history, label: '排盘记录'),
        _buildQuickActionButton(icon: Icons.settings, label: '设置'),
      ],
    );
  }

  Widget _buildQuickActionButton({required IconData icon, required String label}) {
    return Column(
      children: [
        Icon(icon, color: Color(0xFF8A65F0), size: 30),
        SizedBox(height: 4),
        Text(label),
      ],
    );
  }

  // 底部导航栏
  Widget _buildBottomNavBar() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed, // 固定模式
      selectedItemColor: Color(0xFF8A65F0),
      unselectedItemColor: Colors.grey,
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: '首页',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.show_chart),
          label: '运势',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.people),
          label: '大师咨询',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.message),
          label: '消息',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: '我的',
        ),
      ],
      // currentIndex: 0, // 后面用controller控制
      // onTap: (index) {},
    );
  }
}