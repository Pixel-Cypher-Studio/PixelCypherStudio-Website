# CSS Optimization Plan — PixelCypher Studio

## Current State

- **CSS approach**: SCSS Modules per component + `globals.scss` + `_variables.scss` + `_animations.scss`
- **Total SCSS files**: 24 module files + 3 global partials
- **Design system**: CSS custom properties in `_variables.scss` (good foundation)
- **Problem**: Modules are copy-pasting patterns instead of composing from globals

---

## Issues Found

### 1. Rogue `:root` Overrides (Critical)

`packages.scss` and `graphicdesign.module.scss` each define their own `:root` block with different color names that **shadow and conflict** with the global design system:

| File | Rogue variables defined |
|------|------------------------|
| `packages.scss` | `--bg`, `--bg2`, `--bg3`, `--border`, `--text`, `--muted`, `--accent-green/purple/orange/blue` |
| `graphicdesign.module.scss` | `--bg`, `--bg2`, `--card`, `--border`, `--text`, `--muted`, `--accent-green/purple/pink/cyan` |
| `videoeditingmotiongraphics.module.scss` | `--ink`, `--paper`, `--accent`, `--muted` |

**Effect**: These pages are completely visually disconnected from the global design system (dark/light theming doesn't work, different fonts, different colors).

---

### 2. Duplicate Keyframe Definitions

The following keyframes are defined in `_animations.scss` (global) **and again** in module files:

| Keyframe | Defined in globals | Re-defined in |
|----------|-------------------|---------------|
| `pulse-glow` | `_animations.scss` | `Hero.module.scss` |
| `fadeUp` | `_animations.scss` | `Hero.module.scss` |
| `pulse` | — (not in globals) | `packages.scss`, `graphicdesign.module.scss` |
| `ticker` / `marquee` | `_animations.scss` (`marquee`) | `packages.scss` (`ticker`) |

**Action**: Delete the duplicates from module files. Add `pulse` to `_animations.scss`.

---

### 3. Repeated Orb/Blob Decoration Pattern

The "RGB ambient orb" pattern is copy-pasted across 3 files with only position/size differences:

```scss
// This block appears in: Hero.module.scss, studio.module.scss, contact.module.scss
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: var(--orb-opacity);
}
```

**Action**: Extract to globals.scss as `.orb` base class. Each module only sets color/size.

---

### 4. Repeated Section Header Pattern

`.header` + `.title` appears identically in 3 components:

| File | `.header` gap | `.title` max-width |
|------|-------------|-------------------|
| `Services.module.scss` | `1rem` / mb `4rem` | `400px` |
| `Capabilities.module.scss` | `1rem` / mb `3.5rem` | `360px` |
| `Philosophy.module.scss` | `1.5rem` / mb `3rem` | `800px` |

The shared base is:
```scss
display: flex;
flex-direction: column;
// gap and margin-bottom vary — keep in module

// .title shared:
font-size: var(--text-headline-lg);
font-weight: 700;
color: var(--on-surface);
```

**Action**: Add `.section-header` and `.section-title` utility classes to `globals.scss`. Modules only override spacing.

---

### 5. Repeated Accent Color Modifier Pattern

Three-color modifier sets (`--red`, `--green`, `--blue`) on backgrounds appear in:

- `Services.module.scss`: `.bar--red/green/blue`, `.slug--red/green/blue`, `.bullet--red/green/blue`
- `Capabilities.module.scss`: `.card--0/1/2`, `.dot--red/green/blue`
- `Philosophy.module.scss`: `.card--0/1/2` (same pattern)

**Action**: Add shared accent modifier classes to `globals.scss`:
```scss
.accent-red   { --accent: var(--accent-red); }
.accent-green { --accent: var(--accent-green); }
.accent-blue  { --accent: var(--accent-blue); }
```
Components use `var(--accent)` internally.

---

### 6. Repeated Card Base Pattern

Near-identical card shell styles in `Services.module.scss` and `Capabilities.module.scss`:

```scss
// Shared between both:
position: relative;
background: var(--surface-container);
border-radius: var(--radius-xl);
border: 1px solid var(--border-subtle);
overflow: hidden;
transition:
  transform    var(--duration-base) var(--ease-premium),
  background   var(--duration-base) var(--ease-premium),
  border-color var(--duration-base) var(--ease-premium);

&:hover {
  transform: translateY(-4px);
  background: var(--surface-high);
  border-color: var(--outline-variant);
}
```

**Action**: Add `.card-base` utility to `globals.scss`. Modules extend it with padding/gap overrides.

---

### 7. Repeated Hero Inner Pattern

`studio.module.scss` and `contact.module.scss` share nearly identical hero section structures:

```scss
// Both files:
.heroInner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  max-width: ~800px; // only this differs
}

.headline {
  font-size: var(--text-display-lg);
  font-weight: 700;
  letter-spacing: var(--tracking-display);
  line-height: var(--leading-tight);
  color: var(--on-surface);
}

.sub {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--on-surface-variant);
  line-height: var(--leading-relaxed);
}
```

**Action**: Add `.page-hero-inner`, `.page-headline`, `.page-sub` to `globals.scss`.

---

### 8. Redundant Class: `cardDescriptionToSmallTabs` (Philosophy)

`Philosophy.module.scss` has `.cardDescriptionToSmallTabs` which is identical to `.cardDescription` except `max-width: 80%` vs `30%`. This is a band-aid over a layout issue.

**Action**: Delete `.cardDescriptionToSmallTabs`. Pass `max-width` via CSS custom property or use a responsive rule in `.cardDescription`.

---

### 9. Repeated Font Family References

The `var(--font-space-grotesk), 'Space Grotesk', sans-serif` fallback string is repeated ~12 times across modules.

**Action**: Use a SCSS variable or mixins:
```scss
// In _variables.scss
$font-display: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
$font-body:    var(--font-inter), 'Inter', sans-serif;
```

---

### 10. Packages Page — Standalone Design System

`packages.scss` defines its own navigation (`.nav-packages`), its own hero (`.hero`), its own footer. The page is 1839 lines long with 3 responsive breakpoint sections.

**Action**: This page needs a structural refactor — separate immediate wins from larger work:
- Short-term: align variable names to global tokens
- Long-term: extract into proper component modules

---

## What to Add to `globals.scss`

New utility classes to add (all composable, not prescriptive):

```scss
// ── Orb base (ambient decoration blobs) ──────────────────────────────────────
.orb-base {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: var(--orb-opacity);
}

// ── Section header stack ──────────────────────────────────────────────────────
.section-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

// ── Section title (headline-level) ───────────────────────────────────────────
.section-title {
  font-size: var(--text-headline-lg);
  font-weight: 700;
  color: var(--on-surface);
  line-height: var(--leading-tight);
}

// ── Card base (surface card with hover lift) ─────────────────────────────────
.card-base {
  position: relative;
  background: var(--surface-container);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  transition:
    transform    var(--duration-base) var(--ease-premium),
    background   var(--duration-base) var(--ease-premium),
    border-color var(--duration-base) var(--ease-premium);

  &:hover {
    transform: translateY(-4px);
    background: var(--surface-high);
    border-color: var(--outline-variant);
  }
}

// ── Page hero inner ───────────────────────────────────────────────────────────
.page-hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

// ── Page headline ─────────────────────────────────────────────────────────────
.page-headline {
  font-size: var(--text-display-lg);
  font-weight: 700;
  letter-spacing: var(--tracking-display);
  line-height: var(--leading-tight);
  color: var(--on-surface);
}

// ── Page sub ─────────────────────────────────────────────────────────────────
.page-sub {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--on-surface-variant);
  line-height: var(--leading-relaxed);
}

// ── Pill / chip ───────────────────────────────────────────────────────────────
.pill {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 1rem;
  background: var(--surface-container);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  font-size: var(--text-label-sm);
  font-weight: 500;
  color: var(--on-surface-variant);
  letter-spacing: 0.02em;
}

// ── Status dot (green pulse indicator) ───────────────────────────────────────
.status-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: var(--accent-green);
  box-shadow: 0 0 8px var(--accent-green);
  flex-shrink: 0;
}
```

---

## What to Add to `_animations.scss`

```scss
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}
```

---

## What to Add to `_variables.scss`

```scss
// ── SCSS font-stack shortcuts ─────────────────────────────────────────────────
$font-display: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
$font-body:    var(--font-inter), 'Inter', sans-serif;
$font-mono:    var(--font-dm-mono), 'DM Mono', monospace;
```

---

## Execution Priority

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| P0 | Remove duplicate `@keyframes` from module files | Low | Medium |
| P0 | Delete `cardDescriptionToSmallTabs`, fix with CSS | Low | Low |
| P1 | Add utility classes to `globals.scss` (orb, card-base, section-header, pill) | Medium | High |
| P1 | Refactor Services + Capabilities + Philosophy to use new utilities | Medium | High |
| P1 | Refactor studio + contact hero sections to use shared utilities | Low | Medium |
| P2 | Add `$font-display` SCSS vars to `_variables.scss`, use in modules | Low | Low |
| P3 | Align `packages.scss` variables to global design tokens | High | High |
| P3 | Align `graphicdesign.module.scss` to global design tokens | High | High |
| P4 | Full structural refactor of packages page into components | Very High | Very High |

---

## Files to Touch (in order)

1. `src/styles/_animations.scss` — add `pulse` keyframe
2. `src/styles/_variables.scss` — add SCSS font-stack vars
3. `src/styles/globals.scss` — add all shared utility classes listed above
4. `src/components/Hero/Hero.module.scss` — remove duplicate keyframes
5. `src/components/Services/Services.module.scss` — use `.card-base`, `.section-header`, `.section-title`
6. `src/components/Capabilities/Capabilities.module.scss` — use `.card-base`, `.section-header`, `.section-title`
7. `src/components/Philosophy/Philosophy.module.scss` — delete `cardDescriptionToSmallTabs`, use shared classes
8. `src/app/studio/studio.module.scss` — use `.page-hero-inner`, `.page-headline`, `.page-sub`, `.orb-base`
9. `src/app/contact/contact.module.scss` — use `.page-hero-inner`, `.page-headline`, `.page-sub`, `.orb-base`
10. `src/app/packages/packages.scss` — align `:root` to global tokens (large task, do separately)
11. `src/components/GraphicDesignCapabilityContent/graphicdesign.module.scss` — align to global tokens
12. `src/components/VideoEditingMotionGraphics/videoeditingmotiongraphics.module.scss` — align to global tokens

---

## Estimated CSS Reduction

| Category | Lines saved (approx) |
|----------|---------------------|
| Duplicate keyframes | ~30 lines |
| Orb pattern dedup | ~40 lines |
| Card base dedup | ~35 lines |
| Hero inner dedup | ~30 lines |
| Section header dedup | ~25 lines |
| `cardDescriptionToSmallTabs` deletion | ~18 lines |
| **Total near-term** | **~180 lines** |

The P3/P4 `packages.scss` alignment would save far more (potentially 300–400 lines) but requires design decisions about whether those pages adopt the global design system.
