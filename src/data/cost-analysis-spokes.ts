export interface CostAnalysisArticle {
    slug: string;
    peptide: string;
    title: string;
    metaDescription: string;
    introParagraph: string;
    pricePerMgTable: {
        vendorName: string;
        vialSize: string;
        price: string;
        pricePerMg: string;
    }[];
    bulkVsSingleVial: string; // analysis
    trueCostOfCycle: string; // e.g., 12-week protocol cost
    qualityVsCost: string; // why cheaper isn't always better
    faqs: { question: string; answer: string }[];
    eeatNote: string;
    citations: string[];
}

export const costAnalysisArticles: CostAnalysisArticle[] = [];
