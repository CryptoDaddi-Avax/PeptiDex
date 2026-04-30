#!/bin/bash
echo "=== ABOUT PAGES ==="
for p in /about /about/editorial-policy; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005${p})
  echo "${code}  ${p}"
done
