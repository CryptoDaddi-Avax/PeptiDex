export type EvidenceLevel = "very-strong" | "strong" | "moderate" | "moderate-strong" | "preclinical" | "emerging" | "anecdotal";

export interface Study {
    title: string;
    pubmed_url: string;
    summary: string;
    evidence_level: EvidenceLevel;
}

export interface StudiedDoseCitation {
    title: string;   // title of an FDA label or human trial already listed in key_studies
    url: string;
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
    incidence: string;       // qualitative label, e.g. "Reported in clinical trials" | "Rare reports" | "Frequency not established"; use "reported in N% of study participants (pubmed X)" only when a key_studies entry for that peptide reports the figure
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
    route_studied?: string;  // administration route used in published studies: "SubQ" | "IM" | "Nasal" | "Oral" | "Topical" (no dose info)
    studied_dose_citation?: StudiedDoseCitation;  // only for compounds with an FDA label or human trial
    interactions?: PeptideInteractions;
    outcomes_timeline?: OutcomesTimeline;
    side_effects?: SideEffect[];
    lastReviewed?: string;  // ISO date — "Last fact-checked: [date]"
    author?: string;                // author slug from src/content/authors/
    medicallyReviewedBy?: string;   // reviewer slug
    factCheckedBy?: string;         // fact-checker slug
    reviewedDate?: string;          // ISO date when last clinically reviewed
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
    author?: string;
    medicallyReviewedBy?: string;
    factCheckedBy?: string;
    reviewedDate?: string;
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
