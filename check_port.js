const { Client } = require('ssh2');
const fs = require('fs');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('lsof -i :3000', (err, stream) => {
    stream.on('close', () => conn.end())
          .on('data', (d) => process.stdout.write(d))
          .stderr.on('data', (d) => process.stderr.write(d));
  });
}).connect({
  host: 'peptidex.app',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync('C:/Users/ender/.ssh/id_ed25519')
});
