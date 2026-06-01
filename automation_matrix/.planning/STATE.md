# STATE — Automation Matrix

## Milestone: infrastructure-v1
**Started:** 2026-05-24
**Last Updated:** 2026-05-28
**Focus:** Phase 1 — Infrastructure Hardening

## Progress

| Task | Status | Detail |
|------|--------|--------|
| Nym Proxy | partial | Config exists, provider address empty — needs real gateway/provider from nymtech.net |
| SSL (Let's Encrypt) | partial | Self-signed cert works, Caddy v2.6.2 installed, needs domain + DNS |
| Meta Webhooks | code-ready | GET/POST handlers complete in server.js + registrar. Fixed bare /api/v1/hook POST. Needs Meta dashboard config |
| Chromebook Wallet Access | **completed** | autossh-tunnel deployed with all Kaspa ports. Wallet binary on Chromebook. **Kaspa node STARTED 2026-05-27 — running stable 7h+, 900M RAM.** |
| Zrok Multi-Tunnels | **completed** | 7 named zrok shares on Chromebook. **2026-05-28: 3 sites migrated from Ryzen → Chromebook direct hosting.** All persistent with individual systemd services. |
| Website Migration to Chromebook | **completed** | ecoconciencia (:3002), construccionpro (:3003), albanilpatio (:3005) now served by Python3 HTTP servers directly on Chromebook. Files at /home/satanasio/sites/. Systemd: site-eco-3002, site-const-3003, site-albanil-3005. |
| arturooropeza fix | **completed** | Zrok share was pointing to :8080 (Express API) causing 502. Fixed with --override-endpoint http://127.0.0.1:8087 (CV server). |
| Ziti MCP Bridge | **deployed** | Bridge configured in opencode. Dark MCP server active on Ziti "dark-mcp" service. Bridge connection attempted but failed (status: undefined) — needs debug. |
| Ziti MCP (prod) | **active** | Authenticated to controller at localhost:1280 via mTLS. Tools accessible in opencode. |
| zrok v1→v2 Migration | **completed** | SSH bridge migrated to zrok2. v1 web shares still running. autossh uses v2 tunnel (:9193). ssh penguin-zrok2 alias configured. |

## zrok2 Infrastructure (2026-05-28)

### SSH Bridge (v2.0.4)
- **Ryzen**: zrok2-share-ryzen-ssh.service ✅ → shares Ryzen:22 (token: ryzen-ssh-v2)
- **Ryzen**: zrok2-access-chromebook.service ✅ → binds :9192 for interactive SSH
- **Chromebook**: zrok2-access-ryzen.service ✅ → binds :9193 for autossh
- **Chromebook**: zrok2-share-ssh.service ✅ → shares Chromebook:22 (token: ssh-v2)
- **Chromebook**: autossh-zrok-ryzen-v2.service ✅ → simplified forwards: **only :8080 + :3006** (+ reverse :8022)
- **Verified 2026-05-28**: All 3 Chromebook services active. SSH penguin-zrok2 functional. autossh restart counter reset after removing dead port forwards.

### 6 Named Public Shares (v1, from Chromebook) — updated 2026-05-28 session 2
```
✅ 5vevm2cgtysa.share.zrok.io     → Chromebook:8087 (CV, Node serve-static) [NEW TOKEN + security headers]
✅ 69jtmbzebj9c.share.zrok.io     → Chromebook:3030 (Renova, Node static)    [NEW TOKEN + security headers]
✅ gxz8v8db3k5x.share.zrok.io     → Chromebook:3000 (Delphos, Node Express)  [NEW TOKEN + security headers]
✅ 8lq6xe01eqqp.share.zrok.io     → Chromebook:3002 (Eco, Node static)       [NEW TOKEN + security headers]
✅ 7njabikwkjnk.share.zrok.io     → Chromebook:3003 (Const, Node static)     [NEW TOKEN + security headers]
✅ xxhajfljujge.share.zrok.io     → Chromebook:3005 (Albañil, Node static)   [NEW TOKEN + security headers]
```
All tokens regenerated after v1 re-reserve. Custom DNS names lost during v2 migration attempt.
**Security headers added to all sites:** X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy + Cache-Control.
Each has its own systemd service: `zrok-<name>.service`

### Chromebook Local Site Services (new 2026-05-28)
| Port | Service | Systemd | Source |
|------|---------|---------|--------|
| 3000 | Delphos SPA | Node server/index.js | ~/my-project/uploads/Renovav2/Renova_v2 |
| 3002 | Ecoconciencia | site-eco-3002.service | /home/satanasio/sites/ecological-consciousness |
| 3003 | ConstruccionPro | site-const-3003.service | /home/satanasio/sites/construccion-pro |
| 3005 | AlbanilPatio | site-albanil-3005.service | /home/satanasio/sites/albanilpatio |
| 3030 | Renovasolarmx | renovasolarmx-site.service | Node serve-static.js with security headers |
| 8087 | Arturo Oropeza CV | site-cv-8087.service | Node serve-static.js (was manual Python3) |

### Ryzen Backend Services (still active)
| Port | Service | Systemd | Note |
|------|---------|---------|------|
| 3000 | Delphos SPA (serve_spa.py) | — | fallback — traffic now goes to Chromebook |
| 3002 | Ecoconciencia | eco-3002.service | fallback — traffic now goes to Chromebook |
| 3003 | ConstruccionPro | const-3003.service | fallback — traffic now goes to Chromebook |
| 3005 | AlbanilPatio | albanil-3005.service | fallback — traffic now goes to Chromebook |
| 3006 | Automation Matrix root | — | |
| 3030 | Renovasolarmx | renovasolarmx.service | fallback |
| 3456 | ai-collab MCP (SSE) | — | |
| 8000 | Express webhook | — | |
| 8001 | Express webhook2 | — | |
| 8080 | Express API | — | access via autossh Chromebook:8080→Ryzen:8080 |
| 8081 | registrar_cliente | — | |
| 8443 | Express HTTPS | — | |
| 9192 | zrok2 access Chromebook SSH | zrok2-access-chromebook.service | |

### Autossh Port Forwarding (simplified 2026-05-28)
```
Chromebook → Ryzen:  -L 8080:localhost:8080  (Express API)
                      -L 3006:localhost:3006  (Automation Matrix)
Ryzen → Chromebook:   -R 8022:localhost:22    (reverse SSH)
```
Removed forwards: 3000, 3002, 3003, 3004, 3005 (now served locally on Chromebook)

## Ziti MCP Implementation Plan

### Current State
- **ziti-mcp** (OpenZiti Controller): Already working. Authenticated to `localhost:1280` via mTLS. Profile "prod". Exposes full Ziti management API (create/delete identities, services, policies, etc.)
- **ziti-mcp-bridge**: Configured but bridge target missing. Has identity (`mcp-bridge.json`). Expects a `dark-mcp` service inside the Ziti network. Will proxy MCP protocol between opencode and the dark service.
- **Ziti network**: Controller at localhost:1280. Need to verify if the controller is running and what identities/services/policies exist.

### Implementation Steps
1. **Verify Ziti controller** is running (`ziti-mcp` can query it)
2. **Deploy dark-mcp service**: Create a Ziti service `dark-mcp` that tunnels to an MCP server running inside the Ziti overlay (e.g., the automation_matrix MCP tools)
3. **Create Ziti identity** for the bridge client (mcp-bridge.json already exists, verify enrollment)
4. **Create service policies** to allow bridge identity → dark-mcp service access
5. **Test end-to-end**: opencode → ziti-mcp-bridge → Ziti network → dark-mcp service

### Ziti MCP Tools Available (ziti-mcp)
- Create/list/delete: Identities, Services, Edge Routers, Configs, Config Types, Auth Policies, Posture Checks, Service Policies, Edge Router Policies, Terminators, Enrollments, Authenticators, External JWT Signers, CAs, Controller Settings
- Get: Identity policy advice, posture data, failed service requests, session route paths
- Actions: Enable/disable identities, verify/remove MFA, create/verify CAs, enroll MFA, create database snapshots, verify data integrity

### Ziti MCP Bridge Tools (ziti-mcp-bridge)
- `ziti_connect`: Connect to a dark MCP service
- `ziti_disconnect`: Disconnect
- `ziti_status`: Check connection status
- `ziti_call_tool`: Call a tool on the dark service
- `ziti_list_tools`: List tools on dark service
- `ziti_list_resources` / `ziti_list_prompts`: List resources/prompts

## Kaspa Node (2026-05-27)

- **State**: ACTIVE (running) since 2026-05-27 10:34 CST. PID 412, Memory 899.8M/900M stable.
- **Ports**: 17110 (wRPC Borsh), 16110 (gRPC), 18110 (wRPC JSON) — all listening on 127.0.0.1
- **Service**: `~/.config/systemd/user/kaspad.service` — enabled, MemoryMax=900M
- **Flags**: `--ram-scale=0.2 --outpeers=4 --loglevel=warn --nologfiles`
- **Script**: `kaspa-node {light|full|status|stop|restart}` uses systemctl
- **Binary**: `~/automation_matrix/kaspa/bin/kaspad` (v1.1.0, 38MB)
- **Wallet**: `~/.kaspawallet/config.toml` → mainnet, 127.0.0.1:8070. Daemon not running.

## Ziti Network (2026-05-27)

- **ziti-controller**: ACTIVE (since 10:34). Admin: debug-admin/ziti123. Port 1280 (mTLS).
- **ziti-router**: ACTIVE (since 10:34). Connected to controller, subscriptions renewing normally.
- **dark-mcp.service**: ACTIVE (since 17:09). Node v20.20.2, 8.9M RAM. Listening on Ziti service "dark-mcp".
  - Bridge connection attempt at 18:06 (caller: mcp-bridge, id: 1158153728) → failed (status: undefined). Needs debug.
- **Ziti identities**: mcp-server (bind), mcp-bridge (dial), mcp-agent (dial), debug-admin (admin).

## Delphos Website (2026-05-27 — Lost Session Work)

- **Privacy page**: `src/app/privacidad/page.tsx` — Cyberpunk theme with Sovereign Manifesto (6 principles): Data Sovereignty, Privacy by Design, Total Transparency, Sovereign Infrastructure, Right to be Forgotten, No Commercial Surveillance. Full ARCO rights, cookie policy, PDFM compliance.
- **Portfolio component**: Updated with `url` + `status` fields (live/development/archived), status badges, external links. Data in `constants.ts` now includes 6 projects with status labels.
- **constants.ts**: Complete data — servicios (6), proyectos (6 with url/status), procesoSteps (5), valores (3), testimonios (3), stats (4), infoContacto (4), footer arrays.
- **Contact info**: email `arturooropezaprieto3@gmail.com`, phone `4436942217`, WA `https://wa.me/524436942217`

## Next Actions

1. Debug dark-mcp bridge connection failure (status: undefined)
2. Rewrite verificar_pagos.py (proper UTXO/address matching)
3. Clean hardcoded credentials from scripts (use .env only)
4. Find Nym provider address from explorer.nymtech.net
5. Configure Meta webhook in Facebook Developers
6. Migrate arturooropeza zrok share to v2 (v1 intermittent 502)
7. Remove artealgoritmico zrok share (project deleted, port 3004 dead)
8. Build delphosagencia dist/ on Ryzen or serve from Chromebook Node directly
9. Remove unused CDN CSS from ecoconciencia (114KB bootstrap+animate+font-awesome)
10. Fix renovasolarmx React hydration error (#418)
11. Apply Lighthouse fixes to remaining sites (404s, heading order, labels)
12. Restore Gemini API quota or upgrade to paid tier for collaborative auditing

## Completed 2026-05-28 (Session 1)

| Milestone | Detail |
|-----------|--------|
| Website Migration | 3 sites (eco, const, alb) from Ryzen → Chromebook direct hosting |
| Node.js Static Server | serve-static.js with ETag caching deployed on 5 sites |
| Autossh Simplification | Only forwards :8080, :3456, :3006 (was 7 ports) |
| Lighthouse Audit | All 6 sites audited, scores documented, fixes applied |
| Accessibility Fixes | font-display:swap, contrast, <main>, lang, null guards |
| Claude Desktop Config | Fixed wsl.exe wrappers for desktop-commander + ziti-mcp-bridge |
| ai-collab Status | 7 sessions, 20 tasks, migration update posted to Claude |
| Gemini Infrastructure | Lighthouse + Chromium 147 installed, MCP servers operational |
| arturooropeza Fix | zrok share → :8087 (was :8080), --override-endpoint applied |

## Completed 2026-05-28 (Session 2)

| Milestone | Detail |
|-----------|--------|
| Security Headers | X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy on all 6 sites |
| Cache Control | Cache-Control + ETag on all 6 sites |
| CV Server Migration | Port 8087 from Python http.server → Node serve-static.js (site-cv-8087.service) |
| zrok v2 Investigation | Attempted migration. Blocked: zrok2 share public not idempotent for systemd (creates new share each restart). Kept v1. |
| zrok v1 Re-reserve | All 6 shares re-reserved with new random tokens after custom DNS names lost |
| Orphan Cleanup | Deleted 20+ orphaned zrok2 shares (garbage from failed migration attempts) |
| Bug Fixes | zrok-delphos-access disabled (pointed to deleted share). Express API identified as offline (missing node_modules). |

---

---

## Session 2026-05-30

### Kaspa Node — STOPPED
- kaspad.service stopped and DISABLED (user request)
- Was running since 2026-05-27 with ~525MB RAM, 4 outbound peers
- To restart: `systemctl --user enable --now kaspad.service`

### zrok-ai-collab-access — DISABLED (was failing)
- Service on Chromebook was failing 334+ restarts with `[POST /access][404] accessNotFound` for token `eikr7t7lqxxp`
- Port :3456 already occupied by autossh forward — service was REDUNDANT
- ai-collab MCP already available via autossh tunnel Chromebook:3456→Ryzen:3456
- Service now disabled on Chromebook

### ai-collab MCP Bridge — VERIFIED OPERATIONAL
- Python MCP SDK confirmed all 7 tools: delegate_task, get_pending_tasks, claim_task, complete_task, post_message, read_messages, share_context
- Transport: autossh forward Chromebook:3456↔Ryzen:3456 (SSE)
- 12 tasks in queue, Claude on Chromebook actively claims and executes tasks
- Both Ryzen opencode and Chromebook Claude connect as separate MCP clients

### Chromebook Claude Config — UPDATED
- Added 2 new MCP servers to /home/satanasio/.claude.json:
  - `filesystem` — @modelcontextprotocol/server-filesystem (root: /home/satanasio)
  - `desktop-commander` — @wonderwhy-er/desktop-commander (terminal + file editing)
- Total: 10 MCP servers
- Claude needs RESTART to load new tools

### zrok2 SSH Bridge — ALL HEALTHY
- All 5 services active: zrok2-share-ryzen-ssh, zrok2-access-chromebook (:9192), zrok2-share-ssh (Chromebook), zrok2-access-ryzen (:9193), autossh-zrok-ryzen-v2
- Ports forwarded: :8080 (Express API), :3456 (ai-collab MCP), :3006 (Automation Matrix)
- Reverse SSH :8022 preserved
- ssh penguin-zrok2 functional

*Updated: 2026-05-30*
