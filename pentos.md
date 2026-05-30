# Design System Inspired by Pentos

## 1. Visual Theme & Atmosphere

Pentos embodies a bold, forward-thinking creative aesthetic rooted in dark elegance and electric energy. The design system combines a near-black canvas with vibrant lime accents, creating dramatic contrast and visual hierarchy. Geometric patterns, minimalist line work, and pixelated imagery establish a tech-forward yet artistic personality. The atmosphere is confident and aspirational—designed for creative professionals and digital innovators who demand sophistication paired with cutting-edge visual impact. The system balances restraint (vast negative space, monochromatic palettes) with explosive highlights (neon lime, electric blue), reinforcing themes of innovation and creative transformation.

**Key Characteristics**
- Deep dark backgrounds with minimal distractions
- High-contrast lime and electric blue accents for calls-to-action and visual interest
- Bold, oversized typography anchoring key messages
- Geometric line patterns and pixelated imagery as visual texture
- Clean, structured navigation with underline indicators
- Restrained use of color for maximum impact
- Modern sans-serif typographic hierarchy emphasizing clarity
- Layered depth through selective accent placement

## 2. Color Palette & Roles

### Primary
- **Primary Lime Accent** (`#C9F31D`): High-impact CTAs, buttons, highlights, and focal points; commands immediate attention against dark backgrounds
- **Primary Electric Blue** (`#0000EE`): Link text, secondary interactive elements, and hover states; maintains accessibility and brand presence

### Interactive
- **Electric Blue** (`#0000EE`): Hyperlinks, active navigation indicators, secondary call-to-action buttons
- **Cyan Accent** (`#0099FF`): Tertiary interactive element; rare use, reserve for special highlights or micro-interactions

### Neutral Scale
- **Pure Black** (`#000000`): Primary text, UI borders, dominant background color; the foundational dark canvas
- **Near Black** (`#0D0D0D`): Subtle background variations and dark panel backgrounds
- **Deep Black** (`#020202`): Darkest neutral; use for maximum contrast text on very dark surfaces
- **Off-White** (`#F3F5F2`): Light surface backgrounds and soft neutral; reserved for special sections
- **Neutral Light** (`#D8D8D8`): Secondary text, disabled states, borders on light surfaces
- **Neutral Medium** (`#D7D7D7`): Subtle borders and dividers on white/light backgrounds
- **Neutral Dark** (`#3D3D3D`): Medium-tone borders and subtle UI separators

### Surface & Borders
- **White** (`#FFFFFF`): Light card backgrounds, contrast surfaces, and text on dark backgrounds
- **Black** (`#000000`): Primary borders, strong separators, and dominant container backgrounds

## 3. Typography Rules

### Font Family
- **Primary:** Outfit (`font-family: Outfit, sans-serif`) — Headlines, body copy, and primary interface text
- **Secondary:** Plus Jakarta Sans (`font-family: 'Plus Jakarta Sans', sans-serif`) — Form inputs and specialized contexts
- **Fallback:** `sans-serif` for all system fonts

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|----|
| Display / Hero | Outfit | 160px | 700 | 176px | 0px | Maximum impact; use sparingly for hero headlines |
| Heading 1 | Outfit | 96px | 600 | 106px | 0px | Major section titles; bold presence |
| Heading 2 | Outfit | 115px | 600 | 195.5px | 0px | Large visual headlines; alternate sizing |
| Heading 3 | Outfit | 32px | 700 | 44px | 0px | Section headers and prominent subheadings |
| Heading 4 | Outfit | 24px | 600 | 34px | 0px | Subsection titles and card headers |
| Body Text | Outfit | 16px | 500 | 24px | 0px | Primary readable copy; 150% line height for comfort |
| Link / Small Label | sans-serif | 12px | 400 | normal | 0px | Navigation, links, metadata, tags |
| Form Input | Plus Jakarta Sans | 16px | 400 | 30px | 0px | Text fields and input areas |

### Principles
- **Contrast Hierarchy:** Outfit's geometric letterforms command attention at large sizes; weight variation (600–700) signals importance
- **Readability:** Body text at `16px` with `24px` line height ensures legibility on dark backgrounds with white text
- **Emphasis:** Reserve 700 weight for true hierarchy peaks; 600 and 500 weights create breathing room
- **Scale Discipline:** Use only sizes defined in the hierarchy table; no in-between values
- **Dark Background Optimization:** All text maintains sufficient contrast against `#000000` and `#0D0D0D`

