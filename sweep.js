/**
 * v13 CSS Token Sweep Script
 * Applies mechanical token renames from gold/Fraunces to lime/teal/Geist.
 * Does NOT touch --plasma (flagged for review).
 */
const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);
if (!files.length) { console.log('Usage: node sweep.js <file1> <file2> ...'); process.exit(1); }

// Token variable renames (order matters — longer matches first)
const varRenames = [
  ['var(--gold-bright)', 'var(--lime-2)'],
  ['var(--gold-deep)',   'var(--teal)'],
  ['var(--gold)',        'var(--lime)'],
  ['var(--bg-elevated)', 'var(--ink-3)'],
  ['var(--bg-card)',     'var(--ink-2)'],
  ['var(--bg-soft)',     'var(--ink-2)'],
  ['var(--bg)',          'var(--ink)'],
  ['var(--ink-dim)',     'var(--paper-2)'],
  ['var(--ink-mute)',    'var(--paper-3)'],
  ['var(--ink)',         'var(--paper)'],
  ['var(--serif)',       'var(--sans)'],
  ['var(--amber)',       'var(--rust)'],
  ['var(--green)',       'var(--lime-2)'],
];

// Hardcoded hex renames
const hexRenames = [
  // Gold family rgba → lime rgba (no spaces)
  ['rgba(201,169,97',  'rgba(196,242,92'],   // --gold #c9a961
  ['rgba(232,201,135', 'rgba(169,224,58'],   // --gold-bright #e8c987
  ['rgba(138,111,46',  'rgba(26,60,58'],     // --gold-deep → teal
  ['rgba(212,131,42',  'rgba(199,97,59'],    // --amber #d4832a → rust #C7613B
  // Gold family rgba → lime rgba (WITH spaces after commas)
  ['rgba(201, 169, 97',  'rgba(196,242,92'],
  ['rgba(232, 201, 135', 'rgba(169,224,58'],
  ['rgba(138, 111, 46',  'rgba(26,60,58'],
  ['rgba(212, 131, 42',  'rgba(199,97,59'],
  // Plasma family (blue) — also catch spaced rgba
  ['rgba(74,158,255',  'rgba(74,158,255'],   // no-op, keep for awareness
  ['rgba(74, 158, 255', 'rgba(74, 158, 255'],
  // Hex codes
  ['#c9a961',  '#C4F25C'],
  ['#C9A961',  '#C4F25C'],
  ['#e8c987',  '#A9E03A'],
  ['#E8C987',  '#A9E03A'],
  ['#e0c278',  '#A9E03A'],   // gold-bright variant
  ['#8a6f2e',  '#1A3C3A'],
  ['#d4832a',  '#C7613B'],
  ['#D4832A',  '#C7613B'],
  // Old background hex
  ['#0a0a0b',  '#0B0D10'],
  ['#0A0A0B',  '#0B0D10'],
  ['#111113',  '#14171C'],
  ['#16161a',  '#14171C'],
  ['#16161A',  '#14171C'],
  ['#1a1a1e',  '#1E2229'],
  ['#1a1a1a',  '#1E2229'],
  ['#1A1A1E',  '#1E2229'],
  // Old foreground/text hex
  ['#f4efe6',  '#F2EEE5'],
  ['#F4EFE6',  '#F2EEE5'],
  ['#a8a196',  '#E9E4D6'],
  ['#6b6860',  '#DBD4C1'],
];

// Font family renames
const fontRenames = [
  ["'Fraunces', 'Times New Roman', serif", '"Geist", system-ui, sans-serif'],
  ["'Fraunces'", '"Geist"'],
  ["'Inter', system-ui, sans-serif",       '"Geist", system-ui, -apple-system, sans-serif'],
  ["'Inter'",   '"Geist"'],
  ["'JetBrains Mono', monospace",          '"Geist Mono", ui-monospace, monospace'],
  ["'JetBrains Mono'", '"Geist Mono"'],
];

let plasmaFlags = [];

for (const filePath of files) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) { console.warn(`SKIP (not found): ${filePath}`); continue; }
  
  let content = fs.readFileSync(abs, 'utf8');
  const original = content;
  
  // Check for --plasma
  const plasmaMatches = content.match(/var\(--plasma\)/g);
  if (plasmaMatches) {
    plasmaFlags.push({ file: filePath, count: plasmaMatches.length });
  }
  
  // Apply var renames
  for (const [from, to] of varRenames) {
    content = content.split(from).join(to);
  }
  
  // Apply hex renames
  for (const [from, to] of hexRenames) {
    content = content.split(from).join(to);
  }
  
  // Apply font renames
  for (const [from, to] of fontRenames) {
    content = content.split(from).join(to);
  }
  
  if (content !== original) {
    fs.writeFileSync(abs, content, 'utf8');
    console.log(`SWEPT: ${filePath}`);
  } else {
    console.log(`NO CHANGE: ${filePath}`);
  }
}

if (plasmaFlags.length) {
  console.log('\n⚠ PLASMA FLAGS (not replaced, needs manual review):');
  for (const f of plasmaFlags) {
    console.log(`  ${f.file}: ${f.count} occurrences of var(--plasma)`);
  }
}
