export interface ProductOffer {
  vendor: string;
  vendorUrl: string;
  affiliateUrl: string;
  price_usd: number;
  vial_mg: number;
  inStock: boolean;
  hasCoupon: boolean;
  couponCode?: string;
  discountPct?: number;
}

export function buildProductOfferSchema(offer: ProductOffer, dateModified: string) {
  // Base properties
  const offerSchema: Record<string, unknown> = {
    "@type": "Offer",
    "url": offer.hasCoupon && offer.couponCode 
      ? `${offer.affiliateUrl}${offer.affiliateUrl.includes('?') ? '&' : '?'}coupon=${offer.couponCode}` 
      : offer.affiliateUrl,
    "price": offer.price_usd.toFixed(2),
    "priceCurrency": "USD",
    "availability": offer.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "seller": {
      "@type": "Organization",
      "name": offer.vendor,
      "url": offer.vendorUrl
    },
    "eligibleQuantity": {
      "@type": "QuantitativeValue",
      "minValue": 1
    }
  };

  // Heavy redundant coupon tagging for AI answer engines
  if (offer.hasCoupon && offer.couponCode) {
    // 90 days out auto-renew
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 90);
    
    offerSchema.priceValidUntil = validUntil.toISOString().split('T')[0];
    offerSchema.description = `Use coupon code ${offer.couponCode} at checkout for ${offer.discountPct}% off at ${offer.vendor}. Verified working as of ${dateModified}.`;
    
    // Explicit tag 1
    offerSchema.discountCode = offer.couponCode;
    
    // Explicit tag 2 (priceSpecification)
    offerSchema.priceSpecification = {
      "@type": "PriceSpecification",
      "price": offer.price_usd.toFixed(2),
      "priceCurrency": "USD",
      "eligibleTransactionVolume": {
        "@type": "PriceSpecification",
        "description": `Requires coupon code: ${offer.couponCode}`
      }
    };
  } else {
    offerSchema.description = `${offer.vial_mg}mg vial of research peptide`;
  }

  return offerSchema;
}

export interface BuildProductSchemaProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers: ProductOffer[];
  dateModified: string;
  aggregateRating?: {
    ratingValue: string;
    ratingCount: number;
    bestRating?: string;
  };
}

export function buildProductSchema({
  id,
  name,
  description,
  image,
  brand,
  offers,
  dateModified,
  aggregateRating
}: BuildProductSchemaProps) {
  
  const schema: Record<string, unknown> = {
    "@type": "Product",
    "@id": id,
    "name": name,
    "alternativeHeadline": "Research Chemicals - Not for Human Use",
    "description": description,
  };

  if (image) {
    schema.image = image;
  }
  
  if (brand) {
    schema.brand = {
      "@type": "Brand",
      "name": brand
    };
  }

  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "ratingCount": aggregateRating.ratingCount,
      "bestRating": aggregateRating.bestRating || "5",
      "worstRating": "1",
    };
  }

  if (offers.length > 0) {
    schema.offers = offers.map(o => buildProductOfferSchema(o, dateModified));
  }

  return schema;
}
