/**
 * Stack Conflict Checker — Interactions Matrix
 * ============================================
 * Each entry describes one pair (order-independent).
 * 
 * Severity scale:
 *   SAFE         — no known pharmacological conflict (displayed as "No known conflict"; not a safety guarantee)
 *   CAUTION      — theoretical concern or limited human data; proceed with awareness
 *   WARNING      — documented adverse effect or pharmacological conflict
 *   DO_NOT_STACK — clear contraindication; avoid combining
 * 
 * Citation types:
 *   pubmed       — direct PubMed link
 *   doi          — DOI link
 *   editorial    — editorial judgment, flagged clearly (no published pair study)
 */

export type StackSeverity = "SAFE" | "CAUTION" | "WARNING" | "DO_NOT_STACK";
export type CitationType  = "pubmed" | "doi" | "editorial";

export interface StackCitation {
  type: CitationType;
  label: string;          // e.g. "Sikiric et al., 2018 — J Physiol Pharmacol"
  url?: string;           // PubMed or DOI URL
}

export interface StackInteraction {
  peptideA: string;       // canonical peptide name (matches peptides.ts)
  peptideB: string;
  severity: StackSeverity;
  headline: string;       // one-line summary shown in badge
  detail: string;         // 2-4 sentence explanation of the concern or benefit
  citations: StackCitation[];
  alternatives?: string[];  // suggested replacements when conflict is flagged
}

// ─── Interactions Matrix ──────────────────────────────────────────────────────

