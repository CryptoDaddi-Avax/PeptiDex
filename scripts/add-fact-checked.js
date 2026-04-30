const fs = require('fs');
let content = fs.readFileSync('src/data/blog.ts', 'utf8');

const lines = content.split('\n');
const result = [];
for (let i = 0; i < lines.length; i++) {
  result.push(lines[i]);
  const trimmed = lines[i].trim();
  const nextLine = (lines[i + 1] || '').trim();
  if (trimmed.startsWith('dateModified:') && !nextLine.includes('lastFactChecked')) {
    const indent = lines[i].match(/^(\s*)/)[1];
    const match = lines[i].match(/'(\d{4}-\d{2}-\d{2})'/);
    const date = match ? match[1] : '2026-04-01';
    result.push(indent + "lastFactChecked: '" + date + "',");
  }
}
fs.writeFileSync('src/data/blog.ts', result.join('\n'));
console.log('Done: added lastFactChecked to all blog posts');
