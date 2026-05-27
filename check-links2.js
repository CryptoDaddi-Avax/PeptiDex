const fs = require('fs');
const path = require('path');

function getHrefs(text) {
  const links = new Set();
  const regex1 = /href=(["'{`])(\/[a-zA-Z0-9\-\/_]+)\1/g;
  let match;
  while ((match = regex1.exec(text)) !== null) {
    links.add(match[2]);
  }
  // also catch href={'/foo'}
  const regex2 = /href=\{['"`](\/[a-zA-Z0-9\-\/_]+)['"`]\}/g;
  while ((match = regex2.exec(text)) !== null) {
    links.add(match[1]);
  }
  return Array.from(links);
}

const findFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(findFiles(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}

const tsxFiles = findFiles('src');
const allLinks = new Set();
tsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  getHrefs(content).forEach(l => {
    allLinks.add(l);
  });
});

console.log('Total unique links found:', allLinks.size);
fs.writeFileSync('scratch/all_internal_links.txt', Array.from(allLinks).sort().join('\n'));
