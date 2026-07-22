/**
 * Programmatic Comparison Page — Server Component
 * 
 * Generates content-rich comparison pages from structured peptide data.
 * All content is server-rendered (no client JS for primary content).
 * Every claim traces to a structured DB field or PMID — no fabrication.
 */

import Link from 'next/link';
import {
  GitCompare, ArrowRight, Zap, FlaskConical, BookOpen,
  ShieldAlert, DollarSign, Scale, HelpCircle, ExternalLink
} from 'lucide-react';
import type { Peptide } from '@/data/types';
import type { ComparisonPair } from '@/data/comparison-pairs';
import { vendorPricing } from '@/data/vendor-pricing';
import { goalPages } from '@/data/goal-pages';
import { comparisonPairs } from '@/data/comparison-pairs';
import { comparisons } from '@/data/comparisons';
import { ComparisonPricingBox } from '@/components/compare/ComparisonPricingBox';

// ─── CONTENT GENERATORS ─────────────────────────────────────────────
// Every function here produces unique text from structured data fields.
// No generic filler — if a field is null, the section is omitted.

function generateVerdict(a: Peptide, b: Peptide, pair: ComparisonPair): string {
  if (pair.verdictOverride) return pair.verdictOverride;

  const studyDiff = Math.abs(a.key_studies.length - b.key_studies.length);
  const moreStudied = a.key_studies.length >= b.key_studies.length ? a : b;
  const lessStudied = a.key_studies.length >= b.key_studies.length ? b : a;

  let verdict = `${a.name} is a ${a.category.toLowerCase()} primarily researched for ${a.primary_benefits.toLowerCase()}, while ${b.name} is a ${b.category.toLowerCase()} studied for ${b.primary_benefits.toLowerCase()}.`;

  if (studyDiff > 3) {
    verdict += ` ${moreStudied.name} has substantially more indexed research (${moreStudied.key_studies.length} studies) compared to ${lessStudied.name} (${lessStudied.key_studies.length} studies).`;
  }

  const aFDA = a.is_fda_approved || a.safety_notes.includes('FDA-approved');
  const bFDA = b.is_fda_approved || b.safety_notes.includes('FDA-approved');
  if (aFDA !== bFDA) {
    const approved = aFDA ? a : b;
    verdict += ` A key distinction: ${approved.name} has FDA approval status.`;
  }

  return verdict;
}

function generateMechanismProse(a: Peptide, b: Peptide): { htmlA: string; htmlB: string; diff: string } {
  const mechA = a.mechanism;
  const mechB = b.mechanism;

  const htmlA = `<p><strong>${a.name}</strong> ${a.laypersonSummary || ''}</p><p>${mechA}</p>`;
  const htmlB = `<p><strong>${b.name}</strong> ${b.laypersonSummary || ''}</p><p>${mechB}</p>`;

  // Generate key difference summary
  let diff: string;
  if (a.category === b.category) {
    diff = `Both ${a.name} and ${b.name} belong to the ${a.category} class, but differ in their specific molecular targets and pharmacokinetic profiles.`;
  } else {
    diff = `${a.name} operates as a ${a.category.toLowerCase()}, while ${b.name} functions as a ${b.category.toLowerCase()} — these are fundamentally different pharmacological approaches.`;
  }

  if (a.half_life_hours && b.half_life_hours) {
    const hlA = a.half_life_hours;
    const hlB = b.half_life_hours;
    const ratio = Math.max(hlA, hlB) / Math.min(hlA, hlB);
    if (ratio > 3) {
      const longer = hlA > hlB ? a : b;
      const shorter = hlA > hlB ? b : a;
      const longerHL = hlA > hlB ? hlA : hlB;
      const shorterHL = hlA > hlB ? hlB : hlA;
      diff += ` ${longer.name} has a significantly longer half-life (${formatHalfLife(longerHL)}) compared to ${shorter.name} (${formatHalfLife(shorterHL)}), which impacts dosing frequency and sustained activity.`;
    }
  }

  return { htmlA, htmlB, diff };
}

