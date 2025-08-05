import { MongoClient } from 'mongodb'
import { PrismaClient } from '../../prisma/generated/client'

// Test primary database connection
export async function testPrimaryDatabase() {
  const prisma = new PrismaClient()

  try {
    // Test connection by attempting to count records in all collections
    const [userCount, companyCount, reportCount] = await Promise.all([
      prisma.user.count(),
      prisma.company.count(),
      prisma.report.count(),
    ])

    // eslint-disable-next-line no-console
    console.log('✅ Primary database connected successfully.')
    // eslint-disable-next-line no-console
    console.log(`   - Users: ${userCount}`)
    // eslint-disable-next-line no-console
    console.log(`   - Companies: ${companyCount}`)
    // eslint-disable-next-line no-console
    console.log(`   - Reports: ${reportCount}`)
    return true
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Primary database connection failed:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Test external database connection
export async function testExternalDatabase() {
  const databaseUrl = process.env.SCOPE321_DATABASE_URL
  if (!databaseUrl) {
    // eslint-disable-next-line no-console
    console.error('❌ SCOPE321_DATABASE_URL not configured')
    return false
  }

  const client = new MongoClient(databaseUrl)

  try {
    await client.connect()

    // Test connection by listing databases
    const adminDb = client.db().admin()
    const databases = await adminDb.listDatabases()

    // eslint-disable-next-line no-console
    console.log(
      '✅ External database connected successfully. Available databases:',
      databases.databases.map((db) => db.name)
    )
    return true
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ External database connection failed:', error)
    return false
  } finally {
    await client.close()
  }
}

// Test both database connections
export async function testAllDatabases() {
  // eslint-disable-next-line no-console
  console.log('🔍 Testing database connections...')

  const primaryResult = await testPrimaryDatabase()
  const externalResult = await testExternalDatabase()

  if (primaryResult && externalResult) {
    // eslint-disable-next-line no-console
    console.log('🎉 All database connections successful!')
    return true
  }
  // eslint-disable-next-line no-console
  console.log('⚠️  Some database connections failed')
  return false
}
