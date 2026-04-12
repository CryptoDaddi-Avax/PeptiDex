const { Client } = require('ssh2');
const fs = require('fs');

const config = {
    host: 'peptidex.app',
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync('C:/Users/ender/.ssh/id_ed25519'),
    readyTimeout: 10000,
};

const conn = new Client();
conn.on('ready', () => {
  console.log('Connected, downloading build log...');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    sftp.fastGet('/tmp/build_out.txt', 'C:/Users/ender/.gemini/antigravity/peptide-app/remote_build.log', (err) => {
      if (err) { console.error('Download error:', err); }
      else { console.log('Downloaded to remote_build.log'); }
      conn.end();
    });
  });
}).on('error', (err) => {
  console.error('SSH Error:', err);
}).connect(config);
