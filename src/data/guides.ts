export interface GuideArticle {
    slug: string;
    peptide: string;
    title: string;
    metaDescription: string;
    introParagraph: string;
    trialProtocolSummary: string;
    escalationSchedule: string;
    cycleRationale: string;
    commonModifications: string;
    stackImplications: string;
    peptideSpecificWarnings: string;
    faqs: { question: string; answer: string }[];
    eeatNote: string;
    citations: string[]; // List of PMIDs or DOIs
}

export const guides: GuideArticle[] = [];
