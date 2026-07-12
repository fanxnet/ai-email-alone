/**
 * AI Compose — AI Service Dispatcher
 *
 * Routes generation requests to the appropriate provider
 * (Gemini or DeepSeek) based on user settings or explicit options.
 *
 * © Rizonetech (Pty) Ltd. — https://rizonesoft.com
 */

import { generateText as geminiText, generateJson as geminiJson } from './gemini';
import { generateText as deepseekText, generateJson as deepseekJson } from './deepseek';
import { loadSettings, AIComposeSettings, AIProvider } from '../features/settings';

export type { AIProvider };

export interface AIGenerateTextOptions {
  provider?: AIProvider;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface AIGenerateJsonOptions extends AIGenerateTextOptions {
  systemInstruction?: string;
  responseSchema?: Record<string, unknown>;
}

/**
 * 根据当前设置或传入的 provider 选择对应服务生成文本
 */
export async function generateText(
  prompt: string,
  options: AIGenerateTextOptions = {},
): Promise<string> {
  const settings = loadSettings();
  const provider = options.provider || settings.aiProvider || 'gemini';
  if (provider === 'deepseek') {
    return deepseekText(prompt, {
      model: options.model || 'deepseek-v4-flash',
      temperature: options.temperature,
      maxTokens: options.maxOutputTokens,
    });
  }
  return geminiText(prompt, {
    model: options.model || settings.defaultModel,
    temperature: options.temperature,
    maxOutputTokens: options.maxOutputTokens,
  });
}

/**
 * 根据 provider 选择对应服务生成 JSON
 */
export async function generateJson<T = Record<string, unknown>>(
  prompt: string,
  options: AIGenerateJsonOptions = {},
): Promise<T> {
  const settings = loadSettings();
  const provider = options.provider || settings.aiProvider || 'gemini';
  if (provider === 'deepseek') {
    return deepseekJson<T>(prompt, {
      model: options.model || 'deepseek-v4-flash',
      temperature: options.temperature,
      maxOutputTokens: options.maxOutputTokens,
      systemInstruction: options.systemInstruction,
      responseSchema: options.responseSchema,
    });
  }
  return geminiJson<T>(prompt, {
    model: options.model || settings.defaultModel,
    temperature: options.temperature,
    maxOutputTokens: options.maxOutputTokens,
    systemInstruction: options.systemInstruction,
    responseSchema: options.responseSchema,
  });
}

/**
 * 获取当前 Provider 对应的 API Key
 */
export function getProviderApiKey(provider?: AIProvider): string {
  const settings = loadSettings();
  const p = provider || settings.aiProvider;
  return p === 'gemini' ? settings.geminiApiKey : settings.deepseekApiKey;
}
