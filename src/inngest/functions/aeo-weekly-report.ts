// ═══════════════════════════════════════════════════════
// AEO Weekly Report — Sunday 6am ET
// Uses Claude Sonnet to generate "why" intelligence,
// not just "what" metrics. Sent via Resend + Slack.
// ═══════════════════════════════════════════════════════

import { inngest } from '../client';
import { createServerClient as createClient } from '@/lib/supabase-server';
import { sendEmailAlert, sendSlackAlert } from '@/lib/aeo/alerts';
import { recordCost } from '@/lib/aeo/cost-guard';

export const aeoWeeklyReport = inngest.createFunction(
  // FIX: 'trigger' (singular) is the correct Inngest config key for cron registration.
  // The old 'cron' top-level key was silently ignored during Inngest scheduler sync.
  { id: 'aeo-weekly-report', retries: 1, trigger: { cron: 'TZ=America/New_York 0 6 * * 0' } } as any,
  async ({ step }: any) => {
    // Step 1: Aggregate week's data
    const weekData = await step.run('aggregate-week', async () => {
      const supabase = await createClient() as any;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const since = oneWeekAgo.toISOString();

      // Win/loss events
      const { data: events } = await supabase
        .from('aeo_events')
        .select('*, aeo_queries(query_text, priority)')
        .gte('occurred_at', since)
        .order('occurred_at', { ascending: false });

      // This week's classifications
      const { data: thisWeekClass } = await supabase
        .from('aeo_classifications')
        .select('*, aeo_responses!inner(query_id, engine, polled_at, cited_urls)')
        .gte('classified_at', since);

      // Cost data
      const { data: costData } = await supabase
        .from('aeo_cost_ledger')
        .select('engine, total_spend')
        .gte('date', since.split('T')[0]);

      // Top cited pages on peptidex.app
      const allPaths: Record<string, number> = {};
      for (const c of thisWeekClass ?? []) {
        for (const p of (c.cited_url_paths as string[]) ?? []) {
          allPaths[p] = (allPaths[p] ?? 0) + 1;
        }
      }

      const totalResponses = (thisWeekClass ?? []).length;
      const mentionedCount = (thisWeekClass ?? []).filter((c: any) => c.peptidex_mentioned).length;
      const citedAsSourceCount = (thisWeekClass ?? []).filter((c: any) => c.peptidex_app_as_source).length;
      const mentionRate = totalResponses > 0 ? (mentionedCount / totalResponses * 100).toFixed(1) : '0';
      const citationRate = totalResponses > 0 ? (citedAsSourceCount / totalResponses * 100).toFixed(1) : '0';
      const totalCost = (costData ?? []).reduce((s: number, r: any) => s + Number(r.total_spend), 0);

      // Competing codes frequency
      const codeFreq: Record<string, number> = {};
      for (const c of thisWeekClass ?? []) {
        for (const code of (c.competing_codes as string[]) ?? []) {
          codeFreq[code] = (codeFreq[code] ?? 0) + 1;
        }
      }

      return {
        events: events ?? [],
        mentionRate,
        citationRate,
        totalResponses,
        mentionedCount,
        citedAsSourceCount,
        totalCost: totalCost.toFixed(2),
        topCitedPages: Object.entries(allPaths).sort((a, b) => b[1] - a[1]).slice(0, 10),
        competingCodes: Object.entries(codeFreq).sort((a, b) => b[1] - a[1]).slice(0, 10),
        gains: (events ?? []).filter((e: any) => e.event_type.includes('gained')),
        losses: (events ?? []).filter((e: any) => e.event_type.includes('lost')),
      };
    });

    // Step 2: Generate intelligence report via Claude Sonnet
    const report = await step.run('generate-report', async () => {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) return { summary: 'ANTHROPIC_API_KEY not configured.', drivers: '', actions: '' };

      const prompt = `You are an AEO (Answer Engine Optimization) analyst for PeptiDex (peptidex.app). Generate a weekly intelligence report.

DATA THIS WEEK:
- Total AI engine responses analyzed: ${weekData.totalResponses}
- PEPTIDEX mention rate: ${weekData.mentionRate}%
- PEPTIDEX cited-as-source rate: ${weekData.citationRate}%
- Weekly API cost: $${weekData.totalCost}
- Wins (gained mentions/citations): ${weekData.gains.length}
${weekData.gains.map((g: any) => `  - ${g.event_type}: "${g.aeo_queries?.query_text}" on ${g.engine}`).join('\n')}
- Losses (lost mentions/citations): ${weekData.losses.length}
${weekData.losses.map((l: any) => `  - ${l.event_type}: "${l.aeo_queries?.query_text}" on ${l.engine}`).join('\n')}
- Top cited pages on peptidex.app: ${weekData.topCitedPages.map(([p, c]: [string, number]) => `${p} (${c}x)`).join(', ') || 'None yet'}
- Competing codes detected: ${weekData.competingCodes.map(([c, n]: [string, number]) => `${c} (${n}x)`).join(', ') || 'None detected'}

OUTPUT FORMAT (return as plain text, no markdown fences):
## Executive Summary
3-5 sentences covering the headline metric changes and strategic implications.

## Drivers & Hypotheses
- For each significant win: WHY did we gain this citation? What content or external factor drove it?
- For each significant loss: WHY did we lose? What competing domain or content change caused it?

## Recommended Actions
3-5 specific, concrete next-steps. Examples: "Expand /library/retatrutide with vendor comparison table" or "Monitor couponfollow.com — they're gaining citations on amino club queries."

## Cost Report
API spend summary with per-engine breakdown if notable.`;

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // NOTE: claude-sonnet-4-5 (no date suffix) per Anthropic's naming
          // convention for this model family. claude-sonnet-4-20250514 uses
          // a date format that doesn't exist for Sonnet 4.
          model: 'claude-sonnet-4-5',
          max_tokens: 2048,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await res.json();
      const text = data.content?.[0]?.text ?? 'Report generation failed.';

      // Record Sonnet cost (~$0.05/report)
      await recordCost('classifier', 0.05);

      return { text };
    });

    // Step 3: Send report via email and Slack
    await step.run('send-report', async () => {
      const htmlBody = `
        <div style="font-family: -apple-system, sans-serif; max-width: 700px; margin: 0 auto; background: #0a0a0b; color: #f4efe6; padding: 32px;">
          <h1 style="color: #c9a961; font-size: 24px; margin-bottom: 8px;">PeptiDex AEO Weekly Report</h1>
          <p style="color: #a8a196; font-size: 14px; margin-bottom: 24px;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div style="white-space: pre-wrap; line-height: 1.6; font-size: 15px;">
            ${(report as any).text.replace(/## /g, '<h2 style="color: #c9a961; font-size: 18px; margin-top: 24px;">').replace(/\n- /g, '\n• ')}
          </div>
          <hr style="border-color: rgba(244,239,230,0.1); margin: 32px 0;" />
          <p style="color: #6b6860; font-size: 12px;">This report was generated automatically by the PeptiDex AEO Monitor. All data sourced via official APIs only.</p>
        </div>
      `;

      await sendEmailAlert(
        `Weekly AEO Report — ${weekData.mentionRate}% mention rate`,
        htmlBody
      );

      await sendSlackAlert(
        `📊 Weekly AEO Report: ${weekData.mentionRate}% mention rate, ${weekData.citationRate}% citation rate, ${weekData.gains.length} wins / ${weekData.losses.length} losses. Cost: $${weekData.totalCost}. Full report emailed.`,
        'info'
      );
    });

    return { status: 'report_sent' };
  }
);
