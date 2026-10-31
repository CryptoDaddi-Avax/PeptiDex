#!/bin/bash
echo "=== VENDOR COMPARE PAGES ==="
for p in \
  /compare/vendors/amino-club-vs-ascension-peptides \
  /compare/vendors/amino-club-vs-limitless-life \
  /compare/vendors/ascension-peptides-vs-limitless-life; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done

echo ""
echo "=== API/OG ROUTE ==="
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/api/og?type=default")
echo "$code  /api/og?type=default"

echo ""
echo "=== EXTRA BLOG POSTS ==="
for p in \
  /blog/fda-peptide-reclassification-2026 \
  /blog/ghk-cu-breakout-peptide-2026 \
  /blog/how-to-read-a-peptide-coa \
  /blog/mk-677-vs-ipamorelin \
  /blog/peptide-stacking-guide \
  /blog/mots-c-mitochondrial-peptide \
  /blog/tesamorelin-growth-hormone-peptide-comparison \
  /blog/peptide-stacking-2026-combination-protocols \
  /blog/cjc-1295-vs-sermorelin \
  /blog/fda-peptide-reclassification-patients-providers; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done

echo ""
echo "=== REMOVED PAGES (expect 410, no redirect) ==="
for p in \
  /blog/oral-peptide-revolution \
  /blog/oral-vs-injectable-peptides \
  /vs/semaglutide-vs-tirzepatide; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  if [ "$code" = "410" ]; then s=OK; else s=FAIL; fi
  echo "$code  $s  $p"
done

echo ""
echo "=== LEARN SLUGS ==="
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/learn/peptide-beginners-guide")
echo "$code  /learn/peptide-beginners-guide"

echo ""
echo "=== LEAD PAGES ==="
for p in /lead/cheat-sheet /lead/thank-you; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done

echo ""
echo "=== VS SLUGS ==="
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/vs/bpc-157-vs-tb-500")
echo "$code  /vs/bpc-157-vs-tb-500"

echo ""
echo "=== LIBRARY BLENDS SLUGS ==="
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/library/blends/bpc-tb-blend")
echo "$code  /library/blends/bpc-tb-blend"
