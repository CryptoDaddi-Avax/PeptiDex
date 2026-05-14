# PeptiDex AI-Optimized Schema Coverage Report

This document outlines the routes and page types that have been successfully migrated to the new `@graph`-based `SchemaInjector` pattern for AI answer engine optimization.

## Core Infrastructure

*   **`SchemaInjector` (`src/components/schema-injector.tsx`)**: The central engine for wrapping multiple schemas in an `@graph` object and injecting them safely into the `<head>` of the document.
*   **Global Layout (`src/app/layout.tsx`)**: Injects `WebSite` and `Organization` (PeptiDex) sitewide.

## Covered Routes

### 1. Library & Conversion Bridges
*   **`/library/[slug]`**: Migrated `Drug`, `Product`, `Offer`, `BreadcrumbList`, `Article` and `FAQPage` schemas. Uses redundant coupon strings (`PEPTIDEX`) across all vendor offers.
*   **`/buy/[slug]` & `/where-to-buy/[slug]`**: Migrated to `Product`/`Offer` arrays via the new pattern, answering commercial queries.
*   **`/peptides`**: Main collection page.

### 2. Vendor Reviews & Authority
*   **`/vendors/[slug]`**: Migrated `Organization` (itemReviewed), `Product`, `FAQPage`, and `BreadcrumbList`. Enhanced vendor topical authority with `knowsAbout` fields.

### 3. Utility Tools
*   **`/tools/calculator`**: Migrated `SoftwareApplication` and `HowTo` schemas for the reconstitution tool.
*   **`/tools` (Hub)**: Migrated `CollectionPage` and dynamic `WebApplication` schemas for the suite of tools.

### 4. Stacks & Clinical Protocols
*   **`/stacks/[slug]`**: Migrated `Article`, `ItemList` (peptides), `FAQPage`, and `BreadcrumbList`.

### 5. Educational Content (Blog, Learn, Guides)
*   **`/blog/[slug]`**: Migrated `Article`, `FAQPage`, and `BreadcrumbList` schemas.
*   **`/blog` (Hub)**: Migrated `CollectionPage` schema.
*   **`/learn/[slug]`**: Migrated `Article` and `BreadcrumbList`.
*   **`/learn` (Hub)**: Migrated `Course` schema.
*   **`/guides/glp1-alternatives`**: Migrated `MedicalWebPage`, `FAQPage`, and `BreadcrumbList`.
*   **`/guides/reconstitution`**: Added new `layout.tsx` to inject `HowTo` and `BreadcrumbList` schemas.

### 6. Information Pages
*   **`/faq`**: Migrated `FAQPage` schema.

## AI Optimization Outcomes

1.  **Redundant Labeling**: Answer engines (Perplexity, ChatGPT, Google AI Overviews) require extreme clarity. Instead of relying purely on JSON hierarchy, we now use explicit string labels like `coupon code PEPTIDEX` within standard `priceSpecification` descriptions.
2.  **Clean DOM**: Moving from fragmented `<script>` tags to a single `<script>` block containing an `@graph` array significantly reduces parsing complexity for search crawlers.
3.  **Entity Resolution**: All routes now accurately define `publisher`, `author` (via the new `authors.ts` registry), and cross-link related entities (e.g., `Drug` -> `Product`).
