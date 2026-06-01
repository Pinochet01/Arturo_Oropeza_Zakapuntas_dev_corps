#!/usr/bin/env bash
set -e

CHROMEBOOK_IP="${1:-192.168.1.3}"
CHROMEBOOK_USER="satanasio"
CHROMEBOOK_REVERSE_PORT="8022"
FILES_DIR="$(cd "$(dirname "$0")/../chromebook" && pwd)"
REMOTE_HOME="/home/${CHROMEBOOK_USER}"

echo "=== Sync files to Chromebook ==="
echo "Target: ${CHROMEBOOK_USER}@${CHROMEBOOK_IP}"
echo ""

sync_file() {
    local src="$1"
    local dest="$2"
    local desc="$3"
    echo "  [${desc}] ${src} -> ${dest}"
    scp -o StrictHostKeyChecking=no -o ConnectTimeout=5 \
        "${src}" "${CHROMEBOOK_USER}@${CHROMEBOOK_IP}:${dest}" 2>/dev/null && \
        echo "    OK" || echo "    FAILED"
}

sync_rsync() {
    local src="$1"
    local dest="$2"
    local desc="$3"
    echo "  [${desc}] ${src} -> ${dest}"
    rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5" \
        "${src}" "${CHROMEBOOK_USER}@${CHROMEBOOK_IP}:${dest}" 2>/dev/null && \
        echo "    OK" || echo "    FAILED"
}

try_ssh() {
    ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 -o BatchMode=yes \
        "${1}" "${2}" 2>/dev/null
}

# Try reverse tunnel first
if try_ssh "${CHROMEBOOK_USER}@127.0.0.1" -p "${CHROMEBOOK_REVERSE_PORT}" "echo OK" 2>/dev/null; then
    echo "[INFO] Connected via reverse SSH tunnel (port ${CHROMEBOOK_REVERSE_PORT})"
    CHROMEBOOK_TARGET="${CHROMEBOOK_USER}@127.0.0.1"
    SSH_OPTS="-p ${CHROMEBOOK_REVERSE_PORT}"
elif try_ssh "${CHROMEBOOK_USER}@${CHROMEBOOK_IP}" "echo OK" 2>/dev/null; then
    echo "[INFO] Connected via direct SSH"
    CHROMEBOOK_TARGET="${CHROMEBOOK_USER}@${CHROMEBOOK_IP}"
    SSH_OPTS=""
else
    echo "[FATAL] Cannot reach Chromebook. Is the Debian container (penguin) running?"
    echo "  Start it by opening the Terminal app on the Chromebook."
    exit 1
fi

# Sync systemd services
echo ""
echo "=== Syncing systemd user services ==="
scp -o StrictHostKeyChecking=no ${SSH_OPTS} \
    "${FILES_DIR}/autossh-kaspa.service" \
    "${CHROMEBOOK_TARGET}:${REMOTE_HOME}/.config/systemd/user/autossh-kaspa.service"
scp -o StrictHostKeyChecking=no ${SSH_OPTS} \
    "${FILES_DIR}/zrok-tunnel.service" \
    "${CHROMEBOOK_TARGET}:${REMOTE_HOME}/.config/systemd/user/zrok-tunnel.service"

# Sync zrok binary
echo ""
echo "=== Syncing zrok v2.0.4 binary ==="
scp -o StrictHostKeyChecking=no ${SSH_OPTS} \
    "$HOME/.local/bin/zrok" \
    "${CHROMEBOOK_TARGET}:${REMOTE_HOME}/.local/bin/zrok"

# Sync zrok environment
echo ""
echo "=== Syncing zrok environment ==="
ssh -o StrictHostKeyChecking=no ${SSH_OPTS} ${CHROMEBOOK_TARGET} "mkdir -p ${REMOTE_HOME}/.zrok"
scp -o StrictHostKeyChecking=no ${SSH_OPTS} \
    "$HOME/.zrok2/environment.json" \
    "${CHROMEBOOK_TARGET}:${REMOTE_HOME}/.zrok/environment.json"
scp -o StrictHostKeyChecking=no ${SSH_OPTS} \
    "$HOME/.zrok2/metadata.json" \
    "${CHROMEBOOK_TARGET}:${REMOTE_HOME}/.zrok/metadata.json"

# Sync setup script
echo ""
echo "=== Syncing zrok tunnel start script ==="
mkdir -p /tmp/chromebook-sync
cp "${FILES_DIR}/zrok-tunnel-start.sh" /tmp/chromebook-sync/
chmod +x /tmp/chromebook-sync/zrok-tunnel-start.sh
scp -o StrictHostKeyChecking=no ${SSH_OPTS} \
    /tmp/chromebook-sync/zrok-tunnel-start.sh \
    "${CHROMEBOOK_TARGET}:${REMOTE_HOME}/zrok-tunnel-start.sh"
rm -rf /tmp/chromebook-sync

# Reload and restart services
echo ""
echo "=== Reloading systemd and restarting services ==="
ssh -o StrictHostKeyChecking=no ${SSH_OPTS} ${CHROMEBOOK_TARGET} "
    chmod +x ${REMOTE_HOME}/.local/bin/zrok ${REMOTE_HOME}/zrok-tunnel-start.sh
    systemctl --user daemon-reload
    systemctl --user restart autossh-kaspa.service
    sleep 3
    systemctl --user restart zrok-tunnel.service
    echo ''
    echo '=== Service Status ==='
    systemctl --user status autossh-kaspa.service --no-pager -l 2>&1 | head -10
    echo ''
    systemctl --user status zrok-tunnel.service --no-pager -l 2>&1 | head -10
"

echo ""
echo "=== Sync Complete ==="
echo ""
echo "Now run the setup on the Chromebook:"
echo "  ssh ${CHROMEBOOK_TARGET} 'bash ~/zrok-tunnel-start.sh'"
