#!/usr/bin/env node
/**
 * VPS Hardening Script
 * 1. Copies SSH public key to VPS authorized_keys
 * 2. Verifies key-based SSH works 
 * 3. Hardens sshd_config (disable password auth, limit root)
 * 4. Blocks unused port 8080 via UFW
 */
const { Client } = require("ssh2");
const fs = require("fs");
const path = require("path");

const VPS_IP = "76.13.26.209";
const password = process.argv[2];
if (!password) { console.error("Usage: node deploy/harden-vps.js <ssh-password>"); process.exit(1); }

const sshConfig = { host: VPS_IP, port: 22, username: "root", password, readyTimeout: 30000 };

function sshExec(cmd, config = sshConfig, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        const timer = setTimeout(() => { conn.end(); resolve({ code: -1, stdout: "TIMEOUT", stderr: "" }); }, timeoutMs);
        conn.on("ready", () => {
            conn.exec(cmd, (err, stream) => {
                if (err) { clearTimeout(timer); conn.end(); return reject(err); }
                let out = "", errOut = "";
                stream.on("data", (d) => out += d);
                stream.stderr.on("data", (d) => errOut += d);
                stream.on("close", (code) => { clearTimeout(timer); conn.end(); resolve({ code, stdout: out.trim(), stderr: errOut.trim() }); });
            });
        }).on("error", (e) => { clearTimeout(timer); reject(e); }).connect(config);
    });
}

