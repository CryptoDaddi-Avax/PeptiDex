/**
 * GET /api/admin/aeo-diagnose?secret=<CRON_SECRET>
 *
 * One-shot engine health check. Runs a single test query through all 4 AEO
 * engines and returns full response/error for each. Use this IMMEDIATELY after
 * deploying the engine fixes to confirm all 4 are operational.
 *
 * Returns:
 *   { engine: string, ok: boolean, httpStatus: number, textLen: number, error?: string }[]
 *
 * Safe to call at any time — does NOT write to Supabase, does NOT charge
 * against the daily cost ledger. It DOES make real API calls (~$0.02 total).
 */
import { NextRequest, NextResponse } from 'next/server';
import { queryPerplexity } from '@/lib/aeo/engines/perplexity';
import { queryBrave } from '@/lib/aeo/engines/brave';
import { queryAnthropic } from '@/lib/aeo/engines/anthropic';
import { queryOpenAI } from '@/lib/aeo/engines/openai';

const TEST_QUERY = 'best peptide for fat loss';
const TIMEOUT_MS = 45_000;

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Array<{
    engine: string;
    ok: boolean;
    httpStatus: number;
    textLen: number;
    citedUrls: number;
    cost: number;
    error?: string;
    keyPresent: boolean;
  }> = [];

  const engines = [
    { name: 'perplexity', fn: queryPerplexity, envKey: 'PERPLEXITY_API_KEY' },
    { name: 'brave',      fn: queryBrave,      envKey: 'BRAVE_SEARCH_API_KEY' },
    { name: 'anthropic',  fn: queryAnthropic,  envKey: 'ANTHROPIC_API_KEY' },
    { name: 'openai',     fn: queryOpenAI,     envKey: 'OPENAI_API_KEY' },
  ] as const;

  for (const { name, fn, envKey } of engines) {
    const keyPresent = !!process.env[envKey];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort('diagnose-timeout'), TIMEOUT_MS);

    try {
      const result = await fn(TEST_QUERY, controller.signal);
      clearTimeout(timeout);
      results.push({
        engine: name,
        ok: !result.error,
        httpStatus: result.httpStatus,
        textLen: result.rawText?.length ?? 0,
        citedUrls: result.citedUrls?.length ?? 0,
        cost: result.cost,
        error: result.error,
        keyPresent,
      });
    } catch (err: any) {
      clearTimeout(timeout);
      results.push({
        engine: name,
        ok: false,
        httpStatus: 0,
        textLen: 0,
        citedUrls: 0,
        cost: 0,
        error: err.message,
        keyPresent,
      });
    }
  }

  const allOk = results.every(r => r.ok);
  return NextResponse.json(
    {
      allEnginesOk: allOk,
      testQuery: TEST_QUERY,
      results,
      rotatedKeyCheck: {
        note: 'If any engine shows HTTP 401 and keyPresent=true, the VPS .env.local has stale/pre-rotation keys.',
        action: 'SSH to VPS: nano /var/www/peptidex/.env.local — update the flagged key, then: pm2 restart peptidex',
      },
    },
    { status: allOk ? 200 : 207 }
  );
}
