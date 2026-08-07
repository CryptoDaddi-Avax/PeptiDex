#!/bin/bash

echo "=== 3a. disclaimer.html: mod date ==="
ls -la /var/www/peptide-app-preview/disclaimer.html

echo "=== 3b. :root CSS block ==="
grep -A 30 ':root' /var/www/peptide-app-preview/disclaimer.html | head -35

echo "=== 3c. Google Fonts ==="
grep -oE 'fonts.googleapis.com[^"]*' /var/www/peptide-app-preview/disclaimer.html | head -5

echo "=== 3d. h1 tags ==="
grep -oE '<h1[^>]*>[^<]+</h1>' /var/www/peptide-app-preview/disclaimer.html | head -3

echo ""
echo "=== 3e. faq.html (root-level design ref) ==="
ls -la /var/www/peptide-app-preview/faq.html
grep -A 30 ':root' /var/www/peptide-app-preview/faq.html | head -35
grep -oE 'fonts.googleapis.com[^"]*' /var/www/peptide-app-preview/faq.html | head -5
grep -oE '<h1[^>]*>[^<]+</h1>' /var/www/peptide-app-preview/faq.html | head -3

echo ""
echo "=== 3f. public/redesign.html ==="
ls -la /var/www/peptide-app-preview/public/redesign.html
grep -A 30 ':root' /var/www/peptide-app-preview/public/redesign.html | head -35
grep -oE 'fonts.googleapis.com[^"]*' /var/www/peptide-app-preview/public/redesign.html | head -5
grep -oE '<h1[^>]*>[^<]+</h1>' /var/www/peptide-app-preview/public/redesign.html | head -3

echo ""
echo "=== 4. git log for design-reference files ==="
cd /var/www/peptide-app-preview && git log --all --diff-filter=A --name-only --format="%h %ad %s" --date=short | grep -iE 'design.?ref|redesign.*\.html|_design' | head -20

echo ""
echo "=== 4b. git log: any *.html added to repo ==="
cd /var/www/peptide-app-preview && git log --all --diff-filter=A --name-only --format="%h %ad %s" --date=short | grep '\.html$' | head -20

echo ""
echo "=== KEY: compare design tokens in disclaimer.html vs live globals.css ==="
echo "-- disclaimer.html --ink line --"
grep -E '\-\-ink|\-\-paper|\-\-lime|\-\-gold|\-\-amber|\-\-bg' /var/www/peptide-app-preview/disclaimer.html | head -15
echo "-- live globals.css --ink line --"
grep -E '\-\-ink|\-\-paper|\-\-lime|\-\-gold|\-\-amber|\-\-bg' /var/www/peptidex/src/app/globals.css | head -15
echo "-- preview globals.css --"
grep -E '\-\-ink|\-\-paper|\-\-lime|\-\-gold|\-\-amber|\-\-bg' /var/www/peptide-app-preview/src/app/globals.css | head -15
