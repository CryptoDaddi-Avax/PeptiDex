import React from 'react';

interface SchemaInjectorProps {
  /**
   * The JSON-LD schema object or array of objects to inject.
   * If an array of objects is provided, it will automatically be wrapped in an @graph block.
   */
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * A reusable component to inject JSON-LD structured data into the <head> of a page.
 * Safely serializes the data by replacing `<` with `\u003c` to prevent XSS.
 * Automatically wraps arrays in an @graph context.
 */
export function SchemaInjector({ schema }: SchemaInjectorProps) {
  let finalSchema: Record<string, unknown>;

  if (Array.isArray(schema)) {
    finalSchema = {
      '@context': 'https://schema.org',
      '@graph': schema,
    };
  } else {
    // If it's a single object, ensure it has the @context
    finalSchema = {
      '@context': 'https://schema.org',
      ...schema,
    };
  }

  // Safely serialize to prevent </script> breaking out of the block
  const serialized = JSON.stringify(finalSchema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
