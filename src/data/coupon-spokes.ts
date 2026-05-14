export interface CouponArticle {
    slug: string;
    peptide: string;
    title: string;
    metaDescription: string;
    introParagraph: string;
    verifiedDiscounts: {
        vendorName: string;
        discountCode: string;
        discountAmount: string;
        terms: string;
    }[];
    stackingSavings: string; // How to stack discounts with bulk
    expiredCodesWarning: string; // Trust-building negative content
    faqs: { question: string; answer: string }[];
    eeatNote: string;
    citations: string[];
}

export const couponArticles: CouponArticle[] = [];
