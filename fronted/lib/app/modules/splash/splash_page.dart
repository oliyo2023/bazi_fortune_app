import 'dart:math';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../routes/app_pages.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _textController;
  late AnimationController _bgController;
  late AnimationController _loadingController;

  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoFadeAnimation;
  late Animation<Offset> _textSlideAnimation;
  late Animation<double> _textFadeAnimation;
  late Animation<double> _loadingAnimation;

  final List<_Particle> _particles = [];
  late Random _random;

  @override
  void initState() {
    super.initState();
    _random = Random();
    _initParticles();
    _initAnimations();
    _navigateToHome();
  }

  void _initParticles() {
    for (int i = 0; i < 20; i++) {
      _particles.add(
        _Particle(
          x: _random.nextDouble(),
          y: _random.nextDouble(),
          size: _random.nextDouble() * 6 + 2,
          speed: _random.nextDouble() * 0.5 + 0.2,
          opacity: _random.nextDouble() * 0.5 + 0.3,
        ),
      );
    }
  }

  void _initAnimations() {
    _logoController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );

    _textController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );

    _bgController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..repeat();

    _loadingController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();

    _logoScaleAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _logoController, curve: Curves.elasticOut),
    );

    _logoFadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _logoController,
        curve: const Interval(0.0, 0.5, curve: Curves.easeIn),
      ),
    );

    _textSlideAnimation =
        Tween<Offset>(begin: const Offset(-1.5, 0), end: Offset.zero).animate(
          CurvedAnimation(parent: _textController, curve: Curves.easeOutCubic),
        );

    _textFadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _textController, curve: Curves.easeIn));

    _loadingAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _loadingController, curve: Curves.easeInOut),
    );

    _logoController.forward();
    Future.delayed(const Duration(milliseconds: 300), () {
      _textController.forward();
    });
  }

  Future<void> _navigateToHome() async {
    await Future.delayed(const Duration(milliseconds: 3000));
    if (mounted) {
      Get.offAllNamed(Routes.main);
    }
  }

  @override
  void dispose() {
    _logoController.dispose();
    _textController.dispose();
    _bgController.dispose();
    _loadingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(children: [_buildAnimatedBackground(), _buildContent()]),
    );
  }

  Widget _buildAnimatedBackground() {
    return AnimatedBuilder(
      animation: _bgController,
      builder: (context, child) {
        return Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xFF1a1a2e),
                Color(0xFF16213e),
                Color(0xFF0f3460),
                Color(0xFF1a1a2e),
              ],
              stops: [0.0, 0.3, 0.7, 1.0],
            ),
          ),
          child: CustomPaint(
            painter: _ParticlePainter(
              particles: _particles,
              animation: _bgController.value,
            ),
            size: Size.infinite,
          ),
        );
      },
    );
  }

  Widget _buildContent() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _buildLogo(),
          const SizedBox(height: 32),
          _buildTitle(),
          const SizedBox(height: 16),
          _buildSubtitle(),
          const SizedBox(height: 60),
          _buildLoading(),
        ],
      ),
    );
  }

  Widget _buildLogo() {
    return AnimatedBuilder(
      animation: _logoController,
      builder: (context, child) {
        return Opacity(
          opacity: _logoFadeAnimation.value,
          child: Transform.scale(
            scale: _logoScaleAnimation.value,
            child: Container(
              width: 140,
              height: 140,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Color(0xFF667eea),
                    Color(0xFF764ba2),
                    Color(0xFFf093fb),
                  ],
                ),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF667eea).withValues(alpha: 0.5),
                    blurRadius: 30,
                    spreadRadius: 5,
                  ),
                  BoxShadow(
                    color: const Color(0xFFf093fb).withValues(alpha: 0.3),
                    blurRadius: 60,
                    spreadRadius: 10,
                  ),
                ],
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 120,
                    height: 120,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: Colors.white.withValues(alpha: 0.3),
                        width: 2,
                      ),
                    ),
                  ),
                  const Icon(Icons.auto_awesome, size: 60, color: Colors.white),
                  Positioned(right: 20, top: 20, child: _buildSparkle()),
                  Positioned(left: 15, bottom: 25, child: _buildSparkle()),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildSparkle() {
    return AnimatedBuilder(
      animation: _loadingController,
      builder: (context, child) {
        return Transform.rotate(
          angle: _loadingController.value * 2 * pi,
          child: Icon(
            Icons.stars,
            size: 16,
            color: Colors.white.withValues(alpha: 0.8),
          ),
        );
      },
    );
  }

  Widget _buildTitle() {
    return SlideTransition(
      position: _textSlideAnimation,
      child: FadeTransition(
        opacity: _textFadeAnimation,
        child: ShaderMask(
          shaderCallback: (bounds) => const LinearGradient(
            colors: [Color(0xFF667eea), Color(0xFFf093fb), Color(0xFFf5576c)],
          ).createShader(bounds),
          child: const Text(
            'AI八字算命',
            style: TextStyle(
              fontSize: 42,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              letterSpacing: 4,
              shadows: [Shadow(color: Color(0xFF667eea), blurRadius: 20)],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSubtitle() {
    return FadeTransition(
      opacity: _textFadeAnimation,
      child: const Text(
        '智能解读 · 洞悉命运',
        style: TextStyle(fontSize: 18, color: Colors.white70, letterSpacing: 8),
      ),
    );
  }

  Widget _buildLoading() {
    return AnimatedBuilder(
      animation: _loadingController,
      builder: (context, child) {
        return Column(
          children: [
            SizedBox(
              width: 50,
              height: 50,
              child: CustomPaint(
                painter: _LoadingPainter(progress: _loadingAnimation.value),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              _getLoadingText(),
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withValues(alpha: 0.6),
                letterSpacing: 2,
              ),
            ),
          ],
        );
      },
    );
  }

  String _getLoadingText() {
    final texts = ['解读命运中', '分析八字中', '计算运势中', '生成命理中'];
    final index = (_loadingAnimation.value * texts.length).floor();
    return texts[index % texts.length];
  }
}

class _Particle {
  double x;
  double y;
  double size;
  double speed;
  double opacity;

  _Particle({
    required this.x,
    required this.y,
    required this.size,
    required this.speed,
    required this.opacity,
  });
}

class _ParticlePainter extends CustomPainter {
  final List<_Particle> particles;
  final double animation;

  _ParticlePainter({required this.particles, required this.animation});

  @override
  void paint(Canvas canvas, Size size) {
    for (var particle in particles) {
      final y = (particle.y + animation * particle.speed) % 1.0;
      final paint = Paint()
        ..color = Colors.white.withValues(alpha: particle.opacity)
        ..style = PaintingStyle.fill;

      canvas.drawCircle(
        Offset(particle.x * size.width, y * size.height),
        particle.size,
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _ParticlePainter oldDelegate) => true;
}

class _LoadingPainter extends CustomPainter {
  final double progress;

  _LoadingPainter({required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - 4;

    final backgroundPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.2)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3;

    canvas.drawCircle(center, radius, backgroundPaint);

    final gradient = SweepGradient(
      startAngle: -pi / 2,
      endAngle: 3 * pi / 2,
      colors: const [
        Color(0xFF667eea),
        Color(0xFFf093fb),
        Color(0xFFf5576c),
        Color(0xFF667eea),
      ],
    );

    final foregroundPaint = Paint()
      ..shader = gradient.createShader(
        Rect.fromCircle(center: center, radius: radius),
      )
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3
      ..strokeCap = StrokeCap.round;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -pi / 2,
      progress * 2 * pi,
      false,
      foregroundPaint,
    );
  }

  @override
  bool shouldRepaint(covariant _LoadingPainter oldDelegate) =>
      oldDelegate.progress != progress;
}
