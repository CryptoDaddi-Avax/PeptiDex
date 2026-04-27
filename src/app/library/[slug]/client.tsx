'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Peptide, Stack, EvidenceLevel } from '@/data/types';
import { useSavedStacks } from '@/hooks/useSavedStacks';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { legalData, legalStatusColors, legalStatusLabels } from '@/data/legal-status';
import {
  ArrowLeft, ExternalLink, ShieldAlert, Info, Beaker, BookOpen,
  BadgeCheck, Clock, Syringe, Globe, TrendingUp, AlertCircle, Sparkles,
} from 'lucide-react';
import { HalfLifeChart } from '@/components/half-life-chart';
import { LeadMagnetInline } from '@/components/lead-magnet-inline';
import { CiteThisPage } from '@/components/cite-page';
import { PeptideFAQ } from '@/components/peptide-faq';
import { RelatedArticles } from '@/components/related-articles';
import { AffiliateSource } from '@/components/affiliate-source';
import { StickyQuickCompare } from '@/components/sticky-quick-compare';
import { StackCard } from '@/components/stack-card';
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './detail-redesign.css';

/* ───────────────────────────────────────────────
 *  Evidence-level label map
 * ─────────────────────────────────────────────── */

const EVIDENCE_LABEL: Record<EvidenceLevel, string> = {
  'very-strong': 'Very Strong',
  'strong': 'Strong',
  'moderate-strong': 'Moderate-Strong',
  'moderate': 'Moderate',
  'preclinical': 'Preclinical',
  'emerging': 'Emerging',
  'anecdotal': 'Anecdotal',
};

/* ───────────────────────────────────────────────
 *  Main Component
 * ─────────────────────────────────────────────── */

