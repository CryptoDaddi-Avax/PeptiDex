const fs = require('fs');

const data1 = require('./goal-content-1.js');
const data2 = require('./goal-content-2.js');
const data3 = require('./goal-content-3.js');

const allNewData = { ...data1, ...data2, ...data3 };

let content = fs.readFileSync('src/data/goal-pages.ts', 'utf8');

for (const [slug, newContent] of Object.entries(allNewData)) {
  const regex = new RegExp(`(slug:\\s*["']${slug}["'][^}]+keywords:\\s*\\[[^\\]]+\\][\\s\\S]*?)(faqs:\\s*\\[)`, 'i');
  
  const replacement = `$1deepDive: \`${newContent.deepDive}\`,\n        clinicalEvidence: \`${newContent.clinicalEvidence}\`,\n        protocolGuidelines: \`${newContent.protocolGuidelines}\`,\n        $2`;
  
  content = content.replace(regex, replacement);
}

fs.writeFileSync('src/data/goal-pages.ts', content);
console.log('Done replacing content.');
