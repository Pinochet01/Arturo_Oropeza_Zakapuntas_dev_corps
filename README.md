# Arturo Oropeza Zakapuntas Dev Corps

Portfolio of 9 public websites served from Chromebook (24/7 server) + Ryzen 7 WSL2 (compute backend), connected via zrok2 overlay.

## Architecture

```
Internet → Chromebook (satanasio@penguin) — 9 public zrok shares
                │
                │ zrok2 SSH bridge
                ▼
        Ryzen 7 (arturo_oropeza) — Express API, ai-collab MCP, Kaspa node
```

## Public Websites

| Site | URL | Tech |
|------|-----|------|
| CV | arturooropeza.share.zrok.io | Static |
| Renova Solar | renovasolarmx.share.zrok.io | Next.js 16 |
| Delphos Design | delphosdesign.share.zrok.io | Vite + React |
| Delphos SPA | delphosagencia.share.zrok.io | React SPA |
| Eco Consciousness | ecoconciencia.share.zrok.io | Static |
| Construccion Pro | construccionpro.share.zrok.io | Static |
| Albanil Patio | albanilpatio.share.zrok.io | Static |
| Legal Documents | legal.share.zrok.io | Static |

## Projects in this Repo

| Directory | Project | Description |
|-----------|---------|-------------|
| `automation_matrix/` | Automation Matrix | Express API, admin dashboard, deployment scripts, MCP servers |
| `delphos-app/` | Delphos SPA | Vite + React single page application |
| `renova-v2/` | Renova Solar | Next.js 16 static export |
| `albanilpatio/` | Albanil Patio | Construction services landing page |
| `construccion-pro/` | Construccion Pro | Professional construction services |
| `ecological-consciousness/` | Eco Consciousness | Environmental awareness site |

## Backend Services (Ryzen)

| Port | Service |
|------|---------|
| 8080 | Express API |
| 3456 | ai-collab MCP (SSE) |
| 3006 | Automation Matrix |
| 1280 | Ziti Controller |

## Quick Deploy

```bash
# Renova Solar
~/automation_matrix/scripts/deploy-renova.sh

# Delphos Design
~/automation_matrix/scripts/deploy-delphos.sh
```
