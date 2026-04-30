const fs = require('fs');
const content = fs.readFileSync('src/data/goal-pages.ts', 'utf8');

const blocks = content.split(/{\s*slug:\s*['"]/);
const shortPages = [];
for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const slugMatch = block.match(/^([^'"]+)['"]/);
  if (slugMatch) {
    const wordCount = block.split(/\s+/).length;
    if (wordCount < 500) {
      console.log(slugMatch[1] + ' has ' + wordCount + ' words');
      shortPages.push(slugMatch[1]);
    }
  }
}
console.log('Short pages:', shortPages);
