/**
 * H5: Replace all remaining "PeptideX" (capital X) instances with "PeptiDex" (capital D)
 * across the entire src directory.
 * Exception: don't touch URL slugs like /partner/PeptiDex/ (those are correct already).
 */
const fs = require('fs');
const path = require('path');

function walkDir(dir, ext) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      files.push(...walkDir(fullPath, ext));
    } else if (entry.isFile() && ext.some(e => entry.name.endsWith(e))) {
      files.push(fullPath);
    }
  }
  return files;
}

const srcDir = path.join(process.cwd(), 'src');
const files = walkDir(srcDir, ['.tsx', '.ts', '.md', '.mdx']);
const changed = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (!content.includes('PeptideX')) continue;
  
  const newContent = content.replace(/PeptideX/g, 'PeptiDex');
  if (newContent !== content) {
    fs.writeFileSync(f, newContent);
    const relPath = f.replace(process.cwd() + path.sep, '');
    const count = (content.match(/PeptideX/g) || []).length;
    changed.push({ file: relPath, count });
  }
}

console.log('Files changed (' + changed.length + '):');
changed.forEach(({ file, count }) => console.log(`  ${file} (${count} instance${count > 1 ? 's' : ''})`));
console.log('\nTotal replacements:', changed.reduce((s, c) => s + c.count, 0));
