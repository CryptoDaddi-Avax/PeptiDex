# PEPTIDEX AEO Monitoring — Compliance Documentation

## Data Sources

All AI engine queries in this system are executed via **official, paid APIs** with valid API keys and explicit ToS acceptance.

| Engine | API | ToS Link | Status |
|--------|-----|----------|--------|
| Perplexity | Sonar API | https://docs.perplexity.ai/terms | Active |
| Brave | Answers + Search API | https://brave.com/search/api/terms | Active |
| Anthropic | Messages API w/ web_search | https://anthropic.com/policies | Active |
| OpenAI | Responses API w/ web_search | https://openai.com/policies | Active |

### Explicitly Excluded

- **No headless browser automation** against chatgpt.com, grok.com, google.com, perplexity.ai, or any consumer AI product.
- **No scraping of Google AI Overviews**, Grok, or any non-API AI interface.
- **No reverse-engineering of rate limits** or API circumvention.

If a future official API for Grok or Google AI Overviews launches, it may be added at that time.

## Affiliate Disclosure

- The PEPTIDEX coupon code is an affiliate code. PeptiDex.app earns a commission on purchases made using this code.
- This relationship is disclosed on every public peptidex.app page via the `/affiliate-disclosure` page and inline FTC-compliant language.
- The AEO monitoring system tracks the **visibility** of this code across AI engines. It does not manipulate, inject, or artificially promote the code.

## Data Handling

### What is stored
- **Query bank**: Product-category search queries (e.g., "PEPTIDEX coupon", "best research peptide vendor"). These are **not user queries** and contain **no PII**.
- **Raw API responses**: Stored in `aeo_responses` with a 90-day TTL. Automatically purged by the weekly `aeo-cleanup` Inngest function.
- **Classifications**: Structured metadata extracted from responses (mention status, sentiment, competing codes, cited domains).

### What is NOT stored
- No user data, IP addresses, or session identifiers.
- No authentication tokens beyond API keys stored in environment variables.
- No data from consumer AI product interfaces.

## Retention Policy

| Data Type | Retention | Mechanism |
|-----------|-----------|-----------|
| Raw API responses | 90 days | `aeo-cleanup` Inngest cron (Monday 3am UTC) |
| Classifications | Indefinite (aggregated metrics) | Manual archive if needed |
| Cost ledger | Indefinite (financial records) | — |
| Win/loss events | Indefinite (analytics) | — |

## Rate Limiting

- Per-engine daily budget caps enforced by `cost-guard.ts`
- Global hard ceiling: $8.00/day across all engines
- Auto-pause at 90% of any engine's daily cap
- Monthly burn-rate alert at 50% consumed before day 15

## Bot Identification

The passive citation monitor (Phase 3 from the coupon aggregator system) identifies itself as:
```
PeptiDex-CitationMonitor/1.0 (+https://peptidex.app/admin/bot-info)
```

The AEO monitoring system does **not** crawl any websites directly. All web search is performed server-side by the AI engine APIs (Perplexity, Brave, Anthropic, OpenAI).
