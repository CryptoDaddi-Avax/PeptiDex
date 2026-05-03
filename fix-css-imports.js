/**
 * fix-css-imports.js
 * Adds the about-redesign.css import to Strategy A pages that need editorial classes
 * but aren't in the /about/ route group.
 */
const fs = require('fs');

const targets = [
  'src/app/legal/page.tsx',
  'src/app/compare/page.tsx',
  'src/app/compare/oral-vs-injectable-peptides/page.tsx',
  'src/app/beginners-guide/page.tsx',
  'src/app/blog/page.tsx',
];

for (const f of targets) {
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('about-redesign.css')) {
    // Add the import after the first import statement
    const firstImport = c.indexOf('import ');
    const firstImportEnd = c.indexOf('\n', firstImport) + 1;
    c = c.slice(0, firstImportEnd) + "import '@/app/about/about-redesign.css';\n" + c.slice(firstImportEnd);
    // Also ensure page-header is available - vendor CSS has it, about-redesign.css has it? 
    // We'll also need the RedesignLayout-scoped .page-header CSS
    fs.writeFileSync(f, c, 'utf8');
    console.log('✓ Added about-redesign.css import to', f);
  } else {
    console.log('  already imported:', f);
  }
}
