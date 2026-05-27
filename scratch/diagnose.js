const { Client } = require('ssh2');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const cmds = `
echo "=== 1. Origin Server Check ==="
curl -I -s "http://localhost:3000/blog/best-peptide-stack-injury-recovery"

echo "=== 2. .next Build Check ==="
ls -l /var/www/peptidex/.next/server/app/blog/best-peptide-stack-injury-recovery* || echo "Not found in .next/server/app/blog"
ls -l /var/www/peptidex/.next/server/app/vendors/amino-club/bpc-157* || echo "Not found in .next/server/app/vendors"

echo "=== 3. src/content Check ==="
ls -l /var/www/peptidex/src/content/blog || echo "src/content/blog not found"
`;

const conn = new Client();
conn.on('ready', () => {
    conn.exec(cmds, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code) => {
            conn.end();
        })
        .on('data', d => process.stdout.write(d))
        .stderr.on('data', d => process.stderr.write(d));
    });
}).on('error', err => {
    console.error('SSH Error:', err);
}).connect(config);
