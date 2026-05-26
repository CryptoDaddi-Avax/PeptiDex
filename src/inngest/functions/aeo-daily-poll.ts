// ═══════════════════════════════════════════════════════
// AEO Daily Poll — Core polling engine
// Runs daily at 6am ET. Iterates query bank × 4 engines.
// Respects per-engine budget caps and global $8/day ceiling.
//
// CONCURRENCY MODEL:
// Each engine step runs queries concurrently (5 at a time) rather than
// sequentially. This keeps each step well under Inngest's ~162s step
// HTTP timeout. Sequential was ~249s for Perplexity alone — causing
// a 504 that killed the function before Brave/Anthropic/OpenAI ran.
// ═══════════════════════════════════════════════════════

import { inngest } from '../client';
import { createServerClient as createClient } from '@/lib/supabase-server';
import { checkEngineBudget, recordCost, checkGlobalDailyCeiling, checkMonthlyBurnRate } from '@/lib/aeo/cost-guard';
import { alertEnginePaused, alertBurnRate } from '@/lib/aeo/alerts';
import { queryPerplexity } from '@/lib/aeo/engines/perplexity';
import { queryBrave } from '@/lib/aeo/engines/brave';
import { queryAnthropic } from '@/lib/aeo/engines/anthropic';
import { queryOpenAI } from '@/lib/aeo/engines/openai';

const ENGINES = ['perplexity', 'brave', 'anthropic', 'openai'] as const;
type EngineName = typeof ENGINES[number];

const ENGINE_FUNCTIONS: Record<EngineName, (q: string, signal?: AbortSignal) => Promise<any>> = {
  perplexity: queryPerplexity,
  brave: queryBrave,
  anthropic: queryAnthropic,
  openai: queryOpenAI,
};

// Per-engine concurrency limits and inter-request delays.
// Anthropic without web_search: API takes ~3.5-4s per call naturally.
// At concurrency 2: 2/3.5s = 34 RPM (under 50 RPM limit), ~119s total (under 162s timeout).
// No artificial delay needed — the API is slow enough on its own.
const ENGINE_CONCURRENCY: Record<EngineName, number> = {
  perplexity: 5,
  brave:      10,
  anthropic:  2,   // 2 concurrent: 34 RPM, ~119s for 67 queries ✅
  openai:     3,
};

// Inter-request delay (ms) applied before each query (except the first).
// Anthropic: 0ms — natural API latency (~3.5s/call) keeps it under 50 RPM.
const ENGINE_DELAY_MS: Record<EngineName, number> = {
  perplexity: 0,
  brave:      0,
  anthropic:  0,
  openai:     0,
};

const TIMEOUT_MS = 30_000;

/**
 * Wraps an engine call with:
 * 1. A 30-second AbortController timeout
 * 2. Exponential backoff ONLY for rate-limit (429) errors
 * 3. Returns null (not throws) for ALL other errors — critical so that one
 *    engine's failure never crashes the Inngest step and skips subsequent engines.
 */
async function withBackoff<T>(fn: (signal: AbortSignal) => Promise<T>, maxRetries = 3): Promise<T | null> {
  for (let i = 0; i <= maxRetries; i++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort('timeout'), TIMEOUT_MS);
    try {
      const result = await fn(controller.signal);
      clearTimeout(timeout);
      return result;
    } catch (err: any) {
      clearTimeout(timeout);
      if (i === maxRetries) {
        console.error(`withBackoff: max retries (${maxRetries}) exceeded:`, err.message);
        return null;
      }
      const isRateLimit = err.message?.includes('429') || err.message?.includes('rate');
      if (!isRateLimit) {
        console.error(`withBackoff: non-retryable error on attempt ${i + 1}:`, err.message);
        return null;
      }
      // Rate-limit: exponential backoff
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
  return null;
}

/**
 * Run an array of async tasks with a concurrency cap.
 * Preserves original order in the returned results array.
 */
async function runConcurrent<T>(
  tasks: Array<() => Promise<T>>,
  concurrency: number,
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let idx = 0;
  const worker = async () => {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, worker));
  return results;
}

