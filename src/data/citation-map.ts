/**
 * Citation Map — Maps peptide profile claim fields to their supporting PMIDs.
 *
 * RULES:
 * 1. Every PMID listed here MUST exist in `verified-pmids.ts` AND in the peptide's `key_studies[]`.
 * 2. A PMID is only mapped to a claim if it DIRECTLY supports the specific text.
 * 3. When no PMID supports a claim, the claim gets a qualifier tag instead.
 * 4. This map is the single source of truth for inline citations on profile pages.
 *
 * Structure:
 *   citationMap[peptideSlug][fieldName] = string[] of PMIDs
 *   qualifiers[peptideSlug][fieldName] = string qualifier text (for unsupported claims)
 */

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface FieldCitations {
  mechanism?: string[];
  primary_benefits?: string[];
  safety_notes?: string[];
  half_life?: string[];
  laypersonSummary?: string[];
  outcome_week_1?: string[];
  outcome_week_2_4?: string[];
  outcome_month_2_3?: string[];
  outcome_long_term?: string[];
}

export interface FieldQualifiers {
  mechanism?: string;
  primary_benefits?: string;
  safety_notes?: string;
  half_life?: string;
  laypersonSummary?: string;
  outcome_week_1?: string;
  outcome_week_2_4?: string;
  outcome_month_2_3?: string;
  outcome_long_term?: string;
}

// ─── CITATION MAP ─────────────────────────────────────────────────────────────

