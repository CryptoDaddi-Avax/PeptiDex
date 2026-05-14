export interface ResearchArticle {
    slug: string;
    peptide: string;
    title: string;
    metaDescription: string;
    introParagraph: string;
    halfLifeModel: string; // The mathematical model / explanation
    steadyStateCalculation: string;
    injectionTimingImplications: string;
    comparisonTable: {
        peptideName: string;
        halfLife: string;
        dosingFrequency: string;
    }[];
    faqs: { question: string; answer: string }[];
    eeatNote: string;
    citations: string[];
}

export const researchArticles: ResearchArticle[] = [];
