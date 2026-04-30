#!/bin/bash
echo "=== LEARN SLUGS (PEPTIDE-BASED) ==="
for p in /learn/bpc-157 /learn/tb-500 /learn/semaglutide /learn/ipamorelin; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005${p})
  echo "${code}  ${p}"
done

echo ""
echo "=== API/OG CHECK ==="
code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005/api/og?type=default" --max-time 10)
echo "${code}  /api/og"

echo ""
echo "=== PM2 STATUS ==="
pm2 status
