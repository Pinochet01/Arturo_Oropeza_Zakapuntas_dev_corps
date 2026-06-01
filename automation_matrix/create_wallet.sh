#!/bin/bash
# create_wallet.sh — Creates Kaspa mainnet wallet
# No local node needed. Connects to public RPC.
# Password from env: KASPA_WALLET_PASS

WALLET_PASS="${KASPA_WALLET_PASS:-$(grep -oP 'KASPA_WALLET_PASS=\K.*' "$HOME/automation_matrix/.env" 2>/dev/null | head -1)}"
if [ -z "$WALLET_PASS" ]; then
    echo "Error: KASPA_WALLET_PASS not set in .env"
    exit 1
fi

echo "Creating Kaspa Mainnet wallet..."

mkdir -p ~/.kaspawallet/kaspa-mainnet

if command -v expect &> /dev/null; then
    expect << DONE
spawn $HOME/automation_matrix/bin/kaspa-wallet create
expect "Enter passphrase:"
send "$WALLET_PASS\r"
expect "Repeat passphrase:"
send "$WALLET_PASS\r"
expect "Save seed phrase"
send "\r"
expect eof
DONE
else
    echo "expect not installed. Run: sudo apt install expect"
    exit 1
fi

WALLET_DIR="$HOME/.kaspawallet/kaspa-mainnet"
if [ -f "$WALLET_DIR/keys.json" ]; then
    echo "Wallet created at $WALLET_DIR"
    ADDRESS=$(python3 -c "import json; d=json.load(open('$WALLET_DIR/keys.json')); print(d.get('public_addresses',['unknown'])[0])" 2>/dev/null)
    echo "Address: $ADDRESS"
else
    echo "Error: wallet creation failed"
fi
