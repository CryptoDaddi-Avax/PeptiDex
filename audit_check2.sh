#!/bin/bash
echo "=== STACK SLUG AUDIT ==="
for p in \
  /stacks/fat-loss-focus-stack \
  /stacks/injury-recovery-stack \
  /stacks/body-recomposition-stack \
  /stacks/longevity-anti-aging-stack \
  /stacks/mental-clarity-cognitive-stack \
  /stacks/muscle-growth-stack \
  /stacks/immune-support-stack \
  /stacks/deep-sleep-recovery-stack \
  /stacks/skin-aesthetic-rejuvenation-stack \
  /stacks/gut-health-recovery-stack \
  /stacks/metabolic-insulin-sensitivity-stack \
  /stacks/hormonal-optimization-stack-male; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done

echo ""
echo "=== VENDOR COMPARE SLUGS ==="
for p in \
  /compare/vendors/limitless-life-nootropics \
  /compare/vendors/peptide-sciences \
  /compare/vendors/swisschems; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done

echo ""
echo "=== API ROUTES ==="
for p in \
  /api/og \
  /api/contact; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done

echo ""
echo "=== 404 CHECK ==="
code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005/this-does-not-exist)
echo "$code  /this-does-not-exist (should be 404)"
