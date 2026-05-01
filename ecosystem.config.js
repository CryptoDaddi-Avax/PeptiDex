/**
 * PM2 Ecosystem File for PeptiDex Background Services
 * =====================================================
 * 
 * Includes:
 * 1. Main Next.js application
 * 2. BLL Price Scraper (runs every 4 hours)
 * 
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 logs bll-scraper
 *   pm2 restart bll-scraper
 */

module.exports = {
  apps: [
    {
      name: "peptidex",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: "/home/deploy/peptide-app",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "bll-scraper",
      script: "npx",
      args: "tsx scripts/scrape-bll-prices.ts",
      cwd: "/home/deploy/peptide-app",
      instances: 1,
      autorestart: false,
      // Run every 4 hours: 0 */4 * * *
      cron_restart: "0 */4 * * *",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
      // Log output for debugging
      error_file: "/home/deploy/peptide-app/logs/bll-scraper-error.log",
      out_file: "/home/deploy/peptide-app/logs/bll-scraper-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      // Merge stdout and stderr into one file
      merge_logs: true,
      // Don't start immediately — wait for first cron trigger
      // Set to false if you want an initial run on pm2 start
      stop_exit_codes: [0],
    },
  ],
};
