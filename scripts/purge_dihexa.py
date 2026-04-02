import os
import re
import glob

def clean_dihexa():
    # 1. Purge all simple array elements like "Dihexa",
    for root, _, files in os.walk('src'):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()

                orig = content
                # array references
                content = re.sub(r',\s*["\']Dihexa["\']', '', content, flags=re.IGNORECASE)
                content = re.sub(r'["\']Dihexa["\']\s*,', '', content, flags=re.IGNORECASE)
                content = re.sub(r'\[\s*["\']Dihexa["\']\s*\]', '[]', content, flags=re.IGNORECASE)
                
                # dict keys like "dihexa": { ... } in coa and pk
                content = re.sub(r'\n\s*["\']dihexa["\']:.*?,\n', '\n', content, flags=re.IGNORECASE)
                
                # Stacks references - whole objects containing dihexa
                content = re.sub(r'\s*\{\s*name:\s*["\']Dihexa["\'].*?\},', '', content, flags=re.IGNORECASE)
                content = re.sub(r'\s*\{\s*description:\s*["\']Dihexa.*?\},', '', content, flags=re.IGNORECASE)

                # Goal pages peptideSlugs list
                content = re.sub(r',\s*["\']dihexa["\']', '', content, flags=re.IGNORECASE)
                content = re.sub(r'["\']dihexa["\']\s*,', '', content, flags=re.IGNORECASE)

                # Legal status
                content = re.sub(r'\s*\{\s*peptide_name:\s*["\']Dihexa["\'][\s\S]*?\]\s*\},', '', content, flags=re.IGNORECASE)
                
                # Glossary related
                content = re.sub(r'\s*\{\s*term:\s*["\'].*?Dihexa.*?\}[\s\S]*?\},', '', content, flags=re.IGNORECASE)

                if orig != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Purged Dihexa refs in {path}")

    # 2. Sort peptides.ts array
    path = "src/data/peptides.ts"
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Extract the peptides array correctly by matching top level p({ ... })
    m = re.search(r"(export const peptides: Peptide\[\] = \[)([\s\S]*?)(\n];)", text)
    if m:
        prefix = m.group(1)
        body = m.group(2)
        suffix = m.group(3)
        
        # Manually split on the pattern that starts an item
        blocks = []
        current = []
        for line in body.split('\n'):
            if line.strip() == "p({":
                if current:
                    blocks.append('\n'.join(current))
                current = [line]
            else:
                current.append(line)
        if current:
            blocks.append('\n'.join(current))
            
        valid_blocks = []
        for b in blocks:
            if "name: \"Dihexa\"" in b or "name: 'Dihexa'" in b:
                continue
            cleaned = b.strip()
            if cleaned.endswith(","):
                 cleaned = cleaned[:-1]
            valid_blocks.append(cleaned)

        def get_name(blk):
            match = re.search(r'name:\s*["\']([^"\']+)["\']', blk)
            return match.group(1).lower() if match else ""

        valid_blocks.sort(key=get_name)
        new_body = ",\n    ".join(valid_blocks)
        new_text = text[:m.start()] + prefix + "\n    " + new_body + suffix + text[m.end():]
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_text)
        print("Sorted peptides.ts")
            
clean_dihexa()
