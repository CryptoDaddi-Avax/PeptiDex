export interface CalculatorArticle {
    slug: string;
    peptide: string;
    title: string;
    metaDescription: string;
    introParagraph: string;
    vialSizesAvailable: string[];
    recommendedBacWaterRange: string;
    commonResearchDoses: string[];
    commonScenarios: {
        scenarioTitle: string;
        mathExplanation: string;
    }[];
    storageAndStability: string;
    whereToSource: string; // HTML or markdown
    faqs: { question: string; answer: string }[];
    eeatNote: string;
    citations: string[];
}

export const calculatorArticles: CalculatorArticle[] = [];