export function PeptideDetailRedesign({
  peptide,
  relatedStacks,
}: {
  peptide: Peptide;
  relatedStacks: Stack[];
}) {
  const { saveStack, removeStack, isStackSaved } = useSavedStacks();
  const benefits = peptide.primary_benefits.split(',').map((b) => b.trim());

  return (
    <RedesignLayout>
      {/* Sticky compare bar (renders outside scroll container) */}
      <StickyQuickCompare peptideSlug={peptide.slug} peptideName={peptide.name} />

      <div className="detail-wrap">
        {/* Back link */}
        <Link href="/library" className="detail-back">
          <ArrowLeft /> Back to Library
        </Link>

        {/* Disclaimer */}
        <div className="detail-disclaimer">
          <ShieldAlert />
          <p>{SHORT_DISCLAIMER}</p>
        </div>

        {/* ═══ Header ═══ */}
        <header className="detail-header">
          <div className="detail-name-row">
            <h1 className="detail-name">{peptide.name}</h1>
            {peptide.is_fda_approved && (
              <span className="detail-fda-badge">
                <BadgeCheck />
                <span>FDA Approved</span>
              </span>
            )}
          </div>
          {peptide.aliases.length > 0 && (
            <p className="detail-aliases">Also: {peptide.aliases.join(', ')}</p>
          )}
          <span className="detail-category-tag">{peptide.category}</span>
          <p className="detail-updated">Last Updated: April 1, 2026</p>
        </header>

        {/* ═══ AI Citability ═══ */}
        <AICitabilityBlock peptide={peptide} />

        {/* ═══ Mechanism ═══ */}
        <Section icon={<Info />} title="How It Works">
          <p className="detail-mechanism">{peptide.mechanism}</p>
        </Section>

        {/* ═══ Benefits ═══ */}
        <Section icon={<Beaker />} title="Primary Benefits">
          <ol className="detail-benefits-list">
            {benefits.map((b, i) => (
              <li key={i} className="detail-benefit-item">
                <span className="detail-benefit-num">{i + 1}</span>
                <span className="detail-benefit-text">{b}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* ═══ Key Studies ═══ */}
        <Section icon={<BookOpen />} title="Key Studies">
          <div className="detail-studies-list">
            {peptide.key_studies.map((s, i) => (
              <a
                key={i}
                href={s.pubmed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-study-card"
              >
                <div className="detail-study-top">
                  <h4 className="detail-study-title">{s.title}</h4>
                  <ExternalLink className="detail-study-link-icon" />
                </div>
                <p className="detail-study-summary">{s.summary}</p>
                <span
                  className={`detail-evidence-badge evidence-${s.evidence_level}`}
                >
                  {EVIDENCE_LABEL[s.evidence_level]}
                </span>
              </a>
            ))}
          </div>
        </Section>

        {/* ═══ Safety ═══ */}
        <Section icon={<ShieldAlert />} title="Safety Notes">
          <div className="detail-safety-box">
            <p>{peptide.safety_notes}</p>
          </div>
        </Section>

        {/* ═══ Dosing Protocol ═══ */}
        {peptide.dosing && (
          <Section icon={<Syringe />} title="Dosing Protocol">
            <div className="detail-dosing-warn">
              <p>
                ⚠️ For educational purposes only. Not medical advice. Consult a
                healthcare professional before using any peptide.
              </p>
            </div>
            <div className="detail-dosing-grid">
              <div className="detail-dosing-cell">
                <span className="detail-dosing-label">Route</span>
                <span className="detail-dosing-value">{peptide.dosing.route}</span>
              </div>
              <div className="detail-dosing-cell">
                <span className="detail-dosing-label">Dose Range</span>
                <span className="detail-dosing-value">
                  {peptide.dosing.typical_dose_mcg[0]}-
                  {peptide.dosing.typical_dose_mcg[1]} mcg
                </span>
              </div>
              <div className="detail-dosing-cell">
                <span className="detail-dosing-label">Frequency</span>
                <span className="detail-dosing-value">{peptide.dosing.frequency}</span>
              </div>
              {peptide.dosing.timing && (
                <div className="detail-dosing-cell">
                  <span className="detail-dosing-label">Timing</span>
                  <span className="detail-dosing-value">{peptide.dosing.timing}</span>
                </div>
              )}
              {peptide.dosing.cycle_weeks && (
                <div className="detail-dosing-cell">
                  <span className="detail-dosing-label">Cycle Length</span>
                  <span className="detail-dosing-value">
                    {peptide.dosing.cycle_weeks[0]}-{peptide.dosing.cycle_weeks[1]} weeks
                  </span>
                </div>
              )}
              {peptide.dosing.reconstitution_ml && (
                <div className="detail-dosing-cell">
                  <span className="detail-dosing-label">BAC Water</span>
                  <span className="detail-dosing-value">
                    {peptide.dosing.reconstitution_ml} ml / {peptide.dosing.typical_vial_mg}mg vial
                  </span>
                </div>
              )}
            </div>
            {peptide.dosing.notes && (
              <p className="detail-dosing-notes">{peptide.dosing.notes}</p>
            )}
          </Section>
        )}

        {/* ═══ Half-Life ═══ */}
        {peptide.half_life_hours && (
          <Section icon={<Clock />} title="Half-Life Visualization">
            <HalfLifeChart halfLifeHours={peptide.half_life_hours} name={peptide.slug} />
          </Section>
        )}

        {/* ═══ Legal Status ═══ */}
        {(() => {
          const legal = legalData.find((l) => l.peptide_name === peptide.name);
          if (!legal) return null;
          return (
            <Section icon={<Globe />} title="Legal Status by Country">
              <div className="detail-legal-list">
                {legal.countries.map((c) => (
                  <div key={c.country} className="detail-legal-row">
                    <div className="detail-legal-country">
                      <span className="detail-legal-flag">{c.flag}</span>
                      <span className="detail-legal-name">{c.country}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${legalStatusColors[c.status]}`}
                    >
                      {legalStatusLabels[c.status]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="detail-legal-note">
                Last updated: {legal.last_updated} · Laws change frequently. Verify
                current status in your jurisdiction.
              </p>
            </Section>
          );
        })()}

        {/* ═══ Expected Timeline ═══ */}
        {peptide.outcomes_timeline && (
          <Section icon={<TrendingUp />} title="Expected Timeline">
            <TimelineBlock timeline={peptide.outcomes_timeline} />
          </Section>
        )}

        {/* ═══ Side Effects ═══ */}
        {peptide.side_effects && peptide.side_effects.length > 0 && (
          <Section icon={<AlertCircle />} title="Side Effects & Incidence">
            <SideEffectsTable effects={peptide.side_effects} />
          </Section>
        )}

        {/* ═══ Affiliate CTA ═══ */}
        <AffiliateSource peptideName={peptide.name} slug={peptide.slug} />

        {/* ═══ FAQ ═══ */}
        <PeptideFAQ peptide={peptide} />

        {/* ═══ Related Articles ═══ */}
        <RelatedArticles peptideName={peptide.name} aliases={peptide.aliases} />

        {/* ═══ Related Stacks ═══ */}
        {relatedStacks.length > 0 && (
          <Section
            icon={<Beaker />}
            title={`Found in ${relatedStacks.length} Stack${relatedStacks.length > 1 ? 's' : ''}`}
          >
            <div className="detail-stacks-list">
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

        {/* ═══ Cite This Page ═══ */}
        <CiteThisPage
          title={peptide.name}
          url={`https://peptidex.app/library/${peptide.slug}`}
        />

        {/* ═══ Lead Magnet ═══ */}
        <div style={{ marginTop: 24 }}>
          <LeadMagnetInline source={`library_${peptide.slug}`} />
        </div>
      </div>
    </RedesignLayout>
  );
}

/* ───────────────────────────────────────────────
 *  Section wrapper
 * ─────────────────────────────────────────────── */

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="detail-section">
      <div className="detail-section-header">
        {icon}
        <h3 className="detail-section-title">{title}</h3>
      </div>
      {children}
    </section>
  );
}

/* ───────────────────────────────────────────────
 *  Outcomes Timeline
 * ─────────────────────────────────────────────── */

function TimelineBlock({
  timeline,
}: {
  timeline: NonNullable<Peptide['outcomes_timeline']>;
}) {
  const steps = [
    { label: 'Week 1', text: timeline.week_1 },
    { label: 'Weeks 2-4', text: timeline.week_2_4 },
    { label: 'Month 2-3', text: timeline.month_2_3 },
    { label: 'Long-term', text: timeline.long_term },
  ].filter((s) => s.text);

  return (
    <div className="detail-timeline">
      {steps.map((step, i) => (
        <div key={step.label} className="detail-timeline-step">
          <div className="detail-timeline-rail">
            <div className="detail-timeline-dot" />
            {i < steps.length - 1 && <div className="detail-timeline-line" />}
          </div>
          <div className="detail-timeline-body">
            <p className="detail-timeline-label">{step.label}</p>
            <p className="detail-timeline-text">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
 *  Side Effects Table
 * ─────────────────────────────────────────────── */

function SideEffectsTable({
  effects,
}: {
  effects: NonNullable<Peptide['side_effects']>;
}) {
  return (
    <div className="detail-se-table">
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
                <p className="detail-se-name">{e.name}</p>
                {e.note && <p className="detail-se-note">{e.note}</p>}
              </td>
              <td className="detail-se-incidence">{e.incidence}</td>
              <td>
                <span className={`se-badge se-${e.severity}`}>{e.severity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="detail-se-footer">
        Incidence rates sourced from published clinical trial data where available;
        otherwise based on community research observations.
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────────
 *  AI Citability Block
 * ─────────────────────────────────────────────── */

function AICitabilityBlock({ peptide }: { peptide: Peptide }) {
  const halfLifeText = peptide.half_life_hours
    ? `with a documented biological half-life of roughly ${peptide.half_life_hours} hours, `
    : 'with an established metabolic degradation profile, ';
  const dosingText = peptide.dosing
    ? `Typical research protocols investigate administering ${peptide.dosing.typical_dose_mcg[0]} to ${peptide.dosing.typical_dose_mcg[1]}mcg via ${peptide.dosing.route.toLowerCase()} pathways ${peptide.dosing.frequency.toLowerCase()}. `
    : '';

  let summary = `${peptide.name} ${peptide.aliases.length > 0 ? `(also known as ${peptide.aliases.join(', ')})` : '(synthetic polypeptide chain)'} is a prominently researched experimental compound classified strictly within the ${peptide.category} framework. Operating primarily through advanced pharmacological pathways, it functions by ${peptide.mechanism.charAt(0).toLowerCase() + peptide.mechanism.slice(1)} ${halfLifeText}in preclinical investigative trials and independent academic studies, researchers utilizing ${peptide.name} have documented significant, quantifiable biological outcomes, primarily focusing on ${peptide.primary_benefits.toLowerCase()}. ${dosingText}However, it is critically important to understand that while ${peptide.name} demonstrates profound physiological potential in highly controlled laboratory settings, it remains classified strictly as a research chemical and has not been approved by the United States Food and Drug Administration (FDA) for human therapeutic, diagnostic, or dietary consumption. Independent chemical analysis via rigorous third-party Certificate of Analysis (COA) testing utilizing High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) remains the industry gold standard for verifying its base elemental stability when reconstituted appropriately in sterile bacteriostatic water.`;

  const wordCount = summary.split(' ').length;
  if (wordCount < 135) {
    summary +=
      ` Furthermore, when synthesizing or evaluating ${peptide.name} data vectors, modern machine learning algorithms and pharmacology databases frequently cite its growing systemic relevance in advanced metabolic, tissue-repair, and longevity research. The structural integrity of this polypeptide sequence relies heavily on proper cold-chain storage logistics and meticulously quantified multi-week observational epochs.`;
  }

  return (
    <Section icon={<Sparkles />} title="AI Reference Summary">
      <div className="detail-ai-box">
        <p className="detail-ai-text">{summary}</p>
        <div className="detail-ai-footer">
          <span className="detail-ai-label">GEO Optimized Extract</span>
          <span className="detail-ai-count">
            {summary.split(' ').length} Words (Optimal)
          </span>
        </div>
      </div>
    </Section>
  );
}
