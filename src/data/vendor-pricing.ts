/**
 * Vendor-specific pricing for each peptide, keyed by slug.
 * Each entry lists the vendors that carry it and their price + affiliate link.
 * All prices are for a single standard vial at the most common size.
 */

export interface VendorPrice {
    vendor: string;
    price_usd: number;
    vial_mg: number;
    inStock: boolean;
    affiliateUrl: string;
    badge?: "Best Price" | "Editor's Pick" | "Best for Intl";
    coaUrl?: string; // Link to Certificate of Analysis
    lastTestedDate?: string; // e.g. "April 2026"
}

export interface PeptideVendorPricing {
    slug: string;
    name: string;
    vendors: VendorPrice[];
}

export const vendorPricing: PeptideVendorPricing[] = [
    {
        "slug": "bpc-157",
        "name": "BPC-157",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick",
                "coaUrl": "https://aminoclub.com/coa/bpc-157-latest.pdf",
                "lastTestedDate": "2026-04-10"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 70,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/",
                "coaUrl": "https://ascensionpeptides.com/coa/bpc157.pdf",
                "lastTestedDate": "2026-03-24"
            }
        ]
    },
    {
        "slug": "tb-500",
        "name": "TB-500",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 45,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "cjc-1295",
        "name": "CJC-1295",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 59.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            }
        ]
    },
    {
        "slug": "ipamorelin",
        "name": "Ipamorelin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 59.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 50,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "semax",
        "name": "Semax",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 29.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 55,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "selank",
        "name": "Selank",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 29.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 55,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "ghk-cu",
        "name": "GHK-Cu",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 29.99,
                "vial_mg": 50,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 50,
                "vial_mg": 100,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "tesamorelin",
        "name": "Tesamorelin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 80,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "aod-9604",
        "name": "AOD-9604",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 49.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 59.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "mots-c",
        "name": "MOTS-c",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 75,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "epitalon",
        "name": "Epitalon",
        "vendors": [
            {
                "vendor": "Ascension Peptides",
                "price_usd": 69.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "thymosin-alpha-1",
        "name": "Thymosin Alpha-1",
        "vendors": [
            {
                "vendor": "Ascension Peptides",
                "price_usd": 78,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "melanotan-ii",
        "name": "Melanotan II",
        "vendors": [
            {
                "vendor": "Ascension Peptides",
                "price_usd": 40,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/",
                "badge": "Best Price"
            }
        ]
    },
    {
        "slug": "pt-141",
        "name": "PT-141",
        "vendors": [
            {
                "vendor": "Ascension Peptides",
                "price_usd": 45,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "dsip",
        "name": "DSIP",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 29.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 75,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "retatrutide",
        "name": "Retatrutide",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            }
        ]
    },
    {
        "slug": "tirzepatide",
        "name": "Tirzepatide",
        "vendors": []
    },
    {
        "slug": "semaglutide",
        "name": "Semaglutide",
        "vendors": []
    },
    {
        "slug": "sermorelin",
        "name": "Sermorelin",
        "vendors": [
            {
                "vendor": "Ascension Peptides",
                "price_usd": 85,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "kpv",
        "name": "KPV",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 79.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "ss-31",
        "name": "SS-31",
        "vendors": [
            {
                "vendor": "Ascension Peptides",
                "price_usd": 75,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "follistatin-344",
        "name": "Follistatin-344",
        "vendors": []
    },
    {
        "slug": "igf-1-lr3",
        "name": "IGF-1 LR3",
        "vendors": []
    },
    {
        "slug": "nad-",
        "name": "NAD+",
        "vendors": [
            {
                "vendor": "Ascension Peptides",
                "price_usd": 58,
                "vial_mg": 500,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/",
                "badge": "Best Price"
            },
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 500,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            }
        ]
    },
    {
        "slug": "glutathione",
        "name": "Glutathione",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 59.99,
                "vial_mg": 1500,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Ascension Peptides",
                "price_usd": 149.99,
                "vial_mg": 1500,
                "inStock": true,
                "affiliateUrl": "https://ascensionpeptides.com/ref/PeptiDex/"
            }
        ]
    },
    {
        "slug": "cagrilintide",
        "name": "Cagrilintide",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            }
        ]
    }
];

export function getVendorPricing(slugOrName: string): PeptideVendorPricing | undefined {
    const normalized = slugOrName.toLowerCase();
    return vendorPricing.find(
        v => v.slug === normalized || v.name.toLowerCase() === normalized
    );
}
