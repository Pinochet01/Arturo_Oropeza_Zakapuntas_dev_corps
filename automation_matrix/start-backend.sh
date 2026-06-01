#!/usr/bin/env bash
DIR="$(cd "$(dirname "$0")" && pwd)"
JAVA_HOME=$(ls -d "$HOME/.local/java/jdk-"* 2>/dev/null | head -1)
export PATH="$HOME/.local/bin${JAVA_HOME:+:$JAVA_HOME/bin}:/usr/bin:/bin"

# Load secrets (handles values with spaces/special chars)
if [ -f "$DIR/.env" ]; then
  set -a; source "$DIR/.env"; set +a
fi

# Start Express API server
node "$DIR/server.js" &
NODE_PID=$!

# Start registrar service
python3 "$DIR/registrar_cliente.py" &
REG_PID=$!

# Start payment verifier (polling every 5 min)
python3 "$DIR/verificar_pagos.py" &
PAY_PID=$!

echo "[start-backend] PID | server: $NODE_PID | registrar: $REG_PID | payments: $PAY_PID"

cleanup() { kill "$NODE_PID" "$REG_PID" "$PAY_PID" 2>/dev/null; wait; }
trap cleanup EXIT INT TERM
wait