// ─────────────────────────────────────────────────────────────
// NOTE: 'triggers' (plural) in the 2-arg config is the correct format
// for Inngest SDK v4.4.0. Confirmed working: May 23 tests used this
// exact format and 4 invocations executed successfully.
// 'trigger' (singular) was tested but Inngest silently ignores it —
// events are accepted but no function picks them up.
// Cron scheduling is handled by the VPS crontab (belt-and-suspenders)
// rather than relying on Inngest's scheduler.
// ─────────────────────────────────────────────────────────────
export const aeoDailyPoll = inngest.createFunction(
  {
    id: 'aeo-daily-poll',
    retries: 1,
    triggers: [
      { cron: 'TZ=America/New_York 0 6 * * *' },  // Inngest scheduler (if synced)
      { event: 'aeo/daily.poll.manual' },          // VPS crontab + manual trigger
    ],
  } as any,
  async ({ step }: any) => {

    // Step 1: Check monthly burn rate
    await step.run('check-burn-rate', async () => {
      const burnAlert = await checkMonthlyBurnRate();
      if (burnAlert) await alertBurnRate(burnAlert);
    });

    // Step 2: Load active queries
    const queries = await step.run('load-queries', async () => {
      const supabase = await createClient() as any;
      const { data } = await supabase
        .from('aeo_queries')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true });
      return data ?? [];
    });

    // Step 3: Poll each engine — queries run CONCURRENTLY within each step
    for (const engine of ENGINES) {
      await step.run(`poll-${engine}`, async () => {
        const supabase = createClient() as any;
        const startTime = Date.now();

        // Check global ceiling first
        const globalCheck = await checkGlobalDailyCeiling();
        if (!globalCheck.allowed) {
          console.warn(`Global daily ceiling hit ($${globalCheck.totalSpend}). Skipping ${engine}.`);
          await supabase.from('aeo_poll_runs').insert({
            engine, queries_executed: 0, queries_skipped: 0,
            total_cost: 0, errors: 0,
            duration_ms: Date.now() - startTime,
          });
          return;
        }

        // Check engine budget upfront (once, not per-query)
        const budgetCheck = await checkEngineBudget(engine);
        if (!budgetCheck.allowed) {
          await alertEnginePaused(engine, budgetCheck.currentSpend, budgetCheck.dailyCap);
          const engineQueries = engine === 'openai'
            ? queries.filter((q: any) => q.runs_on_openai)
            : queries;
          await supabase.from('aeo_poll_runs').insert({
            engine, queries_executed: 0,
            queries_skipped: engineQueries.length,
            total_cost: 0, errors: 0,
            duration_ms: Date.now() - startTime,
          });
          return;
        }

        // Filter queries for this engine
        const engineQueries: any[] = engine === 'openai'
          ? queries.filter((q: any) => q.runs_on_openai)
          : queries;

        const concurrency = ENGINE_CONCURRENCY[engine];

        // Build concurrent task list — one task per query
        const delayMs = ENGINE_DELAY_MS[engine];
        const tasks = engineQueries.map((query: any, i: number) => async () => {
          // Throttle requests for rate-limited engines (skip delay on first query)
          if (delayMs > 0 && i > 0) {
            await new Promise(r => setTimeout(r, delayMs));
          }
          const result = await withBackoff(
            (signal) => ENGINE_FUNCTIONS[engine](query.query_text, signal)
          );
          return { query, result };
        });

        // Run concurrently
        const rawResults = await runConcurrent(tasks, concurrency);

        // Separate successes from errors
        let executed = 0;
        let errors = 0;
        let totalCost = 0;
        const responseRows: any[] = [];
        const costEntries: number[] = [];

        for (const { query, result } of rawResults) {
          if (!result || result.error) {
            errors++;
            responseRows.push({
              query_id: query.id,
              engine,
              raw_response: result?.rawText ?? '',
              cited_urls: result?.citedUrls ?? [],
              response_tokens: 0,
              cost_estimate: 0,
              http_status: result?.httpStatus ?? 0,
              error_message: result?.error ?? 'Unknown error after retries',
            });
          } else {
            executed++;
            totalCost += result.cost ?? 0;
            costEntries.push(result.cost ?? 0);
            responseRows.push({
              query_id: query.id,
              engine,
              raw_response: result.rawText ?? '',
              cited_urls: result.citedUrls ?? [],
              response_tokens: result.tokens ?? 0,
              cost_estimate: result.cost ?? 0,
              http_status: result.httpStatus ?? 200,
              error_message: null,
            });
          }
        }

        // Batch insert all responses (1 Supabase call instead of 67)
        if (responseRows.length > 0) {
          const { error: insertErr } = await supabase
            .from('aeo_responses')
            .insert(responseRows);
          if (insertErr) {
            console.error(`[${engine}] aeo_responses batch insert error:`, insertErr.message);
          }
        }

        // Record costs for successful queries
        for (const cost of costEntries) {
          await recordCost(engine, cost);
        }

        // Log the poll run
        await supabase.from('aeo_poll_runs').insert({
          engine,
          queries_executed: executed,
          queries_skipped: 0,
          total_cost: totalCost,
          errors,
          duration_ms: Date.now() - startTime,
        });

        console.log(`[${engine}] done: ${executed} ok, ${errors} errors, $${totalCost.toFixed(4)}, ${Math.round((Date.now() - startTime) / 1000)}s`);
      });
    }

    // Step 4: Emit classification event
    await step.sendEvent('trigger-classify', {
      name: 'aeo/classify-batch',
      data: { triggered_by: 'daily-poll' },
    });

    return { status: 'completed' };
  }
);
