// ═══════════════════════════════════════════════════════
// Perplexity Sonar Adapter — Primary AEO signal source
// Uses Sonar model with built-in web search.
// ═══════════════════════════════════════════════════════

export type EngineResponse = {
  rawText: string;
  citedUrls: string[];
  tokens: number;
  cost: number;
  httpStatus: number;
  error?: string;
};

export async function queryPerplexity(queryText: string, signal?: AbortSignal): Promise<EngineResponse> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: 'PERPLEXITY_API_KEY not set' };

  try {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      signal,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          { role: 'system', content: 'You are a helpful research assistant. Provide detailed, sourced answers.' },
          { role: 'user', content: queryText },
        ],
        max_tokens: 1024,
        return_citations: true,
      }),
    });

    if (!res.ok) {
      return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: res.status, error: `HTTP ${res.status}: ${res.statusText}` };
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    const citations: string[] = data.citations ?? [];
    const totalTokens = (data.usage?.prompt_tokens ?? 0) + (data.usage?.completion_tokens ?? 0);

    // Cost: $1/1M input + $1/1M output + ~$5/1k requests = $0.005/req + token cost
    const tokenCost = totalTokens * (1.0 / 1_000_000);
    const requestCost = 0.005;
    const cost = tokenCost + requestCost;

    return {
      rawText: content,
      citedUrls: citations,
      tokens: totalTokens,
      cost,
      httpStatus: res.status,
    };
  } catch (err: any) {
    return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: err.message };
  }
}
