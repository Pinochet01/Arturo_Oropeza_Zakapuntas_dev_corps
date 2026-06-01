#!/usr/bin/env python3
"""SPA-aware static file server for delphos-app dist/"""
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        path = self.translate_path(self.path)
        is_asset = self.path.startswith("/assets/")
        exists = os.path.exists(path)
        is_dir = exists and os.path.isdir(path)
        is_file = exists and os.path.isfile(path)

        if (not exists or is_dir) and not is_asset:
            self._serve_index()
            return
        return super().do_GET()

    def _serve_index(self):
        try:
            idx = os.path.join(DIST_DIR, "index.html")
            with open(idx, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", len(data))
            self.end_headers()
            self.wfile.write(data)
        except OSError:
            self.send_error(500, "index.html not found")

if __name__ == "__main__":
    server = http.server.HTTPServer(("0.0.0.0", PORT), SPAHandler)
    print(f"[delphos-spa] serving {DIST_DIR} on :{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[delphos-spa] stopped")
