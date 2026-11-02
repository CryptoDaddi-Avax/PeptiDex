#!/bin/bash
# Weekly PMID integrity audit, run by the root crontab every Sunday 03:00 UTC.
# cron-call.sh loads CRON_SECRET from .env.local and keeps it out of argv/ps.
exec /var/www/peptidex/scripts/cron-call.sh GET /api/cron/pmid-weekly-audit /var/log/peptidex-pmid-audit.log
