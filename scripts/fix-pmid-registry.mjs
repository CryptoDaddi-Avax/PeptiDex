/**
 * fix-pmid-registry.mjs
 * 
 * Applies the findings from the 2026-05-18 PMID audit:
 * 1. Removes wrong PMIDs from verified-pmids.ts
 * 2. Adds correct/new PMIDs to verified-pmids.ts  
 * 3. Fixes citation references in goal-pages.ts
 * 
 * Run: node scripts/fix-pmid-registry.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── FIX verified-pmids.ts ─────────────────────────────────────────────────────
const registryPath = join(__dirname, '..', 'src', 'data', '_lint', 'verified-pmids.ts');
let registry = readFileSync(registryPath, 'utf8');

// REMOVE wrong PMIDs
const wrongPmids = {
    '35653733': 'Was Han 2023 J Pers Soc Psychol (attractiveness/morality) — not SURMOUNT-1',
    '18056898': 'Was Hampton 2007 JAMA (cancer metastasis) — not Falutz NEJM Tesamorelin',
    '8345041':  'Was Rosen 1993 thyroxine/transthyretin — not Prakash Sermorelin BioDrugs',
    '9400262':  'Was Bühlmann 1997 German patient transfer paper — not Ashmarin Semax',
};

for (const [pmid, reason] of Object.entries(wrongPmids)) {
    // Find and remove the entry block
    const startMarker = `    "${pmid}": {`;
    const startIdx = registry.indexOf(startMarker);
    if (startIdx === -1) {
        console.log(`⚠️  PMID ${pmid} not found in registry — skipping`);
        continue;
    }
    // Find the closing },
    let depth = 0;
    let i = startIdx;
    while (i < registry.length) {
        if (registry[i] === '{') depth++;
        if (registry[i] === '}') {
            depth--;
            if (depth === 0) {
                // Include the trailing comma and newline
                let end = i + 1;
                if (registry[end] === ',') end++;
                if (registry[end] === '\n') end++;
                registry = registry.slice(0, startIdx) + registry.slice(end);
                break;
            }
        }
        i++;
    }
    console.log(`✅ Removed PMID ${pmid} (${reason})`);
}

// ADD correct PMIDs — insert before the closing };
const newEntries = `    "35658024": {
        authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
        title: "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
        journal: "N Engl J Med",
        year: 2022,
        verified_date: "2026-05-18",
        verified_by: "Antigravity/NLM-API"
    },
    "20554713": {
        authors: "Falutz J, Potvin D, Mamputu JC, et al.",
        title: "Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in human immunodeficiency virus-infected patients with excess abdominal fat: a pooled analysis of two multicenter, double-blind placebo-controlled phase 3 trials",
        journal: "J Clin Endocrinol Metab",
        year: 2010,
        verified_date: "2026-05-18",
        verified_by: "Antigravity/NLM-API"
    },
    "21030672": {
        authors: "Chang CH, Tsai WC, Lin MS, Hsu YH, Pang JH",
        title: "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration",
        journal: "J Appl Physiol",
        year: 2011,
        verified_date: "2026-05-18",
        verified_by: "Antigravity/NLM-API"
    },
    "25738459": {
        authors: "Lee C, Zeng J, Drew BG, et al.",
        title: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance",
        journal: "Cell Metab",
        year: 2015,
        verified_date: "2026-05-18",
        verified_by: "Antigravity/NLM-API"
    },
    "22298602": {
        authors: "Spooner LM, Olin JL",
        title: "Tesamorelin: a growth hormone-releasing factor analogue for HIV-associated lipodystrophy",
        journal: "Ann Pharmacother",
        year: 2012,
        verified_date: "2026-05-18",
        verified_by: "Antigravity/NLM-API"
    },
`;

registry = registry.replace('};', newEntries + '};');
console.log('✅ Added 5 verified PMIDs to registry');

writeFileSync(registryPath, registry, 'utf8');
console.log('✅ verified-pmids.ts saved\n');

// ── FIX goal-pages.ts citation references ────────────────────────────────────
const goalPagesPath = join(__dirname, '..', 'src', 'data', 'goal-pages.ts');
let goalPages = readFileSync(goalPagesPath, 'utf8');

// Fix 26195973 (cardiac remodeling mice) → 26236730 (GHK-Cu Int J Mol Sci — correct)
const before26195973 = (goalPages.match(/26195973/g) || []).length;
goalPages = goalPages.replace(/26195973/g, '26236730');
console.log(`✅ Fixed PMID 26195973→26236730 (${before26195973} occurrences in goal-pages.ts)`);

// Fix 17711202 (rainbow trout toxicology) → 21030672 (BPC-157 tendon outgrowth — correct)
const before17711202 = (goalPages.match(/17711202/g) || []).length;
goalPages = goalPages.replace(/17711202/g, '21030672');
console.log(`✅ Fixed PMID 17711202→21030672 (${before17711202} occurrences in goal-pages.ts)`);

// Fix 17560408 (scapholunate instability paper) → 10469335 (TB-500 wound healing — correct)
const before17560408 = (goalPages.match(/17560408/g) || []).length;
goalPages = goalPages.replace(/17560408/g, '10469335');
console.log(`✅ Fixed PMID 17560408→10469335 (${before17560408} occurrences in goal-pages.ts)`);

// Remove 11142145 citation (civic university student paper) — remove the whole reference object
// Pattern: { "id": N, "text": "...", "link": "...11142145..." }
goalPages = goalPages.replace(
    /\s*\{\s*"id":\s*\d+,\s*"text":\s*"[^"]*",\s*"link":\s*"https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/11142145\/"[^}]*\},?/g,
    ''
);
console.log('✅ Removed 11142145 citation (wrong — civic university paper)');

// Fix reference text strings that mention wrong authors alongside corrected PMIDs
// Specifically the "Goldstein et al. (2007)" TB-500 text that accompanied 17560408
goalPages = goalPages.replace(
    /"text": "Goldstein et al\. \(2007\)\. Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues\."/g,
    '"text": "Malinda KM et al. (1999). Thymosin beta4 accelerates wound healing."'
);
console.log('✅ Fixed Goldstein 2007 reference text → Malinda 1999 (correct TB-500 wound healing)');

// Fix the body-recomposition references: 22298602 text should be updated to Spooner (not Falutz)
// The Falutz claim cites "18% reduction in VAT" — correct PMID for that is 20554713
// Update reference text in body-recomposition section
goalPages = goalPages.replace(
    /"text": "Falutz et al\. \(2010\)\. Tesamorelin, a growth hormone-releasing factor analogue, in HIV-associated lipodystrophy\.", "link": "https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/22298602\/"/g,
    '"text": "Falutz J et al. (2010). Effects of tesamorelin in HIV-infected patients with excess abdominal fat: pooled Phase 3 analysis.", "link": "https://pubmed.ncbi.nlm.nih.gov/20554713/"'
);
// Also update the inline PMID reference in body text
goalPages = goalPages.replace(/\(PMID: 22298602\)/g, '(PMID: 20554713)');
console.log('✅ Fixed body-recomposition Tesamorelin Phase 3 PMID 22298602→20554713');

writeFileSync(goalPagesPath, goalPages, 'utf8');
console.log('✅ goal-pages.ts saved\n');

console.log('📋 OPERATOR ACTION REQUIRED:');
console.log('  1. Sermorelin PMID: 8345041 was REMOVED (wrong). Find correct PMID for Prakash BioDrugs 1999.');
console.log('  2. Semax nootropic: 9400262 was REMOVED (wrong). PMID 9444516 (Gusev 1998) is in goal-pages and should be added to registry.');
console.log('  3. Epitalon/Epithalon: 12937622 may be wrong — verify before use in content.');
console.log('  4. All content citing PMID 14523363 (Khavinson peptides/ageing) appears correct per NLM API.');
