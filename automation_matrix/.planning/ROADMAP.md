# ROADMAP — Automation Matrix

## Phase 1 — Infrastructure Hardening

**Goal:** Complete the 4 remaining infrastructure items to make the system production-ready.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 1 | Nym Proxy | 🟡 partial | Obtain real Nym gateway+provider address pair from explorer.nymtech.net, configure ~/.nym/socks5-clients/openclaw-shield/config.toml |
| 2 | SSL (Let's Encrypt) | 🟡 partial | Switch Caddyfile from self-signed to auto-provision Let's Encrypt; requires domain + DNS |
| 3 | Meta Webhooks | 🟢 code-ready | GET/POST handlers complete in server.js + registrar. Bare /api/v1/hook POST fixed. Just configure Meta dashboard |
| 4 | Chromebook Wallet Access | ✅ done | autossh-tunnel deployed, wallet binary on Chromebook, Kaspa ports forwarded |
| 5 | Zrok Multi-Tunnels | ✅ done | 6 named zrok shares persistent on Chromebook: ecoconciencia, construccionpro, artealgoritmico, albanilpatio, renovasolarmx, arturooropeza |
| 6 | Ziti MCP Bridge | ✅ done | Added to opencode config. 7 tools (connect, disconnect, status, call_tool, list_tools, read_resource, get_prompt) |

**Verification:**
- `systemctl --user status nym-proxy.service` shows active (running)
- `curl https://<domain>/health` returns valid HTTPS with Let's Encrypt cert
- Meta webhook receives test lead → appears in admin dashboard
- `kaspa-wallet` CLI works from Chromebook via SSH tunnel on port 17110
- All 6 zrok URLs return HTTP 200

---

### Phase 2 — Code Audit Fixes

**Goal:** Fix critical and high-severity issues from the security/code audit.

| # | Task | Severity | Description |
|---|------|----------|-------------|
| 1 | Rewrite verificar_pagos.py | 🔴 CRITICAL | Match UTXO addresses to client keys, track confirmations |
| 2 | Clean hardcoded credentials | 🔴 CRITICAL | Remove passwords from scripts, use .env only |
| 3 | Fix Alephium addresses | 🔴 CRITICAL | Integrate real Alephium wallet JAR or remove feature |
| 4 | Add input validation | 🟠 HIGH | Validate email, phone, name in API and registrar |
| 5 | Fix CORS config | 🟠 HIGH | Restrict Access-Control-Allow-Origin |
| 6 | Add fetch timeouts | 🟠 HIGH | AbortSignal.timeout in proxy functions |
| 7 | Fix SSH host key checking | 🟠 HIGH | Use accept-new instead of no |
| 8 | Fix testnet/mainnet conflict | 🟠 HIGH | All scripts read from KASPA_NETWORK env var |
| 9 | Extract shared code | 🟡 MEDIUM | atomic_modify into shared module |
| 10 | Remove dead code | 🟡 MEDIUM | Unused imports, variables, functions |

---

### Phase 3 — Monitoring & Alerts

**Goal:** Health checks, uptime monitoring, and alerts for critical services.

### Phase 4 — Dashboard Enhancements

**Goal:** Advanced stats, payment tracking, export reports.

---

## Status

| Phase | Status |
|-------|--------|
| Phase 1 — Infrastructure Hardening | **85% complete (5/6 tasks done)** |
| Phase 2 — Code Audit Fixes | **in progress** (security headers + caching deployed 2026-05-28 session 2) |
| Phase 3 — Monitoring & Alerts | planned |
| Phase 4 — Dashboard Enhancements | planned |

## 2026-05-28 Session 2 Impact

**Security**: CORS fix partly addressed — security headers deployed to all 6 public sites via serve-static.js update and Express middleware. Express API on port 8080 needs node_modules restore and CORS restriction (currently `Access-Control-Allow-Origin: *`).

**zrok v2 Migration**: Investigated and documented. zrok2 `share public` is NOT idempotent — each systemd restart creates a new share. V1 retained for stability. zrok2 `share private` with `--share-token` + `--open` may be viable alternative for future migration.

**Cleanup**: 20+ orphaned zrok2 shares deleted across envs 715wPq8hdr and SY6JOM8h6r. zrok-delphos-access service disabled (orphaned reference).

---

*Last updated: 2026-05-28*
