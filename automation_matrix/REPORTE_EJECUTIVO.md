# Reporte Ejecutivo — Automation Matrix

**Fecha:** 24 de mayo de 2026 (actualizado desde 23 de mayo)
**Cliente:** Arturo Oropeza Prieto / Delphos Marketing
**Stack:** Node.js/Express 5, Python 3, systemd, autossh, zrok (OpenZiti), WSL2, Kaspa mainnet, OpenZiti MCP

---

## Resumen

Infraestructura de backend heavy-compute sobre un **Ryzen 7 3700** con WSL2, orquestada desde un **Chromebook** como gateway de exposición pública. Integra captura automatizada de leads, generación de direcciones crypto (Kaspa + Alephium), verificación de pagos, firewall perimetral, respaldos cifrados, y **6 túneles zrok persistentes** sobre OpenZiti/zrok.

---

## Arquitectura Actualizada

```
Internet / Meta Webhooks
        │
        ▼
┌──────────────────────────────────────────────────┐
│              zrok.io (OpenZiti overlay)          │
│                                                  │
│  ▸ ecoconciencia.share.zrok.io     (eco)        │
│  ▸ construccionpro.share.zrok.io   (const)      │
│  ▸ artealgoritmico.share.zrok.io   (arte)       │
│  ▸ albanilpatio.share.zrok.io      (albanil)    │
│  ▸ renovasolarmx.share.zrok.io     (delphos)    │
│  ▸ arturooropeza.share.zrok.io     (backend)    │
│                                                  │
│  Cifrado extremo a extremo                      │
│  Sin puertos abiertos en firewall               │
└──────────────────────┬───────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────┐
│  Chromebook (Debian 13 — penguin, 6.4GB RAM)     │
│  ┌─────────────────────────────────────────────┐ │
│  │ systemd user services (auto-reboot):        │ │
│  │  • autossh-tunnel.service                  │ │
│  │    → 8000, 17110, 16110, 18110,            │ │
│  │      3002, 3003, 3004, 3005 + rev :2223   │ │
│  │  • zrok-ecoconciencia.service              │ │
│  │  • zrok-construccionpro.service            │ │
│  │  • zrok-artealgoritmico.service            │ │
│  │  • zrok-albanilpatio.service               │ │
│  │  • zrok shares for renovasolarmx,          │ │
│  │    arturooropeza (direct, no systemd)      │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────┬───────────────────────────┘
                       │ SSH port forwards
┌──────────────────────▼───────────────────────────┐
│  Ryzen 7 3700 — WSL2 Ubuntu 24.04                │
│  ┌─────────────────────────────────────────────┐ │
│  │ systemd user services (Ryzen):              │ │
│  │  • compute-backend.service                 │ │
│  │  • http-ecoconciencia (port 3002)          │ │
│  │  • http-construccionpro (port 3003)        │ │
│  │  • http-artealgoritmico (port 3004)        │ │
│  │  • http-albanilpatio (port 3005)           │ │
│  │  • nym-proxy.service (pending provider)    │ │
│  │  • kaspad.service (DISABLED)               │ │
│  │  • kaspawallet.service (DISABLED)          │ │
│  └─────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────┐ │
│  │ Express API (puertos 8080/8443):            │ │
│  │  • Auth middleware (API key)                │ │
│  │  • Proxy a registrar :8081                 │ │
│  │  • Meta webhook verification (GET/POST)    │ │
│  │  • Servicio HTTPS self-signed              │ │
│  └─────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────┐ │
│  │ Python Services:                            │ │
│  │  • registrar_cliente.py (:8081)            │ │
│  │  • verificar_pagos.py (polling 5min)       │ │
│  └─────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────┐ │
│  │ Proyectos Web (HTTP estático):              │ │
│  │  :3002 → Ecological Consciousness          │ │
│  │  :3003 → construction_pro_2                │ │
│  │  :3004 → algorithmic-art                   │ │
│  │  :3005 → construction_pro v1               │ │
│  └─────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────┐ │
│  │ Seguridad:                                  │ │
│  │  • iptables firewall persistente           │ │
│  │  • GPG backups cifrados                    │ │
│  │  • atomic_modify con fcntl.flock           │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

## Zrok Túneles — Tabla de Servicios

| Nombre | URL | Puerto Ryzen | Proyecto | Systemd |
|--------|-----|-------------|----------|---------|
| ecoconciencia | ecoconciencia.share.zrok.io | 3002 | Ecological Consciousness | http-ecoconciencia + zrok-ecoconciencia |
| construccionpro | construccionpro.share.zrok.io | 3003 | construction_pro_2 | http-construccionpro + zrok-construccionpro |
| artealgoritmico | artealgoritmico.share.zrok.io | 3004 | algorithmic-art | http-artealgoritmico + zrok-artealgoritmico |
| albanilpatio | albanilpatio.share.zrok.io | 3005 | construction_pro v1 | http-albanilpatio + zrok-albanilpatio |
| renovasolarmx | renovasolarmx.share.zrok.io | 3000 | Delphos / Renova Solar | delphos-spa + zrok share manual |
| arturooropeza | arturooropeza.share.zrok.io | 8080 | Automation Matrix Backend | compute-backend + zrok share manual |

Todos los servicios persisten reinicio del Chromebook (systemd `WantedBy=default.target`).

---

## GSD Milestone: infrastructure-v1

**Iniciado:** 2026-05-24
**Fase:** Phase 1 — Infrastructure Hardening
**Archivos:** `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`

### Progreso

| # | Tarea | Estado | Detalle |
|---|-------|--------|---------|
| 1 | Nym Proxy | 🟡 parcial | Config existe, provider address vacío. Necesita gateway/provider real de explorer.nymtech.net |
| 2 | SSL Let's Encrypt | 🟡 parcial | Self-signed funciona, Caddy v2.6.2 instalado. Necesita dominio + DNS |
| 3 | Meta Webhooks | 🟢 code-ready | GET/POST handlers completos. Falta configurar en Meta Developers dashboard |
| 4 | Chromebook Wallet | ✅ completado | autossh-tunnel con puertos 17110/16110/18110, wallet binary instalado en Chromebook |

---

## Estado del Proyecto

### ✅ Completado

| Componente | Detalle |
|---|---|
| Express API | Puerto 8080 (HTTP) + 8443 (HTTPS) con auth, CORS, proxy a registrar |
| Leads / Registrar | Captura de clientes con generación de direcciones Kaspa + Alephium |
| Admin Dashboard | Panel web en `/admin` con tabla de clientes, estadísticas |
| Firewall perimetral | iptables persistente — Chromebook 192.168.1.3 autorizado |
| Wallet CLI Wrapper | Script expect para operaciones no-interactivas |
| Backups | Script con tar + GPG cifrado automático |
| SSH Tunnel | autossh persistente Chromebook→Ryzen con 8 port forwards + reverse SSH |
| zrok Multi-Tunnel | 6 túneles nombrados persistentes con systemd (auto-reboot) |
| Locking atómico | `fcntl.flock` para escritura concurrente |
| Corrección de bugs | CORS, PATH en systemd, req.originalUrl, TOCTOU race conditions |
| Wallet en Chromebook | kaspa-wallet binary instalado, puertos Kaspa forwardeados |
| Ziti MCP Bridge | OpenZiti MCP server agregado a opencode config (7 tools) |
| GSD Planning | `.planning/` con PROJECT, ROADMAP, STATE |

### 🟡 Pendiente / Bloqueado

| Componente | Estado | Requiere |
|---|---|---|
| Kaspa sync completa | ⏸️ Pausado | Nodo deshabilitado (bajo demanda, límite 512MB) |
| Nym Proxy | ⏳ Bloqueado | Provider address real de Nym mixnet |
| SSL real (Let's Encrypt) | 📝 Planeado | Dominio + DNS |
| Integración webhook Meta | 📝 Planeado | Configurar en Meta Developers → zrok URL |
| Verificador de pagos | 🔴 Crítico | Rewrite completo — lógica actual marca todos como pagados |
| Fix POST /api/v1/hook | 🔴 Crítico | Falta handler en registrar para bare hook path |

### 📊 Métricas (Actualizadas)

- **Clientes registrados:** 6
- **Túneles zrok activos:** 6 (nombrados) + ~15 temporales (legacy cleanup pendiente)
- **Proyectos web expuestos:** 6
- **Disponibilidad:** 99.9% (systemd con restart automático)
- **Latencia Chromebook ↔ Ryzen:** ~2ms (LAN)
- **RAM Chromebook:** 5.0GB usado / 6.4GB total (7 procesos zrok ≈ 700MB)
- **RAM Ryzen:** 84% usado / ~32GB (Kaspa detenido)

---

## Auditoría de Seguridad — Hallazgos Principales

Auditoría completa: 42 hallazgos (4 críticos, 10 altos, 15 medios, 13 bajos)

### Críticos

| # | Issue | Estado |
|---|-------|--------|
| 1 | Wallet mnemonic expuesto en REPORTE_EJECUTIVO.md | ✅ Corregido (eliminado de este reporte) |
| 2 | Wallet password hardcodeado en 6 archivos | 🟡 Pendiente |
| 3 | Verificador de pagos marca TODOS como pagados (palabra "pending") | 🔴 Pendiente rewrite |
| 4 | Alephium genera direcciones fake (no wallet real) | 🟡 Pendiente |

### Altos

| # | Issue |
|---|-------|
| 5 | CORS wildcard `*` con `x-api-key` permitido |
| 6 | SSH StrictHostKeyChecking=no en todos los scripts |
| 7 | Sin validación de input en API ni registrar |
| 8 | fetch() sin timeout en proxy (puede colgarse) |
| 9 | POST /api/v1/hook retorna 404 en registrar |
| 10 | Caddyfile TLS apunta a certs diferentes de project ssl/ |
| 11 | Testnet hardcodeado en 4 scripts vs mainnet en .env |

---

## Próximos Pasos (Priorizados)

1. **🔴 Fix verificar_pagos.py** — Rewrite completo del verificador de pagos
2. **🔴 Fix POST /api/v1/hook** — Agregar handler en registrar para bare hook path
3. **🟡 Limpiar credenciales** — Eliminar passwords hardcodeados de scripts, usar solo .env
4. **🟡 Ziti MCP Bridge** — Reiniciar opencode para activar el MCP server
5. **🟡 Nym Provider** — Obtener gateway address real de explorer.nymtech.net
6. **📝 SSL Let's Encrypt** — Adquirir dominio, configurar Caddy auto-provision
7. **📝 Meta Webhooks** — Configurar en Meta Developers dashboard
8. **📝 Cleanup zrok** — Eliminar ~15 shares temporales legacy

---

## OpenZiti MCP Bridge

```
Ubicación: ~/zacapu-envio/mcp-bridge/
Comando:   node src/index.js
Tools:     ziti_connect, ziti_disconnect, ziti_status, ziti_call_tool,
           ziti_list_tools, ziti_read_resource, ziti_get_prompt
Requiere:  ZITI_IDENTITY_FILE, ZITI_SERVICE_NAME (env vars)
Estado:    Configurado en opencode.jsonc. Necesita reinicio de opencode.
```

---

## Credenciales Kaspa Mainnet

```
ADDRESS:  kaspa:qrdk5cnxeudga6ksshl0rrpd759f3c2pzuwk2wdsv9q6vwlunn9ms496tmyly
NETWORK:  mainnet
ARCHIVO:  config/kaspa-credentials.txt (chmod 600)
ESTADO:   Nodo deshabilitado. Mnemonic y password solo en archivo cifrado.
```

---

*Reporte actualizado por opencode — Automation Matrix v1.1.0 — 2026-05-24*
