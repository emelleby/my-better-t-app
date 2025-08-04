# Clerk Authentication Integration Tasks

**Important:** Before starting each task, use the `mcp_ref_tools_mcp_ref_search_documentation` tool to search for the latest Clerk documentation and best practices. This ensures implementation follows current Clerk patterns and APIs.

**Reference Guide:** See `clerk-integration-guide.md` for comprehensive implementation details and code examples.

- [ ] 1. Set up Clerk configuration and environment
- [ ] 1.1 Install Clerk packages and dependencies
  - **Documentation Check:** Search for "Clerk Next.js installation setup" using ref-tools
  - Install @clerk/nextjs and required dependencies: `bun add @clerk/nextjs`
  - Add Clerk environment variables to `apps/web/.env`:
    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
    ```
  - Configure Clerk dashboard and get API keys
  - **Reference:** See Step 1-2 in `clerk-integration-guide.md`
  - _Requirements: 1.1, 1.2_

- [ ] 1.2 Configure ClerkProvider in Next.js app
  - **Documentation Check:** Search for "ClerkProvider Next.js 15 App Router" using ref-tools
  - Replace `AuthProvider` with `ClerkProvider` in `apps/web/src/app/layout.tsx`
  - Remove mock auth provider imports and wrap with ClerkProvider
  - Set up Clerk middleware for route protection in `apps/web/src/middleware.ts`
  - Configure Clerk appearance and theming to match existing design system
  - Test basic Clerk integration with development server
  - **Reference:** See Step 3 in `clerk-integration-guide.md`
  - _Requirements: 1.1, 1.3_

- [ ] 2. Replace custom authentication with Clerk components
- [ ] 2.1 Update marketing page with Clerk sign-in
  - **Documentation Check:** Search for "Clerk SignInButton Next.js modal" using ref-tools
  - Replace custom SignInButton in `apps/web/src/app/(LandingPages)/page.tsx`
  - Use `SignInButton` component with modal mode: `<SignInButton mode="modal">`
  - Configure sign-in modal or redirect behavior based on UX requirements
  - Style Clerk components to match existing shadcn/ui design system
  - Test sign-in flow from marketing page with redirect to dashboard
  - **Reference:** See Step 7 in `clerk-integration-guide.md`
  - _Requirements: 2.1, 2.2_

- [ ] 2.2 Implement authentication state management
  - **Documentation Check:** Search for "Clerk useAuth useUser Next.js hooks" using ref-tools
  - Update `apps/web/src/hooks/use-auth.ts` to use Clerk's `useAuth` and `useUser` hooks
  - Create wrapper hook that maintains existing interface for components:
    ```typescript
    return {
      isAuthenticated: isSignedIn || false,
      user: user ? { id: user.id, name: user.fullName || user.firstName || 'User', ... } : null,
      isLoading: !isLoaded,
      signIn: () => {}, // Handled by Clerk components
      signOut: () => {} // Handled by Clerk components
    }
    ```
  - Update all component imports from `useMockAuth` to `useAuth`
  - Test authentication state changes across all components
  - **Reference:** See Step 4-5 in `clerk-integration-guide.md`
  - _Requirements: 2.4, 2.5_

- [ ] 3. Implement protected route system with Clerk
- [ ] 3.1 Set up route protection middleware
  - **Documentation Check:** Search for "Clerk authMiddleware Next.js 15 App Router" using ref-tools
  - Create `apps/web/src/middleware.ts` with Clerk's authMiddleware:
    ```typescript
    import { authMiddleware } from '@clerk/nextjs'
    export default authMiddleware({
      publicRoutes: ['/'],
      ignoredRoutes: ['/api/webhook']
    })
    ```
  - Configure middleware matcher for proper route coverage
  - Set up automatic redirects for unauthenticated users to sign-in
  - Protect dashboard routes (/dashboard, /projects, /settings)
  - Test protected route access and automatic redirects
  - **Reference:** See Step 9 in `clerk-integration-guide.md`
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 3.2 Update layout switching logic
  - **Documentation Check:** Search for "Clerk loading states Next.js App Router" using ref-tools
  - Simplify `apps/web/src/components/layout/app-layout.tsx` authentication logic
  - Remove manual redirect logic (now handled by Clerk middleware)
  - Keep loading state handling: `if (isLoading) return <LoadingComponent />`
  - Implement proper loading states during authentication checks
  - Add error boundaries for authentication failures
  - Test layout switching with authentication state changes
  - **Reference:** See Step 10 in `clerk-integration-guide.md`
  - _Requirements: 3.4, 2.5_

- [ ] 4. Integrate Clerk user profile management
- [ ] 4.1 Add Clerk UserButton to sidebar
  - **Documentation Check:** Search for "Clerk UserButton SignOutButton Next.js" using ref-tools
  - **Option A:** Replace custom user dropdown with Clerk's UserButton component
  - **Option B:** Keep custom design and use Clerk's SignOutButton in dropdown:
    ```typescript
    <SignOutButton>
      <DropdownMenuItem>
        <LogOut aria-hidden="true" />
        Log out
      </DropdownMenuItem>
    </SignOutButton>
    ```
  - Update `apps/web/src/components/navigation/nav-user.tsx`
  - Configure UserButton appearance to match existing sidebar design
  - Integrate with shadcn/ui dropdown components
  - Test user profile access and sign-out functionality
  - **Reference:** See Step 8 in `clerk-integration-guide.md`
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 4.2 Implement user profile display
  - **Documentation Check:** Search for "Clerk user object properties Next.js" using ref-tools
  - Update all components to use Clerk's user data structure:
    - `user.fullName` or `user.firstName` for name
    - `user.primaryEmailAddress?.emailAddress` for email
    - `user.imageUrl` for avatar
  - Update components: Dashboard, Settings, Sidebar, Navigation
  - Handle loading states for user data with `!isLoaded`
  - Test user profile data display and real-time updates
  - **Reference:** See Step 4 user mapping in `clerk-integration-guide.md`
  - _Requirements: 5.4_

- [ ] 5. Create Clerk sign-in/sign-up pages
- [ ] 5.1 Create dedicated authentication pages
  - **Documentation Check:** Search for "Clerk SignIn SignUp pages Next.js App Router" using ref-tools
  - Create `apps/web/src/app/sign-in/[[...sign-in]]/page.tsx`:
    ```typescript
    import { SignIn } from '@clerk/nextjs'
    export default function Page() {
      return <SignIn />
    }
    ```
  - Create `apps/web/src/app/sign-up/[[...sign-up]]/page.tsx`:
    ```typescript
    import { SignUp } from '@clerk/nextjs'
    export default function Page() {
      return <SignUp />
    }
    ```
  - Configure page styling to match application theme
  - Test sign-in and sign-up page functionality
  - **Reference:** See Step 6 in `clerk-integration-guide.md`
  - _Requirements: 2.1, 2.2_

- [ ] 5.2 Set up backend API integration with Clerk
  - **Documentation Check:** Search for "Clerk API routes Next.js server-side auth" using ref-tools
  - Install Clerk backend dependencies if needed
  - Configure Clerk webhook endpoints for user synchronization
  - Set up environment variables for backend Clerk integration
  - Create Hono middleware for Clerk session verification
  - Protect existing API routes with Clerk authentication
  - Update API routes to use Clerk user ID instead of mock auth
  - Test API authentication with Clerk sessions
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 6. Set up user synchronization with database
- [ ] 6.1 Update database schema for Clerk integration
  - **Documentation Check:** Search for "Clerk webhooks user synchronization database" using ref-tools
  - Modify User model in Prisma schema to include clerkId field:
    ```prisma
    model User {
      id        String   @id @default(auto()) @map("_id") @db.ObjectId
      clerkId   String   @unique
      email     String   @unique
      name      String
      avatar    String?
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
      @@map("users")
    }
    ```
  - Create migration for existing users (if any)
  - Update Prisma schema and regenerate client: `bun db:generate`
  - Test database schema changes with `bun db:push`
  - _Requirements: 6.1, 6.2_

- [ ] 6.2 Implement Clerk webhook handlers
  - **Documentation Check:** Search for "Clerk webhooks Next.js API routes user events" using ref-tools
  - Create webhook endpoints in `apps/web/src/app/api/webhooks/clerk/route.ts`
  - Handle user.created, user.updated, user.deleted events
  - Implement user synchronization logic with Prisma
  - Add error handling and retry mechanisms for webhook processing
  - Configure webhook URL in Clerk dashboard
  - Test webhook integration with ngrok or similar for local development
  - _Requirements: 6.3, 6.4_

- [ ] 7. Remove mock authentication code
- [ ] 7.1 Clean up mock authentication system
  - **Documentation Check:** Verify all Clerk integration is working before cleanup
  - Remove mock auth files:
    - `apps/web/src/contexts/mock-auth-context.tsx`
    - `apps/web/src/contexts/auth-context.tsx` (if exists)
  - Update `apps/web/src/hooks/use-auth.ts` to only use Clerk (remove mock fallback)
  - Remove mock auth environment variables and references
  - Clean up any remaining mock authentication imports
  - **Reference:** See Migration Checklist in `clerk-integration-guide.md`
  - _Requirements: Migration cleanup_

- [ ] 7.2 Update components and remove auth dependencies
  - **Documentation Check:** Ensure all components work with Clerk before cleanup
  - Remove any remaining `useMockAuth` imports from components
  - Update all components to use the unified `useAuth` hook
  - Remove unused authentication utilities and mock user data
  - Test all components functionality after cleanup
  - Verify no broken imports or missing dependencies
  - **Reference:** See Rollback Plan in `clerk-integration-guide.md` for what to remove
  - _Requirements: Migration cleanup_

- [ ] 8. Test complete Clerk integration
- [ ] 8.1 Test authentication flows end-to-end
  - **Documentation Check:** Search for "Clerk testing authentication flows" using ref-tools
  - Test sign-up flow with new user creation and email verification
  - Test sign-in flow from landing page and automatic dashboard redirect
  - Test sign-out from user menu and return to marketing page
  - Test session persistence across browser refreshes and tabs
  - Test protected route access (dashboard, projects, settings)
  - Test middleware redirects for unauthenticated access attempts
  - **Reference:** See Testing Clerk Integration in `clerk-integration-guide.md`
  - _Requirements: 2.1, 2.2, 3.1, 3.2_

- [ ] 8.2 Test API integration and user synchronization
  - **Documentation Check:** Search for "Clerk API authentication testing" using ref-tools
  - Test protected API routes with Clerk session authentication
  - Verify user data synchronization via webhooks (create test user)
  - Test error handling for authentication failures in API routes
  - Test user profile updates and database synchronization
  - Verify Clerk user data displays correctly in all components
  - Test loading states and error boundaries with Clerk integration
  - **Reference:** See Component Integration Testing in `clerk-integration-guide.md`
  - _Requirements: 4.1, 4.2, 6.1, 6.2_

- [ ] 9. Optimize and finalize Clerk integration
- [ ] 9.1 Optimize performance and user experience
  - **Documentation Check:** Search for "Clerk performance optimization Next.js" using ref-tools
  - Implement proper loading states for authentication across all components
  - Optimize Clerk component styling and theming to match shadcn/ui design system
  - Add error boundaries and fallback UI for Clerk authentication failures
  - Test performance impact of Clerk integration (bundle size, load times)
  - Implement proper SEO handling for authenticated vs unauthenticated states
  - Test accessibility of Clerk components with screen readers
  - **Reference:** See Benefits of Clerk Integration in `clerk-integration-guide.md`
  - _Requirements: Performance and UX optimization_

- [ ] 9.2 Update documentation and environment setup
  - **Documentation Check:** Search for "Clerk deployment production setup" using ref-tools
  - Update project README with Clerk setup instructions
  - Document all required environment variables and configuration
  - Create development setup guide for new team members
  - Update deployment documentation for production Clerk integration
  - Document webhook setup and testing procedures
  - Create troubleshooting guide for common Clerk integration issues
  - **Reference:** See Next Steps in `clerk-integration-guide.md`
  - _Requirements: Documentation and maintenance_

## Post-Integration Checklist

After completing all tasks, verify the following:

- [ ] **Authentication Flow:** Users can sign up, sign in, and sign out successfully
- [ ] **Route Protection:** Protected routes redirect unauthenticated users appropriately
- [ ] **User Data:** User information displays correctly throughout the application
- [ ] **API Integration:** Backend APIs work with Clerk authentication
- [ ] **Database Sync:** User data synchronizes properly via webhooks
- [ ] **Performance:** No significant performance degradation from Clerk integration
- [ ] **Documentation:** All setup and configuration is properly documented
- [ ] **Rollback Plan:** Rollback procedures are tested and documented

## Emergency Rollback

If critical issues arise, follow the rollback plan in `clerk-integration-guide.md`:

1. Set `NEXT_PUBLIC_USE_MOCK_AUTH=true` in environment variables
2. Revert component imports to use `useMockAuth`
3. Restore `AuthProvider` in root layout
4. Remove Clerk-specific components and middleware

**Note:** Keep all mock authentication files until Clerk integration is fully stable and tested in production.