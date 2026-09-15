# Website Builder & UI/UX Design System Guidelines

This project follows the **Website Builder Setup** stack: professional UI/UX design systems, modern animations (Framer Motion / Motion), and high-conversion production-ready components.

---

## 1. UI/UX Pro Max Design Principles
* **Anti-AI Slop Directive**: Avoid generic purple-to-blue gradients, glowing drop shadows in dark mode, and cookie-cutter 3-column cards.
* **Typographic Hierarchy**:
  * Step scale ratio $\ge 1.25$ (H1, H2, H3, H4).
  * Pair an authoritative display font (e.g., Outfit) with a refined body font (e.g., Plus Jakarta Sans).
  * Baseline body text $\ge 16\text{px}$, line height $1.5\text{–}1.7$, line length $65\text{–}75\text{ch}$.
* **Spacing & Mathematics**:
  * Container outer padding must always be equal to or greater than the inner padding between children (minimum $16\text{px}$).
  * Button horizontal padding must be $2\times$ vertical padding (e.g., `px-5 py-2.5`).
  * Nested corner radius math: $\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$.
* **Sophisticated Palette**:
  * High-contrast, brand-aligned color schemes (e.g. CABEC: Corporate Blue `#0066B3`, Sky `#1686C7`, Emerald Growth `#4F8B50`, Slate `#0B1E33`).
  * Respect WCAG AA standards ($4.5:1$ contrast for text).

---

## 2. Animation & Motion Standards (`motion/react`)
* Import animations from `motion/react` (or `framer-motion`).
* **Scroll-Triggered Reveals**:
  * Animate hero elements, section headings, and cards with subtle fade-ins and translates:
    `initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}`
* **Micro-interactions**:
  * Buttons and interactive chips: `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`
  * Card hover elevations: subtle border brightening and elevation transition.
* **Performance**: Keep transitions fast ($200\text{–}400\text{ms}$) with spring or easeOut damping. Never block interactions with long animations.

---

## 3. High-Conversion Component Architecture
* **Header & Navigation**: Sticky, semi-transparent blur (`backdrop-blur-md`), responsive drawer on mobile, direct contact quick-actions.
* **Hero Section**: High-clarity value proposition, dual CTA (primary action + instant direct WhatsApp/phone), proof indicators and accreditations.
* **Interactive Tooling**: Interactive wizards, cost or scoping estimators, diagnostic steps rather than long static forms.
* **Social Proof & Portfolio**: Filterable case studies, quantifiable ROI metrics, real testimonials.
* **Footer & Direct Connect**: Full legal mentions, RCCM/tax IDs, interactive map/directions, and floating quick-contact access.
