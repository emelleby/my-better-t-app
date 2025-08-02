# Implementation Plan

- [x] 1. Set up backend API foundation
- [x] 1.1 Create Hono server structure
  - Set up modular routing structure in apps/server/src/routes/
  - Create main app.ts with route mounting using app.route()
  - Configure CORS and logging middleware
  - _Requirements: Backend architecture foundation_

- [x] 1.2 Set up database and validation
  - Configure Prisma with MongoDB for User model
  - Create shared Zod validation schemas in lib/validation.ts
  - Set up database connection and client export
  - _Requirements: Data persistence and validation_

- [x] 1.3 Implement authentication routes
  - Create auth.ts router with login, register, logout endpoints
  - Implement JWT token generation and validation
  - Add password hashing with bcrypt
  - Use inline handlers for optimal type inference
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 2. Create user management API routes
- [ ] 2.1 Implement user routes
  - Create users.ts router with CRUD operations
  - Add user listing and individual user retrieval
  - Implement proper error handling and validation
  - _Requirements: User data management_

- [ ] 2.2 Implement profile routes
  - Create profile.ts router for current user operations
  - Add profile retrieval and update endpoints
  - Integrate with authentication middleware
  - _Requirements: User profile management_

- [ ] 2.3 Set up RPC type export
  - Create routes/index.ts for route aggregation
  - Export AppType for frontend RPC integration
  - Ensure full type safety across API surface
  - _Requirements: Type safety and developer experience_

- [ ] 3. Set up frontend authentication foundation
  - Create AuthContext with TypeScript interfaces for user and authentication state
  - Implement AuthProvider component with JWT token management
  - Create Hono RPC client with full type safety
  - Create custom hooks for authentication (useAuth)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 4. Create protected route system
  - Implement ProtectedRoute higher-order component
  - Add route protection logic with redirect functionality
  - Integrate with TanStack Query for server state management
  - Create authentication state checking utilities
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Install and configure required shadcn/ui components
  - Install sidebar, dropdown-menu, avatar, breadcrumb, and collapsible components
  - Configure component imports and ensure proper styling
  - Test component functionality with existing theme system
  - _Requirements: 3.1, 3.2_

- [ ] 6. Implement sidebar-07 block components
- [ ] 6.1 Create base sidebar structure
  - Copy and adapt AppSidebar component from sidebar-07 block
  - Implement SidebarProvider and SidebarInset layout structure
  - Customize branding for VSME Guru in sidebar header
  - _Requirements: 3.1, 3.2, 3.6_

- [ ] 6.2 Implement navigation components
  - Create NavMain component with VSME Guru navigation items
  - Implement NavProjects component for project navigation
  - Create TeamSwitcher component customized for VSME Guru branding
  - _Requirements: 3.2, 3.3_

- [ ] 6.3 Create user profile navigation
  - Implement NavUser component with user profile dropdown
  - Add sign-out functionality to user dropdown menu
  - Integrate with authentication context and API for user data
  - _Requirements: 3.5, 3.6_

- [ ] 7. Create dashboard layout and routing
- [ ] 7.1 Implement dashboard layout component
  - Create DashboardLayout component using sidebar structure
  - Add breadcrumb navigation and sidebar trigger
  - Ensure responsive design with mobile sidebar collapse
  - _Requirements: 3.1, 3.4, 5.1, 5.2, 6.1, 6.2_

- [ ] 7.2 Create dashboard pages and routing
  - Create /dashboard route with basic dashboard content
  - Implement /dashboard/projects and /dashboard/settings routes
  - Add proper Next.js App Router structure for dashboard
  - Integrate with TanStack Query for data fetching
  - _Requirements: 3.3, 5.5_

- [ ] 8. Transform marketing page
- [ ] 8.1 Create simple marketing layout
  - Remove current ASCII art and create clean marketing layout
  - Implement simple hero section with VSME Guru title
  - Add centered layout with minimal design
  - _Requirements: 1.1, 1.4, 6.1_

- [ ] 8.2 Implement sign-in functionality
  - Create SignInButton component with blue styling
  - Connect sign-in button to authentication API via RPC client
  - Implement proper login form with validation
  - _Requirements: 1.2, 2.1, 2.2_

- [ ] 9. Integrate authentication with routing
- [ ] 9.1 Connect authentication state to layout switching
  - Modify root layout to conditionally render marketing vs dashboard
  - Implement authentication state checking in layout component
  - Add proper route redirection based on authentication status
  - Integrate JWT token validation with API calls
  - _Requirements: 4.1, 4.2, 5.1, 5.2, 5.3_

- [ ] 9.2 Add loading states and error handling
  - Implement loading states for authentication state changes
  - Add error boundaries for component failures
  - Create fallback UI for missing data or errors
  - Handle API errors and network failures gracefully
  - _Requirements: 2.5, 5.4_

- [ ] 10. Implement responsive design and accessibility
- [ ] 10.1 Ensure mobile responsiveness
  - Test sidebar collapse functionality on mobile devices
  - Verify marketing page responsive design
  - Add proper touch interactions for mobile sidebar
  - _Requirements: 1.3, 3.4, 6.1, 6.2_

- [ ] 10.2 Add accessibility features
  - Implement proper ARIA labels for navigation elements
  - Add keyboard navigation support for sidebar and dropdowns
  - Ensure focus management for route changes
  - Test screen reader compatibility
  - _Requirements: 6.3, 6.4, 6.5_

- [ ] 11. Apply color scheme and theming
- [ ] 11.1 Implement blue and emerald color scheme
  - Update Tailwind configuration with custom blue and emerald colors
  - Apply primary blue colors to sign-in button and key UI elements
  - Add emerald/teal accents to secondary elements
  - _Requirements: 1.6, 1.7_

- [ ] 11.2 Ensure theme compatibility
  - Test color scheme with both light and dark themes
  - Maintain existing theme toggle functionality
  - Verify color contrast and accessibility standards
  - _Requirements: 1.5, 5.3_

- [ ] 12. Final integration and testing
- [ ] 12.1 Test complete authentication flow
  - Verify API authentication endpoints work correctly
  - Test sign-in redirects to dashboard correctly
  - Test sign-out returns to marketing page
  - Confirm JWT token persistence and validation
  - Test token refresh functionality
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.1, 4.2_

- [ ] 12.2 Test API integration and user experience
  - Verify all API endpoints respond correctly with proper types
  - Test RPC client type safety and error handling
  - Verify all sidebar navigation links work correctly
  - Test responsive behavior across different screen sizes
  - Confirm proper URL updates and browser history
  - Test TanStack Query caching and invalidation
  - _Requirements: 3.2, 3.3, 5.5, 5.6_