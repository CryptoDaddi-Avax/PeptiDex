const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../src/app/blog');
const SKIP = ['page.tsx', 'layout.tsx', 'BlogClient.tsx', 'blog-redesign.css', 'rss.xml'];

const dirs = fs.readdirSync(BLOG_DIR).filter(d => {
  const fullPath = path.join(BLOG_DIR, d);
  return fs.statSync(fullPath).isDirectory() && !SKIP.includes(d);
});

let patched = 0;
for (const dir of dirs) {
  const filePath = path.join(BLOG_DIR, dir, 'page.tsx');
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip files that already have FeedbackModal
  if (content.includes('FeedbackModal')) {
    console.log(`[SKIP] ${dir} — already patched`);
    continue;
  }

  // 1. Add FeedbackModal import after AuthorBio import if present, else after last import
  if (content.includes("from '@/components/author-bio'")) {
    content = content.replace(
      "from '@/components/author-bio';",
      "from '@/components/author-bio';\nimport { FeedbackModal } from '@/components/feedback-modal';"
    );
  } else {
    // Find last import line
    const lastImportIdx = content.lastIndexOf("import ");
    const endOfLine = content.indexOf('\n', lastImportIdx);
    content = content.slice(0, endOfLine + 1) + "import { FeedbackModal } from '@/components/feedback-modal';\n" + content.slice(endOfLine + 1);
  }

  // 2. Find DATE_MOD or DATE_PUB constant for the date value
  const dateModMatch = content.match(/const DATE_MOD\s*=\s*'([\d-]+)'/);
  const datePubMatch = content.match(/const DATE_PUB\s*=\s*'([\d-]+)'/);
  const dateValue = dateModMatch?.[1] || datePubMatch?.[1] || '2026-04-01';

  // 3. Find the slug from directory name
  const slug = dir;
  const pageUrl = `https://peptidex.app/blog/${slug}`;

  // 4. Try to add feedback row before closing </div>\n  );\n}
  // Pattern: look for AuthorBio render and inject after it, or before last </div>
  const authorBioRender = /<AuthorBio[^/]*\/>/;
  if (authorBioRender.test(content)) {
    content = content.replace(
      authorBioRender,
      (match) => match + `\n\n      {/* Fact-checked date + Feedback */}\n      <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">\n        <span>Last fact-checked: <time dateTime="${dateValue}">${dateValue}</time></span>\n        <FeedbackModal pageUrl="${pageUrl}" />\n      </div>`
    );
    fs.writeFileSync(filePath, content);
    console.log(`[OK] ${dir}`);
    patched++;
  } else {
    // Just add the import, leave placement for manual
    fs.writeFileSync(filePath, content);
    console.log(`[IMPORT ONLY] ${dir} — no AuthorBio found, added import only`);
    patched++;
  }
}

console.log(`\nPatched ${patched} blog post files.`);
