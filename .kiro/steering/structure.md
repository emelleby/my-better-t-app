# Project Structure

## Monorepo Organization
This is a Turborepo monorepo with the following structure:

```
my-better-t-app/
├── apps/                    # Application packages
│   ├── web/                # Frontend Next.js application
│   └── server/             # Backend Hono API server
├── packages/               # Shared packages (future)
├── .kiro/                  # Kiro AI assistant configuration
├── .turbo/                 # Turborepo cache and logs
└── node_modules/           # Root dependencies
```

## Frontend Application (`apps/web/`)
```
apps/web/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── header.tsx     # App header
│   │   ├── providers.tsx  # Context providers
│   │   └── theme-provider.tsx
│   ├── lib/               # Utility functions
│   │   └── utils.ts       # Common utilities
│   └── index.css          # Global styles
├── .next/                 # Next.js build output
├── next.config.ts         # Next.js configuration
├── components.json        # shadcn/ui configuration
└── tsconfig.json          # TypeScript config
```

## Backend Application (`apps/server/`)
```
apps/server/
├── src/
│   ├── index.ts           # Server entry point
│   └── routers/           # API route handlers
├── prisma/
│   ├── schema/
│   │   └── schema.prisma  # Database schema
│   ├── generated/         # Generated Prisma client
│   └── index.ts           # Prisma client export
├── dist/                  # Build output
└── tsconfig.json          # TypeScript config
```

## Configuration Files (Root)
- `package.json`: Workspace configuration and scripts
- `turbo.json`: Turborepo task definitions
- `biome.json`: Code formatting and linting rules
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