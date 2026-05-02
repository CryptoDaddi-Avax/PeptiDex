"use client";
import React, { createContext, useContext, useRef } from 'react';
import Link from 'next/link';

// We import the static peptide dictionary to build our match map
import { peptides } from '@/data/peptides';

const AutoLinkContext = createContext<Set<string> | null>(null);

export function AutoLinkProvider({ children }: { children: React.ReactNode }) {
  // Use a ref to track which peptide slugs have been linked so far on this page.
  // During SSR this tracks per-request. On the client it persists across re-renders.
  const linkedSlugs = useRef(new Set<string>());
  return (
    <AutoLinkContext.Provider value={linkedSlugs.current}>
      {children}
    </AutoLinkContext.Provider>
  );
}

// ── Dictionary: sorted longest-first to prevent partial matches ──────────────
// e.g., "CJC-1295 DAC" must be tested before "CJC-1295" to avoid double-match.
const DICTIONARY = peptides
  .flatMap(p =>
    [p.name, ...(p.aliases || [])].map(alias => ({
      term: alias,
      // Word boundary before: require non-word char or start-of-string.
      // Word boundary after: require non-word char or end-of-string.
      // Flags: case-insensitive, but NOT global — we only want the FIRST match.
      regex: new RegExp(
        `(?<![\\w-])(${alias.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})(?![\\w-])`,
        'i'
      ),
      slug: p.slug,
    }))
  )
  .sort((a, b) => b.term.length - a.term.length);

// ── replaceText ──────────────────────────────────────────────────────────────
// Scans a plain text string and replaces the FIRST occurrence of each unlinked
// peptide name with a React <Link>. Returns an array of strings + ReactNodes.
function replaceText(text: string, contextSet: Set<string> | null): React.ReactNode[] {
  // Start with the full string; we'll split it as we find matches.
  let segments: (string | React.ReactNode)[] = [text];

  for (const { regex, slug } of DICTIONARY) {
    // Skip this peptide if we've already linked it somewhere on the page.
    if (contextSet?.has(slug)) continue;

    // Run through current segments, replacing strings only.
    let matched = false;
    const nextSegments: (string | React.ReactNode)[] = [];

    for (const seg of segments) {
      // Non-string nodes (already-created React links etc.) pass through unchanged.
      if (typeof seg !== 'string') {
        nextSegments.push(seg);
        continue;
      }

      // Already matched this slug in a previous segment — just pass through.
      if (matched) {
        nextSegments.push(seg);
        continue;
      }

      const m = regex.exec(seg);
      if (!m) {
        nextSegments.push(seg);
        continue;
      }

      // Found a match — record it and split the segment around it.
      contextSet?.add(slug);
      matched = true;

      const before = seg.slice(0, m.index);
      const matchedText = m[0];
      const after = seg.slice(m.index + matchedText.length);

      if (before) nextSegments.push(before);
      nextSegments.push(
        <Link
          key={`al-${slug}`}
          href={`/library/${slug}`}
          className="al-link"
          title={`View ${matchedText} Research Profile`}
        >
          {matchedText}
        </Link>
      );
      if (after) nextSegments.push(after);
    }

    segments = nextSegments;
    // NOTE: do NOT break here — continue checking remaining DICTIONARY entries
    // so that multiple peptides within the same text block all get linked.
  }

  return segments;
}

interface AutoLinkProps {
  children: React.ReactNode;
}

// ── AutoLink ─────────────────────────────────────────────────────────────────
// Wraps article content and recursively processes all text nodes, replacing
// the first occurrence of each peptide name with a /library/[slug] link.
//
// Rules enforced:
//  - Skips existing <a>, <Link>, and heading tags (h1/h2/h3)
//  - One link per peptide per page (tracked via AutoLinkContext)
//  - Client-only: hydration guard eliminates SSR/CSR mismatch
export function AutoLink({ children }: AutoLinkProps) {
  const contextSet = useContext(AutoLinkContext);
  // Mount guard: render children unchanged during SSR / initial hydration.
  // After mount, React replaces with the link-transformed version.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const processNodes = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return replaceText(node, contextSet);
    }
    if (Array.isArray(node)) {
      return node.map((n, i) => <React.Fragment key={i}>{processNodes(n)}</React.Fragment>);
    }
    if (React.isValidElement(node)) {
      const el = node as React.ReactElement<{ children?: React.ReactNode; className?: string }>;
      const type = el.type;

      // Never auto-link inside existing links, headings, or code blocks
      if (
        type === 'a' ||
        type === Link ||
        type === 'h1' ||
        type === 'h2' ||
        type === 'h3' ||
        type === 'h4' ||
        type === 'code' ||
        type === 'pre'
      ) {
        return node;
      }

      if (el.props?.children != null) {
        return React.cloneElement(el, {
          ...el.props,
          children: processNodes(el.props.children),
        } as React.HTMLAttributes<HTMLElement>);
      }
    }
    return node;
  };

  if (!mounted) return <>{children}</>;

  return <>{processNodes(children)}</>;
}
