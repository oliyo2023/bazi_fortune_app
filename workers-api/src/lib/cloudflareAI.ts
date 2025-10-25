import { Env } from "../lib/auth";

interface CloudflareAIResponse {
  result?: {
    response: string;
  };
  success?: boolean;
  errors?: Array<{
    code: number;
    message: string;
  }>;
}

interface AIAnalysisRequest {
  baziData: any;
  analysisType:
    | "fortune"
    | "career"
    | "relationship"
    | "health"
    | "comprehensive";
  language?: "zh" | "en";
  additionalContext?: string;
}

// 八字分析提示词模板
const BAZI_ANALYSIS_PROMPTS = {
  zh: {
    fortune: `作为一名专业的八字算命大师，请根据以下八字信息进行详细的运势分析：

八字信息：
{baziData}

请从以下方面进行分析：
1. 命局整体评价
2. 五行强弱分析
3. 大运流年运势
4. 财运分析
5. 事业运
6. 感情运
7. 健康运势
8. 开运建议

请用专业但易懂的语言进行分析，给出具体实用的建议。`,

    career: `请根据以下八字信息，专门分析事业发展前景：

八字信息：
{baziData}

请分析：
1. 事业运势总体走向
2. 适合的行业方向
3. 创业还是就业更适合
4. 发展的黄金时期
5. 需要注意的职业风险
6. 提升事业运的具体方法
7. 与同事、上司的关系处理`,

    relationship: `请根据以下八字信息，分析感情婚姻状况：

八字信息：
{baziData}

请分析：
1. 婚姻运势总体评价
2. 适合的伴侣类型
3. 感情发展的最佳时机
4. 可能遇到的挑战
5. 婚后生活和谐度
6. 子女缘分
7. 维护感情关系的方法`,

    health: `请根据以下八字信息，进行健康状况分析：

八字信息：
{baziData}

请分析：
1. 身体素质总体评价
2. 易患疾病类型
3. 健康的薄弱时期
4. 预防保健建议
5. 运动调理方案
6. 饮食注意事项
7. 心理健康维护`,

    comprehensive: `请根据以下八字信息，进行全面的命运分析：

八字信息：
{baziData}
{additionalContext}

请提供完整的生命分析报告，包括：
1. 命局特点和格局
2. 五行生克关系
3. 性格特征分析
4. 人生各阶段运势
5. 事业财运发展
6. 感情婚姻状况
7. 健康养生建议
8. 开运改运方法
9. 重要年份提醒
10. 人生指导建议`,
  },

  en: {
    fortune: `As a professional Bazi fortune teller, please provide a detailed fortune analysis based on the following Bazi information:

Bazi Data:
{baziData}

Please analyze the following aspects:
1. Overall destiny evaluation
2. Five Elements strength analysis
3. Major luck and yearly fortune
4. Wealth fortune
5. Career prospects
6. Relationship fortune
7. Health fortune
8. Luck enhancement suggestions

Please use professional but understandable language and provide specific, practical advice.`,

    career: `Please analyze career development prospects based on the following Bazi information:

Bazi Data:
{baziData}

Please analyze:
1. Overall career fortune trend
2. Suitable industry directions
3. Entrepreneurship vs employment
4. Golden development periods
5. Potential career risks
6. Specific methods to enhance career luck
7. Relationship handling with colleagues and superiors`,

    relationship: `Please analyze relationship and marriage status based on the following Bazi information:

Bazi Data:
{baziData}

Please analyze:
1. Overall marriage fortune evaluation
2. Suitable partner types
3. Best timing for relationship development
4. Potential challenges
5. Post-marriage harmony
6. Children's fate
7. Methods to maintain relationship harmony`,

    health: `Please conduct health analysis based on the following Bazi information:

Bazi Data:
{baziData}

Please analyze:
1. Overall physical fitness evaluation
2. Types of illnesses prone to
3. Periods of health vulnerability
4. Preventive health suggestions
5. Exercise conditioning plans
6. Dietary considerations
7. Mental health maintenance`,

    comprehensive: `Please provide a comprehensive destiny analysis based on the following Bazi information:

Bazi Data:
{baziData}
{additionalContext}

Please provide a complete life analysis report including:
1. Destiny characteristics and pattern
2. Five Elements relationships
3. Personality trait analysis
4. Life stages fortune
5. Career and wealth development
6. Relationship and marriage status
7. Health and wellness advice
8. Luck enhancement methods
9. Important year reminders
10. Life guidance suggestions`,
  },
};

// 调用Cloudflare Workers AI进行八字分析
export async function analyzeBaziWithAI(
  request: AIAnalysisRequest,
  env: Env,
): Promise<string> {
  try {
    // 构建提示词
    const prompt = buildAnalysisPrompt(request);

    // 调用Cloudflare AI
    const response = await callCloudflareAI(prompt, env);

    if (!response.success || !response.result?.response) {
      throw new Error("AI analysis failed");
    }

    return response.result.response;
  } catch (error) {
    console.error("Bazi AI analysis error:", error);
    throw new Error("Failed to analyze Bazi with AI");
  }
}

// 构建分析提示词
function buildAnalysisPrompt(request: AIAnalysisRequest): string {
  const {
    baziData,
    analysisType,
    language = "zh",
    additionalContext,
  } = request;

  const prompts = BAZI_ANALYSIS_PROMPTS[language][analysisType];

  // 格式化八字数据为可读字符串
  const baziDataStr = formatBaziData(baziData, language);

  // 替换占位符
  let prompt = prompts
    .replace("{baziData}", baziDataStr)
    .replace("{additionalContext}", additionalContext || "");

  return prompt;
}

