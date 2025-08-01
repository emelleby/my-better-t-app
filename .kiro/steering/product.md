# Product Overview

**my-better-t-app** is a full-stack TypeScript application built with the Better-T-Stack template. It provides a modern web application foundation with a React frontend and API backend, designed for rapid development and scalability.

## Current State
This is a foundational setup with basic architecture in place:
- ✅ Monorepo structure with Turborepo
- ✅ Next.js frontend with App Router
- ✅ Hono backend server
- ✅ MongoDB + Prisma ORM setup
- ✅ shadcn/ui component system
- ✅ Dark/light theme support
- ✅ TanStack Query for state management
- ✅ Code quality tools (Biome, Ultracite)

## Key Features
- **Full-stack TypeScript**: End-to-end type safety
- **Modern React Frontend**: Next.js 15 with App Router
- **Lightweight API Backend**: Hono framework for performance
- **Type-safe Database**: MongoDB with Prisma ORM
- **Component System**: shadcn/ui with TailwindCSS
- **Monorepo Architecture**: Turborepo for build orchestration
- **Developer Experience**: Hot reload, type checking, linting

## Architecture
- **Frontend**: Next.js app on port 3001
  - React 19 with modern patterns
  - TailwindCSS for styling
  - shadcn/ui component library
  - TanStack Query for server state
  - TanStack Form for form management
- **Backend**: Hono API server on port 3000
  - Lightweight and fast
  - CORS configured for development
  - Ready for route expansion
- **Database**: MongoDB with Prisma
  - Type-safe database operations
  - Schema-first development
  - Migration support
- **Build System**: Turborepo + Bun
  - Fast builds and caching
  - Parallel task execution
  - Optimized for monorepo

## Development Philosophy
- **Type Safety First**: Leverage TypeScript throughout
- **Performance Optimized**: Bun runtime and efficient tooling
- **Developer Experience**: Fast feedback loops and great tooling
- **Scalable Architecture**: Monorepo ready for growth
- **Modern Patterns**: Latest React and web standards
- **Code Quality**: Automated formatting and linting

## Current Capabilities
What the application can do right now:
- ✅ Display a basic home page with ASCII art
- ✅ Toggle between dark and light themes
- ✅ Serve static content through Next.js
- ✅ Handle basic HTTP requests through Hono server
- ✅ Development workflow with hot reload

## Immediate Next Steps
Based on current state, the logical next steps are:
1. Set up environment variables and database connection
2. Create first database model in Prisma schema
3. Implement first API endpoint
4. Build first UI component that fetches data
5. Connect frontend and backend with actual data flow

*Note: More comprehensive features will be documented as they are implemented*