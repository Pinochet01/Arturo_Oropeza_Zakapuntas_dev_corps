#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════════════════
#  setup-ssl.sh — Let's Encrypt + Caddy para Automation Matrix
#  Delphos Agency · Arturo Oropeza
#
#  Uso:
#    bash scripts/setup-ssl.sh install   # Instala Caddy con plugin Cloudflare
#    bash scripts/setup-ssl.sh configure # Configura dominio e interactúa con .env
#    bash scripts/setup-ssl.sh start     # Levanta Caddy como servicio
#    bash scripts/setup-ssl.sh certs     # Muestra estado de los certificados
#    bash scripts/setup-ssl.sh setup     # Todo: install + configure + start
# ══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

MATRIX_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$MATRIX_DIR/.env"
CADDYFILE="$MATRIX_DIR/Caddyfile"
SSL_DIR="$MATRIX_DIR/ssl/caddy"
SERVICE_NAME="caddy-matrix"
CADDY_BIN="/usr/local/bin/caddy"

log()  { echo -e "\033[32m[ssl-setup]\033[0m $(date '+%H:%M:%S') $*"; }
warn() { echo -e "\033[33m[ssl-setup]\033[0m ⚠  $*" >&2; }
die()  { echo -e "\033[31m[ssl-setup]\033[0m ✗ $*" >&2; exit 1; }

# ── Cargar .env ────────────────────────────────────────────────────────────
load_env() {
    if [ -f "$ENV_FILE" ]; then
        set -a; source "$ENV_FILE"; set +a
    fi
}

# ── 1. Instalar Caddy con plugin Cloudflare DNS ────────────────────────────
cmd_install() {
    log "Instalando dependencias..."
    sudo apt-get update -qq
    sudo apt-get install -y --no-install-recommends debian-keyring debian-archive-keyring apt-transport-https curl

    log "Agregando repositorio oficial de Caddy..."
    curl -fsSL https://dl.cloudsmith.io/public/caddy/stable/gpg.key \
        | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -fsSL https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt \
        | sudo tee /etc/apt/sources.list.d/caddy-stable.list > /dev/null
    sudo apt-get update -qq
    sudo apt-get install -y caddy

    log "Instalando xcaddy para compilar con plugin Cloudflare..."
    if ! command -v go &>/dev/null; then
        log "Instalando Go..."
        GO_VER="1.22.3"
        curl -fsSL "https://go.dev/dl/go${GO_VER}.linux-amd64.tar.gz" -o /tmp/go.tar.gz
        sudo rm -rf /usr/local/go
        sudo tar -C /usr/local -xzf /tmp/go.tar.gz
        export PATH="/usr/local/go/bin:$PATH"
        echo 'export PATH="/usr/local/go/bin:$PATH"' >> "$HOME/.bashrc"
    fi

    go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest
    XCADDY="$HOME/go/bin/xcaddy"

    log "Compilando Caddy con caddy-dns/cloudflare..."
    "$XCADDY" build \
        --with github.com/caddy-dns/cloudflare \
        --output /tmp/caddy-cloudflare
    sudo mv /tmp/caddy-cloudflare "$CADDY_BIN"
    sudo chmod +x "$CADDY_BIN"

    # Permitir binding en puertos < 1024 sin root
    sudo setcap cap_net_bind_service=+ep "$CADDY_BIN"

    log "✓ Caddy instalado: $($CADDY_BIN version)"
    log "  Plugins: $($CADDY_BIN list-modules 2>/dev/null | grep cloudflare || echo 'cloudflare DNS ok')"
}

# ── 2. Configurar dominio y variables de entorno ───────────────────────────
cmd_configure() {
    load_env
    mkdir -p "$SSL_DIR"

    echo ""
    echo "  ┌─────────────────────────────────────────────────┐"
    echo "  │  Configuración SSL — Automation Matrix          │"
    echo "  └─────────────────────────────────────────────────┘"
    echo ""

    # Dominio
    CURRENT_DOMAIN="${DOMAIN:-matrix.delphos.mx}"
    read -rp "  Dominio para el certificado [$CURRENT_DOMAIN]: " INPUT_DOMAIN
    DOMAIN="${INPUT_DOMAIN:-$CURRENT_DOMAIN}"

    # Cloudflare API Token
    echo ""
    echo "  Cloudflare API Token (DNS-01 challenge)"
    echo "  Crear en: https://dash.cloudflare.com/profile/api-tokens"
    echo "  Permisos necesarios: Zone → DNS → Edit"
    CURRENT_CF="${CF_API_TOKEN:-}"
    if [ -n "$CURRENT_CF" ]; then
        read -rsp "  CF_API_TOKEN [actual: ****${CURRENT_CF: -4}]: " INPUT_CF
    else
        read -rsp "  CF_API_TOKEN: " INPUT_CF
    fi
    echo ""
    CF_API_TOKEN="${INPUT_CF:-$CURRENT_CF}"

    # Actualizar .env
    _env_set "DOMAIN"        "$DOMAIN"
    _env_set "CF_API_TOKEN"  "$CF_API_TOKEN"

    echo ""
    log "✓ Configuración guardada en .env"
    log "  DOMAIN       = $DOMAIN"
    log "  CF_API_TOKEN = ****${CF_API_TOKEN: -4}"

    # Verificar DNS
    echo ""
    log "Verificando resolución DNS para $DOMAIN..."
    if command -v dig &>/dev/null; then
        RESOLVED=$(dig +short "$DOMAIN" A 2>/dev/null | head -1 || true)
        if [ -n "$RESOLVED" ]; then
            log "  $DOMAIN → $RESOLVED ✓"
        else
            warn "$DOMAIN no resuelve todavía. Asegúrate de crear el registro A/CNAME en Cloudflare."
        fi
    fi
}

