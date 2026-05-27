const { Client } = require('ssh2');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const cmds = `
curl -I http://localhost:3005/blog/best-peptide-stack-injury-recovery
curl -I http://localhost:3005/vendors/amino-club/bpc-157
`;

const conn = new Client();
conn.on('ready', () => {
    conn.exec(cmds, (err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
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
