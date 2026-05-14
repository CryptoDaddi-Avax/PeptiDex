export interface WhereToBuyArticle {
    slug: string; // e.g. 'retatrutide'
    peptide: string;
    title: string;
    metaDescription: string;
    introParagraph: string;
    vendorBreakdown: {
        vendorName: string;
        pros: string[];
        cons: string[];
        coaDepth: string; // analysis of their testing
    }[];
    priceHistoryTable: {
        date: string;
        pricePerMg: string;
        vendor: string;
    }[];
    stackDiscountCalculator: string; // text explaining the math
    internationalShipping: string;
    returnPolicyComparison: string;
    redFlagsExcludedVendors: string;
    faqs: { question: string; answer: string }[];
    eeatNote: string;
    citations: string[];
}

export const whereToBuyArticles: WhereToBuyArticle[] = [];
