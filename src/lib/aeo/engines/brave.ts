// ═══════════════════════════════════════════════════════
// Brave Web Search API Adapter
// Uses plain web search (no summary=1) to reliably extract
// web snippet content for AEO monitoring.
//
// Why no summary=1?
// Brave's summarizer requires a two-step flow: first request returns
// summarizer.key, second request to /summarizer/search?key=KEY returns
// the actual text. Using summary=1 without the second request produces
// empty content. Plain web search reliably returns data.web.results.
// ═══════════════════════════════════════════════════════

import type { EngineResponse } from './perplexity';

export async function queryBrave(queryText: string, signal?: AbortSignal): Promise<EngineResponse> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;
  if (!apiKey) return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: 'BRAVE_SEARCH_API_KEY not set' };

  try {
    // Plain web search — no summary=1 (that requires a second API round-trip
    // to /summarizer/search?key=KEY; omitting it ensures data.web.results is populated)
    const searchRes = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(queryText)}&count=10&result_filter=web`,
      {
        signal,
        headers: {
          'Accept': 'application/json',
          // NOTE: No Accept-Encoding: gzip — Node.js fetch handles compression
          // automatically. Explicit gzip without built-in decompression causes
          // JSON parse failures.
          'X-Subscription-Token': apiKey,
        },
      }
    );

    if (!searchRes.ok) {
      const errText = await searchRes.text().catch(() => '');
      return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: searchRes.status, error: `HTTP ${searchRes.status}: ${errText.slice(0, 200)}` };
    }

    const data = await searchRes.json();

    // Extract web results
    const webResults: any[] = data.web?.results ?? [];

    // Build cited URLs from top results
    const citedUrls: string[] = webResults
      .slice(0, 10)
      .map((r: any) => r.url ?? r.profile?.url)
      .filter(Boolean);

    // Build rawText from titles + descriptions (mimics what a user reads in SERP)
    const rawText = webResults
      .slice(0, 7)
      .map((r: any) => {
        const title = r.title ?? '';
        const desc = r.description ?? r.extra_snippets?.[0] ?? '';
        const url = r.url ?? '';
        return `[${title}](${url}): ${desc}`;
      })
      .filter((line: string) => line.length > 10)
      .join('\n');

    // Cost: $5/1k requests = $0.005/req
    const estimatedTokens = Math.ceil(rawText.length / 4);
    const tokenCost = estimatedTokens * (5.0 / 1_000_000);
    const cost = 0.005 + tokenCost;

    // If we got no web results, return a diagnostic error instead of silent empty success
    if (!rawText) {
      return {
        rawText: '',
        citedUrls: [],
        tokens: 0,
        cost: 0.005,
        httpStatus: searchRes.status,
        error: `No web results returned (response keys: ${Object.keys(data).join(', ')})`,
      };
    }

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
