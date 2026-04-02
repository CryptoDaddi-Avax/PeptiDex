#!/usr/bin/env node
/**
 * Upload hardened Nginx config and reload
 */
const SftpClient = require("ssh2-sftp-client");
const { Client } = require("ssh2");
const path = require("path");

const VPS_IP = "76.13.26.209";
const password = process.argv[2];
if (!password) { console.error("Usage: node deploy/update-nginx.js <pass>"); process.exit(1); }
const sshConfig = { host: VPS_IP, port: 22, username: "root", password, readyTimeout: 30000 };

function sshExec(cmd) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on("ready", () => {
            conn.exec(cmd, (err, stream) => {
                if (err) { conn.end(); return reject(err); }
                let out = "", errOut = "";
                stream.on("data", (d) => out += d);
                stream.stderr.on("data", (d) => errOut += d);
                stream.on("close", (code) => { conn.end(); resolve({ code, stdout: out.trim(), stderr: errOut.trim() }); });
            });
        }).on("error", reject).connect(sshConfig);
    });
}

async function run() {
    console.log("⚙️  Uploading hardened Nginx config...");
    const sftp = new SftpClient();
    await sftp.connect(sshConfig);
    await sftp.put(path.join(__dirname, "nginx.conf"), "/etc/nginx/sites-available/peptidex");
    await sftp.end();
    console.log("   ✓ Config uploaded");

    console.log("🔍 Testing config...");
    let r = await sshExec("nginx -t 2>&1");
    console.log("   " + (r.stdout || r.stderr));

    if (r.stderr.includes("successful") || r.stdout.includes("successful")) {
        console.log("🔄 Reloading Nginx...");
        await sshExec("systemctl reload nginx");
        console.log("   ✓ Nginx reloaded");

        console.log("\n🔍 Post-fix header check:");
        r = await sshExec('curl -sI https://peptidex.app 2>/dev/null | grep -iE "^(strict|x-frame|x-content|x-xss|referrer|content-security|permissions|server:)" | sort');
        console.log(r.stdout);
    } else {
        console.log("❌ Config test failed! Not reloading.");
    }
}

run().catch(e => { console.error("Error:", e.message); process.exit(1); });
