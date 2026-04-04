const { Client } = require('ssh2');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const cmds = `
set -e
echo "Connecting to VPS to pull and build from GitHub..."

# Ensure we have the target directory
mkdir -p /var/www/peptidex
cd /var/www/peptidex

# Initialize git if needed to pull down the repository
if [ ! -d ".git" ]; then
    git init
    git remote add origin https://github.com/CryptoDaddi-Avax/PeptiDex.git
fi

echo "Pulling latest code from GitHub..."
git fetch origin main || git fetch --all
git reset --hard origin/main

echo "Installing Dependencies..."
npm install

echo "Building Next.js for production..."
npm run build

echo "Restarting PM2 Service..."
if pm2 show peptidex > /dev/null ; then
    pm2 restart peptidex
else
    pm2 start npm --name "peptidex" -- start
    pm2 save
fi
`;
const conn = new Client();
conn.on('ready', () => {
    conn.exec(cmds, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code) => {
            console.log('Done! Exit code:', code);
            conn.end();
            process.exit(code);
        })
        .on('data', d => process.stdout.write(d))
        .stderr.on('data', d => process.stderr.write(d));
    });
}).on('error', err => {
    console.error('SSH Error:', err);
}).connect(config);
