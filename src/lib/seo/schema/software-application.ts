export function buildSoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": "All"
  };
}
