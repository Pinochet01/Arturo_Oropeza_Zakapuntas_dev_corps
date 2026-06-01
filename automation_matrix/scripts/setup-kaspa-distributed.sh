#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════════════════
#  setup-kaspa-distributed.sh
#  Distribuye kaspad fuera de WSL2 → Ubuntu VM (Ryzen7) como primario
#                                  → Chromebook Crostini como failover
#
#  Arquitectura resultante:
#
#  ┌─────────────────────────────────────────────────────────────┐
#  │  Ryzen7 Windows                                             │
#  │                                                             │
#  │  ┌─── Ubuntu VM ──────────────────┐                        │
#  │  │  kaspad  :16110  (~350MB RAM)  │                        │
#  │  │  ulimit -v 900000              │                        │
#  │  └────────────────────────────────┘                        │
#  │           │ TCP / SSH tunnel                               │
#  │  ┌─── WSL2 ───────────────────────┐                        │
#  │  │  kaspawallet daemon → VM:16110 │                        │
#  │  │  automation_matrix  :8080      │                        │
#  │  │  registrar_cliente  :8081      │                        │
#  │  └────────────────────────────────┘                        │
#  └─────────────────────────────────────────────────────────────┘
#
#  ┌─── Chromebook (Crostini) ──────────────────────────────────┐
#  │  kaspad  :16110  (failover)                                 │
#  └─────────────────────────────────────────────────────────────┘
#
#  Uso:
#    bash scripts/setup-kaspa-distributed.sh detect   # detecta IPs
#    bash scripts/setup-kaspa-distributed.sh vm        # prepara archivos para copiar a la VM
#    bash scripts/setup-kaspa-distributed.sh wsl       # configura WSL2 para usar la VM
#    bash scripts/setup-kaspa-distributed.sh chromebook # prepara para Crostini
#    bash scripts/setup-kaspa-distributed.sh tunnel    # levanta SSH tunnel WSL2→VM
#    bash scripts/setup-kaspa-distributed.sh status    # estado de todos los nodos
# ══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

MATRIX_DIR="$(cd "$(dirname "$0")/.." && pwd)"
KASPA_BIN="$MATRIX_DIR/kaspa/bin/kaspad"
WALLET_BIN="$MATRIX_DIR/kaspa/bin/kaspa-wallet"
ENV_FILE="$MATRIX_DIR/.env"
CONFIG_DIR="$MATRIX_DIR/config"

# IPs configurables — detección automática o manual
VM_IP="${KASPAD_VM_IP:-}"
VM_USER="${KASPAD_VM_USER:-arturo}"
VM_SSH_PORT="${KASPAD_VM_SSH_PORT:-22}"
CHROMEBOOK_IP="${CHROMEBOOK_IP:-}"
CHROMEBOOK_USER="${CHROMEBOOK_USER:-arturo}"

# Puertos Kaspa
KASPAD_RPC_PORT=16110
KASPAD_P2P_PORT=16111
WALLET_DAEMON_PORT=8070

log()  { echo -e "\033[32m[kaspa-dist]\033[0m $(date '+%H:%M:%S') $*"; }
warn() { echo -e "\033[33m[kaspa-dist]\033[0m ⚠  $*" >&2; }
die()  { echo -e "\033[31m[kaspa-dist]\033[0m ✗ $*" >&2; exit 1; }

_env_set() {
    local key="$1" val="$2"
    if grep -q "^${key}=" "$ENV_FILE" 2>/dev/null; then
        sed -i "s|^${key}=.*|${key}=${val}|" "$ENV_FILE"
    else
        echo "${key}=${val}" >> "$ENV_FILE"
    fi
}

