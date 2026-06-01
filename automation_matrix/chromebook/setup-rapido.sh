#!/bin/bash
set -e
echo "=== Chromebook Setup Rapido ==="

# 1. Crear dirs
mkdir -p ~/.local/bin ~/chromebook ~/.ssh ~/.config/systemd/user

# 2. Copiar llave SSH para acceso sin password
echo "[1/6] SSH key..."
if [ ! -f ~/.ssh/id_ed25519 ]; then
    ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N "" -C "satanasio@penguin"
fi
echo "   Llave publica (copia al Ryzen si no esta):"
cat ~/.ssh/id_ed25519.pub

# 3. Bajar zrok
echo "[2/6] Descargando zrok..."
curl -sL "https://github.com/openziti/zrok/releases/download/v2.0.4/zrok_2.0.4_linux_amd64.tar.gz" -o /tmp/zrok.tar.gz
tar -xzf /tmp/zrok.tar.gz -C /tmp/
mv /tmp/zrok ~/.local/bin/zrok 2>/dev/null || mv /tmp/zrok2 ~/.local/bin/zrok 2>/dev/null
chmod +x ~/.local/bin/zrok
rm -f /tmp/zrok.tar.gz
echo "   zrok: $(~/.local/bin/zrok version 2>&1 | head -1)"

# 4. Habilitar zrok
echo "[3/6] Habilitando zrok..."
export ZROK_TOKEN="UsA9KEgiNAiC"
~/.local/bin/zrok disable 2>/dev/null || true
~/.local/bin/zrok enable "$ZROK_TOKEN"

# 5. Instalar servicios systemd
echo "[4/6] Instalando servicios..."
cat > ~/.config/systemd/user/autossh-tunnel.service << 'UNIT'
[Unit]
Description=AutoSSH Chromebook → Ryzen
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
Environment="AUTOSSH_GATETIME=0"
Environment="AUTOSSH_POLL=30"
Environment="AUTOSSH_FIRST_POLL=5"
ExecStart=/usr/bin/autossh -M 0 \
  -o StrictHostKeyChecking=no \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -L 8000:localhost:8080 \
  -R 8022:localhost:22 \
  arturo_oropeza@192.168.1.4
Restart=always
RestartSec=10
StandardOutput=journal

[Install]
WantedBy=default.target
UNIT

cat > ~/.config/systemd/user/zrok-tunnel.service << 'UNIT'
[Unit]
Description=Zrok Public Tunnel
After=network-online.target autossh-tunnel.service
Wants=network-online.target autossh-tunnel.service

[Service]
Type=simple
Environment="PATH=%h/.local/bin:/usr/local/bin:/usr/bin:/bin"
ExecStartPre=/bin/bash -c 'until curl -sf http://127.0.0.1:8000/health >/dev/null 2>&1; do sleep 5; done'
ExecStart=%h/.local/bin/zrok share public http://127.0.0.1:8000 --headless
Restart=always
RestartSec=10
StandardOutput=journal

[Install]
WantedBy=default.target
UNIT

systemctl --user daemon-reload
systemctl --user enable autossh-tunnel.service zrok-tunnel.service

# 6. Arrancar
echo "[5/6] Arrancando tunel SSH..."
systemctl --user restart autossh-tunnel.service
sleep 3

echo "[6/6] Arrancando zrok..."
systemctl --user restart zrok-tunnel.service
sleep 3

echo ""
echo "=== STATUS ==="
systemctl --user status autossh-tunnel.service --no-pager -l 2>&1 | head -5
echo ""
systemctl --user status zrok-tunnel.service --no-pager -l 2>&1 | head -5
echo ""
echo "Zrok URL:"
~/.local/bin/zrok status 2>/dev/null | grep -oP 'https?://[^ ]+' | head -1 || echo "   (esperando...)"
