import 'package:get/get.dart';
import 'dart:async';
import 'dart:math' as math;
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:logger/logger.dart';

class GomokuController extends GetxController {
  // 日志记录器
  final Logger logger = Logger();

  // 棋盘大小
  static const int boardSize = 15;
  
  // 游戏状态
  final RxList<List<String?>> board = <List<String?>>[].obs;
  final RxString currentPlayer = 'black'.obs; // black: 玩家, white: AI
  final RxBool gameOver = false.obs;
  final RxList<Map<String, dynamic>> moveHistory = <Map<String, dynamic>>[].obs;
  final Rx<Map<String, dynamic>?> lastMove = Rx<Map<String, dynamic>?>(null);
  
  // 统计信息
  final RxMap<String, int> stats = <String, int>{
    'playerWins': 0,
    'aiWins': 0,
    'totalGames': 0,
    'totalMoves': 0,
  }.obs;
  
  // 游戏设置
  final RxString difficulty = 'medium'.obs;
  final RxString aiType = 'traditional'.obs;
  
  // 大模型API配置
  final RxString apiEndpoint = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'.obs;
  final RxString apiKey = ''.obs;
  final RxString model = 'glm-4'.obs;
  final RxBool showApiConfig = false.obs;
  
  // AI思考动画状态
  final RxDouble aiAnimationValue = 0.0.obs;
  Timer? aiAnimationTimer;
  
  // API测试状态
  final RxString apiTestStatus = ''.obs;
  final RxBool apiTestSuccess = false.obs;
  
  // 计时器相关
  final RxString gameTimer = '00:00'.obs;
  final RxString moveTimer = '00:00'.obs;
  DateTime? gameStartTime;
  DateTime? moveStartTime;
  Timer? gameTimerInterval;
  Timer? moveTimerInterval;
  
  // AI状态
  final RxBool aiThinking = false.obs;
  final RxString aiStatus = 'AI准备就绪'.obs;
  
  // 思考日志
  final RxList<Map<String, dynamic>> thinkingLog = <Map<String, dynamic>>[].obs;
  
  @override
  void onInit() {
    super.onInit();
    initGame();
    loadStats();
    startGameTimer();
  }
  
  @override
  void onClose() {
    stopGameTimer();
    aiAnimationTimer?.cancel();
    super.onClose();
  }
  
  void initGame() {
    createBoard();
    updateUI();
  }
  
  void createBoard() {
    board.value = List.generate(
      boardSize, 
      (index) => List<String?>.filled(boardSize, null)
    );
  }
  
  void handleCellClick(int row, int col) {
    if (gameOver.value || board[row][col] != null || currentPlayer.value != 'black') {
      return;
    }
    
    makeMove(row, col, 'black');
    
    if (!gameOver.value) {
      currentPlayer.value = 'white';
      updateUI();
      Future.delayed(const Duration(milliseconds: 500), () => aiMove());
    }
  }
  
  void makeMove(int row, int col, String player) {
    board[row][col] = player;
    lastMove.value = {'row': row, 'col': col, 'player': player};
    moveHistory.add({
      'row': row, 
      'col': col, 
      'player': player, 
      'time': getMoveTime()
    });
    stats['totalMoves'] = stats['totalMoves']! + 1;
    
    if (checkWin(row, col, player)) {
      endGame(player);
    } else if (checkDraw()) {
      endGame('draw');
    }
    
    resetMoveTimer();
    updateUI();
  }
  
  Future<void> aiMove() async {
    if (gameOver.value) return;
    
    showAIThinking(true);
    
    Map<String, int>? move;
    
    try {
      if (aiType.value == 'llm') {
        move = await getLLMMove();
      } else {
        // 模拟AI思考时间
        await Future.delayed(Duration(seconds: 1 + math.Random().nextInt(2)));
        move = getTraditionalMove();
      }
    } catch (error) {
      logger.e('AI移动失败: $error');
      addThinkingLog('AI移动失败，使用传统算法');
      move = getTraditionalMove();
    }
    
    showAIThinking(false);
    
    if (move != null) {
      makeMove(move['row']!, move['col']!, 'white');
      if (!gameOver.value) {
        currentPlayer.value = 'black';
        updateUI();
      }
    }
  }
  
