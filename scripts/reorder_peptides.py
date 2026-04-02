import os
import re

with open("src/data/peptides.ts", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(export const peptides: Peptide\[\] = \[)([\s\S]*?)(\n];)", text)
if m:
    prefix = m.group(1)
    body = m.group(2)
    suffix = m.group(3)

    # Split using the p({ signature
    blocks = re.split(r"(^\s*p\({)", "\n" + body, flags=re.MULTILINE)[1:] # start from 1 since 0 is empty
    
    # re.split keeps the delimiter if wrapped in parentheses!
    # so blocks[0] = "    p({", blocks[1] = "name: 'BPC-157' ... }),\n"
    # We zip them back together
    paired_blocks = []
    for i in range(0, len(blocks), 2):
        paired_blocks.append(blocks[i] + blocks[i+1])

    valid_blocks = []
    for b in paired_blocks:
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
else:
    print("Could not find the array in peptides.ts!")
