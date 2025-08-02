# Development Guidelines

## Environment Setup

### Prerequisites
- **Bun v1.2.19+**: Primary runtime and package manager
- **Node.js**: Compatible for tooling (optional)
- **MongoDB**: Database instance (local or cloud)

### Initial Setup
```bash
# Clone and install dependencies
bun install

# Set up environment variables
cp apps/web/.env.example apps/web/.env
cp apps/server/.env.example apps/server/.env

# Configure database
bun db:generate
bun db:push
```

## Development Workflow

### Starting Development
```bash
# Start all services
bun dev

# Or start individual services
bun dev:web     # Frontend only (port 3001)
bun dev:server  # Backend only (port 3000)
```

### Code Quality
```bash
# Format and lint code
bun check

# Type checking
bun check-types
```

### Database Operations
```bash
bun db:push      # Push schema changes
bun db:studio    # Open Prisma Studio
bun db:generate  # Regenerate Prisma client
bun db:migrate   # Run migrations
```

### AI Agent Development Server Testing

**Important**: AI agents should NOT start development servers using `executeBash` as these are long-running processes that will hang the execution.

#### Recommended Testing Approach
1. **User starts server**: Ask the user to start the development server in their terminal
2. **Agent tests endpoints**: Use `curl` commands to test API endpoints (these terminate quickly)
3. **User provides feedback**: Ask user to share any terminal output, errors, or startup issues

#### Testing Commands (AI Agent Safe)
```bash
# Test health endpoint
curl -s http://localhost:3000/

# Test API endpoints
curl -s -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123","name":"Test User"}'

# Check compilation without starting server
bun check-types
```

#### Commands to Avoid in AI Agent Execution
```bash
# These will hang the agent execution:
bun dev          # Starts all services (long-running)
bun dev:server   # Starts backend server (long-running)
bun dev:web      # Starts frontend server (long-running)
```

## Project Standards

### File Organization
- **Components**: Place in `apps/web/src/components/`
- **Pages**: Use Next.js App Router in `apps/web/src/app/`
- **API Routes**: Place in `apps/server/src/routers/`
- **Utilities**: Place in respective `lib/` directories
- **Types**: Co-locate with components or in dedicated `types/` directories

### Naming Conventions
- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Functions**: camelCase (e.g., `getUserProfile`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`, `ApiResponse`)

### Import Order
1. External libraries (React, Next.js, etc.)
2. Internal utilities and components
3. Relative imports
4. Type-only imports (use `import type`)

### Component Patterns
- Use functional components with hooks
- Prefer composition over inheritance
- Extract custom hooks for reusable logic
- Use TypeScript interfaces for props
- Export components as default from their files

## Testing Strategy (Future)

*Note: No testing setup exists yet. This will be documented when we implement testing.*

### Planned Approach
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and database operations
- **E2E Tests**: Test complete user workflows

### Tools Under Consideration
- **Vitest**: Unit and integration testing
- **Testing Library**: Component testing
- **Playwright**: E2E testing

## Performance Guidelines

### Frontend Optimization
- Use Next.js Image component for images
- Implement proper loading states
- Use React.memo for expensive components
- Optimize bundle size with dynamic imports

### Backend Optimization
- Use database indexes appropriately
- Implement proper caching strategies
- Use connection pooling for database
- Monitor API response times

## Security Best Practices

### Environment Variables
- Never commit `.env` files
- Use different environments for development/production
- Validate environment variables at startup

### API Security
- Implement proper CORS configuration
- Use input validation with Zod
- Implement rate limiting
- Use HTTPS in production

### Database Security
- Use parameterized queries (Prisma handles this)
- Implement proper access controls
- Regular security updates

## Deployment Considerations

### Build Process
```bash
bun build        # Build all applications
```

### Environment Configuration
- Set appropriate `NODE_ENV`
- Configure database connections
- Set up monitoring and logging

### Performance Monitoring
- Monitor application metrics
- Set up error tracking
- Implement health checks