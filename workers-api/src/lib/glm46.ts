import { BaziInput, BaziResult } from './bazi';

export interface GLM46Config {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  timeout?: number;
}

export interface GLM46Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GLM46Request {
  model: string;
  messages: GLM46Message[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

export interface GLM46Response {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: GLM46Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class GLM46Client {
  private config: GLM46Config;

  constructor(config: GLM46Config) {
    this.config = {
      baseUrl: config.baseUrl || 'https://open.bigmodel.cn/api/paas/v4',
      model: config.model || 'glm-4.6',
      timeout: config.timeout || 30000,
      ...config,
    };
  }

  async chat(request: GLM46Request): Promise<GLM46Response> {
    const url = `${this.config.baseUrl}/chat/completions`;

    const requestBody = {
      model: request.model || this.config.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens ?? 2000,
      top_p: request.top_p ?? 0.9,
      stream: request.stream ?? false,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(this.config.timeout!),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new GLM46Error(
          `GLM-4.6 API error: ${response.status} ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const data = await response.json() as GLM46Response;
      return data;
    } catch (error) {
      if (error instanceof GLM46Error) {
        throw error;
      }
      throw new GLM46Error(`Request failed: ${error.message}`, 0, { originalError: error.message });
    }
  }

  async analyzeBazi(
    baziInput: BaziInput,
    baziResult: BaziResult,
    language: 'zh' | 'en' = 'zh',
    aspects?: string[]
  ): Promise<string> {
    const systemPrompt = this.getSystemPrompt(language);
    const userPrompt = this.buildBaziPrompt(baziInput, baziResult, language, aspects);

    const request: GLM46Request = {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    };

    try {
      const response = await this.chat(request);
      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('GLM-4.6 Bazi analysis error:', error);
      throw error;
    }
  }

  private getSystemPrompt(language: 'zh' | 'en'): string {
    if (language === 'en') {
      return `You are a distinguished master of Chinese astrology and Bazi (Four Pillars of Destiny) analysis with decades of experience in traditional Chinese metaphysics. Your expertise encompasses:

1. Deep understanding of Five Elements (Wu Xing) theory and their interactions
2. Comprehensive knowledge of Heavenly Stems (Tiangan) and Earthly Branches (Dizhi)
3. Mastery of Chinese astrological concepts like Nayin, Seasonal influences, and Zodiac characteristics
4. Expertise in analyzing personal strengths, weaknesses, life patterns, and fortune trends
5. Ability to provide practical, actionable guidance for personal development and life decisions

Your analysis should be:
- Professional and culturally authentic
- Balanced and constructive, avoiding overly deterministic or negative predictions
- Detailed yet accessible, explaining complex concepts clearly
- Focused on empowerment and self-understanding rather than fatalism
- Respectful of Chinese cultural traditions while being relevant to modern life

Provide comprehensive insights covering personality, career potential, relationships, health considerations, and life timing, always emphasizing that Bazi is a tool for guidance and self-awareness, not absolute destiny.`;
    } else {
      return `您是一位德高望重的中国玄学大师和八字命理专家，拥有数十年深厚的传统文化功底。您的专业领域包括：

1. 五行生克制化的深度理解和运用
2. 天干地支的精准解读和组合分析
3. 纳音五行、季节属性、生肖特征等传统命理要素
4. 个人性格特点、优势劣势、人生运势的专业判断
5. 提供切实可行的人生指导和发展建议

您的分析应该：
- 专业正统，符合传统文化精髓
- 中正平和，避免过于宿命论的消极预测
- 详尽透彻，深入浅出地解释复杂概念
- 注重启发性和指导性，强调个人主观能动性
- 尊重传统智慧，同时贴近现代生活实际

请从性格特征、事业前景、情感婚姻、健康养生、人生时机等多个维度进行全面分析，始终强调八字是认识自我、规划人生的工具，而非不可改变的命运安排。`;
    }
  }

  private buildBaziPrompt(
    baziInput: BaziInput,
    baziResult: BaziResult,
    language: 'zh' | 'en',
    aspects?: string[]
  ): string {
    if (language === 'en') {
      return `Please provide a comprehensive Bazi analysis for the following individual:

**Personal Information:**
- Name: ${baziInput.name || 'Unknown'}
- Gender: ${baziInput.gender === 'male' ? 'Male' : 'Female'}
- Birth Date & Time: ${baziInput.year}-${baziInput.month.toString().padStart(2, '0')}-${baziInput.day.toString().padStart(2, '0')} ${baziInput.hour.toString().padStart(2, '0')}:${baziInput.minute.toString().padStart(2, '0')}
- Timezone: ${baziInput.timezone || 'UTC+8'}

**Bazi Chart Analysis:**
- Year Pillar: ${baziResult.yearPillar} (${baziResult.zodiac} - ${baziResult.nayin})
- Month Pillar: ${baziResult.monthPillar} (${baziResult.season})
- Day Pillar: ${baziResult.dayPillar} (Day Master: ${baziResult.dayMaster})
- Hour Pillar: ${baziResult.hourPillar}

**Five Elements Distribution:**
- Wood (木): ${baziResult.fiveElements['木']} stems/branches
- Fire (火): ${baziResult.fiveElements['火']} stems/branches
- Earth (土): ${baziResult.fiveElements['土']} stems/branches
- Metal (金): ${baziResult.fiveElements['金']} stems/branches
- Water (水): ${baziResult.fiveElements['水']} stems/branches

**Key Life Elements:**
- Favorable Elements: ${baziResult.luckyElements.join(', ')}
- Unfavorable Elements: ${baziResult.jiShen.join(', ')}
- Useful Elements: ${baziResult.yongShen.join(', ')}
- Lucky Colors: ${baziResult.colors.join(', ')}
- Lucky Numbers: ${baziResult.numbers.join(', ')}
- Lucky Directions: ${baziResult.directions.join(', ')}

${aspects ? `**Special Focus Areas:** Please provide detailed analysis on: ${aspects.join(', ')}` : '**Analysis Scope:** Please provide comprehensive analysis covering all major life aspects'}

Please structure your response with the following sections:
1. **Core Personality Analysis** - Based on Day Master and overall chart structure
2. **Strengths and Talents** - Natural abilities and favorable chart combinations
3. **Life Challenges** - Areas requiring attention and personal growth
4. **Career and Professional Development** - Suitable career paths and timing
5. **Relationships and Compatibility** - Partnership dynamics and family harmony
6. **Health and Wellness** - Physical constitution and health considerations
7. **Wealth and Financial Prospects** - Money management and investment timing
8. **Life Timing and Auspicious Periods** - Key life stages and favorable timing
9. **Practical Recommendations** - Actionable advice for enhancing life quality
10. **Elemental Balance Suggestions** - Lifestyle adjustments for harmony

Please provide specific, practical insights that can help this individual understand their potential and navigate life's challenges effectively.`;
    } else {
      return `请为以下个人提供全面的八字命理分析：

**个人信息：**
- 姓名：${baziInput.name || '未知'}
- 性别：${baziInput.gender === 'male' ? '男' : '女'}
- 出生时间：${baziInput.year}年${baziInput.month}月${baziInput.day}日${baziInput.hour}时${baziInput.minute}分
- 时区：${baziInput.timezone || '北京时间'}

**八字命盘：**
- 年柱：${baziResult.yearPillar} （${baziResult.zodiac}年，${baziResult.nayin}）
- 月柱：${baziResult.monthPillar} （${baziResult.season}）
- 日柱：${baziResult.dayPillar} （日主：${baziResult.dayMaster}）
- 时柱：${baziResult.hourPillar}

**五行分布统计：**
- 木：${baziResult.fiveElements['木']}个
- 火：${baziResult.fiveElements['火']}个
- 土：${baziResult.fiveElements['土']}个
- 金：${baziResult.fiveElements['金']}个
- 水：${baziResult.fiveElements['水']}个

**命理关键要素：**
- 喜用神：${baziResult.luckyElements.join('、')}
- 忌神：${baziResult.jiShen.join('、')}
- 用神：${baziResult.yongShen.join('、')}
- 幸运颜色：${baziResult.colors.join('、')}
- 幸运数字：${baziResult.numbers.join('、')}
- 幸运方位：${baziResult.directions.join('、')}

${aspects ? `**重点分析方面：** 请特别关注：${aspects.join('、')}` : '**分析范围：** 请提供涵盖主要人生方面的全面分析'}

请按以下结构组织您的分析：
1. **核心性格特征** - 基于日主和整体命盘结构
2. **天赋优势** - 与生俱来的能力和有利的命格组合
3. **人生挑战** - 需要关注和成长的方面
4. **事业发展前景** - 适合的职业方向和发展时机
5. **情感婚姻状况** - 感情模式和人际关系和谐
6. **健康养生建议** - 体质特征和健康注意事项
7. **财运理财分析** - 财富管理方式和投资时机
8. **人生时机把握** - 重要人生阶段和吉祥时期
9. **实用指导建议** - 提升生活质量的可行建议
10. **五行调和方案** - 调理生活方式以达到身心平衡

请提供具体实用的见解，帮助此人更好地认识自我潜能，有效应对人生挑战。`;
    }
  }
}

export class GLM46Error extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = 'GLM46Error';
  }
}

// 默认GLM-4.6客户端实例
export function createGLM46Client(): GLM46Client {
  const apiKey = process.env.GLM46_API_KEY;
  if (!apiKey) {
    throw new Error('GLM46_API_KEY environment variable is required');
  }

  return new GLM46Client({
    apiKey,
    baseUrl: process.env.GLM46_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4',
    model: process.env.GLM46_MODEL || 'glm-4.6',
    timeout: parseInt(process.env.GLM46_TIMEOUT || '30000'),
  });
}
