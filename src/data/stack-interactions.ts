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
      { type: "pubmed", label: "Sikiric et al., 2018 — Curr Pharm Des", url: "https://pubmed.ncbi.nlm.nih.gov/29637860/" },
      { type: "pubmed", label: "Goldstein & Kleinman, 2015 — Ann NY Acad Sci (TB-500 review)", url: "https://pubmed.ncbi.nlm.nih.gov/26662925/" },
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
      { type: "pubmed", label: "Raun et al., 1998 — Eur J Endocrinol (Ipamorelin)", url: "https://pubmed.ncbi.nlm.nih.gov/9834455/" },
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
      { type: "pubmed", label: "Pickart & Margolina, 2018 — Biomolecules (GHK-Cu review)", url: "https://pubmed.ncbi.nlm.nih.gov/29937537/" },
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
      { type: "pubmed", label: "Sikiric et al., 2020 — Curr Med Chem (BPC-157 gastroprotection)", url: "https://pubmed.ncbi.nlm.nih.gov/30672399/" },
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
      { type: "pubmed", label: "Khavinson et al., 2002 — Bull Exp Biol Med (Epitalon telomerase)", url: "https://pubmed.ncbi.nlm.nih.gov/12500373/" },
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
      { type: "pubmed", label: "Walker et al., 1984 — J Clin Endocrinol Metab (Sermorelin)", url: "https://pubmed.ncbi.nlm.nih.gov/6547252/" },
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
      { type: "pubmed", label: "Chapman et al., 1997 — J Clin Endocrinol Metab (MK-677 GHSR)", url: "https://pubmed.ncbi.nlm.nih.gov/9215304/" },
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
      { type: "pubmed", label: "Diamond et al., 2004 — J Sex Med (PT-141 BP effects)", url: "https://pubmed.ncbi.nlm.nih.gov/16422884/" },
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
      { type: "pubmed", label: "Sikiric et al., 1994 — Life Sci (BPC-157 glucose effects)", url: "https://pubmed.ncbi.nlm.nih.gov/8152375/" },
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
      { type: "pubmed", label: "Wikberg et al., 2000 — Pharmacol Res (Melanocortin receptors)", url: "https://pubmed.ncbi.nlm.nih.gov/10640363/" },
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
      { type: "pubmed", label: "Anisimov et al., 2006 — Ann NY Acad Sci (Epitalon melatonin)", url: "https://pubmed.ncbi.nlm.nih.gov/17404000/" },
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
      { type: "pubmed", label: "Guler et al., 1988 — NEJM (IGF-1 hypoglycemia)", url: "https://pubmed.ncbi.nlm.nih.gov/2839616/" },
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
      { type: "pubmed", label: "Dorr et al., 1996 — Life Sci (Melanotan II nausea)", url: "https://pubmed.ncbi.nlm.nih.gov/8786578/" },
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
      { type: "pubmed", label: "Rosen et al., 2004 — Int J Impot Res (PT-141 CV effects)", url: "https://pubmed.ncbi.nlm.nih.gov/14961113/" },
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
      { type: "pubmed", label: "Guler et al., 1988 — NEJM", url: "https://pubmed.ncbi.nlm.nih.gov/2839616/" },
      { type: "pubmed", label: "Zapf et al., 1995 — J Clin Invest (IGF-1R insulin cross-reactivity)", url: "https://pubmed.ncbi.nlm.nih.gov/7706461/" },
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
      { type: "pubmed", label: "Dorr et al., 1996 — Life Sci (MT-II nausea)", url: "https://pubmed.ncbi.nlm.nih.gov/8786578/" },
      { type: "pubmed", label: "Frías et al., 2021 — NEJM (Tirzepatide GI events)", url: "https://pubmed.ncbi.nlm.nih.gov/34170647/" },
    ],
    alternatives: ["PT-141 (more selective melanocortin)", "Semaglutide with anti-nausea management"],
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
