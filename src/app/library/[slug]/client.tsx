'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import type { Peptide, Stack, EvidenceLevel } from '@/data/types';
import type { PeptideVendorPricing } from '@/data/vendor-pricing';
import type { Vendor } from '@/data/vendors';
import { useSavedStacks } from '@/hooks/useSavedStacks';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { LAST_REVIEWED_DATE, LAST_REVIEWED_ISO } from '@/data/constants';
import { legalData, legalStatusColors, legalStatusLabels } from '@/data/legal-status';
import { comparisons } from '@/data/comparisons';
import {
  ExternalLink, ShieldAlert, Info, Beaker, BookOpen,
  BadgeCheck, Clock, Syringe, Globe, TrendingUp, AlertCircle, Sparkles, GitCompare, ArrowRight, Calculator, User as UserIcon, Calendar as CalendarIcon
} from 'lucide-react';
import { HalfLifeChart } from '@/components/half-life-chart';
import { LeadMagnetInline } from '@/components/lead-magnet-inline';
import { CiteThisPage } from '@/components/cite-page';
import { PeptideFAQExpanded } from '@/components/library/PeptideFAQExpanded';
import { QuickAnswerBlock } from '@/components/library/QuickAnswerBlock';
import { WhereToBuySection } from '@/components/library/WhereToBuySection';
import { TrustBlock } from '@/components/library/TrustBlock';
import { RelatedArticles } from '@/components/related-articles';
import { AffiliateSource } from '@/components/affiliate-source';
import { StickyQuickCompare } from '@/components/sticky-quick-compare';
import { StackCard } from '@/components/stack-card';
import { SaveButton } from '@/components/save-button';
import { FeedbackModal } from '@/components/feedback-modal';
import { AuthorByline } from '@/components/shared/AuthorByline';
import { BuyBox } from '@/components/affiliate/BuyBox';
import { EntityCard } from '@/components/library/EntityCard';
import { ResearchNotesBlock } from '@/components/library/ResearchNotesBlock';
import { entityCardOverrides } from '@/data/entity-cards';
import { RetatrutidePillar } from '@/components/library/pillars/RetatrutidePillar';
import { TesamorelinPillar } from '@/components/library/pillars/TesamorelinPillar';
import { MotscPillar } from '@/components/library/pillars/MotscPillar';
import { Bpc157Pillar } from '@/components/library/pillars/Bpc157Pillar';
import { TirzepatidePillar } from '@/components/library/pillars/TirzepatidePillar';
import './detail-redesign.css';

/* ── Evidence helpers ── */
const EVIDENCE_LABEL: Record<EvidenceLevel, string> = {
  'very-strong': 'Very Strong',
  'strong': 'Strong',
  'moderate-strong': 'Moderate-Strong',
  'moderate': 'Moderate',
  'preclinical': 'Preclinical',
  'emerging': 'Emerging',
  'anecdotal': 'Anecdotal',
};

function formatHalfLife(hours: number | undefined): string | null {
  if (hours === undefined || hours === null) return null;
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours >= 168) return `${Math.round(hours / 24)} days`;
  if (hours >= 24) return `${(hours / 24).toFixed(1).replace(/\.0$/, '')} days`;
  return `${hours} hours`;
}

