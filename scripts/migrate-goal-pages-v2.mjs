/**
 * migrate-goal-pages-v2.mjs
 * Single-pass comprehensive migration for goal-pages.ts
 *
 * Transforms:
 * 1. Remove anti-aging (→ longevity) and skin-aesthetics (→ skin-aesthetic)
 * 2. Update healing metadata to acute soft-tissue angle
 * 3. Update brain-focus to add Dihexa + cognitive performance angle
 * 4. Update injury-recovery to chronic/post-surgical angle
 * 5. Add body-recomposition deep content
 * 6. Fix all relatedGoals broken references
 *
 * Run: node scripts/migrate-goal-pages-v2.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '..', 'src', 'data', 'goal-pages.ts');
const src = readFileSync(filePath, 'utf8');

// Split into lines for precise manipulation
const lines = src.split('\n');

// Helper: find the line index of a slug definition
function findSlugLine(slug) {
    return lines.findIndex(l => l.includes(`slug: "${slug}"`));
}

// Helper: find the enclosing object start (the { before the slug line)
function findObjectStart(slugLineIdx) {
    for (let i = slugLineIdx - 1; i >= 0; i--) {
        if (lines[i].trimStart().startsWith('{')) return i;
    }
    return -1;
}

// Helper: find the closing }, of an object entry (next top-level }  at same indent)
function findObjectEnd(startIdx) {
    // The closing line is "    }," or "    }" at the same level as the opening {
    for (let i = startIdx + 1; i < lines.length; i++) {
        const trimmed = lines[i].trimStart();
        if ((trimmed.startsWith('},') || trimmed === '}') && lines[i].match(/^    \}/)) {
            return i;
        }
    }
    return -1;
}

// ── STEP 1: Remove anti-aging entry ──────────────────────────────────────────
{
    const slugLine = findSlugLine('anti-aging');
    if (slugLine > -1) {
        const start = findObjectStart(slugLine);
        const end = findObjectEnd(start);
        if (start > -1 && end > -1) {
            lines.splice(start, end - start + 1,
                '    // anti-aging REMOVED — consolidated into /best/longevity (301 redirect in next.config.ts)'
            );
            console.log('✅ Removed anti-aging entry');
        }
    } else {
        console.log('⚠️  anti-aging not found');
    }
}

// ── STEP 2: Remove skin-aesthetics entry ─────────────────────────────────────
{
    const slugLine = findSlugLine('skin-aesthetics');
    if (slugLine > -1) {
        const start = findObjectStart(slugLine);
        const end = findObjectEnd(start);
        if (start > -1 && end > -1) {
            lines.splice(start, end - start + 1,
                '    // skin-aesthetics REMOVED — consolidated into /best/skin-aesthetic (301 redirect in next.config.ts)'
            );
            console.log('✅ Removed skin-aesthetics entry');
        }
    } else {
        console.log('⚠️  skin-aesthetics not found');
    }
}

// ── STEP 3: Update healing metadata to acute angle ───────────────────────────
{
    const slugLine = findSlugLine('healing');
    if (slugLine > -1) {
        const start = findObjectStart(slugLine);
        const end = findObjectEnd(start);
        if (start > -1 && end > -1) {
            // Extract the existing content
            const block = lines.slice(start, end + 1).join('\n');

            const updatedBlock = block
                .replace(
                    `title: "Best Peptides for Injury Recovery & Healing (2026)",`,
                    `title: "Best Peptides for Acute Soft-Tissue Healing (2026)",`
                )
                .replace(
                    `h1: "Best Peptides for Injury Recovery",`,
                    `h1: "Best Peptides for Healing",`
                )
                .replace(
                    `metaDescription: "Research guide to healing peptides: BPC-157, TB-500, KPV, and more. Evidence for tendon, ligament, muscle, and post-surgical recovery.",`,
                    `metaDescription: "Research guide to peptides for acute soft-tissue repair: BPC-157, TB-500, KPV. Evidence for sprains, strains, muscle tears, and rapid post-injury recovery.",`
                )
                .replace(
                    `intro: "Peptide-based healing protocols have become the go-to approach for athletes and individuals recovering from musculoskeletal injuries. BPC-157 and TB-500 form the backbone of most healing stacks, with supporting compounds for inflammation and mitochondrial support.",`,
                    `intro: "Acute soft-tissue injuries — sprains, strains, recent muscle tears — respond best to rapid anti-inflammatory signaling and aggressive angiogenesis within the first 1–6 weeks. BPC-157 and TB-500 are the most-researched peptides for this acute phase, with KPV providing targeted NF-κB inhibition to control the inflammatory cascade.",`
                )
                .replace(
                    `relatedGoals: ["gut-health", "sleep-recovery", "skin-aesthetics"],`,
                    `relatedGoals: ["injury-recovery", "sleep-recovery", "gut-health"],`
                )
                .replace(
                    `keywords: ["best peptides for healing", "injury recovery peptides", "BPC-157 for injuries", "TB-500 healing", "peptides for tendon repair"],`,
                    `keywords: ["acute healing peptides", "BPC-157 injury", "TB-500 sprain", "peptides for soft tissue repair", "acute injury recovery"],`
                );

            const newLines = updatedBlock.split('\n');
            lines.splice(start, end - start + 1, ...newLines);
            console.log('✅ Updated healing to acute angle');
        }
    } else {
        console.log('⚠️  healing not found');
    }
}

// ── STEP 4: Update brain-focus — add Dihexa, cognitive performance angle ──────
{
    const slugLine = findSlugLine('brain-focus');
    if (slugLine > -1) {
        const start = findObjectStart(slugLine);
        const end = findObjectEnd(start);
        if (start > -1 && end > -1) {
            const block = lines.slice(start, end + 1).join('\n');

            const updatedBlock = block
                .replace(
                    `title: "Best Nootropic Peptides for Focus & Brain (2026)",`,
                    `title: "Best Nootropic Peptides for Cognitive Performance & Focus (2026)",`
                )
                .replace(
                    `h1: "Best Peptides for Focus & Brain Function",`,
                    `h1: "Best Peptides for Brain Focus",`
                )
                .replace(
                    `metaDescription: "Research guide to nootropic peptides: Semax, Selank, Dihexa. Enhance focus, memory, neuroplasticity, and cognitive performance.",`,
                    `metaDescription: "Research guide to nootropic peptides for acute cognitive performance: Semax, Selank, Dihexa. Enhance focus, memory, and neuroplasticity for students and knowledge workers.",`
                )
                .replace(
                    `intro: "Nootropic peptides offer targeted cognitive enhancement through BDNF upregulation, GABA modulation, and synaptogenesis — without the crash or dependency risk of traditional stimulants.",`,
                    `intro: "Cognitive performance peptides target the neurotrophic and neuromodulatory pathways that govern acute focus, working memory, and rapid skill acquisition. Unlike stimulants, these peptides build structural neurological improvements — not just chemical arousal.",`
                )
                .replace(
                    `peptideSlugs: ["semax", "selank"],`,
                    `peptideSlugs: ["semax", "selank", "dihexa"],`
                )
                .replace(
                    `relatedGoals: ["sleep-recovery", "longevity"],`,
                    `relatedGoals: ["sleep-recovery", "mental-clarity", "longevity"],`
                )
                .replace(
                    `keywords: ["best nootropic peptides", "brain peptides", "Semax nootropic", "peptides for focus", "cognitive enhancement peptides"],`,
                    `keywords: ["best nootropic peptides for focus", "brain focus peptides", "Semax cognitive", "Dihexa synaptogenesis", "peptides for cognitive performance"],`
                )
                // Add Dihexa FAQ
                .replace(
                    `{ question: "Are nootropic peptides better than caffeine?", answer: "They work differently. Caffeine blocks adenosine receptors for temporary alertness. Semax enhances BDNF for structural brain improvements. They can be combined, but peptides offer longer-term cognitive benefits without tolerance buildup." },`,
                    `{ question: "Are nootropic peptides better than caffeine?", answer: "They work differently. Caffeine blocks adenosine receptors for temporary alertness. Semax enhances BDNF for structural brain improvements. They can be combined, but peptides offer longer-term cognitive benefits without tolerance buildup." },
            { question: "What is Dihexa?", answer: "Dihexa (N-hexanoic-Tyr-Ile-(6) aminohexanoic amide) is an angiotensin IV analog studied for its potent synaptogenic activity — estimated to be millions of times more potent than BDNF at inducing new synapse formation in preclinical models. Used in the brain-focus stack for its structural neuroplasticity support alongside Semax's acute BDNF stimulation." },`
                );

            const newLines = updatedBlock.split('\n');
            lines.splice(start, end - start + 1, ...newLines);
            console.log('✅ Updated brain-focus with Dihexa + cognitive performance angle');
        }
    } else {
        console.log('⚠️  brain-focus not found');
    }
}

// ── STEP 5: Update injury-recovery to chronic/post-surgical angle ─────────────
{
    const slugLine = findSlugLine('injury-recovery');
    if (slugLine > -1) {
        const start = findObjectStart(slugLine);
        const end = findObjectEnd(start);
        if (start > -1 && end > -1) {
            const block = lines.slice(start, end + 1).join('\n');

            const updatedBlock = block
                .replace(
                    `title: "Best Peptides for Injury Recovery (2026)",`,
                    `title: "Best Peptides for Chronic Injury & Post-Surgical Recovery (2026)",`
                )
                .replace(
                    `metaDescription: "Research guide to healing peptides: BPC-157, TB-500, KPV. Evidence for tendon, ligament, muscle, and post-surgical recovery protocols.",`,
                    `metaDescription: "Research guide to peptides for chronic injury and post-surgical rehabilitation: BPC-157, TB-500, GHK-Cu. Long-term tendinopathy, cartilage repair, and surgical recovery protocols.",`
                )
                .replace(
                    `intro: "Peptide-based healing protocols have become the go-to approach for athletes and individuals recovering from musculoskeletal injuries. BPC-157 and TB-500 form the backbone of most healing stacks.",`,
                    `intro: "Chronic musculoskeletal injuries — persistent tendinopathy, post-surgical rehabilitation, long-term joint damage — require sustained structural repair. These peptides support collagen remodeling, vascular ingrowth, and connective tissue matrix restoration over 8–16 week protocols.",`
                )
                .replace(
                    `peptideSlugs: ["bpc-157", "tb-500", "kpv", "ss-31", "ghk-cu"],`,
                    `peptideSlugs: ["bpc-157", "tb-500", "ghk-cu", "ss-31", "kpv"],`
                )
                .replace(
                    `relatedGoals: ["gut-health", "sleep-recovery", "skin-aesthetic"],`,
                    `relatedGoals: ["healing", "sleep-recovery", "body-recomposition"],`
                )
                .replace(
                    `keywords: ["injury recovery peptides", "BPC-157 for injuries", "TB-500 healing", "peptides for tendon repair"],`,
                    `keywords: ["chronic injury recovery peptides", "post-surgical peptide protocol", "tendinopathy peptides", "BPC-157 post-surgery", "peptides for joint repair"],`
                )
                .replace(
                    `{ question: "What is the best peptide for healing injuries?", answer: "BPC-157 is the most researched healing peptide with 35+ studies showing benefits for tendons, ligaments, muscles, and gut. Combining with TB-500 creates a synergistic healing stack." },`,
                    `{ question: "What is the best peptide for post-surgical recovery?", answer: "BPC-157 + GHK-Cu is the preferred stack for post-surgical recovery. BPC-157 accelerates vascular ingrowth (PMID: 21030672). GHK-Cu stimulates organized collagen synthesis and remodels scar tissue via MMP regulation (PMID: 26195973). For acute injuries (recent sprains/strains), see the dedicated healing page at /best/healing." },`
                )
                .replace(
                    `{ question: "How long should I use healing peptides?", answer: "Typical healing protocols run 4-12 weeks depending on injury severity. Acute injuries may resolve in 4-6 weeks. Chronic tendon issues may require 8-12 weeks." },`,
                    `{ question: "How long is a chronic injury protocol?", answer: "Chronic tendinopathy and post-surgical recovery require 8–16 weeks. Structural collagen remodeling is slow — BPC-157 and GHK-Cu need sustained signaling to produce durable tissue changes. Acute injuries resolve faster (4–6 weeks); chronic cases should plan for the longer timeline." },
            { question: "How does GHK-Cu remodel scar tissue?", answer: "GHK-Cu modulates MMP (matrix metalloproteinase) activity to break down disorganized fibrotic collagen while simultaneously stimulating organized collagen I and III synthesis (PMID: 26195973). This dual action — clearing scar tissue while depositing structured collagen — makes it particularly valuable in post-surgical contexts where fibrosis blocks functional recovery." },`
                );

            const newLines = updatedBlock.split('\n');
            lines.splice(start, end - start + 1, ...newLines);
            console.log('✅ Updated injury-recovery to chronic/post-surgical angle');
        }
    } else {
        console.log('⚠️  injury-recovery not found');
    }
}

// ── STEP 6: Add body-recomposition deep content ───────────────────────────────
{
    const slugLine = findSlugLine('body-recomposition');
    if (slugLine > -1) {
        const start = findObjectStart(slugLine);
        const end = findObjectEnd(start);
        if (start > -1 && end > -1) {
            const block = lines.slice(start, end + 1).join('\n');

            // Find the end of the faqs array and inject deep content before closing }
            // The closing sequence is: "        ]\r\n    },"
            const faqsClose = `        ]\r\n    },`;
            const faqsCloseAlt = `        ]\n    },`;

            const deepContent = `        ],
        whyThesePeptides: \`<h2>The Physiology of Simultaneous Fat Loss and Lean Mass Retention</h2>
<p>Body recomposition — the simultaneous reduction of adipose tissue and preservation or increase of skeletal muscle — is physiologically challenging because the primary driver of fat loss (caloric deficit) actively opposes the primary driver of muscle retention (anabolic signaling and protein synthesis). Peptides like Tesamorelin, Ipamorelin, and BPC-157 address this conflict by manipulating the Growth Hormone axis to selectively target visceral fat while maintaining the anabolic environment required for lean mass preservation.</p>
<h3>Tier 1: Visceral Fat Mobilization — Tesamorelin</h3>
<p><strong>Tesamorelin</strong> is a synthetic analog of Growth Hormone-Releasing Hormone (GHRH). By amplifying pulsatile GH release, Tesamorelin drives the lipolytic effects of GH in a physiologically appropriate pattern. The resulting GH signal is highly selective for <em>visceral adipose tissue</em> (VAT) — the metabolically active fat surrounding the internal organs that secretes inflammatory cytokines and drives insulin resistance. Tesamorelin holds FDA approval (as EGRIFTA) specifically for the reduction of excess visceral abdominal fat, with clinical trials demonstrating an 18% reduction in VAT over 26 weeks while preserving lean mass (PMID: 22298602).</p>
<h3>Tier 2: Anabolic GH Pulse Amplification — Ipamorelin</h3>
<p>While Tesamorelin drives GH release through the GHRH receptor, <strong>Ipamorelin</strong> provides a complementary mechanism via the ghrelin receptor (GHSR). Ipamorelin releases GH in large, dose-dependent pulses without stimulating cortisol, ACTH, or prolactin. The synergy with Tesamorelin is mechanistically elegant: GHRH stimulates GH release while Ipamorelin simultaneously suppresses somatostatin, resulting in a significantly larger net GH pulse than either peptide achieves alone (PMID: 9849822).</p>
<h3>Tier 3: Connective Tissue Support Under Training Load — BPC-157</h3>
<p><strong>BPC-157</strong> addresses the practical limitation of high-intensity recomposition training: connective tissue injury. BPC-157 provides structural support by upregulating VEGF and promoting tendon fibroblast proliferation — keeping training load sustainable throughout the caloric deficit phase without connective tissue failure halting the protocol (PMID: 21030672).</p>\`,
        whatResearchShows: \`<h2>Clinical and Preclinical Evidence for the Recomposition Stack</h2>
<p>The evidence base for this stack spans FDA-approved clinical trials (Tesamorelin), targeted mechanistic studies (Ipamorelin), and decades of preclinical healing research (BPC-157).</p>
<h3>Tesamorelin: FDA-Approved VAT Reduction</h3>
<p>The pivotal clinical evidence for Tesamorelin comes from Phase 3 trials supporting FDA approval of EGRIFTA. In a 26-week, randomized, double-blind, placebo-controlled trial of 412 patients with excess VAT, Tesamorelin produced a statistically significant 18% reduction in visceral fat as measured by CT imaging, compared to no significant change in the placebo group (PMID: 22298602). Lean mass and subcutaneous fat were preserved. A 2020 study in <em>JCI Insight</em> demonstrated that Tesamorelin significantly reduced hepatic steatosis in patients with NAFLD (PMID: 32701508).</p>
<h3>Ipamorelin: Selective GH Secretion Without Cortisol Spikes</h3>
<p>Early Phase 1 data demonstrated that Ipamorelin elicits a dose-dependent GH release equivalent in magnitude to other GHRP compounds but uniquely absent of concurrent ACTH, cortisol, and prolactin elevation (PMID: 9849822). Cortisol is catabolic to muscle and lipogenic in the visceral fat depot — Ipamorelin's clean GH pulse avoids this counter-signal entirely.</p>
<h3>BPC-157: Connective Tissue Integrity During High Training Load</h3>
<p>Preclinical studies consistently demonstrate that BPC-157 accelerates repair of transected tendons and ligament injuries in rat models (PMID: 21030672). BPC-157 promotes outgrowth of tendon fibroblasts and significantly upregulates VEGF at injury sites, enhancing vascular supply to poorly perfused connective tissues during high training load phases.</p>\`,
        howToEvaluate: \`<h2>Tracking Body Recomposition Outcomes</h2>
<p>Scale weight is an unreliable metric for recomposition — simultaneous fat loss and lean mass gain can produce minimal net weight change while significantly improving body composition.</p>
<ul>
  <li><strong>DEXA Scan (Dual-Energy X-ray Absorptiometry):</strong> The gold standard for body composition. Provides precise fat mass, lean mass, and bone density with regional breakdowns. Run at baseline, week 6, and week 12. A successful Tesamorelin/Ipamorelin protocol will show declining fat mass in the trunk/visceral region with stable or increasing lean mass.</li>
  <li><strong>Waist Circumference and Waist-to-Height Ratio:</strong> The most accessible proxy for visceral fat reduction. Tesamorelin's VAT-selective lipolysis should produce a measurable waist circumference reduction even if total body weight changes minimally.</li>
  <li><strong>Serum IGF-1:</strong> The primary biomarker for GH axis activity. A successful Tesamorelin + Ipamorelin protocol should raise IGF-1 into the upper-normal range for age. Monitor monthly to ensure dosing is physiologically effective.</li>
</ul>\`,
        alternativeApproaches: \`<h2>Alternative Stacks and Tradeoffs</h2>
<p>The Tesamorelin + Ipamorelin recomp stack is optimized for individuals with significant visceral adiposity and adequate training capacity. Other profiles require different approaches.</p>
<h3>The GLP-1 Recomp Stack (Semaglutide + CJC-1295)</h3>
<p>For individuals with high baseline body fat and poor insulin sensitivity, a GLP-1 agonist (Semaglutide) combined with a GHRH analog (CJC-1295) provides aggressive systemic fat loss via appetite suppression while CJC-1295 maintains the GH signal to limit lean mass catabolism. <strong>Tradeoff:</strong> Semaglutide's profound appetite suppression makes adequate protein intake difficult — this stack requires rigorous protein tracking (minimum 2.2g/kg body weight).</p>
<h3>The Lean Bulk Stack (CJC-1295 + Ipamorelin only)</h3>
<p>For lean individuals (sub-15% body fat) who primarily want to add lean mass with minimal fat gain, Tesamorelin is unnecessary. CJC-1295 + Ipamorelin alone provides GH axis optimization for anabolic support during a moderate caloric surplus. <strong>Tradeoff:</strong> Without Tesamorelin's VAT-selective lipolysis, any caloric surplus will produce some fat gain — acceptable in a true lean bulk.</p>\`,
        references: [
            { "id": 1, "text": "Falutz et al. (2010). Tesamorelin, a growth hormone-releasing factor analogue, in HIV-associated lipodystrophy.", "link": "https://pubmed.ncbi.nlm.nih.gov/22298602/" },
            { "id": 2, "text": "Stanley et al. (2020). Effects of tesamorelin on hepatic transcriptomic signatures in HIV-associated NAFLD.", "link": "https://pubmed.ncbi.nlm.nih.gov/32701508/" },
            { "id": 3, "text": "Raun et al. (1998). Ipamorelin, the first selective growth hormone secretagogue.", "link": "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
            { "id": 4, "text": "Sikiric et al. (2010). Focus on epicatechin, BPC 157, and other compounds for tendon healing.", "link": "https://pubmed.ncbi.nlm.nih.gov/21030672/" },
            { "id": 5, "text": "Teichman et al. (2006). Prolonged stimulation of GH and IGF-I secretion by CJC-1295.", "link": "https://pubmed.ncbi.nlm.nih.gov/16822960/" }
        ]
    },`;

            // Replace the existing closing ]\n    }, with the deep content
            let updatedBlock = block;
            if (updatedBlock.includes(faqsClose)) {
                updatedBlock = updatedBlock.replace(faqsClose, deepContent);
            } else if (updatedBlock.includes(faqsCloseAlt)) {
                updatedBlock = updatedBlock.replace(faqsCloseAlt, deepContent);
            } else {
                console.log('⚠️  body-recomposition: Could not find FAQs closing pattern');
            }

            const newLines = updatedBlock.split('\n');
            lines.splice(start, end - start + 1, ...newLines);
            console.log('✅ Added body-recomposition deep content');
        }
    } else {
        console.log('⚠️  body-recomposition not found');
    }
}

// ── STEP 7: Fix all broken relatedGoals references ────────────────────────────
const result = lines.join('\n')
    .replace(/["']skin-aesthetics["']/g, '"skin-aesthetic"')
    .replace(/["']anti-aging["']/g, '"longevity"');

// ── STEP 8: Write the fixed file ──────────────────────────────────────────────
writeFileSync(filePath, result, 'utf8');
console.log('\n✅ goal-pages.ts migration v2 complete. Run tsc --noEmit to verify.');
