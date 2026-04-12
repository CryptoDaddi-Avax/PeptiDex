const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'src', 'app', 'blog');

const BLOG_PEPTIDE_MAP = {
  'bpc-157-vs-tb-500': [{ name: 'BPC-157', slug: 'bpc-157' }, { name: 'TB-500', slug: 'tb-500' }, { name: 'GHK-Cu', slug: 'ghk-cu' }],
  'best-peptides-for-fat-loss': [{ name: 'Semaglutide', slug: 'semaglutide' }, { name: 'Tirzepatide', slug: 'tirzepatide' }, { name: 'AOD-9604', slug: 'aod-9604' }],
  'ipamorelin-vs-cjc-1295': [{ name: 'Ipamorelin', slug: 'ipamorelin' }, { name: 'CJC-1295', slug: 'cjc-1295' }, { name: 'Sermorelin', slug: 'sermorelin' }],
  'how-to-read-a-peptide-coa': [{ name: 'BPC-157', slug: 'bpc-157' }, { name: 'Semaglutide', slug: 'semaglutide' }],
  'best-peptide-vendors-2026': [{ name: 'BPC-157', slug: 'bpc-157' }, { name: 'TB-500', slug: 'tb-500' }],
  'are-research-peptides-legal': [{ name: 'BPC-157', slug: 'bpc-157' }, { name: 'Semaglutide', slug: 'semaglutide' }, { name: 'Thymosin Alpha-1', slug: 'thymosin-alpha-1' }],
  'ghk-cu-breakout-peptide-2026': [{ name: 'GHK-Cu', slug: 'ghk-cu' }, { name: 'BPC-157', slug: 'bpc-157' }, { name: 'Epitalon', slug: 'epitalon' }],
  'oral-peptide-revolution': [{ name: 'Semaglutide', slug: 'semaglutide' }, { name: 'Retatrutide', slug: 'retatrutide' }, { name: 'Tirzepatide', slug: 'tirzepatide' }],
  'fda-peptide-reclassification-2026': [{ name: 'BPC-157', slug: 'bpc-157' }, { name: 'GHK-Cu', slug: 'ghk-cu' }, { name: 'Thymosin Alpha-1', slug: 'thymosin-alpha-1' }],
};

let modified = 0; let skipped = 0;

for (const [slug, peptides] of Object.entries(BLOG_PEPTIDE_MAP)) {
  const filePath = path.join(BLOG_DIR, slug, 'page.tsx');
  if (!fs.existsSync(filePath)) { console.log(`SKIP: ${slug}`); skipped++; continue; }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if callout is already there
  if (content.includes('<LibraryCallout')) { console.log(`SKIP: ${slug}`); skipped++; continue; }

  // Add import if needed
  if (!content.includes('import { LibraryCallout }')) {
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfImport + 1) + `import { LibraryCallout } from '@/components/library-callout';\n` + content.slice(endOfImport + 1);
  }

  // Ensure AutoLink is imported and used
  if (!content.includes('import { AutoLink }')) {
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfImport + 1) + `import { AutoLink } from '@/components/auto-link';\n` + content.slice(endOfImport + 1);
  }

  // Find the exact main tag to wrap with AutoLink if not already wrapped
  if (!content.includes('<AutoLink>')) {
      content = content.replace('<main', '<AutoLink>\n        <main');
      content = content.replace('</main>', '</main>\n        </AutoLink>');
  }

  const calloutJsx = `\n      {/* Explore in Our Library */}\n      <LibraryCallout currentSlug="${slug}" peptides={${JSON.stringify(peptides)}} />\n`;

  // Insert before AuthorBio or FAQ or at the end of the page
  const insertIndex = content.indexOf('<section className="border-t');
  if(insertIndex !== -1) {
    content = content.substring(0, insertIndex) + calloutJsx + content.substring(insertIndex);
    fs.writeFileSync(filePath, content, 'utf-8');
    modified++;
    console.log(`OK: ${slug}`);
  } else {
    // try to find AuthorBio
    const authorBioIndex = content.indexOf('<AuthorBio');
    if(authorBioIndex !== -1) {
        content = content.substring(0, authorBioIndex) + calloutJsx + content.substring(authorBioIndex);
        fs.writeFileSync(filePath, content, 'utf-8');
        modified++;
        console.log(`OK: ${slug}`);
    }
  }
}
console.log(`Done: ${modified} modified, ${skipped} skipped`);
