import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPeptideBySlug } from '@/data/peptides';
import { reconstitutionContent } from '@/data/reconstitution-content';
import { buildHowToSchema, buildSoftwareApplicationSchema } from '@/lib/seo/schema';
import { SchemaInjector } from '@/components/schema-injector';
import CalculatorClient from '@/app/tools/calculator/CalculatorClient';
import { DisclaimerCard } from '@/components/ui/DisclaimerCard';
import { ShieldCheck, ArrowRight, FlaskConical, Beaker, GraduationCap, FileText, ShoppingBag, ArrowLeft } from 'lucide-react';

const SUPPORTED_SLUGS = ['bpc-157'];

export function generateStaticParams() {
  return SUPPORTED_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!SUPPORTED_SLUGS.includes(slug)) return { title: 'Not Found' };

  const content = reconstitutionContent[slug];
  const peptide = getPeptideBySlug(slug);
  if (!content || !peptide) return { title: 'Not Found' };

  const title = `${peptide.name} Reconstitution Calculator — Syringe & BAC Water Math | PeptiDex`;
  const description = `Free pre-filled ${peptide.name} reconstitution calculator. Learn how to safely mix ${peptide.name} with bacteriostatic water and get exact syringe tick mark units.`;
  const url = `https://peptidex.app/tools/reconstitution-calculator/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ReconstitutionPeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SUPPORTED_SLUGS.includes(slug)) notFound();

  const content = reconstitutionContent[slug];
  const peptide = getPeptideBySlug(slug);
  if (!content || !peptide) notFound();

  // Clinically sensible, fully sourced defaults from database
  const defaultVialMg = peptide.dosing?.typical_vial_mg ? String(peptide.dosing.typical_vial_mg) : '5';
  const defaultBacWaterMl = peptide.dosing?.reconstitution_ml ? String(peptide.dosing.reconstitution_ml) : '2.5';
  const defaultDoseMcg = peptide.dosing?.typical_dose_mcg?.[0] ? String(peptide.dosing.typical_dose_mcg[0]) : '250';

  // Server-rendered schemas
  const softwareSchema = buildSoftwareApplicationSchema({
    name: `${peptide.name} Reconstitution Calculator`,
    description: `Calculate precise solution concentrations, diluent volumes, and syringe unit tick marks for ${peptide.name} reconstitution.`,
    url: `https://peptidex.app/tools/reconstitution-calculator/${slug}`,
    applicationCategory: 'UtilityApplication',
  });

  const howToSchema = buildHowToSchema({
    name: `How to Reconstitute ${peptide.name}`,
    description: `Step-by-step laboratory instructions for diluting freeze-dried ${peptide.name} powder into a measurable liquid solution.`,
    totalTime: 'PT5M',
    supply: [`Lyophilized ${peptide.name} (${defaultVialMg}mg)`, 'Bacteriostatic Water'],
    tool: ['U-100 Syringe', 'Alcohol Wipes'],
    steps: [
      {
        name: 'Sterilize Vials',
        text: 'Wipe the top rubber stopper of both the Bacteriostatic Water and the peptide vial with an alcohol swab.',
      },
      {
        name: 'Draw Diluent',
        text: `Using a sterile syringe, draw exactly ${defaultBacWaterMl} mL of Bacteriostatic Water and introduce it slowly into the ${peptide.name} vial.`,
      },
      {
        name: 'Dissolve Gently',
        text: 'Aim the liquid at the glass wall of the vial, letting it run down. Gently swirl—never shake—until completely dissolved.',
      },
      {
        name: 'Draw Measured Target Dose',
        text: `Divide peptide mass by diluent volume to find solution concentration. To draw a standard ${defaultDoseMcg} mcg dose, measure exact corresponding syringe units.`,
      },
    ],
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://peptidex.app/tools' },
      { '@type': 'ListItem', position: 3, name: 'Reconstitution', item: 'https://peptidex.app/tools/reconstitution-calculator' },
      { '@type': 'ListItem', position: 4, name: peptide.name, item: `https://peptidex.app/tools/reconstitution-calculator/${slug}` },
    ],
  };

  const allSchemas = [softwareSchema, howToSchema, breadcrumbSchema].filter(Boolean) as Record<string, unknown>[];

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
            <Link href="/tools/reconstitution-calculator" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Reconstitution</Link>
            <span style={{ color: 'var(--line-strong)' }}>/</span>
            <span style={{ color: 'var(--gold)' }}>{peptide.name}</span>
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
            § Pre-filled Protocol Calculator
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
            {peptide.name}{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Reconstitution</em>{' '}
            Calculator.
          </h1>

          <p style={{ fontSize: 17, color: 'var(--ink-dim)', maxWidth: 700, lineHeight: 1.6, margin: 0 }}>
            {content.introduction} Below, our interactive tool is pre-filled with standard research defaults (<strong>{defaultVialMg}mg</strong> vial, <strong>{defaultBacWaterMl}mL</strong> BAC water, and a starting dose of <strong>{defaultDoseMcg}mcg</strong>) for immediate calculation. All fields remain fully editable to match your exact protocol.
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Research Disclaimer */}
        <DisclaimerCard variant="tool" className="mb-6" />

        {/* Pre-filled Interactive Calculator */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-1 mb-8 shadow-xl">
          <CalculatorClient
            initialPeptideSlug={slug}
            initialVialMg={defaultVialMg}
            initialBacWaterMl={defaultBacWaterMl}
            initialTargetConcentrationMcg={defaultDoseMcg}
          />
        </div>

        {/* Unique Surrounding Educational Content */}
        <section className="space-y-8 mt-12 pt-8 border-t border-zinc-800 text-sm leading-relaxed text-zinc-300">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-400" />
              Bacteriostatic Water & Sterility Guidance
            </h2>
            <p>{content.bacWaterGuidance}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-emerald-400" />
              Safe Handling & Mixing Protocol
            </h2>
            <p>{content.handlingInstructions}</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <h2 className="text-base font-bold text-zinc-100 mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              Step-by-Step Worked Concentration Example
            </h2>
            <div className="prose prose-invert prose-xs text-zinc-400 space-y-3 font-sans">
              <div 
                className="whitespace-pre-line" 
                dangerouslySetInnerHTML={{ __html: content.workedExample }} 
              />
            </div>
            <p className="text-xs text-zinc-500 italic mt-4 pt-3 border-t border-zinc-800/80">
              {content.concentrationNote}
            </p>
          </div>

          {/* Contextual Internal Links Hub */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" />
              Verified Contextual Research Links
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <p className="text-zinc-500 font-semibold uppercase tracking-wider text-[9px] mb-1">Library & Guides</p>
                <Link
                  href={`/library/${slug}`}
                  className="group flex items-center gap-2 p-2.5 rounded-lg border border-zinc-800 bg-zinc-950/30 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-zinc-300 hover:text-violet-300"
                >
                  <FlaskConical className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{peptide.name} Library Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/guides/reconstitution"
                  className="group flex items-center gap-2 p-2.5 rounded-lg border border-zinc-800 bg-zinc-950/30 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-zinc-300 hover:text-violet-300"
                >
                  <Beaker className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Complete Reconstitution Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>

              <div className="space-y-3">
                <p className="text-zinc-500 font-semibold uppercase tracking-wider text-[9px] mb-1">Sourcing & Comparisons</p>
                <Link
                  href="/compare/bpc-157-vs-tb-500"
                  className="group flex items-center gap-2 p-2.5 rounded-lg border border-zinc-800 bg-zinc-950/30 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-zinc-300 hover:text-violet-300"
                >
                  <FlaskConical className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Compare BPC-157 vs TB-500</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/coupon-codes/amino-club"
                  className="group flex items-center gap-2 p-2.5 rounded-lg border border-zinc-800 bg-zinc-950/30 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-zinc-300 hover:text-violet-300"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Amino Club PEPTIDEX Coupon</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>
            
            <div className="pt-2">
              <Link
                href="/tools/reconstitution-calculator"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Reconstitution Calculator Index
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
