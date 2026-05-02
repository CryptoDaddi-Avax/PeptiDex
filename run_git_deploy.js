const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH connected. Starting git-pull deploy sequence...\n');

  const cmd = `
set -e
echo "=== STEP 1: Testing GitHub SSH auth ==="
ssh -T git@github.com 2>&1 || true
echo ""

echo "=== STEP 2: Configuring VPS git repo ==="
mkdir -p /var/www/peptidex
cd /var/www/peptidex

# Check if we have a real git repo with commits
if git rev-parse HEAD > /dev/null 2>&1; then
  echo "Existing git repo found with commits."
  # Ensure remote is SSH URL
  git remote set-url origin git@github.com:CryptoDaddi-Avax/PeptiDex.git
  echo "Remote updated to SSH URL."
else
  echo "No valid git history. Reinitializing..."
  rm -rf .git
  git init
  git remote add origin git@github.com:CryptoDaddi-Avax/PeptiDex.git
  echo "Git repo initialized with SSH remote."
fi

echo ""
echo "=== STEP 3: Fetching latest from GitHub ==="
git fetch origin main
git reset --hard origin/main
echo "Current HEAD:"
git log --oneline -5

echo ""
echo "=== STEP 4: Installing dependencies ==="
npm install --prefer-offline

echo ""
echo "=== STEP 5: Building Next.js ==="
rm -rf .next
npm run build

echo ""
echo "=== STEP 6: Restarting PM2 ==="
if pm2 describe peptidex > /dev/null 2>&1; then
  pm2 restart peptidex --update-env
else
  pm2 start npm --name "peptidex" -- start
  pm2 save
fi

echo ""
echo "=== PM2 STATUS ==="
pm2 list
echo ""
echo "=== DEPLOY COMPLETE ==="
`;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream
      .on('close', (code) => {
        if (code !== 0) {
          console.error(`\n❌ DEPLOY FAILED — exit code ${code}`);
        } else {
          console.log('\n✅ Deploy complete! Production is live.');
        }
        conn.end();
        process.exit(code);
      })
      .on('data', d => process.stdout.write(d))
      .stderr.on('data', d => process.stderr.write(d));
  });
}).on('error', e => {
  console.error('SSH Error:', e);
  process.exit(1);
}).connect({
  host: 'peptidex.app',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync('C:/Users/ender/.ssh/id_ed25519'),
  readyTimeout: 10000,
});
