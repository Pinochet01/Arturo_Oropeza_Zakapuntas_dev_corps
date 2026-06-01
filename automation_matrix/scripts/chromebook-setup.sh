#!/usr/bin/env bash
# chromebook-setup.sh — Setup SSH tunnel + kaspa access from Chromebook to Ryzen
# Run this ON THE CHROMEBOOK (Debian 13 penguin container)
set -e

RYZEN_IP="${RYZEN_IP:-192.168.1.4}"
RYZEN_USER="arturo_oropeza"
RYZEN_CONNECT="${RYZEN_USER}@${RYZEN_IP}"

echo "=== Chromebook → Ryzen Kaspa Tunnel Setup ==="
echo "Ryzen: ${RYZEN_CONNECT}"
echo ""

# --- 1. Ensure SSH key exists ---
if [ ! -f "$HOME/.ssh/id_ed25519" ] && [ ! -f "$HOME/.ssh/id_rsa" ]; then
    echo "[1/5] Generating SSH key..."
    ssh-keygen -t ed25519 -f "$HOME/.ssh/id_ed25519" -N "" -C "satanasio@penguin"
    echo ">> Copy this key to Ryzen:"
    cat "$HOME/.ssh/id_ed25519.pub"
else
    echo "[1/5] SSH key found, skipping generation"
fi

# --- 2. Test SSH connection ---
echo "[2/5] Testing SSH to Ryzen..."
if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 -o BatchMode=yes "${RYZEN_CONNECT}" "echo OK" 2>/dev/null; then
    echo "   SSH connection: OK"
else
    echo "   SSH connection: FAILED — make sure Ryzen is running and key is authorized"
    echo "   Run this on Ryzen: cat ~/.ssh/chromebook_key.pub >> ~/.ssh/authorized_keys"
    exit 1
fi

# --- 3. Install autossh ---
echo "[3/5] Installing autossh..."
sudo apt-get update -qq && sudo apt-get install -y -qq autossh 2>/dev/null || echo "   autossh already installed"

# --- 4. Create systemd user service ---
echo "[4/5] Creating autossh-kaspa systemd service..."

mkdir -p ~/.config/systemd/user

cat > ~/.config/systemd/user/autossh-kaspa.service << SERVICE
[Unit]
Description=AutoSSH Tunnel Chromebook → Ryzen (Kaspa + Backend)
Documentation=https://github.com/Autossh/autossh
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
Environment="AUTOSSH_GATETIME=0"
Environment="AUTOSSH_POLL=60"
Environment="AUTOSSH_FIRST_POLL=30"
Environment="AUTOSSH_LOGLEVEL=7"
ExecStart=/usr/bin/autossh -M 0 \
  -o StrictHostKeyChecking=no \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -o ExitOnForwardFailure=yes \
  -L 8000:localhost:8080 \
  -L 17110:localhost:17110 \
  -L 16110:localhost:16110 \
  -L 18110:localhost:18110 \
  -R 8022:localhost:22 \
  ${RYZEN_CONNECT}
Restart=always
RestartSec=30
StandardOutput=journal

[Install]
WantedBy=default.target
SERVICE

systemctl --user daemon-reload
systemctl --user enable autossh-kaspa.service
systemctl --user restart autossh-kaspa.service

echo "   autossh-kaspa service installed and started"

# --- 5. Install kaspa-wallet binary on Chromebook (optional) ---
echo "[5/5] Installing rusty-kaspa wallet binary..."
if [ ! -f "$HOME/.local/bin/kaspa-wallet" ]; then
    mkdir -p "$HOME/.local/bin"
    # Try to copy from Ryzen via SSH
    if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 "${RYZEN_CONNECT}" "test -f ~/automation_matrix/bin/kaspa-wallet" 2>/dev/null; then
        scp -o StrictHostKeyChecking=no -o ConnectTimeout=5 "${RYZEN_CONNECT}:~/automation_matrix/bin/kaspa-wallet" "$HOME/.local/bin/kaspa-wallet"
        chmod +x "$HOME/.local/bin/kaspa-wallet"
        echo "   kaspa-wallet copied to ~/.local/bin/"
    else
        echo "   Skipping — kaspa-wallet binary not found on Ryzen"
        echo "   Install manually: https://github.com/kaspanet/rusty-kaspa/releases"
    fi
else
    echo "   kaspa-wallet already installed"
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Port forwards:"
echo "  Chromebook:8000  → Ryzen:8080   (Backend API)"
echo "  Chromebook:17110 → Ryzen:17110  (Kaspa wRPC Borsh — wallet)"
echo "  Chromebook:16110 → Ryzen:16110  (Kaspa gRPC — Go wallet)"
echo "  Chromebook:18110 → Ryzen:18110  (Kaspa wRPC JSON)"
echo "  Ryzen:8022       → Chromebook:22 (reverse SSH)"
echo ""
echo "Test on Chromebook:"
echo "  curl http://localhost:8000/health"
echo "  ~/.local/bin/kaspa-wallet  (interactive CLI)"
echo ""
echo "Kaspa wallet connect commands (inside wallet CLI):"
echo "  server 127.0.0.1:17110"
echo "  network mainnet"
echo "  connect"
echo "  open kaspa"
