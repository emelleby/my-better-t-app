# Clerk Integration Guide

## Overview

This document provides a comprehensive guide for replacing the mock authentication system with Clerk authentication in the VSME Guru application.

## Current Mock Authentication Architecture

### Mock Auth Context (`apps/web/src/contexts/mock-auth-context.tsx`)

```typescript
interface MockAuthContextType {
  isAuthenticated: boolean
  user: MockUser | null
  isLoading: boolean
  signIn: () => void
  signOut: () => void
}

interface MockUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}
```

### Components Using Mock Auth

1. **Landing Page** - Authentication state checking and sign-in
2. **App Layout** - Route protection and authentication-based layout switching
3. **Navigation User** - User information display and sign-out
4. **Dashboard Page** - Personalized user data display
5. **App Sidebar** - User data in sidebar

## Clerk Integration Steps

### Step 1: Install Clerk Dependencies

```bash
bun add @clerk/nextjs
```

### Step 2: Environment Configuration

Add to `apps/web/.env`:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Step 3: Replace Root Layout Provider

**Current:** `apps/web/src/app/layout.tsx`
```typescript
import { AuthProvider } from '@/contexts/mock-auth-context'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
```

**Updated for Clerk:**
```typescript
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

### Step 4: Update Authentication Hook

**Current:** `apps/web/src/hooks/use-auth.ts`
```typescript
import { useMockAuth } from '@/contexts/mock-auth-context'

export function useAuth() {
  return useMockAuth()
}
```

**Updated for Clerk:**
```typescript
import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs'

export function useAuth() {
  const { isSignedIn, isLoaded } = useClerkAuth()
  const { user } = useUser()
  
  return {
    isAuthenticated: isSignedIn || false,
    user: user ? {
      id: user.id,
      name: user.fullName || user.firstName || 'User',
      email: user.primaryEmailAddress?.emailAddress || '',
      avatar: user.imageUrl,
      role: 'user'
    } : null,
    isLoading: !isLoaded,
    signIn: () => {
      // Clerk handles sign-in via SignIn component or redirects
    },
    signOut: () => {
      // Clerk handles sign-out
    }
  }
}
```

### Step 5: Update Component Imports

Replace in all components:
```typescript
// Current
import { useMockAuth } from '@/contexts/mock-auth-context'

// Updated
import { useAuth } from '@/hooks/use-auth'
```

### Step 6: Create Clerk Sign-In/Sign-Up Pages

**Create:** `apps/web/src/app/sign-in/[[...sign-in]]/page.tsx`
```typescript
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn />
}
```

**Create:** `apps/web/src/app/sign-up/[[...sign-up]]/page.tsx`
```typescript
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp />
}
```

### Step 7: Update Landing Page Sign-In

**Current:** `apps/web/src/app/(LandingPages)/page.tsx`
```typescript
function SignInButton() {
  const { signIn } = useAuth()
  
  const handleSignIn = () => {
    signIn()
  }
  
  return (
    <Button onClick={handleSignIn}>
      Kom i gang i dag
    </Button>
  )
}
```

**Updated for Clerk:**
```typescript
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'

function SignInButton() {
  return (
    <ClerkSignInButton mode="modal">
      <Button>
        Kom i gang i dag
      </Button>
    </ClerkSignInButton>
  )
}
```

### Step 8: Update Navigation User Component

**Current:** `apps/web/src/components/navigation/nav-user.tsx`
```typescript
const handleSignOut = () => {
  signOut()
  window.location.href = '/'
}
```

**Updated for Clerk:**
```typescript
import { SignOutButton } from '@clerk/nextjs'

// Replace the sign-out dropdown item with:
<SignOutButton>
  <DropdownMenuItem>
    <LogOut aria-hidden="true" />
    Log out
  </DropdownMenuItem>
</SignOutButton>
```

### Step 9: Add Route Protection Middleware

**Create:** `apps/web/src/middleware.ts`
```typescript
import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/'],
  ignoredRoutes: ['/api/webhook']
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
```

### Step 10: Update App Layout Protection

**Current:** `apps/web/src/components/layout/app-layout.tsx`
```typescript
useEffect(() => {
  if (!(isLoading || isAuthenticated)) {
    window.location.href = '/'
  }
}, [isAuthenticated, isLoading])
```

**Updated for Clerk:**
```typescript
// Remove manual redirect logic - Clerk middleware handles this
// Keep loading state handling:
if (isLoading) {
  return <LoadingComponent />
}
```

## Component-Specific Updates

### Landing Page Updates
- Replace manual authentication checks with Clerk's built-in redirect handling
- Use `SignInButton` component for sign-in functionality
- Remove manual redirect logic (handled by Clerk)

### Dashboard Layout Updates
- Simplify authentication checks (Clerk middleware handles protection)
- Keep user data display logic
- Remove manual redirect logic

### Navigation Updates
- Use `UserButton` component for user menu (optional)
- Or keep custom implementation with Clerk's `SignOutButton`
- Update user data structure to match Clerk's user object

## Testing Clerk Integration

### 1. Authentication Flow Testing
- [ ] Sign-in redirects to dashboard
- [ ] Sign-out redirects to landing page
- [ ] Protected routes are inaccessible when not authenticated
- [ ] User data displays correctly
- [ ] Authentication state persists across page refreshes

### 2. Component Integration Testing
- [ ] All components work with Clerk auth
- [ ] User information displays correctly
- [ ] Navigation functions properly
- [ ] Layout switching works seamlessly

### 3. Route Protection Testing
- [ ] Middleware protects routes correctly
- [ ] Public routes remain accessible
- [ ] Authentication redirects work properly

## Migration Checklist

- [ ] Install Clerk dependencies
- [ ] Configure environment variables
- [ ] Update root layout with ClerkProvider
- [ ] Create authentication hook wrapper
- [ ] Update all component imports
- [ ] Create sign-in/sign-up pages
- [ ] Update landing page sign-in button
- [ ] Update navigation user component
- [ ] Add route protection middleware
- [ ] Update app layout protection logic
- [ ] Test complete authentication flow
- [ ] Remove mock authentication files
- [ ] Update documentation

## Rollback Plan

If issues arise during Clerk integration:

1. **Revert Environment Variables**
   - Set `NEXT_PUBLIC_USE_MOCK_AUTH=true`
   - Remove Clerk environment variables

2. **Revert Component Imports**
   - Change imports back to `useMockAuth`
   - Remove Clerk-specific components

3. **Revert Layout Changes**
   - Restore `AuthProvider` in root layout
   - Remove `ClerkProvider`

4. **Remove Clerk Files**
   - Delete sign-in/sign-up pages
   - Remove middleware.ts

## Benefits of Clerk Integration

1. **Production-Ready Authentication**
   - Secure user management
   - Built-in security features
   - Compliance with security standards

2. **Enhanced User Experience**
   - Professional sign-in/sign-up flows
   - Social login options
   - Password reset functionality

3. **Developer Experience**
   - Reduced authentication code maintenance
   - Built-in security best practices
   - Comprehensive documentation and support

4. **Scalability**
   - Handles user management at scale
   - Built-in user analytics
   - Advanced user management features

## Next Steps

After completing the Clerk integration:

1. **Test thoroughly** in development environment
2. **Deploy to staging** for additional testing
3. **Update documentation** to reflect Clerk usage
4. **Train team** on Clerk-specific features
5. **Monitor authentication metrics** in production

This guide provides a complete roadmap for transitioning from mock authentication to Clerk, ensuring a smooth migration with minimal disruption to the application functionality.