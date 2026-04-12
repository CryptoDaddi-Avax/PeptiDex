const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'src/app/blog');

const slugMap = {
  'Dr. E. Vance': 'dr-e-vance',
  'PeptideX Editorial': 'peptidex-editorial',
  'Editorial Team': 'peptidex-editorial',
  'Legal Dept': 'peptidex-editorial',
};

let total = 0;

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(full);
    } else if (entry.name === 'page.tsx') {
      let content = fs.readFileSync(full, 'utf8');
      let modified = false;

      // 1. Add authors import if not present
      if (!content.includes("from '@/data/authors'") && !content.includes('from "@/data/authors"')) {
        // Add import after the last import line
        const importInsert = "import { getAuthorSlug } from '@/data/authors';\n";
        
        // Find a good insertion point - after the last import
        const lines = content.split('\n');
        let lastImportIdx = -1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) {
            lastImportIdx = i;
          }
        }
        if (lastImportIdx >= 0) {
          lines.splice(lastImportIdx + 1, 0, importInsert.trim());
          content = lines.join('\n');
          modified = true;
        }
      }

      // 2. Look for the byline display: <span className="font-semibold text-zinc-200">{AUTHOR}</span>
      // Convert it to a linked version
      const bylinePattern = /<span className="font-semibold text-zinc-200">\{AUTHOR\}<\/span>/g;
      if (bylinePattern.test(content)) {
        content = content.replace(bylinePattern,
          '<Link href={`/about/${getAuthorSlug(AUTHOR)}`} className="font-semibold text-zinc-200 hover:text-violet-400 transition-colors">{AUTHOR}</Link>'
        );
        modified = true;
      }

      // 3. Also check for older blog posts that might have different byline patterns
      const bylinePattern2 = /<span className="font-bold text-zinc-200">\{AUTHOR\}<\/span>/g;
      if (bylinePattern2.test(content)) {
        content = content.replace(bylinePattern2,
          '<Link href={`/about/${getAuthorSlug(AUTHOR)}`} className="font-bold text-zinc-200 hover:text-violet-400 transition-colors">{AUTHOR}</Link>'
        );
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(full, content);
        total++;
        console.log('  Patched:', path.relative(BLOG_DIR, full));
      }
    }
  }
}

processDir(BLOG_DIR);
console.log(`\nDone. Patched ${total} blog post files.`);
