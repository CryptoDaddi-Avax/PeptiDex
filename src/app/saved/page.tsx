'use client';

import Link from 'next/link';
import { StackCard } from '@/components/stack-card';
import { useSavedStacks } from '@/hooks/useSavedStacks';
import './saved-redesign.css';

export default function SavedPage() {
  const { savedStacks, saveStack, removeStack, isStackSaved, loaded } = useSavedStacks();

  if (!loaded) {
    return (
      <main id="main-content">
        <header className="page-header">
          <div className="page-header-grid"></div>
          <div className="page-header-wrap">
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">Saved</span>
            </div>
            <div className="section-label">§ Your Library</div>
            <h1 className="page-title">
              Saved <em>peptides</em><br />&amp; protocols.
            </h1>
            <p className="page-subtitle">Loading your saved items…</p>
          </div>
        </header>
      </main>
    );
  }

  return (
    <main id="main-content">
      <header className="page-header">
        <div className="page-header-grid"></div>
        <div className="page-header-wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Saved</span>
          </div>
          <div className="section-label">§ Your Library</div>
          <h1 className="page-title">
            Saved <em>peptides</em><br />&amp; protocols.
          </h1>
          <p className="page-subtitle">
            Bookmarked profiles, saved cycles, and stacks you&apos;ve flagged for reference.
            Stored locally to your browser.
          </p>
        </div>
      </header>

      <div className="container">
        {savedStacks.length === 0 ? (
          <div className="saved-empty">
            <div className="icon">★</div>
            <h2>Nothing saved <em>yet</em>.</h2>
            <p>
              Bookmark peptide profiles, save Cycle Planner protocols, and flag stacks you want to
              come back to. Saved items appear here for quick access.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/library" className="btn-primary">
                <span>Browse the library</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
              <Link href="/stacks" className="btn-ghost">View stacks</Link>
            </div>
          </div>
        ) : (
          <div className="saved-list">
            {savedStacks.map((stack, i) => (
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
        )}
      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </main>
  );
}
