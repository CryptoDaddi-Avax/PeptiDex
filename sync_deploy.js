const { Client } = require('ssh2');
const fs = require('fs');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const REMOTE = '/var/www/peptidex';

const conn = new Client();
conn.on('ready', () => {
    console.log('SSH connected. Uploading sync.tar.gz...');
    conn.sftp((err, sftp) => {
        if (err) throw err;
        
        sftp.fastPut('sync.tar.gz', `${REMOTE}/sync.tar.gz`, (err) => {
            if (err) throw err;
            console.log('Upload complete. Extracting and building...');
            
            const cmds = `
set -e
cd ${REMOTE}
tar -xzf sync.tar.gz
rm sync.tar.gz
npm run build
pm2 restart peptidex
`;
            conn.exec(cmds, (err, stream) => {
                if (err) throw err;
                stream.on('close', (code) => {
                    console.log('Build & Deploy complete! Exit code:', code);
                    conn.end();
                }).on('data', (d) => process.stdout.write(d))
                  .stderr.on('data', (d) => process.stderr.write(d));
            });
        });
    });
}).on('error', (err) => {
    console.error('SSH Error:', err);
}).connect(config);
