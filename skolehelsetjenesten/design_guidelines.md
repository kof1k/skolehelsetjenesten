# Design Guidelines: School Health Service Website

## Design Approach
**Selected Approach:** Design System (Material Design) with Healthcare Service Adaptations
- **Rationale:** Educational healthcare service requiring trust, clarity, and accessibility
- **Inspiration:** Modern Scandinavian educational platforms with emphasis on approachability and functionality
- **Key Principles:** Clear information hierarchy, accessible navigation, professional yet welcoming aesthetic

## Typography System
**Font Stack:**
- Primary: 'Inter' (Google Fonts) - body text, forms, UI elements
- Headings: 'Plus Jakarta Sans' (Google Fonts) - warm, modern, approachable

**Type Scale:**
- H1: 48px/56px (mobile: 36px/42px) - semibold
- H2: 36px/44px (mobile: 28px/36px) - semibold  
- H3: 24px/32px (mobile: 20px/28px) - medium
- Body: 16px/24px - regular
- Small: 14px/20px - regular
- Button/Label: 16px/24px - medium

## Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-20
- Element gaps: gap-4, gap-6, gap-8

**Grid Structure:**
- Desktop: max-w-7xl container with 2-3 column layouts where appropriate
- Tablet: max-w-4xl with 2 column layouts
- Mobile: Single column, full-width with px-4 padding

## Core Components

### Navigation
**Header:**
- Sticky top navigation with school logo (left)
- Horizontal menu items (center/right): Hjem, Tjenester, Ofte stilte spørsmål, Ressurser, Kontakt
- "Book Time" prominent CTA button (right)
- Mobile: Hamburger menu with slide-out drawer
- Height: h-16 desktop, h-14 mobile

### Hero Section
**Layout:**
- Split layout: 60/40 text-to-image ratio
- Left: Heading, descriptive text (2-3 lines), dual CTAs (primary "Book Appointment" + secondary "Learn More")
- Right: Professional healthcare environment image showing welcoming school nurse setting
- Height: Natural content-based (not forced viewport)
- Padding: py-16 desktop, py-12 mobile

**Image Description:** Warm, professional photo of school health office - bright, clean, welcoming environment with nurse desk visible, natural lighting, plants or calming elements

### Information Cards
**Services Overview (3-column grid):**
- Icon top (Heroicons - medical-themed)
- Title (H3)
- Description (2-3 lines)
- "Learn More" link
- Card style: Subtle border, hover elevation
- Spacing: gap-6 between cards

### Appointment Booking Section
**Form Layout:**
- Two-column form on desktop, single column mobile
- Fields: Name, Class/Year, Date Picker, Time Slot Selection, Reason (dropdown + textarea)
- Clear field labels above inputs
- Input height: h-12
- Prominent submit button at bottom
- Confirmation message area

### FAQ Section
**Accordion Pattern:**
- Question as clickable header (H3 size)
- Chevron icon indicator (right-aligned)
- Expandable answer content
- Spacing: mb-4 between items
- Active state: Slight background distinction

### Contact Information
**Card-Based Layout:**
- 3 cards: Office Hours, Contact Details, Location
- Icon + heading + content structure
- Icons from Heroicons (clock, phone, map-pin)
- Equal height cards with gap-8

### Footer
**Multi-Column Structure:**
- 4 columns desktop, stack mobile
- Column 1: School logo + brief description
- Column 2: Quick Links (navigation items)
- Column 3: Contact Summary
- Column 4: Emergency Resources
- Bottom bar: Copyright, privacy links
- Padding: py-12

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked elements)
- Tablet: 768px - 1024px (2 column max)
- Desktop: > 1024px (full layouts)

## Component Patterns

**Buttons:**
- Primary: Prominent, rounded-lg, px-6 py-3
- Secondary: Outlined variant, same sizing
- Text buttons: No background, underline on hover
- All buttons: Smooth hover state transitions (opacity/scale)

**Form Inputs:**
- Border style: Subtle border with focus ring
- Height: h-12 for text inputs
- Border radius: rounded-lg
- Label spacing: mb-2
- Error states: Border emphasis + helper text

**Cards:**
- Padding: p-6
- Border radius: rounded-xl
- Shadow: Subtle elevation
- Hover: Slight shadow increase

## Images Strategy

**Hero Image:** Required - Professional school health service environment
**Service Cards:** Optional icons (Heroicons medical set)
**FAQ Section:** No images
**Contact Section:** Map embed for location (if applicable)
**Footer:** School logo only

## Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation throughout
- Focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Form validation with clear error messages
- Skip navigation link
- Semantic HTML structure

## Animations
**Minimal, purposeful only:**
- FAQ accordion expand/collapse
- Mobile menu slide-in
- Button hover states (opacity/subtle scale)
- Page transitions: None (instant navigation)