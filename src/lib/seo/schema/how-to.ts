export function buildHowToSchema({
  name,
  description,
  steps,
  totalTime,
  supply,
  tool
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; url?: string }[];
  totalTime?: string;
  supply?: string[];
  tool?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "supply": supply?.map(s => ({ "@type": "HowToSupply", "name": s })),
    "tool": tool?.map(t => ({ "@type": "HowToTool", "name": t })),
    "step": steps.map(s => ({
      "@type": "HowToStep",
      "name": s.name,
      "text": s.text,
      "url": s.url
    }))
  };
}
