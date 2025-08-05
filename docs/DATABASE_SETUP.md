# Database Setup and Management

This document describes the database architecture, setup procedures, and management commands for the ESG reporting application.

## Overview

The application uses a dual-database architecture:
- **Primary Database**: MongoDB Atlas for application data (Users, Companies, Reports)
- **External Database**: MongoDB Atlas for shared data from other applications

## Database Models

### User Model
Represents authenticated users linked to Clerk authentication:
- `clerkId`: Unique identifier from Clerk authentication system
- `organizationId`: Multi-tenant isolation for data access
- Used by: Authentication middleware, data access control

### Company Model
Represents companies that submit ESG reports:
- Basic company information (name, registration number, industry)
- Financial data (revenue, NACE code, CO2 intensity)
- Used by: ESG reporting forms, company management UI

### Report Model
Represents ESG reports with nested data structures:
- **Environmental**: Energy consumption, emissions (Scope 1/2/3), renewable energy
- **Social**: Employee counts, diversity metrics
- **Governance**: Ethics, compliance, fines and penalties
- Used by: ESG data collection forms, reporting dashboards, analytics

## Environment Configuration

### Required Environment Variables

```bash
# Primary database (application data)
PRIMARY_DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/database

# External database (shared data)
SCOPE321_DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/shared_db

# Clerk authentication
CLERK_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key

# API configuration
CORS_ORIGIN=http://localhost:3001
```

### Database User Permissions

**Primary Database User:**
- Role: `readWrite` on application database
- Purpose: Full CRUD operations for application data
- Used by: All API endpoints, data services

**External Database User:**
- Role: `read` on shared database
- Purpose: Read-only access to shared reference data
- Used by: External data fetching, reference lookups

## Database Management Commands

### Development Commands

```bash
# Generate Prisma client after schema changes
bun db:generate

# Push schema changes to database (development)
bun db:push

# Open Prisma Studio for data browsing
bun db:studio

# Seed development data
bun run db:seed:dev

# Reset database with fresh data
bun run db:reset

# Check database status and health
bun run db:status
```

### Production Commands

```bash
# Run database migrations
bun run db:migrate

# Seed production data (with safety checks)
bun run db:seed:prod

# Validate production database
bun run db:status
```

## Seeding System

### Development Seeding
**Purpose**: Creates realistic test data for UI development and testing
**Used by**: Local development, testing environments
**Contains**:
- 3 users across different organizations
- 5 companies with varied profiles (tech, manufacturing, services)
- 10 ESG reports with different completion levels

**Script**: `bun run db:seed:dev`

### Production Seeding
**Purpose**: Creates minimal required data for production operation
**Used by**: Production deployment, system initialization
**Contains**:
- System constraints validation
- Reference data setup (currently minimal)

**Script**: `bun run db:seed:prod`

## Migration System

### Migration Tracking
- Migrations are tracked in a `migrations` collection
- Each migration records: name, applied date, checksum
- Used by: Deployment scripts to ensure schema consistency

### Migration Files
Located in `src/lib/migrations/`
- `migration-runner.ts`: Core migration execution logic
- Used by: Deployment automation, database updates

## Service Layer Architecture

### Company Service (`src/lib/services/company-service.ts`)
**Purpose**: Handles all company-related database operations
**Used by**: Company API endpoints, business logic
**Methods**:
- `createCompany()`: Create new company with validation
- `getCompaniesByOrganization()`: Multi-tenant company listing
- `updateCompany()`: Update company with access control
- `deleteCompany()`: Safe company deletion

### Report Service (`src/lib/services/report-service.ts`)
**Purpose**: Handles ESG report database operations
**Used by**: Report API endpoints, ESG data processing
**Methods**:
- `createReport()`: Create ESG report with nested data
- `updateESGSection()`: Update specific ESG sections
- `getReportsByCompany()`: Company-specific report history
- `getReportsByYear()`: Year-based report aggregation

## Data Validation

### Zod Schemas (`src/lib/validation/esg-schemas.ts`)
**Purpose**: Runtime validation of ESG data structures
**Used by**: API endpoints, data processing, form validation
**Schemas**:
- `companySchema`: Company data validation
- `reportSchema`: Complete ESG report validation
- `environmentalSchema`: Environmental data validation
- `socialSchema`: Social data validation
- `governanceSchema`: Governance data validation

## Performance Optimization

### Database Indexes
**Purpose**: Optimize common query patterns
**Indexes**:
- `users_clerkId_key`: Unique index for authentication lookups
- `companies_organizationId_year_idx`: Multi-tenant company queries
- `companies_registrationNumber_idx`: Company lookup by registration
- `reports_organizationId_year_idx`: Multi-tenant report queries
- `reports_companyId_year_idx`: Company report history

### Query Patterns
- Organization-based filtering for multi-tenancy
- Year-based aggregation for reporting periods
- Company-report relationships for data integrity

## Troubleshooting

### Common Issues

**Connection Errors**:
- Verify environment variables are set correctly
- Check MongoDB Atlas IP whitelist
- Validate database user permissions

**Migration Issues**:
- Run `bun run db:status` to check migration state
- Use `bun db:push` for development schema updates
- Check migration logs for specific errors

**Seeding Problems**:
- Clean existing data with `bun run db:reset`
- Verify Clerk IDs don't conflict with existing data
- Check organization ID consistency

### Health Checks

Use `bun run db:status` to get comprehensive database health information:
- Connection status for both databases
- Migration state and pending changes
- Data summary and organization breakdown
- Performance validation

## Security Considerations

### Data Access Control
- All queries filtered by `organizationId` for multi-tenancy
- User authentication required for all operations
- Audit trail maintained with `createdBy` fields

### Environment Security
- Database credentials stored in environment variables
- Separate read/write permissions for different databases
- IP restrictions on database access

### Data Privacy
- ESG data isolated by organization
- User data linked to Clerk for authentication
- No sensitive data stored in plain text

## Backup and Recovery

### Development
- Use `bun run db:reset` to restore clean development state
- Seeding scripts provide consistent test data

### Production
- MongoDB Atlas automated backups
- Point-in-time recovery available
- Migration system allows rollback capabilities

## Monitoring

### Database Health
- Connection testing in `database-test.ts`
- Performance validation in status scripts
- Migration tracking for deployment validation

### Data Quality
- Zod validation ensures data integrity
- Service layer provides consistent access patterns
- Audit trails track data changes