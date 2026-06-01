# Website Fixes Cheat Sheet
## What Actually Works for Mobile/Responsive Issues

---

## 🔴 Quick Fix Checklist (Use This First)

### 1. Horizontal Scroll / Overflow Issues
```css
/* Add to <style> at top of HTML or in main CSS */
html, body {
    overflow-x: hidden;
    max-width: 100vw;
}
```

### 2. Fix 100vw → 100%
```css
/* ❌ BAD - causes overflow on some browsers */
max-width: 100vw;
width: 100vw;

/* ✅ GOOD */
max-width: 100%;
width: 100%;
```

### 3. Global Box-Sizing Reset
```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

### 4. Images
```css
img {
    max-width: 100%;
    height: auto;
    display: block;
}
```

### 5. Containers & Rows
```css
.container, .row, .d-flex, [class*="col-"] {
    max-width: 100%;
    overflow-x: hidden;
}
```

---

## 🔧 Navbar Fixes

### Make Navbar Links Clickable
```html
<!-- ❌ BAD - breaks clicks -->
<a href="#section" class="nav-link smoothScroll">LINK</a>

<!-- ✅ GOOD -->
<a href="#section" class="nav-link">LINK</a>
```

### Ensure Pointer Events
```css
.navbar, .navbar-collapse, .navbar-nav, .nav-link {
    pointer-events: auto !important;
}
```

### Round Toggle Button
```css
.navbar-toggler {
    border-radius: 50% !important;  /* Round instead of square */
    width: 42px !important;
    height: 42px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}
```

---

## 📱 Mobile Navbar Specific

```css
@media (max-width: 991px) {
    .navbar {
        flex-wrap: nowrap !important;
        justify-content: space-between !important;
    }
    .navbar > .container {
        display: flex !important;
        flex-wrap: nowrap !important;
        max-width: 100% !important;
    }
    .navbar-brand {
        max-width: 55% !important;
    }
    .navbar-brand img {
        max-height: 35px !important;
    }
}
```

---

## 🎨 Hero Section / Button Positioning

```html
<!-- ❌ BAD - button next to text -->
<h1>Title</h1>
<p>Text</p>
<a class="btn">Button</a>

<!-- ✅ GOOD - button below, centered -->
<div class="container text-center">
    <h1>Title</h1>
    <p style="display: block; margin: 15px auto 0 auto; max-width: fit-content;">Text</p>
    <div style="margin-top: 20px;">
        <a class="btn">Button</a>
    </div>
</div>
```

---

## 🔍 Debugging Tips

### Find Overflowing Elements
```javascript
// Run in browser console
const viewportWidth = window.innerWidth;
document.querySelectorAll('*').forEach(el => {
    if (el.offsetWidth > viewportWidth) {
        console.log(el.tagName, el.className, el.id, el.offsetWidth);
    }
});
```

### Reveal All Overflowing Elements
```css
/* Temporarily add to CSS */
* {
    outline: 1px solid red;
}
```

---

## 📋 Before You Launch Checklist

- [ ] Test on actual mobile device (not just responsive mode in browser)
- [ ] Check horizontal scroll on each page
- [ ] Verify all navbar links work
- [ ] Confirm buttons are properly aligned
- [ ] Test dropdown menus on mobile
- [ ] Check images don't overflow viewport
- [ ] Verify form inputs are usable on mobile

---

## 🛠️ Common Culprits

| Issue | Cause | Fix |
|-------|-------|-----|
| Horizontal scroll | `width: 100vw` or `overflow-x: visible` | Use `width: 100%` and `overflow-x: hidden` |
| Navbar links not clickable | `smoothScroll` class or missing pointer-events | Remove smoothScroll, add pointer-events |
| Button next to text | Inline-block without clear break | Wrap in div with margin-top |
| Images too wide | No max-width | Add `max-width: 100%` |
| Content sticking out | Fixed-width elements wider than viewport | Constrain with `max-width: 100%` |

---

## 📁 File Locations

- **Spanish Version**: `C:\Users\Arturo Oropeza\Desktop\Ecological_Consciousness_ES\`
- **English Version**: `C:\Users\Arturo Oropeza\Desktop\Ecological_Consciousness\`

---

*Last Updated: 2026-05-05*
*Tested and Working ✅*