## 4. Component Stylings

### Buttons

#### Primary CTA Button
- **Background:** `#C9F31D`
- **Text Color:** `#000000`
- **Padding:** `16px 40px`
- **Border Radius:** `50px`
- **Border:** `none`
- **Font:** sans-serif, `12px`, weight `400`
- **Height:** `40px`
- **Box Shadow:** `none`
- **Hover State:** Reduce opacity to `0.9` or darken to `#B8E01A`
- **Active State:** Scale to `0.95` or shift to `#A8D01A`

#### Secondary Button
- **Background:** `rgba(0, 0, 0, 0.2)`
- **Text Color:** `#FFFFFF`
- **Padding:** `16px 32px`
- **Border Radius:** `40px`
- **Border:** `1px solid rgba(255, 255, 255, 0.3)`
- **Font:** sans-serif, `12px`, weight `400`
- **Height:** `40px`
- **Box Shadow:** `none`
- **Hover State:** Increase background opacity to `rgba(0, 0, 0, 0.35)`
- **Active State:** Scale to `0.95`

#### Ghost Button (Link-style)
- **Background:** `transparent`
- **Text Color:** `#0000EE`
- **Padding:** `0px 0px`
- **Border Radius:** `0px`
- **Border:** `none`
- **Font:** sans-serif, `12px`, weight `400`
- **Box Shadow:** `none`
- **Hover State:** Add `border-bottom: 2px solid #0000EE`
- **Active State:** Shift to `#0099FF`

### Cards & Containers

#### Dark Card
- **Background:** `#0D0D0D`
- **Border:** `1px solid #3D3D3D`
- **Border Radius:** `0px` (angular) or `8px` (if rounded preferred)
- **Padding:** `32px` to `40px`
- **Box Shadow:** `none` (flat design)
- **Text Color:** `#FFFFFF`

#### Light Card
- **Background:** `#FFFFFF`
- **Border:** `1px solid #D8D8D8`
- **Border Radius:** `0px` (angular) or `8px`
- **Padding:** `32px` to `40px`
- **Box Shadow:** `none`
- **Text Color:** `#000000`

#### Hero Section Container
- **Background:** `linear-gradient(135deg, #000000 0%, #0D0D0D 100%)`
- **Padding:** `96px 56px` (vertical, horizontal)
- **Max Width:** No hard limit; full-bleed design
- **Border Radius:** `0px`

### Inputs & Forms

#### Text Input (Primary)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#FFFFFF`
- **Font:** Plus Jakarta Sans, `16px`, weight `400`
- **Padding:** `12px 16px`
- **Border:** `none` (or `1px solid rgba(255, 255, 255, 0.2)` for subtle underline)
- **Border Radius:** `0px`
- **Height:** `30px`
- **Line Height:** `30px`
- **Placeholder Color:** `rgba(255, 255, 255, 0.5)`
- **Focus State:** Add `border-bottom: 2px solid #C9F31D`

#### Text Input (Light/Secondary)
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Font:** Plus Jakarta Sans, `16px`, weight `400`
- **Padding:** `8px 12px`
- **Border:** `1px solid #D8D8D8`
- **Border Radius:** `0px`
- **Height:** `40px`
- **Focus State:** Shift border to `2px solid #0000EE`

#### Form Label
- **Font:** Outfit, `12px`, weight `600`
- **Color:** `#FFFFFF` (dark context) or `#000000` (light context)
- **Margin Bottom:** `8px`

### Navigation

#### Top Navigation Bar
- **Background:** `rgba(0, 0, 0, 0.95)` (near-transparent dark or opaque black)
- **Height:** `50px` to `64px` (depending on logo size)
- **Padding:** `0px 56px` horizontal
- **Display:** Flexbox with space-between alignment
- **Border Bottom:** Optional `1px solid rgba(255, 255, 255, 0.1)`

#### Navigation Link
- **Font:** sans-serif, `12px`, weight `400`
- **Color:** `#FFFFFF` (default) or `#C9F31D` (active/hover)
- **Padding:** `12px 16px`
- **Border Bottom:** `2px solid #C9F31D` (active indicator)
- **Text Transform:** Uppercase (optional, see brand guidelines)
- **Hover State:** Shift color to `#C9F31D`, add underline if not present

