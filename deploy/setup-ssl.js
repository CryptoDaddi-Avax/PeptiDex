#!/usr/bin/env node
/**
 * Setup SSL for peptidex.app via Certbot
 * Installs certbot, requests certificate, and auto-configures Nginx
 */
const { Client } = require("ssh2");

const VPS_IP = "76.13.26.209";
const password = process.argv[2];
if (!password) { console.error("Usage: node deploy/setup-ssl.js <ssh-password>"); process.exit(1); }

const sshConfig = { host: VPS_IP, port: 22, username: "root", password, readyTimeout: 30000 };

function sshExec(command, timeoutMs = 60000) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        const timer = setTimeout(() => { conn.end(); reject(new Error(`Timeout: ${command}`)); }, timeoutMs);
        conn.on("ready", () => {
            conn.exec(command, (err, stream) => {
                if (err) { clearTimeout(timer); conn.end(); return reject(err); }
                let out = "", errOut = "";
                stream.on("data", (d) => out += d);
                stream.stderr.on("data", (d) => errOut += d);
                stream.on("close", (code) => {
                    clearTimeout(timer);
                    conn.end();
                    resolve({ code, stdout: out.trim(), stderr: errOut.trim() });
                });
            });
        }).on("error", (e) => { clearTimeout(timer); reject(e); }).connect(sshConfig);
    });
}

async function setup() {
    console.log("🔒 Setting up SSL for peptidex.app\n");

    // Step 1: Install certbot
    console.log("📦 Step 1: Installing Certbot...");
    let r = await sshExec("apt-get update -qq && apt-get install -y -qq certbot python3-certbot-nginx 2>&1 | tail -3", 120000);
    console.log(r.stdout || "   ✓ Certbot installed");

    // Step 2: Check if DNS is pointing to this server
    console.log("\n🔍 Step 2: Checking DNS resolution...");
    r = await sshExec("dig +short peptidex.app A 2>/dev/null || echo 'dig not available'");
    console.log(`   peptidex.app resolves to: ${r.stdout || 'not yet propagated'}`);

    // Step 3: Request SSL certificate
    console.log("\n🔐 Step 3: Requesting SSL certificate...");
    r = await sshExec(
        'certbot --nginx -d peptidex.app -d www.peptidex.app --non-interactive --agree-tos --email admin@peptidex.app --redirect 2>&1',
        120000
    );
    console.log(r.stdout);
    if (r.stderr) console.log(r.stderr);

    if (r.code === 0) {
        console.log("\n✅ SSL configured! https://peptidex.app is ready.");
    } else {
        console.log("\n⚠️  Certbot returned non-zero. This usually means DNS hasn't propagated yet.");
        console.log("   Point your A record to 76.13.26.209, wait a few minutes, then run this again.");
    }

    // Step 4: Verify
    console.log("\n🔍 Step 4: Verifying...");
    r = await sshExec('curl -s -o /dev/null -w "%{http_code}" https://peptidex.app 2>/dev/null || echo "SSL not ready yet"');
    console.log(`   HTTPS status: ${r.stdout}`);
}

setup().catch(e => { console.error("❌ Error:", e.message); process.exit(1); });
