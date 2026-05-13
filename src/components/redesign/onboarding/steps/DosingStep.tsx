'use client';
import { useState } from 'react';
import Link from 'next/link';
import { trackOnboardingToolLaunched } from '@/lib/analytics/onboarding';
import StepCallout from '../StepCallout';

// ── Safety checklist items ────────────────────────────────────────────────────
const SAFETY_CHECKS = [
  { id: 'swab-stopper',  label: 'Swabbed both the peptide vial and BAC water stopper with 70% IPA' },
  { id: 'swab-site',     label: 'Swabbed the injection site and let it air dry completely' },
  { id: 'syringe-new',  label: 'Using a brand-new, never-recapped insulin syringe' },
  { id: 'correct-dose', label: 'Confirmed the syringe mark matches the calculator result' },
  { id: 'pinch',        label: 'Ready to pinch ~1 inch of subcutaneous fat at the chosen site' },
  { id: 'sharps',       label: 'Sharps container is within reach for immediate disposal' },
];

export default function DosingStep() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const allChecked = SAFETY_CHECKS.every((c) => checked[c.id]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="onboarding-step" role="tabpanel" aria-labelledby="step-4-title">
      <h3 className="onboarding-step__title" id="step-4-title">
        Dosing &amp; <em>Safe Injection</em>
      </h3>
      <p className="onboarding-step__subtitle">
        You&apos;ve mixed your peptide. Now you need to draw the right amount and inject it safely.
        This step covers the syringe math most beginners get wrong, the standard subcutaneous
        protocol, and the injection sites that matter.
      </p>

      <StepCallout icon="💉">
        <strong>Why this matters:</strong> Proper injection technique isn&apos;t just about comfort
        — it determines absorption rate, reduces infection risk, and ensures your research data is
        consistent across administrations.
      </StepCallout>

      {/* ── Section 1: Reading your dose ─────────────────────────────────── */}
      <section className="dosing-section" aria-labelledby="dosing-reading-title">
        <h4 className="dosing-section__title" id="dosing-reading-title">
          Reading Your Dose
        </h4>

        {/* Syringe diagram placeholder — swap src when artwork is ready */}
        <figure className="dosing-diagram" aria-label="Syringe unit markings diagram">
          <div className="dosing-diagram__placeholder" role="img" aria-label="Diagram showing syringe markings: 10 units = 0.1 mL, 25 units = 0.25 mL, 50 units = 0.5 mL, 100 units = 1.0 mL">
            <span className="dosing-diagram__icon" aria-hidden="true">💉</span>
            <span className="dosing-diagram__label">Syringe markings diagram</span>
            <span className="dosing-diagram__sub">Artwork coming — commission pending</span>
          </div>
          <figcaption className="dosing-diagram__caption">
            A U-100 insulin syringe has 100 tick marks. Each mark = 0.01 mL.
          </figcaption>
        </figure>

        <div className="dosing-warning">
          <strong>Most common mistake:</strong> Confusing &ldquo;units&rdquo; with &ldquo;mL.&rdquo;
          A U-100 insulin syringe holds 1 mL divided into 100 tick marks (units). If your protocol
          says 0.1 mL, you pull to the <strong>10 mark</strong> — not &ldquo;1 mL.&rdquo; Getting
          this wrong means a 10× dosing error.
        </div>

        <div className="unit-table" role="table" aria-label="Syringe unit to mL conversion">
          {[
            { value: '10 units', label: '= 0.1 mL' },
            { value: '20 units', label: '= 0.2 mL' },
            { value: '50 units', label: '= 0.5 mL' },
            { value: '100 units', label: '= 1.0 mL' },
          ].map((u) => (
            <div key={u.value} className="unit-cell" role="row">
              <div className="unit-cell__value" role="cell">{u.value}</div>
              <div className="unit-cell__label" role="cell">{u.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Injection sites ───────────────────────────────────── */}
      <section className="dosing-section" aria-labelledby="dosing-sites-title">
        <h4 className="dosing-section__title" id="dosing-sites-title">
          Injection Sites
        </h4>

        {/* Injection sites diagram placeholder — swap src when artwork is ready */}
        <figure className="dosing-diagram" aria-label="SubQ injection sites diagram">
          <div className="dosing-diagram__placeholder" role="img" aria-label="Body diagram highlighting three subcutaneous injection zones: abdomen (2+ inches from navel), outer upper thigh, and love handles">
            <span className="dosing-diagram__icon" aria-hidden="true">🗺️</span>
            <span className="dosing-diagram__label">Injection sites diagram</span>
            <span className="dosing-diagram__sub">Artwork coming — commission pending</span>
          </div>
          <figcaption className="dosing-diagram__caption">
            All three sites target the subcutaneous fat layer, 3–5mm beneath the skin surface.
          </figcaption>
        </figure>

        <div className="dosing-grid">
          <div className="dosing-card">
            <h4>Subcutaneous (SubQ) Protocol</h4>
            <p>
              Inject into the fatty tissue layer just beneath the skin. This is the same technique
              used by millions of insulin-dependent diabetics — virtually painless with a 31G needle.
            </p>
            <ul>
              <li><strong>Abdomen:</strong> 2+ inches from the navel — the most common site</li>
              <li><strong>Upper thigh:</strong> Outer fatty area of the quadriceps</li>
              <li><strong>Love handles:</strong> Excellent high-fat zone with consistent absorption</li>
            </ul>
          </div>
          <div className="dosing-card">
            <h4>Injection Technique</h4>
            <ul>
              <li>Swab the site with an alcohol pad — let dry fully</li>
              <li>Pinch approximately 1 inch of subcutaneous fat</li>
              <li>Insert the needle at 45–90° in one smooth, steady motion</li>
              <li>Depress the plunger slowly and evenly</li>
              <li>Withdraw the needle straight out</li>
              <li>Dispose in sharps container immediately — never re-cap or reuse</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section 3: Interactive safety checklist ──────────────────────── */}
      <section className="dosing-section" aria-labelledby="dosing-checklist-title">
        <h4 className="dosing-section__title" id="dosing-checklist-title">
          Pre-Injection Safety Checklist
        </h4>
        <p className="dosing-section__sub">
          Tick each item before every injection. For research use only — this is not medical
          guidance. Consult a licensed healthcare provider before administering any compound.
        </p>

        <div
          className="safety-checklist"
          role="group"
          aria-labelledby="dosing-checklist-title"
        >
          {SAFETY_CHECKS.map((check) => (
            <label
              key={check.id}
              className={`safety-check${checked[check.id] ? ' safety-check--done' : ''}`}
              htmlFor={`check-${check.id}`}
            >
              <input
                type="checkbox"
                id={`check-${check.id}`}
                checked={!!checked[check.id]}
                onChange={() => toggle(check.id)}
                className="safety-check__input"
              />
              <span className="safety-check__box" aria-hidden="true">
                {checked[check.id] ? '✓' : ''}
              </span>
              <span className="safety-check__text">{check.label}</span>
            </label>
          ))}
        </div>

        {/* Completion state */}
        {allChecked && (
          <div className="safety-checklist__complete" role="status" aria-live="polite">
            <span aria-hidden="true">✓</span> All checks complete — you&apos;re ready to proceed.
          </div>
        )}
      </section>

      {/* ── Research use only disclaimer ─────────────────────────────────── */}
      <div className="vendor-disclaimer" role="note" style={{ marginTop: 24 }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span>
          <strong>Research use only.</strong> The information on this page is intended for
          educational purposes about peptide research protocols. It is not medical advice and is
          not a substitute for professional medical guidance. Always consult a licensed healthcare
          provider before administering any substance.
        </span>
      </div>

      <div className="recon-cta">
        <Link
          href="/tools/cycle-planner"
          className="onboarding-nav__btn onboarding-nav__btn--primary"
          onClick={() => trackOnboardingToolLaunched({ tool: 'cycle_planner', step_number: 4 })}
        >
          Plan your full cycle →
        </Link>
        <Link
          href="/beginners-guide"
          className="onboarding-nav__btn onboarding-nav__btn--secondary"
          onClick={() => trackOnboardingToolLaunched({ tool: 'beginners_guide', step_number: 4 })}
        >
          Read the complete injection guide →
        </Link>
      </div>
    </div>
  );
}
