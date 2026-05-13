'use client';
import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { RECON_STEPS } from '../onboarding-data';
import { trackOnboardingToolLaunched } from '@/lib/analytics/onboarding';
import StepCallout from '../StepCallout';
import {
  calculateReconstitution,
  validateReconstitutionInputs,
  formatConcentration,
  getSyringeProfile,
  RECONSTITUTION_ERROR_MESSAGES,
  type ReconstitutionError,
} from '@/lib/calc/reconstitution';

// ── Glossary terms (inline popovers) ──────────────────────────────────
const GLOSSARY: Record<string, string> = {
  'Bacteriostatic Water':
    'Sterile water preserved with 0.9% benzyl alcohol. It inhibits bacterial growth, making it safe for multi-dose vials over 28 days.',
  'mcg vs mg':
    '1 mg (milligram) = 1,000 mcg (micrograms). Peptide doses are measured in mcg because even tiny amounts produce measurable biological activity.',
  IU: 'International Unit — a standardized unit of biological activity. On a U-100 insulin syringe, 100 IU = 1 mL.',
  'Lyophilized':
    'Freeze-dried. Peptides ship as a delicate powder (lyophilized cake) that must be reconstituted before use.',
};

// ── Defaults ──────────────────────────────────────────────────────────
const DEFAULT_VIAL = '5';
const DEFAULT_WATER = '2';
const DEFAULT_DOSE = '250';

