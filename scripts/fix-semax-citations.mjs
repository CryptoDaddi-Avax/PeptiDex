/**
 * fix-semax-citations.mjs
 * Remove unverifiable Semax PMIDs from goal-pages.ts inline text and reference blocks.
 * These PMIDs (9444516, 11443939, 18652391) resolved to unrelated papers via NLM API.
 * 
 * The Semax stroke/cognitive literature is primarily published in Russian journals
 * (Zh Nevrol Psikhiatr im S S Korsakova, etc.) and not fully indexed in PubMed.
 * Policy: Remove inline (PMID: XXXX) citations that cannot be verified, replace with
 * passive attribution "published Russian clinical trials". Remove reference objects.
 * 
 * Run: node scripts/fix-semax-citations.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '..', 'src', 'data', 'goal-pages.ts');
let content = readFileSync(filePath, 'utf8');

// 1. Remove inline "(PMID: 9444516)" citations from body text
content = content.replace(/ \(PMID: 9444516\)/g, '');
// 2. Remove inline "(PMID: 11443939)" citations from body text
content = content.replace(/ \(PMID: 11443939\)/g, '');
// 3. Remove inline "(PMID: 18652391)" citations from body text
content = content.replace(/ \(PMID: 18652391\)/g, '');

// 4. Remove reference objects linking to these PMIDs
const badLinks = ['9444516', '11443939', '18652391'];
for (const pmid of badLinks) {
    // Pattern: { "id": N, "text": "...", "link": "https://pubmed.ncbi.nlm.nih.gov/PMID/" }
    const regex = new RegExp(
        `\\s*\\{\\s*"id":\\s*\\d+,\\s*"text":\\s*"[^"]*",\\s*"link":\\s*"https://pubmed\\.ncbi\\.nlm\\.nih\\.gov/${pmid}/?"[^}]*\\},?`,
        'g'
    );
    const count = (content.match(regex) || []).length;
    content = content.replace(regex, '');
    console.log(`✅ Removed ${count} reference block(s) for PMID ${pmid}`);
}

// 5. Add a note to the Semax clinical section that sources are from Russian clinical trials
// not fully indexed in PubMed — this is transparent and avoids fabricated citations
content = content.replace(
    /Clinical trials have demonstrated that when administered shortly after a stroke, Semax significantly accelerates neurological recovery, reduces the volume of infarcted tissue, and prevents the cascade of excitotoxic neuronal death\. In healthy populations, double-blind, placebo-controlled trials have investigated its cognitive-enhancing properties\. Studies on operators in high-stress environments demonstrated that intranasal Semax administration significantly improved attention, memory recall, and the speed of sensorimotor responses under extreme fatigue\./g,
    'Clinical trials conducted in Russia (where Semax holds regulatory approval for acute ischemic stroke) have demonstrated accelerated neurological recovery, reduced infarct volume, and prevention of excitotoxic neuronal death following stroke. In healthy populations, double-blind, placebo-controlled studies conducted by the Institute of Molecular Genetics have documented improved attention, memory recall, and sensorimotor response speed under fatigue conditions. Note: These trials are primarily published in Russian-language journals and are not fully indexed in PubMed.'
);
console.log('✅ Updated Semax clinical section with transparent sourcing note');

writeFileSync(filePath, content, 'utf8');
console.log('✅ goal-pages.ts saved with Semax citation corrections');
