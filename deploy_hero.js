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
  { local: `${BASE}/src/components/redesign/Hero.tsx`, remote: `${REMOTE}/src/components/redesign/Hero.tsx` },
  { local: `${BASE}/src/components/redesign/Hero.css`, remote: `${REMOTE}/src/components/redesign/Hero.css` }
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
  console.log('SSH :: Connected for Hero deploy');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    console.log('Uploading Hero files...');
    (async () => {
      for (const f of uploads) {
        if (fs.existsSync(f.local)) {
          await uploadFile(sftp, f.local, f.remote);
        } else {
          console.log('  SKIP (not found):', path.basename(f.local));
        }
      }
      console.log('\nAll files uploaded! Starting remote build...\n');
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
}).on('error', (err) => {
  console.error('SSH Error:', err);
}).connect(config);
