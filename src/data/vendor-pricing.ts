/**
 * @deprecated — Will be consolidated into /data/vendors.ts pricing module.
 * This file is preserved for backward compatibility. Migration date: 2026-04-30
 */

export interface VendorPrice {
    vendor: string;
    price_usd: number;
    vial_mg: number;
    inStock: boolean;
    affiliateUrl: string;
    badge?: "Best Price" | "Editor's Pick" | "Best for Intl" | "Triple-Tested";
    coaUrl?: string; 
    lastTestedDate?: string; 
}

export interface PeptideVendorPricing {
    slug: string;
    name: string;
    vendors: VendorPrice[];
}

export const vendorPricing: PeptideVendorPricing[] = 
[
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
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 49.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 69.98,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
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
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 44.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 115.48,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 69.98,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
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
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 54.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 55.98,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
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
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 44.99,
                "vial_mg": 30,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 64.97,
                "vial_mg": 20,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/n-acetyl-semax-amidate-20mg/",
                "badge": "Triple-Tested"
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
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 44.99,
                "vial_mg": 30,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 134.97,
                "vial_mg": 20,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/n-acetyl-selank-amidate-20mg/",
                "badge": "Triple-Tested"
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
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 39.99,
                "vial_mg": 50,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 84.97,
                "vial_mg": 50,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/ghk-cu-50mg/",
                "badge": "Triple-Tested"
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 104.98,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
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
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 64.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 179.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/nad-mots-c-5-amino-1mq-blend-120mg-100mg-10mg-10mg/",
                "badge": "Triple-Tested"
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 66.48,
                "vial_mg": 20,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 90.98,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 55.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/melanotan-1-10mg/",
                "badge": "Triple-Tested"
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 47.97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/pt141-5mg/",
                "badge": "Triple-Tested"
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 55.97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/dsip-5mg/",
                "badge": "Triple-Tested"
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
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 80,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "semaglutide",
        "name": "Semaglutide",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 47.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 58,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
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
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 54.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 99.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/kpv-10mg/",
                "badge": "Triple-Tested"
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
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 499,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/follistatin/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "igf-1-lr3",
        "name": "IGF-1 LR3",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 1,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            }
        ]
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 174.98,
                "vial_mg": 500,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
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
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 170,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/cagrilintide-amylin-analog/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "ghrp-2",
        "name": "GHRP-2",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 86.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "ghrp-6",
        "name": "GHRP-6",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 54.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 65,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "hexarelin",
        "name": "Hexarelin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 55.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 66,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "kisspeptin-10",
        "name": "Kisspeptin-10",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 63.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 74,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "ll-37",
        "name": "LL-37",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 94.97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/ll-37-5mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "mk-677",
        "name": "MK-677",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 46.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 57,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "nad",
        "name": "NAD+",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 84.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 95,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "tesofensine",
        "name": "Tesofensine",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 40.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 51,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "argireline",
        "name": "Argireline",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 43.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 54,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "5-amino-1mq",
        "name": "5-Amino-1MQ",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 71.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 82,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "ara-290",
        "name": "ARA-290",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 95,
                "vial_mg": 15,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/ara-290-15mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "gonadorelin",
        "name": "Gonadorelin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 51.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 62,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "larazotide",
        "name": "Larazotide",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 79.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 90,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "vip",
        "name": "VIP",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 74.97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/vip-5mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "oxytocin",
        "name": "Oxytocin",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 64.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/oxytocin-10mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "thymalin",
        "name": "Thymalin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 70.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 81,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "humanin",
        "name": "Humanin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 46.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 57,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "pe-22-28",
        "name": "PE-22-28",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 45.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 56,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "pinealon",
        "name": "Pinealon",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 51.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 62,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "cortagen",
        "name": "Cortagen",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 59.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 70,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "dihexa",
        "name": "Dihexa",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 55.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 66,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "foxo4-dri",
        "name": "FOXO4-DRI",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 274.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/foxo4-dri-10-mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "klotho",
        "name": "Klotho",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 50,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "os-01",
        "name": "OS-01",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 74.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 85,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "synapsin",
        "name": "Synapsin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 74.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 85,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "fgl-loop",
        "name": "FGL Loop",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 67.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 78,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
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
