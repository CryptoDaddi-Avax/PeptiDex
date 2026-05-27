import Link from 'next/link';
import type { Metadata } from 'next';
import { getPeptideBySlug } from '@/data/peptides';
import { buildSoftwareApplicationSchema, buildFAQPageSchema } from '@/lib/seo/schema';
import { SchemaInjector } from '@/components/schema-injector';
import { DisclaimerCard } from '@/components/ui/DisclaimerCard';
import { ShieldCheck, ArrowRight, FlaskConical, Beaker, GraduationCap, ArrowLeft, Layers, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peptide Reconstitution Calculators — Pre-Filled Compound Guides | PeptiDex',
  description: 'Select a research peptide to access a pre-filled, custom reconstitution calculator. Get exact Bacteriostatic water diluent volumes and syringe units instantly.',
  alternates: { canonical: 'https://peptidex.app/tools/reconstitution-calculator' },
  openGraph: {
    title: 'Peptide Reconstitution Calculators — Pre-filled Compound Guides | PeptiDex',
    description: 'Access individual, indexable reconstitution calculators pre-filled with standard research defaults for BPC-157 and other compounds.',
    url: 'https://peptidex.app/tools/reconstitution-calculator',
    type: 'website',
    images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peptide Reconstitution Calculators | PeptiDex',
    description: 'Select a peptide to get exact pre-filled U-100 syringe units and Bacteriostatic water ratios tailored to your research protocol.',
  },
};

export default function ReconstitutionCalculatorHub() {
  const activeCompoundSlugs = ['bpc-157'];
  const upcomingCompoundSlugs = ['tb-500', 'semaglutide', 'tirzepatide', 'retatrutide', 'ghk-cu'];

  const activePeptides = activeCompoundSlugs.map(getPeptideBySlug).filter(Boolean);
  const upcomingPeptides = upcomingCompoundSlugs.map(getPeptideBySlug).filter(Boolean);

  // Server-rendered schemas
  const softwareSchema = buildSoftwareApplicationSchema({
    name: 'PeptiDex Reconstitution Calculators Directory',
    description: 'Directory of pre-filled, compound-specific reconstitution calculators for peptide research.',
    url: 'https://peptidex.app/tools/reconstitution-calculator',
    applicationCategory: 'UtilityApplication',
  });

  const faqSchema = buildFAQPageSchema([
    {
      q: 'What is a peptide reconstitution calculator?',
      a: 'A reconstitution calculator computes the concentration of a peptide solution after mixing freeze-dried peptide powder with a diluent (like Bacteriostatic water) and determines the exact volume/units required on a syringe to draw a specific target dose.',
    },
    {
      q: 'Why use compound-specific calculators?',
      a: 'Compound-specific calculators are pre-filled with standard clinical and research defaults for vial sizes, water volumes, and initial starting doses, eliminating math errors and ensuring sensible starting ratios.',
    },
  ]);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://peptidex.app/tools' },
      { '@type': 'ListItem', position: 3, name: 'Reconstitution', item: 'https://peptidex.app/tools/reconstitution-calculator' },
    ],
  };

  const allSchemas = [softwareSchema, faqSchema, breadcrumbSchema].filter(Boolean) as Record<string, unknown>[];

  return (
    <>
      <SchemaInjector schema={allSchemas} />

      <header
        className="cmp-hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '64px 24px 48px',
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Link href="/" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--line-strong)' }}>/</span>
            <Link href="/tools" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Tools</Link>
            <span style={{ color: 'var(--line-strong)' }}>/</span>
            <span style={{ color: 'var(--gold)' }}>Reconstitution</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            § Calculators Index
          </div>

          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 16px 0',
              maxWidth: 700,
            }}
          >
            Reconstitution{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Calculators</em>{' '}
            Index.
          </h1>

          <p style={{ fontSize: 17, color: 'var(--ink-dim)', maxWidth: 700, lineHeight: 1.6, margin: 0 }}>
            Welcome to the PeptiDex Reconstitution Calculators Index. Getting dilution ratios exactly right is critical for laboratory research. Below, select a specific compound to load its custom, pre-filled calculator with sensible clinical defaults (vial mg, BAC water mL, starting dose), alongside step-by-step worked math examples and safe reconstitution handling protocols.
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Research Disclaimer */}
        <DisclaimerCard variant="tool" className="mb-8" />

        {/* Multi-Compound General Calculator Fallback CTA */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-blue-300 flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4" />
              Looking for a general multi-purpose calculator?
            </h2>
            <p className="text-xs text-zinc-400">
              Need to calculate reconstitution for an unlisted compound or custom blend? Open our universal calculator.
            </p>
          </div>
          <Link
            href="/tools/calculator"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold hover:bg-blue-500/20 transition-all"
          >
            Open Universal Calculator <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Section 1: Approved Active Calculators */}
        <div className="space-y-4 mb-10">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4">
            Available Pre-Filled Calculators
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {activePeptides.map((pep) => {
              if (!pep) return null;
              return (
                <Link
                  key={pep.slug}
                  href={`/tools/reconstitution-calculator/${pep.slug}`}
                  className="group block p-5 rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-emerald-400" />
                        {pep.name} Reconstitution Calculator
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                        Pre-filled with clinical research defaults of <strong>{pep.dosing?.typical_vial_mg ?? 5}mg</strong> vial size, <strong>{pep.dosing?.reconstitution_ml ?? 2.5}mL</strong> BAC water, and standard starting dose of <strong>{pep.dosing?.typical_dose_mcg?.[0] ?? 250}mcg</strong>.
                      </p>
                    </div>
                    <div className="shrink-0 p-2 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
                      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 2: Staged Upcoming Calculators */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4">
            Upcoming Compound-Specific Tools (Staged Wave)
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingPeptides.map((pep) => {
              if (!pep) return null;
              return (
                <div
                  key={pep.slug}
                  className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 text-zinc-500 select-none flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <Beaker className="w-3.5 h-3.5 text-zinc-600" />
                      {pep.name} Calculator
                    </h3>
                    <p className="text-[10px] text-zinc-600 mt-0.5">Staged for subsequent wave release</p>
                  </div>
                  <span className="text-[9px] font-bold text-zinc-700 bg-zinc-900/60 border border-zinc-900 rounded px-1.5 py-0.5 uppercase tracking-wider">
                    Queued
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
