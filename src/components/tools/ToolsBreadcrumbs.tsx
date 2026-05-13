'use client';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';

const TOOL_NAMES: Record<string, string> = {
  calculator:   'Reconstitution Calculator',
  halflife:     'Half-Life Visualizer',
  pk:           'PK Plasma Curves',
  coa:          'COA Analyzer',
  bloodwork:    'Bloodwork Reference',
  compare:      'Peptide Comparison',
  interactions: 'Interaction Checker',
  'vendor-picker': 'Vendor Picker',
  'cycle-planner': 'Cycle Planner',
  evidence:     'Evidence Dashboard',
  'evidence-map': 'Evidence Map',
  pricing:      'Pricing Comparison',
};

/**
 * Renders breadcrumbs for /tools/* routes.
 * Placed in the tools layout so every tool sub-page gets them automatically.
 * Skips rendering on /tools (index) itself.
 */
export function ToolsBreadcrumbs() {
  const pathname = usePathname();

  // Don't render on the /tools index page
  if (pathname === '/tools') return null;

  // Extract the tool slug from pathname: /tools/calculator → 'calculator'
  const segments = pathname.split('/').filter(Boolean); // ['tools', 'calculator']
  const toolSlug = segments[1];
  if (!toolSlug) return null;

  const toolName = TOOL_NAMES[toolSlug] ?? toolSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <Breadcrumbs
      items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Tools', url: 'https://peptidex.app/tools' },
        { name: toolName },
      ]}
    />
  );
}
