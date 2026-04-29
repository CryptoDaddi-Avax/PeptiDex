'use client';

import { useState } from 'react';
import { Quote, Copy, Link as LinkIcon, Check } from 'lucide-react';

export function CiteThisPage({ title, url }: { title: string; url: string }) {
  const [activeTab, setActiveTab] = useState<'apa' | 'bibtex'>('apa');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const year = new Date().getFullYear();
  const bibtexKey = url.split('/').pop() || 'peptidex';

  const apaCitation = `PeptiDex. (${year}). ${title}. PeptiDex Research Platform. ${url}`;

  const bibtexCitation = `@misc{peptidex_${year}_${bibtexKey},
  author = {{PeptiDex}},
  title = {${title}},
  year = {${year}},
  url = {${url}},
  note = {Accessed: ${new Date().toLocaleDateString('en-US')}}
}`;

  const currentCitation = activeTab === 'apa' ? apaCitation : bibtexCitation;

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(currentCitation);
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '8px 14px',
    fontFamily: 'var(--mono)',
    fontSize: 10,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    border: 'none',
    borderRight: '1px solid var(--line)',
    background: isActive ? 'var(--gold)' : 'transparent',
    color: isActive ? 'var(--bg)' : 'var(--ink-dim)',
    fontWeight: isActive ? 500 : 400,
    cursor: 'pointer',
    transition: 'all 0.3s',
  });

  const btnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: '10px 16px',
    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
    textTransform: 'uppercase', fontWeight: 500,
    border: '1px solid var(--line)', background: 'transparent',
    color: 'var(--ink)', cursor: 'pointer', transition: 'all 0.3s',
  };

  return (
    <section style={{ marginBottom: 24, marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, marginBottom: 16, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Quote style={{ width: 16, height: 16, color: 'var(--gold)' }} />
          <h3 style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--gold)', margin: 0,
          }}>Cite This Page</h3>
        </div>
        <div style={{ display: 'flex', border: '1px solid var(--line)' }}>
          <button onClick={() => setActiveTab('apa')} style={tabStyle(activeTab === 'apa')}>APA 7th</button>
          <button onClick={() => setActiveTab('bibtex')} style={tabStyle(activeTab === 'bibtex')}>BibTeX</button>
        </div>
      </div>

      <div style={{ border: '1px solid var(--line)', background: 'var(--bg-soft)', overflow: 'hidden' }}>
        <div style={{ padding: 16, overflowX: 'auto' }}>
          {activeTab === 'apa' ? (
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--ink-dim)',
              lineHeight: 1.6, userSelect: 'all', wordBreak: 'break-word', margin: 0,
            }}>{apaCitation}</p>
          ) : (
            <pre style={{
              fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)',
              background: 'transparent', padding: 0, margin: 0,
              userSelect: 'all', overflowX: 'auto', whiteSpace: 'pre-wrap',
            }}>
              <code>{bibtexCitation}</code>
            </pre>
          )}
        </div>
        
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: 12, background: 'var(--bg)', borderTop: '1px solid var(--line)',
          flexWrap: 'wrap',
        }}>
          <button onClick={handleCopyCitation} style={{
            ...btnStyle,
            ...(copiedCitation ? { borderColor: 'var(--gold)', color: 'var(--gold)' } : {}),
          }}>
            {copiedCitation ? <Check style={{ width: 12, height: 12 }} /> : <Copy style={{ width: 12, height: 12 }} />}
            {copiedCitation ? 'Copied' : 'Copy Citation'}
          </button>
          <button onClick={handleCopyLink} style={{
            ...btnStyle,
            ...(copiedLink ? { borderColor: 'var(--gold)', color: 'var(--gold)' } : {}),
          }}>
            {copiedLink ? <Check style={{ width: 12, height: 12 }} /> : <LinkIcon style={{ width: 12, height: 12 }} />}
            {copiedLink ? 'Link Copied' : 'Copy Link'}
          </button>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em',
            color: 'var(--ink-mute)', marginLeft: 'auto',
          }}>For academic and research purposes.</span>
        </div>
      </div>
    </section>
  );
}
