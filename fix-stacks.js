const fs = require('fs');

let b = fs.readFileSync('src/data/stacks.ts', 'utf8');

const prefix = `import { Stack } from "./types";

function slug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const rawStacks: Omit<Stack, "slug">[] = [`;

b = b.replace('import { Stack } from "./types";\n\nexport const stacks: Stack[] = [', prefix);

b = b.replace(/];[\s\n]*$/, '];\n\nexport const stacks: Stack[] = rawStacks.map(s => ({ ...s, slug: slug(s.stack_name) }));\n');

fs.writeFileSync('src/data/stacks.ts', b);
