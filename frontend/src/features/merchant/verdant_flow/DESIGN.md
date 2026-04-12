# Design System Strategy: The Pristine Flow

## 1. Overview & Creative North Star
The core of this design system is defined by a Creative North Star we call **"The Pristine Flow."** 

While the utility of a milk delivery platform is rooted in logistics, the brand experience must transcend the transactional. We are not just moving bottles; we are delivering freshness and morning rituals. To achieve this, the UI moves away from the rigid, "boxed-in" layout of traditional delivery apps. Instead, we utilize **Intentional Asymmetry** and **Tonal Depth**. By overlapping elements and using extreme typographic contrast, we create an editorial feel that suggests high-end quality. We break the "template" look by treating the screen as a canvas of organic layers rather than a grid of containers.

## 2. Colors & Surface Architecture
The palette is rooted in a lush, verdant green and a deep, authoritative navy. However, the sophistication lies in how these colors occupy space.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through background color shifts. Use `surface-container-low` for large section backgrounds and `surface-container-lowest` (pure white) for cards. This creates a "soft-edge" layout that feels modern and approachable.

### Surface Hierarchy & Nesting
Depth is achieved through the physical stacking of tiers. 
*   **Base:** `surface` (#f7f9fb)
*   **Sectioning:** `surface_container_low` (#f2f4f6)
*   **Prominence:** `surface_container_lowest` (#ffffff) for primary cards.
*   **Interaction:** `surface_container_high` (#e6e8ea) for hover states or pressed elements.

### The "Glass & Gradient" Rule
To escape the "flat" trap, use **Glassmorphism** for persistent elements like the Bottom Navigation or Sticky Headers. Utilize `surface` colors at 80% opacity with a `20px` backdrop blur. 
*   **Signature Textures:** For high-impact moments (like subscription renewals or hero banners), apply a subtle linear gradient transitioning from `primary` (#006b2c) to `primary_container` (#00873a) at a 135-degree angle. This adds "soul" and a premium finish that flat green cannot provide.

## 3. Typography: Editorial Authority
We utilize **Inter** not just for legibility, but as a brand anchor. The hierarchy is designed to be "Top-Heavy," using large display styles to create a sense of confidence.

*   **Display (lg/md):** Reserved for hero messaging and brand moments. Letter-spacing should be set to `-0.02em` to feel tight and custom.
*   **Headline (sm/md):** Used for category titles (e.g., "Fresh From Farm"). 
*   **Title (md):** Use for product names. This is where the "Trustworthy" personality lives—bold and clear.
*   **Body (md/lg):** Optimized for readability with a line-height of 1.5.
*   **Labels (sm/md):** All-caps with `0.05em` letter-spacing for a sophisticated, utility-luxe feel on metadata (e.g., "FAT CONTENT," "DELIVERY TIME").

## 4. Elevation & Depth: Tonal Layering
Traditional dropshadows are often a crutch for poor contrast. In this system, we prioritize **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. The subtle delta in hex value creates a natural lift.
*   **Ambient Shadows:** When a floating effect is required (e.g., a "Floating Action Button"), use an extra-diffused shadow: `0px 12px 32px rgba(25, 28, 30, 0.06)`. The shadow color is a tinted version of `on-surface`, never pure black.
*   **The Ghost Border Fallback:** If a container requires further definition (like an empty state), use the `outline_variant` token at **15% opacity**. High-contrast, 100% opaque borders are strictly forbidden.

## 5. Components

### Cards & Lists
*   **Rule:** Forbid the use of horizontal divider lines. 
*   **Execution:** Separate list items using the **8px grid spacing scale**. Use a `surface-container-lowest` card with a `lg` (1rem) corner radius. For product lists, use an asymmetrical layout where the image slightly overlaps the card boundary to break the "box" feel.

### Buttons
*   **Primary:** `primary` background with `on-primary` text. Use `xl` (1.5rem) radius for a pill-shaped, modern feel.
*   **Secondary:** `secondary_container` background. These should never have a border; they rely on the tonal shift from the background.
*   **Tertiary:** No background. Use `primary` text weight `600` for clear affordance.

### Input Fields
*   **Styling:** Use the `surface_container_low` as the input background. Upon focus, transition the background to `surface_container_lowest` and apply a `ghost border` using the `primary` color at 40% opacity. This "glow" suggests freshness and vitality.

### Chips
*   **Selection:** Use `primary_fixed` for selected states. The high-contrast "pop" against the light background makes filtering feel tactile and efficient.

### Signature Component: The "Freshness Indicator"
A custom progress-circle component using a gradient of `primary` to `primary_fixed`. Use this to show delivery progress or subscription status, reinforcing the "Pristine Flow" narrative.

## 6. Do’s and Don’ts

### Do
*   **Do** use extreme white space (32px-48px) between major sections to let the design breathe.
*   **Do** use "Optical Centering"—sometimes an icon needs to be 1px higher to *look* centered.
*   **Do** use `title-lg` for price points to ensure financial transparency (Trustworthiness).

### Don't
*   **Don't** use pure black (#000000) for text. Always use `on-surface` or `on-secondary-fixed`.
*   **Don't** use the `DEFAULT` (0.5rem) radius for primary cards. Stick to `lg` (1rem) or `xl` (1.5rem) to maintain the soft, modern aesthetic.
*   **Don't** use standard "toast" notifications. Use an integrated banner that adopts the `tertiary_container` color to feel like a part of the editorial layout.