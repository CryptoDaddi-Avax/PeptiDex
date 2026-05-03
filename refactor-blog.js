const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src/app/blog');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (filePath.includes('[slug]') || filePath.endsWith('blog\\page.tsx') || filePath.endsWith('blog/page.tsx')) {
    return;
  }

  console.log('Processing:', filePath);

  // 1. Replace outer container with more robust regex
  content = content.replace(
    /<div className="max-w-4xl[^>]*">/,
    '<main id="main-content">'
  );

  // Fix lucide-react imports
  content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]lucide-react['"];/, (match, p1) => {
    let imports = p1.split(',').map(i => i.trim()).filter(i => i);
    if (!imports.includes('BookOpen')) imports.push('BookOpen');
    if (!imports.includes('User')) imports.push('User');
    if (!imports.includes('Calendar')) imports.push('Calendar');
    return `import { ${imports.join(', ')} } from 'lucide-react';`;
  });

  // 2. Extract title, desc, author, date
  let title = 'PeptiDex Blog Article';
  let desc = 'Research-backed analysis of peptides and longevity compounds.';
  let author = 'PeptiDex Editorial';
  let date = '2026-04-12';

  const tMatch = content.match(/const POST_TITLE = '(.*?)';/) || content.match(/title:\s*'([^']+)'/);
  if (tMatch) title = tMatch[1].replace(' | PeptiDex Blog', '').replace(' | PeptiDex Research Blog', '');

  const dMatch = content.match(/const POST_DESC = '(.*?)';/) || content.match(/description:\s*'([^']+)'/);
  if (dMatch) desc = dMatch[1];

  const aMatch = content.match(/const AUTHOR = '(.*?)';/);
  if (aMatch) author = aMatch[1];

  const dateMatch = content.match(/const DATE_PUB = '(.*?)';/) || content.match(/datePublished:\s*'([^']+T?[^']+)'/);
  if (dateMatch) {
    date = dateMatch[1];
    if (date.includes('T')) date = date.split('T')[0];
  }

  // Split title for the italic treatment
  let firstHalf = title;
  let secondHalf = '';
  if (title.includes(':')) {
    const parts = title.split(':');
    firstHalf = parts[0] + ':';
    secondHalf = parts.slice(1).join(':').trim();
  } else if (title.includes(' - ')) {
    const parts = title.split(' - ');
    firstHalf = parts[0] + ' -';
    secondHalf = parts.slice(1).join(' - ').trim();
  } else if (title.includes(' vs ')) {
    const parts = title.split(' vs ');
    firstHalf = parts[0] + ' vs';
    secondHalf = parts[1].trim();
  } else {
    const words = title.split(' ');
    if (words.length > 2) {
      firstHalf = words.slice(0, words.length - 2).join(' ');
      secondHalf = words.slice(words.length - 2).join(' ');
    }
  }

  // Generate a clean slug for author URL
  const authorSlug = author.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Find Breadcrumbs and header and replace them
  const headerRegex = /<Breadcrumbs[\s\S]*?<\/header>/;
  const newHeader = `
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/blog">Blog</Link>
            <span className="sep">/</span>
            <span className="current">${title.replace(/<[^>]*>?/gm, '')}</span>
          </nav>
          <div className="section-label">§ Blog Article</div>
          <h1 className="page-title">
            ${firstHalf}<br /><em>${secondHalf}</em>.
          </h1>
          <p className="page-subtitle">
            ${desc}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <Link href={\`/about/${authorSlug}\`} className="font-semibold text-zinc-200 hover:text-amber-400 transition-colors">${author}</Link>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <span>${date}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-400 font-medium">9 Min Read</span>
            </div>
          </div>
        </div>
      </header>

      <div className="about-content reveal space-y-16">
`;

  content = content.replace(headerRegex, newHeader);

  // Replace inner <main> tags with <article> because the outer tag is now <main>
  content = content.replace(/<main className=/g, '<article className=');
  content = content.replace(/<\/main>/g, '</article>');

  // 3. Replace prose classes
  const proseRegex = /className="[^"]*prose[^"]*"/g;
  const newProseClasses = 'className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:text-zinc-100 prose-h2:font-bold prose-h2:mb-6 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-300 prose-strong:text-zinc-200 prose-ul:text-zinc-400 prose-li:marker:text-amber-500 prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-950/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300"';
  content = content.replace(proseRegex, newProseClasses);

  // 4. Inject § markers before <h2> tags inside the article content
  let h2Counter = 1;
  content = content.replace(/<h2([^>]*)>(.*?)<\/h2>/g, (match, attrs, innerText) => {
    if (innerText.toLowerCase().includes('frequently asked questions') || innerText.toLowerCase().includes('sources')) {
      return match;
    }
    const num = String(h2Counter++).padStart(2, '0');
    return `<div className="section-label mt-12 mb-2">§ ${num}</div>\n          <h2${attrs}>${innerText}</h2>`;
  });

  // 5. Close the about-content div and the main tag at the very end
  const endRegex = /<\/div>\s*\);\s*}\s*$/;
  content = content.replace(endRegex, `      </div>\n      <div className="disclaimer-strip">\n        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved\n      </div>\n    </main>\n  );\n}\n`);

  // Change the final disclaimer box to the strip
  content = content.replace(/<div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center mt-8">.*?<\/div>/s, '');
  content = content.replace(/<div className="mt-16 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2">.*?<\/div>/s, '');
  
  // Remove duplicate disclaimer at top
  content = content.replace(/<div className="rounded-xl bg-amber-950\/25 border border-amber-500\/20 p-4">.*?<\/div>/s, '');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directory);
files.forEach(processFile);