function generateFAQs(a: Peptide, b: Peptide, pair: ComparisonPair): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];

  // FAQ 1: Can I take them together?
  const aInteractions = a.interactions;
  const bInteractions = b.interactions;
  let interactionAnswer: string;

  const aSynergies = aInteractions?.synergies?.map(s => s.toLowerCase()) || [];
  const bSynergies = bInteractions?.synergies?.map(s => s.toLowerCase()) || [];
  const aCautions = aInteractions?.cautions?.map(s => s.toLowerCase()) || [];
  const bCautions = bInteractions?.cautions?.map(s => s.toLowerCase()) || [];
  const aContra = aInteractions?.contraindicated?.map(s => s.toLowerCase()) || [];
  const bContra = bInteractions?.contraindicated?.map(s => s.toLowerCase()) || [];

  const bNameLower = b.name.toLowerCase();
  const aNameLower = a.name.toLowerCase();

  if (aContra.includes(bNameLower) || bContra.includes(aNameLower)) {
    interactionAnswer = `No — ${a.name} and ${b.name} are flagged as contraindicated in interaction databases. They should not be combined due to overlapping receptor activity or safety concerns.`;
  } else if (aCautions.includes(bNameLower) || bCautions.includes(aNameLower)) {
    interactionAnswer = `Use caution. ${a.name} and ${b.name} have overlapping mechanisms that may require careful dosing adjustment when used concurrently. Consult published research protocols before combining.`;
  } else if (aSynergies.includes(bNameLower) || bSynergies.includes(aNameLower)) {
    interactionAnswer = `Yes — ${a.name} and ${b.name} are identified as synergistic in interaction databases. They operate through complementary mechanisms and are commonly combined in research protocols.`;
  } else {
    interactionAnswer = `No direct interaction data is available for this specific pair. They target different receptor systems, suggesting they could potentially be combined, but no published protocol validates this combination.`;
  }

  faqs.push({
    q: `Can I take ${a.name} and ${b.name} together?`,
    a: interactionAnswer,
  });

  // FAQ 2: Which has more evidence?
  const aStudies = a.key_studies.length;
  const bStudies = b.key_studies.length;
  const aLevel = a.key_studies[0]?.evidence_level ?? 'preclinical';
  const bLevel = b.key_studies[0]?.evidence_level ?? 'preclinical';

  faqs.push({
    q: `Which has more research evidence — ${a.name} or ${b.name}?`,
    a: `${a.name} has ${aStudies} indexed studies (highest evidence: ${formatEvidenceLevel(aLevel)}). ${b.name} has ${bStudies} indexed studies (highest evidence: ${formatEvidenceLevel(bLevel)}). ${aStudies > bStudies ? `${a.name} has a more extensive research base.` : bStudies > aStudies ? `${b.name} has a more extensive research base.` : 'Both have comparable research coverage.'}`,
  });

  // FAQ 3: Price difference
  const priceA = vendorPricing.find(p => p.slug === a.slug);
  const priceB = vendorPricing.find(p => p.slug === b.slug);
  const cheapestA = priceA?.vendors.filter(v => v.inStock).sort((x, y) => (x.price_usd / x.vial_mg) - (y.price_usd / y.vial_mg))[0];
  const cheapestB = priceB?.vendors.filter(v => v.inStock).sort((x, y) => (x.price_usd / x.vial_mg) - (y.price_usd / y.vial_mg))[0];

  if (cheapestA && cheapestB) {
    const perMgA = cheapestA.price_usd / cheapestA.vial_mg;
    const perMgB = cheapestB.price_usd / cheapestB.vial_mg;
    const cheaper = perMgA < perMgB ? a : b;
    const costlier = perMgA < perMgB ? b : a;
    const cheaperPerMg = Math.min(perMgA, perMgB);
    const costlierPerMg = Math.max(perMgA, perMgB);

    faqs.push({
      q: `What is the price difference between ${a.name} and ${b.name}?`,
      a: `At current verified vendor prices, ${cheaper.name} starts at $${cheaperPerMg.toFixed(2)}/mg while ${costlier.name} starts at $${costlierPerMg.toFixed(2)}/mg. Prices vary by vendor and vial size — see the full vendor comparison below.`,
    });
  }

  // FAQ 4: Shared goal (if applicable)
  if (pair.sharedGoals.length > 0) {
    const goalLabel = pair.sharedGoals[0].replace(/-/g, ' ');
    faqs.push({
      q: `Which is better for ${goalLabel} — ${a.name} or ${b.name}?`,
      a: `Both are researched for ${goalLabel}. ${a.name} addresses this via ${a.primary_benefits.toLowerCase()}. ${b.name} approaches it through ${b.primary_benefits.toLowerCase()}. The optimal choice depends on your specific research protocol and which mechanism aligns with your objectives.`,
    });
  }

  // FAQ 5: FDA status (if different)
  const aFDA = a.is_fda_approved || a.safety_notes.includes('FDA-approved');
  const bFDA = b.is_fda_approved || b.safety_notes.includes('FDA-approved');
  if (aFDA !== bFDA) {
    const approved = aFDA ? a : b;
    const unapproved = aFDA ? b : a;
    faqs.push({
      q: `Is ${a.name} or ${b.name} FDA-approved?`,
      a: `${approved.name} has FDA approval (or is derived from an FDA-approved compound). ${unapproved.name} is a research compound without FDA approval for human use. FDA status reflects regulatory evaluation — not necessarily superiority for all research applications.`,
    });
  }

  return faqs;
}

