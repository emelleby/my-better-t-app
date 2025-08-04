# Technology Stack

**✅ CURRENT STATE DOCUMENTATION**

_This document lists the technologies currently installed and configured in the project, along with the commands to use them._

## Runtime & Package Manager

- **Bun**: Primary runtime and package manager (v1.2.19)
- **Node.js**: Compatible for tooling

## Build System

- **Turborepo**: Monorepo build orchestration with caching
- **Next.js**: Frontend build system with Turbopack
- **tsdown**: TypeScript compilation for server

## Frontend Stack

- **Next.js 15.3.0**: React framework with App Router
- **React 19**: UI library with latest features
- **TypeScript**: Type safety and developer experience
- **TailwindCSS 4.1.11**: Utility-first CSS framework
- **shadcn/ui**: Reusable component library
- **Radix UI**: Headless UI primitives
- **Lucide React**: Icon library

## Backend Stack

- **Hono 4.8.10**: Lightweight web framework
- **Prisma 6.13.0**: TypeScript-first ORM
- **MongoDB**: NoSQL database
- **Zod**: Runtime type validation

## State Management & Data Fetching

- **TanStack Query**: Server state management
- **TanStack Form**: Form state management
- **React Query DevTools**: Development debugging

## Code Quality & Formatting

- **Biome**: Linting and formatting (extends ultracite config)
- **TypeScript**: Strict mode enabled
- **Ultracite**: Opinionated code style configuration

## Common Commands

### Development

```bash
bun dev              # Start all apps in development
bun dev:web          # Start only frontend (port 3001)
bun dev:server       # Start only backend (port 3000)
```

### Building

```bash
bun build            # Build all applications
bun check-types      # Type check across monorepo
```

### Database Operations

```bash
bun db:push          # Push schema to database
bun db:studio        # Open Prisma Studio
bun db:generate      # Generate Prisma client
bun db:migrate       # Run database migrations
```

### Code Quality

```bash
bun check            # Run Biome linting and formatting
```

## Configuration Files

- `turbo.json`: Turborepo task configuration
- `biome.json`: Code formatting and linting rules (extends ultracite)
- `tsconfig.json`: TypeScript compiler options
- `apps/server/prisma/schema/schema.prisma`: Database schema definition
- `apps/web/components.json`: shadcn/ui configuration
- `apps/web/next.config.ts`: Next.js configuration
- `bunfig.toml`: Bun runtime configuration

## Environment Files

- `apps/web/.env`: Frontend environment variables
- `apps/server/.env`: Backend environment variables
- Both apps have `.env.example` files as templates
