import { NextResponse } from 'next/server';
import { verifiedPmids } from '@/data/_lint/verified-pmids';
import { createClient } from '@supabase/supabase-js';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const NLM_DELAY_MS = 400; // 3 req/s NLM rate limit

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface PmidVerificationResult {
  pmid: string;
  status: 'verified' | 'not_found' | 'mismatch' | 'api_error';
  registryTitle: string;
  apiTitle?: string;
  apiAuthors?: string;
  apiJournal?: string;
  apiYear?: string;
  matchRatio?: number;
  errorDetail?: string;
}

async function verifyPmid(pmid: string, registryTitle: string): Promise<PmidVerificationResult> {
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) {
      return { pmid, status: 'api_error', registryTitle, errorDetail: `HTTP ${res.status}` };
    }

    const data = await res.json();
    const doc = data?.result?.[pmid];

    if (!doc || doc.error) {
      return { pmid, status: 'not_found', registryTitle };
    }

    const apiTitle: string = doc.title || '';
    const apiAuthors: string = doc.authors?.[0]?.name || '';
    const apiJournal: string = doc.source || '';
    const apiYear: string = (doc.pubdate || '').substring(0, 4);

    // Token overlap check between registry claim and API title
    const registryWords = registryTitle.toLowerCase().split(/\s+/).filter((w: string) => w.length > 4);
    const apiTitleLower = apiTitle.toLowerCase();
    const matchCount = registryWords.filter((w: string) => apiTitleLower.includes(w)).length;
    const matchRatio = registryWords.length > 0 ? matchCount / registryWords.length : 1;

    const status: 'verified' | 'mismatch' = (matchRatio >= 0.2 || registryWords.length <= 3)
      ? 'verified'
      : 'mismatch';

    return { pmid, status, registryTitle, apiTitle, apiAuthors, apiJournal, apiYear, matchRatio };
  } catch (err) {
    return {
      pmid,
      status: 'api_error',
      registryTitle,
      errorDetail: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function GET(request: Request) {
  // Auth gate
  const authHeader = request.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const runDate = new Date().toISOString();
  const results: PmidVerificationResult[] = [];
  const errors: PmidVerificationResult[] = [];
  const mismatches: PmidVerificationResult[] = [];

  try {
    const pmidEntries = Object.entries(verifiedPmids);

    console.log(`[pmid-weekly-audit] Starting full corpus check of ${pmidEntries.length} registry entries`);

    for (const [pmid, meta] of pmidEntries) {
      await sleep(NLM_DELAY_MS);
      const result = await verifyPmid(pmid, meta.title);
      results.push(result);

      if (result.status === 'not_found' || result.status === 'api_error') {
        errors.push(result);
        console.error(`[pmid-audit] ❌ PMID ${pmid}: ${result.status} — ${result.errorDetail || 'not in PubMed'}`);
      } else if (result.status === 'mismatch') {
        mismatches.push(result);
        console.warn(
          `[pmid-audit] ⚠️  PMID ${pmid} MISMATCH — registry: "${meta.title.substring(0, 50)}" API: "${result.apiTitle?.substring(0, 50)}"`
        );
      } else {
        console.log(`[pmid-audit] ✅ PMID ${pmid}: ${result.apiAuthors} (${result.apiYear})`);
      }
    }

    // Persist delta report to Supabase if credentials are present
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      await supabase.from('citation_audit_runs').insert({
        run_date: runDate,
        total_checked: results.length,
        verified_count: results.filter(r => r.status === 'verified').length,
        error_count: errors.length,
        mismatch_count: mismatches.length,
        errors: errors.length > 0 ? errors : null,
        mismatches: mismatches.length > 0 ? mismatches : null,
      });
    }

    const summary = {
      run_date: runDate,
      total_checked: results.length,
      verified: results.filter(r => r.status === 'verified').length,
      not_found: errors.filter(r => r.status === 'not_found').length,
      api_errors: errors.filter(r => r.status === 'api_error').length,
      mismatches: mismatches.length,
      corpus_health: errors.length === 0 && mismatches.length === 0 ? 'CLEAN' : 'ERRORS_FOUND',
      error_details: errors,
      mismatch_details: mismatches,
    };

    if (errors.length > 0 || mismatches.length > 0) {
      console.error(`[pmid-audit] CORPUS DEGRADATION DETECTED — ${errors.length} errors, ${mismatches.length} mismatches`);
    } else {
      console.log(`[pmid-audit] ✅ Full corpus clean — ${results.length} PMIDs verified`);
    }

    return NextResponse.json(summary);
  } catch (err) {
    console.error('[pmid-weekly-audit] Fatal error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