# ── detect: encuentra IPs disponibles ─────────────────────────────────────────
cmd_detect() {
    echo ""
    echo "  ┌─────────────────────────────────────────────────────┐"
    echo "  │  Detección de red — Kaspa Distributed              │"
    echo "  └─────────────────────────────────────────────────────┘"
    echo ""

    # IP de WSL2
    WSL_IP=$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[^ ]+' || hostname -I | awk '{print $1}')
    echo "  WSL2 IP:        $WSL_IP"

    # Gateway de Windows (host del Ryzen7)
    WIN_HOST=$(ip route show default 2>/dev/null | grep -oP 'via \K[^ ]+' | head -1 || echo "?")
    echo "  Windows host:   $WIN_HOST"

    # Buscar la VM (escaneo ARP en la subred)
    echo ""
    echo "  Buscando Ubuntu VM en la red local..."
    SUBNET=$(echo "$WIN_HOST" | cut -d. -f1-3)
    for i in $(seq 1 20); do
        IP="${SUBNET}.${i}"
        if [ "$IP" != "$WIN_HOST" ] && [ "$IP" != "$WSL_IP" ]; then
            if ping -c1 -W1 "$IP" &>/dev/null 2>&1; then
                HOSTNAME=$(ssh -o ConnectTimeout=2 -o StrictHostKeyChecking=no \
                    "${VM_USER}@${IP}" hostname 2>/dev/null || echo "?")
                echo "    ✓ ${IP} → ${HOSTNAME}"
            fi
        fi
    done

    echo ""
    echo "  SSH config (~/.ssh/config):"
    grep -A3 "Host " ~/.ssh/config 2>/dev/null | head -20 | sed 's/^/    /' || echo "    (vacío)"
    echo ""
    echo "  Para configurar manualmente:"
    echo "    export KASPAD_VM_IP=<ip-de-la-vm>"
    echo "    bash $0 wsl"
}

# ── vm: genera archivos para instalar en la Ubuntu VM ────────────────────────
cmd_vm() {
    log "Generando paquete de instalación para Ubuntu VM..."
    mkdir -p "$CONFIG_DIR/kaspa-vm"

    # Script de instalación para la VM
    cat > "$CONFIG_DIR/kaspa-vm/install-kaspad-vm.sh" << 'VMSCRIPT'
#!/usr/bin/env bash
# Instala y configura kaspad en la Ubuntu VM del Ryzen7
# Ejecutar DENTRO de la VM: bash install-kaspad-vm.sh
set -euo pipefail

KASPA_DIR="$HOME/kaspa"
mkdir -p "$KASPA_DIR"

echo "[kaspad-vm] Copiando binario kaspad..."
# El binario se copia desde WSL2 (ver instrucciones abajo)

# Límite de RAM: ~900MB virtual (kaspad + utxoindex)
# rusty-kaspa --ram-scale=0.3 reduce el índice UTXO a ~300MB
# Sin --utxoindex: ~150MB pero sin soporte de consultas de balance

cat > "$HOME/kaspa/start-kaspad.sh" << 'EOF'
#!/usr/bin/env bash
# Kaspad con memoria limitada para Ubuntu VM
KASPAD_BIN="$HOME/kaspa/bin/kaspad"
exec "$KASPAD_BIN" \
    --utxoindex \
    --ram-scale=0.3 \
    --rpclisten=0.0.0.0:16110 \
    --listen=0.0.0.0:16111 \
    --loglevel=warn \
    2>&1
EOF
chmod +x "$HOME/kaspa/start-kaspad.sh"

# Systemd service (user scope)
mkdir -p "$HOME/.config/systemd/user"
cat > "$HOME/.config/systemd/user/kaspad.service" << 'EOF'
[Unit]
Description=Kaspa Full Node (RAM-limited)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=%h/kaspa/start-kaspad.sh
Restart=on-failure
RestartSec=30

# Límite de memoria — ajustar según RAM disponible en la VM
MemoryMax=1G
MemorySwapMax=512M

StandardOutput=journal
StandardError=journal
SyslogIdentifier=kaspad

[Install]
WantedBy=default.target
EOF

systemctl --user daemon-reload
systemctl --user enable kaspad
echo "[kaspad-vm] ✓ Servicio kaspad instalado."
echo "  Copia el binario y ejecuta: systemctl --user start kaspad"
echo "  Luego verifica:             systemctl --user status kaspad"
VMSCRIPT

    chmod +x "$CONFIG_DIR/kaspa-vm/install-kaspad-vm.sh"
    log "✓ Archivos generados en $CONFIG_DIR/kaspa-vm/"

    echo ""
    echo "  ══ Instrucciones para la Ubuntu VM ══"
    echo ""
    echo "  1. En WSL2, copia los archivos a la VM:"
    echo "     scp $KASPA_BIN ${VM_USER}@<VM_IP>:~/kaspa/bin/kaspad"
    echo "     scp $CONFIG_DIR/kaspa-vm/install-kaspad-vm.sh ${VM_USER}@<VM_IP>:~/"
    echo ""
    echo "  2. En la VM, ejecuta:"
    echo "     chmod +x ~/kaspa/bin/kaspad"
    echo "     bash ~/install-kaspad-vm.sh"
    echo "     systemctl --user start kaspad"
    echo ""
    echo "  3. Verifica que el RPC responde:"
    echo "     curl http://<VM_IP>:16110/info"
    echo ""
}

