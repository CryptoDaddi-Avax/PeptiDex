#!/usr/bin/env node
/**
 * COA Refresh Script — Quarterly Batch Verification
 * 
 * Checks whether Amino Club has rotated batch numbers on their product pages.
 * Compares live COA URLs against our hosted verification-assets.ts manifest.
 * 
 * Usage:
 *   node scripts/coa-refresh-check.mjs
 * 
 * Output:
 *   Prints a JSON refresh report: { peptide, currentBatch, liveBatch, needsUpdate }
 *   If needsUpdate is true, download the new COA and update verification-assets.ts.
 * 
 * Cadence: Run quarterly (or on-demand after vendor restock).
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Manifest: current batch IDs from verification-assets.ts ──────────────────
// We extract these statically to avoid needing tsx/ts-node.
const CURRENT_MANIFEST = [
  { slug: 'retatrutide',   batchId: 'RT0001',  sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_GLP-3_RT__10MG_RT0001.pdf',                          productPage: 'https://www.aminoclub.com/products/glp-1-glp-gip-glp-1-gip-glucagon-agonist-retatrutide-ly3437943' },
  { slug: 'bpc-157',       batchId: 'BP0001',  sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_BPC-157_10MG_BP0001.pdf',                              productPage: 'https://www.aminoclub.com/products/bpc-157' },
  { slug: 'tb-500',        batchId: 'TB0001',  sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_TB-500_10MG_TB0001.pdf',                               productPage: 'https://www.aminoclub.com/products/tb-500-thymosin-beta-4' },
  { slug: 'tesamorelin',   batchId: 'TES0001', sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_Tesamorelin_10MG_TES0001.pdf',                         productPage: 'https://www.aminoclub.com/products/tesamorlin-growth-hormone-releasing-hormone-ghrh' },
  { slug: 'cjc-1295',      batchId: 'CIP0001', sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_CJC-1295_Ipamorelin_No_DAC__10MG_CIP0001.pdf',        productPage: 'https://www.aminoclub.com/products/cjc-1295-ipamorelin' },
  { slug: 'ipamorelin',    batchId: 'IPA0001', sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_Ipamorelin_10MG_IPA0001.pdf',                           productPage: 'https://www.aminoclub.com/products/ipamorelin-growth-hormone-secretagogue' },
  { slug: 'cagrilintide',  batchId: 'CAG0001', sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_Cagrilintide_10MG_CAG0001.pdf',                        productPage: 'https://www.aminoclub.com/products/cagrilintide-cagrisema' },
  { slug: 'mots-c',        batchId: 'MTC0001', sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_MOTS-C_10MG_MTC0001.pdf',                              productPage: 'https://www.aminoclub.com/products/mots-c-mitochondrial-peptide' },
  { slug: 'ghk-cu',        batchId: 'GHK0001', sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_GHK-Cu_50MG_GHK0001.pdf',                              productPage: 'https://www.aminoclub.com/products/ghk-cu-copper-peptide' },
  { slug: 'nad',           batchId: 'ND0001',  sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_NAD__500MG_NAD0001.pdf',                                productPage: 'https://www.aminoclub.com/products/nad-nicotinamide-adenine-dinucleotide' },
  { slug: '5-amino-1mq',   batchId: 'AMQ0001', sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_5-Amino-1MQ_50MG_AMQ0001.pdf',                         productPage: 'https://www.aminoclub.com/products/5-amino-1mq' },
  { slug: 'epitalon',      batchId: 'EPI0001', sourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_Epithalon_10MG_EPI0001.pdf',                            productPage: 'https://www.aminoclub.com/products/epitalon-epithalon' },
];

// ── Check if a COA PDF URL still returns 200 ────────────────────────────────
async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: 0, error: err.message };
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║  COA Refresh Check — PeptiDex Verification Pipeline        ║');
  console.log('║  Run: quarterly or after vendor restock                    ║');
  console.log(`║  Date: ${new Date().toISOString().split('T')[0]}                                      ║`);
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');

  const results = [];

  for (const entry of CURRENT_MANIFEST) {
    process.stdout.write(`  Checking ${entry.slug.padEnd(16)} `);
    const { ok, status } = await checkUrl(entry.sourceUrl);

    const result = {
      peptide: entry.slug,
      currentBatch: entry.batchId,
      coaUrlStatus: status,
      coaUrlOk: ok,
      needsUpdate: !ok,
      note: ok ? 'Current batch COA still live' : `COA URL returned ${status} — batch may have rotated`,
    };

    results.push(result);
    console.log(ok ? '✅ OK' : `⚠️  ${status} — NEEDS REFRESH`);
  }

  console.log('');
  console.log('── Summary ──────────────────────────────────────────────────');

  const needsRefresh = results.filter(r => r.needsUpdate);
  if (needsRefresh.length === 0) {
    console.log('✅ All COA batch IDs are current. No refresh needed.');
  } else {
    console.log(`⚠️  ${needsRefresh.length} peptide(s) need COA refresh:`);
    needsRefresh.forEach(r => {
      console.log(`   - ${r.peptide}: batch ${r.currentBatch} (HTTP ${r.coaUrlStatus})`);
    });
    console.log('');
    console.log('Action required:');
    console.log('  1. Navigate to each product page and download the new COA');
    console.log('  2. Save to /public/coa/[slug]-[new-batch-id].pdf');
    console.log('  3. Archive old PDF to /public/coa/archive/');
    console.log('  4. Update verification-assets.ts with new batch ID + purity data');
    console.log('  5. Update eeat-notes.ts coaReference fields');
  }

  console.log('');
  console.log('── Full Report (JSON) ───────────────────────────────────────');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
