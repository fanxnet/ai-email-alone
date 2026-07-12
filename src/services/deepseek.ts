/**
 * AI Compose — DeepSeek Client Service
 *
 * Provides a typed interface to the DeepSeek API (OpenAI-compatible).
 * Uses fetch directly (no SDK required).
 *
 * © Rizonetech (Pty) Ltd. — https://rizonesoft.com
 */

import { getProviderApiKey } from '../features/settings';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DeepSeekGenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface DeepSeekGenerateJsonOptions extends DeepSeekGenerateOptions {
  systemInstruction?: string;
  responseSchema?: Record<string, unknown>;
}

export enum DeepSeekErrorCode {
  INVALID_API_KEY = 'INVALID_API_KEY',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  RATE_LIMITED = 'RATE_LIMITED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  CONTENT_FILTERED = 'CONTENT_FILTERED',
  UNKNOWN = 'UNKNOWN',
}

export class DeepSeekError extends Error {
  code: DeepSeekErrorCode;
  retryable: boolean;
  statusCode?: number;

  constructor(message: string, code: DeepSeekErrorCode, retryable = false, statusCode?: number) {
    super(message);
    this.name = 'DeepSeekError';
    this.code = code;
    this.retryable = retryable;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, DeepSeekError.prototype);
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEFAULT_MODEL = 'deepseek-v4-flash';
const DEFAULT_TEMPERATURE = 1.0;
const DEFAULT_MAX_TOKENS = 2048;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000;
const RETRY_BACKOFF_FACTOR = 2;
const REQUEST_TIMEOUT_MS = 60_000;

// ---------------------------------------------------------------------------
// Core generation functions
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

function classifyError(error: unknown, statusCode?: number): DeepSeekError {
  const message = error instanceof Error ? error.message : String(error);

  if (statusCode === 401 || statusCode === 403) {
    return new DeepSeekError('Invalid or expired API key.', DeepSeekErrorCode.INVALID_API_KEY, false, statusCode);
  }
  if (statusCode === 429) {
    return new DeepSeekError('Rate limited. Retrying with backoff.', DeepSeekErrorCode.RATE_LIMITED, true, statusCode);
  }
  if (statusCode && statusCode >= 500) {
    return new DeepSeekError(`Server error (${statusCode}).`, DeepSeekErrorCode.UNKNOWN, true, statusCode);
  }
  if (error instanceof TypeError && /network|fetch|abort/i.test(message)) {
    return new DeepSeekError('Network error — please check your connection.', DeepSeekErrorCode.NETWORK_ERROR, true);
  }
  return new DeepSeekError(`Unexpected error: ${message}`, DeepSeekErrorCode.UNKNOWN, false, statusCode);
}

async function retryWithBackoff<T>(fn: () => Promise<T>): Promise<T> {
  let lastError: DeepSeekError | undefined;
  let delay = INITIAL_RETRY_DELAY_MS;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof DeepSeekError ? error : classifyError(error);
      if (!lastError.retryable || attempt === MAX_RETRIES) throw lastError;
      await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 0.3 * delay));
      delay *= RETRY_BACKOFF_FACTOR;
    }
  }
  throw lastError!;
}

/**
 * Generate text using DeepSeek's chat completion endpoint.
 */
export async function generateText(prompt: string, options: DeepSeekGenerateOptions = {}): Promise<string> {
  const apiKey = getProviderApiKey('deepseek');
  if (!apiKey) {
    throw new DeepSeekError('DeepSeek API key is required.', DeepSeekErrorCode.INVALID_API_KEY);
  }
  // 放宽格式验证：只验证是否以 "sk-" 开头
  if (!/^sk-/.test(apiKey)) {
    throw new DeepSeekError(
      'Invalid DeepSeek API key format. Key must start with "sk-".',
      DeepSeekErrorCode.INVALID_API_KEY,
    );
  }

  const body = {
    model: options.model || DEFAULT_MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: options.temperature ?? DEFAULT_TEMPERATURE,
    max_tokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
  };

  const call = async (): Promise<string> => {
    console.log('[DeepSeek] Request:', body);
    const response = await fetchWithTimeout(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    }, REQUEST_TIMEOUT_MS);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('[DeepSeek] HTTP error:', response.status, errorData);
      throw classifyError(new Error(errorData.error?.message || response.statusText), response.status);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.warn('[DeepSeek] Empty content. Response data:', data);
      throw new DeepSeekError('Empty response from DeepSeek.', DeepSeekErrorCode.CONTENT_FILTERED);
    }
    return content;
  };

  return retryWithBackoff(call);
}

/**
 * Generate structured JSON using DeepSeek's chat completion with response_format.
 */
export async function generateJson<T = Record<string, unknown>>(
  prompt: string,
  options: DeepSeekGenerateJsonOptions = {},
): Promise<T> {
  const apiKey = getProviderApiKey('deepseek');
  if (!apiKey) {
    throw new DeepSeekError('DeepSeek API key is required.', DeepSeekErrorCode.INVALID_API_KEY);
  }
  // 放宽格式验证：只验证是否以 "sk-" 开头
  if (!/^sk-/.test(apiKey)) {
    throw new DeepSeekError(
      'Invalid DeepSeek API key format. Key must start with "sk-".',
      DeepSeekErrorCode.INVALID_API_KEY,
    );
  }

  const body: Record<string, unknown> = {
    model: options.model || DEFAULT_MODEL,
    messages: [
      ...(options.systemInstruction ? [{ role: 'system', content: options.systemInstruction }] : []),
      { role: 'user', content: prompt },
    ],
    temperature: options.temperature ?? 0.1,
    max_tokens: options.maxTokens ?? 1024,
    response_format: { type: 'json_object' },
  };

  const call = async (): Promise<T> => {
    const response = await fetchWithTimeout(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    }, REQUEST_TIMEOUT_MS);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw classifyError(new Error(errorData.error?.message || response.statusText), response.status);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new DeepSeekError('Empty JSON response from DeepSeek.', DeepSeekErrorCode.CONTENT_FILTERED);
    }

    try {
      return JSON.parse(content) as T;
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]) as T;
      throw new DeepSeekError('Invalid JSON response from DeepSeek.', DeepSeekErrorCode.UNKNOWN);
    }
  };

  return retryWithBackoff(call);
}