#### Dropdown / Mobile Menu
- **Background:** `#000000`
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Padding:** `16px`
- **Link Color:** `#FFFFFF`
- **Hover Link Color:** `#C9F31D`

### Badges & Tags

#### Primary Badge
- **Background:** `#C9F31D`
- **Text Color:** `#000000`
- **Padding:** `4px 12px`
- **Border Radius:** `40px`
- **Font:** sans-serif, `12px`, weight `600`

#### Secondary Badge
- **Background:** `rgba(0, 0, 0, 0.2)`
- **Text Color:** `#FFFFFF`
- **Padding:** `4px 12px`
- **Border Radius:** `40px`
- **Font:** sans-serif, `12px`, weight `600`

## 5. Layout Principles

### Spacing System
- **Base Unit:** `4px` (all spacing scales as multiples of 4)
- **Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `28px`, `32px`, `40px`, `56px`, `80px`, `96px`, `116px`
- **Micro Spacing (UI):** `4px`, `8px` — use for tight button padding, input spacing
- **Small Spacing:** `12px`, `16px` — card padding, component margins
- **Medium Spacing:** `24px`, `32px` — section padding, list gaps
- **Large Spacing:** `40px`, `56px` — section separation, hero padding
- **XL Spacing:** `80px`, `96px`, `116px` — major section breaks, full-screen sections

### Grid & Container
- **Max Width:** No hard constraint; design is full-bleed with edge padding
- **Column Strategy:** 12-column responsive grid; collapse to 1 column on mobile
- **Container Padding:** `56px` horizontal on desktop, `24px` on tablet, `16px` on mobile
- **Section Pattern:** Hero sections span full width with `96px–116px` vertical padding; content sections use `56px` gaps between features

### Whitespace Philosophy
Pentos embraces aggressive negative space to emphasize clarity and innovation. Large breathing room between sections prevents visual fatigue on dark backgrounds. Key headlines sit in vast emptiness, commanding attention. Supporting elements cluster tightly. Content and whitespace maintain a 1:1 ratio in hero sections to maximize impact. Use whitespace as a design tool—it's not empty, it's intentional.

### Border Radius Scale
- **Square / Sharp:** `0px` — Primary mode; buttons, cards, inputs maintain angular geometry
- **Soft Rounded:** `8px` — Alternative for cards and containers if rounded aesthetic desired
- **Pill / Full Round:** `40px–50px` — Buttons, badges, circular UI elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Base) | No shadow; `box-shadow: none` | Cards, buttons, containers on solid backgrounds |
| Raised (Subtle) | `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3)` | Hover state for cards; floating elements |
| Elevated (Medium) | `box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.5)` | Modals, dropdowns, prominent overlays |
| High (Strong) | `box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.7)` | Full-screen modals, important notifications |

**Shadow Philosophy:**
Pentos uses minimal elevation. The flat design aesthetic dominates; shadows are reserved for interactive states (hover, focus) and overlays. On the near-black background (`#0D0D0D`), shadows are subtle—rely on color and borders instead. When shadows are necessary, use dark-toned shadows (`rgba(0, 0, 0, X)`) rather than multi-colored shadows. Avoid ambient shadows; apply shadows only on state change (hover, active, expanded).

## 7. Do's and Don'ts

### Do
- Use `#C9F31D` as the singular accent color for all primary CTAs and critical highlights
- Maintain high contrast: white text on dark backgrounds, black text on lime backgrounds
- Apply bold, oversized Outfit typography (96px–160px) for hero headlines
- Reserve generous whitespace to emphasize key messages and prevent visual clutter
- Use `#0000EE` exclusively for link text and secondary interactive states
- Layer geometric patterns and pixelated imagery for visual interest without adding weight
- Keep buttons and inputs angular (`0px` radius) to reinforce modern, tech-forward aesthetic
- Size body text to `16px` with `24px` line height for dark-background readability
- Structure navigation with clear underline indicators for active states
- Test all color combinations for WCAG AA contrast compliance

