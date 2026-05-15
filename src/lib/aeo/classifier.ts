// ═══════════════════════════════════════════════════════
// AEO Classifier — Claude Haiku with structured JSON output
// Classifies AI engine responses for PEPTIDEX visibility signals.
// Diffs against previous day for edge-triggered win/loss events.
// ═══════════════════════════════════════════════════════

import type { EngineResponse } from './engines/perplexity';

export type Classification = {
  peptidex_mentioned: boolean;
  peptidex_app_cited: boolean;
  peptidex_app_as_source: boolean;
  cited_url_paths: string[];
  citation_url: string | null;
  mention_position: 'first_paragraph' | 'middle' | 'footer' | 'not_mentioned';
  sentiment: 'positive' | 'neutral' | 'cautious' | 'negative';
  competing_codes: string[];
  competing_vendors: string[];
  top_cited_domains: string[];
};

const CLASSIFICATION_PROMPT = `You are an AEO (Answer Engine Optimization) analyst. Given an AI engine's response to a search query, extract structured signals about PEPTIDEX visibility.

Analyze the response text AND the list of cited URLs. Return a JSON object with these exact fields:

{
  "peptidex_mentioned": boolean,       // Does "PEPTIDEX" or "peptidex" appear anywhere in the response body text?
  "peptidex_app_cited": boolean,       // Does "peptidex.app" appear anywhere in the response?
  "peptidex_app_as_source": boolean,   // Does peptidex.app appear in the CITATIONS/SOURCES list (not just mentioned in body)?
  "cited_url_paths": string[],         // If peptidex.app is cited, extract the URL paths (e.g. ["/library/retatrutide", "/peptidex-coupon"])
  "citation_url": string | null,      // The specific peptidex.app URL cited, if any
  "mention_position": string,         // Where PEPTIDEX appears: "first_paragraph", "middle", "footer", or "not_mentioned"
  "sentiment": string,                // Sentiment toward PEPTIDEX: "positive", "neutral", "cautious", or "negative"
  "competing_codes": string[],        // Other coupon/discount codes mentioned (e.g. "THANKYOU", "AMINOS", "CLUB40")
  "competing_vendors": string[],      // Competing peptide vendors mentioned by name
  "top_cited_domains": string[]       // Top 3 domains cited as sources in the response (extract domain only)
}

Rules:
- Only mark peptidex_app_as_source=true if peptidex.app appears in an explicit citation, footnote, or source list — NOT just mentioned in passing.
- For cited_url_paths, extract only the path portion after peptidex.app (e.g. "/library/bpc-157")
- For competing_codes, look for ALL-CAPS strings that look like coupon codes. Exclude "PEPTIDEX" itself.
- For top_cited_domains, extract root domains (e.g. "reddit.com", "aminoclub.com") from the cited URLs.
- Return ONLY valid JSON, no markdown fences, no explanation.`;

export async function classifyResponse(
  queryText: string,
  responseText: string,
  citedUrls: string[]
): Promise<Classification> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const userContent = `Query: "${queryText}"

Response text:
${responseText}

Cited URLs:
${citedUrls.map(u => `- ${u}`).join('\n') || '(none)'}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20250301',
      max_tokens: 512,
      messages: [
        { role: 'user', content: `${CLASSIFICATION_PROMPT}\n\n${userContent}` },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Classification failed: HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text ?? '{}';

  try {
    return JSON.parse(text) as Classification;
  } catch {
    // Attempt to extract JSON from markdown fences if Haiku wraps it
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]) as Classification;
    throw new Error(`Failed to parse classification JSON: ${text.slice(0, 200)}`);
  }
}
