import { BaziInput, BaziResult } from "./bazi";
import { GLM46Client, createGLM46Client } from "./glm46";

export interface AIAnalysisRequest {
  baziId: string;
  language?: "zh" | "en";
  aspects?: string[]; // 分析方面，如"career", "marriage", "health"等
  provider?: "deepseek" | "glm46"; // AI提供商选择
}

export interface AIAnalysisResult {
  analysis: string;
  aspects: string[];
  suggestions: string[];
  luckyPeriods: string[];
  warnings: string[];
  provider: string;
}

export async function analyzeBaziWithAI(
  baziInput: BaziInput,
  baziResult: BaziResult,
  language: "zh" | "en" = "zh",
  aspects?: string[],
  provider: "deepseek" | "glm46" = "deepseek",
): Promise<AIAnalysisResult> {
  try {
    let analysis: string;
    let providerName: string;

    if (provider === "glm46") {
      // 使用GLM-4.6进行分析
      const glm46Client = createGLM46Client();
      analysis = await glm46Client.analyzeBazi(
        baziInput,
        baziResult,
        language,
        aspects,
      );
      providerName = "GLM-4.6";
    } else {
      // 使用DeepSeek进行分析（原有逻辑）
      const prompt = buildPrompt(baziInput, baziResult, language, aspects);
      const systemPrompt = getSystemPrompt(language);

      const response = await fetch(
        "https://api.deepseek.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 1500,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      analysis = data.choices[0]?.message?.content || "";
      providerName = "DeepSeek";
    }

    // 解析AI返回的内容
    const result = parseAIResponse(analysis, language, providerName);
    return result;
  } catch (error) {
    console.error(`AI analysis error (${provider}):`, error);

    // 如果指定了provider失败，尝试fallback到另一个provider
    if (provider === "glm46" && process.env.DEEPSEEK_API_KEY) {
      console.log("Falling back to DeepSeek...");
      return analyzeBaziWithAI(
        baziInput,
        baziResult,
        language,
        aspects,
        "deepseek",
      );
    } else if (provider === "deepseek" && process.env.GLM46_API_KEY) {
      console.log("Falling back to GLM-4.6...");
      return analyzeBaziWithAI(
        baziInput,
        baziResult,
        language,
        aspects,
        "glm46",
      );
    }

    throw new Error(
      `Failed to analyze bazi with ${provider}: ${error.message}`,
    );
  }
}

// 新增：仅使用GLM-4.6进行专门分析
export async function analyzeBaziWithGLM46(
  baziInput: BaziInput,
  baziResult: BaziResult,
  language: "zh" | "en" = "zh",
  aspects?: string[],
): Promise<AIAnalysisResult> {
  try {
    const glm46Client = createGLM46Client();
    const analysis = await glm46Client.analyzeBazi(
      baziInput,
      baziResult,
      language,
      aspects,
    );

    const result = parseAIResponse(analysis, language);
    result.provider = "GLM-4.6";
    return result;
  } catch (error) {
    console.error("GLM-4.6 analysis error:", error);
    throw new Error(`Failed to analyze bazi with GLM-4.6: ${error.message}`);
  }
}

// 新增：对比分析功能
export async function compareAIAnalysis(
  baziInput: BaziInput,
  baziResult: BaziResult,
  language: "zh" | "en" = "zh",
  aspects?: string[],
): Promise<{ deepseek: AIAnalysisResult; glm46: AIAnalysisResult }> {
  if (!process.env.DEEPSEEK_API_KEY || !process.env.GLM46_API_KEY) {
    throw new Error(
      "Both DEEPSEEK_API_KEY and GLM46_API_KEY are required for comparison",
    );
  }

  try {
    const [deepseekResult, glm46Result] = await Promise.all([
      analyzeBaziWithAI(baziInput, baziResult, language, aspects, "deepseek"),
      analyzeBaziWithAI(baziInput, baziResult, language, aspects, "glm46"),
    ]);

    return {
      deepseek: deepseekResult,
      glm46: glm46Result,
    };
  } catch (error) {
    console.error("AI comparison error:", error);
    throw new Error(`Failed to compare AI analysis: ${error.message}`);
  }
}

function buildPrompt(
  baziInput: BaziInput,
  baziResult: BaziResult,
  language: "zh" | "en",
  aspects?: string[],
): string {
  if (language === "en") {
    return `
    Please analyze the following Bazi (Four Pillars of Destiny) chart:

    Personal Information:
    - Name: ${baziInput.name || "Unknown"}
    - Gender: ${baziInput.gender}
    - Birth Date: ${baziInput.year}-${baziInput.month}-${baziInput.day} ${baziInput.hour}:${baziInput.minute}

    Bazi Chart:
    - Year Pillar: ${baziResult.yearPillar}
    - Month Pillar: ${baziResult.monthPillar}
    - Day Pillar: ${baziResult.dayPillar}
    - Hour Pillar: ${baziResult.hourPillar}
    - Day Master: ${baziResult.dayMaster}
    - Zodiac: ${baziResult.zodiac}
    - Nayin: ${baziResult.nayin}
    - Season: ${baziResult.season}

    Five Elements Distribution:
    - Wood: ${baziResult.fiveElements["木"]}
    - Fire: ${baziResult.fiveElements["火"]}
    - Earth: ${baziResult.fiveElements["土"]}
    - Metal: ${baziResult.fiveElements["金"]}
    - Water: ${baziResult.fiveElements["水"]}

    ${aspects ? `Please focus on these aspects: ${aspects.join(", ")}` : "Please provide a comprehensive analysis covering career, relationships, health, and wealth."}

    Please provide:
    1. A detailed personality analysis
    2. Strengths and weaknesses
    3. Career prospects
    4. Relationship compatibility
    5. Health considerations
    6. Wealth potential
    7. Lucky periods and colors
    8. Recommendations for balancing the elements
    `;
  } else {
    return `
    请分析以下八字命盘：

    个人信息：
    - 姓名：${baziInput.name || "未知"}
    - 性别：${baziInput.gender === "male" ? "男" : "女"}
    - 出生日期：${baziInput.year}年${baziInput.month}月${baziInput.day}日${baziInput.hour}时${baziInput.minute}分

    八字命盘：
    - 年柱：${baziResult.yearPillar}
    - 月柱：${baziResult.monthPillar}
    - 日柱：${baziResult.dayPillar}
    - 时柱：${baziResult.hourPillar}
    - 日主：${baziResult.dayMaster}
    - 生肖：${baziResult.zodiac}
    - 纳音：${baziResult.nayin}
    - 季节：${baziResult.season}

    五行分布：
    - 木：${baziResult.fiveElements["木"]}
    - 火：${baziResult.fiveElements["火"]}
    - 土：${baziResult.fiveElements["土"]}
    - 金：${baziResult.fiveElements["金"]}
    - 水：${baziResult.fiveElements["水"]}

    ${aspects ? `请重点分析以下方面：${aspects.join("、")}` : "请提供全面分析，包括事业、婚姻、健康和财运等方面。"}

    请提供：
    1. 性格特点分析
    2. 优势与劣势
    3. 事业发展前景
    4. 婚姻情感状况
    5. 健康注意事项
    6. 财运状况
    7. 吉祥时期与颜色
    8. 平衡五行的建议
    `;
  }
}

function getSystemPrompt(language: "zh" | "en"): string {
  if (language === "en") {
    return `
    You are a professional Chinese astrologer and Bazi (Four Pillars of Destiny) expert with deep knowledge of Chinese metaphysics,
    Five Elements theory, and traditional Chinese fortune-telling. Your analysis should be:

    1. Professional and insightful
    2. Balanced and positive, avoiding overly negative predictions
    3. Culturally sensitive and respectful
    4. Practical with actionable advice
    5. Structured with clear sections

    Provide a comprehensive analysis based on the Bazi chart information provided, focusing on giving helpful insights
    rather than deterministic predictions. Emphasize that Bazi is a tool for self-understanding and guidance,
    not absolute fate.
    `;
  } else {
    return `
    你是一位专业的中国占星术大师和八字命理专家，拥有深厚的中国玄学、五行理论和传统算命知识。你的分析应该：

    1. 专业且有洞察力
    2. 平衡积极，避免过于消极的预测
    3. 文化敏感且尊重
    4. 实用且具有可操作性的建议
    5. 结构清晰，分段明确

    基于提供的八字命盘信息进行全面分析，重点提供有用的见解而非决定性预测。强调八字是自我理解和指导的工具，
    而非绝对命运。
    `;
  }
}

function parseAIResponse(
  content: string,
  language: "zh" | "en",
  provider: string = "DeepSeek",
): AIAnalysisResult {
  // 简化处理，实际应用中可能需要更复杂的解析逻辑
  return {
    analysis: content,
    aspects: ["personality", "career", "relationships", "health", "wealth"],
    suggestions:
      language === "en"
        ? [
            "Meditate regularly",
            "Balance your elements",
            "Follow your lucky directions",
          ]
        : ["定期冥想", "平衡五行", "遵循吉祥方向"],
    luckyPeriods:
      language === "en"
        ? ["2025-2026", "2030-2031"]
        : ["2025-2026年", "2030-2031年"],
    warnings:
      language === "en"
        ? [
            "Avoid risky investments in 2024",
            "Pay attention to health in autumn",
          ]
        : ["2024年避免风险投资", "秋季注意健康"],
    provider,
  };
}