### Don't
- Mix lime accent with other bright colors; maintain monochromatic restraint
- Use shadows as primary depth cue; rely on color, borders, and positioning instead
- Reduce font sizes below `12px` for body copy; maintain readability hierarchy
- Apply heavy, rounded corners to UI elements; keep geometry sharp and structured
- Add texture or pattern that competes with headline typography
- Violate the 12-column grid structure; maintain consistent horizontal alignment
- Use more than two accent colors (lime + blue) in any single composition
- Apply opacity effects to primary navigation; maintain solid, clear hierarchy
- Stack more than three levels of navigation or information hierarchy
- Ignore contrast ratios on dark backgrounds; test readability thoroughly

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Key Changes |
|-----------------|-------|-------------|
| Mobile | 320px–640px | Single-column layout; container padding `16px`; heading sizes reduced 20%; button height `36px`; navigation collapses to hamburger menu |
| Tablet | 641px–1024px | Two-column grid; container padding `24px`; heading sizes at 80% of desktop; buttons full-width in stacks |
| Desktop | 1025px–1440px | Full 12-column grid; container padding `56px`; all heading sizes at 100%; buttons inline; navigation fully visible |
| Large Desktop | 1441px+ | Max-width container `1400px` (optional); increase padding to `80px`; add accent decorative elements |

### Touch Targets
- **Minimum touch target size:** `44px × 44px` (WCAG 2.1 AA compliance)
- **Button minimum height:** `40px` desktop, `44px` mobile
- **Link minimum height:** `40px` (standing alone) or sufficient padding around inline links
- **Input field minimum height:** `40px` (including padding)
- **Navigation link padding:** `12px 16px` minimum for finger-friendly spacing

### Collapsing Strategy
- **Hero Sections:** Stack headline + subheadline vertically on tablet; increase font scale reduction to 30% on mobile
- **Multi-Column Grids:** Collapse from 3 columns → 2 columns at tablet; 2 → 1 at mobile
- **Navigation:** Horizontal desktop menu → Hamburger icon + slide-out drawer on tablet/mobile
- **Cards:** Maintain full width on mobile (single column); add margin-bottom instead of gap-based spacing
- **Images & Media:** Scale to 100% width on mobile with max-width container; maintain aspect ratios
- **Padding Hierarchy:** Reduce all spacing by 40% on tablet; 60% on mobile while maintaining 4px scale increments

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA & Highlight:** Lime (`#C9F31D`)
- **Link & Secondary Interactive:** Electric Blue (`#0000EE`)
- **Tertiary Accent:** Cyan (`#0099FF`)
- **Text on Dark:** White (`#FFFFFF`)
- **Text on Light:** Black (`#000000`)
- **Primary Background:** Black (`#000000`)
- **Secondary Background:** Near Black (`#0D0D0D`)
- **Subtle Border:** Neutral Dark (`#3D3D3D`)
- **Active Navigation:** Lime (`#C9F31D`) underline on white text
- **Disabled State:** Neutral Light (`#D8D8D8`)

### Iteration Guide

1. **Start with dark canvas.** Set all page backgrounds to `#000000` or `#0D0D0D` with white (`#FFFFFF`) text and Outfit typography.

2. **Apply accent hierarchy.** Reserve `#C9F31D` for primary buttons, "CONTACT" CTA, and key visual focal points only. Use `#0000EE` for hyperlinks and secondary interactive elements.

3. **Build typography with intent.** Use Outfit for all headlines and body copy. Apply 160px weight-700 for hero headlines, 96px weight-600 for section titles, 16px weight-500 for body. Keep line heights at 1.5× font size minimum.

4. **Size buttons at 40px height minimum.** Primary CTAs use `#C9F31D` background with `#000000` text, 50px border-radius, 12px sans-serif font. Secondary buttons use `rgba(0, 0, 0, 0.2)` background with white text, 40px border-radius.

5. **Grid layout to 12 columns.** Container max-width optional; use full-bleed design with `56px` horizontal padding on desktop, `24px` on tablet, `16px` on mobile.

6. **Maintain color discipline.** Only three accent colors total: Lime, Blue, Cyan (rare). No gradients; no tints. Use pure hex values.

7. **Spacing in multiples of 4px.** Never apply arbitrary spacing; use scale: 4, 8, 12, 16, 24, 28, 32, 40, 56, 80, 96, 116px.

8. **Keep components flat.** No drop shadows on default state. Use `0px` border-radius for cards, inputs, buttons unless explicit rounded variant required.

9. **Test contrast on dark backgrounds.** Ensure all text meets WCAG AA (4.5:1 for small text, 3:1 for large text). White on black is optimal; avoid grays below `#888888`.

10. **Optimize for responsive collapse.** At tablet breakpoint, reduce heading sizes 20%; at mobile, reduce 50% and stack all components vertically. Maintain 4px grid scale throughout.