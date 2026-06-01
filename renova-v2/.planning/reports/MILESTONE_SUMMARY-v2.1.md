# Milestone Summary — Renova Solar v2.1
**Date:** May 23, 2026  
**Target URL:** `renovasolarmx.share.zrok.io`  
**Environment:** Chromebook Penguin (Crostini Linux container)

---

## What Was Done

| # | Change | Status |
|---|--------|--------|
| 1 | Facebook link → `www.facebook.com/RSolucionesRenovables` | ✅ |
| 2 | Phone → `+52 443 111 2869` (replaced old `694 2217`) | ✅ |
| 3 | Email → `techoskn@gmail.com` added to contact section | ✅ |
| 4 | Hero section reordered: Title → Logo → Subtitle → CTA → Badges | ✅ |
| 5 | Hero section centered (was left-aligned) | ✅ |
| 6 | Logo float/bounce animation restored | ✅ |
| 7 | "Oficinas" project card → "Instalación Industrial" (`industrial-install.jpg`) | ✅ |
| 8 | Google Translate ES/EN selector in navbar | ✅ |
| 9 | Mobile-friendly responsive CSS (5 breakpoints) | ✅ |
| 10 | Vanilla JS mobile nav toggle (React hydration fallback) | ✅ |
| 11 | Kaspa node stopped + disabled (resource drain) | ✅ |
| 12 | IBM Granite-4-micro project deleted | ✅ |

---

## Architecture

```
┌─ WSL (Ryzen7) ──────────────────────────┐
│  zrok share → port 3000                  │
│  SSH tunnel → penguin:3000              │
└────────────────┬────────────────────────┘
                 │ SSH port 2223 (user: satanasio)
┌─ Chromebook (Penguin) ──────────────────┐
│  Node/Express → port 3000               │
│  Serves: /home/satanasio/my-project/    │
│    uploads/Renovav2/Renova_v2/          │
│    ├── index.html  (production)         │
│    ├── assets/logo/                     │
│    ├── assets/proyectos/                │
│    └── _next/static/ (CSS + JS)        │
└─────────────────────────────────────────┘
```

---

## Key Files Modified

| File | Location | Changes |
|------|----------|---------|
| `index.html` | Chromebook: `Renovav2/Renova_v2/` | All production changes |
| `Hero.tsx` | WSL: `delphos/projects/renova-v2/src/components/` | Reference only (not deployed) |
| `Footer.tsx` | WSL: `delphos/projects/renova-v2/src/components/` | Facebook link (reference) |
| `Contact.tsx` | WSL: `delphos/projects/renova-v2/src/components/` | Phone/email (reference) |

---

## Errors Fixed & Solutions

### Error 1: Translate select disappears after page load
**Root Cause:** React hydration overwrites server HTML. The Nav component is a React Client Component rendered by JS, so any inline HTML edits are lost during hydration.
**Fix:** JavaScript injection via MutationObserver that re-inserts the select after each DOM mutation. Uses `setInterval` as fallback.

### Error 2: Hero section order reverts after load
**Root Cause:** React serialized data (`self.__next_f.push`) had old element order. Hydration restored the old layout.
**Fix:** 
1. Updated HTML structure (moved hero__visual inside hero__content after h1)
2. Replaced React serialized JSON block to match HTML order
3. CSS `!important` overrides as fallback

### Error 3: Div imbalance (115/113, then 115/114)
**Root Cause:** Text-replacement edits to hero section left unclosed `<div>` tags.
**Fix:** Python script to count `<div>` opens vs `</div>` closes, manually rebalanced.

### Error 4: Nav toggle button unresponsive
**Root Cause:** React component `onClick` handler fails when React data is corrupted or hydration breaks.
**Fix:** Added vanilla JavaScript event delegation handler on the toggle button, overlay, nav links, and Escape key as a permanent fallback.

### Error 5: Google Translate not working
**Root Cause:** `.goog-te-combo` selector not found — Google Translate API loads asynchronously.
**Fix:** Fallback in `onchange` handler: try Google combo first, then set cookie and reload page.

### Error 6: CSS/JS not loading on Chromebook
**Root Cause:** WSL `_next/` folder overwrote Chromebook's `_next/` folder with different chunk filenames.
**Fix:** Restored `_next/` from `out/_next/` on Chromebook to match `out/index.html` references.

### Error 7: zrok environment mismatch
**Root Cause:** pkill killed the zrok agent, creating a new environment (`SY6JOM8h6r`) that couldn't access the reserved share `renovasolarmx` (owned by `zDhqmC8G6r`).
**Fix:** Started zrok manually pointing to port 3000, used temporary URL. The reserved share persists in zrok cloud.

---

## Tools & Commands for Next Time

### SSH to Chromebook Penguin
```bash
# Direct (if on same network):
ssh -i ~/.ssh/chromebook_key -p 2223 satanasio@localhost

# Via ChromeOS IP:
ssh -i ~/.ssh/chromebook_key arturo_oropeza@172.26.74.214
```

### Copy files to/from Chromebook
```bash
# Upload:
scp -i ~/.ssh/chromebook_key -P 2223 local_file satanasio@localhost:/remote/path/

# Download:
scp -i ~/.ssh/chromebook_key -P 2223 satanasio@localhost:/remote/path/ local_file

# Copy directories:
scp -i ~/.ssh/chromebook_key -P 2223 -r local_dir/ satanasio@localhost:/remote/path/
```

### Check div balance (prevent layout breakage)
```bash
python3 -c "
import re
with open('index.html') as f: h=f.read()
d=len(re.findall(r'<div',h))
c=len(re.findall(r'</div>',h))
print(f'Divs: {d}/{c} {\"OK\" if d==c else \"BROKEN - fix before deploying\"}')
"
```

### Check element order in HTML
```bash
curl -s http://127.0.0.1:3000 | grep -oP 'class="hero__\w+"' | head -12
```

### Debug React data integrity
```bash
python3 -c "
with open('index.html') as f: h=f.read()
print('__next_f.push blocks:', h.count('self.__next_f.push'))
print('hero__inner:', h.count('hero__inner'))
print('Should be exactly 2 for single-page Next.js export')
"
```

### zrok management
```bash
# List shares:
~/.local/bin/zrok list shares

# Start share:
~/.local/bin/zrok share public http://127.0.0.1:3000 --headless

# Check status:
~/.local/bin/zrok status
```

### Quick backup before edits
```bash
ssh -i ~/.ssh/chromebook_key -p 2223 satanasio@localhost \
  "cp index.html index.html.backup_\$(date +%s)"
```

### Restore from pristine
```bash
ssh -i ~/.ssh/chromebook_key -p 2223 satanasio@localhost \
  "cp out/index.html index.html"
```

---

## Known Remaining Issues

1. **Facebook React data** — Footer icon reverts to `#` after hydration (HTML shows correct link on initial render)
2. **Google Translate API** — May be blocked by ad blockers; cookie fallback handles this
3. **Next.js 9 build incompatible with Node 20** — Cannot rebuild on Chromebook; all edits are post-build patches

---

## Revert Instructions

```bash
# Restore from pristine original:
ssh -i ~/.ssh/chromebook_key -p 2223 satanasio@localhost \
  "cp out/index.html index.html"

# Restore from session backup:
ssh -i ~/.ssh/chromebook_key -p 2223 satanasio@localhost \
  "cp index.html.backup2 index.html"
```
