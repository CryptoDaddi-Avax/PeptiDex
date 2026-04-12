const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/app/blog');
const dirs = fs.readdirSync(blogDir).filter(f => fs.statSync(path.join(blogDir, f)).isDirectory());

let processed = 0;
let errors = 0;

for (const slug of dirs) {
    const pagePath = path.join(blogDir, slug, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf8');
    let original = content;

    try {
        // 1. Add CiteThisPage import if missing
        if (!content.includes('import { CiteThisPage }')) {
            content = content.replace(/(import.*lucide-react.*[\r\n]+)/, `$1import { CiteThisPage } from '@/components/cite-page';\n`);
        }
        
        // 2. Add ShareBar import if missing
        if (!content.includes('import { ShareBar }')) {
            content = content.replace(/(import.*lucide-react.*[\r\n]+)/, `$1import { ShareBar } from '@/components/share-bar';\n`);
        }

        // 3. Inject OpenGraph & Twitter metadata
        if (!content.includes('openGraph: {') && content.includes('export const metadata: Metadata = {')) {
            const ogSnippet = `openGraph: {
    title: \`\${POST_TITLE} | PeptiDex Research\`,
    description: POST_DESC,
    url: 'https://peptidex.app/blog/${slug}',
    type: 'article',
    images: [{
      url: \`https://peptidex.app/api/og?type=blog&title=\${encodeURIComponent(POST_TITLE)}\`,
      width: 1200,
      height: 630,
      alt: POST_TITLE,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: \`\${POST_TITLE} | PeptiDex Research\`,
    description: POST_DESC,
  },`;
            
            // Inject before the closing '};' of metadata
            content = content.replace(/(alternates:\s*{[\s\S]*?},?)\s*};/, `$1\n  ${ogSnippet}\n};`);
        }

        // 4. Inject ShareBar below header
        if (!content.includes('<ShareBar title={POST_TITLE}')) {
            // Find end of header element - look for </header>
            content = content.replace(/(<\/header>)/, `  <ShareBar title={POST_TITLE} url={\`https://peptidex.app/blog/${slug}\`} />\n      $1`);
        }

        // 5. Inject CiteThisPage before FAQ
        if (!content.includes('<CiteThisPage title=')) {
            content = content.replace(/(<section[^>]*>[\s\S]*?<h2[^>]*>Frequently Asked Questions<\/h2>)/, `{/* Citations */}\n      <div className="mb-12">\n        <CiteThisPage title={POST_TITLE} url={\`https://peptidex.app/blog/${slug}\`} />\n      </div>\n\n      $1`);
        }

        // 6. Inject ShareBar at the bottom, before AuthorBio or BlogVendorCallout
        if ((!content.includes('<ShareBar ') && content.indexOf('<ShareBar') === content.lastIndexOf('<ShareBar')) || content.split('<ShareBar').length < 3) {
             // only append a second one if there aren't two already
             if (content.split('<ShareBar').length === 2 && content.includes('<BlogVendorCallout')) {
                 content = content.replace(/(<BlogVendorCallout)/, `\n      <ShareBar title={POST_TITLE} url={\`https://peptidex.app/blog/${slug}\`} />\n      $1`);
             }
        }

        if (content !== original) {
            fs.writeFileSync(pagePath, content);
            processed++;
            console.log(`✅ Updated ${slug}`);
        } else {
            console.log(`⏩ Skipped ${slug} (Already updated)`);
        }
    } catch (err) {
        errors++;
        console.error(`❌ Error in ${slug}: ${err.message}`);
    }
}

console.log(`\nDone. Processed: ${processed}, Errors: ${errors}`);
