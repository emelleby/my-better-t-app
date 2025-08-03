# Design Document

## Overview

This design implements the foundational UI structure for VSME Guru, transforming the current basic application into a professional SaaS platform. The design includes a marketing landing page, mock authentication system, and a comprehensive dashboard with sidebar navigation using the shadcn/ui sidebar-07 block.

## Architecture

### Application Architecture

The application follows a full-stack architecture with clear separation between frontend and backend:

1. **Frontend**: Next.js 15 with App Router (React 19)
2. **Backend**: Hono.js API server with modular routing
3. **Database**: MongoDB with Prisma ORM
4. **Type Safety**: End-to-end TypeScript with Hono RPC

### Application States

The application will have two distinct states:

1. **Unauthenticated State**: Marketing page with sign-in functionality
2. **Authenticated State**: Dashboard with sidebar navigation and protected routes

### Backend API Architecture

Following Hono.js best practices with modular routing:

```
apps/server/src/
├── index.ts                 # Main Hono app with route mounting
├── routes/
│   ├── auth.ts             # Authentication endpoints
│   ├── users.ts            # User management endpoints
│   ├── profile.ts          # User profile endpoints
│   └── index.ts            # Route aggregation & RPC type export
├── lib/
│   ├── db.ts               # Prisma database client
│   └── validation.ts       # Shared Zod validation schemas
└── middleware/
    ├── auth.ts             # JWT authentication middleware
    └── cors.ts             # CORS configuration
```

### API Route Structure

```
/api/v1/auth/login          # POST - User authentication
/api/v1/auth/register       # POST - User registration  
/api/v1/auth/logout         # POST - User logout
/api/v1/auth/refresh        # POST - Token refresh
/api/v1/users               # GET - List users (admin)
/api/v1/users/:id           # GET - Get user by ID
/api/v1/profile             # GET - Current user profile
/api/v1/profile             # PUT - Update user profile
```

### State Management

- **Authentication State**: React Context + localStorage for persistence
- **Server State**: TanStack Query for API data fetching and caching
- **Theme State**: Existing next-themes implementation (preserved)
- **Navigation State**: Next.js App Router with conditional layouts

### Frontend Route Structure

```
/                    # Marketing page (unauthenticated)
/dashboard           # Main dashboard (authenticated)
/dashboard/projects  # Projects section (authenticated)
/dashboard/settings  # Settings section (authenticated)
```

## Components and Interfaces

### Backend API Components

#### Authentication Routes (Hono)
```typescript
// apps/server/src/routes/auth.ts
const auth = new Hono()
  .post('/login', 
    zValidator('json', loginSchema),
    async (c) => {
      // Inline handler for type safety
      const { email, password } = c.req.valid('json')
      // Authentication logic here
      return c.json({ token, user }, 200)
    }
  )
  .post('/register', /* ... */)
  .post('/logout', /* ... */)
  .post('/refresh', /* ... */)
```

#### User Management Routes (Hono)
```typescript
// apps/server/src/routes/users.ts
const users = new Hono()
  .get('/', async (c) => {
    // Get all users (admin only)
    return c.json({ users })
  })
  .get('/:id', async (c) => {
    const id = c.req.param('id') // Type-safe parameter
    return c.json({ user })
  })
```

#### Profile Routes (Hono)
```typescript
// apps/server/src/routes/profile.ts
const profile = new Hono()
  .get('/', async (c) => {
    // Get current user profile
    return c.json({ profile })
  })
  .put('/', 
    zValidator('json', profileUpdateSchema),
    async (c) => {
      // Update user profile
      return c.json({ profile })
    }
  )
```

### Frontend Authentication System

#### AuthContext Interface
```typescript
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}
```

#### AuthProvider Component
- Manages authentication state using React Context
- Integrates with Hono API via RPC client
- Persists JWT tokens securely
- Provides authentication methods to child components

#### API Client Integration
```typescript
// Frontend API client with full type safety
import { hc } from 'hono/client'
import type { AppType } from '../../../server/src/routes'

const client = hc<AppType>('http://localhost:3000')

// Fully typed API calls
const response = await client.api.v1.auth.login.$post({
  json: { email, password }
})
```

#### ProtectedRoute Component
- Higher-order component for route protection
- Redirects unauthenticated users to marketing page
- Preserves intended destination for post-login redirect
- Integrates with TanStack Query for server state

### Marketing Page Components

#### MarketingLayout Component
- Clean, minimal layout for marketing content
- Preserves theme toggle functionality
- Responsive design with mobile-first approach

#### HeroSection Component
- Simple, clean design with VSME Guru title
- Minimal copy and clean typography
- Prominent sign-in button with blue styling
- Centered layout with plenty of whitespace

#### SignInButton Component
- Primary CTA button with blue gradient background
- Hover and focus states with accessibility support
- Triggers mock authentication flow

### Dashboard Components

#### DashboardLayout Component
- Implements sidebar-07 block structure
- Responsive sidebar that collapses on mobile
- Main content area with breadcrumb navigation

#### AppSidebar Component (Customized)
- Based on shadcn sidebar-07 block
- VSME Guru branding in header
- Navigation sections:
  - Dashboard (main overview)
  - Sections (Reporting sections)
  - - Environmental
  - - Social
  - - Governance
  - Analytics (future feature)
  - Settings (user preferences)
- User profile section with sign-out functionality

#### Navigation Components
- **NavMain**: Primary navigation items with collapsible sections
- **NavProjects**: Project-specific navigation
- **NavUser**: User profile dropdown with sign-out option
- **TeamSwitcher**: Customized for VSME Guru branding

## Data Models

### Database Models (Prisma)

