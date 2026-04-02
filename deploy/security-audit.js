#!/usr/bin/env node
/**
 * Security audit for peptidex.app
 * Checks SSL, headers, open ports, server info, and Nginx config
 */
const { Client } = require("ssh2");

const VPS_IP = "76.13.26.209";
const password = process.argv[2];
if (!password) { console.error("Usage: node deploy/security-audit.js <ssh-password>"); process.exit(1); }

const sshConfig = { host: VPS_IP, port: 22, username: "root", password, readyTimeout: 30000 };

function sshExec(command, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        const timer = setTimeout(() => { conn.end(); resolve({ code: -1, stdout: "TIMEOUT", stderr: "" }); }, timeoutMs);
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

async function audit() {
    console.log("🔒 PeptiDex Security Audit\n" + "=".repeat(50) + "\n");

    // 1. SSL Certificate
    console.log("📜 1. SSL CERTIFICATE");
    let r = await sshExec('echo | openssl s_client -connect peptidex.app:443 -servername peptidex.app 2>/dev/null | openssl x509 -noout -dates -subject -issuer 2>/dev/null');
    console.log(r.stdout || "   Could not check");
    console.log();

    // 2. TLS Version Support
    console.log("🔐 2. TLS VERSION SUPPORT");
    for (const ver of ["tls1", "tls1_1", "tls1_2", "tls1_3"]) {
        r = await sshExec(`echo | openssl s_client -connect peptidex.app:443 -${ver} 2>&1 | grep -i "protocol\\|error\\|no peer" | head -2`);
        const supported = r.stdout.includes("error") || r.stdout.includes("no peer") ? "❌ BLOCKED" : "✅ SUPPORTED";
        console.log(`   ${ver}: ${supported}`);
    }
    console.log();

    // 3. HTTP Security Headers
    console.log("🛡️  3. HTTP SECURITY HEADERS");
    r = await sshExec('curl -sI https://peptidex.app 2>/dev/null');
    const headers = r.stdout;
    console.log(headers);
    console.log();

    const headerChecks = [
        { name: "X-Frame-Options", recommended: "SAMEORIGIN" },
        { name: "X-Content-Type-Options", recommended: "nosniff" },
        { name: "Referrer-Policy", recommended: "strict-origin-when-cross-origin" },
        { name: "Strict-Transport-Security", recommended: "max-age=31536000" },
        { name: "X-XSS-Protection", recommended: "1; mode=block" },
        { name: "Content-Security-Policy", recommended: "default-src 'self'" },
        { name: "Permissions-Policy", recommended: "camera=(), microphone=()" },
    ];

    console.log("   Header Analysis:");
    for (const h of headerChecks) {
        const found = headers.toLowerCase().includes(h.name.toLowerCase());
        console.log(`   ${found ? "✅" : "❌"} ${h.name}: ${found ? "PRESENT" : "MISSING — recommend: " + h.recommended}`);
    }
    console.log();

    // 4. Server Info Disclosure
    console.log("🕵️  4. SERVER INFO DISCLOSURE");
    const serverHeader = headers.match(/^server: (.+)$/im);
    if (serverHeader) {
        console.log(`   ⚠️  Server header reveals: "${serverHeader[1].trim()}"`);
        console.log(`   Recommend: Add "server_tokens off;" to nginx.conf`);
    } else {
        console.log("   ✅ Server header hidden");
    }
    console.log();

    // 5. HTTP → HTTPS Redirect
    console.log("🔄 5. HTTP → HTTPS REDIRECT");
    r = await sshExec('curl -sI http://peptidex.app 2>/dev/null | head -5');
    const redirects = r.stdout.includes("301") || r.stdout.includes("302");
    console.log(`   ${redirects ? "✅" : "❌"} HTTP redirect: ${r.stdout.split("\n")[0]}`);
    console.log();

    // 6. Open Ports
    console.log("🔌 6. OPEN PORTS SCAN");
    r = await sshExec('ss -tlnp | grep LISTEN');
    console.log(r.stdout);
    console.log();

    // 7. SSH Config
    console.log("🗝️  7. SSH CONFIGURATION");
    r = await sshExec('grep -E "^(PasswordAuthentication|PermitRootLogin|Port |MaxAuthTries)" /etc/ssh/sshd_config 2>/dev/null || echo "Could not read sshd_config"');
    console.log(`   ${r.stdout}`);
    console.log();

    // 8. Firewall Status
    console.log("🧱 8. FIREWALL STATUS");
    r = await sshExec('ufw status 2>/dev/null || echo "UFW not installed"');
    console.log(`   ${r.stdout}`);
    console.log();

    // 9. Nginx Config Check
    console.log("⚙️  9. NGINX CONFIG SECURITY");
    r = await sshExec('cat /etc/nginx/sites-available/peptidex');
    console.log(r.stdout);
    console.log();

    // 10. Directory Listing
    console.log("📂 10. DIRECTORY LISTING CHECK");
    r = await sshExec('curl -s -o /dev/null -w "%{http_code}" https://peptidex.app/_next/ 2>/dev/null');
    console.log(`   /_next/ status: ${r.stdout} ${r.stdout === "403" || r.stdout === "404" ? "✅ Protected" : "⚠️ Check if directory listing is disabled"}`);

    console.log("\n" + "=".repeat(50));
    console.log("🔒 Audit complete.\n");
}

audit().catch(e => { console.error("Error:", e.message); process.exit(1); });