export default function ReconstitutionStep() {
  // ── Phase B state ─────────────────────────────────────────────────
  const [vialMg, setVialMg] = useState(DEFAULT_VIAL);
  const [bacWaterMl, setBacWaterMl] = useState(DEFAULT_WATER);
  const [doseMcg, setDoseMcg] = useState(DEFAULT_DOSE);
  const [showMath, setShowMath] = useState(false);
  const [openGlossary, setOpenGlossary] = useState<string | null>(null);

  const syringe = getSyringeProfile('1mL_100u');

  const result = useMemo(() => {
    const v = parseFloat(vialMg);
    const w = parseFloat(bacWaterMl);
    const d = parseFloat(doseMcg);
    if (isNaN(v) || isNaN(w)) return null;

    const err = validateReconstitutionInputs(v, w, isNaN(d) ? 0 : d);
    if (err) return { error: RECONSTITUTION_ERROR_MESSAGES[err as ReconstitutionError] };

    const calc = calculateReconstitution({
      vialMg: v,
      bacWaterMl: w,
      targetDoseMcg: isNaN(d) || d <= 0 ? 0 : d,
      syringe,
    });
    return { calc };
  }, [vialMg, bacWaterMl, doseMcg, syringe]);

  const calc = result && 'calc' in result ? result.calc : null;
  const calcError = result && 'error' in result ? result.error : null;

  // ── Glossary popover toggle ─────────────────────────────────────────
  const toggleGlossary = useCallback((term: string) => {
    setOpenGlossary(prev => (prev === term ? null : term));
  }, []);

  return (
    <div className="onboarding-step" role="tabpanel" aria-labelledby="step-3-title">

      {/* ═══ PHASE A — Understand ═══ */}
      <h3 className="onboarding-step__title" id="step-3-title">
        How to <em>Reconstitute</em>
      </h3>
      <p className="onboarding-step__subtitle">
        Reconstitution is the process of dissolving freeze-dried (lyophilized) peptide powder into
        an injectable solution using bacteriostatic water. Get this right and your peptide stays
        stable for weeks. Get it wrong and you destroy the compound before you ever use it.
      </p>

      <StepCallout icon="🎯">
        <strong>Why this matters:</strong> A wrong concentration means a wrong dose — every time
        you draw. The calculator removes guesswork and ensures every injection is mathematically
        precise.
      </StepCallout>

      {/* 3-panel visual walkthrough */}
      <div className="recon-visual-panels">
        {[
          { num: '1', icon: '💉', title: 'Draw BAC water', desc: 'Pull the exact volume of bacteriostatic water into a mixing syringe.' },
          { num: '2', icon: '🧪', title: 'Inject into peptide vial', desc: 'Angle the needle so water trickles down the glass wall — never blast the powder directly.' },
          { num: '3', icon: '🔄', title: "Swirl, don't shake", desc: 'Gently roll the vial between your palms until the solution runs clear. If still cloudy after 20 minutes, the peptide may be degraded.' },
        ].map(panel => (
          <div key={panel.num} className="recon-visual-panel">
            <div className="recon-visual-panel__icon">{panel.icon}</div>
            <div className="recon-visual-panel__num">{panel.num}</div>
            <h4>{panel.title}</h4>
            <p>{panel.desc}</p>
          </div>
        ))}
      </div>

      {/* Mini-glossary popovers */}
      <div className="recon-glossary">
        <span className="recon-glossary__label">Key terms:</span>
        {Object.entries(GLOSSARY).map(([term, def]) => (
          <span key={term} className="recon-glossary__term-wrap">
            <button
              className={`recon-glossary__term${openGlossary === term ? ' recon-glossary__term--active' : ''}`}
              onClick={() => toggleGlossary(term)}
              aria-expanded={openGlossary === term}
            >
              {term}
            </button>
            {openGlossary === term && (
              <span className="recon-glossary__popover" role="tooltip">
                {def}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Critical warning */}
      <div className="dosing-warning">
        <strong>Critical:</strong> Peptide bonds are extremely fragile. Never blast BAC water
        directly onto the powder. Never shake the vial. Always let the water trickle gently down
        the glass wall and roll — never shake — to dissolve.
      </div>

      {/* Expandable step-by-step detail */}
      <div className="recon-steps">
        {RECON_STEPS.map((s) => (
          <div key={s.step} className="recon-step">
            <div className="recon-step__num">{s.step}</div>
            <div className="recon-step__text">
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ PHASE B — Calculate (embedded mini calculator) ═══ */}
      <div className="mini-calc" role="region" aria-label="Mini reconstitution calculator">
        <div className="mini-calc__header">
          <h4>🧮 Try it now — Reconstitution Calculator</h4>
          <p>
            Pre-filled with a common BPC-157 example (5 mg vial, 2 mL BAC water, 250 mcg dose).
            Change the numbers to match your vial.
          </p>
        </div>

        <div className="mini-calc__inputs">
          <div className="mini-calc__field">
            <label htmlFor="mini-vial">Vial Size (mg)</label>
            <input
              id="mini-vial"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={vialMg}
              onChange={(e) => setVialMg(e.target.value)}
              placeholder="e.g. 5"
            />
          </div>
          <div className="mini-calc__field">
            <label htmlFor="mini-water">BAC Water (mL)</label>
            <input
              id="mini-water"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={bacWaterMl}
              onChange={(e) => setBacWaterMl(e.target.value)}
              placeholder="e.g. 2"
            />
          </div>
          <div className="mini-calc__field">
            <label htmlFor="mini-dose">Target Dose (mcg)</label>
            <input
              id="mini-dose"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={doseMcg}
              onChange={(e) => setDoseMcg(e.target.value)}
              placeholder="e.g. 250"
            />
          </div>
        </div>

        {/* Error display */}
        {calcError && (
          <div className="mini-calc__error" role="alert">
            ⚠ {calcError}
          </div>
        )}

        {/* Results */}
        {calc && (
          <div className="mini-calc__results" aria-live="polite" aria-atomic="true">
            <div className="mini-calc__result-card">
              <span className="mini-calc__result-label">Concentration</span>
              <span className="mini-calc__result-value">
                {formatConcentration(calc.concentrationMcgPerMl)}
              </span>
              <span className="mini-calc__result-unit">mcg/mL</span>
            </div>

            {calc.dispenseMl > 0 && (
              <>
                <div className="mini-calc__result-card">
                  <span className="mini-calc__result-label">Draw Volume</span>
                  <span className="mini-calc__result-value">
                    {calc.dispenseMl.toFixed(3)}
                  </span>
                  <span className="mini-calc__result-unit">mL</span>
                </div>
                <div className="mini-calc__result-card mini-calc__result-card--highlight">
                  <span className="mini-calc__result-label">Syringe Mark</span>
                  <span className="mini-calc__result-value">
                    {calc.syringeUnits % 1 === 0
                      ? calc.syringeUnits.toFixed(0)
                      : calc.syringeUnits.toFixed(1)}
                  </span>
                  <span className="mini-calc__result-unit">
                    units on a U-100 insulin syringe
                  </span>
                </div>
              </>
            )}

            {calc.exceedsCapacity && (
              <div className="mini-calc__error" role="alert">
                ⚠ This dose requires more than 1 mL — use a larger syringe or add
                more BAC water to increase concentration.
              </div>
            )}
          </div>
        )}

        {/* "Show me how this works" math toggle */}
        <button
          className="mini-calc__math-toggle"
          onClick={() => setShowMath(!showMath)}
          aria-expanded={showMath}
          aria-controls="mini-calc-math"
        >
          {showMath ? '▾ Hide the math' : '▸ Show me how this works'}
        </button>

        {showMath && (
          <div id="mini-calc-math" className="mini-calc__math">
            <div className="mini-calc__formula">
              <strong>Step 1 — Concentration:</strong>
              <code>
                {vialMg || '?'} mg × 1,000 ÷ {bacWaterMl || '?'} mL ={' '}
                <em>
                  {calc
                    ? formatConcentration(calc.concentrationMcgPerMl)
                    : '?'}{' '}
                  mcg/mL
                </em>
              </code>
            </div>
            <div className="mini-calc__formula">
              <strong>Step 2 — Draw volume:</strong>
              <code>
                {doseMcg || '?'} mcg ÷{' '}
                {calc
                  ? formatConcentration(calc.concentrationMcgPerMl)
                  : '?'}{' '}
                mcg/mL ={' '}
                <em>{calc && calc.dispenseMl > 0 ? calc.dispenseMl.toFixed(3) : '?'} mL</em>
              </code>
            </div>
            <div className="mini-calc__formula">
              <strong>Step 3 — Syringe units:</strong>
              <code>
                {calc && calc.dispenseMl > 0 ? calc.dispenseMl.toFixed(3) : '?'} mL
                × 100 units/mL ={' '}
                <em>
                  {calc && calc.syringeUnits > 0
                    ? `${calc.syringeUnits} units`
                    : '?'}
                </em>
              </code>
            </div>
            <p className="mini-calc__math-note">
              All math uses the C₁V₁ = C₂V₂ dilution formula — identical to the full
              PeptiDex calculator.
            </p>
          </div>
        )}
      </div>

      {/* ═══ PHASE C — Graduate (handoff) ═══ */}
      <div className="recon-cta">
        <Link
          href={`/tools/calculator?from=onboarding&vial=${encodeURIComponent(vialMg)}&water=${encodeURIComponent(bacWaterMl)}&dose=${encodeURIComponent(doseMcg)}`}
          className="onboarding-nav__btn onboarding-nav__btn--primary"
          onClick={() =>
            trackOnboardingToolLaunched({
              tool: 'reconstitution_calculator',
              step_number: 3,
            })
          }
        >
          Open the full calculator with your numbers →
        </Link>
        <Link
          href="/beginners-guide"
          className="onboarding-nav__btn onboarding-nav__btn--secondary"
          onClick={() =>
            trackOnboardingToolLaunched({
              tool: 'beginners_guide',
              step_number: 3,
            })
          }
        >
          Read the complete reconstitution guide →
        </Link>
      </div>
    </div>
  );
}
