const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const BASE = 'C:/Users/ender/.gemini/antigravity/peptide-app';
const REMOTE = '/var/www/peptidex';

const uploads = [
  // Missing Components
  { local: `${BASE}/src/components/auto-link.tsx`, remote: `${REMOTE}/src/components/auto-link.tsx` },
  { local: `${BASE}/src/components/breadcrumbs.tsx`, remote: `${REMOTE}/src/components/breadcrumbs.tsx` },
  { local: `${BASE}/src/components/author-bio.tsx`, remote: `${REMOTE}/src/components/author-bio.tsx` },
  { local: `${BASE}/src/components/share-bar.tsx`, remote: `${REMOTE}/src/components/share-bar.tsx` },
  { local: `${BASE}/src/components/related-posts.tsx`, remote: `${REMOTE}/src/components/related-posts.tsx` },
  { local: `${BASE}/src/components/peptide-faq.tsx`, remote: `${REMOTE}/src/components/peptide-faq.tsx` },
  { local: `${BASE}/src/components/library-callout.tsx`, remote: `${REMOTE}/src/components/library-callout.tsx` },
  { local: `${BASE}/src/components/related-articles.tsx`, remote: `${REMOTE}/src/components/related-articles.tsx` },
  // Data files
  { local: `${BASE}/src/data/peptides.ts`, remote: `${REMOTE}/src/data/peptides.ts` },
  { local: `${BASE}/src/data/blog.ts`, remote: `${REMOTE}/src/data/blog.ts` },
  { local: `${BASE}/src/data/constants.ts`, remote: `${REMOTE}/src/data/constants.ts` },
  // Core pages
  { local: `${BASE}/src/app/library/page.tsx`, remote: `${REMOTE}/src/app/library/page.tsx` },
  { local: `${BASE}/src/app/library/[slug]/page.tsx`, remote: `${REMOTE}/src/app/library/[slug]/page.tsx` },
  { local: `${BASE}/src/app/library/[slug]/client.tsx`, remote: `${REMOTE}/src/app/library/[slug]/client.tsx` },
  { local: `${BASE}/src/app/sitemap.ts`, remote: `${REMOTE}/src/app/sitemap.ts` },
  // Blog index
  { local: `${BASE}/src/app/blog/page.tsx`, remote: `${REMOTE}/src/app/blog/page.tsx` },
  // All 9 updated blog pages
  { local: `${BASE}/src/app/blog/fda-peptide-reclassification-2026/page.tsx`, remote: `${REMOTE}/src/app/blog/fda-peptide-reclassification-2026/page.tsx` },
  { local: `${BASE}/src/app/blog/are-research-peptides-legal/page.tsx`, remote: `${REMOTE}/src/app/blog/are-research-peptides-legal/page.tsx` },
  { local: `${BASE}/src/app/blog/best-peptide-vendors-2026/page.tsx`, remote: `${REMOTE}/src/app/blog/best-peptide-vendors-2026/page.tsx` },
  { local: `${BASE}/src/app/blog/best-peptides-for-fat-loss/page.tsx`, remote: `${REMOTE}/src/app/blog/best-peptides-for-fat-loss/page.tsx` },
  { local: `${BASE}/src/app/blog/bpc-157-vs-tb-500/page.tsx`, remote: `${REMOTE}/src/app/blog/bpc-157-vs-tb-500/page.tsx` },
  { local: `${BASE}/src/app/blog/ghk-cu-breakout-peptide-2026/page.tsx`, remote: `${REMOTE}/src/app/blog/ghk-cu-breakout-peptide-2026/page.tsx` },
  { local: `${BASE}/src/app/blog/how-to-read-a-peptide-coa/page.tsx`, remote: `${REMOTE}/src/app/blog/how-to-read-a-peptide-coa/page.tsx` },
  { local: `${BASE}/src/app/blog/ipamorelin-vs-cjc-1295/page.tsx`, remote: `${REMOTE}/src/app/blog/ipamorelin-vs-cjc-1295/page.tsx` },
  { local: `${BASE}/src/app/blog/oral-peptide-revolution/page.tsx`, remote: `${REMOTE}/src/app/blog/oral-peptide-revolution/page.tsx` },
  // Image
  { local: `${BASE}/public/images/blog/fda_reclassification_2026.png`, remote: `${REMOTE}/public/images/blog/fda_reclassification_2026.png` },
];

const buildCmds = `
set -e
cd ${REMOTE}
echo "Building Next.js..."
npm run build
echo "Restarting PM2..."
pm2 restart peptidex
echo "DEPLOY COMPLETE"
`;

function uploadFile(sftp, local, remote) {
  return new Promise((resolve, reject) => {
    sftp.fastPut(local, remote, (err) => {
      if (err) reject(err);
      else {
        console.log('  OK:', path.basename(local));
        resolve();
      }
    });
  });
}

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH :: Connected');
  conn.exec(`mkdir -p ${REMOTE}/src/app/blog/fda-peptide-reclassification-2026 ${REMOTE}/src/components ${REMOTE}/public/images/blog`, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.sftp((err, sftp) => {
        if (err) throw err;
        console.log('Uploading all files...');
        
        // Upload sequentially to avoid issues
        (async () => {
          for (const f of uploads) {
            if (fs.existsSync(f.local)) {
              await uploadFile(sftp, f.local, f.remote);
            } else {
              console.log('  SKIP (not found):', path.basename(f.local));
            }
          }
          console.log('\nAll files uploaded! Starting build...\n');
          conn.exec(buildCmds, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code) => {
              console.log('\nDeploy finished. Exit code:', code);
              conn.end();
            })
            .on('data', (d) => process.stdout.write(d))
            .stderr.on('data', (d) => process.stderr.write(d));
          });
        })();
      });
    }).on('data', () => {});
  });
}).on('error', (err) => {
  console.error('SSH Error:', err);
}).connect(config);
