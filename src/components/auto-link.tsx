"use client";
import React, { createContext, useContext, useRef } from 'react';
import Link from 'next/link';

// We import the static peptide dictionary to build our match map
import { peptides } from '@/data/peptides';

const AutoLinkContext = createContext<Set<string> | null>(null);

export function AutoLinkProvider({ children }: { children: React.ReactNode }) {
  // Use a ref to track which peptide slugs have been linked so far on this page
  // Note: During SSR, this will track per-request organically.
  const linkedSlugs = useRef(new Set<string>());
  return (
    <AutoLinkContext.Provider value={linkedSlugs.current}>
      {children}
    </AutoLinkContext.Provider>
  );
}

// Build a sorted dictionary mapping search terms to slugs.
// Sorted by length (longest first) to prevent partial matching 
// (e.g., matching "BPC" before "BPC-157").
const DICTIONARY = peptides.flatMap(p => 
  [p.name, ...(p.aliases || [])].map(alias => ({
    term: alias,
    regex: new RegExp(`\\b(${alias.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})\\b`, 'gi'),
    slug: p.slug
  }))
).sort((a, b) => b.term.length - a.term.length);

// Helper function to non-destructively replace strings with React Nodes
function replaceText(text: string, contextSet: Set<string> | null): React.ReactNode[] {
  let nodes: (string | React.ReactNode)[] = [text];

  for (const { regex, slug } of DICTIONARY) {
    if (contextSet?.has(slug)) continue; // Already linked on this page
    if (!regex.test(text)) continue;

    // Reset regex index
    regex.lastIndex = 0;
    
    let nextNodes: (string | React.ReactNode)[] = [];
    let matchedInLoop = false;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (typeof node === 'string') {
            // Find the *first* match only in this string block per dictionary item
            const match = regex.exec(node);
            if (match && !matchedInLoop) {
                // Record that we found it
                contextSet?.add(slug);
                matchedInLoop = true;
                
                const before = node.substring(0, match.index);
                const matchedText = match[0];
                const after = node.substring(match.index + matchedText.length);
                
                if (before) nextNodes.push(before);
                nextNodes.push(
                    <Link
                        key={`${slug}-${i}`} 
                        href={`/library/${slug}`} 
                        className="text-violet-400 font-semibold hover:underline"
                        title={`View ${matchedText} Research Profile`}
                    >
                        {matchedText}
                    </Link>
                );
                if (after) {
                    nextNodes.push(after);
                }
            } else {
                nextNodes.push(node);
            }
        } else {
            nextNodes.push(node);
        }
    }
    nodes = nextNodes;
    // If we matched it, we stop processing this slug across the rest of the string block
    if (matchedInLoop) {
        break; // Note: We only break out of this dictionary item loop. We continue checking other dictionary items.
    }
  }

  return nodes;
}

interface AutoLinkProps {
  children: React.ReactNode;
}

// Recursively walks the children array and replaces text strings with Auto-Links
export function AutoLink({ children }: AutoLinkProps) {
  const contextSet = useContext(AutoLinkContext);
  // Mount guard: render children unchanged during SSR / initial hydration.
  // After mount, React replaces with the link-transformed version.
  // This eliminates the SSR↔CSR text mismatch warning.
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
      // Don't auto-link inside existing links or headings
      if (node.type === 'a' || node.type === Link || node.type === 'h1' || node.type === 'h2' || node.type === 'h3') {
        return node;
      }
      if (node.props && (node.props as any).children) {
        return React.cloneElement(node, {
          ...(node.props as any),
          children: processNodes((node.props as any).children)
        } as any);
      }
    }
    return node;
  };

  // Before mount: render children as-is (matches SSR output exactly)
  if (!mounted) return <>{children}</>;

  return <>{processNodes(children)}</>;
}

