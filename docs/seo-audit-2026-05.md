# SEO Audit 2026-05: Current Schema Status

## Overview
This document outlines the current state of structured data (JSON-LD), sitemap, and robots.txt implementation across the PeptiDex platform before applying the new SEO audit fixes.

## Route Audit

| Route | Current Schema Status | Required Schema | Notes |
|-------|-----------------------|-----------------|-------|
| **Homepage** (`/`) | Inline JSON-LD. Has `WebSite`, `SearchAction`, `FAQPage`, and combined `HealthAndBeautyBusiness`/`EducationalOrganization`. | Organization + WebSite + SearchAction | Needs to use centralized schema generators. The Organization schema needs to be specifically injected. |
| **Library** (`/library/[slug]`) | Inline JSON-LD. Has `Drug`/`PrescriptionDrug`, `HowTo`, and `Article`. | MedicalWebPage or Article + BreadcrumbList | Missing `BreadcrumbList`. Needs to switch to centralized schema generators. Schema types need to be adjusted to match requirements. |
| **Vendors** (`/vendors`) | Uses `buildVendorsItemListSchema`, `buildVendorsFAQSchema`, `buildVendorsBreadcrumbSchema` from `lib/seo/vendorsJsonLd.ts`. | ItemList + FAQPage + BreadcrumbList | Currently centralized, but in a monolithic file. Needs to be split into `lib/seo/schema/*.ts` (One file per type). |
| **Where to Buy** (`/where-to-buy/[slug]`) | Inline JSON-LD. Has `BreadcrumbList`, `ItemList`, `FAQPage`. | ItemList + FAQPage + BreadcrumbList | Needs to use centralized schema generators. |
| **Blog** (`/blog/[slug]`) | Uses `buildArticleSchema`, `buildBreadcrumbSchema` from `lib/schema.ts`. | Article + BreadcrumbList + Author | Needs to be moved to `lib/seo/schema/*.ts`. |
| **Tools** (`/tools/[tool]`) | Imports schemas in `/tools/calculator` but does not inject `<script type="application/ld+json">`. | SoftwareApplication or HowTo | Needs injection of the actual script tags using centralized generators. |

## Sitemap & Robots Status
- **sitemap.ts**: Includes all dynamic routes. However, `lastModified` for peptides, stacks, learn, compare, and where-to-buy is hardcoded to `currentDate` (build date) rather than the actual content update date.
- **robots.ts**: Blocks `/api/` and `/saved`. Allows `/` which implicitly allows `/tools/*` and `/where-to-buy/*`, but explicit `allow` rules can be added for clarity.

## Internal Linking Status
- Cross-linking from `/library/[peptide]` to `/where-to-buy/[peptide]` needs to be added.
- `/vendors` needs a "Popular peptides" sidebar linking to the top 5 `/where-to-buy/[peptide]` pages.
- `/tools/[tool]` pages need links to `/vendors`.
- Homepage needs a link to `/vendors` with the anchor "best place to buy peptides".
