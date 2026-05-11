const { Client } = require('ssh2');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const CRON_SECRET = 'daddi-secret-peptidex123';
const CRON_LINE = `*/15 * * * * curl -s -X POST -H "Authorization: Bearer ${CRON_SECRET}" https://peptidex.app/api/cron/send-sequence >> /var/log/peptidex-sequence.log 2>&1`;

const cmds = `
set -e
echo "Adding welcome sequence cron (every 15 min)..."
( crontab -l 2>/dev/null | grep -v 'send-sequence' ; echo '${CRON_LINE}' ) | crontab -
echo "✅ Done. Current crontab:"
crontab -l
`;

const conn = new Client();
conn.on('ready', () => {
    console.log('SSH connected...\n');
    conn.exec(cmds, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code) => { conn.end(); });
        stream.stdout.on('data', (d) => process.stdout.write(d.toString()));
        stream.stderr.on('data', (d) => process.stderr.write(d.toString()));
    });
});
conn.connect(config);