// 格式化八字数据
function formatBaziData(baziData: any, language: "zh" | "en"): string {
  try {
    if (typeof baziData === "string") {
      return baziData;
    }

    // 根据不同语言格式化
    if (language === "zh") {
      return `
生辰八字：
- 出生年份：${baziData.year}年
- 出生月份：${baziData.month}月
- 出生日期：${baziData.day}日
- 出生时辰：${baziData.hour}时

八字排盘：
- 年柱：${baziData.yearPillar || "未计算"}
- 月柱：${baziData.monthPillar || "未计算"}
- 日柱：${baziData.dayPillar || "未计算"}
- 时柱：${baziData.hourPillar || "未计算"}

五行分析：
${
  baziData.fiveElements
    ? Object.entries(baziData.fiveElements)
        .map(
          ([element, strength]: [string, any]) => `- ${element}：${strength}`,
        )
        .join("\n")
    : "未计算"
}
      `;
    } else {
      return `
Bazi Information:
- Birth Year: ${baziData.year}
- Birth Month: ${baziData.month}
- Birth Day: ${baziData.day}
- Birth Hour: ${baziData.hour}

Bazi Pillars:
- Year Pillar: ${baziData.yearPillar || "Not calculated"}
- Month Pillar: ${baziData.monthPillar || "Not calculated"}
- Day Pillar: ${baziData.dayPillar || "Not calculated"}
- Hour Pillar: ${baziData.hourPillar || "Not calculated"}

Five Elements Analysis:
${
  baziData.fiveElements
    ? Object.entries(baziData.fiveElements)
        .map(
          ([element, strength]: [string, any]) => `- ${element}: ${strength}`,
        )
        .join("\n")
    : "Not calculated"
}
      `;
    }
  } catch (error) {
    console.error("Format Bazi data error:", error);
    return JSON.stringify(baziData, null, 2);
  }
}

// 调用Cloudflare Workers AI
async function callCloudflareAI(
  prompt: string,
  env: Env,
): Promise<CloudflareAIResponse> {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "你是一位专业的八字算命大师，具有深厚的命理学知识和丰富的实战经验。请用专业、准确、易懂的语言为用户提供八字分析服务。",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 2000,
          temperature: 0.7,
          stream: false,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Cloudflare AI API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as CloudflareAIResponse;

    if (data.errors && data.errors.length > 0) {
      throw new Error(`Cloudflare AI error: ${data.errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error("Call Cloudflare AI error:", error);
    throw error;
  }
}

// 批量分析多个八字
export async function batchAnalyzeBazi(
  requests: AIAnalysisRequest[],
  env: Env,
): Promise<Array<{ index: number; result: string; error?: string }>> {
  const results = [];

  // 并行处理多个请求，但限制并发数
  const batchSize = 3; // Cloudflare AI限制

  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);

    const batchPromises = batch.map(async (request, index) => {
      try {
        const result = await analyzeBaziWithAI(request, env);
        return { index: i + index, result };
      } catch (error) {
        return {
          index: i + index,
          result: "",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // 添加延迟以避免速率限制
    if (i + batchSize < requests.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}

// AI分析缓存
export async function getCachedAnalysis(
  request: AIAnalysisRequest,
  env: Env,
): Promise<string | null> {
  try {
    const cacheKey = generateAnalysisCacheKey(request);
    const cached = await env.CACHE.get(cacheKey);
    return cached;
  } catch (error) {
    console.error("Get cached analysis error:", error);
    return null;
  }
}

// 缓存AI分析结果
export async function cacheAnalysis(
  request: AIAnalysisRequest,
  result: string,
  env: Env,
  ttl: number = 86400, // 24小时
): Promise<void> {
  try {
    const cacheKey = generateAnalysisCacheKey(request);
    await env.CACHE.put(cacheKey, result, { expirationTtl: ttl });
  } catch (error) {
    console.error("Cache analysis error:", error);
  }
}

// 生成分析缓存键
function generateAnalysisCacheKey(request: AIAnalysisRequest): string {
  const { baziData, analysisType, language = "zh" } = request;

  // 创建基于八字数据的哈希
  const dataHash = hashObject(baziData);

  return `ai_analysis:${analysisType}:${language}:${dataHash}`;
}

// 对象哈希函数
function hashObject(obj: any): string {
  const str = JSON.stringify(obj, Object.keys(obj).sort());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// AI分析质量评估
export function evaluateAnalysisQuality(analysis: string): {
  score: number;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // 检查长度
  if (analysis.length < 200) {
    issues.push("分析内容过于简短");
    score -= 20;
  }

  if (analysis.length > 3000) {
    issues.push("分析内容过长");
    score -= 10;
  }

  // 检查结构
  const hasStructure = /\d+\.|第.+、|【|】/.test(analysis);
  if (!hasStructure) {
    issues.push("缺乏结构化的分析框架");
    score -= 15;
    suggestions.push("建议使用数字或标题来组织分析内容");
  }

  // 检查关键词
  const keywords = ["五行", "命局", "运势", "大运", "流年"];
  const hasKeywords = keywords.some((keyword) => analysis.includes(keyword));
  if (!hasKeywords) {
    issues.push("缺乏专业术语");
    score -= 10;
    suggestions.push("建议包含更多八字专业术语");
  }

  // 检查建议
  const hasSuggestions = /建议|应该|宜|忌/.test(analysis);
  if (!hasSuggestions) {
    issues.push("缺乏具体的行动建议");
    score -= 15;
    suggestions.push("建议为用户提供具体的开运改运建议");
  }

  return {
    score: Math.max(0, score),
    issues,
    suggestions,
  };
}
