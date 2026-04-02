import os
import re

# 1. Update scraper/main.py
with open("scraper/main.py", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(LIVE_BASE_DATA = \[)([\s\S]*?)(\n])", text)
if m:
    prefix = m.group(1)
    body = m.group(2)
    suffix = m.group(3)

    # Split objects by "    }," or "    }"
    blocks = re.split(r"},\s*(?=\{)", body.strip() + "}")
    
    # Filter and clean
    valid_blocks = []
    for b in blocks:
        if "Dihexa" in b:
            continue
        cleaned = b.strip()
        if cleaned.endswith("}") and not cleaned.endswith(","):
            valid_blocks.append(cleaned)
        elif cleaned.endswith("}") and cleaned.endswith(","):
            valid_blocks.append(cleaned[:-1])

    def get_name(blk):
        match = re.search(r'"name":\s*"([^"]+)"', blk)
        return match.group(1).lower() if match else ""

    valid_blocks.sort(key=get_name)
    
    new_body = ",\n    ".join(valid_blocks)
    new_text = text[:m.start()] + prefix + "\n    " + new_body + suffix + text[m.end():]
    with open("scraper/main.py", "w", encoding="utf-8") as f:
        f.write(new_text)
    print("Updated scraper/main.py")

# 2. Update src/data/peptides.ts
with open("src/data/peptides.ts", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(export const peptidesData: Peptide\[\] = \[)([\s\S]*?)(\n];)", text)
if m:
    prefix = m.group(1)
    body = m.group(2)
    suffix = m.group(3)

    blocks = re.split(r"^\s+(?=\{)", "\n" + body, flags=re.MULTILINE)[1:] # start from 1 since 0 is empty
    
    valid_blocks = []
    for b in blocks:
        if "name: \"Dihexa\"" in b or "name: 'Dihexa'" in b:
            continue
        cleaned = b.strip()
        if cleaned.endswith(","):
             cleaned = cleaned[:-1]
        valid_blocks.append(cleaned)

    def get_name_ts(blk):
        match = re.search(r'name:\s*["\']([^"\']+)["\']', blk)
        return match.group(1).lower() if match else ""

    valid_blocks.sort(key=get_name_ts)
    
    new_body = ",\n    ".join(valid_blocks)
    new_text = text[:m.start()] + prefix + "\n    " + new_body + suffix + text[m.end():]
    with open("src/data/peptides.ts", "w", encoding="utf-8") as f:
        f.write(new_text)
    print("Updated src/data/peptides.ts")

# 3. Modify src/app/tools/pricing/page.tsx to sort alphabetically by default
with open("src/app/tools/pricing/page.tsx", "r", encoding="utf-8") as f:
    text = f.read()
text = text.replace('useState<SortKey>("cost_per_dose")', 'useState<SortKey>("name")')
with open("src/app/tools/pricing/page.tsx", "w", encoding="utf-8") as f:
    f.write(text)
print("Updated pricing sort default.")

# 4. Modify src/app/library/page.tsx to ensure rendering alphabetically, although we sorted the base array.
# The array is map()'ed so sorting peptides.ts directly achieves alphabetization.
