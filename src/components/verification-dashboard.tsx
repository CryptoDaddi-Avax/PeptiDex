'use client';

import { useState } from 'react';
import { ShieldCheck, FileText, Users, FlaskConical, ExternalLink, ChevronRight, AlertTriangle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { VendorVerification, COAEntry, CommunitySubmission, IndependentTestSummary, VerificationTier } from '@/data/verification-data';
import { getTierLabel, getTierColor } from '@/data/verification-data';

type Tab = 'vendor' | 'community' | 'independent';

interface Props {
  verification: VendorVerification;
  onOpenSubmitModal?: () => void;
}

/* ── Tier Badge ── */
function TierBadge({ tier }: { tier: VerificationTier }) {
  const color = getTierColor(tier);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: '99px',
      background: `${color}18`, border: `1px solid ${color}40`,
      color, fontSize: 11, fontFamily: 'var(--mono)',
      letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
    }}>
      <ShieldCheck size={12} />
      {getTierLabel(tier)}
    </span>
  );
}

/* ── Pass Rate Gauge ── */
function PassRateGauge({ rate }: { rate: number | null }) {
  if (rate === null) return <span style={{ color: 'var(--ink-mute)', fontSize: 13, fontFamily: 'var(--mono)' }}>No data</span>;
  const pct = Math.round(rate);
  const color = pct >= 90 ? '#7fb77e' : pct >= 75 ? '#c9a961' : '#d4832a';
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(244,239,230,0.06)" strokeWidth="6" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 44 44)"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
        <text x="44" y="40" textAnchor="middle" fill={color} fontSize="20" fontFamily="var(--serif)" fontWeight="300">{pct}%</text>
        <text x="44" y="56" textAnchor="middle" fill="var(--ink-mute)" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.1em">PASS RATE</text>
      </svg>
    </div>
  );
}

/* ── COA Card ── */
function COACard({ entry }: { entry: COAEntry }) {
  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 12, padding: '20px 24px',
      background: 'rgba(22,22,26,0.5)', transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink)' }}>{entry.peptide}</span>
            {entry.passed ? (
              <CheckCircle2 size={14} color="#7fb77e" />
            ) : (
              <XCircle size={14} color="#d4832a" />
            )}
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>
            Batch {entry.batchId} · {entry.testDate}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontFamily: 'var(--serif)', color: entry.passed ? 'var(--gold)' : 'var(--amber)' }}>{entry.purity}%</div>
            <div style={{ fontSize: 9, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Purity</div>
          </div>
          {entry.molecularWeight && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontFamily: 'var(--serif)', color: 'var(--ink-dim)' }}>{entry.molecularWeight}</div>
              <div style={{ fontSize: 9, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>MW</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {entry.methods.map(m => (
          <span key={m} style={{
            padding: '3px 10px', borderRadius: 6,
            background: 'rgba(74,158,255,0.08)', border: '1px solid rgba(74,158,255,0.2)',
            color: 'var(--plasma)', fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.06em',
          }}>{m}</span>
        ))}
      </div>
      {entry.annotation && (
        <p style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.65, fontFamily: 'var(--sans)', margin: 0 }}>
          <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Annotation: </strong>{entry.annotation}
        </p>
      )}
      {entry.documentUrl && (
        <a href={entry.documentUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12,
            fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--mono)', letterSpacing: '0.08em', textDecoration: 'none' }}>
          <FileText size={12} /> View original COA <ExternalLink size={10} />
        </a>
      )}
    </div>
  );
}

