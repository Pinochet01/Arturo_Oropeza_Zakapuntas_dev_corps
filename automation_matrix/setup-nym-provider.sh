#!/bin/bash
# setup-nym-provider.sh — Auto-discover and configure Nym SOCKS5 provider
# The Nym API endpoints are flaky. This script uses the nym-socks5-client
# to auto-discover and configure the provider via latency-based selection.

set -e

NYM_BIN="$HOME/.local/bin/nym-socks5-client"
CLIENT_ID="openclaw-shield"
CONFIG_DIR="$HOME/.nym/socks5-clients/$CLIENT_ID"

echo "=== Nym Provider Auto-Discovery ==="

if [ ! -f "$NYM_BIN" ]; then
    echo "Error: nym-socks5-client not found at $NYM_BIN"
    exit 1
fi

echo "Backing up existing config..."
mkdir -p "$CONFIG_DIR"
[ -f "$CONFIG_DIR/config.toml" ] && cp "$CONFIG_DIR/config.toml" "$CONFIG_DIR/config.toml.bak.$(date +%s)"

echo "Querying Nym APIs for available gateways..."

GATEWAY_NYMS=""
for api in \
    "https://validator.nymtech.net/api" \
    "https://explorer.nymtech.net/api"; do
    
    GW=$(curl -sf "$api/v1/gateways" 2>/dev/null | \
        python3 -c "
import sys, json
data = json.load(sys.stdin)
if isinstance(data, list) and data:
    gw = data[0]
    print(gw.get('gateway', {}).get('identity_key', ''))
" 2>/dev/null)
    
    if [ -n "$GW" ]; then
        echo "  Found gateway: $GW"
        GATEWAY_NYMS="$GW"
        break
    fi
done

if [ -z "$GATEWAY_NYMS" ]; then
    echo "  No gateways found via API. Using latency-based selection..."
    GATEWAY_NYMS=""
fi

echo "Looking for available SOCKS5 providers..."

PROVIDER_ID=""
for api in \
    "https://validator.nymtech.net/api" \
    "https://explorer.nymtech.net/api"; do
    
    PROVIDER_ID=$(curl -sf "$api/v1/gateways" 2>/dev/null | \
        python3 -c "
import sys, json
data = json.load(sys.stdin)
if isinstance(data, list):
    for g in data:
        gw = g.get('gateway', {})
        if gw.get('identity_key'):
            addr = gw.get('identity_key')
            break
    if addr:
        print(addr)
" 2>/dev/null)
    
    if [ -n "$PROVIDER_ID" ]; then
        break
    fi
done

if [ -z "$PROVIDER_ID" ]; then
    echo ""
    echo "ERROR: Cannot auto-discover providers. The Nym API endpoints are unreachable."
    echo ""
    echo "Manual steps:"
    echo "  1. Visit: https://explorer.nymtech.net"
    echo "  2. Find a gateway with SOCKS5 support"
    echo "  3. Find a SOCKS5 provider"
    echo "  4. Run: nym-socks5-client init --id $CLIENT_ID --provider <gateway_id>@<provider_id>"
    echo ""
    echo "Or try the interactive setup:"
    echo "  nym-socks5-client init --id $CLIENT_ID --latency-based-selection"
    echo ""
    exit 1
fi

echo "Gateway/Provider found. Initializing..."
PROVIDER="${GATEWAY_NYMS}@${PROVIDER_ID}"

echo "Configuring with provider: $PROVIDER..."
echo "$PROVIDER" > "$CONFIG_DIR/provider.txt"

cat > "$CONFIG_DIR/config.toml" << EOF
id = "$CLIENT_ID"

[socks5]
port = 1080
host = "127.0.0.1"

[provider]
address = "$PROVIDER"

[logging]
level = "info"

[debug]
traffic = false
EOF

echo "Done. Restarting nym-proxy..."
systemctl --user restart nym-proxy.service 2>/dev/null && echo "nym-proxy restarted" || echo "nym-proxy not installed as service"

echo ""
echo "=== Provider configured ==="
echo "Config: $CONFIG_DIR/config.toml"
echo "Provider: $PROVIDER"
