/**
 * JsonLd — Server-safe JSON-LD renderer.
 *
 * Renders a <script type="application/ld+json"> tag server-side.
 * Never imported from a client component — no 'use client' directive here.
 *
 * Usage:
 *   <JsonLd schema={buildWebSiteSchema()} />
 *   <JsonLd schema={{ '@context': 'https://schema.org', '@graph': [...] }} />
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> | object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
