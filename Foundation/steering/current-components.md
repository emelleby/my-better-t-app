# Current Components & UI

*Documents the actual UI components and patterns that exist in the project right now*

## Existing Components

### Layout Components

#### `apps/web/src/app/layout.tsx`
- **Purpose**: Root layout for the entire application
- **Features**: 
  - Font loading (Geist Sans & Mono)
  - Provider wrapping (theme, toasts)
  - Grid layout with header and main content
- **Dependencies**: Next.js metadata, theme provider, header component

#### `apps/web/src/components/header.tsx`
- **Purpose**: Top navigation bar
- **Features**:
  - Navigation links (currently just "Home")
  - Theme toggle button
  - Responsive flex layout
- **Dependencies**: Next.js Link, ModeToggle component

#### `apps/web/src/components/providers.tsx`
- **Purpose**: Wraps app with necessary context providers
- **Features**:
  - Theme provider for dark/light mode
  - Toast notifications setup (Sonner)
- **Dependencies**: next-themes, sonner

### Page Components

#### `apps/web/src/app/page.tsx`
- **Purpose**: Home page content
- **Features**:
  - ASCII art title display
  - Basic container layout
  - Placeholder API status section
- **Current State**: Static content only, no data fetching

### Utility Components

#### `apps/web/src/lib/utils.ts`
- **Purpose**: Utility functions for styling
- **Features**:
  - `cn()` function for combining Tailwind classes
- **Dependencies**: clsx, tailwind-merge

## Theme System

### Current Implementation
- Uses `next-themes` for theme management
- Supports system, light, and dark themes
- Theme toggle in header (ModeToggle component)
- CSS variables for theme colors

### Theme Configuration
```json
// From components.json
{
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

## Styling Approach

### Current Patterns
- **TailwindCSS**: Utility-first styling
- **CSS Variables**: For theme-aware colors
- **Responsive Design**: Mobile-first with Tailwind breakpoints
- **Typography**: Geist font family with mono variant

### Layout Patterns
```typescript
// Container pattern used in page.tsx
<div className="container mx-auto max-w-3xl px-4 py-2">
  {/* Content */}
</div>

// Grid layout pattern used in layout.tsx
<div className="grid grid-rows-[auto_1fr] h-svh">
  <Header />
  {children}
</div>
```

## Missing Components

### Not Yet Implemented
- Form components (TanStack Form integration planned)
- Data display components (cards, lists, tables)
- Loading states and error boundaries
- Modal/dialog components
- Navigation beyond basic header
- shadcn/ui components (configured but not used yet)

## Component Development Guidelines

### Current Patterns Observed
1. **Functional Components**: All components use function syntax
2. **TypeScript**: Proper typing for props and children
3. **Default Exports**: Components exported as default
4. **Client Components**: Use "use client" when needed for interactivity

### File Organization
- Components in `apps/web/src/components/`
- Pages in `apps/web/src/app/` (App Router)
- Utilities in `apps/web/src/lib/`

## Next Component Development

When adding new components, follow these established patterns:
1. Use TypeScript interfaces for props
2. Export as default
3. Use `cn()` utility for className merging
4. Follow existing naming conventions (kebab-case files, PascalCase components)

*This document will be updated as new components are implemented*