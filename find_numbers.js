const fs = require('fs');
const cp = require('child_process');

try {
  const files = cp.execSync('npx ripgrep -g "*.{ts,tsx}" -i "(51|33|6|12|668|10|99)" src/ -l').toString().trim().split('\n');
  for (const file of files) {
    if(!file) continue;
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      const text = line.trim();
      if (text.match(/51/i) || text.match(/33/i) || text.match(/10\s+tool/i) || text.match(/12\s+stack/i) || text.match(/668\s+stud/i) || text.match(/6\s+vendor/i)) {
        console.log(`${file}:${i+1}: ${text}`);
      }
    });
  }
} catch (e) {
  console.error("Error:", e.message);
}
