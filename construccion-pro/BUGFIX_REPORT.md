# Bug Fix Report — construccion_pro_2.html

**Date:** 2026-05-12  
**Reviewed by:** Claude (Anthropic)  
**File:** `construccion_pro_2.html`

---

## Critical Bugs Fixed

### 1. Malformed `</form>` Tag — HTML Structure
**Severity:** 🔴 Critical  
**Problem:** The `</form>` closing tag was placed *inside* the second column `<div>`, leaving an orphaned `</div>` after it. Browsers auto-repair broken HTML differently, causing inconsistent form layout and submission behavior across Chrome, Firefox, and Safari.  
**Fix:** Swapped `</form>` and `</div>` so the form closes correctly outside the column div.

```html
<!-- BEFORE (broken) -->
      </div>
    </form>
  </div>
</section>

<!-- AFTER (correct) -->
      </div>
    </div>
  </form>
</section>
```

---

### 2. iOS Safari Auto-Zoom on Form Inputs
**Severity:** 🔴 Critical  
**Problem:** All form inputs, selects, and textareas used `font-size: 0.88rem` (~14px). iOS Safari automatically zooms the viewport when a focused input has `font-size < 16px`, breaking the mobile layout. This fix was documented in `MOBILE-FIXES.md` but had never been applied.  
**Fix:** Added `font-size: 16px` to all form elements inside the `@media (max-width: 576px)` block.

```css
/* Added inside @media (max-width: 576px) */
.form-group input,
.form-group select,
.form-group textarea {
  font-size: 16px;
}
```

---

### 3. WhatsApp Icon Invisible in Contact Social Buttons
**Severity:** 🔴 Critical  
**Problem:** The phone icon SVG path inside the contact section's WhatsApp social button had `fill="#25D366"` (green) instead of `fill="white"`. This rendered the icon completely invisible against the green button background.  
**Fix:** Changed the inner path fill from `#25D366` to `white`.

```html
<!-- BEFORE (invisible icon) -->
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.2 ..." fill="#25D366"/>

<!-- AFTER (visible white icon) -->
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.2 ..." fill="white"/>
```

---

## Quick Wins Fixed

### 4. `max-width: 100vw` Causing Horizontal Overflow
**Severity:** 🟡 Warning  
**Problem:** `section, header, footer` used `max-width: 100vw`. On browsers where the vertical scrollbar is visible, `100vw` includes the scrollbar width and triggers a horizontal scrollbar. This was already flagged as incorrect in `WEBSITE-FIXES-GUIDE.md` but was still present in the code.  
**Fix:** Changed to `max-width: 100%`.

```css
/* BEFORE */
section, header, footer {
  max-width: 100vw;
  overflow-x: hidden;
}

/* AFTER */
section, header, footer {
  max-width: 100%;
  overflow-x: hidden;
}
```

---

### 5. Missing `rel="noopener noreferrer"` on External Links
**Severity:** 🟡 Warning  
**Problem:** All 4 external links using `target="_blank"` were missing `rel="noopener noreferrer"`. Without it, the opened page can access `window.opener` and redirect the original tab — a known security vulnerability.  
**Fix:** Added `rel="noopener noreferrer"` to all 4 affected links.

| Link | Location |
|------|----------|
| WhatsApp contact detail | Contact info section |
| WhatsApp social button | Contact form buttons |
| Facebook social button | Contact form buttons |
| WhatsApp float button | Fixed floating button |

---

### 6. Typo in Image Filename — `Exteior_design.png`
**Severity:** 🟡 Warning  
**Problem:** The hero background image was named `Exteior_design.png` (missing the `r` in "Exterior") both on disk and in the HTML references. While the references matched the file (so no 404), the filename itself was incorrect.  
**Fix:** Renamed the physical file and updated both HTML references.

- **File renamed:** `assets/css/Exteior_design.png` → `assets/css/Exterior_design.png`
- **CSS reference updated:** `url('assets/css/Exterior_design.png')`
- **HTML reference updated:** `src="assets/css/Exterior_design.png"`

---

## Remaining Recommendations (Not Yet Applied)

These issues were identified during the audit but were not part of this fix session:

- **Form backend:** The contact form uses `mailto:` which depends on a configured email client. Consider integrating [FormSpree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/products/forms/) for reliable mobile submission.
- **WhatsApp pulse animation:** The `box-shadow` keyframe animation is GPU-expensive. Replace with a `transform: scale()` or pseudo-element ring animation.
- **Fragile form JS selector:** `document.querySelector('form[action="#"]')` will silently break if the action attribute is ever changed. Use an `id` on the form instead.
- **`prefers-reduced-motion`:** No animations are guarded with `@media (prefers-reduced-motion: no-preference)`, which is required for accessibility compliance.
- **Dead footer social links:** All 4 footer social icons link to `#`. The Facebook URL is already known from the contact section.
- **CSS extraction:** ~800 lines of inline CSS should be moved to `assets/css/styles.css` for browser caching and maintainability.
- **Duplicate `overflow-x: hidden`** on `body` — appears in both the top-level rule and the mobile fixes block.

---

## Files Changed

| File | Change |
|------|--------|
| `construccion_pro_2.html` | 6 fixes applied (form tag, iOS font-size, WhatsApp icon, max-width, rel attributes, image path) |
| `assets/css/Exteior_design.png` | Renamed to `Exterior_design.png` |
