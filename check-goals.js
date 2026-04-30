const fs = require('fs');
const ts = require('typescript');

const code = fs.readFileSync('src/data/goal-pages.ts', 'utf8');
const sourceFile = ts.createSourceFile('goal-pages.ts', code, ts.ScriptTarget.Latest, true);

let counts = [];
function visit(node) {
  if (ts.isPropertyAssignment(node) && node.name.text === 'title') {
    // try to find parent object to estimate words
    const parentObj = node.parent;
    const text = parentObj.getText();
    const words = text.split(/\s+/).length;
    counts.push({title: node.initializer.text, words: words});
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);
console.log(JSON.stringify(counts, null, 2));
