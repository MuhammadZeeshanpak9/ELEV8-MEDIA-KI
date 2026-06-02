# ELEV8 Media — Tech Spec

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| framer-motion | ^11 | Core animation engine — background layers, entrance animations, text reveals, countdown transitions |
| lucide-react | ^0.400 | Icon library — ChevronLeft, Check, Camera, Twitter, Linkedin, Youtube |

No additional dependencies needed. All visuals are procedural (SVG, CSS, Framer Motion).

---

## Component Inventory

### Layout Components (shared)

| Component | Source | Reuse |
|-----------|--------|-------|
| GlassPanel | Custom | Reused across Countdown, Brand Vision panels, Email Capture, Social buttons |
| AnimatedText | Custom | Hero title, Teaser statement |
| CountdownUnit | Custom | Countdown timer (4 instances) |

### Section Components (page-specific, used once)

| Component | Notes |
|-----------|-------|
| ReturnButton | Fixed position back nav |
| Hero | Full-viewport centerpiece with entrance choreography |
| CountdownTimer | Glass panel with 4 CountdownUnit instances |
| Teaser | Typographic statement section |
| BrandVision | 6 vision pillars in glass panels |
| EmailCapture | Email form with success state |
| SocialLinks | Circular glass icon buttons |
| Footer | Minimal closing bar |

### Background Engine Components

| Component | Purpose |
|-----------|---------|
| ThemeBackground | Container — parallax orchestration, mouse/scroll tracking, layer composition |
| TriangleLayer | Layer 1 — 10 drifting/rotating SVG triangle outlines |
| VortexLayer | Layer 2 — 3 aperture vortex groups with polygon morphing |
| RingLayer | Layer 3 — 7 expanding/collapsing energy rings |
| ParticleLayer | Layer 4 — 18 light particles with trails on bezier/elliptical paths |
| DepthGradientLayer | Layer 5 — mouse-following radial gradient |

### Hooks

| Hook | Purpose |
|------|---------|
| useMousePosition | Tracks normalized mouse position (-1 to 1 from viewport center), smoothed via lerp |
| useScrollPosition | Tracks scroll Y offset |
| useCountdown | Calculates remaining time to target date, updates every second |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Background parallax (mouse + scroll) | Framer Motion useMotionValue + useTransform | Custom hook streams mouse/scroll into motion values; ThemeBackground applies per-layer transforms via `motion.div` style prop | Medium |
| Triangle drift + rotate + opacity | Framer Motion animate prop | Each triangle is a `motion.path` with independent `animate` configs for x/y drift (yoyo), rotation (repeat:Infinity), and opacity (yoyo). Randomized durations per instance. | Low |
| Aperture polygon morphing | Framer Motion animate with path `d` | Pre-calculate SVG paths for triangle/square/pentagon/hexagon with equal anchor points. Animate `d` attribute cycling through shapes. Rotation and scale on parent group. | High |
| Energy ring expand/collapse | Framer Motion animate prop | `motion.circle` with scale yoyo, opacity inversely mapped to scale, independent rotation. Staggered phase offsets. | Low |
| Light particle path following | requestAnimationFrame + CSS transforms | Particles follow parametric equations (ellipse: x=a·cos(t), y=b·sin(t); bezier: cubic interpolation). Trail maintained as fixed-length array of previous positions. rAF loop updates positions each frame. | High |
| Particle sparkle + size pulse | Framer Motion animate | Sparkle: random opacity burst on path position trigger. Size pulse: scale yoyo on each particle. | Medium |
| Depth gradient mouse follow | requestAnimationFrame | CSS custom properties `--x`, `--y` updated via rAF with lerp smoothing. Gradient shifts center position. | Low |
| Hero entrance sequence | Framer Motion variants + staggerChildren | Parent `motion.div` controls timeline via `variants` with `staggerChildren`. Eyebrow → title (AnimatedText) → subtitle → tagline sequenced. | Medium |
| Scroll-triggered section reveals | Framer Motion whileInView | Each section wrapper uses `whileInView` with `once:true`. Children stagger via variants. | Low |
| Countdown number flip | Framer Motion AnimatePresence | `AnimatePresence` with `mode="popLayout"`. Number exits (scale down), new enters (scale up). Scale pulse + opacity transition. | Medium |
| Glass panel ambient glow | CSS @keyframes | `::before` pseudo-element opacity oscillation on 8s loop. Pure CSS, no JS. | Low |
| Button hover/active states | Framer Motion whileHover/whileTap | `whileHover={{ scale: 1.02, opacity: 0.8 }}` `whileTap={{ scale: 0.98 }}` | Low |
| Scroll indicator line draw | Framer Motion animate | Line scaleY 0→1, then dot pulse. CSS or motion.animate. | Low |
| Text character/word reveal | Framer Motion variants | Split text into spans, parent variants with `staggerChildren: 0.03` (chars) or `0.08` (words). Each child: `opacity:0,y:20` → `opacity:1,y:0`. | Medium |

