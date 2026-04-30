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
  /blog/oral-peptide-revolution \
  /blog/peptide-stacking-guide \
  /blog/mots-c-mitochondrial-peptide \
  /blog/oral-vs-injectable-peptides \
  /blog/tesamorelin-growth-hormone-peptide-comparison \
  /blog/peptide-stacking-2026-combination-protocols \
  /blog/cjc-1295-vs-sermorelin \
  /blog/fda-peptide-reclassification-patients-providers; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done

echo ""
echo "=== LEARN SLUGS ==="
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/learn/peptide-beginners-guide")
echo "$code  /learn/peptide-beginners-guide"
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/learn/how-to-reconstitute")
echo "$code  /learn/how-to-reconstitute"

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
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/vs/semaglutide-vs-tirzepatide")
echo "$code  /vs/semaglutide-vs-tirzepatide"

echo ""
echo "=== LIBRARY BLENDS SLUGS ==="
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/library/blends/bpc-tb-blend")
echo "$code  /library/blends/bpc-tb-blend"
