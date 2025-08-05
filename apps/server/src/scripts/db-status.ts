#!/usr/bin/env bun

/**
 * Database Status Script
 *
 * This script reports on the current state of the database.
 * Used by: Development workflow and deployment validation
 * Purpose: Provides visibility into database state and health
 */

import { testAllDatabases } from '../lib/database-test'
import { checkMigrationStatus } from '../lib/migrations/migration-runner'
import { validateProductionDatabase } from '../lib/seeds/production-seed'

async function main() {
  try {
    // eslint-disable-next-line no-console
    console.log('📊 Database Status Report')
    // eslint-disable-next-line no-console
    console.log('========================')

    // Test database connections
    // eslint-disable-next-line no-console
    console.log('\n🔗 Connection Status:')
    const connectionStatus = await testAllDatabases()

    if (!connectionStatus) {
      // eslint-disable-next-line no-console
      console.error('❌ Database connection failed - aborting status check')
      process.exit(1)
    }

    // Check migration status
    // eslint-disable-next-line no-console
    console.log('\n🔄 Migration Status:')
    const migrationStatus = await checkMigrationStatus()
    // eslint-disable-next-line no-console
    console.log(`   Applied: ${migrationStatus.applied}`)
    // eslint-disable-next-line no-console
    console.log(`   Available: ${migrationStatus.available}`)
    // eslint-disable-next-line no-console
    console.log(`   Pending: ${migrationStatus.pending}`)
    // eslint-disable-next-line no-console
    console.log(
      `   Status: ${migrationStatus.upToDate ? '✅ Up to date' : '⚠️  Migrations pending'}`
    )

    // Get data counts
    // eslint-disable-next-line no-console
    console.log('\n📈 Data Summary:')
    await getDataSummary()

    // Validate database health
    // eslint-disable-next-line no-console
    console.log('\n🏥 Health Check:')
    try {
      await validateProductionDatabase()
      // eslint-disable-next-line no-console
      console.log('   Status: ✅ Healthy')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('   Status: ⚠️  Issues detected')
      // eslint-disable-next-line no-console
      console.log(`   Error: ${error}`)
    }

    // Environment info
    // eslint-disable-next-line no-console
    console.log('\n🌍 Environment:')
    // eslint-disable-next-line no-console
    console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`)
    // eslint-disable-next-line no-console
    console.log(
      `   Database: ${process.env.PRIMARY_DATABASE_URL ? 'Configured' : 'Not configured'}`
    )
    // eslint-disable-next-line no-console
    console.log(
      `   External DB: ${process.env.SCOPE321_DATABASE_URL ? 'Configured' : 'Not configured'}`
    )

    // eslint-disable-next-line no-console
    console.log('\n✅ Status report completed')
    process.exit(0)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('💥 Status check failed:', error)
    process.exit(1)
  }
}

/**
 * Get summary of data in the database
 * Used by: main() to report on database contents
 * Purpose: Provides visibility into current data state
 */
async function getDataSummary() {
  const { prisma } = await import('../lib/prisma')

  try {
    const [userCount, companyCount, reportCount] = await Promise.all([
      prisma.user.count(),
      prisma.company.count(),
      prisma.report.count(),
    ])

    // eslint-disable-next-line no-console
    console.log(`   Users: ${userCount}`)
    // eslint-disable-next-line no-console
    console.log(`   Companies: ${companyCount}`)
    // eslint-disable-next-line no-console
    console.log(`   Reports: ${reportCount}`)

    // Get some additional insights
    if (companyCount > 0) {
      const companiesByOrg = await prisma.company.groupBy({
        by: ['organizationId'],
        _count: { id: true },
      })

      // eslint-disable-next-line no-console
      console.log(`   Organizations with companies: ${companiesByOrg.length}`)
    }

    if (reportCount > 0) {
      const reportsByYear = await prisma.report.groupBy({
        by: ['year'],
        _count: { id: true },
        orderBy: { year: 'desc' },
      })

      // eslint-disable-next-line no-console
      console.log('   Reports by year:')
      for (const yearData of reportsByYear) {
        // eslint-disable-next-line no-console
        console.log(`     ${yearData.year}: ${yearData._count.id} reports`)
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('   ❌ Could not retrieve data summary:', error)
  }
}

// Run the script
main()
