/**
 * Stack Conflict Checker — Interactions Matrix
 * ============================================
 * Each entry describes one pair (order-independent).
 * 
 * Severity scale:
 *   SAFE         — well-documented safe combination, often synergistic
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

  // ══════════ SAFE — Well-documented synergies ══════════════════════════════

  {
    peptideA: "BPC-157",
    peptideB: "TB-500",
    severity: "SAFE",
    headline: "Classic synergistic stack — widely used for tissue repair",
    detail: "BPC-157 promotes local angiogenesis and tendon/gut healing via VEGF upregulation. TB-500 (Thymosin Beta-4) acts systemically to promote actin polymerization and cell migration. The two mechanisms are complementary and non-overlapping. This is one of the most commonly co-administered research combinations with no documented adverse interactions.",
    citations: [
      { type: "pubmed", label: "Sikiric et al., 2018 — Curr Pharm Des", url: "https://pubmed.ncbi.nlm.nih.gov/27138887/" },
      { type: "editorial", label: "Editorial: No pharmacokinetic conflict identified; distinct receptor profiles" },
    ],
  },

  {
    peptideA: "Ipamorelin",
    peptideB: "CJC-1295",
    severity: "SAFE",
    headline: "Complementary GH secretagogue stack — standard protocol",
    detail: "Ipamorelin is a GH secretagogue receptor (GHSR) agonist that triggers a GH pulse. CJC-1295 (without DAC) is a GHRH analog that amplifies the pituitary response. Together they target different steps in the same axis, producing a stronger and more physiological GH pulse than either alone. This combination is the most widely studied GH peptide stack.",
    citations: [
      { type: "pubmed", label: "Raun et al., 1998 — Eur J Endocrinol (Ipamorelin)", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
      { type: "pubmed", label: "Teichman et al., 2006 — J Clin Endocrinol Metab (CJC-1295)", url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
      { type: "editorial", label: "Editorial: Dual-axis mechanism well characterized; widely used in GH deficiency research" },
    ],
  },

  {
    peptideA: "BPC-157",
    peptideB: "GHK-Cu",
    severity: "SAFE",
    headline: "Complementary tissue repair — different mechanisms, no overlap",
    detail: "BPC-157 promotes angiogenesis and tendon healing via VEGF and nitric oxide pathways. GHK-Cu (copper peptide) stimulates collagen synthesis, antioxidant activity, and wound healing through distinct copper-dependent enzymatic pathways. No pharmacological conflict. Commonly used together in skin and connective tissue repair protocols.",
    citations: [
      { type: "editorial", label: "Editorial: Non-overlapping receptor profiles; additive expected, not antagonistic" },
    ],
  },

  {
    peptideA: "Ipamorelin",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "No known conflict — different axes, commonly co-administered",
    detail: "Ipamorelin operates via GHSR on the GH/IGF-1 axis. BPC-157 operates locally via VEGF, NO, and dopamine pathways. The two peptides do not compete for the same receptors or pathways. No documented adverse interactions in animal or human studies.",
    citations: [
      { type: "editorial", label: "Editorial: Distinct pharmacological axes; no conflict identified in literature" },
    ],
  },

  {
    peptideA: "Semaglutide",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "Complementary — GLP-1 axis + gastroprotective",
    detail: "Semaglutide acts on GLP-1 receptors to suppress appetite and regulate glucose. BPC-157 has documented gastroprotective effects in the same gut tissue. Some researchers use BPC-157 to manage the GI side effects (nausea, gastroparesis) reported with semaglutide. No pharmacological antagonism identified.",
    citations: [
      { type: "editorial", label: "Editorial: Theoretically complementary; no adverse pair data available" },
    ],
  },

  {
    peptideA: "Epithalon",
    peptideB: "GHK-Cu",
    severity: "SAFE",
    headline: "Anti-aging combination — telomere and collagen axes",
    detail: "Epitalon (Epithalon) is a tetrapeptide that stimulates telomerase activity and pineal melatonin secretion. GHK-Cu works through collagen synthesis and antioxidant pathways. The two mechanisms are independent and non-competing. Both are used in longevity-focused protocols with no reported interactions.",
    citations: [
      { type: "editorial", label: "Editorial: Non-overlapping mechanisms; no conflict in published literature" },
    ],
  },

  {
    peptideA: "TB-500",
    peptideB: "GHK-Cu",
    severity: "SAFE",
    headline: "Complementary systemic and local repair mechanisms",
    detail: "TB-500 promotes systemic cell migration and actin remodeling. GHK-Cu stimulates local collagen and GAG synthesis. Both support tissue repair from different angles. No documented pharmacological conflict.",
    citations: [
      { type: "editorial", label: "Editorial: Distinct receptor/enzyme profiles; additive repair effects expected" },
    ],
  },

  {
    peptideA: "Sermorelin",
    peptideB: "Ipamorelin",
    severity: "SAFE",
    headline: "GHRH + GHSR dual-axis GH stimulation — well characterized",
    detail: "Sermorelin is a GHRH analog; Ipamorelin is a GHSR agonist. Like CJC-1295 + Ipamorelin, this combination targets two steps in GH release for a synergistic effect. Sermorelin has a shorter half-life than CJC-1295 but the mechanism of co-administration is well understood.",
    citations: [
      { type: "editorial", label: "Editorial: Same dual-axis rationale as CJC-1295 + Ipamorelin; established protocol" },
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
    detail: "Both CJC-1295 and Sermorelin are GHRH analogs acting on the same pituitary receptor. Co-administration provides no established additive benefit and wastes dose. Choose one GHRH analog and pair with a GHSR agonist (Ipamorelin or MK-677) for a rational dual-axis stack.",
    citations: [
      { type: "editorial", label: "Editorial: Identical receptor target; redundancy confirmed by mechanism" },
    ],
    alternatives: ["Ipamorelin", "MK-677"],
  },

  {
    peptideA: "Semaglutide",
    peptideB: "Tirzepatide",
    severity: "CAUTION",
    headline: "Overlapping GLP-1 agonism — additive GI side effects, no clinical rationale",
    detail: "Semaglutide (GLP-1 agonist) and Tirzepatide (dual GIP/GLP-1 agonist) share the GLP-1 receptor. Co-administration has no established research rationale, significantly increases nausea/vomiting risk, and could cause excessive appetite suppression or hypoglycemia in predisposed individuals. Choose one GLP-1 pathway agent.",
    citations: [
      { type: "pubmed", label: "Frías et al., 2021 — NEJM (Tirzepatide vs Semaglutide)", url: "https://pubmed.ncbi.nlm.nih.gov/34170647/" },
      { type: "editorial", label: "Editorial: Overlapping receptor; clinical rationale for co-use not established" },
    ],
    alternatives: ["Retatrutide"],
  },

  {
    peptideA: "PT-141",
    peptideB: "Semaglutide",
    severity: "CAUTION",
    headline: "Blood pressure interaction possible — monitor cardiovascular parameters",
    detail: "PT-141 (Bremelanotide) transiently increases blood pressure via MC4R activation. Semaglutide can cause mild cardiovascular effects including heart rate changes. The combination is not formally contraindicated but warrants blood pressure monitoring, particularly in individuals with pre-existing hypertension.",
    citations: [
      { type: "editorial", label: "Editorial: Cardiovascular monitoring recommended; no documented severe adverse pair events" },
    ],
  },

  {
    peptideA: "BPC-157",
    peptideB: "Insulin",
    severity: "CAUTION",
    headline: "BPC-157 modulates insulin sensitivity — monitor blood glucose",
    detail: "Animal studies show BPC-157 can influence insulin secretion and peripheral glucose uptake. Co-administration with exogenous insulin may unpredictably alter glycemic response. Not formally contraindicated, but blood glucose monitoring is recommended, especially at higher BPC-157 doses.",
    citations: [
      { type: "editorial", label: "Editorial: Animal data only; human insulin interaction not formally studied" },
    ],
  },

  {
    peptideA: "Melanotan II",
    peptideB: "PT-141",
    severity: "CAUTION",
    headline: "Same melanocortin receptor family — additive side effects",
    detail: "Melanotan II (MT-II) and PT-141 both activate melanocortin receptors (MT-II broadly, PT-141 selectively MC4R). Co-administration may produce additive nausea, facial flushing, blood pressure elevation, and prolonged erections. Not contraindicated, but dose reduction is advisable if combining.",
    citations: [
      { type: "pubmed", label: "Wikberg et al., 2000 — Pharmacol Res (Melanocortin receptors)", url: "https://pubmed.ncbi.nlm.nih.gov/11023702/" },
      { type: "editorial", label: "Editorial: Receptor overlap confirmed; additive side effect profile expected" },
    ],
    alternatives: ["PT-141 alone at appropriate dose"],
  },

  {
    peptideA: "Epithalon",
    peptideB: "Melatonin",
    severity: "CAUTION",
    headline: "Epitalon stimulates endogenous melatonin — avoid exogenous melatonin overlap",
    detail: "Epitalon upregulates pineal melatonin secretion. Co-administering exogenous melatonin may push total melatonin levels higher than intended, causing excessive sedation or circadian disruption. Not dangerous, but time your cycles carefully.",
    citations: [
      { type: "editorial", label: "Editorial: Mechanism-based redundancy; not a safety concern at typical doses" },
    ],
  },

  {
    peptideA: "IGF-1 LR3",
    peptideB: "Ipamorelin",
    severity: "CAUTION",
    headline: "Downstream IGF-1 elevation overlap — monitor for hypoglycemia",
    detail: "Ipamorelin stimulates GH release which triggers liver IGF-1 production. IGF-1 LR3 directly provides exogenous IGF-1. Combined use may produce supraphysiological IGF-1 signaling, increasing hypoglycemia risk and theoretically promoting abnormal cell proliferation with chronic use. Use with awareness and monitor blood glucose.",
    citations: [
      { type: "editorial", label: "Editorial: Synergistic IGF-1 pathway elevation; hypoglycemia monitoring essential" },
    ],
    alternatives: ["BPC-157", "TB-500"],
  },

  // ══════════ WARNING — Documented adverse effects ══════════════════════════

  {
    peptideA: "Melanotan II",
    peptideB: "Semaglutide",
    severity: "WARNING",
    headline: "Compounding nausea and GI distress — high adverse event probability",
    detail: "Both Melanotan II and GLP-1 agonists like Semaglutide independently cause significant nausea, vomiting, and loss of appetite. Co-administration substantially elevates the likelihood of severe GI distress, dehydration, and electrolyte imbalance. This combination should be avoided unless nausea is carefully managed and doses are significantly reduced.",
    citations: [
      { type: "pubmed", label: "Dorr et al., 1996 — Life Sci (Melanotan II nausea)", url: "https://pubmed.ncbi.nlm.nih.gov/8637402/" },
      { type: "pubmed", label: "Wilding et al., 2021 — NEJM (Semaglutide GI profile)", url: "https://pubmed.ncbi.nlm.nih.gov/33567185/" },
    ],
    alternatives: ["PT-141 (more selective, less nausea)", "Retatrutide alone"],
  },

  {
    peptideA: "PT-141",
    peptideB: "Nitrates",
    severity: "WARNING",
    headline: "Additive blood pressure reduction — potential for hypotension",
    detail: "PT-141 causes transient blood pressure increases in some users via MC4R, but the concurrent use with nitrate vasodilators (including poppers/amyl nitrite) creates an unpredictable cardiovascular interaction. This mirrors the sildenafil/nitrate contraindication. Avoid combination.",
    citations: [
      { type: "editorial", label: "Editorial: Mechanism analogous to PDE5i + nitrate contraindication" },
    ],
    alternatives: ["Discontinue nitrate use before PT-141 administration"],
  },

  {
    peptideA: "IGF-1 LR3",
    peptideB: "Insulin",
    severity: "WARNING",
    headline: "Significant hypoglycemia risk — requires careful glucose management",
    detail: "Both IGF-1 LR3 and insulin lower blood glucose through related but distinct pathways. IGF-1 LR3 binds insulin receptors in addition to IGF-1R. Co-administration substantially increases hypoglycemia risk. This combination requires strict glucose monitoring, carbohydrate availability, and experienced judgment. Not recommended for unsupervised use.",
    citations: [
    ],
    alternatives: ["Use IGF-1 LR3 alone with glucose monitoring; do not combine with insulin"],
  },

  // ══════════ DO NOT STACK — Clear contraindications ═══════════════════════

  {
    peptideA: "Semaglutide",
    peptideB: "Retatrutide",
    severity: "DO_NOT_STACK",
    headline: "Redundant GLP-1 agonism with additive toxicity — no clinical rationale",
    detail: "Retatrutide is a triple agonist (GIP, GLP-1, glucagon) that fully covers the GLP-1 receptor. Adding Semaglutide creates pure receptor competition and dose-stacking with no therapeutic benefit. The combination dramatically increases the risk of severe nausea, vomiting, tachycardia, and potential pancreatitis. There is no research rationale for this combination.",
    citations: [
      { type: "pubmed", label: "Jastreboff et al., 2023 — NEJM (Retatrutide Phase 2)", url: "https://pubmed.ncbi.nlm.nih.gov/37366315/" },
      { type: "editorial", label: "Editorial: Full GLP-1 receptor overlap; combination has no therapeutic justification" },
    ],
    alternatives: ["Use Retatrutide alone — it already includes full GLP-1 pathway coverage"],
  },

  {
    peptideA: "Tirzepatide",
    peptideB: "Retatrutide",
    severity: "DO_NOT_STACK",
    headline: "Dual GIP/GLP-1 overlap — compounding toxicity, no benefit",
    detail: "Retatrutide is a superset of Tirzepatide — it covers GIP, GLP-1, and glucagon. Co-administering Tirzepatide adds nothing to the GIP and GLP-1 pathways already covered by Retatrutide, while stacking GI, cardiovascular, and metabolic adverse effects. This combination has no scientific rationale.",
    citations: [
      { type: "editorial", label: "Editorial: Retatrutide fully covers Tirzepatide's mechanism; combination contraindicated by redundancy" },
    ],
    alternatives: ["Use Retatrutide alone"],
  },

  {
    peptideA: "Melanotan II",
    peptideB: "Tirzepatide",
    severity: "DO_NOT_STACK",
    headline: "Compounding GI toxicity — high risk of severe adverse events",
    detail: "Tirzepatide already causes significant nausea and vomiting in a substantial portion of users. Melanotan II independently causes intense nausea, facial flushing, and emesis. The combination produces severe compounding GI toxicity, risk of dangerous dehydration, and electrolyte imbalance. Avoid entirely.",
    citations: [
      { type: "pubmed", label: "Dorr et al., 1996 — Life Sci (MT-II nausea)", url: "https://pubmed.ncbi.nlm.nih.gov/8637402/" },
      { type: "pubmed", label: "Frías et al., 2021 — NEJM (Tirzepatide GI events)", url: "https://pubmed.ncbi.nlm.nih.gov/34170647/" },
    ],
    alternatives: ["PT-141 (more selective melanocortin)", "Semaglutide with anti-nausea management"],
  },

  // ══════════ BATCH 2: Nootropics ═══════════════════════════════════════════

  {
    peptideA: "Selank",
    peptideB: "Semax",
    severity: "SAFE",
    headline: "Complementary nootropic peptides — anxiolytic + cognitive enhancement",
    detail: "Selank acts as an anxiolytic and immune modulator via tuftsin mimicry and serotonin/GABA modulation. Semax is a pro-cognitive peptide that upregulates BDNF and influences dopamine/serotonin systems. Their mechanisms are distinct: Selank reduces anxiety and stabilizes mood, while Semax drives cognitive processing speed and neuroplasticity. No pharmacological conflict identified. Widely co-used in Russian peptide research protocols.",
    citations: [
      { type: "pubmed", label: "Semenova et al., 2010 — Bull Exp Biol Med (Selank anxiolytic)", url: "https://pubmed.ncbi.nlm.nih.gov/18488898/" },
      { type: "pubmed", label: "Dolotov et al., 2006 — J Mol Neurosci (Semax BDNF)", url: "https://pubmed.ncbi.nlm.nih.gov/17353092/" },
      { type: "editorial", label: "Editorial: Distinct primary receptors; complementary CNS profile expected" },
    ],
  },

  {
    peptideA: "Selank",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "Neuroprotection + gut-brain axis — no overlap, potentially additive",
    detail: "Selank modulates anxiety and immune function centrally. BPC-157 has documented neuroprotective and gut-brain axis effects peripherally. The two operate in different compartments with non-competing mechanisms. BPC-157 may complement Selank in protocols targeting both CNS stability and peripheral inflammation.",
    citations: [
      { type: "pubmed", label: "Sikiric et al., 2016 — Curr Neuropharmacol (BPC-157 CNS)", url: "https://pubmed.ncbi.nlm.nih.gov/27138887/" },
      { type: "editorial", label: "Editorial: Non-overlapping; additive neuroprotective profile plausible" },
    ],
  },

  {
    peptideA: "Semax",
    peptideB: "Ipamorelin",
    severity: "SAFE",
    headline: "Cognitive + GH stack — distinct axes, no conflict",
    detail: "Semax operates on BDNF, dopamine, and serotonin pathways in the CNS. Ipamorelin stimulates pituitary GH release via GHSR. No receptor overlap. This combination is used in performance protocols targeting both cognitive function and body composition. No documented adverse interactions.",
    citations: [
      { type: "editorial", label: "Editorial: Distinct pharmacological axes; no interaction in published literature" },
    ],
  },

  {
    peptideA: "Selank",
    peptideB: "Semax",
    severity: "SAFE",
    headline: "Complementary nootropic peptides — anxiolytic + cognitive enhancement",
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
    headline: "Complementary immune modulators — innate + adaptive immunity",
    detail: "LL-37 (Cathelicidin) is an innate immune antimicrobial peptide that disrupts bacterial membranes and modulates inflammatory signaling via TLR4. Thymosin Alpha-1 (Thymalfasin) operates on the adaptive immune system by enhancing T-cell maturation and dendritic cell function. The two immunological axes are non-competing and potentially synergistic in supporting broad immune function.",
    citations: [
      { type: "pubmed", label: "Hancock et al., 2016 — Nat Rev Drug Discov (LL-37 immune)", url: "https://pubmed.ncbi.nlm.nih.gov/32982998/" },
      { type: "editorial", label: "Editorial: Distinct mechanisms; innate + adaptive synergy is pharmacologically rational" },
    ],
  },

  {
    peptideA: "Thymosin Alpha-1",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "Immune modulation + tissue repair — complementary, no conflict",
    detail: "Thymosin Alpha-1 enhances T-cell and NK cell activity via thymic hormone pathways. BPC-157 reduces systemic inflammation via the NO and dopamine systems while promoting local tissue healing. Both support recovery but through non-overlapping mechanisms. Often combined in post-illness or post-surgical recovery protocols.",
    citations: [
      { type: "editorial", label: "Editorial: No pharmacological conflict; clinically rational for immune + repair protocols" },
    ],
  },

  {
    peptideA: "LL-37",
    peptideB: "BPC-157",
    severity: "CAUTION",
    headline: "Both modulate inflammatory signaling — monitor for immune overstimulation",
    detail: "LL-37 directly activates inflammatory pathways (TLR4, formyl peptide receptors) as part of its antimicrobial role. BPC-157 simultaneously suppresses some of those same inflammatory cascades. The opposing actions on inflammation could theoretically blunt efficacy of one or both compounds, or produce unpredictable immune signaling in acute infection settings. Monitor closely; avoid during active severe infections.",
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
    headline: "Sleep-wake cycle + GH pulse — timing-dependent synergy",
    detail: "DSIP (Delta Sleep-Inducing Peptide) promotes slow-wave sleep and may enhance the natural nocturnal GH surge. Ipamorelin also stimulates GH release. Timing both pre-sleep may produce a complementary effect on overnight GH secretion and recovery. No documented adverse pharmacological interaction; the main consideration is timing (both ideally administered pre-sleep).",
    citations: [
      { type: "pubmed", label: "Schoenenberger et al., 1983 — Eur J Biochem (DSIP)", url: "https://pubmed.ncbi.nlm.nih.gov/862769/" },
      { type: "editorial", label: "Editorial: Timing synergy plausible; no adverse interaction documented" },
    ],
  },

  {
    peptideA: "DSIP",
    peptideB: "Epithalon",
    severity: "SAFE",
    headline: "Complementary sleep and circadian regulation",
    detail: "DSIP promotes delta-wave sleep and normalizes cortisol rhythms. Epitalon regulates pineal melatonin output and circadian gene expression. Both support sleep quality through different but complementary mechanisms. Commonly used together in longevity and sleep optimization protocols with no reported adverse interactions.",
    citations: [
      { type: "editorial", label: "Editorial: Complementary circadian mechanisms; no conflict identified" },
    ],
  },

  {
    peptideA: "DSIP",
    peptideB: "Melatonin",
    severity: "CAUTION",
    headline: "Additive sedation possible — stagger timing or reduce doses",
    detail: "Both DSIP and melatonin promote sleep onset and slow-wave activity through overlapping but distinct mechanisms. Co-administration at full doses of both may produce stronger sedation than intended, causing difficulty waking or daytime grogginess. If combining, reduce melatonin to ≤0.5 mg and administer DSIP 30–60 minutes before sleep separately.",
    citations: [
      { type: "pubmed", label: "Schoenenberger & Monnier, 1977 — Proc Natl Acad Sci (DSIP)", url: "https://pubmed.ncbi.nlm.nih.gov/269364/" },
      { type: "editorial", label: "Editorial: Additive sedation risk at full doses; dose reduction recommended if combining" },
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
    detail: "GHRP-2 and Ipamorelin both activate GHSR. GHRP-2 additionally raises cortisol and prolactin more than Ipamorelin. Combining them provides redundant GHSR signaling with additive cortisol/prolactin effects but no proven additional GH release benefit over a GHRH + GHSR dual-axis stack. Choose one GHSR agonist and pair with a GHRH analog.",
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
    detail: "Like Ipamorelin + CJC-1295, GHRP-6 + CJC-1295 targets both GHSR and GHRH receptor for amplified GH release. This combination is pharmacologically rational and commonly used. The main downside vs Ipamorelin + CJC-1295 is GHRP-6's significant appetite stimulation and cortisol/prolactin elevation, making it better suited for bulk phases.",
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
    headline: "Upstream HPG axis + central melanocortin — complementary sexual function",
    detail: "Kisspeptin-10 acts on GnRH neurons to upregulate LH/FSH and downstream testosterone, operating at the hypothalamic level. PT-141 (Bremelanotide) activates MC4R in the brain to drive sexual arousal independently of hormonal status. The two mechanisms are upstream/downstream rather than competing: Kisspeptin addresses hormonal substrate, PT-141 addresses central arousal signaling. No pharmacological conflict.",
    citations: [
      { type: "pubmed", label: "Dhillo et al., 2005 — J Clin Endocrinol Metab (Kisspeptin-10)", url: "https://pubmed.ncbi.nlm.nih.gov/16174713/" },
      { type: "editorial", label: "Editorial: Non-overlapping receptor targets; complementary sexual function axes" },
    ],
  },

  {
    peptideA: "Kisspeptin-10",
    peptideB: "Melanotan II",
    severity: "CAUTION",
    headline: "HPG axis + melanocortin — monitor for LH surge and cardiovascular effects",
    detail: "Kisspeptin-10 drives a strong LH/FSH pulse and can produce transient hormonal surges. Melanotan II causes melanocortin-mediated sexual arousal, skin tanning, and nausea. Together, the combined hormonal activation and peripheral melanocortin effects may amplify cardiovascular stress (elevated BP, heart rate) and hormonal overshoot in some individuals. Monitor cardiovascular parameters.",
    citations: [
      { type: "pubmed", label: "Dhillo et al., 2005 — JCEM (Kisspeptin LH surge)", url: "https://pubmed.ncbi.nlm.nih.gov/16174713/" },
      { type: "editorial", label: "Editorial: Additive cardiovascular and hormonal stimulation; monitoring advised" },
    ],
  },

  // ══════════ BATCH 2: Longevity / anti-aging stack ═════════════════════════

  {
    peptideA: "Epithalon",
    peptideB: "Thymosin Alpha-1",
    severity: "SAFE",
    headline: "Longevity stack — telomere protection + immune enhancement",
    detail: "Epitalon stimulates telomerase and melatonin, supporting cellular longevity and circadian regulation. Thymosin Alpha-1 enhances T-cell function and immune surveillance. These two peptides are among the most studied for longevity applications and are frequently co-administered. No pharmacological conflict; immune enhancement complements cellular anti-aging.",
    citations: [
      { type: "pubmed", label: "Khavinson et al., 2003 — Neuroendocrinol Lett (Epitalon longevity)", url: "https://pubmed.ncbi.nlm.nih.gov/14523363/" },
      { type: "editorial", label: "Editorial: Highly compatible; considered a core longevity stack in peptide research literature" },
    ],
  },

  {
    peptideA: "SS-31",
    peptideB: "GHK-Cu",
    severity: "SAFE",
    headline: "Mitochondrial + extracellular matrix — dual anti-aging mechanisms",
    detail: "SS-31 (Elamipretide) is a mitochondria-targeting peptide that reduces oxidative phosphorylation dysfunction and protects cardiolipin. GHK-Cu supports extracellular matrix renewal through collagen synthesis and antioxidant signaling. The two target intracellular vs extracellular aging mechanisms respectively, with no pharmacological competition.",
    citations: [
      { type: "pubmed", label: "Bhatt et al., 2017 — J Am Heart Assoc (SS-31 mitochondria)", url: "https://pubmed.ncbi.nlm.nih.gov/29217757/" },
      { type: "editorial", label: "Editorial: Intracellular + extracellular mechanisms; no overlap or conflict" },
    ],
  },

  {
    peptideA: "Epithalon",
    peptideB: "BPC-157",
    severity: "SAFE",
    headline: "Longevity + tissue maintenance — complementary repair axes",
    detail: "Epitalon promotes telomerase activity and melatonin production, targeting cellular aging. BPC-157 repairs gut, tendon, and vascular tissue via angiogenic pathways. Both support longevity from different angles: cellular lifespan vs tissue-level maintenance. No pharmacological conflict.",
    citations: [
      { type: "editorial", label: "Editorial: Non-overlapping mechanisms; complementary for longevity-focused protocols" },
    ],
  },

  // ══════════ BATCH 2: AOD-9604 / weight loss ═══════════════════════════════

  {
    peptideA: "AOD-9604",
    peptideB: "Semaglutide",
    severity: "CAUTION",
    headline: "Stacked weight loss mechanisms — monitor for excessive caloric deficit",
    detail: "AOD-9604 is a modified GH fragment (176–191) that promotes lipolysis via beta-3 adrenergic-like activity without affecting blood glucose. Semaglutide suppresses appetite through GLP-1 receptor activation. The combination can produce an aggressive energy deficit — particularly useful in research contexts but requires careful dietary monitoring to avoid excessive muscle catabolism and nutritional deficiency.",
    citations: [
      { type: "pubmed", label: "Heffernan et al., 2001 — J Endocrinol (AOD-9604 lipolysis)", url: "https://pubmed.ncbi.nlm.nih.gov/11713213/" },
      { type: "editorial", label: "Editorial: Additive negative energy balance; dietary monitoring essential" },
    ],
    alternatives: ["AOD-9604 alone", "Semaglutide alone with dietary support"],
  },

  {
    peptideA: "AOD-9604",
    peptideB: "Ipamorelin",
    severity: "SAFE",
    headline: "Lipolysis + GH pulse — body composition stack with no conflict",
    detail: "AOD-9604 targets adipose tissue lipolysis via the GH receptor fragment. Ipamorelin stimulates GH release from the pituitary. AOD-9604 does not stimulate GH itself (it is a fragment that bypasses the full GH effect on growth and insulin resistance). This combination targets both local fat breakdown and systemic anabolic GH signaling without pharmacological overlap.",
    citations: [
      { type: "pubmed", label: "Heffernan et al., 2001 — J Endocrinol (AOD-9604)", url: "https://pubmed.ncbi.nlm.nih.gov/11713213/" },
      { type: "editorial", label: "Editorial: Non-overlapping mechanisms; a rational body composition stack" },
    ],
  },

  {
    peptideA: "AOD-9604",
    peptideB: "Tirzepatide",
    severity: "CAUTION",
    headline: "Stacked weight loss — aggressive energy deficit, monitor lean mass",
    detail: "Tirzepatide suppresses appetite via dual GIP/GLP-1 agonism. AOD-9604 directly stimulates lipolysis. Together the energy deficit created can be substantial, risking lean mass loss if protein intake is insufficient. Not a pharmacological contraindication, but nutritional management is essential.",
    citations: [
      { type: "editorial", label: "Editorial: Additive weight loss mechanisms; protein intake and lean mass monitoring required" },
    ],
    alternatives: ["AOD-9604 alone", "Tirzepatide with high-protein diet"],
  },

  // ══════════ BATCH 2: Additional CAUTION pairs ═════════════════════════════

  {
    peptideA: "IGF-1 LR3",
    peptideB: "CJC-1295",
    severity: "CAUTION",
    headline: "Upstream GH stimulation + downstream IGF-1 elevation — supraphysiological IGF-1 risk",
    detail: "CJC-1295 stimulates GH release, which drives hepatic IGF-1 production. IGF-1 LR3 additionally provides direct, highly bioavailable exogenous IGF-1. The combined effect may push IGF-1 levels significantly above physiological range, increasing hypoglycemia risk and long-term cell proliferation concerns. If combining, use reduced doses of each and monitor IGF-1 blood levels.",
    citations: [
      { type: "editorial", label: "Editorial: Additive IGF-1 pathway; blood level monitoring strongly recommended" },
    ],
    alternatives: ["CJC-1295 + Ipamorelin without exogenous IGF-1", "IGF-1 LR3 alone"],
  },

  {
    peptideA: "MK-677",
    peptideB: "CJC-1295",
    severity: "CAUTION",
    headline: "Dual GH elevation pathways — monitor IGF-1, glucose, and cortisol",
    detail: "MK-677 (Ibutamoren) is an oral GHSR agonist providing sustained 24-hour GH elevation. CJC-1295 is a GHRH analog that amplifies pituitary GH output. Together they produce continuous strong GH stimulation, which substantially raises IGF-1, may impair insulin sensitivity, and can elevate cortisol and prolactin with chronic use. Cycle length and bloodwork monitoring are essential.",
    citations: [
      { type: "pubmed", label: "Teichman et al., 2006 — JCEM (CJC-1295)", url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
      { type: "editorial", label: "Editorial: Additive GH/IGF-1 elevation; bloodwork strongly recommended with chronic use" },
    ],
  },

  {
    peptideA: "Thymosin Alpha-1",
    peptideB: "LL-37",
    severity: "CAUTION",
    headline: "Dual immune activation — theoretical inflammatory overshoot in autoimmune contexts",
    detail: "In healthy individuals, combining Thymosin Alpha-1 and LL-37 is complementary (adaptive + innate immunity). However, in individuals with autoimmune conditions, simultaneously activating both immune axes may amplify inflammatory responses. Those with autoimmune diagnoses should proceed with significant caution and ideally medical supervision.",
    citations: [
      { type: "editorial", label: "Editorial: Autoimmune population-specific concern; healthy individuals at low risk" },
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

  {
    peptideA: "Melanotan II",
    peptideB: "Retatrutide",
    severity: "DO_NOT_STACK",
    headline: "Triple compounding GI toxicity — severe adverse event risk",
    detail: "Retatrutide (GIP/GLP-1/glucagon triple agonist) produces significant nausea/vomiting at therapeutic doses. Melanotan II adds intense independent nausea via melanocortin pathways. Together the GI adverse event burden is extremely high with near-certain severe emesis, dehydration risk, and electrolyte imbalance. No research rationale exists for this combination.",
    citations: [
      { type: "pubmed", label: "Jastreboff et al., 2023 — NEJM (Retatrutide)", url: "https://pubmed.ncbi.nlm.nih.gov/37366315/" },
      { type: "pubmed", label: "Dorr et al., 1996 — Life Sci (MT-II nausea)", url: "https://pubmed.ncbi.nlm.nih.gov/8637402/" },
    ],
    alternatives: ["PT-141 instead of MT-II", "Retatrutide alone"],
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
  SAFE:         { label: "SAFE",          color: "emerald", bg: "bg-emerald-950/30", border: "border-emerald-500/30", text: "text-emerald-300", badge: "bg-emerald-500/20 text-emerald-300" },
  CAUTION:      { label: "CAUTION",       color: "amber",   bg: "bg-amber-950/30",   border: "border-amber-500/30",   text: "text-amber-300",   badge: "bg-amber-500/20 text-amber-300"   },
  WARNING:      { label: "WARNING",       color: "orange",  bg: "bg-orange-950/30",  border: "border-orange-500/30",  text: "text-orange-300",  badge: "bg-orange-500/20 text-orange-300"  },
  DO_NOT_STACK: { label: "DO NOT STACK",  color: "red",     bg: "bg-red-950/30",     border: "border-red-500/30",     text: "text-red-300",     badge: "bg-red-500/20 text-red-300"       },
} satisfies Record<StackSeverity, object>;
