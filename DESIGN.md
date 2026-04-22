---
name: Culinary Zen
colors:
  surface: '#fff8f6'
  surface-dim: '#f4d3cc'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ee'
  surface-container: '#ffe9e5'
  surface-container-high: '#ffe2dc'
  surface-container-highest: '#fddbd5'
  on-surface: '#291714'
  on-surface-variant: '#5e3f3a'
  inverse-surface: '#402b28'
  inverse-on-surface: '#ffede9'
  outline: '#926f68'
  outline-variant: '#e8bdb5'
  surface-tint: '#be1000'
  primary: '#b90f00'
  on-primary: '#ffffff'
  primary-container: '#e4210b'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4a7'
  secondary: '#ac3322'
  on-secondary: '#ffffff'
  secondary-container: '#fe6e56'
  on-secondary-container: '#6c0500'
  tertiary: '#005cba'
  on-tertiary: '#ffffff'
  tertiary-container: '#0074e8'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a7'
  on-primary-fixed: '#400200'
  on-primary-fixed-variant: '#910a00'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a7'
  on-secondary-fixed: '#400200'
  on-secondary-fixed-variant: '#8b1a0c'
  tertiary-fixed: '#d7e3ff'
  tertiary-fixed-dim: '#abc7ff'
  on-tertiary-fixed: '#001b3f'
  on-tertiary-fixed-variant: '#00458f'
  background: '#fff8f6'
  on-background: '#291714'
  surface-variant: '#fddbd5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: auto
---

## Brand & Style
The design system is centered around an "Organic Modernism" philosophy. It targets health-conscious, urban professionals who value quality and transparency in their food choices. The visual language is designed to evoke a sense of freshness, energy, and appetite through a "Soft Minimalist" approach.

Key stylistic pillars include:
- **Breathable Composition:** Utilizing extreme whitespace to allow high-quality food photography to act as the primary visual anchor.
- **Organic Geometry:** Using high-radius corners to mimic the natural shapes of food and ceramics.
- **Tactile Softness:** Employing very soft, diffused shadows and subtle blurs to create a sense of approachability and physical depth without the harshness of traditional flat design.

## Colors
This design system utilizes a "Robust Hearth" palette. The primary color is a high-intensity Flame Red (#e8240e), used for primary actions and brand highlights to stimulate immediate appetite and engagement. The secondary Terracotta (#ce4b37) provides a grounded, earthy warmth that connects the digital experience to natural ingredients. The tertiary Azure Blue (#0074e8) is used for functional accents, information badges, and digital-first highlights to provide a crisp, modern contrast to the warm primary tones.

The background remains strictly off-white to reduce eye strain, while the neutral color is a warm Cocoa Gray (#8c716c) rather than pure black, maintaining a soft contrast ratio that feels premium and modern.

## Typography
Plus Jakarta Sans is selected as the sole typeface for its modern, friendly, and geometric characteristics. It features slightly wider apertures which enhance readability at small sizes while appearing sophisticated in large display formats.

Headlines should utilize tighter letter-spacing and heavier weights to create a strong visual hierarchy. Body text is set with generous line heights to ensure a relaxed reading experience, mimicking the layout of a high-end food magazine.

## Layout & Spacing
The design system employs a fixed-width centered grid for desktop (1200px max-width) and a fluid layout for mobile. A 12-column system is used with a 24px gutter to provide ample breathing room between menu items and restaurant cards.

Vertical rhythm follows an 8px base unit. Component containers (like food cards) use "Large" (48px) internal padding to emphasize the premium nature of the brand. Plenty of whitespace between sections (80px+) is mandatory to prevent the interface from feeling cluttered or "fast-food" oriented.

## Elevation & Depth
Depth is conveyed through **Ambient Shadows**. Instead of standard drop shadows, this design system uses multiple stacked shadows with very high blur radii and low opacity (2-5%). This creates a "floating" effect rather than a "stuck on" effect.

- **Level 1 (Static Cards):** 0px 4px 20px rgba(140, 113, 108, 0.08).
- **Level 2 (Hover/Active):** 0px 12px 32px rgba(140, 113, 108, 0.12).
- **Level 3 (Modals/Overlays):** 0px 24px 48px rgba(140, 113, 108, 0.16).

Semi-transparent surfaces (80% opacity with 10px backdrop-blur) are used for navigation bars to maintain context of the vibrant food photography scrolling beneath them.

## Shapes
The shape language is consistently "Rounded" to communicate friendliness and comfort.
- **Buttons and Inputs:** Use a 0.5rem (8px) radius for a modern, balanced look.
- **Cards and Containers:** Use a 1rem (16px) radius to create a soft, frame-like appearance for food images.
- **Chips and Tags:** Use pill-shaped (full radius) styling to differentiate them from actionable buttons.

Iconography should follow this logic, utilizing rounded caps and joins to match the UI elements.

## Components
- **Buttons:** Primary buttons use the vibrant Flame Red background with white text. They should have a subtle scale-down effect on press (0.98 scale) to feel tactile.
- **Cards:** Food item cards are the hero component. They feature a full-bleed image at the top with a 16px border-radius, using a very light gray border (1px solid #F0F0F0) to define edges on the white background.
- **Chips:** Used for dietary filters (e.g., "Vegan", "Gluten-Free"). These use the Terracotta and Azure Blue colors at 10% opacity with full-color text for high legibility and a "soft" feel.
- **Input Fields:** Search and address bars use a subtle off-white fill (#F9F9F9) instead of a border, transitioning to a white background with an Azure Blue border on focus.
- **Quantity Pickers:** A custom component with rounded '+' and '-' icons, prioritizing ease of use for quick cart updates.
- **Cart Drawer:** A slide-out component utilizing backdrop-blur to keep the user grounded in the browsing experience while managing their order.