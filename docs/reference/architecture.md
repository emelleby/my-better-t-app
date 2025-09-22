# Architecture Context for AI Agents

**📚 AI AGENT REFERENCE - Concise architectural context for efficient AI assistance**

_This document provides essential architectural context optimized for AI agents. For detailed implementation guidance, refer to `docs/architecture-breakdown/` folder._

**Last Updated:** September 22, 2025
**Status:** ✅ Aligned with Current Implementation

## 🏗️ **Current Implementation Status**

### **Project Reality Check**
- **Status**: ✅ Solid foundation with UI framework and development infrastructure
- **What Works**: Layout system, navigation, theming, mock auth, form components
- **What's Missing**: Database connection, real authentication, business logic, VSME modules
- **Development Stage**: Ready for feature implementation

### **Technology Stack (Actual Versions)**
- **Monorepo**: Turborepo with apps/web and apps/server
- **Frontend**: Next.js 15.3.0 + React 19.1.1 + TailwindCSS 4.1.11
- **Backend**: Hono 4.8.10 + Prisma 6.13.0 (MongoDB provider)
- **Database**: Schema defined, connection not established
- **Forms**: React Hook Form 7.62.0 + Zod 4.1.3 (working)
- **UI**: shadcn/ui components + Lucide icons (extensive implementation)

## 🎯 **Target Architecture (VSME Guru Vision)**

### **Planned Implementation**
- **Platform**: Netlify serverless (currently local Bun development)
- **Authentication**: Clerk JWT (currently mock system)
- **Database**: Dual MongoDB Atlas (Scope321 + VSME Guru) - currently single schema
- **API**: RESTful endpoints with business logic (currently health check only)
- **Features**: VSME sustainability reporting modules (not implemented)

### **Key Implementation Gaps**
- **Database Connection**: Schema exists, no active connection
- **Real Authentication**: Mock system works, Clerk integration needed
- **Business Logic**: API structure ready, endpoints need implementation
- **VSME Modules**: UI foundation ready, sustainability logic needed
- **Deployment**: Local development only, Netlify configuration needed

## 🏢 **Project Structure (Current Reality)**

### **What Actually Exists**
```
vsme-app/
├── apps/
│   ├── web/                    # ✅ Next.js 15.3.0 frontend
│   │   ├── src/app/           # ✅ App Router with (LandingPages) and (SignedIn)
│   │   ├── src/components/    # ✅ Complete UI system (layout, navigation, forms)
│   │   ├── src/contexts/      # ✅ Mock auth + theme contexts
│   │   └── src/hooks/         # ✅ Custom hooks (auth, async, forms)
│   └── server/                 # ✅ Hono 4.8.10 backend
│       ├── src/app.ts         # ✅ CORS, logging, health check
│       ├── src/routes/        # ✅ Basic routing structure
│       └── prisma/            # ✅ ESG schema (User, Company, Report)
├── docs/                      # ✅ Comprehensive documentation
│   ├── architecture-breakdown/ # ✅ Detailed architecture guidance
│   ├── reference/             # ✅ Current state documentation
│   └── epics/                 # ✅ Feature specifications
└── package.json               # ✅ Turborepo + Bun configuration
```

## 🚀 **Development Commands (Working)**

### **Available Commands**
```bash
# Development (all working)
bun dev          # Starts both apps (web:3001, server:3000)
bun dev:web      # Frontend only
bun dev:server   # Backend only
bun check        # Biome formatting/linting

# Database (needs setup)
bun db:push      # Requires DATABASE_URL
bun db:studio    # Requires DATABASE_URL
bun db:generate  # Works (generates from schema)

# Testing (configured)
bun test         # Vitest setup ready
bun test:run     # Run tests once
```

## 🎯 **Development Roadmap & Migration Path**

### **Phase 1: Foundation Connectivity (Weeks 1-2)**
1. **Database Connection**: MongoDB Atlas setup and first CRUD operations
2. **Clerk Authentication**: Replace mock auth with production JWT authentication
3. **API Development**: First business logic endpoints with validation
4. **Environment Setup**: Production-ready configuration management

