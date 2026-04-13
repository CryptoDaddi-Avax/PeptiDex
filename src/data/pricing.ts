export interface VendorPrice {
    vendor: string;
    price_usd: number;
    in_stock: boolean;
    link: string;
}

export interface PeptidePricing {
    name: string;
    slug: string;
    typical_vial_mg: number;
    avg_price_usd: number;
    price_range_usd: [number, number];
    cost_per_dose_usd?: number;
    doses_per_vial?: number;
    notes?: string;
    vendors: VendorPrice[];
}

export const pricingData: PeptidePricing[] = [
    {
        name: "AOD-9604",
        slug: "aod-9604",
        typical_vial_mg: 5,
        avg_price_usd: 58.32,
        price_range_usd: [49.99, 64.99],
        cost_per_dose_usd: 3.89,
        doses_per_vial: 15,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 64.99, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 49.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "BPC-157",
        slug: "bpc-157",
        typical_vial_mg: 10,
        avg_price_usd: 49.99,
        price_range_usd: [39.99, 70.00],
        cost_per_dose_usd: 2.50,
        doses_per_vial: 20,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 70.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 39.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "CJC-1295",
        slug: "cjc-1295",
        typical_vial_mg: 2,
        avg_price_usd: 46.66,
        price_range_usd: [29.99, 59.99],
        cost_per_dose_usd: 5.83,
        doses_per_vial: 8,
        notes: "Amino Club is Combo; Soma/Ascension No DAC 5mg.",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 50.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 59.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "DSIP",
        slug: "dsip",
        typical_vial_mg: 5,
        avg_price_usd: 51.66,
        price_range_usd: [29.99, 75.00],
        cost_per_dose_usd: 5.17,
        doses_per_vial: 10,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 75.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 29.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Epitalon",
        slug: "epitalon",
        typical_vial_mg: 10,
        avg_price_usd: 49.99,
        price_range_usd: [29.99, 69.99],
        cost_per_dose_usd: 2.50,
        doses_per_vial: 20,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 69.99, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 29.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Follistatin-344",
        slug: "follistatin-344",
        typical_vial_mg: 1,
        avg_price_usd: 99.99,
        price_range_usd: [99.99, 99.99],
        cost_per_dose_usd: 10.00,
        doses_per_vial: 10,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 0, in_stock: false, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 0, in_stock: false, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "GHK-Cu",
        slug: "ghk-cu",
        typical_vial_mg: 50,
        avg_price_usd: 43.33,
        price_range_usd: [29.99, 50.00],
        cost_per_dose_usd: 1.73,
        doses_per_vial: 25,
        notes: "Ascension is 100mg vial.",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 50.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 29.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "IGF-1 LR3",
        slug: "igf-1-lr3",
        typical_vial_mg: 1,
        avg_price_usd: 64.99,
        price_range_usd: [59.99, 69.99],
        cost_per_dose_usd: 6.50,
        doses_per_vial: 10,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 0, in_stock: false, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 69.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Ipamorelin",
        slug: "ipamorelin",
        typical_vial_mg: 5,
        avg_price_usd: 43.33,
        price_range_usd: [29.99, 50.00],
        cost_per_dose_usd: 1.44,
        doses_per_vial: 30,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 50.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 49.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "KPV",
        slug: "kpv",
        typical_vial_mg: 5,
        avg_price_usd: 58.32,
        price_range_usd: [39.99, 79.99],
        cost_per_dose_usd: 5.83,
        doses_per_vial: 10,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 79.99, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 39.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "MOTS-c",
        slug: "mots-c",
        typical_vial_mg: 10,
        avg_price_usd: 58.32,
        price_range_usd: [39.99, 79.99],
        cost_per_dose_usd: 29.16,
        doses_per_vial: 2,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 79.99, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 39.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Melanotan II",
        slug: "melanotan-ii",
        typical_vial_mg: 10,
        avg_price_usd: 36.66,
        price_range_usd: [29.99, 40.00],
        cost_per_dose_usd: 1.83,
        doses_per_vial: 20,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 40.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 29.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "PT-141",
        slug: "pt-141",
        typical_vial_mg: 10,
        avg_price_usd: 43.33,
        price_range_usd: [29.99, 50.00],
        cost_per_dose_usd: 4.33,
        doses_per_vial: 10,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 50.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 29.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Retatrutide",
        slug: "retatrutide",
        typical_vial_mg: 10,
        avg_price_usd: 109.99,
        price_range_usd: [69.99, 149.99],
        cost_per_dose_usd: 22.00,
        doses_per_vial: 5,
        notes: "Amino lists GLP-3 RT; Soma lists RETA.",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 110.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 69.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "SS-31",
        slug: "ss-31",
        typical_vial_mg: 10,
        avg_price_usd: 60.00,
        price_range_usd: [54.99, 65.00],
        cost_per_dose_usd: 12.00,
        doses_per_vial: 5,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 65.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 0, in_stock: false, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Selank",
        slug: "selank",
        typical_vial_mg: 30,
        avg_price_usd: 39.99,
        price_range_usd: [29.99, 55.00],
        cost_per_dose_usd: 0.67,
        doses_per_vial: 60,
        notes: "Pricing for 30mg/10mg spray depending on vendor.",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 55.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 29.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Semaglutide",
        slug: "semaglutide",
        typical_vial_mg: 5,
        avg_price_usd: 99.99,
        price_range_usd: [99.99, 99.99],
        cost_per_dose_usd: 20.00,
        doses_per_vial: 5,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 0, in_stock: false, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 0, in_stock: false, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Semax",
        slug: "semax",
        typical_vial_mg: 30,
        avg_price_usd: 39.99,
        price_range_usd: [29.99, 55.00],
        cost_per_dose_usd: 0.67,
        doses_per_vial: 60,
        notes: "Pricing for 30mg/10mg spray depending on vendor.",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 55.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 29.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Sermorelin",
        slug: "sermorelin",
        typical_vial_mg: 10,
        avg_price_usd: 67.50,
        price_range_usd: [49.99, 85.00],
        cost_per_dose_usd: 9.64,
        doses_per_vial: 7,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 85.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 0, in_stock: false, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "TB-500",
        slug: "tb-500",
        typical_vial_mg: 5,
        avg_price_usd: 44.99,
        price_range_usd: [39.99, 50.00],
        cost_per_dose_usd: 6.43,
        doses_per_vial: 7,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 50.00, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 39.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Tesamorelin",
        slug: "tesamorelin",
        typical_vial_mg: 5,
        avg_price_usd: 69.99,
        price_range_usd: [49.99, 89.99],
        cost_per_dose_usd: 7.00,
        doses_per_vial: 10,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 89.99, in_stock: true, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 69.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Thymosin Alpha-1",
        slug: "thymosin-alpha-1",
        typical_vial_mg: 5,
        avg_price_usd: 44.99,
        price_range_usd: [39.99, 49.99],
        cost_per_dose_usd: 5.62,
        doses_per_vial: 8,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 0, in_stock: false, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 39.99, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    },
    {
        name: "Tirzepatide",
        slug: "tirzepatide",
        typical_vial_mg: 10,
        avg_price_usd: 124.99,
        price_range_usd: [124.99, 124.99],
        cost_per_dose_usd: 31.25,
        doses_per_vial: 4,
        
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 0, in_stock: false, link: "https://ascensionpeptides.com/ref/PeptiDex/" }, { vendor: "Amino Club", price_usd: 0, in_stock: false, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" }
        ]
    }
];
