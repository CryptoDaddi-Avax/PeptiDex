#!/bin/bash
# Expect 200 for live pages, 410 (no redirect hop) for removed pages.
BASE="${BASE:-http://localhost:3005}"

pages=(
  "/" "/peptides" "/peptides/bpc-157" "/peptides/tb-500"
  "/peptides/cjc-1295" "/peptides/ipamorelin" "/peptides/ghk-cu"
  "/library" "/library/bpc-157" "/library/blends"
  "/stacks" "/stacks/recovery" "/stacks/anti-aging"
  "/vendors" "/suppliers"
  "/tools" "/tools/halflife" "/tools/interactions" "/tools/compare"
  "/tools/cycle-planner" "/tools/bloodwork" "/tools/coa" "/tools/evidence"
  "/tools/evidence-map" "/tools/pk" "/tools/pricing"
  "/blog" "/blog/bpc-157-vs-tb-500" "/blog/ipamorelin-vs-cjc-1295"
  "/learn" "/research" "/research/bpc-157" "/research/tb-500"
  "/compare" "/compare/bpc-157-vs-tb-500"
  "/faq" "/glossary" "/protocol" "/quiz" "/tracker" "/saved" "/results"
  "/buy" "/intro" "/practitioners" "/disclaimer" "/legal"
  "/redesign" "/redesign-v2"
)
echo "=== EXPECTED 200 ==="
for p in "${pages[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$p")
  echo "$code  $p"
done

# Removed pages: middleware (src/lib/gone-paths.ts) must answer 410 directly.
# A 301/308 here is a failure (redirect hop before the 410).
gone=(
  "/guides/reconstitution" "/blog/peptide-reconstitution-guide" "/beginners-guide"
  "/blog/bpc-157-dosage-complete-guide" "/blog/bpc-157-complete-guide"
  "/tools/calculator" "/tools/reconstitution-calculator"
  "/guides/glp1-alternatives"
  "/blog/oral-peptide-revolution" "/blog/oral-vs-injectable-peptides"
  "/compare/oral-vs-injectable-peptides" "/blog/best-peptides-for-fat-loss"
  "/best/fat-loss" "/best/metabolic-health" "/goals/fat-loss" "/goals/metabolic-health"
  "/stacks/fat-loss-focus-stack" "/stacks/metabolic-insulin-sensitivity-stack"
  "/blog/retatrutide-explained" "/blog/tirzepatide-vs-semaglutide-which-is-better"
  "/blog/semaglutide-vs-tirzepatide"
  "/compare/semaglutide-vs-tirzepatide" "/vs/semaglutide-vs-tirzepatide"
  "/coa/retatrutide-RT0001.pdf" "/coa/cagrilintide-CAG0001.pdf"
)
for c in retatrutide tirzepatide semaglutide cagrilintide tesofensine; do
  gone+=("/library/$c" "/learn/$c" "/logs/$c" "/peptides/$c" "/peptides/$c/at/amino-club"
         "/buy/$c" "/where-to-buy/$c" "/vendors/amino-club/$c")
done

echo ""
echo "=== EXPECTED 410 (no redirect) ==="
fail=0
for p in "${gone[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$p")
  if [ "$code" = "410" ]; then status="OK"; else status="FAIL"; fail=$((fail+1)); fi
  echo "$code  $status  $p"
done
echo ""
echo "410 failures: $fail"
