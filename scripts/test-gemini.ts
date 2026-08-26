/**
 * AI Compose — Gemini Service Verification Script
 *
 * Quick smoke test that calls the live Gemini API to verify
 * the service works end-to-end with a real API key.
 *
 * Usage:  npx ts-node scripts/test-gemini.ts
 *
 * © Rizonetech (Pty) Ltd. — https://rizonesoft.com
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { initGeminiClient, generateText, GeminiError } from '../src/services/gemini';

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in .env file.');
    console.error('   Create a .env file with: GEMINI_API_KEY=your_key_here');
    process.exit(1);
  }

  console.log('🔑 API key found. Initialising Gemini client...');
  initGeminiClient(apiKey);

  console.log('📤 Sending test prompt to Gemini 3 Pro Preview...\n');

  try {
    const result = await generateText(
      'In one short sentence, what is the capital of South Africa?',
      {
        temperature: 0.3,
        maxOutputTokens: 100,
      },
    );

    console.log('✅ Response received:');
    console.log(`   "${result}"\n`);
    console.log('🎉 Gemini service is working correctly!');
  } catch (error) {
    if (error instanceof GeminiError) {
      console.error(`❌ GeminiError [${error.code}]: ${error.message}`);
      console.error(`   Retryable: ${error.retryable}`);
      if (error.statusCode) {
        console.error(`   HTTP Status: ${error.statusCode}`);
      }
    } else {
      console.error('❌ Unexpected error:', error);
    }
    process.exit(1);
  }
}

main();