# ── wsl: configura WSL2 para conectarse a la VM ───────────────────────────────
cmd_wsl() {
    if [ -z "$VM_IP" ]; then
        read -rp "  IP de la Ubuntu VM: " VM_IP
    fi

    log "Configurando WSL2 para usar kaspad en VM ($VM_IP)..."

    # Actualizar .env
    _env_set "KASPAD_VM_IP"  "$VM_IP"
    _env_set "KASPAD_RPC_URL" "http://${VM_IP}:${KASPAD_RPC_PORT}"

    # Actualizar config de kaspawallet daemon para apuntar a la VM
    WALLET_CONF="$HOME/.kaspawallet/config.toml"
    if [ -f "$WALLET_CONF" ]; then
        cp "$WALLET_CONF" "${WALLET_CONF}.bak"
        # Agregar/actualizar el rpcserver
        if grep -q "rpcserver" "$WALLET_CONF"; then
            sed -i "s|rpcserver.*|rpcserver = \"${VM_IP}:${KASPAD_RPC_PORT}\"|" "$WALLET_CONF"
        else
            echo "rpcserver = \"${VM_IP}:${KASPAD_RPC_PORT}\"" >> "$WALLET_CONF"
        fi
        log "✓ kaspawallet config actualizado → ${VM_IP}:${KASPAD_RPC_PORT}"
    fi

    # Instalar servicio systemd para el tunnel SSH (por si la VM no es directamente accesible)
    cmd_tunnel_service

    log "✓ WSL2 configurado. Reinicia kaspawallet daemon:"
    echo "  systemctl --user restart kaspawallet || $WALLET_BIN start-daemon &"
}

# ── tunnel: SSH tunnel WSL2 → VM (si no hay acceso IP directo) ───────────────
cmd_tunnel_service() {
    [ -z "$VM_IP" ] && { read -rp "  IP de la VM: " VM_IP; }

    cat > "$HOME/.config/systemd/user/kaspad-tunnel.service" << EOF
[Unit]
Description=SSH Tunnel WSL2 → kaspad en Ubuntu VM
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
# Redirige localhost:16110 (WSL2) → VM:16110
ExecStart=/usr/bin/ssh \\
    -N -L ${KASPAD_RPC_PORT}:127.0.0.1:${KASPAD_RPC_PORT} \\
    -L ${KASPAD_P2P_PORT}:127.0.0.1:${KASPAD_P2P_PORT} \\
    -o StrictHostKeyChecking=no \\
    -o ServerAliveInterval=30 \\
    -o ServerAliveCountMax=3 \\
    -p ${VM_SSH_PORT} \\
    ${VM_USER}@${VM_IP}
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
EOF

    systemctl --user daemon-reload
    systemctl --user enable kaspad-tunnel
    log "✓ Tunnel SSH instalado (systemctl --user start kaspad-tunnel)"
}

cmd_tunnel() {
    cmd_tunnel_service
    systemctl --user start kaspad-tunnel
    sleep 2
    systemctl --user status kaspad-tunnel --no-pager || true
}

# ── chromebook: kaspad failover en Crostini ────────────────────────────────────
cmd_chromebook() {
    log "Preparando kaspad failover para Chromebook (Crostini/Debian)..."
    mkdir -p "$CONFIG_DIR/kaspa-chromebook"

    cat > "$CONFIG_DIR/kaspa-chromebook/install-kaspad-chromebook.sh" << 'CBSCRIPT'
#!/usr/bin/env bash
# Instala kaspad en Chromebook Crostini como nodo FAILOVER
# Ejecutar dentro de Crostini: bash install-kaspad-chromebook.sh
set -euo pipefail

KASPA_DIR="$HOME/kaspa"
mkdir -p "$KASPA_DIR/bin"

echo "[kaspad-cb] Instalando kaspad en Crostini..."

# Crostini es x86_64 — el binario de Linux funciona directo

cat > "$HOME/kaspa/start-kaspad-failover.sh" << 'EOF'
#!/usr/bin/env bash
# kaspad como failover — sin utxoindex (mínima RAM ~150MB)
KASPAD_BIN="$HOME/kaspa/bin/kaspad"
exec "$KASPAD_BIN" \
    --rpclisten=0.0.0.0:16110 \
    --listen=0.0.0.0:16111 \
    --ram-scale=0.2 \
    --loglevel=warn \
    2>&1
EOF
chmod +x "$HOME/kaspa/start-kaspad-failover.sh"

# Instalar como servicio systemd en Crostini
mkdir -p "$HOME/.config/systemd/user"
cat > "$HOME/.config/systemd/user/kaspad-failover.service" << 'EOF'
[Unit]
Description=Kaspa Node Failover (Chromebook Crostini)
After=network-online.target

[Service]
Type=simple
ExecStart=%h/kaspa/start-kaspad-failover.sh
Restart=on-failure
RestartSec=60
MemoryMax=512M

StandardOutput=journal
StandardError=journal

[Install]
WantedBy=default.target
EOF

systemctl --user daemon-reload
systemctl --user enable kaspad-failover
echo "[kaspad-cb] ✓ Listo. Inicia con: systemctl --user start kaspad-failover"
echo "  Copia el binario primero: scp <wsl2-ip>:~/automation_matrix/kaspa/bin/kaspad ~/kaspa/bin/"
CBSCRIPT

    chmod +x "$CONFIG_DIR/kaspa-chromebook/install-kaspad-chromebook.sh"
    log "✓ Script generado: $CONFIG_DIR/kaspa-chromebook/install-kaspad-chromebook.sh"
    echo ""
    echo "  Copia a Chromebook (desde WSL2):"
    echo "    scp $KASPA_BIN ${CHROMEBOOK_USER}@penguin.linux.test:~/kaspa/bin/kaspad"
    echo "    scp $CONFIG_DIR/kaspa-chromebook/install-kaspad-chromebook.sh ${CHROMEBOOK_USER}@penguin.linux.test:~/"
    echo "    ssh ${CHROMEBOOK_USER}@penguin.linux.test 'bash ~/install-kaspad-chromebook.sh'"
}

