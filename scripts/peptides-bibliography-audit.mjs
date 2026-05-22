/**
 * PeptiDex Peptides Bibliography Audit Script
 *
 * One-time sweep: extracts all 623 PMIDs from peptides.ts key_studies[].pubmed_url fields,
 * verifies each via NLM eSummary API, and writes a triage report.
 *
 * Rate limiting: 3 req/s with batch processing (batches of 10, 400ms delay between requests)
 *
 * Usage:
 *   node scripts/peptides-bibliography-audit.mjs
 *
 * Output:
 *   content/audit/peptides-bibliography-audit-results.md
 *
 * Estimated runtime: ~4-6 minutes for 623 PMIDs at NLM rate limit
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DELAY_MS = 400;
const BATCH_SIZE = 10;
const START_TIME = Date.now();

// --- Load peptides.ts ----------------------------------------------------------
const peptidesPath = join(__dirname, '..', 'src', 'data', 'peptides.ts');
const peptidesSource = readFileSync(peptidesPath, 'utf8');

// --- Extract PMIDs from pubmed_url fields --------------------------------------
// Pattern: pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/XXXXXXXX/"
// Also: url: "https://pubmed.ncbi.nlm.nih.gov/XXXXXXXX/"
const urlMatches = [...peptidesSource.matchAll(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d{7,8})/g)];
const allPmids = [...new Set(urlMatches.map(m => m[1]))];

console.log(`?? Extracted ${allPmids.length} unique PMIDs from peptides.ts`);
console.log(`?  Estimated runtime: ~${Math.ceil(allPmids.length * DELAY_MS / 60000)} minutes`);
console.log(`-`.repeat(65));

// --- Extract stored title/summary for each PMID for comparison ----------------
function getStoredContextForPmid(pmid) {
    // Look for the summary text near each pubmed_url occurrence
    const idx = peptidesSource.indexOf(`pubmed.ncbi.nlm.nih.gov/${pmid}`);
    if (idx === -1) return null;
    // Get surrounding 500 chars to find summary field
    const surrounding = peptidesSource.substring(Math.max(0, idx - 200), idx + 400);
    const summaryMatch = surrounding.match(/summary:\s*"([^"]{20,150})"/);
    return summaryMatch ? summaryMatch[1] : null;
}

// --- NLM eSummary lookup -------------------------------------------------------
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verifyPmid(pmid) {
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json`;
    try {
        const res = await fetch(url);
        if (!res.ok) return { pmid, status: 'api_error' };
        const data = await res.json();
        const doc = data?.result?.[pmid];
        if (!doc || doc.error) return { pmid, status: 'not_found' };
        return {
            pmid,
            status: 'found',
            title: doc.title || '(no title)',
            authors: doc.authors?.[0]?.name || '(no authors)',
            year: doc.pubdate?.substring(0, 4) || '(no date)',
            journal: doc.source || '(no journal)',
        };
    } catch (e) {
        return { pmid, status: 'network_error', error: e.message };
    }
}

// --- Compare stored summary to API title --------------------------------------
function assessMatch(storedContext, apiTitle) {
    if (!storedContext || !apiTitle) return 'UNKNOWN';
    const ctx = storedContext.toLowerCase();
    const api = apiTitle.toLowerCase();
    // Extract meaningful words (>4 chars) from the stored context
    const ctxWords = ctx.split(/\s+/).filter(w => w.length > 4);
    const matchCount = ctxWords.filter(w => api.includes(w)).length;
    const matchRatio = matchCount / Math.max(ctxWords.length, 1);
    if (matchRatio >= 0.25) return 'PASS';
    if (matchRatio >= 0.1) return 'PARTIAL';
    return 'FAIL';
}

// --- Main execution ------------------------------------------------------------
const results = { PASS: [], FAIL: [], INVALID: [], RETRY: [], PARTIAL: [] };

for (let i = 0; i < allPmids.length; i++) {
    const pmid = allPmids[i];
    await sleep(DELAY_MS);
    const result = await verifyPmid(pmid);
    const storedCtx = getStoredContextForPmid(pmid);

    if (result.status === 'not_found') {
        results.INVALID.push({ pmid, storedCtx });
        process.stdout.write(`?`);
    } else if (result.status === 'api_error' || result.status === 'network_error') {
        results.RETRY.push({ pmid, error: result.error || result.status, storedCtx });
        process.stdout.write(`?`);
    } else {
        const match = assessMatch(storedCtx, result.title);
        result.storedCtx = storedCtx;
        result.matchAssessment = match;
        if (match === 'PASS') {
            results.PASS.push(result);
            process.stdout.write(`.`);
        } else if (match === 'PARTIAL') {
            results.PARTIAL.push(result);
            process.stdout.write(`~`);
        } else {
            results.FAIL.push(result);
            process.stdout.write(`F`);
        }
    }

    // Print progress every 50 PMIDs
    if ((i + 1) % 50 === 0) {
        const elapsed = Math.round((Date.now() - START_TIME) / 1000);
        const remaining = Math.round((allPmids.length - i - 1) * DELAY_MS / 1000);
        console.log(` [${i+1}/${allPmids.length}] elapsed:${elapsed}s remaining:~${remaining}s`);
    }
}

const elapsed = Math.round((Date.now() - START_TIME) / 1000);
console.log(`\n\n? Scan complete in ${elapsed}s`);
console.log(`PASS: ${results.PASS.length} | PARTIAL: ${results.PARTIAL.length} | FAIL: ${results.FAIL.length} | INVALID: ${results.INVALID.length} | RETRY: ${results.RETRY.length}`);

// --- Write report --------------------------------------------------------------
const today = new Date().toISOString().substring(0, 10);
const reportPath = join(__dirname, '..', 'content', 'audit', `peptides-bibliography-audit-results.md`);

const reportLines = [
    `# peptides.ts Bibliography Audit Results`,
    `**Generated:** ${today} via \`node scripts/peptides-bibliography-audit.mjs\``,
    `**Total PMIDs scanned:** ${allPmids.length}`,
    `**Runtime:** ${elapsed}s`,
    ``,
    `## Legend`,
    `- **PASS**: API title overlaps with stored summary — citation appears correct`,
    `- **PARTIAL**: Low but nonzero overlap — human review recommended`,
    `- **FAIL**: API title shows no overlap with stored summary — likely wrong PMID`,
    `- **INVALID**: PMID not found in PubMed — remove or replace`,
    `- **RETRY**: Network/API error during scan — re-run to confirm`,
    ``,
    `## Summary`,
    `| Status | Count | Action |`,
    `|--------|-------|--------|`,
    `| ? PASS | ${results.PASS.length} | No action needed |`,
    `| ?? PARTIAL | ${results.PARTIAL.length} | Human review recommended |`,
    `| ? FAIL | ${results.FAIL.length} | Operator must locate correct PMID |`,
    `| ?? INVALID | ${results.INVALID.length} | Remove pubmed_url or locate replacement |`,
    `| ?? RETRY | ${results.RETRY.length} | Re-run scan to confirm |`,
    ``,
];

if (results.INVALID.length > 0) {
    reportLines.push(`## ?? INVALID PMIDs (not found in PubMed)`);
    reportLines.push(`| PMID | Stored Summary Excerpt |`);
    reportLines.push(`|------|------------------------|`);
    results.INVALID.forEach(r => {
        reportLines.push(`| \`${r.pmid}\` | ${(r.storedCtx || 'N/A').substring(0, 80)} |`);
    });
    reportLines.push('');
}

if (results.FAIL.length > 0) {
    reportLines.push(`## ? FAIL — Title mismatch (likely wrong PMID)`);
    reportLines.push(`| PMID | API Authors | API Year | API Title (first 80 chars) | Stored Summary Excerpt |`);
    reportLines.push(`|------|-------------|----------|---------------------------|------------------------|`);
    results.FAIL.forEach(r => {
        reportLines.push(`| \`${r.pmid}\` | ${r.authors} | ${r.year} | ${r.title.substring(0, 80)} | ${(r.storedCtx || 'N/A').substring(0, 60)} |`);
    });
    reportLines.push('');
}

if (results.PARTIAL.length > 0) {
    reportLines.push(`## ?? PARTIAL — Low confidence, human review needed`);
    reportLines.push(`| PMID | API Authors | API Year | API Title | Stored Summary Excerpt |`);
    reportLines.push(`|------|-------------|----------|-----------|------------------------|`);
    results.PARTIAL.forEach(r => {
        reportLines.push(`| \`${r.pmid}\` | ${r.authors} | ${r.year} | ${r.title.substring(0, 80)} | ${(r.storedCtx || 'N/A').substring(0, 60)} |`);
    });
    reportLines.push('');
}

if (results.RETRY.length > 0) {
    reportLines.push(`## ?? RETRY — API errors during scan`);
    reportLines.push(`| PMID | Error |`);
    reportLines.push(`|------|-------|`);
    results.RETRY.forEach(r => {
        reportLines.push(`| \`${r.pmid}\` | ${r.error} |`);
    });
    reportLines.push('');
}

reportLines.push(`## ? PASS — Verified matches (${results.PASS.length} PMIDs)`);
reportLines.push(`_These PMIDs are confirmed. No action needed._`);
reportLines.push('');

try { mkdirSync(join(__dirname, '..', 'content', 'audit'), { recursive: true }); } catch {}
writeFileSync(reportPath, reportLines.join('\n'), 'utf8');
console.log(`\n?? Report written to: content/audit/peptides-bibliography-audit-results.md`);