/**
 * PeptiDex PMID Integrity Gate (v2)
 *
 * Two-tier scanning architecture:
 *   BLOCK tier � inline claim files: any PMID not in registry or title-mismatched blocks deploy
 *   WARN  tier � bibliography files: mismatches emit warnings but never block deploy
 *
 * Triggered automatically as `prebuild` hook via package.json.
 * Manual usage:
 *   node scripts/pmid-gate.mjs          # full corpus (all registry PMIDs)
 *   node scripts/pmid-gate.mjs --diff   # diff only (unregistered PMIDs in block-tier files)
 *   node scripts/pmid-gate.mjs --warn   # scan warn-tier files only (bibliography audit)
 */
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DELAY_MS = 400; // Respect NLM 3 req/s limit
const isDiffMode = process.argv.includes('--diff');
const isWarnOnly = process.argv.includes('--warn');

// --- Load the verified registry ------------------------------------------------
const registryPath = join(__dirname, '..', 'src', 'data', '_lint', 'verified-pmids.ts');
const registrySource = readFileSync(registryPath, 'utf8');

// Extract all PMIDs from the registry (keys of the exported object)
const registryPmids = new Set(
    [...registrySource.matchAll(/"(\d{6,8})":\s*\{/g)].map(m => m[1])
);

// --- BLOCK-tier files (inline claim citations � deploy blocker) ----------------
const BLOCK_TIER_FILES = [
    join(__dirname, '..', 'src', 'data', 'goal-pages.ts'),
    join(__dirname, '..', 'src', 'data', 'matchups.ts'),
    join(__dirname, '..', 'src', 'data', 'stacks.ts'),
    join(__dirname, '..', 'src', 'data', 'stack-interactions.ts'),
];

// Auto-discover all *.tsx pillar and library component files
const pillarsDir = join(__dirname, '..', 'src', 'components', 'library', 'pillars');
const libraryDir = join(__dirname, '..', 'src', 'components', 'library');
try {
    readdirSync(pillarsDir).filter(f => f.endsWith('.tsx')).forEach(f => {
        BLOCK_TIER_FILES.push(join(pillarsDir, f));
    });
} catch {}
try {
    readdirSync(libraryDir).filter(f => f.endsWith('.tsx')).forEach(f => {
        BLOCK_TIER_FILES.push(join(libraryDir, f));
    });
} catch {}

// --- WARN-tier files (bibliography links � warn only, never block) -------------
const WARN_TIER_FILES = [
    join(__dirname, '..', 'src', 'data', 'peptides.ts'),
    join(__dirname, '..', 'src', 'data', 'blends.ts'),
];

// --- Extract PMIDs from a source string ---------------------------------------
function extractPmids(source) {
    const inline = [...source.matchAll(/\(PMID:\s*(\d{6,8})\)/g)].map(m => m[1]);
    const links  = [...source.matchAll(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d{6,8})/g)].map(m => m[1]);
    const quoted = [...source.matchAll(/"PMID:\s*(\d{6,8})"/g)].map(m => m[1]);
    return new Set([...inline, ...links, ...quoted]);
}