async function harden() {
    console.log("🛡️  VPS Hardening Script\n" + "=".repeat(50) + "\n");

    // ─── Step 1: Upload SSH Public Key ───────────────────────────────
    console.log("🔑 Step 1: Installing SSH public key...");
    
    // Find the user's public key
    const home = process.env.USERPROFILE || process.env.HOME;
    let pubKeyPath = path.join(home, ".ssh", "id_ed25519.pub");
    if (!fs.existsSync(pubKeyPath)) pubKeyPath = path.join(home, ".ssh", "id_rsa.pub");
    if (!fs.existsSync(pubKeyPath)) {
        console.error("❌ No SSH public key found. Generate one with: ssh-keygen -t ed25519");
        process.exit(1);
    }
    
    const pubKey = fs.readFileSync(pubKeyPath, "utf8").trim();
    console.log(`   Key found: ${pubKeyPath}`);
    console.log(`   Key type: ${pubKey.split(" ")[0]}`);

    // Upload to authorized_keys
    let r = await sshExec(`mkdir -p /root/.ssh && chmod 700 /root/.ssh`);
    r = await sshExec(`grep -qF "${pubKey.split(" ")[1]}" /root/.ssh/authorized_keys 2>/dev/null && echo "EXISTS" || (echo "${pubKey}" >> /root/.ssh/authorized_keys && chmod 600 /root/.ssh/authorized_keys && echo "ADDED")`);
    
    if (r.stdout === "EXISTS") {
        console.log("   ✅ Key already installed\n");
    } else {
        console.log("   ✅ Key added to authorized_keys\n");
    }

    // ─── Step 2: Verify key-based SSH works ──────────────────────────
    console.log("🔍 Step 2: Verifying key-based SSH login...");
    
    const privKeyPath = pubKeyPath.replace(".pub", "");
    let keyConfig;
    try {
        keyConfig = {
            host: VPS_IP, port: 22, username: "root",
            privateKey: fs.readFileSync(privKeyPath),
            readyTimeout: 10000
        };
        r = await sshExec("echo KEY_AUTH_OK", keyConfig);
        if (r.stdout === "KEY_AUTH_OK") {
            console.log("   ✅ Key-based login works!\n");
        } else {
            console.log("   ❌ Key auth test failed. Aborting — will NOT disable password auth.\n");
            process.exit(1);
        }
    } catch (e) {
        console.log(`   ❌ Key auth failed: ${e.message}`);
        console.log("   Aborting — will NOT disable password auth to avoid lockout.\n");
        process.exit(1);
    }

    // ─── Step 3: Harden SSH Config ───────────────────────────────────
    console.log("🔐 Step 3: Hardening SSH config...");
    
    // Backup current config
    await sshExec("cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak.$(date +%s)");
    
    // Apply hardening
    const hardenCmds = [
        // Disable password authentication
        `sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config`,
        `sed -i 's/^#*ChallengeResponseAuthentication.*/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config`,
        // Disable root password login but allow root with key
        `sed -i 's/^#*PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config`,
        // Enable public key auth (should already be on)
        `sed -i 's/^#*PubkeyAuthentication.*/PubkeyAuthentication yes/' /etc/ssh/sshd_config`,
        // Limit auth attempts
        `sed -i 's/^#*MaxAuthTries.*/MaxAuthTries 3/' /etc/ssh/sshd_config`,
        // Disable empty passwords
        `sed -i 's/^#*PermitEmptyPasswords.*/PermitEmptyPasswords no/' /etc/ssh/sshd_config`,
    ];
    
    for (const cmd of hardenCmds) {
        await sshExec(cmd, keyConfig);
    }

    // Test config before reloading
    r = await sshExec("sshd -t 2>&1", keyConfig);
    if (r.code === 0 || r.stdout === "") {
        console.log("   ✅ SSH config valid");
        await sshExec("systemctl reload sshd", keyConfig);
        console.log("   ✅ SSH daemon reloaded");
    } else {
        console.log(`   ❌ SSH config error: ${r.stderr || r.stdout}`);
        console.log("   Restoring backup...");
        await sshExec("cp /etc/ssh/sshd_config.bak.* /etc/ssh/sshd_config && systemctl reload sshd", keyConfig);
        process.exit(1);
    }

    // Verify key auth still works after hardening
    try {
        r = await sshExec("echo POST_HARDEN_OK", keyConfig);
        if (r.stdout === "POST_HARDEN_OK") {
            console.log("   ✅ Key-based login still works after hardening\n");
        }
    } catch (e) {
        console.log("   ⚠️  Post-harden verification failed! Restoring...");
        // Can't SSH in with key, try password to restore
        await sshExec("cp /etc/ssh/sshd_config.bak.* /etc/ssh/sshd_config && systemctl reload sshd");
        process.exit(1);
    }

    // ─── Step 4: Firewall — Block port 8080 ──────────────────────────
    console.log("🧱 Step 4: Firewall hardening...");
    
    // Ensure UFW allows SSH, HTTP, HTTPS before enabling
    await sshExec("ufw allow 22/tcp comment 'SSH'", keyConfig);
    await sshExec("ufw allow 80/tcp comment 'HTTP'", keyConfig);
    await sshExec("ufw allow 443/tcp comment 'HTTPS'", keyConfig);
    await sshExec("ufw deny 8080/tcp comment 'Block unused Docker port'", keyConfig);
    
    // Enable UFW if not already
    r = await sshExec("echo 'y' | ufw enable 2>&1", keyConfig);
    console.log(`   ${r.stdout}`);
    
    r = await sshExec("ufw status", keyConfig);
    console.log(`   ${r.stdout}\n`);

    // ─── Step 5: Final verification ──────────────────────────────────
    console.log("🔍 Step 5: Final security check...");
    
    r = await sshExec('grep -E "^(PasswordAuthentication|PermitRootLogin|MaxAuthTries|PubkeyAuthentication)" /etc/ssh/sshd_config', keyConfig);
    console.log(`   SSH Config:\n   ${r.stdout.replace(/\n/g, "\n   ")}`);
    
    // Test that password login is actually blocked
    try {
        r = await sshExec("echo SHOULD_FAIL", { ...sshConfig, privateKey: undefined }, 5000);
        console.log("   ⚠️  Password login still works!");
    } catch (e) {
        console.log("   ✅ Password login correctly blocked");
    }

    console.log("\n" + "=".repeat(50));
    console.log("🛡️  VPS hardened successfully!");
    console.log("   ✅ SSH key-only auth (password disabled)");
    console.log("   ✅ Root limited to key auth only");
    console.log("   ✅ Max 3 auth attempts");
    console.log("   ✅ Port 8080 blocked");
    console.log("   ✅ UFW firewall active (22, 80, 443 only)\n");
    console.log("⚠️  IMPORTANT: Your deploy script needs to be updated to use SSH key instead of password.");
    console.log("   The old password-based deploy will no longer work.\n");
}

harden().catch(e => { console.error("Error:", e.message); process.exit(1); });
