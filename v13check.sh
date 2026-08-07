#!/bin/bash

echo "=== 1. ls _design-reference/v13/ ==="
ls /var/www/peptide-app-preview/_design-reference/v13/ | head -20

echo ""
echo "=== 2. :root tokens from index.html ==="
grep -A 30 ':root' /var/www/peptide-app-preview/_design-reference/v13/index.html | head -40

echo ""
echo "=== 3. Token checks ==="
for token in "0B0D10\|0b0d10" "F2EEE5\|f2eee5" "C4F25C\|c4f25c" "1A3C3A\|1a3c3a" "--lime" "--teal" "--ink" "--paper" "Geist" "geist"; do
  count=$(grep -ic "$token" /var/www/peptide-app-preview/_design-reference/v13/index.html || echo 0)
  echo "  '$token'  count=$count"
done

echo ""
echo "=== 4. HTML file counts ==="
echo "Total HTML files:"
find /var/www/peptide-app-preview/_design-reference/v13/ -name "*.html" | wc -l

echo ""
echo "Per subfolder:"
for dir in /var/www/peptide-app-preview/_design-reference/v13/*/; do
  name=$(basename "$dir")
  count=$(find "$dir" -name "*.html" | wc -l)
  echo "  $name/  $count html files"
done

echo ""
echo "Root-level HTML files:"
find /var/www/peptide-app-preview/_design-reference/v13/ -maxdepth 1 -name "*.html" | wc -l
