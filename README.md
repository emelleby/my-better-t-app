# ESG Reporting Application

A comprehensive ESG (Environmental, Social, Governance) reporting platform built with modern TypeScript technologies. This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack) and enhanced with ESG-specific features.

## Features

- **TypeScript** - End-to-end type safety with comprehensive validation
- **Next.js 15** - Full-stack React framework with App Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components with dark/light theme support
- **Hono** - Lightweight, performant server framework
- **Bun** - Fast runtime environment and package manager
- **Prisma** - TypeScript-first ORM with MongoDB support
- **MongoDB** - Dual-database architecture for application and shared data
- **Turborepo** - Optimized monorepo build system
- **Zod** - Runtime type validation for API endpoints
- **TanStack Query** - Server state management
- **Clerk** - Authentication and user management

## Architecture

### Dual Database System
- **Primary Database**: Application data (Users, Companies, Reports)
- **External Database**: Shared reference data and cross-application resources

### ESG Data Models
- **Environmental**: Energy consumption, emissions (Scope 1/2/3), renewable energy
- **Social**: Employee metrics, diversity data
- **Governance**: Ethics, compliance, fines and penalties

## Quick Start

### Prerequisites
- **Bun** v1.2.19+ ([Installation Guide](https://bun.sh/docs/installation))
- **MongoDB Atlas** account or local MongoDB instance
- **Clerk** account for authentication (optional for development)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd my-better-t-app
bun install
```

2. **Environment Setup:**
```bash
# Copy environment templates
cp apps/web/.env.example apps/web/.env
cp apps/server/.env.example apps/server/.env

# Run environment setup script
bun run env:setup
```

3. **Configure Environment Variables:**

**Frontend (`apps/web/.env`):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

**Backend (`apps/server/.env`):**
```bash
# Primary database (application data)
PRIMARY_DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/esg-app-dev

# External database (shared data)
SCOPE321_DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/shared-data

# External database name (environment-specific)
EXTERNAL_DATABASE_NAME=co2-intensities-dev

# Environment
NODE_ENV=development
```

4. **Database Setup:**
```bash
# Generate Prisma client
bun db:generate

# Push schema to database
bun db:push

# Seed development data (optional)
bun run db:seed:dev
```

5. **Start Development Servers:**
```bash
# Start all services
bun dev

# Or start individually
bun dev:web    # Frontend only (port 3001)
bun dev:server # Backend only (port 3000)
```

6. **Access the Application:**
- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **API**: [http://localhost:3000](http://localhost:3000)
- **Database Studio**: `bun db:studio`

## Project Structure

```
my-better-t-app/
├── apps/
│   ├── web/                    # Frontend Next.js application
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   ├── components/    # React components
│   │   │   ├── contexts/      # React contexts (auth, theme)
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   └── lib/           # Utilities and API client
│   │   └── ...
│   └── server/                 # Backend Hono API server
│       ├── src/
│       │   ├── lib/           # Services and utilities
│       │   ├── scripts/       # Database and maintenance scripts
│       │   ├── types/         # TypeScript type definitions
│       │   └── index.ts       # Server entry point
│       └── prisma/            # Database schema and migrations
├── docs/                       # Project documentation
├── Foundation/steering/        # Development guidelines and conventions
└── .kiro/                     # Kiro AI assistant configuration
```

## Available Scripts

### Development
```bash
bun dev              # Start all applications in development mode
bun dev:web          # Start only the frontend (port 3001)
bun dev:server       # Start only the backend (port 3000)
bun build            # Build all applications for production
bun check-types      # Type check across all applications
bun check            # Run Biome linting and formatting
```

### Database Management
```bash
# Core Database Operations
bun db:generate      # Generate Prisma client
bun db:push          # Push schema changes to database
bun db:migrate       # Create and run database migrations
bun db:studio        # Open Prisma Studio (database GUI)

# Database Status and Testing
bun db:status        # Check database connection and status
bun db:test-external # Test external database connection

# Data Seeding
bun db:seed          # Run environment-appropriate seeding
bun db:seed:dev      # Seed development data
bun db:seed:prod     # Seed production data
bun db:reset         # Reset database and reseed
```

### Environment and Validation
```bash
# Environment Management
bun env:setup        # Setup and validate environment configuration
bun env:validate     # Validate current environment settings

# Type Safety and Validation
bun validate:types   # Validate TypeScript/Zod/Prisma alignment
```

### Maintenance
```bash
bun cleanup:eslint   # Remove unnecessary ESLint comments (Biome project)
```

## Environment Configuration

The application supports multiple environments with automatic configuration:

### Environment Types
- **development** - Local development with hot reload
- **test** - Testing environment with test database
- **staging** - Pre-production environment
- **production** - Production environment

### Database Configuration
The application automatically configures database names based on environment:
- Development: `esg-app-dev`
- Test: `esg-app-test`
- Staging: `esg-app-staging`
- Production: `esg-app-prod`

### Environment Validation
Run `bun env:setup` to validate your environment configuration and get detailed setup instructions.

## Type Safety

This project maintains strict type safety across all layers:

### Validation System
- **TypeScript Interfaces** - Define data structures
- **Zod Schemas** - Runtime validation for API endpoints
- **Prisma Models** - Database schema and type generation

### Automated Validation
The project includes automated type alignment validation:
```bash
bun validate:types   # Check alignment between TypeScript, Zod, and Prisma
```

This ensures that your TypeScript interfaces, Zod validation schemas, and Prisma models stay synchronized as the application evolves.

## Development Guidelines

### Code Quality
- **Biome** - Fast linting and formatting (no semicolons style)
- **TypeScript** - Strict mode enabled
- **Ultracite** - Opinionated code quality rules

### Testing Strategy
- Type alignment validation with automated coverage analysis
- Kiro hooks for automated validation on schema changes

### Documentation
- Comprehensive steering documentation in `Foundation/steering/`
- API documentation with examples
- Database setup and management guides in `docs/`

## Deployment

### Build Process
```bash
bun build           # Build all applications
bun check-types     # Verify type safety
bun validate:types  # Ensure type alignment
```

### Environment Setup
1. Configure production environment variables
2. Set up MongoDB Atlas clusters for primary and external databases
3. Configure Clerk authentication for production
4. Run database migrations: `bun db:migrate`
5. Seed production data: `bun db:seed:prod`

## Contributing

1. Follow the established code style (run `bun check` before committing)
2. Ensure type safety with `bun validate:types`
3. Update documentation when adding new features
4. Test database operations with `bun db:status`

## Support

- **Documentation**: See `docs/` directory for detailed guides
- **Development Guidelines**: See `Foundation/steering/` for coding standards
- **Database Setup**: See `docs/DATABASE_SETUP.md` for database configuration
- **Type Safety**: Run `bun validate:types` for type alignment validation

## License

[Add your license information here]
