#!/bin/bash
# kaspa-wallet-cli.sh — Thin wrapper for rusty-kaspa wallet operations  
# Used by registrar_cliente.py and verificar_pagos.py
# Commands: balance | new-address | address | utxos

WALLET_BIN="${KASPA_WALLET_BIN:-$HOME/automation_matrix/bin/kaspa-wallet}"
WALLET_PASS="${KASPA_WALLET_PASS:-$(grep -oP 'KASPA_WALLET_PASS=\K.*' "$HOME/automation_matrix/.env" 2>/dev/null | head -1)}"
API_SCRIPT="$HOME/automation_matrix/scripts/kaspa-wallet-api.exp"

strip_ansi() { sed -E 's/\x1b\[[0-9;]*[a-zA-Z]//g; s/\x1b\][0-9;]*[^\x07]*\x07//g'; }

case "$1" in
    balance)
        output=$(timeout 60 "$API_SCRIPT" "$WALLET_BIN" "balance" 2>&1 | strip_ansi)
        echo "$output" | grep -oP 'kaspa:[a-zA-Z0-9]+' | head -1
        echo "$output" | grep -oP '\d+\.?\d*\s*KAS' | head -1
        ;;
    new-address)
        output=$(timeout 60 "$API_SCRIPT" "$WALLET_BIN" "new-address" 2>&1 | strip_ansi)
        echo "$output" | grep -oP 'kaspa:[a-zA-Z0-9]+' | tail -1
        ;;
    address)
        output=$(timeout 60 "$API_SCRIPT" "$WALLET_BIN" "address" 2>&1 | strip_ansi)
        echo "$output" | grep -oP 'kaspa:[a-zA-Z0-9]+' | tail -1
        ;;
    utxos)
        output=$(timeout 60 "$API_SCRIPT" "$WALLET_BIN" "list" 2>&1 | strip_ansi)
        echo "$output"
        ;;
    *)
        echo "Usage: $0 {balance|new-address|address|utxos}"
        exit 1
        ;;
esac
