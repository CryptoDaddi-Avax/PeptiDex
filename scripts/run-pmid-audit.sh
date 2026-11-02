#!/bin/bash
# Loads CRON_SECRET from .env.local — secret never exposed in crontab or ps output
set -a
source /var/www/peptidex/.env.local
set +a

curl -s -X GET \
  -H "Authorization: Bearer ${CRON_SECRET}" \
  "https://peptidex.app/api/cron/pmid-weekly-audit" \
  >> /var/log/peptidex-pmid-audit.log 2>&1