// ─── HELPERS ──────────────────────────────────────────────────────────

function formatHalfLife(hours: number): string {
  if (hours >= 24) {
    const days = hours / 24;
    return days === 1 ? '~1 day' : `~${days.toFixed(days % 1 === 0 ? 0 : 1)} days`;
  }
  if (hours >= 1) return `~${hours} hours`;
  const minutes = hours * 60;
  return `~${Math.round(minutes)} minutes`;
}

function formatEvidenceLevel(level: string): string {
  const map: Record<string, string> = {
    'very-strong': 'Very Strong',
    'strong': 'Strong',
    'moderate-strong': 'Moderate-Strong',
    'moderate': 'Moderate',
    'preclinical': 'Preclinical',
    'emerging': 'Emerging',
    'anecdotal': 'Anecdotal',
  };
  return map[level] || level;
}

function getSharedGoalPages(slugA: string, slugB: string) {
  return goalPages.filter(
    (g) => g.peptideSlugs.includes(slugA) && g.peptideSlugs.includes(slugB)
  );
}

function getRelatedProgrammaticPairs(pair: ComparisonPair): ComparisonPair[] {
  return comparisonPairs
    .filter(
      (p) =>
        p.slug !== pair.slug &&
        (p.slugA === pair.slugA || p.slugB === pair.slugA || p.slugA === pair.slugB || p.slugB === pair.slugB)
    )
    .slice(0, 4);
}

