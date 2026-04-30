#!/bin/bash
pages=(
  "/" "/peptides" "/peptides/bpc-157" "/peptides/tb-500" "/peptides/semaglutide"
  "/peptides/cjc-1295" "/peptides/ipamorelin" "/peptides/ghk-cu" "/peptides/tirzepatide"
  "/library" "/library/bpc-157" "/library/blends"
  "/stacks" "/stacks/fat-loss" "/stacks/recovery" "/stacks/anti-aging"
  "/vendors" "/suppliers"
  "/tools" "/tools/calculator" "/tools/halflife" "/tools/interactions" "/tools/compare"
  "/tools/cycle-planner" "/tools/bloodwork" "/tools/coa" "/tools/evidence"
  "/tools/evidence-map" "/tools/pk" "/tools/pricing"
  "/blog" "/blog/bpc-157-vs-tb-500" "/blog/ipamorelin-vs-cjc-1295"
  "/blog/semaglutide-vs-tirzepatide" "/blog/retatrutide-explained"
  "/learn" "/research" "/research/bpc-157" "/research/tb-500"
  "/compare" "/compare/bpc-157-vs-tb-500" "/compare/semaglutide-vs-tirzepatide"
  "/guides/reconstitution"
  "/faq" "/glossary" "/protocol" "/quiz" "/tracker" "/saved" "/results"
  "/buy" "/intro" "/practitioners" "/disclaimer" "/legal"
  "/redesign" "/redesign-v2"
)
for p in "${pages[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3005$p)
  echo "$code  $p"
done