### **Phase 2: Dual Database Architecture (Weeks 3-5)**
1. **Scope321 Integration**: Connect to existing company database
2. **VSME Database**: Create dedicated sustainability reporting database
3. **Data Migration**: Implement dual database strategy with proper linking
4. **API Expansion**: Company management and basic reporting endpoints

### **Phase 3: VSME Module Implementation (Weeks 6-10)**
1. **Sustainability Modules**: B1, B2, C1 modules with business logic
2. **Advanced Forms**: Multi-step VSME data entry with complex validation
3. **Report Generation**: PDF export and sustainability analytics
4. **Dashboard System**: Comprehensive sustainability metrics visualization

### **Phase 4: Production Deployment (Weeks 11-12)**
1. **Netlify Migration**: Serverless deployment with global CDN
2. **Performance Optimization**: Caching, monitoring, and scaling
3. **Security Hardening**: Production security and compliance measures
4. **Testing & QA**: Comprehensive testing and quality assurance

## 📚 **Key Documentation References**

### **For Detailed Implementation**
- **`docs/architecture-breakdown/`**: Complete architectural guidance (14 focused documents)
- **`docs/architecture-breakdown/MIGRATION-ROADMAP.md`**: Detailed migration path from current to target
- **`docs/reference/current-state.md`**: Accurate audit of what exists vs. planned
- **`docs/reference/tech-stack.md`**: Technology versions and command reference
- **`docs/reference/coding-standards.md`**: Code quality and style guidelines

### **For Feature Development**
- **`docs/epics/`**: Feature specifications and user stories
- **`docs/reference/development-workflow.md`**: Development process and patterns
- **`docs/reference/testing-quick-start-guide.md`**: Testing setup and patterns

### **For Current State Validation**
- **`apps/web/src/components/`**: Actual implemented UI components
- **`apps/server/prisma/schema/schema.prisma`**: Current database models
- **`package.json` files**: Actual dependency versions and scripts

## ⚠️ **Critical Implementation Gaps**

### **Database Layer**
- **Current**: ESG schema defined (User, Company, Report), no connection
- **Needed**: MongoDB Atlas setup, environment variables, first connection test
- **Priority**: High - required for any data operations

### **Authentication Layer**
- **Current**: Mock system with React context (fully functional for UI development)
- **Needed**: Clerk integration, JWT handling, organization support
- **Priority**: Medium - mock system sufficient for continued development

### **API Layer**
- **Current**: Health check endpoint only, Hono framework ready
- **Needed**: Business logic endpoints, data validation, error handling
- **Priority**: High - required for frontend-backend integration

## 🎯 **AI Agent Quick Reference**

### **When Working on Features**
1. **Check Current State**: Always reference `docs/reference/current-state.md` first
2. **Understand Architecture**: Use `docs/architecture-breakdown/` for detailed guidance
3. **Validate Against Code**: Cross-reference claims with actual implementation
4. **Follow Patterns**: Use existing component and code patterns as templates

### **Common Development Tasks**
- **Adding Components**: Follow existing patterns in `apps/web/src/components/`
- **Database Work**: Start with connection setup, then expand schema
- **API Development**: Build on existing Hono structure in `apps/server/src/`
- **Form Implementation**: Use multi-step form pattern already established

### **Key Files to Reference**
- **`apps/server/prisma/schema/schema.prisma`**: Current database models
- **`apps/web/src/components/common/multi-step-form.tsx`**: Form pattern template
- **`apps/web/src/contexts/mock-auth-context.tsx`**: Authentication pattern
- **`docs/reference/coding-standards.md`**: Code quality guidelines

---

**🚀 This document provides essential architectural context for AI agents. For detailed implementation guidance, always refer to the comprehensive documentation in `docs/architecture-breakdown/` folder.**
