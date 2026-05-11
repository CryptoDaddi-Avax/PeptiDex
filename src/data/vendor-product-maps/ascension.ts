/**
 * Ascension Peptides — Product Map
 * Tier: 1 (Cart Pre-fill) | Platform: WooCommerce
 * Cart URL: /ref/PeptiDex/?add-to-cart={productId}
 * Scraped: ascensionpeptides.com/shop (pages 1-3) | Last verified: 2026-05-10
 * All products type:"simple" — ALL support direct ?add-to-cart= URLs.
 */

export interface AscensionProduct {
  productId: number;
  displayName: string;
  sku: string;
  vialSizeMg: number;
  priceCurrent: number;
  priceRegular: number;
  urlSlug: string;
  onSale: boolean;
  lastVerifiedAt: string;
}

export const ascensionProductMap: Record<string, AscensionProduct> = {
  "5-amino-1mq": { productId: 2359, displayName: "5-Amino-1MQ – 10MG", sku: "PEP-5-AMINO-1MQ", vialSizeMg: 10, priceCurrent: 75, priceRegular: 94.99, urlSlug: "5-amino-1mq-10-mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "aod-9604": { productId: 600, displayName: "AOD-9604 (5MG)", sku: "PEP-AOD9604-5MG", vialSizeMg: 5, priceCurrent: 64.99, priceRegular: 74.99, urlSlug: "aod-9604-5mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "ara-290": { productId: 10929, displayName: "ARA-290 10mg", sku: "PEP-ARA-290-10MG", vialSizeMg: 10, priceCurrent: 70, priceRegular: 74.99, urlSlug: "ara-290-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "bpc-157": { productId: 576, displayName: "BPC-157 (10mg)", sku: "PEP-BPC-10MG", vialSizeMg: 10, priceCurrent: 70, priceRegular: 74.99, urlSlug: "bpc-157-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "bpc-157:5mg": { productId: 575, displayName: "BPC-157 (5mg)", sku: "PEP-BPC-5MG", vialSizeMg: 5, priceCurrent: 55, priceRegular: 59.99, urlSlug: "bpc-157-5mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "cjc-1295": { productId: 584, displayName: "CJC-1295 no DAC (5MG)", sku: "PEP-CJC-5MG", vialSizeMg: 5, priceCurrent: 50, priceRegular: 59.99, urlSlug: "cjc-1295-5mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "cagrilintide": { productId: 610, displayName: "C-10", sku: "PEP-CAG-10MG", vialSizeMg: 10, priceCurrent: 115, priceRegular: 199.99, urlSlug: "c-10", onSale: true, lastVerifiedAt: "2026-05-10" },
  "dsip": { productId: 814, displayName: "DSIP (10mg)", sku: "PEP-DISP-10MG", vialSizeMg: 10, priceCurrent: 75, priceRegular: 94.99, urlSlug: "dsip-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "epitalon": { productId: 815, displayName: "Epithalon (10mg)", sku: "PEP-EPIT-10MG", vialSizeMg: 10, priceCurrent: 69.99, priceRegular: 69.99, urlSlug: "epithalon-10mg", onSale: false, lastVerifiedAt: "2026-05-10" },
  "fox04-dri": { productId: 10730, displayName: "FOX04-DRI 10mg", sku: "PEP-FOX04-DRI-10MG", vialSizeMg: 10, priceCurrent: 199.99, priceRegular: 199.99, urlSlug: "fox04-dri", onSale: false, lastVerifiedAt: "2026-05-10" },
  "ghk-cu": { productId: 831, displayName: "GHK-CU (100MG)", sku: "PEP-GHK-CU-100MG", vialSizeMg: 100, priceCurrent: 80, priceRegular: 84.99, urlSlug: "ghk-cu-100mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "glutathione": { productId: 1641, displayName: "Glutathione (1,500mg)", sku: "PEP-GLUT-1500MG", vialSizeMg: 1500, priceCurrent: 149.99, priceRegular: 149.99, urlSlug: "glutathione-1200mg", onSale: false, lastVerifiedAt: "2026-05-10" },
  "hcg": { productId: 2040, displayName: "HCG (5000iu)", sku: "PEP-HCG-5000IU", vialSizeMg: 5000, priceCurrent: 99.99, priceRegular: 99.99, urlSlug: "hcg-5000iu", onSale: false, lastVerifiedAt: "2026-05-10" },
  "ipamorelin": { productId: 823, displayName: "Ipamorelin (5MG)", sku: "PEP-IPAMORELIN-5MG", vialSizeMg: 5, priceCurrent: 50, priceRegular: 64.99, urlSlug: "ipamorelin-5mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "kisspeptin-10": { productId: 865, displayName: "Kisspeptin (10MG)", sku: "PEP-KISSPEPTIN-10MG", vialSizeMg: 10, priceCurrent: 58, priceRegular: 74.99, urlSlug: "kisspeptin-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "kpv": { productId: 891, displayName: "KPV (10MG)", sku: "PEP-KPV-10MG", vialSizeMg: 10, priceCurrent: 79.99, priceRegular: 79.99, urlSlug: "kpv-10mg", onSale: false, lastVerifiedAt: "2026-05-10" },
  "ll-37": { productId: 868, displayName: "LL-37 (10MG)", sku: "PEP-LL37-10MG", vialSizeMg: 10, priceCurrent: 110, priceRegular: 119.99, urlSlug: "ll37-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "melanotan-i": { productId: 597, displayName: "Melanotan I (10MG)", sku: "PEP-MELANOTAN1-10MG", vialSizeMg: 10, priceCurrent: 40, priceRegular: 59.99, urlSlug: "melanotan-i-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "melanotan-ii": { productId: 596, displayName: "Melanotan II (10MG)", sku: "PEP-MELANOTAN2-10MG", vialSizeMg: 10, priceCurrent: 40, priceRegular: 59.99, urlSlug: "melanotan-ii-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "mots-c": { productId: 851, displayName: "MOTS-C (10MG)", sku: "PEP-MOTS-C-10MG", vialSizeMg: 10, priceCurrent: 70, priceRegular: 79.99, urlSlug: "mots-c-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "nad-": { productId: 4504, displayName: "NAD+ (500mg)", sku: "PEP-NAD+-500MG", vialSizeMg: 500, priceCurrent: 58, priceRegular: 99.99, urlSlug: "nad-500mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "nad-:1000mg": { productId: 1643, displayName: "NAD+ (1,000mg)", sku: "PEP-NAD+-1000MG", vialSizeMg: 1000, priceCurrent: 150, priceRegular: 199.99, urlSlug: "nad-1000mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "oxytocin": { productId: 834, displayName: "Oxytocin (2MG)", sku: "PEP-OXYTOCIN-2MG", vialSizeMg: 2, priceCurrent: 49.99, priceRegular: 49.99, urlSlug: "oxytocin-2mg", onSale: false, lastVerifiedAt: "2026-05-10" },
  "pinealon": { productId: 829, displayName: "Pinealon (10MG)", sku: "PEP-PINEALON-10MG", vialSizeMg: 10, priceCurrent: 83.99, priceRegular: 89.99, urlSlug: "pinealon-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "pt-141": { productId: 595, displayName: "PT-141 (10MG)", sku: "PEP-PT-141-10MG", vialSizeMg: 10, priceCurrent: 48, priceRegular: 59.99, urlSlug: "pt-141-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "retatrutide": { productId: 2703, displayName: "R-10", sku: "PEP-RETA-10MG", vialSizeMg: 10, priceCurrent: 119, priceRegular: 149.99, urlSlug: "r-10", onSale: true, lastVerifiedAt: "2026-05-10" },
  "retatrutide:30mg": { productId: 3622, displayName: "R-30", sku: "PEP-RETA-30MG", vialSizeMg: 30, priceCurrent: 269.99, priceRegular: 269.99, urlSlug: "r-30", onSale: false, lastVerifiedAt: "2026-05-10" },
  "semaglutide": { productId: 603, displayName: "S-5", sku: "PEP-SEMA-5MG", vialSizeMg: 5, priceCurrent: 60, priceRegular: 99.99, urlSlug: "s-5", onSale: true, lastVerifiedAt: "2026-05-10" },
  "selank": { productId: 825, displayName: "Selank (10MG)", sku: "PEP-SELANK-10MG", vialSizeMg: 10, priceCurrent: 55, priceRegular: 60, urlSlug: "selank-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "semax": { productId: 827, displayName: "Semax (10MG)", sku: "PEP-SEMAX-10MG", vialSizeMg: 10, priceCurrent: 55, priceRegular: 59.99, urlSlug: "semax-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "sermorelin": { productId: 589, displayName: "Sermorelin (10MG)", sku: "PEP-SERMORELIN-10MG", vialSizeMg: 10, priceCurrent: 85, priceRegular: 99.99, urlSlug: "sermorelin-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "ss-31": { productId: 872, displayName: "SS-31 (10MG)", sku: "PEP-SS-31-10MG", vialSizeMg: 10, priceCurrent: 75, priceRegular: 75, urlSlug: "ss-31-10mg", onSale: false, lastVerifiedAt: "2026-05-10" },
  "tb-500": { productId: 593, displayName: "TB-500 (5MG)", sku: "PEP-TB500-5MG", vialSizeMg: 5, priceCurrent: 60, priceRegular: 60, urlSlug: "tb-500-5mg", onSale: false, lastVerifiedAt: "2026-05-10" },
  "tesamorelin": { productId: 602, displayName: "Tesamorelin (5MG)", sku: "PEP-TESA-5MG", vialSizeMg: 5, priceCurrent: 85, priceRegular: 89.99, urlSlug: "tesamorelin-5mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "thymosin-alpha-1": { productId: 853, displayName: "Thymosin Alpha 1 (10MG)", sku: "PEP-THYMOSIN-10MG", vialSizeMg: 10, priceCurrent: 90, priceRegular: 99.99, urlSlug: "thymosin-alpha-1-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "tirzepatide": { productId: 2705, displayName: "T-10", sku: "PEP-TIRZ-10MG", vialSizeMg: 10, priceCurrent: 75, priceRegular: 149.99, urlSlug: "t-10", onSale: true, lastVerifiedAt: "2026-05-10" },
  "tirzepatide:30mg": { productId: 3077, displayName: "T-30", sku: "PEP-TIRZ-30MG", vialSizeMg: 30, priceCurrent: 118, priceRegular: 199.99, urlSlug: "t-30", onSale: true, lastVerifiedAt: "2026-05-10" },
  "vip": { productId: 878, displayName: "VIP (10MG)", sku: "PEP-VIP-10MG", vialSizeMg: 10, priceCurrent: 94, priceRegular: 149.99, urlSlug: "vip-10mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  // Blends
  "wolverine-stack": { productId: 1571, displayName: "BPC-157 10mg + TB-500 10mg (Wolverine Stack 20mg)", sku: "PEP-WOLV-20MG", vialSizeMg: 20, priceCurrent: 120, priceRegular: 149.99, urlSlug: "wolverine-stack", onSale: true, lastVerifiedAt: "2026-05-10" },
  "glow-stack": { productId: 1759, displayName: "GHK-CU 50mg + BPC-157 10mg + TB-500 10mg (GLOW 70mg)", sku: "PEP-GLOW-70MG", vialSizeMg: 70, priceCurrent: 130, priceRegular: 174.99, urlSlug: "glow-advanced-peptide-blend-for-radiance-recovery", onSale: true, lastVerifiedAt: "2026-05-10" },
  "klow-stack": { productId: 4221, displayName: "GHK-Cu 50mg + BPC-157 10mg + TB-500 10mg + KPV 10mg (KLOW 80mg)", sku: "PEP-KLOW-80mg", vialSizeMg: 80, priceCurrent: 160, priceRegular: 199.99, urlSlug: "klow-ghk-cu-bpc-157-thymosin-beta4-kpv", onSale: true, lastVerifiedAt: "2026-05-10" },
  "fit-stack-10mg": { productId: 1872, displayName: "CJC-1295 No DAC 5mg + Ipamorelin 5mg (FIT Stack 10mg)", sku: "PEP-FIT-CJC-1295-IPAMORELIN-10MG", vialSizeMg: 10, priceCurrent: 120, priceRegular: 149.99, urlSlug: "fit-stack-cjc-1295-ipamorelin", onSale: true, lastVerifiedAt: "2026-05-10" },
  "fit-stack-20mg": { productId: 15073, displayName: "CJC-1295 No DAC 10mg + Ipamorelin 10mg (FIT Stack 20mg)", sku: "PEP-FIT-CJC-1295-IPAMORELIN-20MG", vialSizeMg: 20, priceCurrent: 160, priceRegular: 199.99, urlSlug: "cjc-1295-no-dac-10mg-ipamorelin-10mg-20mg", onSale: true, lastVerifiedAt: "2026-05-10" },
  "calm-clarity": { productId: 4285, displayName: "PE 22-28 10mg + Pinealon 10mg + Selank 10mg (30mg)", sku: "PEP-CALM+CLAR-30MG", vialSizeMg: 30, priceCurrent: 130, priceRegular: 199.99, urlSlug: "calm-clarity-30mg", onSale: true, lastVerifiedAt: "2026-05-10" },
};

export const ASCENSION_PRODUCT_COUNT = Object.keys(ascensionProductMap).length;

export function buildAscensionCartUrl(peptideSlug: string, quantity: number = 1): string {
  const product = ascensionProductMap[peptideSlug];
  if (product) {
    const base = `https://ascensionpeptides.com/ref/PeptiDex/?add-to-cart=${product.productId}`;
    return quantity > 1 ? `${base}&quantity=${quantity}` : base;
  }
  return "https://ascensionpeptides.com/ref/PeptiDex/";
}

export function buildAscensionProductUrl(peptideSlug: string): string {
  const product = ascensionProductMap[peptideSlug];
  if (product) {
    return `https://ascensionpeptides.com/product/${product.urlSlug}/`;
  }
  return "https://ascensionpeptides.com/ref/PeptiDex/";
}
