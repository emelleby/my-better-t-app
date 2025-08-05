#!/usr/bin/env bun

/**
 * Production Database Seeding Script
 *
 * This script specifically seeds production data with safety checks.
 * Used by: npm run db:seed:prod command and deployment scripts
 * Purpose: Safely seeds production environment with minimal required data
 */

import {
  checkMigrationStatus,
  runMigrations,
} from '../lib/migrations/migration-runner'
import {
  seedProductionData,
  validateProductionDatabase,
} from '../lib/seeds/production-seed'

async function main() {
  try {
    // eslint-disable-next-line no-console
    console.log('🔍 Validating production environment...')

    // Safety check - ensure we're in production mode
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        '⚠️  Warning: Running production seed in non-production environment'
      )

      // Require explicit confirmation for non-production
      const shouldContinue = process.argv.includes('--force')
      if (!shouldContinue) {
        // eslint-disable-next-line no-console
        console.log(
          'Use --force flag to run production seed in non-production environment'
        )
        process.exit(1)
      }
    }

    // Check migration status
    // eslint-disable-next-line no-console
    console.log('🔄 Checking migration status...')
    const migrationStatus = await checkMigrationStatus()

    if (!migrationStatus.upToDate) {
      // eslint-disable-next-line no-console
      console.log('📋 Running pending migrations...')
      await runMigrations()
    }

    // Validate database state
    await validateProductionDatabase()

    // Seed production data
    // eslint-disable-next-line no-console
    console.log('🏭 Seeding production data...')
    await seedProductionData()

    // Final validation
    await validateProductionDatabase()

    // eslint-disable-next-line no-console
    console.log('🎉 Production database setup completed!')
    process.exit(0)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('💥 Production seeding failed:', error)
    process.exit(1)
  }
}

// Run the script
main()
