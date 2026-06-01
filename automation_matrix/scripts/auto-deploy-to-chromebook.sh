#!/usr/bin/env bash
# auto-deploy-to-chromebook.sh — Watch for Chromebook connection and auto-sync
set -e

CHROMEBOOK_IP="192.168.1.3"
CHROMEBOOK_USER="satanasio"
REVERSE_PORT="8022"
POLL_INTERVAL="${POLL_INTERVAL:-10}"
MAX_RETRIES="${MAX_RETRIES:-1000}"

SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
SYNC_SCRIPT="${SCRIPTS_DIR}/sync-to-chromebook.sh"

log() { echo "[$(date '+%H:%M:%S')] $*"; }

log "Watching for Chromebook connection..."
log "  Direct:  ${CHROMEBOOK_USER}@${CHROMEBOOK_IP}:22"
log "  Reverse: ${CHROMEBOOK_USER}@127.0.0.1:${REVERSE_PORT}"
log "  Poll interval: ${POLL_INTERVAL}s"
log ""

retry=0
while [ $retry -lt $MAX_RETRIES ]; do
    retry=$((retry + 1))

    if (echo >/dev/tcp/127.0.0.1/${REVERSE_PORT}) 2>/dev/null; then
        log "REVERSE TUNNEL DETECTED on port ${REVERSE_PORT}!"
        log "Running sync..."
        bash "${SYNC_SCRIPT}"
        log "Sync complete. Watching for disconnects..."
        # Watch for disconnect
        while (echo >/dev/tcp/127.0.0.1/${REVERSE_PORT}) 2>/dev/null; do
            sleep "${POLL_INTERVAL}"
        done
        log "Chromebook disconnected. Resuming watch..."
        retry=0
    elif (echo >/dev/tcp/${CHROMEBOOK_IP}/22) 2>/dev/null; then
        log "DIRECT SSH DETECTED on ${CHROMEBOOK_IP}:22!"
        log "Running sync..."
        bash "${SYNC_SCRIPT}"
        log "Sync complete. Watching for disconnects..."
        while (echo >/dev/tcp/${CHROMEBOOK_IP}/22) 2>/dev/null; do
            sleep "${POLL_INTERVAL}"
        done
        log "Chromebook disconnected. Resuming watch..."
        retry=0
    fi

    sleep "${POLL_INTERVAL}"
done

log "Max retries (${MAX_RETRIES}) reached. Exiting."
