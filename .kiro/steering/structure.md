# Project Structure

## Monorepo Organization
This is a Turborepo monorepo with the following structure:

```
my-better-t-app/
├── apps/                    # Application packages
│   ├── web/                # Frontend Next.js application
│   └── server/             # Backend Hono API server
├── docs/                   # Project documentation
├── packages/               # Shared packages (future)
├── .kiro/                  # Kiro AI assistant configuration
│   └── steering/          # Development guidelines and conventions
├── .turbo/                 # Turborepo cache and logs
└── node_modules/           # Root dependencies
```

## Frontend Application (`apps/web/`)
```
apps/web/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (LandingPages)/ # Landing page routes
│   │   ├── (SignedIn)/    # Authenticated routes
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Home page
│   │   ├── error.tsx      # Global error boundary
│   │   └── not-found.tsx  # Custom 404 page
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── common/       # Common components (error, loading)
│   │   ├── layout/       # Layout components (header, providers)
│   │   ├── navigation/   # Navigation components (sidebar)
│   │   └── auth/         # Authentication components
│   ├── contexts/         # React contexts (auth, theme)
│   ├── hooks/            # Custom React hooks (useAsync, etc.)
│   ├── lib/              # Utility functions
│   │   ├── utils.ts      # Common utilities (cn function)
│   │   └── api.ts        # API client and error handling
│   └── index.css         # Global styles (TailwindCSS)
├── .next/                # Next.js build output
├── next.config.ts        # Next.js configuration
├── components.json       # shadcn/ui configuration
├── postcss.config.mjs    # PostCSS configuration
├── .env                  # Environment variables
├── .env.example          # Environment template
└── tsconfig.json         # TypeScript config
```

## Backend Application (`apps/server/`)
```
apps/server/
├── src/
│   ├── index.ts           # Server entry point (Hono app)
│   ├── routers/           # API route handlers (future)
│   └── lib/               # Utility functions (future)
├── prisma/
│   ├── schema/
│   │   └── schema.prisma  # Database schema
│   ├── generated/         # Generated Prisma client
│   └── index.ts           # Prisma client export
├── dist/                  # Build output
├── .env                   # Environment variables
├── .env.example           # Environment template
└── tsconfig.json          # TypeScript config
```

## Documentation (`docs/`)
```
docs/
├── README.md                           # Documentation overview
├── ERROR_HANDLING_IMPLEMENTATION.md   # Error handling implementation guide
└── ERROR_HANDLING_REVIEW_2024.md     # Best practices review
```

## Configuration Files (Root)
- `package.json`: Workspace configuration and scripts
- `turbo.json`: Turborepo task definitions
- `biome.json`: Code formatting and linting rules (no semicolons)
- `tsconfig.json`: Root TypeScript configuration
- `bunfig.toml`: Bun runtime configuration

## Path Aliases
- **Frontend**: `@/*` maps to `./src/*`
- **Backend**: `@/*` maps to `./src/*`

## Naming Conventions
- **Files**: kebab-case for components and pages
- **Components**: PascalCase for React components
- **Directories**: lowercase with hyphens
- **API Routes**: RESTful naming in routers/

## Import Organization
1. External libraries (React, Next.js, etc.)
2. Internal utilities and components
3. Relative imports
4. Type-only imports last

## Component Structure
- Use functional components with hooks
- Co-locate related files (component + styles + tests)
- Export components as default from index files
- Use TypeScript interfaces for props