#### User Model
```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String
  avatar    String?
  password  String   // Hashed
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lastLoginAt DateTime?
  
  @@map("users")
}
```

### API Data Models (Zod Validation)

#### Authentication Schemas
```typescript
// Shared validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
})

const profileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  avatar: z.string().url().optional()
})
```

### Frontend Type Models

#### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}
```

#### Navigation Model
```typescript
interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: NavigationSubItem[];
}

interface NavigationSubItem {
  title: string;
  url: string;
}
```

#### API Response Types (Inferred from Hono)
```typescript
// These types are automatically inferred from Hono routes
type LoginResponse = {
  token: string;
  user: User;
}

type ProfileResponse = {
  profile: User;
}
```

## Design System

### Color Palette

#### Primary Colors (Blue)
- `primary-50`: #eff6ff
- `primary-500`: #3b82f6 (main blue)
- `primary-600`: #2563eb
- `primary-700`: #1d4ed8

#### Secondary Colors (Emerald/Teal)
- `secondary-50`: #ecfdf5
- `secondary-500`: #10b981 (main emerald)
- `secondary-600`: #059669
- `secondary-700`: #047857

#### Gradient Combinations
- Primary gradient: `from-blue-500 to-blue-600`
- Secondary gradient: `from-emerald-500 to-teal-600`
- Hero gradient: `from-blue-500 via-purple-500 to-emerald-500`

### Typography

- **Headings**: Geist Sans with appropriate font weights
- **Body**: Geist Sans regular
- **Code/Monospace**: Geist Mono
- **Responsive scaling**: Using Tailwind's responsive typography

### Spacing and Layout

- **Container**: Max-width with responsive padding
- **Grid System**: CSS Grid for layout structure
- **Sidebar**: 280px width on desktop, collapsible on mobile
- **Content Area**: Flexible with proper margins and padding

## Error Handling

### Authentication Errors
- Invalid credentials handling (future real auth)
- Session expiration handling
- Network error handling with retry mechanisms

### Navigation Errors
- 404 page for invalid routes
- Fallback UI for component errors
- Loading states for route transitions

### UI Error Boundaries
- React Error Boundaries for component failures
- Graceful degradation for missing data
- User-friendly error messages

## Testing Strategy

### Unit Testing
- Authentication context and hooks
- Individual components (buttons, forms, navigation)
- Utility functions and helpers

### Integration Testing
- Authentication flow (sign in/out)
- Route protection and redirection
- Sidebar navigation and state management

### Visual Testing
- Responsive design across breakpoints
- Theme switching functionality
- Color scheme implementation
- Accessibility compliance

### User Experience Testing
- Navigation flow between marketing and dashboard
- Mobile sidebar interaction
- Keyboard navigation support
- Screen reader compatibility

## Implementation Phases

### Phase 1: Authentication Foundation
1. Create AuthContext and AuthProvider
2. Implement ProtectedRoute component
3. Add localStorage persistence
4. Create basic sign-in/out flow

### Phase 2: Marketing Page
1. Transform current home page to simple marketing layout
2. Implement minimal HeroSection with VSME Guru title
3. Add SignInButton with clean styling
4. Keep design simple and clean

### Phase 3: Dashboard Structure
1. Install required shadcn/ui components
2. Implement sidebar-07 block components
3. Create DashboardLayout with proper routing
4. Customize navigation for VSME Guru

### Phase 4: Integration and Polish
1. Connect authentication with routing
2. Implement proper loading states
3. Add error boundaries and fallbacks
4. Optimize performance and accessibility

## Technical Considerations

### Backend Architecture (Hono)

#### Routing Best Practices
- **Modular Structure**: Using `app.route()` for mounting separate route modules
- **Inline Handlers**: Keeping route handlers inline for optimal type inference
- **Type Safety**: Full TypeScript inference from backend to frontend via RPC
- **Performance**: Leveraging Hono's ultrafast routing with minimal overhead

#### API Design Patterns
- **RESTful Endpoints**: Following REST conventions for resource management
- **Validation**: Using Zod schemas for request/response validation
- **Error Handling**: Consistent error responses with proper HTTP status codes
- **Middleware**: Authentication and CORS middleware applied globally

### Frontend Performance
- Code splitting for dashboard components
- Lazy loading of non-critical components
- TanStack Query for efficient server state caching
- Optimized images and assets
- Minimal bundle size impact

### Type Safety & Developer Experience
- **End-to-End Types**: Hono RPC provides full type safety from API to frontend
- **Automatic Inference**: No need for separate API type definitions
- **Compile-Time Validation**: TypeScript catches API mismatches at build time
- **IDE Support**: Full autocomplete and error checking for API calls

### Security

#### Backend Security
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Using bcrypt for password security
- **Input Validation**: Zod schemas prevent malformed requests
- **CORS Configuration**: Proper cross-origin request handling
- **Rate Limiting**: Protection against abuse (future implementation)

#### Frontend Security
- **Secure Token Storage**: JWT tokens stored securely
- **XSS Prevention**: Proper input sanitization and output encoding
- **CSRF Protection**: Token-based protection against cross-site requests
- **Route Protection**: Client-side route guards with server-side validation

### Accessibility
- ARIA labels for navigation elements
- Keyboard navigation support
- Screen reader compatibility
- Focus management for route changes

### Browser Compatibility
- Modern browser support (ES2020+)
- Progressive enhancement approach
- Fallbacks for unsupported features

## Future Considerations

### Real Authentication Integration
- Clerk integration points identified
- Migration path from mock to real auth
- User data synchronization
- Session management improvements

### Feature Expansion
- Additional dashboard sections
- User preferences and settings
- Project management features
- Analytics and reporting

### Scalability
- Component library expansion
- Design system documentation
- Internationalization support
- Performance monitoring