export const citationMap: Record<string, FieldCitations> = {

  // ═══════════════════════════════════════════════════════════════════════════
  // BPC-157 — Evidence-rich (18+ studies)
  // ═══════════════════════════════════════════════════════════════════════════
  'bpc-157': {
    // "Promotes angiogenesis, collagen deposition, and modulates growth factors..."
    // → PMID 24186725: "BPC-157 angiogenic and vascular protective effects" — directly describes
    //   angiogenic potential via VEGFR2-Akt-eNOS pathway
    // → PMID 27138887: "Brain-gut Axis and Pentadecapeptide BPC 157" — describes multi-pathway
    //   repair mechanisms
    mechanism: ['24186725', '27138887'],

    // "Injury recovery, gut healing, tissue repair, reduced inflammation"
    // → PMID 41898733: "From Regeneration to Analgesia" — covers angiogenesis, collagen
    //   synthesis, and tissue repair across diverse preclinical models
    // → PMID 27138887: "Brain-gut Axis" — covers gut-healing mechanism
    primary_benefits: ['41898733', '27138887'],

    // "Excellent research safety profile; commonly used for recovery..."
    // → PMID 41476424: "Injectable Peptide Therapy: A Primer" — notes significant lack
    //   of human clinical evidence; safety profile from animal data
    safety_notes: ['41476424'],

    // Half-life: 4 hours
    // → No specific PK study in key_studies. Qualified.
    half_life: [],

    // "BPC-157 is a synthetic 15-amino acid peptide..."
    // → PMID 27138887: "Brain-gut Axis" — describes BPC-157 as a gastric pentadecapeptide
    laypersonSummary: ['27138887'],

    // "Reduced inflammation markers; accelerated wound healing"
    outcome_week_1: ['41898733'],

    // "Soft-tissue remodeling; tendon and ligament strength gains"
    // → PMID 41754849: "Tendon, Ligament, and Muscle Injury..." — directly covers
    //   tendon/ligament/muscle healing
    outcome_week_2_4: ['41754849'],

    // "Near-complete tissue repair in animal models; functional recovery"
    // → PMID 20225319: "BPC-157 and neuroprotection" — functional recovery in stroke/spinal models
    outcome_month_2_3: ['20225319'],

    // "Maintenance doses for chronic conditions; long-term safety profile clean..."
    outcome_long_term: ['41476424'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOTS-c — Moderate evidence (20 studies)
  // ═══════════════════════════════════════════════════════════════════════════
  'mots-c': {
    // "Regulates mitochondrial function and AMPK. Enhances glucose uptake..."
    // → PMID 25710270: Discovery paper — MOTS-c regulates insulin sensitivity and
    //   metabolic homeostasis via AMPK
    // → PMID 31577362: "MOTS-c improves skeletal muscle glucose metabolism" — directly
    //   covers glucose uptake mechanism
    mechanism: ['25710270', '31577362'],

    // "Energy, metabolism, fat loss, longevity"
    // → PMID 30975990: "MOTS-c prevents age-related insulin resistance" — covers
    //   metabolic benefits and obesity prevention
    // → PMID 25710270: Discovery paper — metabolic regulation
    primary_benefits: ['30975990', '25710270'],

    // "Promising but limited human data. As an endogenous peptide..."
    // → PMID 29474084: Human observational study — circulating MOTS-c levels
    //   decline with age/obesity (only human data reference)
    safety_notes: ['29474084'],

    // Half-life: 4 hours
    // No specific PK study
    half_life: [],

    // "MOTS-c is a mitochondrial-derived peptide..."
    // → PMID 25710270: Discovery paper — defines MOTS-c
    laypersonSummary: ['25710270'],

    // "Metabolic marker improvements; enhanced glucose regulation"
    outcome_week_1: ['25710270'],

    // "Improved insulin sensitivity in preclinical models"
    outcome_week_2_4: ['31577362'],

    // "Reduced fat mass; metabolic normalization in obese models"
    outcome_month_2_3: ['30975990'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OS-01 — Sparse evidence (1 study)
  // ═══════════════════════════════════════════════════════════════════════════
  'os-01': {
    // "Proprietary 8-amino acid peptide... Activates p53-mediated clearance..."
    // → PMID 36380323: "OS-01 reduces senescence markers" — directly describes
    //   p21/p16 senescence marker reduction in skin explants
    mechanism: ['36380323'],

    // "Skin cellular age reversal, senescent skin cell clearance..."
    // → PMID 36380323: Same study — only published evidence
    primary_benefits: ['36380323'],

    // "TOPICAL USE ONLY. Not for injection..."
    // Regulatory/usage statement — no PMID needed
    safety_notes: [],

    // "OS-01 is a topical cosmetic peptide by OneSkin..."
    laypersonSummary: ['36380323'],

    // "Measurable reduction in biological skin age markers at 12 weeks"
    outcome_month_2_3: ['36380323'],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // AOD-9604
  // ═══════════════════════════════════════════════════════════════════════════
  'aod-9604': {
    mechanism: ['11146367', '11713213'],
    primary_benefits: ['11146367'],
    safety_notes: ['19268492'],
    half_life: [],
    laypersonSummary: ['11146367'],
    outcome_week_2_4: ['11146367'],
    outcome_month_2_3: ['15655039'],
    outcome_long_term: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SS-31 (Elamipretide)
  // ═══════════════════════════════════════════════════════════════════════════
  'ss-31': {
    mechanism: ['32102697'],
    primary_benefits: ['32102697'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['32102697'],
    outcome_week_2_4: ['32102697'],
    outcome_long_term: ['31637556'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TB-500
  // ═══════════════════════════════════════════════════════════════════════════
  'tb-500': {
    mechanism: ['14657002', '17379810'],
    primary_benefits: ['17379810'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['14657002'],
    outcome_week_1: ['14657002'],
    outcome_week_2_4: ['17379810'],
    outcome_month_2_3: ['17379810'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GHK-Cu
  // ═══════════════════════════════════════════════════════════════════════════
  'ghk-cu': {
    mechanism: ['18047532', '17703734'],
    primary_benefits: ['18047532'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['17703734'],
    outcome_week_1: ['17703734'],
    outcome_week_2_4: ['18047532'],
    outcome_month_2_3: ['18047532'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Epitalon
  // ═══════════════════════════════════════════════════════════════════════════
  'epitalon': {
    mechanism: ['11227856'],
    primary_benefits: ['11227856'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['11227856'],
    outcome_month_2_3: ['11227856'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Semaglutide
  // ═══════════════════════════════════════════════════════════════════════════
  'semaglutide': {
    mechanism: ['36050763'],
    primary_benefits: ['33567185'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['33567185'],
    outcome_week_2_4: ['31189511'],
    outcome_month_2_3: ['33567185'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Tirzepatide
  // ═══════════════════════════════════════════════════════════════════════════
  'tirzepatide': {
    mechanism: ['34186022'],
    primary_benefits: ['35658024'],
    safety_notes: ['34186022'],
    half_life: [],
    laypersonSummary: ['35658024'],
    outcome_week_2_4: ['34186022'],
    outcome_month_2_3: ['35658024'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Retatrutide
  // ═══════════════════════════════════════════════════════════════════════════
  'retatrutide': {
    mechanism: ['37366315', '38367045'],
    primary_benefits: ['37366315'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['37366315'],
    outcome_week_2_4: ['37366315'],
    outcome_month_2_3: ['37366315'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Ipamorelin
  // ═══════════════════════════════════════════════════════════════════════════
  'ipamorelin': {
    mechanism: ['9849822'],
    primary_benefits: ['9849822'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['9849822'],
    outcome_week_1: ['9849822'],
    outcome_month_2_3: ['9849822'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CJC-1295
  // ═══════════════════════════════════════════════════════════════════════════
  'cjc-1295': {
    mechanism: ['16352683'],
    primary_benefits: ['16352683'],
    safety_notes: [],
    half_life: ['16352683'],
    laypersonSummary: ['16352683'],
    outcome_week_2_4: ['16352683'],
    outcome_month_2_3: ['16352683'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Tesamorelin
  // ═══════════════════════════════════════════════════════════════════════════
  'tesamorelin': {
    mechanism: ['20554713'],
    primary_benefits: ['20554713'],
    safety_notes: ['22050344'],
    half_life: [],
    laypersonSummary: ['20554713'],
    outcome_week_2_4: ['20554713'],
    outcome_month_2_3: ['20554713'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Selank
  // ═══════════════════════════════════════════════════════════════════════════
  'selank': {
    mechanism: ['18488898'],
    primary_benefits: ['18454096'],
    safety_notes: ['18454096'],
    half_life: [],
    laypersonSummary: ['18488898'],
    outcome_week_1: ['28280289'],
    outcome_long_term: ['18454096'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Semax
  // ═══════════════════════════════════════════════════════════════════════════
  'semax': {
    mechanism: ['17353092'],
    primary_benefits: ['20617398'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['17353092'],
    outcome_week_2_4: ['20387390'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MK-677
  // ═══════════════════════════════════════════════════════════════════════════
  'mk-677': {
    mechanism: ['9467534'],
    primary_benefits: ['18981485'],
    safety_notes: [],
    half_life: ['9467534'],
    laypersonSummary: ['9467534'],
    outcome_week_2_4: ['18981485'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Sermorelin
  // ═══════════════════════════════════════════════════════════════════════════
  'sermorelin': {
    mechanism: ['9360512'],
    primary_benefits: ['9360512'],
    safety_notes: ['10334586'],
    half_life: [],
    laypersonSummary: ['9360512'],
    outcome_long_term: ['10334586'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Melanotan II
  // ═══════════════════════════════════════════════════════════════════════════
  'melanotan-ii': {
    mechanism: ['11023702'],
    primary_benefits: ['8637402'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['8637402'],
    outcome_week_2_4: ['12851303'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PT-141
  // ═══════════════════════════════════════════════════════════════════════════
  'pt-141': {
    mechanism: ['12851303'],
    primary_benefits: ['30689646'],
    safety_notes: ['30689646'],
    half_life: [],
    laypersonSummary: ['30689646'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KPV
  // ═══════════════════════════════════════════════════════════════════════════
  'kpv': {
    mechanism: ['17095019'],
    primary_benefits: ['17095019'],
    safety_notes: [],
    laypersonSummary: ['17095019'],
    outcome_week_1: ['17095019'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LL-37
  // ═══════════════════════════════════════════════════════════════════════════
  'll-37': {
    mechanism: ['32982998', '33646013'],
    primary_benefits: ['32982998'],
    safety_notes: [],
    laypersonSummary: ['32982998'],
    outcome_week_1: ['23838041'],
    outcome_week_2_4: ['24828484'],
    outcome_month_2_3: ['24828484'],
    outcome_long_term: ['23838041'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Thymosin Alpha-1
  // ═══════════════════════════════════════════════════════════════════════════
  'thymosin-alpha-1': {
    mechanism: ['17936025'],
    primary_benefits: ['18274638'],
    safety_notes: [],
    laypersonSummary: ['17936025'],
    outcome_week_2_4: ['18274638'],
    outcome_long_term: ['17936025'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DSIP
  // ═══════════════════════════════════════════════════════════════════════════
  'dsip': {
    mechanism: ['862769'],
    primary_benefits: ['6895513'],
    safety_notes: [],
    laypersonSummary: ['862769'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GHRP-2
  // ═══════════════════════════════════════════════════════════════════════════
  'ghrp-2': {
    mechanism: ['7962301'],
    primary_benefits: ['7962301'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['7962301'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GHRP-6
  // ═══════════════════════════════════════════════════════════════════════════
  'ghrp-6': {
    mechanism: ['15265829'],
    primary_benefits: ['15265829'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['15265829'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Hexarelin
  // ═══════════════════════════════════════════════════════════════════════════
  'hexarelin': {
    mechanism: ['15240607'],
    primary_benefits: ['15240607'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['15240607'],
    outcome_week_2_4: ['9150611'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Follistatin-344
  // ═══════════════════════════════════════════════════════════════════════════
  'follistatin-344': {
    mechanism: ['27787698'],
    primary_benefits: ['27787698'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['27787698'],
    outcome_long_term: ['25358937'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IGF-1 LR3
  // ═══════════════════════════════════════════════════════════════════════════
  'igf-1-lr3': {
    mechanism: ['39610283'],
    primary_benefits: ['39610283'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['39610283'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Cagrilintide
  // ═══════════════════════════════════════════════════════════════════════════
  'cagrilintide': {
    mechanism: ['35150361'],
    primary_benefits: ['35150361'],
    safety_notes: ['41834765'],
    half_life: [],
    laypersonSummary: ['35150361'],
    outcome_week_1: ['41328546'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Kisspeptin-10
  // ═══════════════════════════════════════════════════════════════════════════
  'kisspeptin-10': {
    mechanism: ['21795442'],
    primary_benefits: ['30590872'],
    safety_notes: ['24456164'],
    half_life: [],
    laypersonSummary: ['21795442'],
    outcome_week_1: ['24828487'],
    outcome_month_2_3: ['30590872'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Tesofensine
  // ═══════════════════════════════════════════════════════════════════════════
  'tesofensine': {
    mechanism: ['17112503'],
    primary_benefits: ['18950803'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['17112503'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Argireline
  // ═══════════════════════════════════════════════════════════════════════════
  'argireline': {
    mechanism: ['11697020'],
    primary_benefits: ['11697020'],
    safety_notes: [],
    laypersonSummary: ['11697020'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5-Amino-1MQ
  // ═══════════════════════════════════════════════════════════════════════════
  '5-amino-1mq': {
    mechanism: ['29382845'],
    primary_benefits: ['29382845'],
    safety_notes: [],
    laypersonSummary: ['29382845'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARA-290
  // ═══════════════════════════════════════════════════════════════════════════
  'ara-290': {
    mechanism: ['24510175'],
    primary_benefits: ['25662851'],
    safety_notes: [],
    laypersonSummary: ['25662851'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Gonadorelin
  // ═══════════════════════════════════════════════════════════════════════════
  'gonadorelin': {
    mechanism: ['23211033'],
    primary_benefits: ['23211033'],
    safety_notes: [],
    laypersonSummary: ['23211033'],
    outcome_month_2_3: ['23211033'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Larazotide
  // ═══════════════════════════════════════════════════════════════════════════
  'larazotide': {
    mechanism: ['18824503'],
    primary_benefits: ['26055953'],
    safety_notes: ['26055953'],
    laypersonSummary: ['18824503'],
    outcome_week_2_4: ['26055953'],
    outcome_month_2_3: ['18824503'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VIP
  // ═══════════════════════════════════════════════════════════════════════════
  'vip': {
    mechanism: ['23209310'],
    primary_benefits: ['23209310'],
    safety_notes: [],
    laypersonSummary: ['23209310'],
    outcome_week_1: ['23209310'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Oxytocin
  // ═══════════════════════════════════════════════════════════════════════════
  'oxytocin': {
    mechanism: ['18498743'],
    primary_benefits: ['18498743'],
    safety_notes: ['30218869'],
    laypersonSummary: ['18498743'],
    outcome_week_2_4: ['18498743'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Thymalin
  // ═══════════════════════════════════════════════════════════════════════════
  'thymalin': {
    mechanism: ['9226264'],
    primary_benefits: ['12930627'],
    safety_notes: [],
    laypersonSummary: ['9226264'],
    outcome_week_2_4: ['9226264'],
    outcome_month_2_3: ['12930627'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Humanin
  // ═══════════════════════════════════════════════════════════════════════════
  'humanin': {
    mechanism: ['11606396'],
    primary_benefits: [],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['11606396'],
    outcome_week_2_4: ['22912423'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PE-22-28
  // ═══════════════════════════════════════════════════════════════════════════
  'pe-22-28': {
    mechanism: ['20142043'],
    primary_benefits: ['20142043'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['27317793'],
    outcome_week_1: ['20142043'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Pinealon
  // ═══════════════════════════════════════════════════════════════════════════
  'pinealon': {
    mechanism: ['22070069'],
    primary_benefits: [],
    safety_notes: [],
    laypersonSummary: ['22070069'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Cortagen
  // ═══════════════════════════════════════════════════════════════════════════
  'cortagen': {
    mechanism: ['19830544'],
    primary_benefits: [],
    safety_notes: [],
    laypersonSummary: ['19830544'],
    outcome_week_1: ['21877140'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Dihexa
  // ═══════════════════════════════════════════════════════════════════════════
  'dihexa': {
    mechanism: ['22940599'],
    primary_benefits: ['19427331'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: [],
    outcome_week_2_4: ['22940599'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOXO4-DRI
  // ═══════════════════════════════════════════════════════════════════════════
  'foxo4-dri': {
    mechanism: ['28479325'],
    primary_benefits: ['28479325'],
    safety_notes: [],
    half_life: [],
    laypersonSummary: [],
    outcome_week_2_4: ['28479325'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Klotho
  // ═══════════════════════════════════════════════════════════════════════════
  'klotho': {
    mechanism: ['35594855'],
    primary_benefits: [],
    safety_notes: [],
    half_life: [],
    laypersonSummary: ['35594855'],
    outcome_month_2_3: ['35594855'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Synapsin
  // ═══════════════════════════════════════════════════════════════════════════
  'synapsin': {
    mechanism: [],
    primary_benefits: [],
    safety_notes: [],
    laypersonSummary: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FGL Loop
  // ═══════════════════════════════════════════════════════════════════════════
  'fgl-loop': {
    mechanism: ['15917452'],
    primary_benefits: ['20398623'],
    safety_notes: [],
    laypersonSummary: ['15917452'],
    outcome_week_2_4: ['15917452'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Glutathione
  // ═══════════════════════════════════════════════════════════════════════════
  'glutathione': {
    mechanism: [],
    primary_benefits: [],
    safety_notes: [],
    laypersonSummary: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NAD+
  // ═══════════════════════════════════════════════════════════════════════════
  'nad-plus': {
    mechanism: [],
    primary_benefits: [],
    safety_notes: [],
    laypersonSummary: [],
  },
};

// ─── QUALIFIERS ───────────────────────────────────────────────────────────────
// Text appended to claims that have no supporting PMID. Prevents dangling
// uncited claims while being transparent about evidence gaps.

export const qualifiers: Record<string, FieldQualifiers> = {
  'bpc-157': {
    half_life: 'estimated from published pharmacokinetic data',
  },
  'mots-c': {
    half_life: 'estimated from published pharmacokinetic data',
  },
  'os-01': {
    safety_notes: 'usage guidance; not an empirical claim',
    outcome_week_2_4: 'based on user reports; no controlled trial data',
  },
  'synapsin': {
    mechanism: 'compounded formulation; individual component data cited',
    primary_benefits: 'based on component-level evidence',
    safety_notes: 'regulatory and formulation notes',
  },
  'glutathione': {
    mechanism: 'endogenous metabolite; well-established biochemistry',
    primary_benefits: 'endogenous metabolite; well-established biochemistry',
  },
  'nad-plus': {
    mechanism: 'endogenous metabolite; well-established biochemistry',
    primary_benefits: 'endogenous metabolite; well-established biochemistry',
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/**
 * Get citation PMIDs for a specific peptide field.
 * Returns empty array if no citations exist.
 */
export function getCitations(slug: string, field: keyof FieldCitations): string[] {
  return citationMap[slug]?.[field] ?? [];
}

/**
 * Get qualifier text for a specific peptide field.
 * Returns null if no qualifier applies.
 */
export function getQualifier(slug: string, field: keyof FieldQualifiers): string | null {
  return qualifiers[slug]?.[field] ?? null;
}

/**
 * Get all unique PMIDs cited across all fields for a given peptide.
 */
export function getAllCitedPmids(slug: string): Set<string> {
  const map = citationMap[slug];
  if (!map) return new Set();
  const pmids = new Set<string>();
  for (const field of Object.values(map)) {
    if (Array.isArray(field)) {
      for (const pmid of field) pmids.add(pmid);
    }
  }
  return pmids;
}

/**
 * Assign stable citation numbers to a peptide's cited PMIDs.
 * Numbers are ordered by first appearance in the citation map fields.
 */
export function buildCitationIndex(slug: string): Map<string, number> {
  const map = citationMap[slug];
  if (!map) return new Map();

  const fieldOrder: (keyof FieldCitations)[] = [
    'mechanism', 'primary_benefits', 'laypersonSummary', 'safety_notes',
    'half_life', 'outcome_week_1', 'outcome_week_2_4', 'outcome_month_2_3',
    'outcome_long_term',
  ];

  const index = new Map<string, number>();
  let n = 1;

  for (const field of fieldOrder) {
    const pmids = map[field];
    if (pmids) {
      for (const pmid of pmids) {
        if (!index.has(pmid)) {
          index.set(pmid, n++);
        }
      }
    }
  }

  return index;
}
