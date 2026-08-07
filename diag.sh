#!/bin/bash
set -e

for route in home faq legal; do
  echo "=== MARKERS: $route ==="
  for marker in "redesign-content" "page-header" "nav-logo" "GlobalShell" "ScrollReveal" ".reveal"; do
    pc=$(grep -oc "$marker" /tmp/preview-${route}.html 2>/dev/null || echo 0)
    lc=$(grep -oc "$marker" /tmp/live-${route}.html 2>/dev/null || echo 0)
    echo "  $marker  preview=$pc  live=$lc"
  done
done

echo ""
echo "=== CLASS DIFF: /faq ==="
diff <(grep -oE 'class="[^"]*"' /tmp/preview-faq.html | sort -u) \
     <(grep -oE 'class="[^"]*"' /tmp/live-faq.html | sort -u) | head -50

echo ""
echo "=== CLASS DIFF: /legal ==="
diff <(grep -oE 'class="[^"]*"' /tmp/preview-legal.html | sort -u) \
     <(grep -oE 'class="[^"]*"' /tmp/live-legal.html | sort -u) | head -50

echo ""
echo "=== layout.tsx (first 60 lines) ==="
head -60 /var/www/peptide-app-preview/src/app/layout.tsx
