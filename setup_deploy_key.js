const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH connected. Generating deploy key...');

  // Use a shell script written to a temp file to avoid heredoc quoting issues
  const cmd = `
set -e
# Generate key (idempotent — skip if already exists)
if [ ! -f ~/.ssh/peptidex_deploy ]; then
  ssh-keygen -t ed25519 -C "peptidex-vps-deploy" -f ~/.ssh/peptidex_deploy -N ""
  echo "Key generated."
else
  echo "Key already exists, skipping keygen."
fi

echo ""
echo "=== PUBLIC KEY (copy this to GitHub) ==="
cat ~/.ssh/peptidex_deploy.pub
echo "========================================="
echo ""

# Write SSH config
cat > ~/.ssh/config << 'SSHEOF'
Host github.com
  Hostname github.com
  IdentityFile ~/.ssh/peptidex_deploy
  IdentitiesOnly yes
  StrictHostKeyChecking no
SSHEOF

chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/peptidex_deploy
echo "SSH config written and permissions set."
echo ""
echo "=== CURRENT SSH CONFIG ==="
cat ~/.ssh/config
echo "=========================="
`;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream
      .on('close', (code) => {
        if (code !== 0) {
          console.error(`\n❌ Script failed with exit code ${code}`);
        } else {
          console.log('\n✅ Deploy key setup complete.');
          console.log('Next: Add the public key above to GitHub repo → Settings → Deploy Keys.');
        }
        conn.end();
      })
      .on('data', d => process.stdout.write(d))
      .stderr.on('data', d => process.stderr.write(d));
  });
}).on('error', e => {
  console.error('SSH Error:', e);
}).connect({
  host: 'peptidex.app',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync('C:/Users/ender/.ssh/id_ed25519'),
  readyTimeout: 10000,
});
