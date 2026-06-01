# Renova V2 - Changes Documentation
**Date:** May 23, 2026
**Project:** ~/projects/delphos/projects/renova-v2

---

## Changes Made

### 1. Facebook Link Update (Footer.tsx)
- **File:** `src/components/Footer.tsx`
- **Change:** Updated Facebook icon link from `#` to `https://www.facebook.com/share/1BA9yess7G/`
- **Added:** `target="_blank" rel="noopener noreferrer"`

### 2. Google Translate Integration
- **Files:** `src/app/layout.tsx`, `src/components/Nav.tsx`

**layout.tsx:**
- Added Google Translate element div: `<div id="google_translate_element" className="fixed bottom-4 right-4 z-50"></div>`
- Added translate initialization script with `googleTranslateElementInit()`
- Added translate API script: `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`

**Nav.tsx:**
- Desktop: Added EN translate button with globe icon in navbar (before "Cotizar Ahora" button)
- Mobile: Added language selector section with "Español" and "English" buttons
- Added `translatePage()` function to trigger Google Translate

### 3. Projects Section Update (Projects.tsx)
- **File:** `src/components/Projects.tsx`
- **Change:** Removed "Local Comercial" project (proyecto-2.jpg)
- **Result:** Reduced from 8 to 7 projects
- **Current projects:**
  - Casa Familiar (Residencial)
  - Nave Industrial (Comercial)
  - Casa Premium (Residencial)
  - Oficinas (Comercial)
  - Casa Habitación (Residencial)
  - Villa Solar (Residencial)
  - Planta Solar (Industrial - 50kW)

### 4. Contact Section Updates (Contact.tsx)
- **File:** `src/components/Contact.tsx`

**Added phone number:**
- Label: "Teléfono 2"
- Number: +52 443 111 2869
- Icon: `fas fa-phone-alt`

**Added email:**
- Label: "Email"
- Address: techoskn@gmail.com
- Icon: `fas fa-envelope`
- Link: `mailto:techoskn@gmail.com`
- Style: Same as other contact items with turquoise background

### 5. Server Configuration
- Built static export to `/out` directory
- Running on port 3001 with Python HTTP server
- zrok tunnel: `renovasolarmx.share.zrok.io` pointing to port 3001

---

## Build Commands Used
```bash
cd ~/projects/delphos/projects/renova-v2
npm run build
```

---

## Notes
- All changes compiled successfully
- TypeScript validation passed
- Static export generated for production
## Session May 23 (17:00-19:30) — Final
- **Facebook** → `www.facebook.com/RSolucionesRenovables` (Footer.tsx + React data)
- **Phone** → `+52 443 111 2869` (replaced `694 2217`)
- **Email** → `techoskn@gmail.com` added to contact section
- **Hero section** reordered: Title → Logo → Subtitle → CTA → Badges (centered, both HTML + React data)
- **Logo animation** float effect restored
- **Projects** "Oficinas" card replaced with "Instalación Industrial" (WhatsApp image)
- **Google Translate** ES/EN select injected into navbar (MutationObserver persistence)
- **Mobile nav toggle** vanilla JS fallback handler added
- **Mobile-responsive CSS** 5 breakpoints covering 768px, 480px
- **Kaspa node** stopped and disabled
- **Granite AI** project deleted
- **Multiple React data fixes** for hero order, div balance, hydration conflicts

## Session May 23 (17:00-17:30)
- Fixed Facebook link to `www.facebook.com/RSolucionesRenovables` (correct source file on ChromeBook)
- Added phone +52 443 111 2869 to Contact section
- Added email techoskn@gmail.com to Contact section
- Added Google Translate widget (layout.tsx)
- Added EN translate button to desktop navbar (Nav.tsx)  
- Added language selector (Español/English) to mobile menu (Nav.tsx)
- Replaced "Local Comercial" project card with new industrial installation image
- Set up SSH tunnel + zrok to serve from ChromeBook's penguin container (port 3001)
- Correct file path: `/home/satanasio/my-project/renova/Renova_v2_old_next/out/index.html`
