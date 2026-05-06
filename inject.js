const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'app', 'tools');
const dirs = fs.readdirSync(toolsDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== 'calculator' && d.name !== 'cycle-planner')
    .map(d => d.name);

dirs.forEach(dir => {
    const pagePath = path.join(toolsDir, dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');
        
        if (!content.includes('buildSoftwareApplicationSchema')) {
            const toolName = dir.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            
            // Inject import if not exists
            if (!content.includes('@/lib/schema')) {
                const lastImportIndex = content.lastIndexOf('import ');
                const endOfLastImport = content.indexOf('\n', lastImportIndex);
                if (endOfLastImport !== -1) {
                    content = content.slice(0, endOfLastImport) + '\nimport { buildSoftwareApplicationSchema } from "@/lib/schema";' + content.slice(endOfLastImport);
                }
            } else {
                 if (!content.includes('buildSoftwareApplicationSchema')) {
                      content = content.replace('import { ', 'import { buildSoftwareApplicationSchema, ');
                 }
            }
            
            // Let's replace the export default function line to inject the schema
            // We find "export default function XXX() {"
            const regex = /export default function ([a-zA-Z0-9_]+)\(\)\s*\{/g;
            const match = regex.exec(content);
            if (match) {
                const funcName = match[1];
                const schemaCode = `\n    const softwareSchema = buildSoftwareApplicationSchema({\n        name: "PeptiDex ${toolName}",\n        description: "${toolName} tool on PeptiDex.",\n        url: "https://peptidex.app/tools/${dir}",\n        applicationCategory: "UtilityApplication"\n    });\n`;
                
                content = content.replace(match[0], match[0] + schemaCode);
                
                // Now we need to inject the script.
                // It's safest to inject it right after the first `return (` and its opening element
                // But pages have different structures.
                // Let's look for "return (" and insert right after it. But we need a fragment if there isn't one.
                // Since this is hard, let's just do it manually for the remaining 8 files!
            }
        }
    }
});