# ── status: estado de todos los nodos ─────────────────────────────────────────
cmd_status() {
    source "$ENV_FILE" 2>/dev/null || true
    local VM="${KASPAD_VM_IP:-no configurada}"
    echo ""
    echo "  ══ Estado Kaspa Distributed ══"
    echo ""
    echo "  Nodo primario (Ubuntu VM): $VM:${KASPAD_RPC_PORT}"
    if [ -n "${KASPAD_VM_IP:-}" ]; then
        curl -sf "http://${KASPAD_VM_IP}:${KASPAD_RPC_PORT}/info" 2>/dev/null \
            && echo "  → ✅ Respondiendo" || echo "  → ❌ No responde"
    fi
    echo ""
    echo "  Tunnel SSH:"
    systemctl --user is-active kaspad-tunnel 2>/dev/null \
        && echo "  → ✅ Activo" || echo "  → ❌ Inactivo"
    echo ""
    echo "  kaspawallet daemon (WSL2):"
    pgrep -f "kaspa-wallet.*daemon" &>/dev/null \
        && echo "  → ✅ Corriendo" || echo "  → ❌ No corre"
    echo ""
    echo "  Chromebook failover:"
    if [ -n "${CHROMEBOOK_IP:-}" ]; then
        ssh -o ConnectTimeout=3 "${CHROMEBOOK_USER}@${CHROMEBOOK_IP}" \
            "systemctl --user is-active kaspad-failover" 2>/dev/null \
            && echo "  → ✅ Activo" || echo "  → ❌ Inactivo"
    else
        echo "  → (CHROMEBOOK_IP no configurada)"
    fi
    echo ""
}

# ── entrada principal ──────────────────────────────────────────────────────────
ACTION="${1:-help}"
case "$ACTION" in
    detect)    cmd_detect ;;
    vm)        cmd_vm ;;
    wsl)       cmd_wsl ;;
    chromebook) cmd_chromebook ;;
    tunnel)    cmd_tunnel ;;
    status)    cmd_status ;;
    help|*)
        echo ""
        echo "  Uso: $0 <comando>"
        echo ""
        echo "  Comandos:"
        echo "    detect      Detecta IPs disponibles en la red"
        echo "    vm          Genera scripts para Ubuntu VM (primario)"
        echo "    wsl         Configura WSL2 para conectar a la VM"
        echo "    chromebook  Genera scripts para Crostini (failover)"
        echo "    tunnel      Levanta SSH tunnel WSL2 → VM"
        echo "    status      Estado de todos los nodos"
        echo ""
        echo "  Flujo recomendado:"
        echo "    1. bash $0 detect                    # encuentra la VM"
        echo "    2. bash $0 vm                        # prepara archivos"
        echo "    3. (copiar binario + instalar en VM)"
        echo "    4. KASPAD_VM_IP=<ip> bash $0 wsl     # configura WSL2"
        echo "    5. bash $0 chromebook                # failover opcional"
        echo "    6. bash $0 status                    # verifica todo"
        echo ""
        ;;
esac
