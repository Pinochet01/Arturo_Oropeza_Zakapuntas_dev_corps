#!/usr/bin/env python3
"""
verificar_pagos.py — Payment Verification Daemon
Checks Kaspa blockchain UTXOs for incoming payments by matching
receiving addresses against per-client address_kaspa fields.
"""

import json
import os
import re
import time
import subprocess
import sys
from datetime import datetime
from clientes_store import atomic_modify, load_clientes

HOME = os.path.expanduser("~")
KASPA_CLI = os.path.expanduser("~/automation_matrix/scripts/kaspa-wallet-cli.sh")
POLL_INTERVAL = int(os.environ.get("POLL_INTERVAL", 300))

KASPA_ADDR_RE = re.compile(r"kaspa:[a-zA-Z0-9]+")


def _safe_cli(*args):
    result = subprocess.run(
        [KASPA_CLI, *args],
        capture_output=True, timeout=60, text=True
    )
    if result.returncode != 0:
        return None
    return result.stdout


def list_utxos():
    raw = _safe_cli("utxos")
    if not raw:
        return []
    utxos = []
    current = {}
    for line in raw.split("\n"):
        line = line.strip()
        addr_match = KASPA_ADDR_RE.search(line)
        if addr_match:
            current = {"address": addr_match.group(0)}
        elif "KAS" in line and current:
            m = re.search(r"(\d+\.?\d*)\s*KAS", line)
            if m:
                current["amount_kas"] = float(m.group(1))
                current["confirmed"] = "confirmed" in line.lower() and "pending" not in line.lower()
                utxos.append(dict(current))
                current = {}
    return utxos


def verify_pending():
    utxos = list_utxos()
    if not utxos:
        return

    confirmed_utxos = [u for u in utxos if u.get("confirmed") and u.get("amount_kas", 0) > 0]
    if not confirmed_utxos:
        return

    utxo_addrs = {u["address"] for u in confirmed_utxos}
    utxo_map = {u["address"]: u for u in confirmed_utxos}

    def _verify(db):
        count = 0
        for cid, entry in db.items():
            if entry.get("estado") != "pendiente_pago":
                continue
            addr = entry.get("address_kaspa", "")
            if addr in utxo_addrs:
                utxo = utxo_map[addr]
                db[cid]["estado"] = "pagado"
                db[cid]["pagado_en"] = datetime.now().isoformat()
                db[cid]["monto_kas"] = utxo["amount_kas"]
                count += 1
        return count

    count = atomic_modify(_verify)
    if count:
        print(f"[verificar_pagos] {count} cliente(s) marcado(s) como pagado(s)")


def verify_loop():
    print(f"[verificar_pagos] polling cada {POLL_INTERVAL}s")
    while True:
        try:
            verify_pending()
        except Exception as e:
            print(f"[verificar_pagos] error: {e}", file=sys.stderr)
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    verify_loop()
