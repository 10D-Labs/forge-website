# Forge Brand Guidelines

> Last updated: January 2026

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

### Neutrals

| Name | Hex | Usage |
|------|-----|-------|
| True Black | `#000000` | Primary background (OLED-optimized) |
| Black 900 | `#0A0A0A` | Elevated surfaces |
| Black 800 | `#111111` | Cards, secondary surfaces |
| Black 700 | `#1A1A1A` | Tertiary surfaces |
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

- **No secondary accent color** - Orange + neutrals only
- Orange is reserved for brand use - never use it for errors/warnings
- True black (`#000000`) is required for backgrounds to support OLED displays
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

### Buttons

| Type | Style |
|------|-------|
| Primary CTA | Angular clip-path corners: `clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))` |
| Secondary / Other | Standard corners (small border-radius or none) |

### Cards

- Angular clip-path corners (same as primary CTA)
- Orange-tinted border: `rgba(255, 102, 0, 0.25)`
- Background: `#111111` or `#1A1A1A`

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
- Angular feel preferred over rounded

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

- Background: True Black `#000000`
- Text: White `#FFFFFF`
- Cards: `#111111` with orange-tinted borders

### Light Mode

Light mode is secondary and should maintain the same bold energy.

- Background: `#FFFFFF` or `#F5F5F5`
- Text: `#000000` or `#1A1A1A`
- Cards: `#FFFFFF` with orange-tinted borders
- Primary orange remains `#FF6600`

---

## Never Do

These are strictly off-brand:

- **Rounded/bubbly shapes** - contradicts angular aesthetic
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

  /* Neutrals */
  --black: #000000;
  --black-900: #0A0A0A;
  --black-800: #111111;
  --black-700: #1A1A1A;
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
}
```

---

## Fonts Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
```
