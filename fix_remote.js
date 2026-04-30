const { Client } = require('ssh2');
const fs = require('fs');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('cd /var/www/peptidex; rm -rf src/app/blog/are-peptides-safe src/app/blog/are-research-peptides-legal src/app/blog/best-peptide-vendors-2026 src/app/blog/best-peptides-for-fat-loss src/app/blog/best-peptides-for-muscle-growth src/app/blog/bpc-157-vs-tb-500 src/app/blog/how-to-read-a-peptide-coa src/app/blog/peptide-stacking-guide src/app/blog/semaglutide-vs-tirzepatide; rm -rf .next; npm run build; pm2 restart peptidex', (err, stream) => {
    stream.on('close', () => conn.end())
          .on('data', (d) => process.stdout.write(d))
          .stderr.on('data', (d) => process.stderr.write(d));
  });
}).connect({
  host: 'peptidex.app',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync('C:/Users/ender/.ssh/id_ed25519')
});
