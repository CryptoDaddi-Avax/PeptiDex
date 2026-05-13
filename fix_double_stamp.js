/**
 * Fix blog pages using PeptiDex Blog / PeptiDex Research Blog suffix patterns.
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
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  let inNestedBlock = 0;
  let modified = false;
  
  const newLines = lines.map(line => {
    if (/openGraph\s*:\s*\{/.test(line) || /twitter\s*:\s*\{/.test(line)) inNestedBlock++;
    if (inNestedBlock > 0 && /^\s*\},?\s*$/.test(line)) { inNestedBlock--; return line; }
    
    if (inNestedBlock === 0 && /^\s+title\s*:/.test(line)) {
      // Strip any " | PeptiDex..." brand suffix from the title value
      let newLine = line
        .replace(/ \| PeptiDex Research Blog(`)/g, '$1')
        .replace(/ \| PeptiDex Blog(`)/g, '$1')
        .replace(/ \| PeptiDex Research Blog'/g, "'")
        .replace(/ \| PeptiDex Blog'/g, "'")
        .replace(/ \| PeptiDex Research Blog"/g, '"')
        .replace(/ \| PeptiDex Blog"/g, '"')
        .replace(/ \| PeptiDex Verified Protocol Logs'/g, "'")
        .replace(/ \| PeptiDex Verified Protocol Logs"/g, '"')
        .replace(/ PeptiDex Admin"/g, ' Admin"')   // "Moderation Queue | PeptiDex Admin" -> strip PeptiDex
        .replace(/ \| PeptiDex Admin"/g, '"');
      
      if (newLine !== line) {
        modified = true;
        return newLine;
      }
    }
    return line;
  });
  
  if (modified) {
    fs.writeFileSync(f, newLines.join('\n'));
    changed.push(f.replace(process.cwd() + path.sep, ''));
  }
}

console.log('Files changed (' + changed.length + '):');
changed.forEach(f => console.log(' ', f));
