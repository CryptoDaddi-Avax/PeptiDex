import { createServerClient as createClient } from '@/lib/supabase-server';

// ═══════════════════════════════════════════════════════
// AEO Cost Guard — Centralized budget enforcement
// Per-engine daily caps with auto-pause at 90%.
// Burn-rate alert: 50% of monthly budget before day 15.
// ═══════════════════════════════════════════════════════

export const ENGINE_DAILY_CAPS: Record<string, number> = {
  perplexity: 2.00,
  brave:      2.00,
  anthropic:  1.00,
  openai:     1.50,
  classifier: 1.00,
};

const MONTHLY_BUDGET = 240.00;
const PAUSE_THRESHOLD = 0.90;
const BURN_RATE_ALERT_THRESHOLD = 0.50;
const BURN_RATE_ALERT_DAY = 15;

export type CostCheckResult = {
  allowed: boolean;
  currentSpend: number;
  dailyCap: number;
  percentUsed: number;
  reason?: string;
};

/**
 * Check if an engine is allowed to make another query today.
 * Returns false (with reason) if the engine has hit 90% of its daily cap.
 */
export async function checkEngineBudget(engine: string): Promise<CostCheckResult> {
  const supabase = await createClient() as any;
  const today = new Date().toISOString().split('T')[0];
  const dailyCap = ENGINE_DAILY_CAPS[engine] ?? 1.00;

  const { data } = await supabase
    .from('aeo_cost_ledger')
    .select('total_spend, query_count')
    .eq('date', today)
    .eq('engine', engine)
    .single();

  const currentSpend = data?.total_spend ?? 0;
  const percentUsed = currentSpend / dailyCap;

  if (percentUsed >= PAUSE_THRESHOLD) {
    return {
      allowed: false,
      currentSpend,
      dailyCap,
      percentUsed,
      reason: `Engine ${engine} paused: ${(percentUsed * 100).toFixed(1)}% of $${dailyCap} daily cap used ($${currentSpend.toFixed(4)}).`,
    };
  }

  return { allowed: true, currentSpend, dailyCap, percentUsed };
}

/**
 * Record a cost entry for an engine query.
 * Uses upsert to increment the daily ledger row.
 */
export async function recordCost(engine: string, cost: number): Promise<void> {
  const supabase = await createClient() as any;
  const today = new Date().toISOString().split('T')[0];

  // Try to increment existing row
  const { data: existing } = await supabase
    .from('aeo_cost_ledger')
    .select('id, total_spend, query_count')
    .eq('date', today)
    .eq('engine', engine)
    .single();

  if (existing) {
    await supabase
      .from('aeo_cost_ledger')
      .update({
        total_spend: existing.total_spend + cost,
        query_count: existing.query_count + 1,
      })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('aeo_cost_ledger')
      .insert({ date: today, engine, total_spend: cost, query_count: 1 });
  }
}

/**
 * Check monthly burn rate. Fires alert if >50% spent before day 15.
 * Returns null if no alert needed, or alert message string.
 */
export async function checkMonthlyBurnRate(): Promise<string | null> {
  const supabase = await createClient() as any;
  const now = new Date();
  const dayOfMonth = now.getDate();

  // Only alert before mid-month
  if (dayOfMonth >= BURN_RATE_ALERT_DAY) return null;

  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

  const { data } = await supabase
    .from('aeo_cost_ledger')
    .select('total_spend')
    .gte('date', firstOfMonth);

  const mtdSpend = (data ?? []).reduce((sum: number, row: any) => sum + Number(row.total_spend), 0);
  const percentOfBudget = mtdSpend / MONTHLY_BUDGET;

  if (percentOfBudget >= BURN_RATE_ALERT_THRESHOLD) {
    return `🔥 Monthly AEO budget at ${(percentOfBudget * 100).toFixed(1)}% ($${mtdSpend.toFixed(2)}/$${MONTHLY_BUDGET}) on day ${dayOfMonth}. Investigate.`;
  }

  return null;
}

/**
 * Get the global hard ceiling check — $8/day across all engines.
 */
export async function checkGlobalDailyCeiling(): Promise<{ allowed: boolean; totalSpend: number }> {
  const supabase = await createClient() as any;
  const today = new Date().toISOString().split('T')[0];
  const GLOBAL_DAILY_CEILING = 8.00;

  const { data } = await supabase
    .from('aeo_cost_ledger')
    .select('total_spend')
    .eq('date', today);

  const totalSpend = (data ?? []).reduce((sum: number, row: any) => sum + Number(row.total_spend), 0);

  return {
    allowed: totalSpend < GLOBAL_DAILY_CEILING,
    totalSpend,
  };
}
