/**
 * add-aeo-cron.js
 * SSHes to the VPS and adds a daily crontab entry for the AEO poll trigger.
 * This is the belt-and-suspenders backup schedule in case Inngest's
 * own scheduler doesn't pick up the cron trigger from the config.
 *
 * Usage: node add-aeo-cron.js
 */
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
echo "=== AEO Cron Setup ==="

# Read CRON_SECRET from .env.local
CRON_SECRET=$(grep '^CRON_SECRET=' /var/www/peptidex/.env.local | cut -d= -f2 | tr -d '"' | tr -d "'")
if [ -z "$CRON_SECRET" ]; then
    echo "ERROR: CRON_SECRET not found in /var/www/peptidex/.env.local"
    exit 1
fi
echo "CRON_SECRET found (length: \${#CRON_SECRET} chars)"

# Show current crontab (root)
echo ""
echo "=== Current crontab ==="
crontab -l 2>/dev/null || echo "(empty crontab)"

# Check if AEO cron entry already exists
if crontab -l 2>/dev/null | grep -q 'aeo-trigger'; then
    echo ""
    echo "AEO cron entry already exists — no change needed."
    crontab -l | grep aeo-trigger
else
    echo ""
    echo "Adding AEO cron entry (daily 10:00 UTC = 6am ET)..."
    
    # Build the cron line
    AEO_CRON="0 10 * * * curl -sf 'https://peptidex.app/api/admin/aeo-trigger?secret=$CRON_SECRET' >> /var/log/aeo-trigger.log 2>&1"
    
    # Add to crontab
    (crontab -l 2>/dev/null; echo "$AEO_CRON") | crontab -
    
    echo "Added: $AEO_CRON"
    echo ""
    echo "=== Updated crontab ==="
    crontab -l
fi

echo ""
echo "=== AEO Cron Setup complete ==="
`;

const conn = new Client();
conn.on('ready', () => {
    console.log('SSH connected. Setting up AEO crontab...\n');
    conn.exec(cmds, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code) => {
            if (code !== 0) {
                console.error(`\n❌ CRON SETUP FAILED — VPS exited with code ${code}`);
                conn.end();
                process.exit(code);
            }
            console.log('\n✅ AEO crontab setup complete.');
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
