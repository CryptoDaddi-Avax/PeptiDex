const { Client } = require('ssh2');

const config = {
    host: '76.13.26.209',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const cmds = `
set -e
echo "=== PeptiDex Deploy via git-pull ==="

# Ensure we have the target directory
mkdir -p /var/www/peptidex
cd /var/www/peptidex

# Initialize git repo if needed, using SSH URL for key-based auth
if [ ! -d ".git" ]; then
    echo "Initializing git repo..."
    git init
    git remote add origin git@github.com:CryptoDaddi-Avax/PeptiDex.git
fi

# Ensure remote uses SSH URL (fix any legacy HTTPS remote)
existing_remote=$(git remote get-url origin 2>/dev/null || echo "none")
if echo "$existing_remote" | grep -q "https://"; then
    echo "Switching remote from HTTPS to SSH..."
    git remote set-url origin git@github.com:CryptoDaddi-Avax/PeptiDex.git
fi

echo "Pulling latest code from GitHub..."
git fetch origin main
git reset --hard origin/main
echo "Git reset complete. Current HEAD:"
git log --oneline -3

echo "Installing Dependencies..."
npm install --prefer-offline

echo "Building Next.js for production..."
rm -rf .next
npm run build
echo "Build succeeded."

echo "Restarting PM2 Service..."
if pm2 describe peptidex > /dev/null 2>&1 ; then
    pm2 restart peptidex --update-env
else
    pm2 start npm --name "peptidex" -- start
    pm2 save
fi
echo "=== Deploy complete ==="
`;
const conn = new Client();
conn.on('ready', () => {
    console.log('SSH connected. Starting git-pull deploy...\n');
    conn.exec(cmds, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code) => {
            if (code !== 0) {
                console.error(`\n❌ DEPLOY FAILED — VPS exited with code ${code}`);
                conn.end();
                process.exit(code);
            }
            console.log('\n✅ Deploy complete! Production is live.');
            conn.end();
            process.exit(0);
        })
        .on('data', d => process.stdout.write(d))
        .stderr.on('data', d => process.stderr.write(d));
    });
}).on('error', err => {
    console.error('SSH Error:', err);
    process.exit(1);
}).connect(config);
