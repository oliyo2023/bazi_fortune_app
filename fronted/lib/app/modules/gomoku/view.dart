import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controller.dart';

class GomokuPage extends GetView<GomokuController> {
  const GomokuPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF0F0C29),
              Color(0xFF302B63),
              Color(0xFF24243E),
            ],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(8.0),
            child: LayoutBuilder(
              builder: (context, constraints) {
                final isMobile = constraints.maxWidth < 768;
                
                if (isMobile) {
                  // 移动端布局：垂直排列
                  return Column(
                    children: [
                      _buildHeader(),
                      const SizedBox(height: 10),
                      _buildGameInfo(),
                      const SizedBox(height: 10),
                      _buildMobileBoard(),
                      const SizedBox(height: 10),
                      _buildMobileControls(),
                    ],
                  );
                } else {
                  // 桌面端布局：水平排列
                  return Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        flex: 2,
                        child: Column(
                          children: [
                            _buildHeader(),
                            const SizedBox(height: 20),
                            _buildGameInfo(),
                            const SizedBox(height: 20),
                            _buildBoard(),
                          ],
                        ),
                      ),
                      const SizedBox(width: 20),
                      Expanded(
                        flex: 1,
                        child: _buildSidePanel(),
                      ),
                    ],
                  );
                }
              },
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isMobile = constraints.maxWidth < 768;
        
        return Column(
          children: [
            Text(
              '🎯 五子棋智能对战',
              style: TextStyle(
                fontSize: isMobile ? 20 : 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                shadows: [
                  Shadow(
                    blurRadius: 4,
                    color: Colors.black.withOpacity(0.3),
                    offset: Offset(2, 2),
                  ),
                ],
              ),
            ),
          ],
        );
      }
    );
  }

  Widget _buildGameInfo() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.95),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildCurrentPlayer(),
              _buildGameSettings(),
            ],
          ),
          const SizedBox(height: 15),
          _buildGameControls(),
          const SizedBox(height: 15),
          _buildApiConfig(),
        ],
      ),
    );
  }

  Widget _buildCurrentPlayer() {
    return Obx(() => Row(
      children: [
        Text(
          '当前回合：',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
        const SizedBox(width: 10),
        Container(
          width: 30,
          height: 30,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: Colors.black, width: 2),
            gradient: controller.currentPlayer.value == 'black'
                ? LinearGradient(
                    colors: [Color(0xFF555555), Color(0xFF000000)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  )
                : LinearGradient(
                    colors: [Color(0xFFFFFFFF), Color(0xFFDDDDDD)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
          ),
        ),
        const SizedBox(width: 10),
        Text(
          controller.currentPlayer.value == 'black' ? '玩家（黑棋）' : 'AI思考中（白棋）',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
      ],
    ));
  }

  Widget _buildGameSettings() {
    return Obx(() => Row(
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('AI类型：', style: TextStyle(fontSize: 12, color: Colors.black87)),
            DropdownButton<String>(
              value: controller.aiType.value,
              items: [
                DropdownMenuItem(value: 'traditional', child: Text('传统算法')),
                DropdownMenuItem(value: 'llm', child: Text('大模型')),
              ],
              onChanged: (value) {
                controller.aiType.value = value!;
                // 选择大模型时自动显示API配置
                if (value == 'llm') {
                  controller.showApiConfig.value = true;
                }
              },
            ),
          ],
        ),
        const SizedBox(width: 10),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('难度：', style: TextStyle(fontSize: 12, color: Colors.black87)),
            DropdownButton<String>(
              value: controller.difficulty.value,
              items: [
                DropdownMenuItem(value: 'easy', child: Text('简单')),
                DropdownMenuItem(value: 'medium', child: Text('中等')),
                DropdownMenuItem(value: 'hard', child: Text('困难')),
              ],
              onChanged: (value) => controller.difficulty.value = value!,
            ),
          ],
        ),
        if (controller.aiType.value == 'llm') ...[
          const SizedBox(width: 10),
          ElevatedButton(
            onPressed: controller.toggleApiConfig,
            style: ElevatedButton.styleFrom(
              backgroundColor: Color(0xFF6B46C1),
              foregroundColor: Colors.white,
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            ),
            child: Text('API配置'),
          ),
        ],
      ],
    ));
  }

  Widget _buildApiConfig() {
    return Obx(() {
      if (!controller.showApiConfig.value) {
        return Container();
      }
      
      return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Color(0xFFE0C3FC).withOpacity(0.95),
          borderRadius: BorderRadius.circular(15),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              offset: Offset(0, 5),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '🔧 大模型API配置',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Color(0xFF6B46C1),
              ),
            ),
            const SizedBox(height: 15),
            _buildApiInputField('API端点：', controller.apiEndpoint, (value) => controller.apiEndpoint.value = value),
            const SizedBox(height: 10),
            _buildApiInputField('API密钥：', controller.apiKey, (value) => controller.apiKey.value = value, isPassword: true),
            const SizedBox(height: 10),
            _buildApiInputField('模型名称：', controller.model, (value) => controller.model.value = value),
            const SizedBox(height: 15),
            Row(
              children: [
                ElevatedButton(
                  onPressed: () => controller.saveApiConfig(
                    controller.apiEndpoint.value,
                    controller.apiKey.value,
                    controller.model.value,
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF6B46C1),
                    foregroundColor: Colors.white,
                  ),
                  child: Text('保存配置'),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: () => controller.testApiConnection(),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF00FF88),
                    foregroundColor: Colors.white,
                  ),
                  child: Text('测试连接'),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: controller.toggleApiConfig,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey,
                    foregroundColor: Colors.white,
                  ),
                  child: Text('取消'),
                ),
              ],
            ),
            if (controller.apiTestStatus.value.isNotEmpty) ...[
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: controller.apiTestSuccess.value
                      ? Colors.green.withOpacity(0.1)
                      : Colors.red.withOpacity(0.1),
                  border: Border.all(
                    color: controller.apiTestSuccess.value
                        ? Colors.green
                        : Colors.red,
                  ),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  controller.apiTestStatus.value,
                  style: TextStyle(
                    color: controller.apiTestSuccess.value
                        ? Colors.green
                        : Colors.red,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ],
        ),
      );
    });
  }

  Widget _buildApiInputField(String label, RxString value, Function(String) onChanged, {bool isPassword = false}) {
    // 创建一个固定的控制器，避免每次重建都创建新的
    final controller = TextEditingController(text: value.value);
    
    // 监听值变化，更新到响应式变量
    ever(value, (_) {
      if (controller.text != value.value) {
        controller.text = value.value;
      }
    });
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Color(0xFF6B46C1),
          ),
        ),
        const SizedBox(height: 5),
        TextField(
          obscureText: isPassword,
          controller: controller,
          decoration: InputDecoration(
            hintText: '请输入$label',
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide(color: Color(0xFF6B46C1)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide(color: Color(0xFF6B46C1), width: 2),
            ),
            filled: true,
            fillColor: Colors.white.withOpacity(0.9),
          ),
          onChanged: (text) {
            onChanged(text);
            // 直接更新响应式变量，避免失去焦点
            value.value = text;
          },
        ),
      ],
    );
  }

  Widget _buildGameControls() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        ElevatedButton(
          onPressed: controller.restart,
          style: ElevatedButton.styleFrom(
            backgroundColor: Color(0xFFC41E3A),
            foregroundColor: Colors.white,
            padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: Text('重新开始'),
        ),
        ElevatedButton(
          onPressed: controller.undo,
          style: ElevatedButton.styleFrom(
            backgroundColor: Color(0xFFF093FB),
            foregroundColor: Colors.white,
            padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: Text('悔棋'),
        ),
        ElevatedButton(
          onPressed: controller.hint,
          style: ElevatedButton.styleFrom(
            backgroundColor: Color(0xFFFA709A),
            foregroundColor: Colors.white,
            padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: Text('提示'),
        ),
      ],
    );
  }

  Widget _buildBoard() {
    return Obx(() {
      // 确保Obx内有响应式变量
      // final boardState = controller.board.map((row) => row.map((cell) => cell).toList()).toList();
      
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Color(0xFFF4D03F),
          borderRadius: BorderRadius.circular(10),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              blurRadius: 10,
              offset: Offset(0, 5),
            ),
          ],
        ),
        child: GridView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 15,
            crossAxisSpacing: 0,
            mainAxisSpacing: 0,
          ),
          itemCount: 225, // 15x15
          itemBuilder: (context, index) {
            final row = index ~/ 15;
            final col = index % 15;
            return _buildCell(row, col);
          },
        ),
      );
    });
  }

  Widget _buildCell(int row, int col) {
    return Obx(() {
      final piece = controller.board[row][col];
      final isLastMove = controller.lastMove.value != null &&
          controller.lastMove.value!['row'] == row &&
          controller.lastMove.value!['col'] == col;
      
      return GestureDetector(
        onTap: () => controller.handleCellClick(row, col),
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(color: Color(0xFF8B7355)),
            color: piece == null ? Colors.transparent : null,
          ),
          child: piece != null
              ? Stack(
                  children: [
                    Center(
                      child: Container(
                        width: 24,
                        height: 24,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: piece == 'black'
                              ? LinearGradient(
                                  colors: [Color(0xFF555555), Color(0xFF000000)],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                )
                              : LinearGradient(
                                  colors: [Color(0xFFFFFFFF), Color(0xFFDDDDDD)],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.3),
                              blurRadius: 2,
                              offset: Offset(1, 1),
                            ),
                          ],
                        ),
                      ),
                    ),
                    if (isLastMove)
                      Center(
                        child: Container(
                          width: 8,
                          height: 8,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.red,
                          ),
                        ),
                      ),
                  ],
                )
              : Container(),
        ),
      );
    });
  }

  // 未使用的方法，保留以备将来使用
  // Widget _buildControls() {
  //   return Row(
  //     children: [
  //       Expanded(
  //         child: _buildSidePanel(),
  //       ),
  //     ],
  //   );
  // }

  Widget _buildSidePanel() {
    return Column(
      children: [
        _buildAIStatus(),
        const SizedBox(height: 20),
        _buildTimer(),
        const SizedBox(height: 20),
        _buildStats(),
        const SizedBox(height: 20),
        _buildThinkingLog(),
      ],
    );
  }

  Widget _buildAIStatus() {
    return Obx(() => Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.95),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          Obx(() => Transform.scale(
            scale: controller.aiThinking.value ? 1.05 : 1.0,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  colors: [Color(0xFFC41E3A), Color(0xFFFFD700)],
                ),
                boxShadow: [
                  BoxShadow(
                    color: Color(0xFFC41E3A).withOpacity(0.3),
                    blurRadius: controller.aiThinking.value ? 15 : 10,
                    offset: Offset(0, 5),
                  ),
                ],
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Icon(
                    Icons.smart_toy,
                    size: 40,
                    color: Colors.white,
                  ),
                  if (controller.aiThinking.value)
                    Positioned.fill(
                      child: Container(
                        margin: EdgeInsets.all(3),
                        child: Obx(() => Transform.rotate(
                          angle: controller.aiAnimationValue.value * 2 * 3.14159,
                          child: Container(
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: Colors.white.withOpacity(0.7),
                                width: 3,
                              ),
                            ),
                          ),
                        )),
                      ),
                    ),
                ],
              ),
            ),
          )),
          const SizedBox(height: 10),
          Text(
            controller.aiStatus.value,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
            ),
          ),
        ],
      ),
    ));
  }

  Widget _buildTimer() {
    return Obx(() => Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF00FF88), Color(0xFF00FFFF)],
        ),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Color(0xFF00FFFF).withOpacity(0.3),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            '游戏时间',
            style: TextStyle(
              fontSize: 14,
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 5),
          Text(
            controller.gameTimer.value,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              fontFamily: 'monospace',
            ),
          ),
          const SizedBox(height: 10),
          Text(
            '当前回合',
            style: TextStyle(
              fontSize: 14,
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 5),
          Text(
            controller.moveTimer.value,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              fontFamily: 'monospace',
            ),
          ),
        ],
      ),
    ));
  }

  Widget _buildStats() {
    return Obx(() => Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFFC41E3A), Color(0xFFFFD700)],
        ),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Color(0xFFC41E3A).withOpacity(0.3),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            '📊 游戏统计',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 10),
          _buildStatItem('玩家胜利', controller.stats['playerWins'] ?? 0),
          _buildStatItem('AI胜利', controller.stats['aiWins'] ?? 0),
          _buildStatItem('总局数', controller.stats['totalGames'] ?? 0),
          _buildStatItem('总步数', controller.stats['totalMoves'] ?? 0),
        ],
      ),
    ));
  }

  Widget _buildStatItem(String label, int value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          Text(
            value.toString(),
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildThinkingLog() {
    return Obx(() => Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Color(0xFFF5F5DC),
        border: Border.all(color: Color(0xFFC41E3A), width: 2),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Color(0xFFC41E3A).withOpacity(0.2),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            '🤔 AI思考日志',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Color(0xFFC41E3A),
            ),
          ),
          const SizedBox(height: 10),
          Container(
            constraints: BoxConstraints(maxHeight: 200),
            child: ListView.builder(
              shrinkWrap: true,
              reverse: true,
              itemCount: controller.thinkingLog.length,
              itemBuilder: (context, index) {
                final log = controller.thinkingLog[index];
                return Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Color(0xFFFFD700).withOpacity(0.15),
                    borderRadius: BorderRadius.circular(8),
                    border: Border(left: BorderSide(color: Color(0xFFC41E3A), width: 3)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        log['time'],
                        style: TextStyle(
                          fontSize: 12,
                          color: Color(0xFF8B4513),
                        ),
                      ),
                      Text(
                        log['content'],
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.black87,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    ));
  }
  Widget _buildMobileBoard() {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Color(0xFFF4D03F),
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Obx(() {
        // final boardState = controller.board.map((row) => row.map((cell) => cell).toList()).toList();
        
        return AspectRatio(
          aspectRatio: 1.0,
          child: GridView.builder(
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 15,
              crossAxisSpacing: 0,
              mainAxisSpacing: 0,
            ),
            itemCount: 225, // 15x15
            itemBuilder: (context, index) {
              final row = index ~/ 15;
              final col = index % 15;
              return _buildCell(row, col);
            },
          ),
        );
      }),
    );
  }

  Widget _buildMobileControls() {
    return Column(
      children: [
        _buildMobileStats(),
        const SizedBox(height: 15),
        _buildMobileTimer(),
        const SizedBox(height: 15),
        _buildMobileThinkingLog(),
      ],
    );
  }

  Widget _buildMobileStats() {
    return Obx(() => Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFFC41E3A), Color(0xFFFFD700)],
        ),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Color(0xFFC41E3A).withOpacity(0.3),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildMobileStatItem('玩家', controller.stats['playerWins'] ?? 0),
          _buildMobileStatItem('AI', controller.stats['aiWins'] ?? 0),
          _buildMobileStatItem('总局数', controller.stats['totalGames'] ?? 0),
        ],
      ),
    ));
  }

  Widget _buildMobileStatItem(String label, int value) {
    return Column(
      children: [
        Text(
          value.toString(),
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ],
    );
  }

  Widget _buildMobileTimer() {
    return Obx(() => Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF00FF88), Color(0xFF00FFFF)],
        ),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Color(0xFF00FFFF).withOpacity(0.3),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Column(
            children: [
              Text(
                '游戏时间',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                controller.gameTimer.value,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  fontFamily: 'monospace',
                ),
              ),
            ],
          ),
          Column(
            children: [
              Text(
                '当前回合',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                controller.moveTimer.value,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  fontFamily: 'monospace',
                ),
              ),
            ],
          ),
        ],
      ),
    ));
  }

  Widget _buildMobileThinkingLog() {
    return Obx(() => Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Color(0xFFF5F5DC),
        border: Border.all(color: Color(0xFFC41E3A), width: 2),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Color(0xFFC41E3A).withOpacity(0.2),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            '🤔 AI思考日志',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Color(0xFFC41E3A),
            ),
          ),
          const SizedBox(height: 8),
          Container(
            constraints: BoxConstraints(maxHeight: 120),
            child: ListView.builder(
              shrinkWrap: true,
              reverse: true,
              itemCount: controller.thinkingLog.length,
              itemBuilder: (context, index) {
                final log = controller.thinkingLog[index];
                return Container(
                  margin: const EdgeInsets.only(bottom: 4),
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    color: Color(0xFFFFD700).withOpacity(0.15),
                    borderRadius: BorderRadius.circular(6),
                    border: Border(left: BorderSide(color: Color(0xFFC41E3A), width: 2)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        log['time'],
                        style: TextStyle(
                          fontSize: 10,
                          color: Color(0xFF8B4513),
                        ),
                      ),
                      Text(
                        log['content'],
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.black87,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    ));
  }
}