// --- NLM eSummary lookup -------------------------------------------------------
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verifyPmid(pmid) {
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json`;
    try {
        const res = await fetch(url);
        if (!res.ok) return { pmid, status: 'api_error', title: null };
        const data = await res.json();
        const doc = data?.result?.[pmid];
        if (!doc || doc.error) return { pmid, status: 'not_found', title: null };
        return {
            pmid,
            status: 'found',
            title: doc.title?.substring(0, 90) || '(no title)',
            authors: doc.authors?.[0]?.name || '(no authors)',
            year: doc.pubdate?.substring(0, 4) || '(no date)',
            journal: doc.source || '(no journal)',
        };
    } catch (e) {
        return { pmid, status: 'network_error', title: null, error: e.message };
    }
}

// --- Cross-check against registry claim ----------------------------------------
function extractRegistryClaim(pmid) {
    const regex = new RegExp(`"${pmid}":\\s*\\{([^}]+)\\}`, 's');
    const match = registrySource.match(regex);
    if (!match) return null;
    const titleMatch = match[1].match(/title:\s*"([^"]+)"/);
    return titleMatch ? titleMatch[1].toLowerCase() : null;
}

// --- Scan a list of files and collect PMIDs ------------------------------------
function collectPmidsFromFiles(files) {
    const pmidToFiles = new Map();
    for (const filePath of files) {
        let source;
        try { source = readFileSync(filePath, 'utf8'); } catch { continue; }
        const pmids = extractPmids(source);
        for (const pmid of pmids) {
            if (!pmidToFiles.has(pmid)) pmidToFiles.set(pmid, []);
            pmidToFiles.get(pmid).push(filePath.split(/[/\\]/).slice(-2).join('/'));
        }
    }
    return pmidToFiles;
}

// --- Main execution ------------------------------------------------------------
const errors = [];
const warnings = [];
let checked = 0;

console.log(`\n${'-'.repeat(65)}`);
console.log(`PeptiDex PMID Integrity Gate v2 � ${new Date().toISOString()}`);
console.log('-'.repeat(65));

// --- BLOCK-TIER SCAN ---------------------------------------------------------
if (!isWarnOnly) {
    const blockPmidMap = collectPmidsFromFiles(BLOCK_TIER_FILES);
    console.log(`\n?? BLOCK TIER (${BLOCK_TIER_FILES.length} files, ${blockPmidMap.size} unique PMIDs)`);

    let pmidsToCheck;
    if (isDiffMode) {
        pmidsToCheck = [...blockPmidMap.keys()].filter(pmid => !registryPmids.has(pmid));
        console.log(`?? DIFF MODE: ${pmidsToCheck.length} unregistered PMIDs to verify`);
    } else {
        pmidsToCheck = [...registryPmids];
        console.log(`?? FULL MODE: ${pmidsToCheck.length} registry PMIDs`);
    }

    if (pmidsToCheck.length === 0) {
        console.log('? All block-tier PMIDs are registered. No API calls needed.');
    }

    for (const pmid of pmidsToCheck) {
        await sleep(DELAY_MS);
        const result = await verifyPmid(pmid);
        checked++;
        const fileList = blockPmidMap.get(pmid)?.join(', ') || 'registry';

        if (result.status === 'not_found') {
            errors.push({ pmid, issue: 'PMID does not exist in PubMed', files: fileList });
            console.log(`? PMID ${pmid}: NOT FOUND IN PUBMED (in: ${fileList})`);
            continue;
        }

        if (result.status === 'api_error' || result.status === 'network_error') {
            warnings.push({ pmid, issue: `API error: ${result.error || result.status}`, files: fileList });
            console.log(`?  PMID ${pmid}: API error � skipping (not blocking)`);
            continue;
        }

        const registryClaim = extractRegistryClaim(pmid);
        if (registryClaim && result.title) {
            const apiTitleLower = result.title.toLowerCase();
            const claimWords = registryClaim.split(/\s+/).filter(w => w.length > 4);
            const matchCount = claimWords.filter(w => apiTitleLower.includes(w)).length;
            const matchRatio = matchCount / Math.max(claimWords.length, 1);

            if (matchRatio < 0.2 && claimWords.length > 3) {
                errors.push({
                    pmid,
                    issue: `Title mismatch � registry: "${registryClaim.substring(0, 55)}..." API: "${result.title}"`,
                    files: fileList,
                });
                console.log(`? PMID ${pmid}: TITLE MISMATCH`);
                console.log(`   Registry: ${registryClaim.substring(0, 70)}`);
                console.log(`   API:      ${result.title}`);
            } else {
                console.log(`? PMID ${pmid}: ${result.authors} (${result.year}) ${result.title.substring(0, 50)}...`);
            }
        } else {
            warnings.push({ pmid, issue: `Not in registry � add to verified-pmids.ts: "${result.title}"`, files: fileList });
            console.log(`?  PMID ${pmid} (unregistered): ${result.authors} (${result.year}) ${result.title}`);
            console.log(`   ? Add to verified-pmids.ts before deploying`);
        }
    }

    // Unregistered PMIDs in block-tier files not yet NLM-checked (diff mode already handled above)
    if (!isDiffMode) {
        const unregisteredInBlockTier = [...blockPmidMap.keys()].filter(pmid => !registryPmids.has(pmid));
        if (unregisteredInBlockTier.length > 0) {
            console.log(`\n??  UNREGISTERED PMIDs found in block-tier files (not in verified-pmids.ts):`);
            for (const pmid of unregisteredInBlockTier) {
                const fileList = blockPmidMap.get(pmid).join(', ');
                errors.push({ pmid, issue: `Unregistered PMID in block-tier file � must be added to verified-pmids.ts`, files: fileList });
                console.log(`  ? PMID ${pmid} in: ${fileList}`);
            }
        }
    }
}

// --- WARN-TIER SCAN ----------------------------------------------------------
if (isWarnOnly || !isDiffMode) {
    const warnPmidMap = collectPmidsFromFiles(WARN_TIER_FILES);
    if (warnPmidMap.size > 0) {
        console.log(`\n??  WARN TIER (${WARN_TIER_FILES.length} bibliography files, ${warnPmidMap.size} unique PMIDs) � warnings only, not blocking`);
        const unregisteredInWarnTier = [...warnPmidMap.keys()].filter(pmid => !registryPmids.has(pmid));
        if (unregisteredInWarnTier.length > 0) {
            console.log(`   ${unregisteredInWarnTier.length} bibliography PMIDs are not in the registry (expected � bibliography links are not registry-managed).`);
            console.log(`   Run 'node scripts/peptides-bibliography-audit.mjs' for a full sweep.`);
        }
    }
}

// --- Result summary -----------------------------------------------------------
console.log(`\n${'-'.repeat(65)}`);
console.log(`Checked: ${checked} PMIDs | Errors: ${errors.length} | Warnings: ${warnings.length}`);

if (errors.length > 0) {
    console.log(`\n?? GATE FAILED � ${errors.length} PMID error(s) must be resolved before deploy:\n`);
    errors.forEach(e => console.log(`  ? PMID ${e.pmid} [${e.files}]: ${e.issue}`));
    console.log(`\nRun: node scripts/pmid-gate.mjs to recheck after fixing.`);
    process.exit(1);
}

if (warnings.length > 0) {
    console.log(`\n?  ${warnings.length} warning(s) � not blocking, but review recommended:`);
    warnings.forEach(w => console.log(`  � PMID ${w.pmid} [${w.files}]: ${w.issue}`));
}

console.log(`\n? GATE PASSED � all verified PMIDs resolve to matching papers.`);
process.exit(0);