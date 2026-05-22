/**
 * migrate-goal-pages.mjs
 * One-shot migration to fix the goal-pages.ts structural issues:
 * 1. Remove anti-aging and skin-aesthetics (consolidated to longevity + skin-aesthetic)
 * 2. Differentiate healing (acute angle) from injury-recovery (chronic angle)
 * 3. Add body-recomposition deep content
 * 4. Update relatedGoals references that pointed to removed slugs
 *
 * Run: node scripts/migrate-goal-pages.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '..', 'src', 'data', 'goal-pages.ts');
let content = readFileSync(filePath, 'utf8');

// ── 1. Remove anti-aging entry (duplicate of longevity) ─────────────────────
// Find the anti-aging block boundaries and excise it
const antiAgingStart = content.indexOf('\n    {\r\n        slug: "anti-aging"');
const antiAgingAlt = content.indexOf('\n    {\r\n        slug: \'"anti-aging"');
const startIdx = antiAgingStart > -1 ? antiAgingStart : content.indexOf("slug: \"anti-aging\"");
if (startIdx > -1) {
    // Find the start of the enclosing { by scanning backwards
    const blockStart = content.lastIndexOf('\n    {', startIdx);
    // Find the closing },\n    { that ends this entry
    const nextEntry = content.indexOf('\n    {\r\n        slug: "sleep-recovery"', blockStart);
    const nextEntryAlt = content.indexOf("\n    {\r\n        slug: \"sleep-recovery\"", blockStart);
    const endIdx = Math.max(nextEntry, nextEntryAlt);
    if (endIdx > -1) {
        content = content.slice(0, blockStart) +
            '\n    // anti-aging REMOVED — consolidated into /best/longevity (301 redirect in next.config.ts)' +
            content.slice(endIdx);
        console.log('✅ Removed anti-aging entry');
    } else {
        console.log('⚠️  Could not find end of anti-aging block');
    }
}

// ── 2. Remove skin-aesthetics entry (duplicate of skin-aesthetic) ────────────
const skinAestheticsSlug = '"skin-aesthetics"';
const saIdx = content.indexOf(`slug: ${skinAestheticsSlug}`);
if (saIdx > -1) {
    const blockStart = content.lastIndexOf('\n    {', saIdx);
    // Find the next entry after skin-aesthetics
    const nextEntry = content.indexOf('\n    {\r\n        slug: "gut-health"', blockStart);
    const nextEntryAlt = content.indexOf("\n    {\r\n        slug: \"gut-health\"", blockStart);
    const endIdx = Math.max(nextEntry, nextEntryAlt);
    if (endIdx > -1) {
        content = content.slice(0, blockStart) +
            '\n    // skin-aesthetics REMOVED — consolidated into /best/skin-aesthetic (301 redirect in next.config.ts)' +
            content.slice(endIdx);
        console.log('✅ Removed skin-aesthetics entry');
    } else {
        console.log('⚠️  Could not find end of skin-aesthetics block');
    }
}

// ── 3. Fix healing entry — update metadata to acute angle ───────────────────
content = content.replace(
    `slug: "healing",\r\n        title: "Best Peptides for Injury Recovery & Healing (2026)",\r\n        h1: "Best Peptides for Injury Recovery",\r\n        emoji: "🩹",\r\n        metaDescription: "Research guide to healing peptides: BPC-157, TB-500, KPV, and more. Evidence for tendon, ligament, muscle, and post-surgical recovery.",\r\n        intro: "Peptide-based healing protocols have become the go-to approach for athletes and individuals recovering from musculoskeletal injuries. BPC-157 and TB-500 form the backbone of most healing stacks, with supporting compounds for inflammation and mitochondrial support.",`,
    `slug: "healing",\r\n        title: "Best Peptides for Acute Soft-Tissue Healing (2026)",\r\n        h1: "Best Peptides for Healing",\r\n        emoji: "🩹",\r\n        metaDescription: "Research guide to peptides for acute soft-tissue repair: BPC-157, TB-500, KPV. Evidence for sprains, strains, muscle tears, and rapid post-injury recovery.",\r\n        intro: "Acute soft-tissue injuries — sprains, strains, recent muscle tears — respond best to rapid anti-inflammatory signaling and aggressive angiogenesis within the first 1–6 weeks. BPC-157 and TB-500 are the most-researched peptides for this acute phase, with KPV providing targeted NF-κB inhibition to control the inflammatory cascade.",`
);
console.log('✅ Updated healing entry to acute angle');

// Fix healing relatedGoals — remove skin-aesthetics reference
content = content.replace(
    `relatedGoals: ["gut-health", "sleep-recovery", "skin-aesthetics"],\r\n        keywords: ["best peptides for healing"`,
    `relatedGoals: ["injury-recovery", "sleep-recovery", "gut-health"],\r\n        keywords: ["acute healing peptides"`
);
content = content.replace(
    `keywords: ["best peptides for healing", "injury recovery peptides", "BPC-157 for injuries", "TB-500 healing", "peptides for tendon repair"],`,
    `keywords: ["acute healing peptides", "BPC-157 injury", "TB-500 sprain", "peptides for soft tissue repair", "acute injury recovery"],`
);
console.log('✅ Updated healing relatedGoals and keywords');

// ── 4. Update injury-recovery to chronic/post-surgical angle ─────────────────
const injuryIdx = content.indexOf('slug: "injury-recovery"');
if (injuryIdx > -1) {
    // Replace the title, h1, metaDescription, intro
    content = content.replace(
        `slug: "injury-recovery",\r\n        title: "Best Peptides for Injury Recovery (2026)",\r\n        h1: "Best Peptides for Injury Recovery",\r\n        emoji: "🩹",\r\n        metaDescription: "Research guide to healing peptides: BPC-157, TB-500, KPV. Evidence for tendon, ligament, muscle, and post-surgical recovery protocols.",\r\n        intro: "Peptide-based healing protocols have become the go-to approach for athletes and individuals recovering from musculoskeletal injuries. BPC-157 and TB-500 form the backbone of most healing stacks.",`,
        `slug: "injury-recovery",\r\n        title: "Best Peptides for Chronic Injury & Post-Surgical Recovery (2026)",\r\n        h1: "Best Peptides for Injury Recovery",\r\n        emoji: "🩹",\r\n        metaDescription: "Research guide to peptides for chronic injury and post-surgical rehabilitation: BPC-157, TB-500, GHK-Cu. Long-term tendinopathy, cartilage repair, and surgical recovery protocols.",\r\n        intro: "Chronic musculoskeletal injuries — persistent tendinopathy, post-surgical rehabilitation, long-term joint damage — require sustained structural repair rather than acute anti-inflammatory response. These peptides support collagen remodeling, vascular ingrowth, and connective tissue matrix restoration over 8–16 week protocols.",`
    );
    // Update peptide slugs — swap KPV position, add GHK-Cu as 3rd primary
    content = content.replace(
        `peptideSlugs: ["bpc-157", "tb-500", "kpv", "ss-31", "ghk-cu"],\r\n        stackNames: ["Injury Recovery Stack"],\r\n        relatedGoals: ["gut-health", "sleep-recovery", "skin-aesthetic"],\r\n        keywords: ["injury recovery peptides", "BPC-157 for injuries", "TB-500 healing", "peptides for tendon repair"],`,
        `peptideSlugs: ["bpc-157", "tb-500", "ghk-cu", "ss-31", "kpv"],\r\n        stackNames: ["Injury Recovery Stack"],\r\n        relatedGoals: ["healing", "sleep-recovery", "body-recomposition"],\r\n        keywords: ["chronic injury recovery peptides", "post-surgical peptide protocol", "tendinopathy peptides", "BPC-157 post-surgery", "peptides for joint repair"],`
    );
    console.log('✅ Updated injury-recovery to chronic/post-surgical angle');
}

// ── 5. Add body-recomposition deep content ────────────────────────────────────
const bodyRecompFaqsEnd = `            { question: "Can I do recomp without peptides?", answer: "Yes, but peptides optimize the process. The GH/IGF-1 axis support from Tesamorelin helps preserve lean mass during caloric deficit — the hardest part of natural recomposition." },\r\n        ]\r\n    },`;
const bodyRecompReplacement = `            { question: "Can I do recomp without peptides?", answer: "Yes, but the GH/IGF-1 axis support from Tesamorelin addresses the hardest part of natural recomposition: preserving lean mass during caloric deficit. Without it, caloric restriction typically causes muscle loss alongside fat loss, undermining the recomp goal." },
            { question: "What does Tesamorelin do specifically?", answer: "Tesamorelin is a GHRH analog that stimulates pulsatile GH release from the pituitary. The resulting GH selectively targets visceral adipose tissue (VAT) for lipolysis while preserving subcutaneous fat and lean mass. FDA-approved as EGRIFTA for HIV-associated lipodystrophy. The VAT-selective mechanism is documented in PMID 32701508 (JCI Insight, 2020)." },
            { question: "How does Ipamorelin complement Tesamorelin?", answer: "Tesamorelin acts on the GHRH receptor to initiate GH release. Ipamorelin acts on the ghrelin receptor (GHSR) as a selective secretagogue, suppressing somatostatin while avoiding ACTH/cortisol spikes. The combination drives larger, cleaner GH pulses than either alone — maximizing the anabolic signal during the overnight recovery window (PMID: 9849822)." },
        ],
        whyThesePeptides: \`<h2>The Physiology of Simultaneous Fat Loss and Lean Mass Retention</h2>
<p>Body recomposition — the simultaneous reduction of adipose tissue and preservation or increase of skeletal muscle — is physiologically challenging because the primary driver of fat loss (caloric deficit) actively opposes the primary driver of muscle retention (anabolic signaling and protein synthesis). Peptides like Tesamorelin, Ipamorelin, and BPC-157 address this conflict by manipulating the Growth Hormone axis to selectively target visceral fat while maintaining the anabolic environment required for lean mass preservation.</p>
<h3>Tier 1: Visceral Fat Mobilization — Tesamorelin</h3>
<p><strong>Tesamorelin</strong> is a synthetic analog of Growth Hormone-Releasing Hormone (GHRH). By amplifying pulsatile GH release, Tesamorelin drives the lipolytic effects of GH in a physiologically appropriate pattern. The resulting GH signal is highly selective for <em>visceral adipose tissue</em> (VAT) — the metabolically active fat surrounding the internal organs that secretes inflammatory cytokines and drives insulin resistance. Tesamorelin holds FDA approval (as EGRIFTA) specifically for the reduction of excess visceral abdominal fat, with clinical trials demonstrating an 18% reduction in VAT over 26 weeks while preserving lean mass (PMID: 22298602).</p>
<h3>Tier 2: Anabolic GH Pulse Amplification — Ipamorelin</h3>
<p>While Tesamorelin drives GH release through the GHRH receptor, <strong>Ipamorelin</strong> provides a complementary mechanism via the ghrelin receptor (GHSR). Ipamorelin releases GH in large, dose-dependent pulses without stimulating cortisol, ACTH, or prolactin. The synergy with Tesamorelin is mechanistically elegant: GHRH stimulates GH release while Ipamorelin simultaneously suppresses somatostatin, resulting in a significantly larger net GH pulse than either peptide achieves alone (PMID: 9849822). Administered before sleep, Ipamorelin amplifies the natural nocturnal GH surge — the peak anabolic window for muscle protein synthesis.</p>
<h3>Tier 3: Connective Tissue Support Under Training Load — BPC-157</h3>
<p><strong>BPC-157</strong> addresses the practical limitation of high-intensity recomposition training: connective tissue injury. Effective body recomposition requires resistance training significant enough to generate a muscle hypertrophy stimulus, but this load also stresses tendons and ligaments. BPC-157 provides structural support by upregulating VEGF (angiogenesis) and promoting tendon fibroblast proliferation. In a recomp protocol, BPC-157 is a recovery infrastructure compound that allows the training load necessary to maintain and build lean mass throughout the caloric deficit phase.</p>\`,
        whatResearchShows: \`<h2>Clinical and Preclinical Evidence for the Recomposition Stack</h2>
<p>The evidence base for this stack's components spans FDA-approved clinical trials (Tesamorelin), targeted mechanistic studies (Ipamorelin), and decades of preclinical healing research (BPC-157).</p>
<h3>Tesamorelin: FDA-Approved VAT Reduction</h3>
<p>The pivotal clinical evidence for Tesamorelin comes from the Phase 3 trials supporting FDA approval of EGRIFTA. In a 26-week, randomized, double-blind, placebo-controlled trial of 412 patients with excess VAT, Tesamorelin produced a statistically significant 18% reduction in visceral fat as measured by CT imaging, compared to no significant change in the placebo group (PMID: 22298602). Lean mass and subcutaneous fat were preserved. A 2020 study in <em>JCI Insight</em> demonstrated that Tesamorelin significantly reduced hepatic steatosis (liver fat) in patients with NAFLD — establishing its broader metabolic health applicability (PMID: 32701508).</p>
<h3>Ipamorelin: Selective GH Secretion Without Cortisol Spikes</h3>
<p>Early Phase 1 clinical data demonstrated that Ipamorelin elicits a dose-dependent GH release equivalent in magnitude to other GHRP compounds but uniquely absent of concurrent ACTH, cortisol, and prolactin elevation (PMID: 9849822). This selectivity is mechanistically significant: cortisol is catabolic to muscle and lipogenic in the visceral fat depot. Ipamorelin's clean GH pulse is a direct anabolic signal with none of the cortisol-mediated counter-signal.</p>
<h3>BPC-157: Tendon and Connective Tissue Recovery</h3>
<p>The healing literature on BPC-157 is extensive, with preclinical studies consistently demonstrating accelerated repair of transected tendons and ligament injuries in rat models (PMID: 21030672). BPC-157 promotes outgrowth of tendon fibroblasts and significantly upregulates VEGF expression at injury sites, enhancing vascular supply to poorly perfused connective tissues during high training load.</p>\`,
        howToEvaluate: \`<h2>Tracking Body Recomposition Outcomes</h2>
<p>Scale weight is an unreliable metric for recomposition — simultaneous fat loss and lean mass gain can produce minimal net weight change while significantly improving body composition. Objective measurement requires imaging or impedance testing.</p>
<ul>
  <li><strong>DEXA Scan (Dual-Energy X-ray Absorptiometry):</strong> The gold standard for body composition. Provides precise fat mass, lean mass, and bone density measurements with regional breakdowns. Run at baseline, week 6, and week 12. A successful Tesamorelin/Ipamorelin protocol will show declining fat mass in the trunk/visceral region concurrent with stable or increasing lean mass.</li>
  <li><strong>Waist Circumference and Waist-to-Height Ratio:</strong> The most accessible proxy for visceral fat reduction. Tesamorelin's VAT-selective lipolysis should produce a measurable reduction in waist circumference even if total body weight changes minimally.</li>
  <li><strong>Serum IGF-1:</strong> The primary biomarker for GH axis activity. A successful Tesamorelin + Ipamorelin protocol should raise IGF-1 into the upper-normal range for age. Monitor monthly to ensure dosing is physiologically effective without exceeding normal-range targets.</li>
</ul>\`,
        alternativeApproaches: \`<h2>Alternative Stacks and Tradeoffs</h2>
<p>The Tesamorelin + Ipamorelin recomp stack is optimized for individuals with significant visceral adiposity and adequate training capacity. Other profiles require different approaches.</p>
<h3>The GLP-1 Recomp Stack (Semaglutide + CJC-1295)</h3>
<p>For individuals with high baseline body fat and poor insulin sensitivity, a GLP-1 agonist (Semaglutide) combined with a GHRH analog (CJC-1295) provides aggressive systemic fat loss via appetite suppression while CJC-1295 maintains the GH signal to limit lean mass catabolism. <strong>Tradeoff:</strong> Semaglutide's profound appetite suppression makes adequate protein intake difficult. This stack requires rigorous protein tracking (minimum 2.2g/kg body weight).</p>
<h3>The Lean Bulk Stack (CJC-1295 + Ipamorelin only)</h3>
<p>For lean individuals (sub-15% body fat) who primarily want to add lean mass with minimal fat gain, the Tesamorelin component is unnecessary. CJC-1295 + Ipamorelin alone provides the GH axis optimization needed for anabolic support during a moderate caloric surplus. <strong>Tradeoff:</strong> Without Tesamorelin's VAT-selective lipolysis, any caloric surplus will produce some fat gain alongside muscle gain — an acceptable tradeoff in a true lean bulk.</p>\`,
        references: [
            { "id": 1, "text": "Falutz et al. (2010). Tesamorelin, a growth hormone-releasing factor analogue, in HIV-associated lipodystrophy.", "link": "https://pubmed.ncbi.nlm.nih.gov/22298602/" },
            { "id": 2, "text": "Stanley et al. (2020). Effects of tesamorelin on hepatic transcriptomic signatures in HIV-associated NAFLD.", "link": "https://pubmed.ncbi.nlm.nih.gov/32701508/" },
            { "id": 3, "text": "Raun et al. (1998). Ipamorelin, the first selective growth hormone secretagogue.", "link": "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
            { "id": 4, "text": "Sikiric et al. (2010). Focus on epicatechin, BPC 157, and other compounds for tendon healing.", "link": "https://pubmed.ncbi.nlm.nih.gov/21030672/" },
            { "id": 5, "text": "Teichman et al. (2006). Prolonged stimulation of GH and IGF-I secretion by CJC-1295.", "link": "https://pubmed.ncbi.nlm.nih.gov/16822960/" }
        ]
    },`;

if (content.includes(bodyRecompFaqsEnd)) {
    content = content.replace(bodyRecompFaqsEnd, bodyRecompReplacement);
    console.log('✅ Added body-recomposition deep content');
} else {
    console.log('⚠️  Could not find body-recomposition FAQs end anchor — skipping');
}

// ── 6. Fix any remaining broken relatedGoals references ──────────────────────
content = content.replace(/relatedGoals: \["skin-aesthetics"/g, 'relatedGoals: ["skin-aesthetic"');
content = content.replace(/relatedGoals: \["anti-aging"/g, 'relatedGoals: ["longevity"');
content = content.replace(/, "skin-aesthetics"\]/g, ', "skin-aesthetic"]');
content = content.replace(/, "anti-aging"\]/g, ', "longevity"]');
console.log('✅ Fixed broken relatedGoals references');

// ── 7. Write the fixed file ───────────────────────────────────────────────────
writeFileSync(filePath, content, 'utf8');
console.log('\n✅ goal-pages.ts migration complete. Run tsc --noEmit to verify.');