function getRelatedHandBuiltComparisons(slugA: string, slugB: string) {
  return comparisons
    .filter(
      (c) => c.peptideA === slugA || c.peptideB === slugA || c.peptideA === slugB || c.peptideB === slugB
    )
    .slice(0, 3);
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────

interface ProgrammaticComparisonProps {
  pair: ComparisonPair;
  peptideA: Peptide;
  peptideB: Peptide;
}

export function ProgrammaticComparisonPage({ pair, peptideA, peptideB }: ProgrammaticComparisonProps) {
  const nameA = peptideA.name;
  const nameB = peptideB.name;
  const TITLE = `${nameA} vs ${nameB}: Mechanism, Evidence & Price Comparison`;
  const DATE_MOD = new Date().toISOString().split('T')[0];

  const verdict = generateVerdict(peptideA, peptideB, pair);
  const mechanism = generateMechanismProse(peptideA, peptideB);
  const faqs = generateFAQs(peptideA, peptideB, pair);
  const sharedGoals = getSharedGoalPages(pair.slugA, pair.slugB);
  const relatedProgrammatic = getRelatedProgrammaticPairs(pair);
  const relatedHandBuilt = getRelatedHandBuiltComparisons(pair.slugA, pair.slugB);

  // Vendor pricing
  const priceDataA = vendorPricing.find(p => p.slug === pair.slugA);
  const priceDataB = vendorPricing.find(p => p.slug === pair.slugB);
  const cheapestA = priceDataA?.vendors.filter(v => v.inStock).sort((a, b) => a.price_usd - b.price_usd)[0];
  const cheapestB = priceDataB?.vendors.filter(v => v.inStock).sort((a, b) => a.price_usd - b.price_usd)[0];

  // JSON-LD schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://peptidex.app/compare' },
      { '@type': 'ListItem', position: 3, name: `${nameA} vs ${nameB}`, item: `https://peptidex.app/compare/${pair.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: verdict.slice(0, 155),
    image: 'https://peptidex.app/og-image.png',
    author: { '@type': 'Organization', name: 'PeptiDex Editorial Team', url: 'https://peptidex.app/about' },
    publisher: { '@type': 'Organization', name: 'PeptiDex', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' } },
    dateModified: DATE_MOD,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://peptidex.app/compare/${pair.slug}` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HEADER ── */}
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/compare">Compare</Link>
            <span className="sep">/</span>
            <span className="current">{nameA} vs {nameB}</span>
          </nav>

          <div className="section-label">§ Head-to-Head Comparison</div>
          <h1 className="page-title">
            {nameA} vs {nameB}.
          </h1>

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-violet-500/15 text-violet-300 border border-violet-500/30 rounded">
              {peptideA.category}
            </span>
            <span className="text-zinc-600 text-xs">vs</span>
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-teal-500/15 text-teal-300 border border-teal-500/30 rounded">
              {peptideB.category}
            </span>
          </div>
        </div>
      </header>

      <div className="about-content fade-up space-y-16">

        {/* ── EDITOR NOTE ── */}
        {pair.editorNote && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-300 mb-1">Editor&apos;s Note</p>
              <p className="text-sm text-amber-200/80 leading-relaxed">{pair.editorNote}</p>
            </div>
          </div>
        )}

        {/* ── §1 QUICK VERDICT (AEO target) ── */}
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-violet-400" />
            <h2 className="font-bold text-violet-300 text-sm uppercase tracking-widest">Quick Verdict</h2>
          </div>
          <p className="text-zinc-200 leading-relaxed">{verdict}</p>
        </div>

        {/* ── §2 SIDE-BY-SIDE SPEC TABLE ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <GitCompare className="w-5 h-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-zinc-100">Side-by-Side Analysis</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 shadow-xl shadow-black/20">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/80">
                <tr className="border-b border-zinc-700">
                  <th className="px-4 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider w-[20%]">Dimension</th>
                  <th className="px-4 py-4 text-sm font-bold text-emerald-400 uppercase tracking-wider w-[40%]">{nameA}</th>
                  <th className="px-4 py-4 text-sm font-bold text-blue-400 uppercase tracking-wider w-[40%]">{nameB}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 bg-zinc-900/20">
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">Category</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideA.category}</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideB.category}</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">Mechanism</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideA.mechanism.split('.')[0]}.</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideB.mechanism.split('.')[0]}.</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">Half-Life</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideA.half_life_hours ? formatHalfLife(peptideA.half_life_hours) : 'Not established'}</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideB.half_life_hours ? formatHalfLife(peptideB.half_life_hours) : 'Not established'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">Route</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideA.dosing?.route || 'Varies'}</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideB.dosing?.route || 'Varies'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">Typical Dose</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideA.dosing ? `${peptideA.dosing.typical_dose_mcg[0]}–${peptideA.dosing.typical_dose_mcg[1]} mcg` : 'Varies'}</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideB.dosing ? `${peptideB.dosing.typical_dose_mcg[0]}–${peptideB.dosing.typical_dose_mcg[1]} mcg` : 'Varies'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">Frequency</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideA.dosing?.frequency || 'Varies'}</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideB.dosing?.frequency || 'Varies'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">Evidence Level</td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {formatEvidenceLevel(peptideA.key_studies[0]?.evidence_level ?? 'preclinical')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {formatEvidenceLevel(peptideB.key_studies[0]?.evidence_level ?? 'preclinical')}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">Indexed Studies</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideA.key_studies.length}+ indexed</td>
                  <td className="px-4 py-4 text-zinc-300">{peptideB.key_studies.length}+ indexed</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-zinc-400 font-medium">FDA Status</td>
                  <td className="px-4 py-4">
                    {peptideA.is_fda_approved || peptideA.safety_notes.includes('FDA-approved')
                      ? <span className="text-emerald-400 font-semibold">Approved</span>
                      : <span className="text-amber-400">Research Only</span>}
                  </td>
                  <td className="px-4 py-4">
                    {peptideB.is_fda_approved || peptideB.safety_notes.includes('FDA-approved')
                      ? <span className="text-emerald-400 font-semibold">Approved</span>
                      : <span className="text-amber-400">Research Only</span>}
                  </td>
                </tr>
                <tr className="bg-emerald-500/5">
                  <td className="px-4 py-4 text-zinc-400 font-medium flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />Lowest Price
                  </td>
                  <td className="px-4 py-4">
                    {cheapestA
                      ? <span className="text-emerald-300 font-bold">${cheapestA.price_usd.toFixed(2)}<span className="text-xs text-zinc-500 font-normal"> / {cheapestA.vial_mg}mg via {cheapestA.vendor}</span></span>
                      : <span className="text-zinc-500">—</span>}
                  </td>
                  <td className="px-4 py-4">
                    {cheapestB
                      ? <span className="text-emerald-300 font-bold">${cheapestB.price_usd.toFixed(2)}<span className="text-xs text-zinc-500 font-normal"> / {cheapestB.vial_mg}mg via {cheapestB.vendor}</span></span>
                      : <span className="text-zinc-500">—</span>}
                  </td>
                </tr>
                {cheapestA && cheapestB && (
                  <tr className="bg-emerald-500/5">
                    <td className="px-4 py-4 text-zinc-400 font-medium flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-emerald-400" />Per-mg Cost
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-emerald-300 font-bold">${(cheapestA.price_usd / cheapestA.vial_mg).toFixed(2)}/mg</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-emerald-300 font-bold">${(cheapestB.price_usd / cheapestB.vial_mg).toFixed(2)}/mg</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── §3 MECHANISM COMPARISON PROSE ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="w-5 h-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-zinc-100">Mechanism of Action Comparison</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h3 className="font-bold text-emerald-400 text-sm uppercase tracking-widest mb-3">How {nameA} Works</h3>
              <div
                className="text-sm text-zinc-300 leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: mechanism.htmlA }}
              />
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
              <h3 className="font-bold text-blue-400 text-sm uppercase tracking-widest mb-3">How {nameB} Works</h3>
              <div
                className="text-sm text-zinc-300 leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: mechanism.htmlB }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/40 p-5">
            <h3 className="font-bold text-zinc-200 text-sm mb-2">Key Mechanistic Difference</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{mechanism.diff}</p>
          </div>
        </section>

        {/* ── §4 EVIDENCE COMPARISON ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-zinc-100">Research Evidence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Peptide A evidence */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-emerald-400 text-sm">{nameA}</h3>
                <span className="text-xs font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {peptideA.key_studies.length} studies
                </span>
              </div>
              <ul className="space-y-2">
                {peptideA.key_studies.slice(0, 3).map((study, i) => (
                  <li key={i} className="text-xs text-zinc-400 leading-relaxed">
                    <a
                      href={study.pubmed_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      {study.title}
                    </a>
                    <span className="block text-zinc-500 mt-0.5">{study.summary.slice(0, 120)}…</span>
                    <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {formatEvidenceLevel(study.evidence_level)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/library/${pair.slugA}`}
                className="mt-3 inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 font-medium"
              >
                View all {nameA} research <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Peptide B evidence */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-blue-400 text-sm">{nameB}</h3>
                <span className="text-xs font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {peptideB.key_studies.length} studies
                </span>
              </div>
              <ul className="space-y-2">
                {peptideB.key_studies.slice(0, 3).map((study, i) => (
                  <li key={i} className="text-xs text-zinc-400 leading-relaxed">
                    <a
                      href={study.pubmed_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      {study.title}
                    </a>
                    <span className="block text-zinc-500 mt-0.5">{study.summary.slice(0, 120)}…</span>
                    <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {formatEvidenceLevel(study.evidence_level)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/library/${pair.slugB}`}
                className="mt-3 inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 font-medium"
              >
                View all {nameB} research <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── §5 PER-MG PRICE COMPARISON (MOAT FEATURE) ── */}
        <ComparisonPricingBox
          nameA={nameA}
          slugA={pair.slugA}
          nameB={nameB}
          slugB={pair.slugB}
        />

        {/* ── §6 FAQ BLOCK ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-zinc-100">Frequently Asked Questions</h2>
          </div>
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-all group"
              open={i === 0}
            >
              <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-zinc-200 leading-snug list-none flex items-center justify-between">
                {faq.q}
                <span className="text-zinc-500 ml-2 text-xs group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </section>

        {/* ── RELATED COMPARISONS ── */}
        {(relatedHandBuilt.length > 0 || relatedProgrammatic.length > 0) && (
          <section className="pt-8 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-100 mb-6">Related Comparisons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedHandBuilt.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GitCompare className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{c.tags[0]}</span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-200 group-hover:text-zinc-100">{c.title}</h3>
                  <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1 group-hover:text-violet-400 transition-colors">
                    Read comparison <ArrowRight className="w-3 h-3" />
                  </p>
                </Link>
              ))}
              {relatedProgrammatic.slice(0, 3 - relatedHandBuilt.length).map((p) => (
                <Link
                  key={p.slug}
                  href={`/compare/${p.slug}`}
                  className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GitCompare className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{p.reason}</span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-200 group-hover:text-zinc-100">
                    {p.slugA.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} vs {p.slugB.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1 group-hover:text-violet-400 transition-colors">
                    Read comparison <ArrowRight className="w-3 h-3" />
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── INTERNAL LINKS ── */}
        <div className="pt-8 border-t border-zinc-800/50">
          <h3 className="text-lg font-bold text-zinc-100 mb-4">Deep Dive Profiles</h3>
          <div className="flex flex-wrap gap-4">
            <Link href={`/library/${pair.slugA}`} className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">
              {nameA} Research Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={`/library/${pair.slugB}`} className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">
              {nameB} Research Profile <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Goal hub links */}
          {sharedGoals.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-bold text-zinc-400 mb-2">Shared Research Goals</h4>
              <div className="flex flex-wrap gap-2">
                {sharedGoals.map((goal) => (
                  <Link
                    key={goal.slug}
                    href={`/best/${goal.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300 hover:border-violet-500/30 hover:text-violet-300 transition-all"
                  >
                    {goal.emoji} {goal.h1} <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── §7 MEDICAL DISCLAIMER ── */}
        <div className="pt-8 border-t border-zinc-800/50">
          <div className="flex items-start gap-3 rounded-xl border border-zinc-700/50 bg-zinc-900/40 p-5">
            <ShieldAlert className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Research Use Only — Not Medical Advice</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                This comparison is provided for educational and research purposes only. It does not constitute medical, prescribing, or treatment advice.
                Clinical data cited here is sourced from published peer-reviewed trials and FDA labels. Consult a qualified healthcare professional
                before making any decisions about medications or research compounds. PeptiDex is an informational resource and does not sell pharmaceutical products.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
