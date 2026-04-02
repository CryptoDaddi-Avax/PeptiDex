const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');

console.log("[CRON] Initializing Scrapling Automation. Schedule: Every 6 hours ('0 */6 * * *')");

// Every 6 hours at minute 0
cron.schedule('0 */6 * * *', () => {
    console.log(`[CRON] Triggering Python Scrapling sync at ${new Date().toISOString()}`);
    
    // Command navigates to the scraper directory, activates venv, and runs the main brain.
    // Adjust logic based on your production server (Linux: source venv/bin/activate)
    const pythonScript = path.join(__dirname, '..', 'scraper', 'main.py');
    const venvActivate = process.platform === 'win32' 
            ? 'cd scraper && .\\venv\\Scripts\\activate && python main.py' 
            : 'cd scraper && source venv/bin/activate && python3 main.py';

    exec(venvActivate, (error, stdout, stderr) => {
        if (error) {
            console.error(`[CRON ERROR] Exec error: ${error}`);
            return;
        }
        if (stderr && stderr.includes("Error")) {
            console.error(`[CRON STDERR] ${stderr}`);
        }
        console.log(`[CRON OUTPUT]\n${stdout}`);
    });
});

console.log("[CRON] Service active. Awaiting first scheduled interval...");
