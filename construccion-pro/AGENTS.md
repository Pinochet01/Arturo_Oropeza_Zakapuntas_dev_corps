# Construccion_pro_2 Server - Project Documentation

## Project Overview

This folder serves as the Windows development server for **CHECOS CONSTRUYENDO SUEÑOS** - a construction company website for Zacapu, Michoacán.

**Last synced with:** ZacapuEnvío route optimizer project (`~/zacapu-envio/`)

---

## Server Commands

### ZacapuEnvío (route optimizer)

```bash
cd ~/zacapu-envio && npm start
# http://localhost:3000/          ← desktop route optimizer
# http://localhost:3000/mobile.html ← mobile PWA
```

### Construccion Website

```bash
cd "C:\Users\Arturo Oropeza\Desktop\construccion_pro_2_server"
npx serve -l 3000
# or run serve.bat
```

Or use START.bat for instructions.

---

## Project: ZacapuEnvío Route Optimizer

Delivery route optimization for Zacapu, Michoacán.

- **Stack**: Node.js, Express, Leaflet, OpenStreetMap, OSRM
- **Location**: `~/zacapu-envio/` (WSL)
- **Depot**: C Dalia #40, Col Lomas Jardín (19.8075, -101.7925)

### Features (v5)

- `POST /api/optimize-route` — server-side optimization with OSRM distance matrix
- 2-opt algorithm using real road distances (not crow-fly)
- Multi-driver routing (1-5 drivers) with k-means geographic clustering
- Per-driver color-coded routes on map
- Desktop (`index.html`) and mobile PWA (`mobile.html`)

### Sync to Windows

Files sync to Windows at: `C:\Users\Arturo Oropeza\Desktop\construccion_pro_2_server\`

---

## For AI Agents

- Main file to edit for content changes: `construccion_pro_2.html`
- Assets are organized in `assets/` subfolders by type
- Follow professional construction industry design language
- Server for construccion site: `npx serve -l 3000` in this directory
