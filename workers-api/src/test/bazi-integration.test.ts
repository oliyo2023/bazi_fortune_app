import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeBaziWithAI, analyzeBaziWithGLM46, compareAIAnalysis } from '../lib/bazi';
import { BaziInput } from '../lib/bazi';

// Mock AI functions
vi.mock('../lib/ai', () => ({
  analyzeBaziWithAI: vi.fn(),
  analyzeBaziWithGLM46: vi.fn(),
  compareAIAnalysis: vi.fn(),
}));

import { analyzeBaziWithAI as mockAnalyzeBaziWithAI,
         analyzeBaziWithGLM46 as mockAnalyzeBaziWithGLM46,
         compareAIAnalysis as mockCompareAIAnalysis } from '../lib/ai';

describe('Bazi Integration', () => {
  const mockBaziInput: BaziInput = {
    year: 1990,
    month: 5,
    day: 15,
    hour: 10,
    minute: 30,
    gender: 'male',
    name: 'Test User',
  };

  const mockBaziResult = {
    yearPillar: '庚午',
    monthPillar: '辛巳',
    dayPillar: '甲辰',
    hourPillar: '己巳',
    dayMaster: '甲',
    zodiac: '马',
    nayin: '路旁土',
    season: '夏季',
    solarTerms: ['立夏', '小满'],
    lunarDate: '农历四月廿二',
    fiveElements: {
      '木': 2,
      '火': 2,
      '土': 1,
      '金': 2,
      '水': 1,
    },
    shiShen: {
      '年': '七杀',
      '月': '正官',
      '日': '日主',
      '时': '伤官',
    },
    yongShen: ['水', '木'],
    xiShen: ['水', '木'],
    jiShen: ['金', '土'],
    luckyElements: ['水', '木', '火'],
    colors: ['黑色', '蓝色', '绿色', '红色'],
    numbers: [1, 6, 3, 8, 2, 7],
    directions: ['北方', '东方', '南方'],
  };

  const mockAIAnalysis = {
    analysis: 'AI分析结果',
    aspects: ['personality', 'career'],
    suggestions: ['建议1', '建议2'],
    luckyPeriods: ['2025-2026'],
    warnings: ['注意健康'],
    provider: 'DeepSeek',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('analyzeBaziWithAI', () => {
    it('should call AI analysis with correct parameters', async () => {
      const expectedResult = {
        baziResult: mockBaziResult,
        aiAnalysis: mockAIAnalysis,
      };

      (mockAnalyzeBaziWithAI as any).mockResolvedValue(expectedResult);

      const result = await analyzeBaziWithAI(mockBaziInput, 'zh', ['career']);

      expect(mockAnalyzeBaziWithAI).toHaveBeenCalledWith(
        mockBaziInput,
        mockBaziResult,
        'zh',
        ['career'],
        'deepseek' // default provider
      );
      expect(result).toEqual(expectedResult);
    });

    it('should use specified AI provider', async () => {
      const inputWithProvider = {
        ...mockBaziInput,
        aiProvider: 'glm46' as const,
      };

      const expectedResult = {
        baziResult: mockBaziResult,
        aiAnalysis: { ...mockAIAnalysis, provider: 'GLM-4.6' },
      };

      (mockAnalyzeBaziWithAI as any).mockResolvedValue(expectedResult);

      const result = await analyzeBaziWithAI(inputWithProvider, 'en');

      expect(mockAnalyzeBaziWithAI).toHaveBeenCalledWith(
        inputWithProvider,
        mockBaziResult,
        'en',
        undefined,
        'glm46' // specified provider
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('analyzeBaziWithGLM46', () => {
    it('should call GLM-4.6 specific analysis', async () => {
      const expectedResult = {
        baziResult: mockBaziResult,
        aiAnalysis: { ...mockAIAnalysis, provider: 'GLM-4.6' },
      };

      (mockAnalyzeBaziWithGLM46 as any).mockResolvedValue(expectedResult);

      const result = await analyzeBaziWithGLM46(mockBaziInput, 'zh', ['health']);

      expect(mockAnalyzeBaziWithGLM46).toHaveBeenCalledWith(
        mockBaziInput,
        mockBaziResult,
        'zh',
        ['health']
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('compareBaziAnalysis', () => {
    it('should call comparison analysis', async () => {
      const mockComparison = {
        deepseek: mockAIAnalysis,
        glm46: { ...mockAIAnalysis, provider: 'GLM-4.6' },
      };

      const expectedResult = {
        baziResult: mockBaziResult,
        comparison: mockComparison,
      };

      (mockCompareAIAnalysis as any).mockResolvedValue(expectedResult);

      const result = await compareAIAnalysis(mockBaziInput, 'zh', ['career', 'marriage']);

      expect(mockCompareAIAnalysis).toHaveBeenCalledWith(
        mockBaziInput,
        mockBaziResult,
        'zh',
        ['career', 'marriage']
      );
      expect(result).toEqual(expectedResult);
    });
  });
});

describe('Bazi API Integration', () => {
  describe('Route integration tests', () => {
    // These would be integration tests that test the actual API routes
    // For now, we'll just outline what they would test

    it('should POST /bazi/analyze with DeepSeek provider', () => {
      // Test that the API route correctly calls the analysis function
      // with DeepSeek as the provider
    });

    it('should POST /bazi/analyze with GLM-4.6 provider', () => {
      // Test that the API route correctly calls the analysis function
      // with GLM-4.6 as the provider
    });

    it('should POST /bazi/analyze-glm46', () => {
      // Test the GLM-4.6 specific endpoint
    });

    it('should POST /bazi/compare', () => {
      // Test the comparison endpoint that returns both providers' results
    });

    it('should POST /bazi/full-analysis', () => {
      // Test the full analysis endpoint that calculates and analyzes in one call
    });

    it('should handle authentication middleware', () => {
      // Test that all routes require proper authentication
    });

    it('should handle validation errors', () => {
      // Test that missing required fields return appropriate errors
    });

    it('should save analysis results to database', () => {
      // Test that analysis results are properly saved when using existing bazi data
    });
  });
});