export const stackInteractions: StackInteraction[] = [

  // ══════════ SAFE (no known conflict) — distinct mechanisms ════════════════

  {
    peptideA: "BPC-157",
    peptideB: "TB-500",
    severity: "SAFE",
    headline: "No known conflict — distinct mechanisms studied in tissue-repair models",
    detail: "BPC-157 has been studied in rodent models for local angiogenesis and tendon/GI lesion repair via VEGF upregulation. TB-500 (Thymosin Beta-4) has been studied for actin regulation and cell migration. The two mechanisms are distinct and non-overlapping. They are frequently discussed together; no adverse interactions are documented, but the combination has not been studied in controlled trials.",
    citations: [
      { type: "pubmed", label: "Sikiric et al., 2018 — Curr Pharm Des", url: "https://pubmed.ncbi.nlm.nih.gov/27138887/" },
      { type: "editorial", label: "Editorial: No pharmacokinetic conflict identified; distinct receptor profiles" },
    ],
  },

  {
    peptideA: "Ipamorelin",
    peptideB: "CJC-1295",
    severity: "SAFE",
    headline: "No known conflict — dual-axis GH secretagogue mechanism",
    detail: "Ipamorelin is a GH secretagogue receptor (GHSR) agonist that triggers a GH pulse. CJC-1295 (without DAC) is a GHRH analog that amplifies the pituitary response. They target different steps in the same axis, and combined GHRH + GHRP stimulation has been reported to amplify GH release. This specific pair is widely discussed but has not been tested in controlled human trials.",
    citations: [
      { type: "pubmed", label: "Raun et al., 1998 — Eur J Endocrinol (Ipamorelin)", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
      { type: "pubmed", label: "Teichman et al., 2006 — J Clin Endocrinol Metab (CJC-1295)", url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
      { type: "editorial", label: "Editorial: Dual-axis mechanism characterized for each compound separately; no published pair study" },
    ],
  },

  {
    peptideA: "BPC-157",
    peptideB: "GHK-Cu",
    severity: "SAFE",
    headline: "No known conflict — different mechanisms, no overlap",
    detail: "BPC-157 has been studied in animal models for angiogenesis and tendon repair via VEGF and nitric oxide pathways. GHK-Cu (copper peptide) has been studied for collagen synthesis, antioxidant activity and wound models through distinct copper-dependent enzymatic pathways. No pharmacological conflict is known. The combination has not been studied.",
    citations: [
      { type: "editorial", label: "Editorial: Non-overlapping receptor profiles; no antagonism expected, combination unstudied" },
    ],
  },

  {
    peptideA: "Ipamorelin",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "No known conflict — different axes",
    detail: "Ipamorelin operates via GHSR on the GH/IGF-1 axis. BPC-157 has been studied for local VEGF, NO and dopamine pathway effects. The two peptides do not compete for the same receptors or pathways. No adverse interactions are documented, but the combination has not been studied.",
    citations: [
      { type: "editorial", label: "Editorial: Distinct pharmacological axes; no conflict identified in literature" },
    ],
  },

  {
    peptideA: "Epithalon",
    peptideB: "GHK-Cu",
    severity: "SAFE",
    headline: "No known conflict — telomere and collagen research axes",
    detail: "Epitalon (Epithalon) is a tetrapeptide studied for telomerase activity in cell culture and pineal melatonin secretion. GHK-Cu has been studied for collagen synthesis and antioxidant pathways. The two mechanisms are independent and non-competing. No interactions have been reported; the combination has not been studied.",
    citations: [
      { type: "editorial", label: "Editorial: Non-overlapping mechanisms; no conflict in published literature" },
    ],
  },

  {
    peptideA: "TB-500",
    peptideB: "GHK-Cu",
    severity: "SAFE",
    headline: "No known conflict — distinct cell-migration and collagen mechanisms",
    detail: "TB-500 has been studied for cell migration and actin remodeling. GHK-Cu has been studied for collagen and GAG synthesis. Both are studied in tissue-repair models through different mechanisms. No documented pharmacological conflict; the combination has not been studied.",
    citations: [
      { type: "editorial", label: "Editorial: Distinct receptor/enzyme profiles; no antagonism expected, combination unstudied" },
    ],
  },

  {
    peptideA: "Sermorelin",
    peptideB: "Ipamorelin",
    severity: "SAFE",
    headline: "No known conflict — GHRH + GHSR dual-axis mechanism",
    detail: "Sermorelin is a GHRH analog; Ipamorelin is a GHSR agonist. Like CJC-1295 + Ipamorelin, this combination targets two steps in GH release, which is expected to amplify the GH response. Sermorelin has a shorter half-life than CJC-1295. The pair has not been tested in controlled trials.",
    citations: [
      { type: "editorial", label: "Editorial: Same dual-axis rationale as CJC-1295 + Ipamorelin; mechanism well characterized" },
    ],
  },

  // ══════════ CAUTION — Theoretical concerns or limited data ════════════════

  {
    peptideA: "Ipamorelin",
    peptideB: "MK-677",
    severity: "CAUTION",
    headline: "Redundant GH stimulation — diminishing returns, possible desensitization",
    detail: "Both Ipamorelin and MK-677 are GHSR agonists working through the same receptor. Co-administration may not provide additive benefit and could theoretically cause receptor desensitization with chronic use. MK-677 already provides sustained GH elevation; adding Ipamorelin may be redundant. Limited direct pair data available.",
    citations: [
      { type: "editorial", label: "Editorial: Theoretical receptor overlap; redundancy concern, not safety concern" },
    ],
    alternatives: ["CJC-1295", "Sermorelin"],
  },

  {
    peptideA: "CJC-1295",
    peptideB: "Sermorelin",
    severity: "CAUTION",
    headline: "Redundant GHRH agonism — no additive benefit expected",
    detail: "Both CJC-1295 and Sermorelin are GHRH analogs acting on the same pituitary receptor. Co-administration provides no established additive benefit. A GHRH analog paired with a GHSR agonist (Ipamorelin or MK-677) is the mechanistically complementary dual-axis combination.",
    citations: [
      { type: "editorial", label: "Editorial: Identical receptor target; redundancy confirmed by mechanism" },
    ],
    alternatives: ["Ipamorelin", "MK-677"],
  },

  {
    peptideA: "BPC-157",
    peptideB: "Insulin",
    severity: "CAUTION",
    headline: "BPC-157 modulates insulin sensitivity — possible glycemic interaction",
    detail: "Animal studies show BPC-157 can influence insulin secretion and peripheral glucose uptake. Co-administration with exogenous insulin may unpredictably alter glycemic response. Not formally contraindicated; an additive glycemic effect is mechanistically plausible but has not been studied in humans.",
    citations: [
      { type: "editorial", label: "Editorial: Animal data only; human insulin interaction not formally studied" },
    ],
  },

  {
    peptideA: "Melanotan II",
    peptideB: "PT-141",
    severity: "CAUTION",
    headline: "Same melanocortin receptor family — additive side effects",
    detail: "Melanotan II (MT-II) and PT-141 both activate melanocortin receptors (MT-II broadly, PT-141 selectively MC4R). Co-administration may produce additive nausea, facial flushing, blood pressure elevation, and prolonged erections. Not formally contraindicated; additive effects are mechanistically plausible (see cited study).",
    citations: [
      { type: "pubmed", label: "Wikberg et al., 2000 — Pharmacol Res (Melanocortin receptors)", url: "https://pubmed.ncbi.nlm.nih.gov/11023702/" },
      { type: "editorial", label: "Editorial: Receptor overlap confirmed; additive side effect profile expected" },
    ],
    alternatives: ["PT-141 alone"],
  },

  {
    peptideA: "Epithalon",
    peptideB: "Melatonin",
    severity: "CAUTION",
    headline: "Epitalon stimulates endogenous melatonin — overlaps with exogenous melatonin",
    detail: "Epitalon upregulates pineal melatonin secretion. Co-administering exogenous melatonin may push total melatonin levels higher than intended, causing excessive sedation or circadian disruption. Additive effects are mechanistically plausible; no pair study is available.",
    citations: [
      { type: "editorial", label: "Editorial: Mechanism-based redundancy; additive effect plausible" },
    ],
  },

  {
    peptideA: "IGF-1 LR3",
    peptideB: "Ipamorelin",
    severity: "CAUTION",
    headline: "Downstream IGF-1 elevation overlap — additive hypoglycemia risk",
    detail: "Ipamorelin stimulates GH release which triggers liver IGF-1 production. IGF-1 LR3 directly provides exogenous IGF-1. Combined use may produce supraphysiological IGF-1 signaling, increasing hypoglycemia risk and theoretically promoting abnormal cell proliferation with chronic exposure.",
    citations: [
      { type: "editorial", label: "Editorial: Synergistic IGF-1 pathway elevation; hypoglycemia is the primary concern" },
    ],
    alternatives: ["BPC-157", "TB-500"],
  },

  // ══════════ WARNING — Documented adverse effects ══════════════════════════

  {
    peptideA: "PT-141",
    peptideB: "Nitrates",
    severity: "WARNING",
    headline: "Additive blood pressure reduction — potential for hypotension",
    detail: "PT-141 causes transient blood pressure increases in some users via MC4R, but the concurrent use with nitrate vasodilators (including poppers/amyl nitrite) creates an unpredictable cardiovascular interaction. This mirrors the sildenafil/nitrate contraindication. Avoid combination.",
    citations: [
      { type: "editorial", label: "Editorial: Mechanism analogous to PDE5i + nitrate contraindication" },
    ],
  },

  {
    peptideA: "IGF-1 LR3",
    peptideB: "Insulin",
    severity: "WARNING",
    headline: "Significant hypoglycemia risk — additive glucose-lowering effects",
    detail: "Both IGF-1 LR3 and insulin lower blood glucose through related but distinct pathways. IGF-1 LR3 binds insulin receptors in addition to IGF-1R. Co-administration substantially increases hypoglycemia risk, and this pairing is flagged as a significant safety concern.",
    citations: [
    ],
  },

  // ══════════ BATCH 2: Nootropics ═══════════════════════════════════════════

  {
    peptideA: "Selank",
    peptideB: "Semax",
    severity: "SAFE",
    headline: "No known conflict — anxiolytic + pro-cognitive research profiles",
    detail: "Selank acts as an anxiolytic and immune modulator via tuftsin mimicry and serotonin/GABA modulation. Semax is a pro-cognitive peptide that upregulates BDNF and influences dopamine/serotonin systems. Their mechanisms are distinct: Selank has been studied for anxiolytic effects, Semax for BDNF signaling and neuroplasticity. No pharmacological conflict identified. The combination has not been studied in controlled trials.",
    citations: [
      { type: "pubmed", label: "Kozlovskiy et al., 2008 — Eksp Klin Farmakol (Selank mnestic)", url: "https://pubmed.ncbi.nlm.nih.gov/18488898/" },
      { type: "pubmed", label: "Agapova et al., 2007 — Neurosci Lett (Semax neurotrophin)", url: "https://pubmed.ncbi.nlm.nih.gov/17353092/" },
      { type: "editorial", label: "Editorial: Distinct primary receptors; complementary CNS profile expected" },
    ],
  },

  {
    peptideA: "Selank",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "No known conflict — central and peripheral mechanisms",
    detail: "Selank modulates anxiety and immune function centrally. BPC-157 has been studied in animal models for neuroprotective and gut-brain axis effects. The two operate in different compartments with non-competing mechanisms. The combination has not been studied.",
    citations: [
      { type: "pubmed", label: "Sikiric et al., 2016 — Curr Neuropharmacol (BPC-157 CNS)", url: "https://pubmed.ncbi.nlm.nih.gov/27138887/" },
      { type: "editorial", label: "Editorial: Non-overlapping mechanisms; combination unstudied" },
    ],
  },

  {
    peptideA: "Semax",
    peptideB: "Ipamorelin",
    severity: "SAFE",
    headline: "Cognitive + GH stack — distinct axes, no conflict",
    detail: "Semax operates on BDNF, dopamine, and serotonin pathways in the CNS. Ipamorelin stimulates pituitary GH release via GHSR. No receptor overlap and no documented adverse interactions. The combination has not been studied.",
    citations: [
      { type: "editorial", label: "Editorial: Distinct pharmacological axes; no interaction in published literature" },
    ],
  },

  {
    peptideA: "Selank",
    peptideB: "Semax",
    severity: "SAFE",
    headline: "No known conflict — anxiolytic + pro-cognitive research profiles",
    detail: "Selank and Semax are both nasal peptides from Russian research with complementary CNS profiles. Selank is primarily anxiolytic; Semax is primarily pro-cognitive. They modulate different neurotransmitter systems without pharmacological antagonism.",
    citations: [
      { type: "editorial", label: "Editorial: Clinical use in Russia documented; no adverse pair events reported" },
    ],
  },

  // ══════════ BATCH 2: Immune stack ═════════════════════════════════════════

  {
    peptideA: "LL-37",
    peptideB: "Thymosin Alpha-1",
    severity: "SAFE",
    headline: "No known conflict — innate + adaptive immune mechanisms",
    detail: "LL-37 (Cathelicidin) is an innate immune antimicrobial peptide that disrupts bacterial membranes and modulates inflammatory signaling via TLR4. Thymosin Alpha-1 (Thymalfasin) operates on the adaptive immune system by enhancing T-cell maturation and dendritic cell function. The two immunological axes are non-competing. The combination has not been studied, and neither peptide is FDA-approved.",
    citations: [
      { type: "pubmed", label: "Alford et al., 2020 — Front Microbiol (LL-37 immune)", url: "https://pubmed.ncbi.nlm.nih.gov/32982998/" },
      { type: "editorial", label: "Editorial: Distinct mechanisms; no published pair study" },
    ],
  },

  {
    peptideA: "Thymosin Alpha-1",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "No known conflict — immune modulation + tissue-repair research",
    detail: "Thymosin Alpha-1 enhances T-cell and NK cell activity via thymic hormone pathways. BPC-157 has been studied in animal models for anti-inflammatory and tissue-repair effects via the NO and dopamine systems. The mechanisms do not overlap. The combination has not been studied.",
    citations: [
      { type: "editorial", label: "Editorial: No pharmacological conflict identified; combination unstudied" },
    ],
  },

  {
    peptideA: "LL-37",
    peptideB: "BPC-157",
    severity: "CAUTION",
    headline: "Both modulate inflammatory signaling — possible opposing immune effects",
    detail: "LL-37 directly activates inflammatory pathways (TLR4, formyl peptide receptors) as part of its antimicrobial role. BPC-157 simultaneously suppresses some of those same inflammatory cascades. The opposing actions on inflammation could theoretically blunt efficacy of one or both compounds, or produce unpredictable immune signaling in acute infection settings. Opposing effects on inflammation are mechanistically plausible; see cited study.",
    citations: [
      { type: "pubmed", label: "Mookherjee et al., 2020 — Nat Rev Drug Discov (LL-37)", url: "https://pubmed.ncbi.nlm.nih.gov/32107480/" },
      { type: "editorial", label: "Editorial: Opposing pro/anti-inflammatory signals; interaction theoretical but plausible" },
    ],
  },

  // ══════════ BATCH 2: Sleep peptides ═══════════════════════════════════════

  {
    peptideA: "DSIP",
    peptideB: "Ipamorelin",
    severity: "SAFE",
    headline: "No known conflict — sleep-wake and GH-pulse mechanisms",
    detail: "DSIP (Delta Sleep-Inducing Peptide) promotes slow-wave sleep and may enhance the natural nocturnal GH surge. Ipamorelin also stimulates GH release. A complementary effect on overnight GH secretion is mechanistically plausible. No documented adverse pharmacological interaction.",
    citations: [
      { type: "pubmed", label: "Monnier et al., 1977 — Experientia (DSIP sleep)", url: "https://pubmed.ncbi.nlm.nih.gov/862769/" },
      { type: "editorial", label: "Editorial: Complementary effect plausible; no adverse interaction documented" },
    ],
  },

  {
    peptideA: "DSIP",
    peptideB: "Epithalon",
    severity: "SAFE",
    headline: "No known conflict — sleep and circadian research mechanisms",
    detail: "DSIP has been studied for delta-wave sleep and cortisol rhythms. Epitalon has been studied, mainly in Russian research, for pineal melatonin output and circadian gene expression. The mechanisms differ, and no adverse interactions have been reported; the combination has not been studied.",
    citations: [
      { type: "editorial", label: "Editorial: Complementary circadian mechanisms; no conflict identified" },
    ],
  },

  {
    peptideA: "DSIP",
    peptideB: "Melatonin",
    severity: "CAUTION",
    headline: "Additive sedation possible — overlapping sleep mechanisms",
    detail: "Both DSIP and melatonin promote sleep onset and slow-wave activity through overlapping but distinct mechanisms. Co-administration may produce stronger sedation than intended, causing difficulty waking or daytime grogginess. Additive effects are mechanistically plausible; see cited study.",
    citations: [
      { type: "pubmed", label: "Schoenenberger & Monnier, 1977 — Proc Natl Acad Sci (DSIP)", url: "https://pubmed.ncbi.nlm.nih.gov/265572/" },
      { type: "editorial", label: "Editorial: Additive sedation risk; no pair study available" },
    ],
  },

  // ══════════ BATCH 2: GH secretagogue redundancy ═══════════════════════════

  {
    peptideA: "GHRP-6",
    peptideB: "Ipamorelin",
    severity: "CAUTION",
    headline: "Redundant GHSR agonism — GHRP-6 adds hunger/cortisol with no clear GH benefit",
    detail: "Both GHRP-6 and Ipamorelin are GHSR agonists. GHRP-6 additionally increases cortisol and prolactin and causes significant appetite stimulation via ghrelin mimicry. Co-administration with Ipamorelin stacks the GHSR signaling without clear additive GH benefit while adding GHRP-6's unfavorable side effect profile. Ipamorelin is a cleaner GHSR agonist; GHRP-6 adds little in this combination.",
    citations: [
      { type: "pubmed", label: "Raun et al., 1998 — Eur J Endocrinol (Ipamorelin selectivity)", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
      { type: "pubmed", label: "Bowers et al., 1994 — J Clin Endocrinol Metab (GHRP-6)", url: "https://pubmed.ncbi.nlm.nih.gov/7962301/" },
      { type: "editorial", label: "Editorial: GHRP-6 cortisol/prolactin elevation adds unfavorable profile with no clear GH advantage" },
    ],
    alternatives: ["CJC-1295 + Ipamorelin", "Sermorelin + Ipamorelin"],
  },

  {
    peptideA: "GHRP-2",
    peptideB: "Ipamorelin",
    severity: "CAUTION",
    headline: "Redundant GHSR agonism — GHRP-2 cortisol elevation stacks unfavorably",
    detail: "GHRP-2 and Ipamorelin both activate GHSR. GHRP-2 additionally raises cortisol and prolactin more than Ipamorelin. Combining them provides redundant GHSR signaling with additive cortisol/prolactin effects but no proven additional GH release benefit over a GHRH + GHSR dual-axis stack, which is the mechanistically complementary alternative.",
    citations: [
      { type: "editorial", label: "Editorial: Additive cortisol/prolactin with no clear GH advantage; redundant mechanism" },
    ],
    alternatives: ["CJC-1295 + Ipamorelin"],
  },

  {
    peptideA: "Hexarelin",
    peptideB: "Ipamorelin",
    severity: "CAUTION",
    headline: "Redundant GHSR agonism — Hexarelin adds stronger cortisol/prolactin burden",
    detail: "Hexarelin is a potent GHSR agonist with significantly more cortisol and prolactin elevation than Ipamorelin due to lower receptor selectivity. Combining them stacks GHSR agonism and substantially raises cortisol/prolactin load without proven additive GH benefit. Hexarelin is also known to desensitize the GH axis faster than Ipamorelin with chronic use.",
    citations: [
      { type: "editorial", label: "Editorial: Hexarelin selectivity profile significantly less favorable than Ipamorelin" },
    ],
    alternatives: ["Ipamorelin alone", "CJC-1295 + Ipamorelin"],
  },

  {
    peptideA: "GHRP-6",
    peptideB: "CJC-1295",
    severity: "SAFE",
    headline: "GHSR + GHRH dual-axis — functional but GHRP-6 adds hunger/cortisol",
    detail: "Like Ipamorelin + CJC-1295, GHRP-6 + CJC-1295 targets both GHSR and GHRH receptor for amplified GH release. The dual-axis rationale is the same. The main difference vs Ipamorelin + CJC-1295 is GHRP-6's significant appetite stimulation and cortisol/prolactin elevation.",
    citations: [
      { type: "pubmed", label: "Bowers et al., 1994 — J Clin Endocrinol Metab (GHRP-6 + GHRH)", url: "https://pubmed.ncbi.nlm.nih.gov/7962301/" },
      { type: "editorial", label: "Editorial: Dual-axis rationale sound; side effect profile less selective than Ipamorelin variant" },
    ],
  },

  // ══════════ BATCH 2: Sexual health axis ═══════════════════════════════════

  {
    peptideA: "Kisspeptin-10",
    peptideB: "PT-141",
    severity: "SAFE",
    headline: "No known conflict — HPG axis + central melanocortin mechanisms",
    detail: "Kisspeptin-10 acts on GnRH neurons to upregulate LH/FSH and downstream testosterone, operating at the hypothalamic level. PT-141 (Bremelanotide) activates MC4R in the brain and acts on sexual desire independently of hormonal status. The two mechanisms are separate rather than competing. No pharmacological conflict is known; the combination has not been studied.",
    citations: [
      { type: "pubmed", label: "Dhillo et al., 2005 — J Clin Endocrinol Metab (Kisspeptin-10)", url: "https://pubmed.ncbi.nlm.nih.gov/16174713/" },
      { type: "editorial", label: "Editorial: Non-overlapping receptor targets; combination unstudied" },
    ],
  },

  {
    peptideA: "Kisspeptin-10",
    peptideB: "Melanotan II",
    severity: "CAUTION",
    headline: "HPG axis + melanocortin — possible LH surge and cardiovascular effects",
    detail: "Kisspeptin-10 drives a strong LH/FSH pulse and can produce transient hormonal surges. Melanotan II causes melanocortin-mediated sexual arousal, skin tanning, and nausea. Together, the combined hormonal activation and peripheral melanocortin effects may amplify cardiovascular stress (elevated BP, heart rate) and hormonal overshoot in some individuals. Additive effects are mechanistically plausible; see cited study.",
    citations: [
      { type: "pubmed", label: "Dhillo et al., 2005 — JCEM (Kisspeptin LH surge)", url: "https://pubmed.ncbi.nlm.nih.gov/16174713/" },
      { type: "editorial", label: "Editorial: Additive cardiovascular and hormonal stimulation plausible" },
    ],
  },

  // ══════════ BATCH 2: Longevity / anti-aging stack ═════════════════════════

  {
    peptideA: "Epithalon",
    peptideB: "Thymosin Alpha-1",
    severity: "SAFE",
    headline: "No known conflict — telomere and immune research mechanisms",
    detail: "Epitalon has been studied for telomerase activation (in cell culture) and melatonin regulation. Thymosin Alpha-1 has been studied for T-cell function and immune surveillance. No pharmacological conflict is known; the combination has not been studied.",
    citations: [
      { type: "pubmed", label: "Khavinson et al., 2003 — Neuroendocrinol Lett (Epitalon longevity)", url: "https://pubmed.ncbi.nlm.nih.gov/14523363/" },
      { type: "editorial", label: "Editorial: Non-overlapping mechanisms; no published pair study" },
    ],
  },

  {
    peptideA: "SS-31",
    peptideB: "GHK-Cu",
    severity: "SAFE",
    headline: "No known conflict — mitochondrial + extracellular matrix mechanisms",
    detail: "SS-31 (Elamipretide) is a mitochondria-targeting peptide studied for oxidative phosphorylation dysfunction and cardiolipin binding. GHK-Cu has been studied for collagen synthesis and antioxidant signaling. The two target intracellular vs extracellular aging mechanisms respectively, with no pharmacological competition.",
    citations: [
      { type: "pubmed", label: "Bhatt et al., 2017 — J Am Heart Assoc (SS-31 mitochondria)", url: "https://pubmed.ncbi.nlm.nih.gov/29217757/" },
      { type: "editorial", label: "Editorial: Intracellular + extracellular mechanisms; no overlap or conflict" },
    ],
  },

  {
    peptideA: "Epithalon",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "No known conflict — distinct cellular and tissue-repair mechanisms",
    detail: "Epitalon has been studied for telomerase activity and melatonin production. BPC-157 has been studied in animal models of gut, tendon and vascular injury via angiogenic pathways. No pharmacological conflict is known; the combination has not been studied.",
    citations: [
      { type: "editorial", label: "Editorial: Non-overlapping mechanisms; combination unstudied" },
    ],
  },

  // ══════════ BATCH 2: AOD-9604 / body composition ═════════════════════════

  {
    peptideA: "AOD-9604",
    peptideB: "Ipamorelin",
    severity: "SAFE",
    headline: "No known conflict — lipolysis + GH-pulse mechanisms",
    detail: "AOD-9604 targets adipose tissue lipolysis via the GH receptor fragment. Ipamorelin stimulates GH release from the pituitary. AOD-9604 does not stimulate GH itself (it is a fragment that bypasses the full GH effect on growth and insulin resistance). The two mechanisms do not overlap pharmacologically. The combination has not been studied.",
    citations: [
      { type: "pubmed", label: "Heffernan et al., 2001 — J Endocrinol (AOD-9604)", url: "https://pubmed.ncbi.nlm.nih.gov/11713213/" },
      { type: "editorial", label: "Editorial: Non-overlapping mechanisms; combination unstudied" },
    ],
  },

  // ══════════ BATCH 2: Additional CAUTION pairs ═════════════════════════════

  {
    peptideA: "IGF-1 LR3",
    peptideB: "CJC-1295",
    severity: "CAUTION",
    headline: "Upstream GH stimulation + downstream IGF-1 elevation — supraphysiological IGF-1 risk",
    detail: "CJC-1295 stimulates GH release, which drives hepatic IGF-1 production. IGF-1 LR3 additionally provides direct, highly bioavailable exogenous IGF-1. The combined effect may push IGF-1 levels significantly above physiological range, increasing hypoglycemia risk and long-term cell proliferation concerns. Additive effects are mechanistically plausible; no pair study is available.",
    citations: [
      { type: "editorial", label: "Editorial: Additive IGF-1 pathway; no pair study available" },
    ],
    alternatives: ["CJC-1295 + Ipamorelin without exogenous IGF-1", "IGF-1 LR3 alone"],
  },

  {
    peptideA: "MK-677",
    peptideB: "CJC-1295",
    severity: "CAUTION",
    headline: "Dual GH elevation pathways — additive IGF-1, glucose, and cortisol effects",
    detail: "MK-677 (Ibutamoren) is an oral GHSR agonist providing sustained 24-hour GH elevation. CJC-1295 is a GHRH analog that amplifies pituitary GH output. Together they produce continuous strong GH stimulation, which substantially raises IGF-1, may impair insulin sensitivity, and can elevate cortisol and prolactin with chronic exposure. Additive effects are mechanistically plausible; see cited study.",
    citations: [
      { type: "pubmed", label: "Teichman et al., 2006 — JCEM (CJC-1295)", url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
      { type: "editorial", label: "Editorial: Additive GH/IGF-1 elevation with chronic exposure" },
    ],
  },

  {
    peptideA: "Thymosin Alpha-1",
    peptideB: "LL-37",
    severity: "CAUTION",
    headline: "Dual immune activation — theoretical inflammatory overshoot in autoimmune contexts",
    detail: "Thymosin Alpha-1 and LL-37 act on different arms of immunity (adaptive + innate). However, in individuals with autoimmune conditions, simultaneously activating both immune axes may amplify inflammatory responses. This concern is theoretical; no pair study is available.",
    citations: [
      { type: "editorial", label: "Editorial: Autoimmune population-specific concern; risk in other populations not characterized" },
    ],
  },

  // ══════════ BATCH 2: DO NOT STACK additions ═══════════════════════════════

  {
    peptideA: "GHRP-6",
    peptideB: "GHRP-2",
    severity: "DO_NOT_STACK",
    headline: "Identical receptor, stacked cortisol/prolactin — no benefit, compounding toxicity",
    detail: "GHRP-6 and GHRP-2 both activate GHSR with similar potency but with pronounced cortisol and prolactin elevation as off-target effects. Co-administration doubles the cortisol/prolactin burden with no demonstrated additive GH benefit over either compound alone. This combination has no established research rationale and creates an unfavorable hormonal environment.",
    citations: [
      { type: "pubmed", label: "Bowers et al., 1994 — JCEM (GHRP-6)", url: "https://pubmed.ncbi.nlm.nih.gov/7962301/" },
      { type: "editorial", label: "Editorial: Identical GHSR target; additive cortisol/prolactin with no GH benefit" },
    ],
    alternatives: ["Ipamorelin + CJC-1295", "GHRP-6 or GHRP-2 with a GHRH analog"],
  },

];

// ─── Lookup engine ────────────────────────────────────────────────────────────

export type SeverityOrder = Record<StackSeverity, number>;
const SEVERITY_ORDER: SeverityOrder = {
  DO_NOT_STACK: 0,
  WARNING: 1,
  CAUTION: 2,
  SAFE: 3,
};

/** Returns all interactions relevant to a given set of peptide names */
export function checkStackInteractions(selectedNames: string[]): StackInteraction[] {
  if (selectedNames.length < 2) return [];

  const results: StackInteraction[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < selectedNames.length; i++) {
    for (let j = i + 1; j < selectedNames.length; j++) {
      const a = selectedNames[i];
      const b = selectedNames[j];
      const key = [a, b].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);

      const match = stackInteractions.find(
        (si) =>
          (si.peptideA === a && si.peptideB === b) ||
          (si.peptideA === b && si.peptideB === a)
      );

      if (match) results.push(match);
    }
  }

  return results.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
}

/** Summary counts for a stack */
export function stackSummary(interactions: StackInteraction[]) {
  return {
    doNotStack: interactions.filter((i) => i.severity === "DO_NOT_STACK").length,
    warnings:   interactions.filter((i) => i.severity === "WARNING").length,
    cautions:   interactions.filter((i) => i.severity === "CAUTION").length,
    safe:       interactions.filter((i) => i.severity === "SAFE").length,
  };
}

export const SEVERITY_CONFIG = {
  SAFE:         { label: "NO KNOWN CONFLICT", color: "emerald", bg: "bg-emerald-950/30", border: "border-emerald-500/30", text: "text-emerald-300", badge: "bg-emerald-500/20 text-emerald-300" },
  CAUTION:      { label: "CAUTION",       color: "amber",   bg: "bg-amber-950/30",   border: "border-amber-500/30",   text: "text-amber-300",   badge: "bg-amber-500/20 text-amber-300"   },
  WARNING:      { label: "WARNING",       color: "orange",  bg: "bg-orange-950/30",  border: "border-orange-500/30",  text: "text-orange-300",  badge: "bg-orange-500/20 text-orange-300"  },
  DO_NOT_STACK: { label: "DO NOT STACK",  color: "red",     bg: "bg-red-950/30",     border: "border-red-500/30",     text: "text-red-300",     badge: "bg-red-500/20 text-red-300"       },
} satisfies Record<StackSeverity, object>;
