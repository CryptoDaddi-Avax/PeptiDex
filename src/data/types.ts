export type EvidenceLevel = "very-strong" | "strong" | "moderate" | "moderate-strong" | "preclinical" | "emerging" | "anecdotal";

export interface Study {
    title: string;
    pubmed_url: string;
    summary: string;
    evidence_level: EvidenceLevel;
}

export interface DosingProtocol {
    route: string;                     // "SubQ" | "IM" | "Nasal" | "Oral" | "Topical"
    typical_dose_mcg: [number, number]; // range [low, high] in micrograms
    frequency: string;                  // "Daily" | "2x/week" | "5 on 2 off" etc
    cycle_weeks?: [number, number];     // cycle length range
    timing?: string;                    // "Morning" | "Pre-bed" | "Pre-workout"
    reconstitution_ml?: number;         // BAC water per standard vial (ml)
    typical_vial_mg?: number;           // standard vial size (mg)
    notes?: string;
}

export interface PeptideInteractions {
    synergies: string[];        // peptide names that pair well
    cautions: string[];         // names to use with care
    contraindicated: string[];  // names to avoid combining
    notes?: string;
}

export interface OutcomesTimeline {
    week_1?: string;
    week_2_4?: string;
    month_2_3?: string;
    long_term?: string;
}

export interface SideEffect {
    name: string;
    incidence: string;       // e.g. "~5% of users" | "rare (<2%)"
    severity: "mild" | "moderate" | "uncommon" | "rare";
    note?: string;
}

export interface Peptide {
    name: string;
    slug: string;
    aliases: string[];
    category: string;
    category_icon?: string;
    primary_benefits: string;
    mechanism: string;
    laypersonSummary?: string;       // plain-English "what is X?" sentence for featured snippets + AI
    key_studies: Study[];
    safety_notes: string;
    is_fda_approved?: boolean;
    half_life_hours?: number;
    dosing?: DosingProtocol;
    interactions?: PeptideInteractions;
    outcomes_timeline?: OutcomesTimeline;
    side_effects?: SideEffect[];
    lastReviewed?: string;  // ISO date — "Last fact-checked: [date]"
}


export interface StackPeptide {
    name: string;
    role_in_stack: string;
}

export interface StackStudy {
    description: string;
    pubmed_url: string;
}

export interface Stack {
    slug: string;
    stack_name: string;
    goal: string;
    peptides: StackPeptide[];
    synergy_rationale: string;
    supporting_studies: StackStudy[];
}

export type GoalId =
    | "body-recomposition"
    | "injury-recovery"
    | "mental-clarity"
    | "fat-loss"
    | "muscle-growth"
    | "immune-support"
    | "sleep-recovery"
    | "longevity"
    | "skin-aesthetic"
    | "gut-health"
    | "hormonal-optimization"
    | "metabolic-health";

export interface Goal {
    id: GoalId;
    label: string;
    icon: string;
    description: string;
    stackNames: string[];
}
