# Deployment

PeptiDex deploys to a Hostinger VPS via git-pull. Vercel is NOT used.

## Standard deploy command

```bash
npm run deploy
```

This SSHs into the VPS, pulls the latest `main` branch from GitHub, runs
`npm run build`, and restarts the PM2 process. It can never serve stale code.

## Prerequisites

- SSH key at `C:/Users/ender/.ssh/id_ed25519` (local machine → VPS)
- GitHub deploy key at `/root/.ssh/peptidex_deploy` (VPS → GitHub)
- VPS SSH config at `/root/.ssh/config` routes `github.com` to the deploy key

## Full workflow after making changes

```bash
git add -A
git commit -m "feat: describe your change"
git push origin main
npm run deploy
```

## What `npm run deploy` does (step by step)

1. SSH into `peptidex.app:22` as `root` using `~/.ssh/id_ed25519`
2. `cd /var/www/peptidex`
3. Ensures git remote is `git@github.com:CryptoDaddi-Avax/PeptiDex.git` (SSH, not HTTPS)
4. `git fetch origin main && git reset --hard origin/main`
5. `npm install --prefer-offline`
6. `rm -rf .next && npm run build`
7. `pm2 restart peptidex --update-env`

Exits with code 1 and prints `❌ DEPLOY FAILED` if any step fails.

## Fallback: tarball deploy (backup only)

```bash
npm run deploy:tarball
```

Regenerates `sync.tar.gz` from current `src/` and uploads it to the VPS,
then builds and restarts. Use this only if git-pull is unavailable.
**Do NOT run `node sync_deploy.js` directly** — it won't regenerate the tarball first.

## VPS details

| Property | Value |
|----------|-------|
| Host | `peptidex.app` |
| User | `root` |
| App directory | `/var/www/peptidex` |
| PM2 process name | `peptidex` (ID 12) |
| Node version | v20.20.2 |
| PM2 command | `pm2 restart peptidex --update-env` |

## Environment variables

`.env.local` is **not** committed to git and **not** uploaded by the deploy script.
The VPS reads it from `/var/www/peptidex/.env.local`.

Required variables on the VPS:

| Variable | Purpose |
|----------|---------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | PeptiDex AI Advisor (Gemini) |

To update env vars on the VPS, SSH in manually and edit `/var/www/peptidex/.env.local`,
then run `pm2 restart peptidex --update-env`.

## Checking production status

```bash
# View live PM2 status
node -e "
const {Client}=require('ssh2'),fs=require('fs');
const c=new Client();
c.on('ready',()=>c.exec('pm2 list',(e,s)=>{s.on('data',d=>process.stdout.write(d));s.on('close',()=>c.end())}))
 .connect({host:'peptidex.app',port:22,username:'root',privateKey:fs.readFileSync('C:/Users/ender/.ssh/id_ed25519')});
"
```

Or simply open https://peptidex.app in a browser.
