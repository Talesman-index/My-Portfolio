---
name: Sacca Dafia Portfolio
description: Professional portfolio of Sacca Dafia, Product & Experience Designer.
colors:
  primary: "#39FF14"
  neutral-bg: "#050805"
  neutral-bg-light: "#FFFFFF"
  neutral-text: "#FFFFFF"
  neutral-text-gray: "#A0A0A0"
  neutral-text-dark: "#050805"
typography:
  display:
    fontFamily: "'Manrope', sans-serif"
    fontSize: "clamp(20px, 2.8vw, 36px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Inter', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "14px"
  lg: "100px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  pill-button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-text-dark}"
    rounded: "{rounded.lg}"
    padding: "14px 34px"
  pill-button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "14px 34px"
  navbar-dark:
    backgroundColor: "rgba(5, 8, 5, 0.8)"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
  navbar-light:
    backgroundColor: "rgba(255, 255, 255, 0.45)"
    textColor: "{colors.neutral-text-dark}"
    rounded: "{rounded.lg}"
---

## Overview
This design system captures the dynamic editorial style of Sacca Dafia's portfolio. It balances a clean, light-themed minimal editorial hero section with a high-contrast cinematic dark green experience throughout the rest of the pages. The visual language relies heavily on layout spacing, strong typography contrast, and subtle micro-animations.

## Colors
The color palette uses high-contrast polar values to separate the hero section from the case studies:
- **Primary / Accent Color**: Neon green (`#39FF14`) represents energy, code, and interaction. It is used selectively for hover effects, buttons, and radial background glow overlays.
- **Dark Theme Background**: Pure charcoal black (`#050805`) combined with dark green radial highlights creates a deep, cinematic backdrop.
- **Light Theme Background**: Pure white (`#FFFFFF`) in the hero section ensures a seamless integration with the user's high-contrast grayscale photo and makes the page feel spacious and clean.

## Typography
Typography is split into two distinct typefaces:
- **Headings & Display**: `Manrope` is used for display headlines, names, and titles, utilizing heavy font weights (700+) and tighter letter-spacing (`-0.01em` to `-0.02em`) to project confidence and structure.
- **Body & Captions**: `Inter` is used for body text, descriptions, and list details, providing maximum readability across all viewport widths.
- **Handwritten Details**: `Caveat` is loaded selectively for organic, handwritten callout comments (e.g. adjacent to sketchy illustrations).

## Elevation
This visual design favors flat layers, sharp borders, and glassmorphic translucent panels instead of deep box shadows.
- Transparent cards use thin, faint borders (`border: 1px solid rgba(255, 255, 255, 0.08)`) and high backdrop-blur values (`20px`) to stand out from the cinematic background.
- Brand squircles in the dock use soft shadows (`0 8px 24px rgba(0, 0, 0, 0.15)`) to float over the white desk area in the photo.

## Components
Key visual components include:
- **The Floating Navigation Capsule**: A centered header pill that switches backgrounds depending on the scroll state (translucent dark at the top or when scrolled, and semi-transparent light when over the light hero if configured).
- **Interactive Squircles**: Smooth app icons featuring spring transition animations (`transition: transform 0.2s cubic-bezier(...)`) on hover.
- **Sketchy Callout Vector**: Inline SVG sketch arrows pointing to key visual elements accompanied by floating cursive texts.

## Do's and Don'ts
- **DO** use absolute black and white to frame sections with massive contrast.
- **DO** combine bold typography with spacious line heights to let paragraphs breathe.
- **DON'T** use multi-color gradient fills on text labels.
- **DON'T** use excessively rounded corners (keep card borders between `12px` and `16px`).
- **DON'T** nest cards within other cards.
