#!/bin/bash
set -e

echo "=== IMAGE OPTIMIZATION SCRIPT ==="

# Blog images
cd /var/www/peptidex/public/images/blog
echo "--- Blog images (before) ---"
ls -lh *.png

echo "--- Converting PNGs to WebP (quality 80) ---"
for f in *.png; do
  cwebp -q 80 -m 6 "$f" -o "${f%.png}.webp"
  echo "  OK: $f -> ${f%.png}.webp"
done

echo "--- Blog images (after) ---"
ls -lh

# Logo and OG image
cd /var/www/peptidex/public
echo ""
echo "--- Root assets (before) ---"
ls -lh logo.png og-image.png icon.png splash.png

echo "--- Converting root assets to WebP ---"
cwebp -q 85 -m 6 logo.png -o logo.webp && echo "  OK: logo.webp"
cwebp -q 85 -m 6 og-image.png -o og-image.webp && echo "  OK: og-image.webp"
cwebp -q 85 -m 6 icon.png -o icon.webp && echo "  OK: icon.webp"
cwebp -q 85 -m 6 splash.png -o splash.webp && echo "  OK: splash.webp"

echo "--- Root assets (after) ---"
ls -lh logo.png logo.webp og-image.png og-image.webp icon.png splash.png

echo ""
echo "=== DONE ==="
