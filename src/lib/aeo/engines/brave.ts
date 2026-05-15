// ═══════════════════════════════════════════════════════
// Brave Answers API Adapter
// Replaced deprecated Summarizer. Returns grounded AI answers with citations.
// ═══════════════════════════════════════════════════════

import type { EngineResponse } from './perplexity';

export async function queryBrave(queryText: string): Promise<EngineResponse> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;
  if (!apiKey) return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: 'BRAVE_SEARCH_API_KEY not set' };

  try {
    // Step 1: Web Search to get results with AI summary
    const searchRes = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(queryText)}&summary=1&count=10`,
      {
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip',
          'X-Subscription-Token': apiKey,
        },
      }
    );

    if (!searchRes.ok) {
      return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: searchRes.status, error: `HTTP ${searchRes.status}` };
    }

    const data = await searchRes.json();

    // Extract AI summary if present
    const summary = data.summarizer?.results?.[0]?.text
      ?? data.summary?.text
      ?? '';

    // Extract cited URLs from web results
    const citedUrls: string[] = (data.web?.results ?? [])
      .slice(0, 10)
      .map((r: any) => r.url)
      .filter(Boolean);

    // If summary available, also extract snippet-level content
    const webSnippets = (data.web?.results ?? [])
      .slice(0, 5)
      .map((r: any) => `[${r.title}](${r.url}): ${r.description}`)
      .join('\n');

    const rawText = summary || webSnippets;

    // Cost: $5/1k search requests = $0.005/req. Summary tokens billed separately at $5/1M.
    const estimatedTokens = Math.ceil(rawText.length / 4);
    const tokenCost = estimatedTokens * (5.0 / 1_000_000);
    const cost = 0.005 + tokenCost;

    return {
      rawText,
      citedUrls,
      tokens: estimatedTokens,
      cost,
      httpStatus: searchRes.status,
    };
  } catch (err: any) {
    return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: err.message };
  }
}
