# Mobile Overflow Fixes - construction_pro_2

## Date
May 12, 2026

## Issue
Website has horizontal overflow issues visible on mobile, especially in navbar and various sections.

## Source Fix
Researched documented fixes from `Ecological_Consciousness` project which had similar mobile overflow problems.

## Fixes Applied

### 1. Core Overflow Prevention (from Ecological_Consciousness)
```css
body { overflow-x: hidden; }
html, body { overflow-x: hidden; max-width: 100vw; }
.row { max-width: 100%; overflow-x: hidden; }
.container { max-width: 100%; overflow-x: hidden; }
section, header, footer { max-width: 100vw; overflow-x: hidden; }
.d-flex, .flex-row, .navbar-nav { max-width: 100%; overflow-x: hidden; }
[class*="col-"] { max-width: 100%; overflow-x: hidden; }
img { max-width: 100%; height: auto; }
*, *::before, *::after { box-sizing: border-box; }
```

### 2. Mobile-Specific Fixes
- Navbar brand: `max-width: 160px`, text overflow ellipsis
- Navbar collapse: `max-height: 80vh`, scrollable
- Footer: single column on mobile
- Services grid: single column
- Gallery: single column
- Form inputs: 16px font to prevent iOS zoom

## Files Updated

| File | Path |
|------|------|
| construccion_pro_2.html | ~/proyectos/construction_pro/ |
| construccion_pro_2.html | /mnt/c/Users/Arturo Oropeza/Desktop/construccion_pro_2_server/ |

## Related Projects
- `Ecological_Consciousness` - Original source of documented fixes
- `construccion_pro_2` - Target project with mobile overflow issues

## Status
✅ Applied to both Linux and Windows versions