  Map<String, int>? getTraditionalMove() {
    final moves = getAllPossibleMoves();
    if (moves.isEmpty) return null;
    
    if (difficulty.value == 'easy') {
      return getRandomMove(moves);
    } else if (difficulty.value == 'medium') {
      return getMediumMove(moves);
    } else {
      return getHardMove(moves);
    }
  }
  
  Map<String, int> getRandomMove(List<Map<String, int>> moves) {
    return moves[math.Random().nextInt(moves.length)];
  }
  
  Map<String, int> getMediumMove(List<Map<String, int>> moves) {
    Map<String, int>? bestMove;
    int bestScore = -999999;
    
    for (final move in moves) {
      final score = evaluatePosition(move['row']!, move['col']!, 'white');
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return bestMove!;
  }
  
  Map<String, int> getHardMove(List<Map<String, int>> moves) {
    Map<String, int>? bestMove;
    int bestScore = -999999;
    
    for (final move in moves) {
      board[move['row']!][move['col']!] = 'white';
      final score = minimax(2, false, -999999, 999999);
      board[move['row']!][move['col']!] = null;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return bestMove!;
  }
  
  int minimax(int depth, bool isMaximizing, int alpha, int beta) {
    if (depth == 0) {
      return evaluateBoard();
    }
    
    final moves = getAllPossibleMoves();
    
    if (isMaximizing) {
      int maxScore = -999999;
      for (final move in moves) {
        board[move['row']!][move['col']!] = 'white';
        final score = minimax(depth - 1, false, alpha, beta);
        board[move['row']!][move['col']!] = null;
        maxScore = maxScore > score ? maxScore : score;
        alpha = alpha > score ? alpha : score;
        if (beta <= alpha) break;
      }
      return maxScore;
    } else {
      int minScore = 999999;
      for (final move in moves) {
        board[move['row']!][move['col']!] = 'black';
        final score = minimax(depth - 1, true, alpha, beta);
        board[move['row']!][move['col']!] = null;
        minScore = minScore < score ? minScore : score;
        beta = beta < score ? beta : score;
        if (beta <= alpha) break;
      }
      return minScore;
    }
  }
  
  int evaluateBoard() {
    int score = 0;
    
    for (int row = 0; row < boardSize; row++) {
      for (int col = 0; col < boardSize; col++) {
        if (board[row][col] == 'white') {
          score += evaluatePosition(row, col, 'white');
        } else if (board[row][col] == 'black') {
          score -= evaluatePosition(row, col, 'black');
        }
      }
    }
    
    return score;
  }
  
  int evaluatePosition(int row, int col, String player) {
    int score = 0;
    final directions = [
      [[0, 1], [0, -1]],
      [[1, 0], [-1, 0]],
      [[1, 1], [-1, -1]],
      [[1, -1], [-1, 1]]
    ];
    
    for (final direction in directions) {
      int count = 1;
      int openEnds = 0;
      
      for (final [dr, dc] in direction) {
        int r = row + dr;
        int c = col + dc;
        int consecutive = 0;
        
        while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] == player) {
          consecutive++;
          r += dr;
          c += dc;
        }
        
        count += consecutive;
        
        if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] == null) {
          openEnds++;
        }
      }
      
