#!/bin/bash
echo "=== Kaspa Wallet Status (Mainnet) ==="
WALLET_BIN="${KASPA_WALLET_BIN:-$HOME/automation_matrix/bin/kaspa-wallet}"
API_SCRIPT="$HOME/automation_matrix/scripts/kaspa-wallet-api.exp"

echo -e "\nAddress:"
timeout 60 "$API_SCRIPT" "$WALLET_BIN" "address" 2>&1 | sed -E 's/\x1b\[[0-9;]*[a-zA-Z]//g' | grep -oP 'kaspa:[a-zA-Z0-9]+' | tail -1

echo -e "\nBalance:"
timeout 60 "$API_SCRIPT" "$WALLET_BIN" "list" 2>&1 | sed -E 's/\x1b\[[0-9;]*[a-zA-Z]//g' | grep -P '(KAS|kaspa:)' | head -20

echo -e "\nWallet Files:"
ls -la ~/.kaspawallet/kaspa-mainnet/ 2>/dev/null
