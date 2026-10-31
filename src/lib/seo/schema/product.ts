export interface BuildProductSchemaProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  brand?: string;
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
  aggregateRating
}: BuildProductSchemaProps) {
  
  const schema: Record<string, unknown> = {
    "@type": "Product",
    "@id": id,
    "name": name,
    "alternativeHeadline": "Research Compound Reference - Not for Human Use",
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

  return schema;
}