/* ── Community Card ── */
function CommunityCard({ sub }: { sub: CommunitySubmission }) {
  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 12, padding: '16px 20px',
      background: 'rgba(22,22,26,0.3)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Users size={14} color="var(--plasma)" />
          <span style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink)' }}>{sub.peptide}</span>
        </div>
        <span style={{
          padding: '2px 8px', borderRadius: 99, fontSize: 9, fontFamily: 'var(--mono)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          background: sub.verified ? 'rgba(127,183,126,0.12)' : 'rgba(201,169,97,0.12)',
          color: sub.verified ? '#7fb77e' : 'var(--gold)',
          border: `1px solid ${sub.verified ? 'rgba(127,183,126,0.3)' : 'rgba(201,169,97,0.25)'}`,
        }}>
          {sub.verified ? 'Verified' : 'Unverified'}
        </span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.06em', marginBottom: 8 }}>
        {sub.submitter} · {sub.submittedDate} {sub.purity && `· ${sub.purity}% purity`}
      </div>
      {sub.notes && (
        <p style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.6, fontFamily: 'var(--sans)', margin: 0 }}>{sub.notes}</p>
      )}
    </div>
  );
}

/* ── Independent Test Card ── */
function IndependentCard({ test }: { test: IndependentTestSummary }) {
  const passRate = test.totalTests > 0 ? Math.round((test.passedTests / test.totalTests) * 100) : null;
  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 12, padding: '20px 24px',
      background: test.isOwnData ? 'rgba(74,158,255,0.04)' : 'rgba(22,22,26,0.5)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <FlaskConical size={16} color={test.isOwnData ? 'var(--plasma)' : 'var(--gold)'} />
            <span style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--ink)' }}>{test.source}</span>
            {test.vendorScore && (
              <span style={{
                padding: '2px 10px', borderRadius: 6,
                background: 'rgba(201,169,97,0.12)', border: '1px solid rgba(201,169,97,0.3)',
                color: 'var(--gold)', fontSize: 13, fontFamily: 'var(--serif)', fontWeight: 400,
              }}>
                {test.vendorScore}
              </span>
            )}
          </div>
          {test.lastTestDate && (
            <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>
              Last tested: {test.lastTestDate}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontFamily: 'var(--serif)', color: 'var(--ink)' }}>{test.totalTests}</div>
            <div style={{ fontSize: 9, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tests</div>
          </div>
          {passRate !== null && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontFamily: 'var(--serif)', color: passRate >= 90 ? '#7fb77e' : passRate >= 75 ? 'var(--gold)' : 'var(--amber)' }}>{passRate}%</div>
              <div style={{ fontSize: 9, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pass Rate</div>
            </div>
          )}
          {test.averagePurity && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontFamily: 'var(--serif)', color: 'var(--ink-dim)' }}>{test.averagePurity}%</div>
              <div style={{ fontSize: 9, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Avg Purity</div>
            </div>
          )}
        </div>
      </div>
      <div style={{
        padding: '12px 16px', borderRadius: 8,
        background: 'rgba(244,239,230,0.03)', border: '1px solid var(--line)',
        fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)',
        lineHeight: 1.6, letterSpacing: '0.04em',
      }}>
        <AlertTriangle size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
        {test.attributionText}
      </div>
      <a href={test.sourceUrl} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12,
          fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--mono)', letterSpacing: '0.08em', textDecoration: 'none' }}>
        View full results on {test.source} <ExternalLink size={10} />
      </a>
    </div>
  );
}