      if (count >= 5) {
        score += 100000;
      } else if (count == 4) {
        if (openEnds == 2) {
          score += 10000;
        } else if (openEnds == 1) {
          score += 1000;
        }
      } else if (count == 3) {
        if (openEnds == 2) {
          score += 1000;
        } else if (openEnds == 1) {
          score += 100;
        }
      } else if (count == 2) {
        if (openEnds == 2) {
          score += 100;
        } else if (openEnds == 1) {
          score += 10;
        }
      }
    }
    
    return score;
  }
  
  List<Map<String, int>> getAllPossibleMoves() {
    final moves = <Map<String, int>>[];
    const range = 2;
    
    for (int row = 0; row < boardSize; row++) {
      for (int col = 0; col < boardSize; col++) {
        if (board[row][col] == null && hasNeighbor(row, col, range)) {
          moves.add({'row': row, 'col': col});
        }
      }
    }
    
    if (moves.isEmpty) {
      final center = boardSize ~/ 2;
      moves.add({'row': center, 'col': center});
    }
    
    return moves;
  }
  
  bool hasNeighbor(int row, int col, int range) {
    for (int r = math.max(0, row - range); r <= math.min(boardSize - 1, row + range); r++) {
      for (int c = math.max(0, col - range); c <= math.min(boardSize - 1, col + range); c++) {
        if (board[r][c] != null) {
          return true;
        }
      }
    }
    return false;
  }
  
  bool checkWin(int row, int col, String player) {
    final directions = [
      [[0, 1], [0, -1]],
      [[1, 0], [-1, 0]],
      [[1, 1], [-1, -1]],
      [[1, -1], [-1, 1]]
    ];
    
    for (final direction in directions) {
      int count = 1;
      
      for (final [dr, dc] in direction) {
        int r = row + dr;
        int c = col + dc;
        
        while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] == player) {
          count++;
          r += dr;
          c += dc;
        }
      }
      
      if (count >= 5) {
        return true;
      }
    }
    
    return false;
  }
  
  bool checkDraw() {
    for (int row = 0; row < boardSize; row++) {
      for (int col = 0; col < boardSize; col++) {
        if (board[row][col] == null) {
          return false;
        }
      }
    }
    return true;
  }
  
  void endGame(String winner) {
    gameOver.value = true;
    stats['totalGames'] = stats['totalGames']! + 1;
    stopGameTimer();
    
    String message;
    if (winner == 'black') {
      stats['playerWins'] = stats['playerWins']! + 1;
      message = '🎉 恭喜你赢了！';
    } else if (winner == 'white') {
      stats['aiWins'] = stats['aiWins']! + 1;
      message = '😔 AI获胜了，再接再厉！';
    } else {
      message = '🤝 平局！';
    }
    
    saveStats();
    Get.snackbar('游戏结束', message, snackPosition: SnackPosition.TOP);
  }
  
  void undo() {
    if (gameOver.value || moveHistory.length < 2) {
      return;
    }
    
    for (int i = 0; i < 2; i++) {
      if (moveHistory.isNotEmpty) {
        final lastMove = moveHistory.removeLast();
        board[lastMove['row']][lastMove['col']] = null;
        stats['totalMoves'] = stats['totalMoves']! - 1;
      }
    }
    
    if (moveHistory.isNotEmpty) {
      lastMove.value = moveHistory.last;
    } else {
      lastMove.value = null;
    }
    
    currentPlayer.value = 'black';
    updateUI();
  }
  
  void hint() {
    if (gameOver.value || currentPlayer.value != 'black') {
      return;
    }
    
    final move = getTraditionalMove();
    if (move != null) {
      // 这里可以添加提示逻辑，比如高亮显示推荐的位置
      Get.snackbar('提示', '推荐位置：行${move['row']! + 1}，列${move['col']! + 1}');
    }
  }
  
  void restart() {
    createBoard();
    currentPlayer.value = 'black';
    gameOver.value = false;
    moveHistory.clear();
    lastMove.value = null;
    stats['totalMoves'] = 0;
    thinkingLog.clear();
    
    stopGameTimer();
    startGameTimer();
    
    updateUI();
    showAIThinking(false);
  }
  
  void showAIThinking(bool thinking) {
    aiThinking.value = thinking;
    aiStatus.value = thinking ? 'AI思考中...' : 'AI准备就绪';
    
    if (thinking) {
      // 启动动画
      aiAnimationTimer?.cancel();
      aiAnimationTimer = Timer.periodic(const Duration(milliseconds: 50), (timer) {
        aiAnimationValue.value = (aiAnimationValue.value + 0.05) % 1.0;
      });
      addThinkingLog('AI开始分析棋局...');
    } else {
      // 停止动画
      aiAnimationTimer?.cancel();
      aiAnimationValue.value = 0.0;
      addThinkingLog('AI完成思考');
    }
  }
  
  void addThinkingLog(String content) {
    thinkingLog.add({
      'time': DateTime.now().toString().substring(11, 19),
      'content': content
    });
    
    // 保持日志数量限制
    if (thinkingLog.length > 10) {
      thinkingLog.removeAt(0);
    }
  }
  
  void startGameTimer() {
    gameStartTime = DateTime.now();
    moveStartTime = DateTime.now();
    
    gameTimerInterval = Timer.periodic(const Duration(milliseconds: 100), (timer) {
      updateGameTimer();
    });
    
    moveTimerInterval = Timer.periodic(const Duration(milliseconds: 100), (timer) {
      updateMoveTimer();
    });
  }
  
  void stopGameTimer() {
    gameTimerInterval?.cancel();
    moveTimerInterval?.cancel();
    gameTimerInterval = null;
    moveTimerInterval = null;
  }
  
  void resetMoveTimer() {
    moveStartTime = DateTime.now();
  }
  
  void updateGameTimer() {
    if (gameStartTime == null) return;
    final elapsed = DateTime.now().difference(gameStartTime!);
    final minutes = elapsed.inMinutes;
    final seconds = elapsed.inSeconds % 60;
    gameTimer.value = '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }
  
  void updateMoveTimer() {
    if (moveStartTime == null) return;
    final elapsed = DateTime.now().difference(moveStartTime!);
    final minutes = elapsed.inMinutes;
    final seconds = elapsed.inSeconds % 60;
    moveTimer.value = '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }
  
  int getMoveTime() {
    if (moveStartTime == null) return 0;
    return DateTime.now().difference(moveStartTime!).inMilliseconds;
  }
  
  void updateUI() {
    // 触发UI更新
    update();
  }
  
  void saveStats() {
    // 这里可以保存到本地存储
    // SharedPreferences.getInstance().then((prefs) => {
    //   prefs.setString('gomokuStats', jsonEncode(stats))
    // });
  }
  
  void loadStats() {
    // 这里可以从本地存储加载
    // SharedPreferences.getInstance().then((prefs) => {
    //   final saved = prefs.getString('gomokuStats');
    //   if (saved != null) {
    //     stats.value = Map<String, int>.from(jsonDecode(saved));
    //   }
    // });
  }
  
  // 大模型相关方法
  String getBoardState() {
    String state = '';
    for (int row = 0; row < boardSize; row++) {
      for (int col = 0; col < boardSize; col++) {
        if (board[row][col] == 'black') {
          state += '⚫';
        } else if (board[row][col] == 'white') {
          state += '⚪';
        } else {
          state += '⬜';
        }
      }
      state += '\n';
    }
    return state;
  }

  String generatePrompt(String boardState) {
    String difficultyText = difficulty.value == 'easy' ? '初级' : 
                           difficulty.value == 'medium' ? '中级' : '高级';
    
    return '''你是一个五子棋AI对手，当前棋盘状态如下（⚫是黑棋/玩家，⚪是白棋/AI，⬜是空位）：

$boardState

请分析当前局势，选择最佳落子位置。请考虑以下因素：
1. $difficultyText难度水平
2. 进攻和防守的平衡
3. 形成活三、活四的机会
4. 阻止对手形成连线

请以JSON格式回复，包含：
{
    "row": 落子行号(0-14),
    "col": 落子列号(0-14),
    "reasoning": "选择此位置的原因"
}

确保选择的位置是空位（⬜）。''';
  }

  Future<String> callLLMAPI(String prompt) async {
    if (apiKey.value.isEmpty) {
      throw Exception('API密钥未配置');
    }
    
    try {
      logger.d('发送API请求到: ${apiEndpoint.value}');
      logger.d('使用模型: ${model.value}');

      final requestBody = jsonEncode({
        'model': model.value,
        'messages': [
          {
            'role': 'user',
            'content': prompt,
          }
        ],
        'temperature': 0.7,
        'max_tokens': 1000,
      });

      logger.d('请求体: $requestBody');
      
      final response = await http.post(
        Uri.parse(apiEndpoint.value),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${apiKey.value}',
        },
        body: requestBody,
      ).timeout(const Duration(seconds: 60)); // 增加超时时间到60秒

      logger.d('响应状态码: ${response.statusCode}');
      logger.d('响应体: ${response.body}');

      if (response.statusCode == 200) {
        try {
          final responseBody = response.body;
          logger.d('原始响应长度: ${responseBody.length}');
          logger.d('原始响应前100字符: ${responseBody.substring(0, responseBody.length > 100 ? 100 : responseBody.length)}');

          // 检查响应是否为空
          if (responseBody.isEmpty) {
            throw Exception('API返回空响应');
          }

          final data = jsonDecode(responseBody);
          logger.d('解析后的JSON: $data');

          if (data['choices'] != null && data['choices'].isNotEmpty) {
            final content = data['choices'][0]['message']['content'];
            logger.d('提取的内容: $content');
            
            // 检查内容是否为空
            if (content == null || content.isEmpty) {
              throw Exception('API返回空内容');
            }
            
            return content;
          } else {
            logger.e('API响应中没有choices字段');
            throw Exception('API响应格式错误：缺少choices字段');
          }
        } on FormatException catch (e) {
          logger.e('JSON格式错误: $e');
          logger.e('原始响应: ${response.body}');
          throw Exception('JSON格式错误: ${e.message}');
        } catch (e) {
          logger.e('JSON解析失败: $e');
          logger.e('原始响应: ${response.body}');
          throw Exception('JSON解析失败: $e');
        }
      } else {
        logger.e('API请求失败，状态码: ${response.statusCode}');
        logger.e('响应内容: ${response.body}');
        throw Exception('API请求失败，状态码: ${response.statusCode}');
      }
    } catch (e) {
      logger.e('API调用异常: $e');
      throw Exception('API调用失败: $e');
    }
  }

  Map<String, int>? parseLLMResponse(String response) {
    try {
      final data = jsonDecode(response);
      if (data['row'] >= 0 && data['row'] < boardSize && 
          data['col'] >= 0 && data['col'] < boardSize && 
          board[data['row']][data['col']] == null) {
        return {'row': data['row'], 'col': data['col']};
      }
    } catch (error) {
      logger.e('解析LLM响应失败: $error');
    }
    
    return null;
  }

  void logThinking(String prompt, String response, Map<String, int>? move) {
    String reasoning = move != null ? '已选择位置：行${move['row']! + 1}，列${move['col']! + 1}' : '分析中...';
    addThinkingLog('LLM分析完成：$reasoning');
  }

  // 保存API配置
  void saveApiConfig(String endpoint, String key, String modelName) {
    apiEndpoint.value = endpoint;
    apiKey.value = key;
    model.value = modelName;
    showApiConfig.value = false;
    
    addThinkingLog('API配置已保存');
  }
  
  // 切换API配置显示
  void toggleApiConfig() {
    showApiConfig.value = !showApiConfig.value;
  }

  // 测试API连接
  Future<void> testApiConnection() async {
    apiTestStatus.value = '测试连接中...';
    apiTestSuccess.value = false;
    
    try {
      if (apiKey.value.isEmpty) {
        throw Exception('API密钥未配置');
      }
      
      if (model.value.isEmpty) {
        throw Exception('模型名称未配置');
      }
      
      final testPrompt = '请回复：{"test":"ok"}';
      logger.d('开始测试API连接...');

      final response = await callLLMAPI(testPrompt);
      
      if (response.isNotEmpty) {
        apiTestStatus.value = '连接成功！模型: ${model.value}';
        apiTestSuccess.value = true;
        addThinkingLog('API测试成功: ${response.substring(0, 50)}...');
      } else {
        throw Exception('API返回空响应');
      }
    } catch (error) {
      String errorMessage = error.toString();
      
      // 提取更友好的错误信息
      if (errorMessage.contains('Range Error')) {
        errorMessage = '响应数据格式错误，请检查模型参数是否正确';
      } else if (errorMessage.contains('TimeoutException')) {
        errorMessage = '请求超时，请检查网络连接或稍后重试';
      } else if (errorMessage.contains('JSON解析失败')) {
        errorMessage = '响应数据解析失败，请检查API返回格式';
      }
      
      apiTestStatus.value = '连接失败: $errorMessage';
      apiTestSuccess.value = false;
      addThinkingLog('API测试失败: $errorMessage');
    }
  }

  Future<Map<String, int>?> getLLMMove() async {
    try {
      final boardState = getBoardState();
      final prompt = generatePrompt(boardState);
      
      addThinkingLog('开始LLM分析...');
      
      final response = await callLLMAPI(prompt);
      final move = parseLLMResponse(response);
      
      logThinking(prompt, response, move);
      
      return move;
    } catch (error) {
      logger.e('LLM API调用失败: $error');
      addThinkingLog('API调用失败，使用传统算法');
      return getTraditionalMove();
    }
  }
}