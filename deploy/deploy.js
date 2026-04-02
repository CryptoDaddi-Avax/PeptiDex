#!/usr/bin/env node
/**
 * PeptidePal VPS Deploy Script
 * Uses ssh2 + ssh2-sftp-client for reliable password-based SCP upload.
 *
 * Usage:  node deploy/deploy.js <ssh-password>
 * Example: node deploy/deploy.js MyPassword123
 */

const SftpClient = require("ssh2-sftp-client");
const { Client } = require("ssh2");
const path = require("path");
const fs = require("fs");

const VPS_IP = "76.13.26.209";
const VPS_USER = "root";
const REMOTE_DIR = "/var/www/peptidex";
const OUT_DIR = path.join(__dirname, "..", "out");
const NGINX_SRC = path.join(__dirname, "nginx.conf");

// Prefer SSH key auth; fallback to password if key not found
const home = process.env.USERPROFILE || process.env.HOME;
const keyPaths = [
    path.join(home, ".ssh", "id_ed25519"),
    path.join(home, ".ssh", "id_rsa"),
];
const privateKeyPath = keyPaths.find(p => fs.existsSync(p));
const password = process.argv[2];

if (!privateKeyPath && !password) {
    console.error("No SSH key found and no password provided.");
    console.error("Usage: node deploy/deploy.js [optional-ssh-password]");
    process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) {
    console.error("❌ /out directory not found. Run `npx next build` first.");
    process.exit(1);
}

const sshConfig = {
    host: VPS_IP, port: 22, username: VPS_USER, readyTimeout: 30000,
    ...(privateKeyPath ? { privateKey: fs.readFileSync(privateKeyPath) } : { password }),
};

// ─── Helper: run a remote command ───────────────────────────────────────────
function sshExec(command) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on("ready", () => {
            conn.exec(command, (err, stream) => {
                if (err) { conn.end(); return reject(err); }
                let out = "", errOut = "";
                stream.on("data", (d) => out += d);
                stream.stderr.on("data", (d) => errOut += d);
                stream.on("close", (code) => {
                    conn.end();
                    if (code !== 0) return reject(new Error(`Command failed (exit ${code}): ${errOut || out}`));
                    resolve(out.trim());
                });
            });
        }).on("error", reject).connect(sshConfig);
    });
}

const { execSync } = require('child_process');

async function deploy() {
    console.log("🚀 PeptidePal VPS Deploy\n");

    // ─── Step 1: Compress Output & Prepare Remote ──────────────────────────
    console.log("📁 Step 1/4: Packaging output & preparing remote directory...");
    try {
        console.log("   Archiving out directory locally...");
        execSync(`tar -czf deploy.tar.gz -C "${OUT_DIR}" .`);
    } catch (e) {
        console.error("Failed to archive out/: ", e);
        process.exit(1);
    }
    await sshExec(`mkdir -p ${REMOTE_DIR}`);
    await sshExec(`rm -rf ${REMOTE_DIR}/*`);
    console.log("   ✓ Local archive created & remote directory cleaned\n");

    // ─── Step 2: SFTP — upload tarball ───────────────────────────────────────
    console.log("📤 Step 2/4: Uploading archive... (this is fast!)");
    const sftp = new SftpClient();
    await sftp.connect(sshConfig);
    const tarPathLocal = path.join(__dirname, "..", "deploy.tar.gz");
    const tarPathRemote = `${REMOTE_DIR}/deploy.tar.gz`;
    await sftp.put(tarPathLocal, tarPathRemote);
    await sftp.end();
    
    // Extract remotely
    console.log("   Extracting on server...");
    await sshExec(`tar -xzf ${tarPathRemote} -C ${REMOTE_DIR}`);
    await sshExec(`rm ${tarPathRemote}`);
    
    // Clean up locally
    try { fs.unlinkSync(tarPathLocal); } catch(e){}
    console.log("   ✓ Static payload published\n");

    // ─── Step 3: SFTP — upload Nginx config ──────────────────────────────────
    console.log("⚙️  Step 3/4: Installing Nginx config...");
    const sftp2 = new SftpClient();
    await sftp2.connect(sshConfig);
    await sftp2.put(NGINX_SRC, "/etc/nginx/sites-available/peptidex");
    await sftp2.end();

    // Enable the site and reload
    await sshExec("ln -sf /etc/nginx/sites-available/peptidex /etc/nginx/sites-enabled/peptidex");
    await sshExec("nginx -t");
    await sshExec("systemctl reload nginx");
    console.log("   ✓ Nginx configured and reloaded\n");

    // ─── Step 4: Verify ──────────────────────────────────────────────────────
    console.log("🔍 Step 4/4: Verifying deployment...");
    const curlResult = await sshExec(`curl -s -o /dev/null -w "%{http_code}" http://localhost`);
    const status = curlResult.trim();
    if (status === "200") {
        console.log("   ✓ HTTP 200 OK — site is live!\n");
    } else {
        console.warn(`   ⚠️  HTTP ${status} — check Nginx logs: journalctl -u nginx\n`);
    }

    console.log(`✅ Deployed! Visit: http://${VPS_IP}`);
}

deploy().catch((err) => {
    console.error("\n❌ Deploy failed:", err.message);
    process.exit(1);
});