/* ══ Main Dashboard ══ */
export default function VerificationDashboard({ verification, onOpenSubmitModal }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('vendor');
  const v = verification;

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: 'vendor', label: 'Vendor COAs', icon: <FileText size={14} />, count: v.vendorCOAs.length },
    { key: 'community', label: 'Community', icon: <Users size={14} />, count: v.communitySubmissions.length },
    { key: 'independent', label: 'Independent Testing', icon: <FlaskConical size={14} />, count: v.independentTests.reduce((s, t) => s + t.totalTests, 0) },
  ];

  return (
    <section id="verification-dashboard" style={{ marginTop: 48 }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <div className="section-label" style={{ marginBottom: 8 }}>§ Verification Dashboard</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 300, color: 'var(--ink)', margin: '0 0 8px', lineHeight: 1.2 }}>
            {v.vendorName} <em style={{ color: 'var(--gold)' }}>verification</em> status.
          </h2>
          <TierBadge tier={v.tier} />
        </div>
        <PassRateGauge rate={v.stats.overallPassRate} />
      </div>

      {/* ── Stat Bar ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 12, marginBottom: 24,
      }}>
        {[
          { label: 'COA Documents', value: v.stats.totalDocuments },
          { label: 'Independent Tests', value: v.stats.totalIndependentTests },
          { label: 'Avg Purity', value: v.stats.averagePurity ? `${v.stats.averagePurity}%` : '—' },
          { label: 'Last Updated', value: v.stats.lastUpdated },
        ].map(s => (
          <div key={s.label} style={{
            padding: '14px 16px', borderRadius: 10,
            background: 'rgba(22,22,26,0.6)', border: '1px solid var(--line)',
          }}>
            <div style={{ fontSize: 20, fontFamily: 'var(--serif)', color: 'var(--ink)', marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 9, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid var(--line)', paddingBottom: 0 }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 16px', borderRadius: '8px 8px 0 0',
              background: activeTab === tab.key ? 'rgba(201,169,97,0.08)' : 'transparent',
              border: 'none', borderBottom: activeTab === tab.key ? '2px solid var(--gold)' : '2px solid transparent',
              color: activeTab === tab.key ? 'var(--gold)' : 'var(--ink-mute)',
              fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.06em',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {tab.icon} {tab.label}
            <span style={{
              padding: '1px 6px', borderRadius: 99, fontSize: 10,
              background: activeTab === tab.key ? 'rgba(201,169,97,0.15)' : 'rgba(244,239,230,0.05)',
              color: activeTab === tab.key ? 'var(--gold)' : 'var(--ink-mute)',
            }}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activeTab === 'vendor' && (
          v.vendorCOAs.length > 0 ? (
            v.vendorCOAs.map(coa => <COACard key={coa.id} entry={coa} />)
          ) : (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--ink-mute)', fontFamily: 'var(--mono)', fontSize: 13 }}>
              No vendor-supplied COAs on file for this vendor.
            </div>
          )
        )}

        {activeTab === 'community' && (
          <>
            {v.communitySubmissions.length > 0 ? (
              v.communitySubmissions.map(sub => <CommunityCard key={sub.id} sub={sub} />)
            ) : (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--ink-mute)', fontFamily: 'var(--mono)', fontSize: 13 }}>
                No community submissions yet. Be the first to contribute.
              </div>
            )}
            <button onClick={onOpenSubmitModal} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 24px', borderRadius: 10, width: '100%',
              background: 'transparent', border: '1px solid rgba(201,169,97,0.3)',
              color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 12,
              letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s',
            }}>
              <Users size={14} /> Submit a COA for verification <ChevronRight size={14} />
            </button>
          </>
        )}

        {activeTab === 'independent' && (
          v.independentTests.length > 0 ? (
            <>
              {v.independentTests.map((test, i) => <IndependentCard key={i} test={test} />)}
              {/* Placeholder for our own testing program */}
              <div style={{
                border: '1px dashed rgba(74,158,255,0.3)', borderRadius: 12, padding: '24px',
                textAlign: 'center', background: 'rgba(74,158,255,0.03)',
              }}>
                <Clock size={20} color="var(--plasma)" style={{ marginBottom: 8 }} />
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink)', marginBottom: 4 }}>
                  PeptiDex Independent Testing — <em style={{ color: 'var(--plasma)' }}>Coming Q3 2026</em>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>
                  Our in-house HPLC testing program will publish blind, independently-sourced results here.
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--ink-mute)', fontFamily: 'var(--mono)', fontSize: 13 }}>
              No independent testing data available for this vendor yet.
            </div>
          )
        )}
      </div>
    </section>
  );
}
