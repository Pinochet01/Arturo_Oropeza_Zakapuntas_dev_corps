#!/usr/bin/env bash
# install-firewall.sh — FW persistente, un solo sudo
set -e

CHROMEBOOK_IP="${1:-192.168.1.3}"
SSH_PORT="${SSH_PORT:-22}"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Firewall Installer ==="
echo "Chromebook IP: $CHROMEBOOK_IP"

cat > /tmp/automation-firewall.rules <<EOF
*filter
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -i lo -j ACCEPT
-A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
-A INPUT -s $CHROMEBOOK_IP -p tcp --dport 22 -j ACCEPT
-A INPUT -p tcp --dport $SSH_PORT -j ACCEPT
-A INPUT -p tcp --dport 16111 -j ACCEPT
-A INPUT -s $CHROMEBOOK_IP -p tcp --dport 8080 -j ACCEPT
-A INPUT -s $CHROMEBOOK_IP -p tcp --dport 8443 -j ACCEPT
-A INPUT -s $CHROMEBOOK_IP -p tcp --dport 17110 -j ACCEPT
-A INPUT -s $CHROMEBOOK_IP -p tcp --dport 16110 -j ACCEPT
-A INPUT -s $CHROMEBOOK_IP -p tcp --dport 18110 -j ACCEPT
-A INPUT -s 192.168.0.0/16 -p tcp --dport 8081 -j ACCEPT
-A INPUT -i lo -p tcp --dport 8082 -j ACCEPT
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "FW-DROP: "
COMMIT
EOF

echo "Aplicando reglas (sudo)..."
sudo /sbin/iptables-restore < /tmp/automation-firewall.rules

echo "Instalando systemd unit..."
sudo tee /etc/systemd/system/automation-firewall.service > /dev/null <<SERVICE
[Unit]
Description=Automation Matrix Firewall
Before=network-pre.target
Wants=network-pre.target
DefaultDependencies=no

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/sbin/iptables-restore -n /etc/automation-firewall.rules
ExecStop=/sbin/iptables -F INPUT
ExecStop=/sbin/iptables -P INPUT ACCEPT
StandardOutput=journal

[Install]
WantedBy=multi-user.target
SERVICE

sudo cp /tmp/automation-firewall.rules /etc/automation-firewall.rules
sudo chmod 644 /etc/automation-firewall.rules
# Also save current rules to persist any runtime changes
sudo /sbin/iptables-save > /etc/automation-firewall.rules
sudo chmod 644 /etc/automation-firewall.rules /etc/systemd/system/automation-firewall.service
sudo systemctl daemon-reload
sudo systemctl enable automation-firewall.service

echo ""
echo "=== Firewall ACTIVO ==="
echo "  Persiste en reboots via systemd oneshot"
echo "  Servicio: automation-firewall.service"
echo "  Reglas:   /etc/automation-firewall.rules"
echo ""
echo "Para test: sudo iptables -L -n"
echo "Para ver logs: sudo journalctl -u automation-firewall.service"
echo ""
echo "Para cambiar IP del Chromebook:"
echo "  bash $DIR/install-firewall.sh <NUEVA_IP>"
