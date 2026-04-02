const { Client } = require('ssh2');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const conn = new Client();
conn.on('ready', () => {
    conn.exec('ls -la /var/www && pm2 list', (err, stream) => {
        if (err) throw err;
        let out = '';
        stream.on('close', () => { conn.end(); console.log(out); })
        .on('data', data => out += data.toString())
        .stderr.on('data', data => out += data.toString());
    });
}).on('error', err => {
    console.error('SSH Error:', err);
}).connect(config);
