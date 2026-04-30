#!/bin/bash
echo "=== LEARN SLUGS (PEPTIDE-BASED) ==="
for p in /learn/bpc-157 /learn/tb-500 /learn/semaglutide /learn/ipamorelin /learn/ghk-cu /learn/tirzepatide; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done

echo ""
echo "=== API/OG WITH VERBOSE ==="
curl -s -v "http://localhost:3005/api/og?type=default" -o /dev/null 2>&1 | grep "< HTTP"

echo ""
echo "=== LEARN PAGE ITSELF ==="
code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005/learn)
echo "$code  /learn"

echo ""
echo "=== LEARN CONTENT CHECK ==="
curl -s http://localhost:3005/learn | grep -i "<title>"
