#!/usr/bin/env node
/**
 * coa-cron.js — PeptiDex COA Crawler Scheduler
 * =============================================
 * Runs as a separate PM2 process on the VPS.
 * Uses node-cron (already in package.json) to call the
 * internal cron endpoint weekly.
 *
 * PM2 setup (run once on VPS):
 *   pm2 start scripts/coa-cron.js --name "peptidex-cron" --no-autorestart
 *   pm2 save
 *
 * Schedule: Every Monday at 06:00 UTC
 *   COA crawl:       Mon 06:00 UTC
 *   Refresh views:   Mon 07:00 UTC  (after crawl)
 *   Reminders:       Tue 09:00 UTC
 *
 * All jobs call the Next.js app on localhost:3000, so the app
 * must already be running. Passes CRON_SECRET via Authorization header.
 */

const cron = require("node-cron");
const http = require("http");

const APP_BASE = process.env.CRON_APP_BASE_URL || "http://localhost:3000";
const SECRET = process.env.CRON_SECRET;

if (!SECRET) {
    console.error("[cron] ❌ CRON_SECRET env var not set. Exiting.");
    process.exit(1);
}

/** Fire an internal GET request and log the result */
async function callEndpoint(path) {
    const url = `${APP_BASE}${path}`;
    const start = Date.now();
    try {
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${SECRET}` },
            signal: AbortSignal.timeout(310_000), // 5 min 10s
        });
        const body = await res.json();
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        if (res.ok) {
            console.log(`[cron] ✅ ${path} → ${res.status} (${elapsed}s)`, JSON.stringify(body).slice(0, 200));
        } else {
            console.error(`[cron] ❌ ${path} → ${res.status} (${elapsed}s)`, body);
        }
    } catch (err) {
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        console.error(`[cron] 💥 ${path} failed after ${elapsed}s:`, err.message);
    }
}

// ── COA Crawl — Mon 06:00 UTC ─────────────────────────────────────────────
cron.schedule("0 6 * * 1", async () => {
    console.log(`[cron] 🔍 Starting COA crawl — ${new Date().toISOString()}`);
    await callEndpoint("/api/cron/coa-crawl");
}, { timezone: "UTC" });

// ── Refresh Materialized Views — Mon 07:00 UTC ────────────────────────────
cron.schedule("0 7 * * 1", async () => {
    console.log(`[cron] 🔄 Refreshing materialized views — ${new Date().toISOString()}`);
    await callEndpoint("/api/cron/refresh-views");
}, { timezone: "UTC" });

// ── Protocol Log Reminders — Tue 09:00 UTC ───────────────────────────────
cron.schedule("0 9 * * 2", async () => {
    console.log(`[cron] 📧 Sending protocol log reminders — ${new Date().toISOString()}`);
    await callEndpoint("/api/cron/reminders");
}, { timezone: "UTC" });

console.log("[cron] 🟢 PeptiDex cron scheduler started.");
console.log("[cron]    COA crawl:        Mon 06:00 UTC");
console.log("[cron]    Refresh views:    Mon 07:00 UTC");
console.log("[cron]    Log reminders:    Tue 09:00 UTC");
console.log(`[cron]    App target:       ${APP_BASE}`);
