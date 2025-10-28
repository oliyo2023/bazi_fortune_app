import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GLM46Client, GLM46Error } from '../lib/glm46';
import { BaziInput, BaziResult } from '../lib/bazi';

// Mock fetch
global.fetch = vi.fn();

describe('GLM46Client', () => {
  let client: GLM46Client;
  const mockConfig = {
    apiKey: 'test-api-key',
    baseUrl: 'https://api.test.com',
    model: 'glm-4.6',
    timeout: 5000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    client = new GLM46Client(mockConfig);
  });

  describe('constructor', () => {
    it('should create client with default values', () => {
      const client = new GLM46Client({ apiKey: 'test-key' });
      expect(client).toBeInstanceOf(GLM46Client);
    });

    it('should create client with custom config', () => {
      const client = new GLM46Client(mockConfig);
      expect(client).toBeInstanceOf(GLM46Client);
    });
  });

  describe('chat', () => {
    it('should make successful API call', async () => {
      const mockResponse = {
        id: 'test-id',
        object: 'chat.completion',
        created: 1234567890,
        model: 'glm-4.6',
        choices: [{
          index: 0,
          message: {
            role: 'assistant' as const,
            content: 'Test response',
          },
          finish_reason: 'stop',
        }],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const request = {
        model: 'glm-4.6',
        messages: [
          { role: 'user' as const, content: 'Test message' },
        ],
      };

      const result = await client.chat(request);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-api-key',
          },
          body: JSON.stringify({
            model: 'glm-4.6',
            messages: request.messages,
            temperature: 0.7,
            max_tokens: 2000,
            top_p: 0.9,
            stream: false,
          }),
        })
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle API error response', async () => {
      const errorResponse = {
        error: {
          message: 'API Error',
          type: 'invalid_request_error',
        },
      };

      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => errorResponse,
      });

      const request = {
        model: 'glm-4.6',
        messages: [{ role: 'user' as const, content: 'Test' }],
      };

      await expect(client.chat(request)).rejects.toThrow(GLM46Error);
    });

    it('should handle network error', async () => {
      (fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const request = {
        model: 'glm-4.6',
        messages: [{ role: 'user' as const, content: 'Test' }],
      };

      await expect(client.chat(request)).rejects.toThrow(GLM46Error);
    });
  });

  describe('analyzeBazi', () => {
    const mockBaziInput: BaziInput = {
      year: 1990,
      month: 5,
      day: 15,
      hour: 10,
      minute: 30,
      gender: 'male',
      name: 'Test User',
    };

    const mockBaziResult: BaziResult = {
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

    it('should analyze bazi in Chinese', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: '这是八字分析结果',
          },
        }],
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.analyzeBazi(mockBaziInput, mockBaziResult, 'zh');

      expect(result).toBe('这是八字分析结果');
      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/chat/completions',
        expect.any(Object)
      );
    });

    it('should analyze bazi in English', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'This is the bazi analysis result',
          },
        }],
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client.analyzeBazi(mockBaziInput, mockBaziResult, 'en');

      expect(result).toBe('This is the bazi analysis result');
    });

    it('should analyze specific aspects', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: '事业和婚姻分析',
          },
        }],
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const aspects = ['career', 'marriage'];
      const result = await client.analyzeBazi(mockBaziInput, mockBaziResult, 'zh', aspects);

      expect(result).toBe('事业和婚姻分析');

      // Verify that aspects are included in the prompt
      const callArgs = (fetch as any).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);
      const userMessage = requestBody.messages[1].content;
      expect(userMessage).toContain('事业');
      expect(userMessage).toContain('婚姻');
    });
  });

  describe('GLM46Error', () => {
    it('should create error with status code', () => {
      const error = new GLM46Error('Test error', 400, { details: 'test' });

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.details).toEqual({ details: 'test' });
      expect(error.name).toBe('GLM46Error');
    });
  });
});

describe('createGLM46Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create client when API key is available', async () => {
    // Mock environment variable
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      GLM46_API_KEY: 'test-key',
    };

    const { createGLM46Client } = await import('../lib/glm46');

    expect(() => createGLM46Client()).not.toThrow();

    // Restore environment
    process.env = originalEnv;
  });

  it('should throw error when API key is missing', async () => {
    // Mock environment variable without API key
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      GLM46_API_KEY: undefined,
    };

    const { createGLM46Client } = await import('../lib/glm46');

    expect(() => createGLM46Client()).toThrow('GLM46_API_KEY environment variable is required');

    // Restore environment
    process.env = originalEnv;
  });
});
