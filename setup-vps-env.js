const { Client } = require('ssh2');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const ENV_FILE = '/var/www/peptidex/.env.local';

// The three secrets
const ADMIN_ANALYTICS_SECRET = 'mypeptidex-admin-2026';
const CRON_SECRET            = 'daddi-secret-peptidex123';
const ANALYTICS_EMAIL_TO     = 'cdkol@proton.me';

// Cron: fire at 07:00 UTC every day
const CRON_LINE = `0 7 * * * curl -s -X POST -H "Authorization: Bearer ${CRON_SECRET}" https://peptidex.app/api/cron/affiliate-report >> /var/log/peptidex-cron.log 2>&1`;

const cmds = `
set -e

echo "=== Step 1: Writing env vars to .env.local ==="
cd /var/www/peptidex

# Remove any old values for these keys (idempotent)
sed -i '/^ADMIN_ANALYTICS_SECRET=/d' ${ENV_FILE}
sed -i '/^CRON_SECRET=/d' ${ENV_FILE}
sed -i '/^ANALYTICS_EMAIL_TO=/d' ${ENV_FILE}

# Append new values
echo 'ADMIN_ANALYTICS_SECRET=${ADMIN_ANALYTICS_SECRET}' >> ${ENV_FILE}
echo 'CRON_SECRET=${CRON_SECRET}' >> ${ENV_FILE}
echo 'ANALYTICS_EMAIL_TO=${ANALYTICS_EMAIL_TO}' >> ${ENV_FILE}

echo "✅ Env vars written. Current analytics-related entries:"
grep -E 'ADMIN_ANALYTICS|CRON_SECRET|ANALYTICS_EMAIL' ${ENV_FILE}

echo ""
echo "=== Step 2: Installing crontab entry ==="

# Remove any old peptidex cron line, then add the new one
( crontab -l 2>/dev/null | grep -v 'affiliate-report' ; echo '${CRON_LINE}' ) | crontab -

echo "✅ Crontab updated. Current crontab:"
crontab -l

echo ""
echo "=== Step 3: Restart PM2 to pick up new env vars ==="
pm2 restart peptidex --update-env

echo ""
echo "✅ All done! Summary:"
echo "  Dashboard: https://peptidex.app/admin/analytics?key=${ADMIN_ANALYTICS_SECRET}"
echo "  Daily report will fire at 07:00 UTC → ${ANALYTICS_EMAIL_TO}"
`;

const conn = new Client();
conn.on('ready', () => {
    console.log('SSH connected. Configuring VPS...\n');
    conn.exec(cmds, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code) => {
            console.log(`\nExit code: ${code}`);
            conn.end();
        });
        stream.stdout.on('data', (d) => process.stdout.write(d.toString()));
        stream.stderr.on('data', (d) => process.stderr.write(d.toString()));
    });
});
conn.on('error', (err) => { console.error('SSH error:', err.message); });
conn.connect(config);
