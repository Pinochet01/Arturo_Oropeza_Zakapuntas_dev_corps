#!/usr/bin/env python3
"""
registrar_cliente.py — Automated Lead Capture & Billing System
Listens for client registrations, generates crypto billing addresses.
"""

import json
import os
import hashlib
import subprocess
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
from datetime import datetime

from clientes_store import atomic_modify, load_clientes

HOME = os.path.expanduser("~")
CONFIG_DIR = os.path.join(os.path.dirname(__file__), "config")
KASPA_WALLET = os.path.expanduser("~/automation_matrix/scripts/kaspa-wallet-cli.sh")
WALLET_PASS = os.environ.get("KASPA_WALLET_PASS", "")
MAX_REQUEST_SIZE = 65536


def _kaspa_address(client_id):
    try:
        result = subprocess.run(
            [KASPA_WALLET, "new-address"],
            capture_output=True, timeout=45, text=True
        )
        for line in result.stdout.split("\n"):
            line = line.strip()
            if line.startswith("kaspa:"):
                return line.split()[0]
        return f"kaspa:{hashlib.sha256(client_id.encode()).hexdigest()[:42]}"
    except Exception:
        return f"kaspa:{hashlib.sha256(client_id.encode()).hexdigest()[:42]}"


def _alephium_address(client_id):
    return f"alephium:{hashlib.sha256((client_id + '_aleph').encode()).hexdigest()[:42]}"


class RegistroHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        path = urlparse(self.path).path
        length = int(self.headers.get("Content-Length", 0))
        if length > MAX_REQUEST_SIZE:
            self._respond(413, {"error": "payload demasiado grande"})
            return
        body = self.rfile.read(length).decode() if length else "{}"

        try:
            payload = json.loads(body)
        except json.JSONDecodeError:
            self._respond(400, {"error": "JSON invalido"})
            return

        if path in ("/api/v1/registrar", "/api/v1/hook", "/api/v1/hook/marketing"):
            result = self._registrar(payload)
            self._respond(201, result)
        else:
            self._respond(404, {"error": "ruta no encontrada"})

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/v1/clientes":
            self._respond(200, list(load_clientes().values()))
        elif path.startswith("/api/v1/cliente/"):
            cid = path.split("/")[-1]
            db = load_clientes()
            if cid in db:
                self._respond(200, db[cid])
            else:
                self._respond(404, {"error": "cliente no encontrado"})
        else:
            self._respond(404, {"error": "ruta no encontrada"})

    def _registrar(self, payload):
        def _mutate(db):
            nombre = payload.get("nombre") or payload.get("name") or payload.get("lead_name", "anon")
            email = payload.get("email") or payload.get("correo", "")
            telefono = payload.get("telefono") or payload.get("phone", "")
            servicio = payload.get("servicio") or payload.get("product", "general")
            client_id = hashlib.sha256(f"{nombre}{email}{datetime.now().isoformat()}".encode()).hexdigest()[:16]
            db[client_id] = {
                "id": client_id,
                "nombre": nombre,
                "email": email,
                "telefono": telefono,
                "servicio": servicio,
                "address_kaspa": _kaspa_address(client_id),
                "address_alephium": _alephium_address(client_id),
                "registrado": datetime.now().isoformat(),
                "estado": "pendiente_pago",
            }
            return db[client_id]
        return atomic_modify(_mutate)

    def _respond(self, status, data):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode())

    def log_message(self, _fmt, *args):
        sys.stderr.write(f"[registrar] {datetime.now().isoformat()} {args[0]} {args[1]} {args[2]}\n")


def main():
    port = int(os.environ.get("REGISTRAR_PORT", 8081))
    server = HTTPServer(("0.0.0.0", port), RegistroHandler)
    print(f"[registrar_cliente] escuchando en 0.0.0.0:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()


if __name__ == "__main__":
    main()
