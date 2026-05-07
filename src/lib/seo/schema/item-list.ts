export function buildItemListSchema({
  name,
  description,
  items
}: {
  name: string;
  description: string;
  items: { name: string; description: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "description": description,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "description": item.description,
      "url": item.url
    }))
  };
}
