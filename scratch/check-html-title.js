const { Client } = require('ssh2');
const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('C:/Users/ender/.ssh/id_ed25519'),
};
const conn = new Client();
conn.on('ready', () => {
    conn.exec('head -n 50 /var/www/peptidex/.next/server/app/blog/how-to-read-peptide-coa.html | grep -o "<title>[^<]*</title>"', (err, stream) => {
        stream.on('close', () => conn.end()).on('data', d => process.stdout.write(d));
    });
}).connect(config);
