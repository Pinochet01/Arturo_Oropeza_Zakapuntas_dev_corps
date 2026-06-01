#!/usr/bin/env bash
set -e

echo "=== Chromebook Zrok Tunnel Setup ==="

RYZEN_IP="${RYZEN_IP:-192.168.1.4}"
RYZEN_USER="arturo_oropeza"

# 1. Sync zrok binary
echo "[1/5] Syncing zrok from Ryzen..."
scp -o StrictHostKeyChecking=no -o ConnectTimeout=5 \
  "${RYZEN_USER}@${RYZEN_IP}:~/.local/bin/zrok" \
  "$HOME/.local/bin/zrok" 2>/dev/null || {
    echo "   Downloading zrok..."
    curl -sL "https://github.com/openziti/zrok/releases/download/v2.0.4/zrok_2.0.4_linux_amd64.tar.gz" \
      -o /tmp/zrok.tar.gz
    tar -xzf /tmp/zrok.tar.gz -C /tmp/ 2>/dev/null
    mkdir -p "$HOME/.local/bin"
    mv /tmp/zrok "$HOME/.local/bin/zrok" 2>/dev/null || mv /tmp/zrok2 "$HOME/.local/bin/zrok" 2>/dev/null
    chmod +x "$HOME/.local/bin/zrok"
    rm -f /tmp/zrok.tar.gz
}
chmod +x "$HOME/.local/bin/zrok"
echo "   zrok: $($HOME/.local/bin/zrok version 2>&1 | head -1)"

# 2. Enable zrok (token from env, not hardcoded)
echo "[2/5] Enabling zrok..."
"$HOME/.local/bin/zrok" disable 2>/dev/null || true
if [ -n "$ZROK_TOKEN" ]; then
  "$HOME/.local/bin/zrok" enable "$ZROK_TOKEN"
else
  echo "   Set ZROK_TOKEN env var or add to ~/.zrok2/environment.json"
fi

# 3. Setup SSH key
echo "[3/5] Checking SSH key..."
if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
    ssh-keygen -t ed25519 -f "$HOME/.ssh/id_ed25519" -N "" -C "satanasio@penguin"
fi

# 4. Install services
echo "[4/5] Installing systemd services..."
mkdir -p "$HOME/.config/systemd/user"
cp "$(dirname "$0")/autossh-kaspa.service" "$HOME/.config/systemd/user/"
cp "$(dirname "$0")/zrok-tunnel.service" "$HOME/.config/systemd/user/"
systemctl --user daemon-reload
systemctl --user enable autossh-kaspa.service zrok-tunnel.service

# 5. Start services
echo "[5/5] Starting services..."
systemctl --user restart autossh-kaspa.service
sleep 3
systemctl --user restart zrok-tunnel.service

echo ""
echo "=== Ready ==="
echo "Check: systemctl --user status autossh-kaspa"
echo "       systemctl --user status zrok-tunnel"
echo "Test:  curl http://localhost:8000/health"
