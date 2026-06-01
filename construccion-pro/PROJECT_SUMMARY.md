# CHECOS CONSTRUYENDO SUEÑOS + ZacapuEnvío — Project Summary

## Overview

Two projects managed from this Windows desktop folder:

1. **CHECOS CONSTRUYENDO SUEÑOS** — Construction company static website
2. **ZacapuEnvío** — Delivery route optimizer (managed from WSL `~/zacapu-envio/`)

---

## ZacapuEnvío — Route Optimizer

### Location
`~/zacapu-envio/` (WSL home directory)

### Start Command
```bash
cd ~/zacapu-envio && npm start
```
- Serves at `http://localhost:3000/` (desktop) and `/mobile.html` (mobile)
- Single Express server handles both frontend + `/api/optimize-route` endpoint
- No Python http.server needed — Express serves static files

### API
```
POST /api/optimize-route
Body: { addresses: [{id,latitude,longitude,text}], depotLat, depotLng, numDrivers }
Returns: { routes: [{driverId,stops,geometry,totalDistance,totalDuration}], summary: {...} }
```

### Version History
| Version | Change |
|---------|--------|
| v1-v3 | Basic route optimizer with OSRM |
| v4 | Local geocoding, postal code database |
| v5 (current) | Server-side OSRM distance matrix + 2-opt, multi-driver k-means clustering, 5-color routes, stripped server.js (~170 lines from 521) |

### Key Files
| File | Purpose |
|------|---------|
| `server.js` | Express server + optimizer endpoint (~170 lines) |
| `frontend/app.js` | Desktop route optimizer UI |
| `frontend/mobile-app.js` | Mobile PWA route optimizer |
| `frontend/mobile.html` | Mobile entry point |
| `frontend/index.html` | Desktop entry point |

---

## Construccion Website — Work Log

### Phase 1-7 Summary
- Initial setup, SEO, accessibility, performance, content updates
- Contact section refactor (fixed WhatsApp duplication, updated contact info)
- Hero background image added (Exteior_design.png)

### Files
| File | Purpose |
|------|---------|
| `construccion_pro_2.html` | Main HTML |
| `AGENTS.md` | AI agent instructions |
| `PROJECT_SUMMARY.md` | This file |
| `CORRECTIONS.md` | Fixes documentation |
| `WEBSITE-FIXES-GUIDE.md` | Style reference |

### Server
```bash
npx serve -l 3000
# or serve.bat
```

### Sync Process
Copy from WSL to Windows:
```bash
cp ~/zacapu-envio/frontend/index.html "/mnt/c/Users/Arturo Oropeza/Desktop/construccion_pro_2_server/"
```

---

## TODO / Issues

| Priority | Issue | Status |
|----------|-------|--------|
| HIGH | Hero background image on construccion site | In progress |
| MEDIUM | Test mobile navbar toggle | Not tested |
| LOW | Add actual project images | Not done |
| MEDIUM | Deploy construccion site | Not done |

---

Last updated: 2026-05-10
