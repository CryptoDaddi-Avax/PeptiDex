import { buildMedicalWebPageSchema, buildDrugSchema, buildFAQPageSchema, buildBreadcrumbSchema, buildArticleSchema, buildSoftwareApplicationSchema } from '../src/lib/schema';
import { peptides } from '../src/data/peptides';
import { peptideBlends } from '../src/data/blends';

const peptide = peptides[0];
const slug = peptide.slug;

// 1. Peptide Page
const peptideBreadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://peptidex.app/' },
    { name: 'Peptide Library', url: 'https://peptidex.app/peptides' },
    { name: peptide.category },
    { name: peptide.name }
]);

const drugSchema = buildDrugSchema({
    name: peptide.name,
    alternateName: peptide.aliases,
    description: peptide.primary_benefits,
    mechanismOfAction: peptide.mechanism,
    clinicalPharmacology: peptide.half_life_hours ? `Half-life: ${peptide.half_life_hours} hours. Route: ${peptide.dosing?.route || 'Varies'}` : undefined
});

const peptideArticle = buildMedicalWebPageSchema({
    name: `${peptide.name}: Evidence-Based Research Profile`,
    description: `Comprehensive research profile for ${peptide.name} covering mechanism of action, published studies, safety data, and clinical context.`,
    url: `https://peptidex.app/peptides/${slug}`,
    lastReviewed: "2026-05-04",
    reviewedBy: { name: 'PeptiDex Medical Reviewer' },
    about: drugSchema
});

console.log("=== PEPTIDE PAGE SCHEMA (BPC-157) ===");
console.log(JSON.stringify(peptideBreadcrumb, null, 2));
console.log(JSON.stringify(peptideArticle, null, 2));
console.log("\n");

// 2. Stack Page
const stackBreadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://peptidex.app/' },
    { name: 'Stacks', url: 'https://peptidex.app/stacks' },
    { name: "Recovery Stack", url: `https://peptidex.app/stacks/recovery` }
]);

const stackArticle = buildArticleSchema({
    headline: `Best Peptide Stack for Recovery, Research-Backed Protocols`,
    description: `Explore the optimal peptide combinations for recovery, with synergy rationale and preclinical study data.`,
    datePublished: '2026-03-31',
    dateModified: "2026-05-04",
    author: { name: 'PeptiDex Educational Team', url: 'https://peptidex.app' },
    url: `https://peptidex.app/stacks/recovery`
});

console.log("=== STACK PAGE SCHEMA (Recovery Stack) ===");
console.log(JSON.stringify(stackBreadcrumb, null, 2));
console.log(JSON.stringify(stackArticle, null, 2));
console.log("\n");

// 3. Blog Post
const blogBreadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://peptidex.app/' },
    { name: 'Blog', url: 'https://peptidex.app/blog' },
    { name: "Top 5 Peptides for Longevity", url: "https://peptidex.app/blog/top-5-peptides" }
]);

const blogArticle = buildArticleSchema({
    headline: "Top 5 Peptides for Longevity",
    description: "A deep dive into longevity peptides.",
    datePublished: "2026-04-01",
    dateModified: "2026-05-04",
    author: { name: 'Dr. E. Vance', url: `https://peptidex.app/about/dr-e-vance` },
    url: "https://peptidex.app/blog/top-5-peptides"
});

console.log("=== BLOG POST SCHEMA ===");
console.log(JSON.stringify(blogBreadcrumb, null, 2));
console.log(JSON.stringify(blogArticle, null, 2));
console.log("\n");

// 4. Tool Page
const toolSchema = buildSoftwareApplicationSchema({
    name: "PeptiDex Reconstitution Calculator",
    description: "Calculate solution concentrations and volumetric measurements for peptide reconstitution.",
    url: "https://peptidex.app/tools/calculator",
    applicationCategory: "UtilityApplication"
});

console.log("=== TOOL PAGE SCHEMA (Calculator) ===");
console.log(JSON.stringify(toolSchema, null, 2));
console.log("\n");
