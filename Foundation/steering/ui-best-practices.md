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

### Screen Reader Support
- Use ARIA labels where needed
- Provide descriptive text for complex interactions
- Test with screen readers

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

## Component Organization Guidelines

### File Structure
- Components in `apps/web/src/components/`
- UI components in `apps/web/src/components/ui/`
- Pages in `apps/web/src/app/` (App Router)
- Utilities in `apps/web/src/lib/`

### Naming Conventions
- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Props Interfaces**: PascalCase with Props suffix (e.g., `UserProfileProps`)

### Export Patterns
- Export components as default
- Use named exports for utilities and types
- Co-locate types with components when possible

*Note: These are guidelines to follow when implementing UI components. Update this document with real patterns as they emerge from actual implementation.*