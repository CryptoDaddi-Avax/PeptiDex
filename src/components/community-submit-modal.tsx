'use client';

import { useState } from 'react';
import { X, Upload, FlaskConical, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vendorSlug?: string;
  vendorName?: string;
}

export default function CommunitySubmitModal({ isOpen, onClose, vendorSlug, vendorName }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    vendor: vendorName || '',
    peptide: '',
    batchId: '',
    purity: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage for now — backend integration in future sprint
    const submissions = JSON.parse(localStorage.getItem('peptidex_coa_submissions') || '[]');
    submissions.push({
      ...form,
      vendorSlug: vendorSlug || form.vendor.toLowerCase().replace(/\s+/g, '-'),
      submittedDate: new Date().toISOString().split('T')[0],
      id: `cs-user-${Date.now()}`,
      submitter: 'Anonymous Researcher',
      verified: false,
    });
    localStorage.setItem('peptidex_coa_submissions', JSON.stringify(submissions));
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ vendor: vendorName || '', peptide: '', batchId: '', purity: '', notes: '' }); onClose(); }, 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: 8,
    border: '1px solid var(--line-strong)', background: 'var(--bg)',
    color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 14, outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: 6, fontSize: 11,
    fontFamily: 'var(--mono)', letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'var(--ink-mute)',
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-card)', border: '1px solid var(--line-strong)',
        borderRadius: 16, padding: 32, width: '92%', maxWidth: 520,
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        animation: 'fadeSlideUp 0.3s ease',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FlaskConical size={20} color="var(--gold)" />
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 300, color: 'var(--ink)', margin: 0 }}>
              Submit a <em style={{ color: 'var(--gold)' }}>COA</em>
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--ink-mute)', cursor: 'pointer', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <CheckCircle2 size={48} color="#7fb77e" style={{ marginBottom: 16 }} />
            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--ink)', marginBottom: 8 }}>
              Submission received.
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>
              Our editorial team will review and annotate your COA.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Vendor</label>
                <input style={inputStyle} value={form.vendor}
                  onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))}
                  placeholder="e.g. Amino Club" required />
              </div>
              <div>
                <label style={labelStyle}>Peptide Compound</label>
                <input style={inputStyle} value={form.peptide}
                  onChange={e => setForm(f => ({ ...f, peptide: e.target.value }))}
                  placeholder="e.g. BPC-157" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Batch ID</label>
                  <input style={inputStyle} value={form.batchId}
                    onChange={e => setForm(f => ({ ...f, batchId: e.target.value }))}
                    placeholder="e.g. 2604-AC-BPC" />
                </div>
                <div>
                  <label style={labelStyle}>Purity (%)</label>
                  <input style={inputStyle} type="number" step="0.1" min="0" max="100" value={form.purity}
                    onChange={e => setForm(f => ({ ...f, purity: e.target.value }))}
                    placeholder="e.g. 99.4" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Notes / Context</label>
                <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="How was this tested? Private lab? Community test?" />
              </div>
              <div style={{
                padding: '12px 16px', borderRadius: 8,
                background: 'rgba(201,169,97,0.06)', border: '1px solid rgba(201,169,97,0.15)',
                fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', lineHeight: 1.6, letterSpacing: '0.04em',
              }}>
                <Upload size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
                PDF/image upload coming soon. For now, include any relevant details in the notes field.
              </div>
              <button type="submit" style={{
                padding: '14px 24px', borderRadius: 10, width: '100%',
                background: 'rgba(201,169,97,0.15)', border: '1px solid rgba(201,169,97,0.4)',
                color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 12,
                letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.2s', fontWeight: 500,
              }}>
                Submit for Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
