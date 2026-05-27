const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getHrefs(text) {
  const links = new Set();
  const regex = /href=(?:\"|\'|\{|\{\`)(/[^\`\"\'\}]+)(?:\"|\'|\}|\`\})|url:\s*(?:\`|\"|\')\$\{baseUrl\}(/[^\`\"\'\}]+)(?:\`|\"|\')/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.add(match[1] || match[2]);
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
    if (l && !l.includes('$')) { // ignore template vars if matched raw
      allLinks.add(l);
    }
  });
});

console.log('Total unique links found:', allLinks.size);
Array.from(allLinks).sort().forEach(l => console.log(l));
