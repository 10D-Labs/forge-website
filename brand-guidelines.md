# Forge Brand Guidelines

> Last updated: February 2026 (Design 4.0 - The Warmth Update)

---

## Brand Essence

**Tagline:** Forge Yourself

**Personality:** Punchy, transformational, inspirational, blunt

**Voice:** Coach talking to client/prospect, with mentor warmth underneath
- Direct and confident, not corporate
- Believes in you before you believe in yourself
- Pushes without being preachy
- Blunt when it matters, warm when it counts
- Can crack a joke, nothing vulgar (unless it's Sergeant Stone)

---

## Colors

### Primary

| Name | Hex | Usage |
|------|-----|-------|
| Electric Orange | `#FF6600` | Primary brand color, CTAs, highlights |
| Electric Orange Dark | `#E65C00` | Hover states, pressed states |

### Neutrals (Warm Brown-Black)

| Name | Hex | Usage |
|------|-----|-------|
| Warm Black | `#0d0a07` | Primary background (surface-0) |
| Warm 900 | `#120d06` | Elevated surfaces (surface-1) |
| Warm 800 | `#1e140a` | Cards, secondary surfaces (surface-2) |
| Warm 700 | `#23190e` | Tertiary surfaces (surface-3) |
| Gray 500 | `#71717A` | Secondary text |
| Gray 400 | `#A1A1AA` | Muted text, placeholders |
| White | `#FFFFFF` | Primary text, icons |

### Semantic

| Name | Hex | Usage |
|------|-----|-------|
| Error / Crimson | `#DC2626` | Errors, destructive actions |
| Success / Emerald | `#10B981` | Success states, confirmations |
| Warning / Amber | `#F59E0B` | Warnings, caution states |

### Borders

| Context | Value |
|---------|-------|
| Cards | `rgba(255, 102, 0, 0.25)` |
| Nav borders | `rgba(255, 102, 0, 0.20)` |
| Section dividers | `rgba(255, 102, 0, 0.15)` |

### Color Rules

- **No secondary accent color** - Orange + warm neutrals only
- Orange is reserved for brand use - never use it for errors/warnings
- Warm brown-black backgrounds (`hsl(30 30% 3%)`) replace pure black for warmth while staying dark
- Gradients are allowed but keep them subtle/low-key

---

## Typography

### Font Families

| Use | Font |
|-----|------|
| Headlines | Barlow Condensed |
| Body | Barlow |

### Type Scale

| Element | Font | Weight | Style |
|---------|------|--------|-------|
| Hero headlines | Barlow Condensed | 800-900 | Uppercase, tight spacing (`-0.02em`) |
| Section titles | Barlow Condensed | 700 | Uppercase |
| Card titles | Barlow Condensed | 700 | Uppercase |
| Eyebrows / Labels | Barlow Condensed | 600 | Uppercase, wide spacing (`0.1em`+) |
| Body text | Barlow | 400 | Normal case |
| Emphasized body | Barlow | 500-600 | Normal case |

### Typography Rules

- Headlines are always uppercase
- Body text is never uppercase (except labels/eyebrows)
- Tight letter-spacing on large headlines
- Wide letter-spacing on small labels

---

## Design Elements

### Corners & Radius

| Element | Radius |
|---------|--------|
| Cards | `20px` |
| Buttons | `14px` |
| Inputs | `10px` |
| Chips / Tags | `10px` |
| Badges | `8px` |

### Buttons

| Type | Style |
|------|-------|
| Primary CTA | `border-radius: 14px`, orange glow shadow |
| Secondary / Other | `border-radius: 14px` |

### Cards

- Rounded corners (`border-radius: 20px`)
- Orange-tinted border: `rgba(255, 102, 0, 0.25)`
- Background: warm surface colors (surface-2 or surface-1)
- Subtle box-shadow: `0 8px 16px rgba(0,0,0,0.25)`

### Staggered Headlines

Reserved for **hero sections** and **CTA sections** only.

```css
.stagger-headline span {
  display: block;
}
.stagger-headline span:nth-child(2) {
  margin-left: 5%;
  color: var(--orange);
}
.stagger-headline span:nth-child(3) {
  margin-left: 10%;
}
```

### Gradients

- Allowed for ambient effects (glow orbs, subtle backgrounds)
- Keep them low-key and atmospheric
- Primary gradient direction: radial or diagonal
- Use orange as the gradient color, fading to transparent

---

## Animation & Motion

### Philosophy

**Dramatic but tasteful.** Animations should feel powerful and intentional, never gimmicky.

### Recommended Effects

- Parallax scrolling on hero elements
- Staggered reveal animations (elements entering one after another)
- Scroll-triggered transitions
- Smooth hover state transitions (scale, glow)
- Subtle floating/breathing on ambient elements

### Animation Rules

- Never block user interaction with animations
- Always respect `prefers-reduced-motion`
- No jittery or bouncy easing
- Smooth easing curves (ease-out for entrances, ease-in-out for transitions)

---

## Icons

### Style

- **Outlined** with slightly thick strokes
- Consistent stroke width across all icons
- Clean, modern style

### Recommended Sets

- Lucide Icons
- Phosphor Icons (bold weight)
- Custom icons following the same stroke weight

---

## Imagery

### Photography

- **No stock photos of people working out**
- Only use phone mockups showing app screenshots
- Video content of the app is acceptable

### Illustrations

- No clip art or cartoonish illustrations
- If illustrations are used, they should be minimal and geometric

---

## Light Mode vs Dark Mode

### Dark Mode (Default)

Dark mode is the **primary** experience. All designs should be created dark-first.

- Background: Warm Black `#0d0a07` (hsl 30 30% 3%)
- Text: White `#FFFFFF`
- Cards: Warm surface colors with orange-tinted borders and rounded corners

### Light Mode

Light mode is secondary and should maintain the same bold energy.

- Background: `#FFFFFF` or `#F5F5F5`
- Text: `#000000` or `#1A1A1A`
- Cards: `#FFFFFF` with orange-tinted borders
- Primary orange remains `#FF6600`

---

## Never Do

These are strictly off-brand:

- **Pastel colors** - too soft, lacks intensity
- **Stock photos of people lifting weights** - generic and cheesy
- **Cursive or script fonts** - doesn't match bold typography
- **Cheesy fitness clichés** - "no pain no gain", "beast mode", "rise and grind"
- **Clip art or cartoonish illustrations** - unprofessional
- **Rainbow gradients** - off-brand color usage
- **Text over busy backgrounds** - reduces readability
- **Light mode as default** - dark mode is core to brand identity

---

## Quick Reference

```css
:root {
  /* Primary */
  --orange: #FF6600;
  --orange-dark: #E65C00;

  /* Neutrals (warm brown-black) */
  --surface-0: hsl(30 30% 3%);     /* #0d0a07 */
  --surface-1: hsl(30 40% 5%);     /* #120d06 */
  --surface-2: hsl(30 35% 8%);     /* #1e140a */
  --surface-3: hsl(30 35% 10%);    /* #23190e */
  --gray-500: #71717A;
  --gray-400: #A1A1AA;
  --white: #FFFFFF;

  /* Semantic */
  --error: #DC2626;
  --success: #10B981;
  --warning: #F59E0B;

  /* Borders */
  --border-card: rgba(255, 102, 0, 0.25);
  --border-nav: rgba(255, 102, 0, 0.20);
  --border-section: rgba(255, 102, 0, 0.15);

  /* Radius */
  --radius-card: 20px;
  --radius-button: 14px;
  --radius-input: 10px;
  --radius-chip: 10px;
  --radius-badge: 8px;
}
```

---

## Fonts Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
```
