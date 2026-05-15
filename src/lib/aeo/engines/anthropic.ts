// ═══════════════════════════════════════════════════════
// Anthropic Claude Adapter — Cheapest engine (token-only billing)
// Uses native web_search tool. No per-call fee.
// ═══════════════════════════════════════════════════════

import type { EngineResponse } from './perplexity';

export async function queryAnthropic(queryText: string): Promise<EngineResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: 'ANTHROPIC_API_KEY not set' };

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20250301',
        max_tokens: 1024,
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
        messages: [
          { role: 'user', content: queryText },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: res.status, error: `HTTP ${res.status}: ${errBody}` };
    }

    const data = await res.json();

    // Extract text content from response blocks
    let rawText = '';
    const citedUrls: string[] = [];

    for (const block of data.content ?? []) {
      if (block.type === 'text') {
        rawText += block.text;
        // Extract inline citations if present
        for (const cite of block.citations ?? []) {
          if (cite.url) citedUrls.push(cite.url);
        }
      }
      // Collect URLs from web_search_tool_result blocks
      if (block.type === 'web_search_tool_result') {
        for (const result of block.content ?? []) {
          if (result.url) citedUrls.push(result.url);
        }
      }
    }

    const inputTokens = data.usage?.input_tokens ?? 0;
    const outputTokens = data.usage?.output_tokens ?? 0;
    const totalTokens = inputTokens + outputTokens;

    // Haiku pricing: $1/1M input, $5/1M output. No per-call search fee.
    const cost = (inputTokens * (1.0 / 1_000_000)) + (outputTokens * (5.0 / 1_000_000));

    return {
      rawText,
      citedUrls: [...new Set(citedUrls)],
      tokens: totalTokens,
      cost,
      httpStatus: res.status,
    };
  } catch (err: any) {
    return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: err.message };
  }
}
