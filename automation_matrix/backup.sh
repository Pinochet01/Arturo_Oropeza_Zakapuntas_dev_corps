#!/usr/bin/env bash
# backup.sh — Encrypted backup of wallet keys + client data
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
[ -f "$SCRIPT_DIR/.env" ] && set -a && source "$SCRIPT_DIR/.env" && set +a

BACKUP_DIR="${BACKUP_DIR:-$HOME/automation_matrix/backups}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/automation-matrix-$TIMESTAMP.tar.gz"
ENCRYPTED_FILE="$BACKUP_FILE.gpg"
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

echo "[backup] Creating $BACKUP_FILE ..."
tar czf "$BACKUP_FILE" \
  -C "$HOME" \
  .kaspawallet/ \
  automation_matrix/data/ \
  automation_matrix/config/ \
  automation_matrix/.env \
  automation_matrix/ssl/ 2>/dev/null || true

SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "[backup] Backup: $SIZE"

# Encrypt if GPG key is configured
if [ -n "$BACKUP_GPG_RECIPIENT" ]; then
  gpg --encrypt --recipient "$BACKUP_GPG_RECIPIENT" \
    --output "$ENCRYPTED_FILE" "$BACKUP_FILE" 2>/dev/null && \
    rm "$BACKUP_FILE" && \
    echo "[backup] Encrypted: $ENCRYPTED_FILE" || \
    echo "[backup] GPG encryption skipped (key not found)"
fi

# Clean old backups
find "$BACKUP_DIR" -name "automation-matrix-*.tar.gz*" -mtime +$RETENTION_DAYS -delete

echo "[backup] Done"
