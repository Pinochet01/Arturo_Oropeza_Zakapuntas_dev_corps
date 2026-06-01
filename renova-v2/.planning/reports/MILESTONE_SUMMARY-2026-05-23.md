# Milestone Summary — Renova Solar v2
**Date:** May 23, 2026  
**Target:** `renovasolarmx.share.zrok.io` (Chromebook Penguin container)

---

## Overview

Renova Energía Solar website maintenance and enhancement session. Applied content updates, layout restructuring, and translation tool integration to the production site served from Chromebook Linux container.

**Key files modified:**
- `/home/satanasio/my-project/uploads/Renovav2/Renova_v2/index.html` (production)
- `/home/arturo_oropeza/projects/delphos/projects/renova-v2/out/index.html` (WSL reference build)

---

## Changes Applied

### 1. Contact Information
| Field | Old | New |
|-------|-----|-----|
| Phone | +52 443 694 2217 | +52 443 111 2869 |
| Email | info@renova.mx | techoskn@gmail.com |
| Facebook | profile.php?id=61588355014660 | www.facebook.com/RSolucionesRenovables |

### 2. Hero Section Layout
Restructured from two-column (content + visual) to **centered single column**:
1. Title "Transforma tu hogar con energía solar"
2. Logo (`/assets/logos/Renova_logo.png`) with `float` animation
3. Subtitle description
4. CTA button "Solicitar Cotización Gratis"
5. Certifications badges (CFE · 100% Limpia · Servicio Local)

### 3. Projects Gallery
- Replaced "Oficinas" card (`comercial-2.jpg`) → "Instalación Industrial" (`industrial-install.jpg`)
- Image copied from: `WhatsApp Image 2026-05-23 at 17.20.59.jpeg`

### 4. Google Translate Integration
- ES/EN language selector injected into navbar (post-React hydration via MutationObserver)
- Google Translate API script loaded
- Floating translate widget at bottom-right for mobile

### 5. Project Cleanup
- Removed IBM Granite-4-micro project (`~/granite/`)
- Stopped and disabled Kaspa node daemon
- Killed WSL `renova-v2` Next.js dev server
- Cleaned up duplicate zrok shares

---

## Architecture

```
┌─ WSL (Ryzen7) ───────────────────────────┐
│  zrok share → port 3000                   │
│  SSH tunnel → penguin:3000               │
│  /projects/delphos/projects/renova-v2/   │ (reference build)
└────────────────┬─────────────────────────┘
                 │ SSH port 2223
┌─ Chromebook (Penguin) ───────────────────┐
│  Node.js Express server (port 3000)      │
│    → serves index.html at:              │
│  /home/satanasio/my-project/uploads/     │
│    Renovav2/Renova_v2/index.html         │
│  CSS: /_next/static/css/                 │
│  JS:  /_next/static/chunks/              │
└──────────────────────────────────────────┘
```

---

## Technical Debt / Known Issues

1. **Next.js 9 + Node 20 incompatibility** — Cannot rebuild on Chromebook. All edits are post-build HTML/React-data patches.
2. **React hydration overrides** — Some HTML edits were reverted by React serialized data. Fixed via CSS `!important` overrides + JS injection.
3. **Scroll-driven re-renders** — Nav component re-renders on scroll (is-scrolled class toggle). Workaround: MutationObserver re-injects translate select.
4. **Facebook React data** — Footer Facebook link reverts to `#` after hydration. Needs React data fix (minor, initial render is correct).

---

## Server Management

| Component | Status |
|-----------|--------|
| Chromebook Node server (port 3000) | Running |
| SSH tunnel (WSL:3000 → penguin:3000) | Active |
| zrok share (port 3000) | Active |
| Kaspa node | Stopped + disabled |
| Granite AI project | Deleted |

---

## Revert Instructions

Restore from backup:
```bash
ssh -i ~/.ssh/chromebook_key -p 2223 satanasio@localhost \
  "cp index.html.orig index.html"
```

Backup exists at: `/home/satanasio/my-project/uploads/Renovav2/Renova_v2/index.html.backup2`
