# UI Development Best Practices

*Guidelines and best practices for UI development - to be applied when implementing components*

## shadcn/ui Integration Guidelines

### Configuration
This project is configured for shadcn/ui v4 with "new-york" style:

```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Component Development Approach
When building UI components:

1. **Check available components** first using MCP shadcn tools
2. **Use blocks** for complex patterns (login forms, dashboards, etc.)
3. **Customize with TailwindCSS** classes
4. **Extend with custom logic** as needed

### Standard Component Pattern
```typescript
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  // Other props...
}

export default function Component({ 
  children, 
  className,
  ...props 
}: ComponentProps) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {children}
    </div>
  );
}
```

## Theme System Best Practices

### Implementation Pattern
```typescript
// Theme provider setup (already implemented)
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### Theme Toggle Pattern
```typescript
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

## Form Development Best Practices

### TanStack Form Integration Pattern
```typescript
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: async ({ value }) => {
      // Handle form submission
      console.log(value);
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }}>
      <form.Field name="name">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Name</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>
      
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Loading States Best Practices

### Loading Component Pattern
```typescript
export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

// Usage pattern
function UsersList() {
  const { data: users, isLoading } = useUsers();
  
  if (isLoading) return <Loader className="h-32" />;
  
  return (
    <div>
      {users?.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

## Responsive Design Guidelines

### Mobile-First Approach
```typescript
// Use TailwindCSS responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>

<div className="px-4 py-2 md:px-6 md:py-4">
  {/* Content */}
</div>
```

### Container Patterns
```typescript
// Standard container (already used in page.tsx)
<div className="container mx-auto max-w-3xl px-4 py-2">
  {/* Content */}
</div>

// Full width with constraints
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

## Notification System Guidelines

### Toast Notifications (Sonner - already configured)
```typescript
import { toast } from "sonner";

// Success toast
toast.success("User created successfully!");

// Error toast
toast.error("Failed to create user");

// Loading toast
const promise = createUser(userData);
toast.promise(promise, {
  loading: 'Creating user...',
  success: 'User created!',
  error: 'Failed to create user'
});
```

## Accessibility Guidelines

### Semantic HTML
- Use proper heading hierarchy (h1, h2, h3...)
- Use semantic elements (nav, main, section, article)
- Provide alt text for images
- Use proper form labels

### Keyboard Navigation
- Ensure all interactive elements are focusable
- Provide visible focus indicators
- Support keyboard shortcuts where appropriate
- Implement focus management for route changes

### Screen Reader Support
- Use ARIA labels where needed
- Provide descriptive text for complex interactions
- Test with screen readers
- Hide decorative icons with `aria-hidden="true"`

### Implemented Accessibility Patterns

#### Navigation Accessibility
```typescript
// Main navigation with proper ARIA roles
<SidebarMenu role="navigation" aria-label="Main navigation">
  <Link 
    href={item.url}
    aria-expanded={item.isActive}
    aria-describedby={item.items?.length ? `${item.title}-submenu` : undefined}
  >
    {item.icon && <item.icon aria-hidden="true" />}
    <span>{item.title}</span>
  </Link>
</SidebarMenu>

// User menu with descriptive labels
<SidebarMenuButton aria-label={`User menu for ${user.name}`}>
  <Avatar>
    <AvatarImage alt={`${user.name}'s profile picture`} src={user.avatar} />
    <AvatarFallback aria-label={`${user.name} initials`}>
      {initials}
    </AvatarFallback>
  </Avatar>
</SidebarMenuButton>
```

#### Focus Management
- Automatic focus management on route changes via `useFocusManagement` hook
- Skip-to-content link for keyboard users
- Enhanced focus indicators during keyboard navigation
- Proper focus restoration without disrupting tab order

#### Mobile Accessibility
- Minimum 44px touch targets on mobile devices
- Auto-close mobile sidebar on navigation
- Enhanced spacing and sizing for touch interactions
- Mobile-optimized dropdown positioning

#### Screen Reader Support
- Route change announcements via ARIA live regions
- Descriptive ARIA labels for all interactive elements
- Proper semantic markup with landmarks
- Hidden decorative elements with `aria-hidden="true"`

### CSS Accessibility Classes
```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Enhanced focus indicators for keyboard navigation */
.keyboard-navigation *:focus {
  @apply outline-2 outline-offset-2 outline-blue-600;
}

/* Skip link for keyboard users */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: white;
  color: black;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  transition: top 0.3s;
}
```

## Performance Optimization Guidelines

### Image Optimization
```typescript
import Image from "next/image";

<Image
  src="/profile.jpg"
  alt="User profile"
  width={100}
  height={100}
  className="rounded-full"
/>
```

### Code Splitting
```typescript
// Dynamic imports for large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loader />
});
```

### Memoization
```typescript
import { memo, useMemo } from "react";

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);
  
  return <div>{/* Render processed data */}</div>;
});
```

## Error Handling & Loading States

### Error Boundary Implementation
Always wrap components with error boundaries for graceful failure handling:

```typescript
import { ErrorBoundary } from '@/components/common/error-boundary'

// Wrap individual components
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Or use the HOC pattern
export default withErrorBoundary(YourComponent)
```

### Loading State Patterns
Use consistent loading patterns across the application:

```typescript
import { InlineLoader, PageLoader, ButtonLoader } from '@/components/common/loading'

// For buttons
<Button disabled={isLoading}>
  {isLoading ? <ButtonLoader className="mr-2" /> : null}
  Submit
</Button>

// For page-level loading
if (isLoading) return <PageLoader text="Loading dashboard..." />

// For inline loading
{isLoading ? <InlineLoader /> : <span>Content loaded</span>}
```

### Error Display Patterns
Use the ErrorDisplay component for consistent error messaging:

```typescript
import { ErrorDisplay } from '@/components/common/error-display'

// Basic error display
<ErrorDisplay 
  error={error} 
  onRetry={handleRetry}
  variant="minimal" 
/>

// Specialized error components
<NetworkError onRetry={handleRetry} />
<NotFoundError resource="user" />
```

### Async Operation Patterns
Use the useAsync hooks for consistent async state management:

```typescript
import { useApiCall, useAsyncSubmit } from '@/hooks/use-async'

// For API calls
const { data, error, isLoading, execute } = useApiCall(apiFunction)

// For form submissions
const { submit, isLoading, error } = useAsyncSubmit(submitFunction)
```

## Component Organization Guidelines

### File Structure
- Components in `apps/web/src/components/`
- UI components in `apps/web/src/components/ui/`
- Common components in `apps/web/src/components/common/`
- Layout components in `apps/web/src/components/layout/`
- Navigation components in `apps/web/src/components/navigation/`
- Pages in `apps/web/src/app/` (App Router)
- Utilities in `apps/web/src/lib/`
- Custom hooks in `apps/web/src/hooks/`

### Naming Conventions
- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Props Interfaces**: PascalCase with Props suffix (e.g., `UserProfileProps`)
- **Hooks**: camelCase starting with 'use' (e.g., `useApiCall`)

### Export Patterns
- Export components as default
- Use named exports for utilities and types
- Co-locate types with components when possible
- Export multiple related components from index files

### Established Patterns
These patterns are currently implemented and should be followed:

1. **Error Boundaries**: All major components wrapped with error boundaries
2. **Loading States**: Consistent loading indicators across all async operations
3. **Type Safety**: All components have proper TypeScript interfaces
4. **Accessibility**: ARIA labels and keyboard navigation implemented
5. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
6. **Theme Support**: All components support dark/light mode