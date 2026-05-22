// ═══════════════════════════════════════════════════════
// AEO Daily Poll — Core polling engine
// Runs daily at 6am UTC. Iterates query bank × 4 engines.
// Respects per-engine budget caps and global $8/day ceiling.
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

const ENGINE_FUNCTIONS: Record<EngineName, (q: string) => Promise<any>> = {
  perplexity: queryPerplexity,
  brave: queryBrave,
  anthropic: queryAnthropic,
  openai: queryOpenAI,
};

// Exponential backoff: 1s → 2s → 4s → 8s → skip
async function withBackoff<T>(fn: () => Promise<T>, maxRetries = 4): Promise<T | null> {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (i === maxRetries) return null;
      const isRateLimit = err.message?.includes('429') || err.message?.includes('rate');
      if (!isRateLimit) throw err;
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
  return null;
}

export const aeoDailyPoll = inngest.createFunction(
  {
    id: 'aeo-daily-poll',
    retries: 1,
    triggers: [
      { cron: 'TZ=America/New_York 0 6 * * *' },
      { event: 'aeo/daily.poll.manual' },  // manual trigger for bootstrap testing
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

    // Step 3: Poll each engine
    for (const engine of ENGINES) {
      await step.run(`poll-${engine}`, async () => {
        const supabase = await createClient() as any;
        const startTime = Date.now();
        let executed = 0;
        let skipped = 0;
        let errors = 0;
        let totalCost = 0;

        // Check global ceiling first
        const globalCheck = await checkGlobalDailyCeiling();
        if (!globalCheck.allowed) {
          console.warn(`Global daily ceiling hit ($${globalCheck.totalSpend}). Skipping ${engine}.`);
          return;
        }

        // Filter queries for this engine
        const engineQueries = engine === 'openai'
          ? queries.filter((q: any) => q.runs_on_openai)
          : queries;

        for (const query of engineQueries) {
          // Per-engine budget check
          const budgetCheck = await checkEngineBudget(engine);
          if (!budgetCheck.allowed) {
            await alertEnginePaused(engine, budgetCheck.currentSpend, budgetCheck.dailyCap);
            skipped += engineQueries.length - executed;
            break;
          }

          const result = await withBackoff(() => ENGINE_FUNCTIONS[engine](query.query_text));

          if (!result || result.error) {
            errors++;
            // Still store the error response for diagnostics
            await supabase.from('aeo_responses').insert({
              query_id: query.id,
              engine,
              raw_response: result?.rawText ?? '',
              cited_urls: result?.citedUrls ?? [],
              response_tokens: 0,
              cost_estimate: 0,
              http_status: result?.httpStatus ?? 0,
              error_message: result?.error ?? 'Unknown error after retries',
            });
            continue;
          }

          // Store successful response
          await supabase.from('aeo_responses').insert({
            query_id: query.id,
            engine,
            raw_response: result.rawText,
            cited_urls: result.citedUrls,
            response_tokens: result.tokens,
            cost_estimate: result.cost,
            http_status: result.httpStatus,
          });

          await recordCost(engine, result.cost);
          totalCost += result.cost;
          executed++;

          // Polite delay between queries (500ms)
          await new Promise(r => setTimeout(r, 500));
        }

        // Log the poll run
        await supabase.from('aeo_poll_runs').insert({
          engine,
          queries_executed: executed,
          queries_skipped: skipped,
          total_cost: totalCost,
          errors,
          duration_ms: Date.now() - startTime,
        });
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