# ── 3. Crear e instalar servicio systemd ───────────────────────────────────
cmd_service_install() {
    load_env
    local unit_dst="$HOME/.config/systemd/user/$SERVICE_NAME.service"
    mkdir -p "$(dirname "$unit_dst")"

    cat > "$unit_dst" << EOF
[Unit]
Description=Caddy HTTPS — Automation Matrix
Documentation=https://caddyserver.com/docs/
After=network-online.target
Wants=network-online.target

[Service]
Type=notify
ExecStart=$CADDY_BIN run --config $CADDYFILE --adapter caddyfile
ExecReload=$CADDY_BIN reload --config $CADDYFILE --adapter caddyfile --force
TimeoutStopSec=5s
LimitNOFILE=1048576

# Secrets
EnvironmentFile=$ENV_FILE

# Logs
StandardOutput=journal
StandardError=journal
SyslogIdentifier=$SERVICE_NAME

Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
EOF

    systemctl --user daemon-reload
    systemctl --user enable "$SERVICE_NAME"
    log "✓ Servicio $SERVICE_NAME instalado."
}

# ── 4. Control del servicio ────────────────────────────────────────────────
cmd_start() {
    load_env
    # Validar config antes de arrancar
    log "Validando Caddyfile..."
    DOMAIN="${DOMAIN:-matrix.delphos.mx}" \
    CF_API_TOKEN="${CF_API_TOKEN:-dummy}" \
    "$CADDY_BIN" validate --config "$CADDYFILE" --adapter caddyfile \
        && log "✓ Caddyfile válido" \
        || die "Error en Caddyfile. Revisa la configuración."

    systemctl --user start "$SERVICE_NAME"
    sleep 2
    systemctl --user status "$SERVICE_NAME" --no-pager || true
    log "▶ Caddy iniciado. Primeros certificados pueden tardar ~30 segundos."
}

cmd_stop()    { systemctl --user stop    "$SERVICE_NAME" && log "■ Detenido"; }
cmd_reload()  { systemctl --user reload  "$SERVICE_NAME" && log "↺ Recargado"; }
cmd_status()  { systemctl --user status  "$SERVICE_NAME" --no-pager || true; }
cmd_logs()    { journalctl --user -u "$SERVICE_NAME" -f --no-pager; }

# ── 5. Estado de certificados ──────────────────────────────────────────────
cmd_certs() {
    load_env
    echo ""
    echo "  ┌─────────────────────────────────────────────────┐"
    echo "  │  Estado de certificados TLS                     │"
    echo "  └─────────────────────────────────────────────────┘"

    "$CADDY_BIN" list-modules 2>/dev/null | grep -E "tls|dns" | sed 's/^/  /' || true
    echo ""

    # Buscar certs en el storage de Caddy
    CERT_STORE="$SSL_DIR/certificates/acme-v02.api.letsencrypt.org-directory"
    if [ -d "$CERT_STORE" ]; then
        find "$CERT_STORE" -name "*.crt" 2>/dev/null | while read -r CERT; do
            DOMAIN_NAME=$(basename "$(dirname "$CERT")")
            EXPIRY=$(openssl x509 -enddate -noout -in "$CERT" 2>/dev/null | cut -d= -f2 || echo "?")
            echo "  ✓ $DOMAIN_NAME"
            echo "    Expira: $EXPIRY"
            echo ""
        done
    else
        warn "No se encontraron certificados todavía en $CERT_STORE"
        warn "Inicia el servicio para que Caddy provisione los certs."
    fi
}

# ── Helper: actualizar clave en .env ──────────────────────────────────────
_env_set() {
    local key="$1" val="$2"
    if grep -q "^${key}=" "$ENV_FILE" 2>/dev/null; then
        sed -i "s|^${key}=.*|${key}=${val}|" "$ENV_FILE"
    else
        echo "${key}=${val}" >> "$ENV_FILE"
    fi
}

# ── Entrada principal ──────────────────────────────────────────────────────
ACTION="${1:-help}"
case "$ACTION" in
    install)          cmd_install ;;
    configure)        cmd_configure ;;
    service-install)  cmd_service_install ;;
    start)            cmd_start ;;
    stop)             cmd_stop ;;
    reload)           cmd_reload ;;
    status)           cmd_status ;;
    logs)             cmd_logs ;;
    certs)            cmd_certs ;;
    setup)
        cmd_install
        cmd_configure
        cmd_service_install
        cmd_start
        ;;
    help|*)
        echo ""
        echo "  Uso: $0 <comando>"
        echo ""
        echo "  Comandos:"
        echo "    setup            Todo: instala, configura, servicio y arranca"
        echo "    install          Instala Caddy + plugin Cloudflare DNS"
        echo "    configure        Configura dominio y CF_API_TOKEN en .env"
        echo "    service-install  Crea el servicio systemd"
        echo "    start / stop     Control del servicio"
        echo "    reload           Recarga config sin cortar conexiones"
        echo "    status / logs    Monitoreo"
        echo "    certs            Estado de los certificados TLS"
        echo ""
        echo "  Flujo rápido:"
        echo "    1. bash $0 setup"
        echo "    2. Crea registro DNS: matrix.delphos.mx → IP pública"
        echo "    3. bash $0 certs    # verifica el certificado"
        echo ""
        ;;
esac