---

## State & Logic Plan

### Mouse-Driven Parallax Architecture

The background parallax system uses a **pull-based reactive pattern** via Framer Motion motion values:

1. `useMousePosition` hook creates a `MotionValue` for mouse X and Y, updated via `mousemove` listener
2. `useScrollPosition` hook creates a `MotionValue` for scroll Y, updated via `scroll` listener
3. `ThemeBackground` receives these motion values as props
4. Each layer applies its own `useTransform` mappings to derive layer-specific offsets from the shared motion values
5. Transforms applied directly via `style` prop on `motion.div` elements — no React re-renders triggered

This avoids re-rendering the entire background on every mouse movement. Only the transform values update via Framer Motion's internal animation loop.

### Countdown Timer Logic

1. `useCountdown` hook accepts a target `Date` and returns `{ days, hours, minutes, seconds, total }`
2. Uses `useEffect` with `setInterval(1000)` to recalculate time difference
3. Returns `total` (milliseconds remaining) for detecting expiration
4. Cleanup clears interval on unmount
5. CountdownTimer component maps returned values to 4 `CountdownUnit` instances

### Particle Trail System

The particle layer uses an **imperative rAF loop** rather than Framer Motion for performance:

1. Each particle maintains a trail history array (last 10 positions)
2. On each rAF tick: compute new position from parametric equation, push to history, trim old entries
3. Render trail segments as small divs with opacity proportional to recency
4. Trail system runs outside React state — positions stored in refs, DOM updated via direct style manipulation
5. This avoids React re-render overhead for 18 particles × 10 trail segments = ~180 DOM elements updating at 60fps

### Polygon Morphing Path Data

For the vortex layer, SVG paths for each polygon shape must have identical command counts for Framer Motion to interpolate the `d` attribute smoothly:

- Triangle (3 sides): `M` + 3 `L` commands + `Z`
- Square (4 sides): `M` + 4 `L` commands + `Z`
- Pentagon: `M` + 5 `L` commands + `Z`
- Hexagon: `M` + 6 `L` commands + `Z`

**Interpolation strategy:** Use the hexagon (6 anchor points) as the base. For shapes with fewer sides, duplicate points so all variants have 6 control points. Example: a triangle maps 3 vertices to 6 points by repeating each vertex twice. This ensures `d` attribute transitions are always between 6-point paths.

---

## Other Key Decisions

### Font Loading

Inter loaded via Google Fonts `<link>` in `index.html`. No npm font package needed. Weights: 300 (Light), 400 (Regular), 500 (Medium).

### No shadcn/ui Components

The design is fully custom with no standard UI patterns (no forms, dialogs, tables, dropdowns). All components are custom-built with Tailwind. The shadcn/ui infrastructure (Tailwind config, CSS variables) remains available but unused component-wise.

### Procedural Visuals — Zero Assets

All visual elements are code-generated (SVG paths, CSS gradients, animated divs). No image/video assets to generate or load. This eliminates asset loading latency and keeps the page extremely lightweight.

### Performance Strategy

- `will-change: transform` on all continuously animated background elements
- Particle layer uses imperative DOM updates (refs + rAF) instead of React state
- Framer Motion `useMotionValue` + `useTransform` for parallax to avoid re-renders
- `@media (prefers-reduced-motion: reduce)` disables all background animation layers
- Mobile: reduced particle count (8), fewer triangles (6), fewer rings (4), vortex layers disabled

### Responsive Background Simplification

On mobile (< 768px), only TriangleLayer, RingLayer, and ParticleLayer render. VortexLayer (morphing) and DepthGradientLayer are omitted to preserve battery and performance.
