#!/usr/bin/env node

// 直接测试GLM-4.6模块
const path = require('path');

console.log('🔍 测试GLM-4.6模块加载...\n');

try {
  // 检查文件是否存在
  const fs = require('fs');
  const glm46Path = path.join(__dirname, 'src/lib/glm46.ts');

  if (fs.existsSync(glm46Path)) {
    console.log('✅ GLM-4.6模块文件存在');

    // 读取文件内容
    const content = fs.readFileSync(glm46Path, 'utf8');

    // 检查关键函数和类
    const checks = [
      { name: 'GLM46Client', pattern: /class GLM46Client/ },
      { name: 'createGLM46Client', pattern: /function createGLM46Client/ },
      { name: 'analyzeBazi', pattern: /analyzeBazi/ },
      { name: 'API配置', pattern: /https:\/\/open\.bigmodel\.cn/ },
      { name: '错误处理', pattern: /GLM46Error/ },
      { name: 'TypeScript类型', pattern: /interface GLM46Config/ }
    ];

    console.log('\n📋 模块内容检查:');
    checks.forEach(check => {
      if (check.pattern.test(content)) {
        console.log(`✅ ${check.name}`);
      } else {
        console.log(`❌ ${check.name} - 未找到`);
      }
    });

    // 检查文件大小
    const stats = fs.statSync(glm46Path);
    console.log(`\n📊 文件大小: ${stats.size} bytes`);

  } else {
    console.log('❌ GLM-4.6模块文件不存在');
  }

  // 检查AI集成文件
  const aiPath = path.join(__dirname, 'src/lib/ai.ts');
  if (fs.existsSync(aiPath)) {
    console.log('\n✅ AI集成文件存在');
    const aiContent = fs.readFileSync(aiPath, 'utf8');

    if (aiContent.includes('glm46')) {
      console.log('✅ AI模块已包含GLM-4.6集成');
    }
    if (aiContent.includes('analyzeBaziWithGLM46')) {
      console.log('✅ GLM-4.6专门分析函数已添加');
    }
  }

  // 检查路由文件
  const routesPath = path.join(__dirname, 'src/routes/bazi.ts');
  if (fs.existsSync(routesPath)) {
    console.log('\n✅ 八字路由文件存在');
    const routesContent = fs.readFileSync(routesPath, 'utf8');

    const routeChecks = [
      { name: 'GLM-4.6分析端点', pattern: /\/analyze-glm46/ },
      { name: '对比分析端点', pattern: /\/compare/ },
      { name: '完整分析端点', pattern: /\/full-analysis/ }
    ];

    console.log('\n📋 路由检查:');
    routeChecks.forEach(check => {
      if (check.pattern.test(routesContent)) {
        console.log(`✅ ${check.name}`);
      } else {
        console.log(`❌ ${check.name} - 未找到`);
      }
    });
  }

  console.log('\n🎉 GLM-4.6模块测试完成！');

} catch (error) {
  console.error('❌ 测试过程中发生错误:', error.message);
}
