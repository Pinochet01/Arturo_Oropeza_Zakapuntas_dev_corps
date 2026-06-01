#!/usr/bin/env bash
# ============================================================
#  setup-nym.sh — Nym Network Requester (SOCKS5 Provider)
#  Automation Matrix · Delphos Agency
#  Uso: bash scripts/setup-nym.sh [install|init|start|status|stop]
# ============================================================
set -euo pipefail

NYM_VERSION="2024.13-magura"
NYM_BIN_URL="https://github.com/nymtech/nym/releases/download/nym-binaries-v${NYM_VERSION}/nym-network-requester"
NYM_DIR="$HOME/.nym"
BIN_DIR="$HOME/.local/bin"
CONFIG_DIR="$(dirname "$0")/../config"
SERVICE_NAME="nym-network-requester"
NODE_ID="automation-matrix-requester"

log()  { echo "[nym-setup] $(date '+%H:%M:%S') $*"; }
warn() { echo "[nym-setup] ⚠  $*" >&2; }
die()  { echo "[nym-setup] ✗ $*" >&2; exit 1; }

# ── 1. Instalar binario ──────────────────────────────────────────────────────
cmd_install() {
  log "Creando directorios..."
  mkdir -p "$BIN_DIR" "$NYM_DIR"

  if command -v nym-network-requester &>/dev/null; then
    log "nym-network-requester ya está instalado: $(nym-network-requester --version 2>/dev/null | head -1)"
    return 0
  fi

  log "Descargando nym-network-requester v${NYM_VERSION}..."
  curl -fsSL "$NYM_BIN_URL" -o "$BIN_DIR/nym-network-requester"
  chmod +x "$BIN_DIR/nym-network-requester"

  # Asegurar que $HOME/.local/bin esté en PATH
  if ! echo "$PATH" | grep -q "$BIN_DIR"; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
    export PATH="$BIN_DIR:$PATH"
  fi

  log "✓ Instalado en $BIN_DIR/nym-network-requester"
}

# ── 2. Inicializar nodo ──────────────────────────────────────────────────────
cmd_init() {
  log "Inicializando network requester como '$NODE_ID'..."

  if [ -d "$NYM_DIR/network-requesters/$NODE_ID" ]; then
    log "El nodo '$NODE_ID' ya existe. Mostrando identidad:"
    cmd_identity
    return 0
  fi

  nym-network-requester init \
    --id "$NODE_ID" \
    --open-proxy false 2>&1 | tee /tmp/nym-init.log

  log "✓ Inicializado."
  cmd_identity
  log ""
  log "👉  Registra tu nodo en: https://explorer.nymtech.net"
  log "    Necesitarás la 'Identity Key' mostrada arriba."
}

# ── 3. Mostrar identidad ─────────────────────────────────────────────────────
cmd_identity() {
  local cfg="$NYM_DIR/network-requesters/$NODE_ID/config/config.toml"
  if [ ! -f "$cfg" ]; then
    warn "Nodo no inicializado. Corre: $0 init"
    return 1
  fi
  echo ""
  echo "═══════════════════════════════════════════"
  echo "  Nym Node Identity"
  echo "═══════════════════════════════════════════"
  grep -E "^(id|identity_key|sphinx_key|host|mix_port)" "$cfg" | sed 's/^/  /'
  echo "═══════════════════════════════════════════"
  echo ""
}

# ── 4. Instalar servicio systemd ─────────────────────────────────────────────
cmd_service_install() {
  local unit_src="$CONFIG_DIR/nym.service"
  local unit_dst="$HOME/.config/systemd/user/nym-network-requester.service"

  mkdir -p "$(dirname "$unit_dst")"
  cp "$unit_src" "$unit_dst"
  sed -i "s|{{NYM_BIN}}|$BIN_DIR/nym-network-requester|g" "$unit_dst"
  sed -i "s|{{NODE_ID}}|$NODE_ID|g" "$unit_dst"

  systemctl --user daemon-reload
  systemctl --user enable "$SERVICE_NAME"
  log "✓ Servicio systemd instalado (user scope)."
  log "  Inicia con: systemctl --user start $SERVICE_NAME"
}

# ── 5. Control del servicio ──────────────────────────────────────────────────
cmd_start()  { systemctl --user start  "$SERVICE_NAME" && log "▶ Iniciado"; }
cmd_stop()   { systemctl --user stop   "$SERVICE_NAME" && log "■ Detenido"; }
cmd_status() { systemctl --user status "$SERVICE_NAME" --no-pager || true; }
cmd_logs()   { journalctl --user -u "$SERVICE_NAME" -f --no-pager; }

# ── Entrada principal ────────────────────────────────────────────────────────
ACTION="${1:-help}"
case "$ACTION" in
  install)         cmd_install ;;
  init)            cmd_install && cmd_init ;;
  service-install) cmd_service_install ;;
  start)           cmd_start ;;
  stop)            cmd_stop ;;
  status)          cmd_status ;;
  logs)            cmd_logs ;;
  identity)        cmd_identity ;;
  setup)           cmd_install && cmd_init && cmd_service_install && cmd_start ;;
  help|*)
    echo ""
    echo "  Uso: $0 <comando>"
    echo ""
    echo "  Comandos:"
    echo "    install          Descarga el binario nym-network-requester"
    echo "    init             Inicializa el nodo (genera identity keys)"
    echo "    service-install  Instala y habilita el servicio systemd"
    echo "    setup            Todo lo anterior + arrancar"
    echo "    start / stop     Control del servicio"
    echo "    status / logs    Monitoreo"
    echo "    identity         Muestra identity key del nodo"
    echo ""
    ;;
esac
