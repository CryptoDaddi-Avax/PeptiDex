// ═══════════════════════════════════════════════════════
// OpenAI Adapter — Most expensive (sub-search billing)
// Uses web_search tool. Runs on reduced 20-query subset only.
// ═══════════════════════════════════════════════════════

import type { EngineResponse } from './perplexity';

export async function queryOpenAI(queryText: string): Promise<EngineResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: 'OPENAI_API_KEY not set' };

  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: queryText,
        tools: [{ type: 'web_search' }],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: res.status, error: `HTTP ${res.status}: ${errBody}` };
    }

    const data = await res.json();

    // Extract text and citations from the response output
    let rawText = '';
    const citedUrls: string[] = [];

    for (const item of data.output ?? []) {
      if (item.type === 'message') {
        for (const block of item.content ?? []) {
          if (block.type === 'output_text') {
            rawText += block.text;
            // Extract annotations/citations
            for (const anno of block.annotations ?? []) {
              if (anno.type === 'url_citation' && anno.url) {
                citedUrls.push(anno.url);
              }
            }
          }
        }
      }
    }

    const inputTokens = data.usage?.input_tokens ?? 0;
    const outputTokens = data.usage?.output_tokens ?? 0;
    const totalTokens = inputTokens + outputTokens;

    // GPT-4o-mini: $0.15/1M input, $0.60/1M output
    // web_search: $10/1k calls = $0.01/call. Assume 1-3 sub-searches.
    const tokenCost = (inputTokens * (0.15 / 1_000_000)) + (outputTokens * (0.60 / 1_000_000));
    const searchCalls = data.usage?.web_search_requests ?? 1;
    const searchCost = searchCalls * 0.01;
    const cost = tokenCost + searchCost;

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
