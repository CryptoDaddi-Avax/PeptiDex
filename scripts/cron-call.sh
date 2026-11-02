#!/bin/bash
# Calls a PeptiDex cron/admin endpoint with CRON_SECRET from .env.local.
# The secret is passed to curl on stdin (-K -) via the printf builtin, so it
# never appears in the crontab, in argv, or in ps output.
#
# Usage: cron-call.sh <METHOD> <path> <logfile>
#   e.g. cron-call.sh POST /api/cron/send-sequence /var/log/peptidex-sequence.log
# PEPTIDEX_BASE_URL overrides the target (default https://peptidex.app).
set -uo pipefail

METHOD="$1"
ENDPOINT="$2"
LOG="$3"
ENV_FILE=/var/www/peptidex/.env.local
BASE_URL="${PEPTIDEX_BASE_URL:-https://peptidex.app}"
NOW=$(date -u +%FT%TZ)

CRON_SECRET=$(sed -n 's/^CRON_SECRET=//p' "$ENV_FILE" | tr -d "\r\"'")
if [ -z "$CRON_SECRET" ]; then
  echo "$NOW $METHOD $ENDPOINT ERROR: CRON_SECRET not found in $ENV_FILE" >> "$LOG"
  exit 1
fi

BODY=$(mktemp)
trap 'rm -f "$BODY"' EXIT

STATUS=$(printf 'header = "Authorization: Bearer %s"\n' "$CRON_SECRET" \
  | curl -s -K - -X "$METHOD" -o "$BODY" -w '%{http_code}' --max-time 900 "$BASE_URL$ENDPOINT")

{
  echo "$NOW $METHOD $ENDPOINT HTTP $STATUS"
  head -c 2000 "$BODY"
  echo
} >> "$LOG"

[ "${STATUS:0:1}" = "2" ]
