// ═══════════════════════════════════════════════════════
// AEO Classify Batch — Edge-triggered win/loss detection
// Classifies unclassified responses via Claude Haiku.
// Diffs against previous day to fire events ONLY on transitions.
// ═══════════════════════════════════════════════════════

import { inngest } from '../client';
import { createServerClient as createClient } from '@/lib/supabase-server';
import { classifyResponse } from '@/lib/aeo/classifier';
import { recordCost } from '@/lib/aeo/cost-guard';
import { alertMentionLost, alertCitationLost } from '@/lib/aeo/alerts';

export const aeoClassifyBatch = inngest.createFunction(
  { id: 'aeo-classify-batch', retries: 2, event: 'aeo/classify-batch' } as any,
  async ({ step }: any) => {
    // Step 1: Fetch unclassified responses
    const unclassified = await step.run('fetch-unclassified', async () => {
      const supabase = await createClient() as any;
      const { data } = await supabase
        .from('aeo_responses')
        .select('id, query_id, engine, raw_response, cited_urls')
        .is('error_message', null)
        .not('raw_response', 'eq', '')
        .order('polled_at', { ascending: false })
        .limit(300);

      // Filter to only those without a classification
      if (!data?.length) return [];
      const responseIds = data.map((r: any) => r.id);
      const { data: existing } = await supabase
        .from('aeo_classifications')
        .select('response_id')
        .in('response_id', responseIds);

      const classifiedIds = new Set((existing ?? []).map((e: any) => e.response_id));
      return data.filter((r: any) => !classifiedIds.has(r.id));
    });

    if (!unclassified.length) return { status: 'no_unclassified_responses' };

    // Step 2: Classify each response
    await step.run('classify-all', async () => {
      const supabase = await createClient() as any;

      for (const response of unclassified) {
        try {
          // Fetch query text for context
          const { data: queryRow } = await supabase
            .from('aeo_queries')
            .select('query_text, priority')
            .eq('id', response.query_id)
            .single();

          const classification = await classifyResponse(
            queryRow?.query_text ?? '',
            response.raw_response,
            response.cited_urls ?? []
          );

          await supabase.from('aeo_classifications').insert({
            response_id: response.id,
            peptidex_mentioned: classification.peptidex_mentioned,
            peptidex_app_cited: classification.peptidex_app_cited,
            peptidex_app_as_source: classification.peptidex_app_as_source,
            citation_url: classification.citation_url,
            cited_url_paths: classification.cited_url_paths,
            mention_position: classification.mention_position,
            sentiment: classification.sentiment,
            competing_codes: classification.competing_codes,
            competing_vendors: classification.competing_vendors,
            top_cited_domains: classification.top_cited_domains,
            model_used: 'haiku',
          });

          // Record classification cost (~$0.001 per)
          await recordCost('classifier', 0.001);

          // ── EDGE-TRIGGERED WIN/LOSS DETECTION ──
          // Find yesterday's classification for same query × engine
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStart = yesterday.toISOString().split('T')[0] + 'T00:00:00Z';
          const yesterdayEnd = yesterday.toISOString().split('T')[0] + 'T23:59:59Z';

          const { data: prevResponses } = await supabase
            .from('aeo_responses')
            .select('id')
            .eq('query_id', response.query_id)
            .eq('engine', response.engine)
            .gte('polled_at', yesterdayStart)
            .lte('polled_at', yesterdayEnd)
            .limit(1);

          if (prevResponses?.length) {
            const { data: prevClass } = await supabase
              .from('aeo_classifications')
              .select('peptidex_mentioned, peptidex_app_as_source')
              .eq('response_id', prevResponses[0].id)
              .single();

            if (prevClass) {
              const prevMentioned = prevClass.peptidex_mentioned;
              const nowMentioned = classification.peptidex_mentioned;
              const prevCited = prevClass.peptidex_app_as_source;
              const nowCited = classification.peptidex_app_as_source;

              // Mention transitions
              if (prevMentioned && !nowMentioned) {
                await supabase.from('aeo_events').insert({
                  query_id: response.query_id,
                  engine: response.engine,
                  event_type: 'lost_mention',
                  details: { query: queryRow?.query_text },
                });
                if (queryRow?.priority === 'high') {
                  await alertMentionLost(queryRow.query_text, response.engine);
                }
              } else if (!prevMentioned && nowMentioned) {
                await supabase.from('aeo_events').insert({
                  query_id: response.query_id,
                  engine: response.engine,
                  event_type: 'gained_mention',
                  details: { query: queryRow?.query_text },
                });
              }

              // Citation transitions
              if (prevCited && !nowCited) {
                await supabase.from('aeo_events').insert({
                  query_id: response.query_id,
                  engine: response.engine,
                  event_type: 'lost_citation',
                  details: { query: queryRow?.query_text },
                });
                await alertCitationLost(queryRow?.query_text ?? '', response.engine);
              } else if (!prevCited && nowCited) {
                await supabase.from('aeo_events').insert({
                  query_id: response.query_id,
                  engine: response.engine,
                  event_type: 'gained_citation',
                  details: { query: queryRow?.query_text },
                });
              }
            }
          }
        } catch (err) {
          console.error(`Classification failed for response ${response.id}:`, err);
        }
      }
    });

    return { status: 'classified', count: unclassified.length };
  }
);