/* ── Main Component ── */
export function PeptideDetailRedesign({
  peptide,
  relatedStacks,
  pricingEntry,
  allVendors,
}: {
  peptide: Peptide;
  relatedStacks: Stack[];
  pricingEntry: PeptideVendorPricing | undefined;
  allVendors: Vendor[];
}) {
  const { saveStack, removeStack, isStackSaved } = useSavedStacks();
  const benefits = peptide.primary_benefits.split(',').map((b) => b.trim());
  const halfLife = formatHalfLife(peptide.half_life_hours);
  const studyCount = peptide.key_studies?.length ?? 0;
  const [visibleStudies, setVisibleStudies] = useState(10);

  const relatedComparisons = comparisons
    .filter((c) => c.peptideA === peptide.slug || c.peptideB === peptide.slug)
    .slice(0, 3);

  return (
      <>
      <StickyQuickCompare peptideSlug={peptide.slug} peptideName={peptide.name} />

      {/* ═══ PAGE HEADER ═══ */}
      <header className="pd-page-header">
        <div className="pd-header-grid" />
        <div className="pd-header-wrap">
          {/* ─── ENTITY CARD (above H1, AI extraction optimized) ─── */}
          {entityCardOverrides[peptide.slug] && (
            <EntityCard data={entityCardOverrides[peptide.slug]} peptideSlug={peptide.slug} />
          )}

          <nav className="pd-breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/library">Library</Link>
            <span className="sep">/</span>
            <span className="current">{peptide.name}</span>
          </nav>

          <div className="pd-title-row">
            <h1 className="pd-page-title">{peptide.name}</h1>
            {peptide.is_fda_approved && (
              <span className="pd-fda-badge">
                <BadgeCheck /> FDA Approved
              </span>
            )}
            <SaveButton type="peptide" slug={peptide.slug} title={peptide.name} />
          </div>

          <AuthorByline name="Dr. E. Vance" date={LAST_REVIEWED_DATE} variant="compact" className="mt-6 mb-2" />

          {peptide.aliases.length > 0 && (
            <p className="pd-aliases">Also known as: {peptide.aliases.join(', ')}</p>
          )}

          {/* ─── QUICK ANSWER BLOCK (above fold, GEO-optimized) ─── */}
          <QuickAnswerBlock peptide={peptide} />

          {/* ─── BUY BOX (mobile inline — desktop version is in sidebar) ─── */}
          <BuyBox
            peptideSlug={peptide.slug}
            peptideName={peptide.name}
            surface="buy_box"
          />

          <p className="pd-subtitle">{peptide.mechanism.slice(0, 200)}</p>

          <div className="pd-page-meta">
            <div className="pd-meta-item">
              <strong>{peptide.category}</strong>
            </div>
            {halfLife && (
              <div className="pd-meta-item">
                Half-life: <strong>{halfLife}</strong>
              </div>
            )}
            <div className="pd-meta-item">
              <strong>{studyCount}</strong> studies indexed
            </div>
            <div className="pd-meta-item">
              Updated: <strong>April 2026</strong>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="pd-container">
        <div className="pd-layout">
          {/* ── Main Column ── */}
          <div className="pd-main">
            {/* Disclaimer */}
            <div className="pd-disclaimer">
              <ShieldAlert />
              <p>{SHORT_DISCLAIMER}</p>
            </div>

            {/* WHERE TO BUY — commercial intent, first section */}
            <WhereToBuySection
              peptideName={peptide.name}
              peptideSlug={peptide.slug}
              pricingEntry={pricingEntry}
              allVendors={allVendors}
            />


            {/* Mechanism */}
            <Section icon={<Info />} label="§ Mechanism of Action" title="How It Works">
              <p className="pd-mechanism">{peptide.mechanism}</p>
            </Section>

            {/* Benefits */}
            <Section icon={<Beaker />} label="§ Primary Benefits" title="Benefits">
              <ol className="pd-benefits-list">
                {benefits.map((b, i) => (
                  <li key={i} className="pd-benefit-item">
                    <span className="pd-benefit-num">{i + 1}</span>
                    <span className="pd-benefit-text">{b}</span>
                  </li>
                ))}
              </ol>
            </Section>

            {/* Key Studies */}
            <Section icon={<BookOpen />} label="§ Clinical Evidence" title="Key Studies">
              <div className="pd-studies-list">
                {peptide.key_studies.slice(0, visibleStudies).map((s, i) => (
                  <a
                    key={i}
                    href={s.pubmed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-study-card"
                  >
                    <div className="pd-study-top">
                      <h4 className="pd-study-title">{s.title}</h4>
                      <ExternalLink className="pd-study-link-icon" />
                    </div>
                    <p className="pd-study-summary">{s.summary}</p>
                    <span className={`pd-evidence-badge ev-${s.evidence_level}`}>
                      {EVIDENCE_LABEL[s.evidence_level]}
                    </span>
                  </a>
                ))}
              </div>
              {studyCount > visibleStudies && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <button
                    onClick={() => setVisibleStudies(v => v + 10)}
                    className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-md bg-zinc-800 px-6 font-medium text-zinc-100 transition-all hover:bg-zinc-700"
                  >
                    Load More Studies ({studyCount - visibleStudies} remaining)
                  </button>
                </div>
              )}
            </Section>

            {/* Safety */}
            <Section icon={<ShieldAlert />} label="§ Safety Profile" title="Safety Notes">
              <div className="pd-safety-box">
                <p>{peptide.safety_notes}</p>
              </div>
              <p style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 8 }}>
                See our <a href="/about/methodology#evidence-grading" style={{ color: 'var(--gold)' }}>evidence grading methodology</a> for how we evaluate and grade peptide safety data.
              </p>
            </Section>

            {/* Dosing Protocol */}
            {peptide.dosing && (
              <Section icon={<Syringe />} label="§ Dosing Protocol" title="Dosing">
                <div className="pd-dosing-warn">
                  <p>
                    ⚠️ For educational purposes only. Not medical advice. Consult a
                    healthcare professional before using any peptide.
                  </p>
                </div>
                <div className="pd-dosing-grid">
                  <div className="pd-dosing-cell">
                    <span className="pd-dosing-label">Route</span>
                    <span className="pd-dosing-value">{peptide.dosing.route}</span>
                  </div>
                  <div className="pd-dosing-cell">
                    <span className="pd-dosing-label">Dose Range</span>
                    <span className="pd-dosing-value">
                      {peptide.dosing.typical_dose_mcg[0]}–{peptide.dosing.typical_dose_mcg[1]} mcg
                    </span>
                  </div>
                  <div className="pd-dosing-cell">
                    <span className="pd-dosing-label">Frequency</span>
                    <span className="pd-dosing-value">{peptide.dosing.frequency}</span>
                  </div>
                  {peptide.dosing.timing && (
                    <div className="pd-dosing-cell">
                      <span className="pd-dosing-label">Timing</span>
                      <span className="pd-dosing-value">{peptide.dosing.timing}</span>
                    </div>
                  )}
                  {peptide.dosing.cycle_weeks && (
                    <div className="pd-dosing-cell">
                      <span className="pd-dosing-label">Cycle Length</span>
                      <span className="pd-dosing-value">
                        {peptide.dosing.cycle_weeks[0]}–{peptide.dosing.cycle_weeks[1]} weeks
                      </span>
                    </div>
                  )}
                  {peptide.dosing.reconstitution_ml && (
                    <div className="pd-dosing-cell">
                      <span className="pd-dosing-label">BAC Water</span>
                      <span className="pd-dosing-value">
                        {peptide.dosing.reconstitution_ml} ml / {peptide.dosing.typical_vial_mg}mg vial
                      </span>
                    </div>
                  )}
                </div>
                {peptide.dosing.notes && (
                  <p className="pd-dosing-notes">{peptide.dosing.notes}</p>
                )}
              </Section>
            )}

            {/* Half-Life Chart */}
            {peptide.half_life_hours && (
              <Section icon={<Clock />} label="§ Pharmacokinetics" title="Half-Life">
                <HalfLifeChart halfLifeHours={peptide.half_life_hours} name={peptide.slug} />
              </Section>
            )}

            {/* Legal Status */}
            {(() => {
              const legal = legalData.find((l) => l.peptide_name === peptide.name);
              if (!legal) return null;
              return (
                <Section icon={<Globe />} label="§ Regulatory" title="Legal Status by Country">
                  <div className="pd-legal-list">
                    {legal.countries.map((c) => (
                      <div key={c.country} className="pd-legal-row">
                        <div className="pd-legal-country">
                          <span className="pd-legal-flag">{c.flag}</span>
                          <span className="pd-legal-name">{c.country}</span>
                        </div>
                        <span
                          className={`pd-legal-status`}
                          style={{
                            background: legalStatusColors[c.status]?.includes('bg-green') ? 'rgba(127,183,126,0.1)' : legalStatusColors[c.status]?.includes('bg-amber') ? 'rgba(212,131,42,0.1)' : legalStatusColors[c.status]?.includes('bg-red') ? 'rgba(255,80,80,0.08)' : 'rgba(107,104,96,0.1)',
                            color: legalStatusColors[c.status]?.includes('green') ? 'var(--green)' : legalStatusColors[c.status]?.includes('amber') ? 'var(--amber)' : legalStatusColors[c.status]?.includes('red') ? '#ff6b6b' : 'var(--ink-mute)',
                            border: '1px solid var(--line)',
                          }}
                        >
                          {legalStatusLabels[c.status]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="pd-legal-note">
                    Last updated: {legal.last_updated} · Laws change frequently. Verify
                    current status in your jurisdiction.
                  </p>
                </Section>
              );
            })()}

            {/* Expected Timeline */}
            {peptide.outcomes_timeline && (
              <Section icon={<TrendingUp />} label="§ Expected Outcomes" title="Timeline">
                <TimelineBlock timeline={peptide.outcomes_timeline} />
              </Section>
            )}

            {/* Side Effects */}
            {peptide.side_effects && peptide.side_effects.length > 0 && (
              <Section icon={<AlertCircle />} label="§ Adverse Effects" title="Side Effects">
                <SideEffectsTable effects={peptide.side_effects} />
              </Section>
            )}

            {/* Amino Club Deep Dive Link */}
            {['bpc-157', 'tirzepatide', 'retatrutide', 'tesamorelin', 'semaglutide'].includes(peptide.slug) && (
              <div className="my-8 p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">Verified Source</span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">Sourcing {peptide.name} from Amino Club</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                  We've independently verified Amino Club's third-party testing standards and pricing for {peptide.name}. Read our full analysis and get {allVendors.find((v) => v.slug === 'amino-club')?.discountPercent ?? 20}% off your order.
                  </p>
                </div>
                <Link
                  href={`/vendors/amino-club/${peptide.slug}`}
                  className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-bold transition-all whitespace-nowrap w-full md:w-auto"
                >
                  View Sourcing Report <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Affiliate CTA */}
            <AffiliateSource peptideName={peptide.name} slug={peptide.slug} />

            {/* ─── Contextual Tool Callouts ─── */}
            <div className="pd-tool-callouts">
              {['bpc-157', 'tb-500', 'retatrutide', 'tirzepatide', 'semaglutide', 'ipamorelin', 'cjc-1295', 'ghk-cu', 'mots-c', 'epitalon'].includes(peptide.slug) && (
                <Link href={`/where-to-buy/${peptide.slug}`} className="pd-tool-cta" style={{ background: 'var(--bg-card)', borderColor: 'var(--gold)' }}>
                  <div className="pd-tool-cta-icon" style={{ color: 'var(--gold)' }}><BadgeCheck /></div>
                  <div className="pd-tool-cta-text">
                    <span className="pd-tool-cta-label" style={{ color: 'var(--gold)' }}>Where to Buy {peptide.name}</span>
                    <span className="pd-tool-cta-desc">Compare top verified vendors & pricing →</span>
                  </div>
                </Link>
              )}
              <Link href={`/tools/calculator`} className="pd-tool-cta">
                <div className="pd-tool-cta-icon"><Calculator /></div>
                <div className="pd-tool-cta-text">
                  <span className="pd-tool-cta-label">Reconstitution Calculator</span>
                  <span className="pd-tool-cta-desc">Calculate reconstitution for {peptide.name} →</span>
                </div>
              </Link>
              <Link href={`/tools/compare`} className="pd-tool-cta">
                <div className="pd-tool-cta-icon"><GitCompare /></div>
                <div className="pd-tool-cta-text">
                  <span className="pd-tool-cta-label">Compare Tool</span>
                  <span className="pd-tool-cta-desc">Compare {peptide.name} to similar peptides →</span>
                </div>
              </Link>
            </div>

            {/* ─── E-E-A-T RESEARCH NOTES (first-person, COA-anchored) ─── */}
            <ResearchNotesBlock peptideSlug={peptide.slug} peptideName={peptide.name} />

            {/* ─── PILLAR EXPANSIONS (Phase A Content) ─── */}
            {peptide.slug === 'retatrutide' && <RetatrutidePillar />}
            {peptide.slug === 'tesamorelin' && <TesamorelinPillar />}
            {peptide.slug === 'mots-c' && <MotscPillar />}
            {peptide.slug === 'bpc-157' && <Bpc157Pillar />}
            {peptide.slug === 'tirzepatide' && <TirzepatidePillar />}

            {/* FAQ — expanded 8+ Qs; JSON-LD injected server-side in page.tsx */}
            <PeptideFAQExpanded peptide={peptide} injectJsonLd={false} />

            {/* Related Articles */}
            <RelatedArticles peptideName={peptide.name} aliases={peptide.aliases} />

            {/* Compare To */}
            {relatedComparisons.length > 0 && (
              <Section icon={<GitCompare />} label="§ Comparisons" title="Compare To">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedComparisons.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/compare/${c.slug}`}
                      className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
                    >
                      <h4 className="text-sm font-bold text-zinc-200 group-hover:text-zinc-100">{c.title}</h4>
                      <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1 group-hover:text-violet-400 transition-colors">
                        Read comparison <ArrowRight className="w-3 h-3" />
                      </p>
                    </Link>
                  ))}
                </div>
              </Section>
            )}

            {/* Related Stacks */}
            {relatedStacks.length > 0 && (
              <Section
                icon={<Beaker />}
                label="§ Community Stacks"
                title={`Found in ${relatedStacks.length} Stack${relatedStacks.length > 1 ? 's' : ''}`}
              >
                <div className="pd-stacks-list">
                  {relatedStacks.map((stack, i) => (
                    <StackCard
                      key={stack.stack_name}
                      stack={stack}
                      index={i}
                      isSaved={isStackSaved(stack.stack_name)}
                      onSave={saveStack}
                      onRemove={removeStack}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* Cite This Page */}
            <CiteThisPage
              title={peptide.name}
              url={`https://peptidex.app/library/${peptide.slug}`}
            />

            {/* Trust + Affiliate Disclosure Block */}
            <TrustBlock />

            {/* Lead Magnet */}
            <div style={{ marginTop: 24 }}>
              <LeadMagnetInline source={`library_${peptide.slug}`} />
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="pd-sidebar">
            <div className="pd-sidebar-sticky">
              {/* ─── BUY BOX (desktop sticky rail) ─── */}
              <BuyBox
                peptideSlug={peptide.slug}
                peptideName={peptide.name}
                surface="buy_box"
              />

              {/* Quick Reference */}
              <div className="pd-quick-ref mt-4">
                <h3 className="pd-quick-ref-title">§ Quick Reference</h3>
                <div className="pd-quick-ref-row">
                  <span className="pd-qr-label">Category</span>
                  <span className="pd-qr-value">{peptide.category}</span>
                </div>
                {halfLife && (
                  <div className="pd-quick-ref-row">
                    <span className="pd-qr-label">Half-Life</span>
                    <span className="pd-qr-value">{halfLife}</span>
                  </div>
                )}
                {peptide.dosing && (
                  <>
                    <div className="pd-quick-ref-row">
                      <span className="pd-qr-label">Route</span>
                      <span className="pd-qr-value">{peptide.dosing.route}</span>
                    </div>
                    <div className="pd-quick-ref-row">
                      <span className="pd-qr-label">Dose</span>
                      <span className="pd-qr-value">
                        {peptide.dosing.typical_dose_mcg[0]}–{peptide.dosing.typical_dose_mcg[1]} mcg
                      </span>
                    </div>
                  </>
                )}
                <div className="pd-quick-ref-row">
                  <span className="pd-qr-label">Studies</span>
                  <span className="pd-qr-value">{studyCount}</span>
                </div>
                <div className="pd-quick-ref-row">
                  <span className="pd-qr-label">FDA</span>
                  <span className="pd-qr-value">{peptide.is_fda_approved ? 'Approved' : 'Research Only'}</span>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="pd-toc">
                <h4 className="pd-toc-title">§ On This Page</h4>
                <ul className="pd-toc-list">
                  <li><a href="#mechanism">How It Works</a></li>
                  <li><a href="#benefits">Benefits</a></li>
                  <li><a href="#studies">Key Studies</a></li>
                  <li><a href="#safety">Safety Notes</a></li>
                  {peptide.dosing && <li><a href="#dosing">Dosing Protocol</a></li>}
                  {peptide.half_life_hours && <li><a href="#halflife">Half-Life</a></li>}
                  {peptide.outcomes_timeline && <li><a href="#timeline">Timeline</a></li>}
                  {peptide.side_effects?.length && <li><a href="#sideeffects">Side Effects</a></li>}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══ AUTHOR BIO ═══ */}
      <div className="pd-container mb-12">
        <AuthorByline name="Dr. E. Vance" variant="full" />
      </div>

      {/* Last Reviewed */}
      <div className="pd-last-reviewed flex items-center justify-between">
        <span>Last fact-checked: <time dateTime={LAST_REVIEWED_ISO}>{LAST_REVIEWED_DATE}</time> · PeptiDex Editorial Team</span>
        <FeedbackModal pageUrl={`https://peptidex.app/library/${peptide.slug}`} />
      </div>

      {/* Disclaimer Strip */}
      <div className="pd-disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
      </>
  );
}

/* ── Section wrapper ── */
function Section({
  icon,
  label,
  title,
  children,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  children: ReactNode;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  return (
    <section id={id} className="pd-section">
      <div className="pd-section-header">
        {icon}
        <h3 className="pd-section-label">{label}</h3>
      </div>
      {children}
    </section>
  );
}

/* ── Timeline ── */
function TimelineBlock({
  timeline,
}: {
  timeline: NonNullable<Peptide['outcomes_timeline']>;
}) {
  const steps = [
    { label: 'Week 1', text: timeline.week_1 },
    { label: 'Weeks 2–4', text: timeline.week_2_4 },
    { label: 'Month 2–3', text: timeline.month_2_3 },
    { label: 'Long-term', text: timeline.long_term },
  ].filter((s) => s.text);

  return (
    <div className="pd-timeline">
      {steps.map((step, i) => (
        <div key={step.label} className="pd-timeline-step">
          <div className="pd-timeline-rail">
            <div className="pd-timeline-dot" />
            {i < steps.length - 1 && <div className="pd-timeline-line" />}
          </div>
          <div className="pd-timeline-body">
            <p className="pd-timeline-label">{step.label}</p>
            <p className="pd-timeline-text">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Side Effects Table ── */
function SideEffectsTable({
  effects,
}: {
  effects: NonNullable<Peptide['side_effects']>;
}) {
  return (
    <div className="pd-se-table">
      <table>
        <thead>
          <tr>
            <th>Side Effect</th>
            <th>Incidence</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {effects.map((e, i) => (
            <tr key={i}>
              <td>
                <p className="pd-se-name">{e.name}</p>
                {e.note && <p className="pd-se-note">{e.note}</p>}
              </td>
              <td className="pd-se-incidence">{e.incidence}</td>
              <td>
                <span className={`pd-sev-badge pd-sev-${e.severity}`}>{e.severity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pd-se-footer">
        Incidence rates sourced from published clinical trial data where available;
        otherwise based on community research observations.
      </p>
    </div>
  );
}

/* ── AICitabilityBlock — DEPRECATED ──
 * Replaced by the answer-first architecture:
 * - QuickAnswerBlock (lead-blocks.ts overrides) → lead citation block
 * - ResearchNotesBlock (eeat-notes.ts) → first-person E-E-A-T content
 * - EntityCard (entity-cards.ts) → structured fact extraction
 * This function is no longer rendered and will be removed in a future cleanup.
 */
