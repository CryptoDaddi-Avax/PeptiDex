/**
 * H3: Replace all relative '/og-image.png' OG image paths with absolute URLs.
 * Decision: Use https://peptidex.app/og-image.png for static pages (consistent with metadataBase pattern).
 * The /api/og?type=... dynamic endpoint is already absolute and stays as-is.
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
const files = walkDir(srcDir, ['.tsx', '.ts']);
const changed = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (!content.includes("'/og-image.png'") && !content.includes('"/og-image.png"')) continue;
  
  const newContent = content
    .replace(/'\s*\/og-image\.png\s*'/g, "'https://peptidex.app/og-image.png'")
    .replace(/"\s*\/og-image\.png\s*"/g, '"https://peptidex.app/og-image.png"');
  
  if (newContent !== content) {
    fs.writeFileSync(f, newContent);
    const count = (content.match(/['"]\/og-image\.png['"]/g) || []).length;
    changed.push({ file: f.replace(process.cwd() + path.sep, ''), count });
  }
}

console.log('Files changed (' + changed.length + '):');
changed.forEach(({ file, count }) => console.log(`  ${file} (${count} occurrence${count > 1 ? 's' : ''})`));
