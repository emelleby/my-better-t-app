import { z } from 'zod'
import type { InitiativeType } from '@/types/form'

// Step 1: Organization Information validation schema
export const organizationInfoSchema = z.object({
  organizationName: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters'),
  organizationNumber: z
    .string()
    .min(1, 'Organization number is required')
    .max(50, 'Organization number must be less than 50 characters'),
  registrationNumber: z
    .string()
    .min(1, 'Registration number is required')
    .max(50, 'Registration number must be less than 50 characters'),
  naceCode: z
    .string()
    .min(1, 'NACE code is required')
    .max(20, 'NACE code must be less than 20 characters')
    .regex(/^[0-9\.]+$/, 'NACE code must contain only numbers and dots'),
  industry: z
    .string()
    .min(2, 'Industry must be at least 2 characters')
    .max(100, 'Industry must be less than 100 characters'),
  revenue: z
    .number({
      required_error: 'Revenue is required',
      invalid_type_error: 'Revenue must be a valid number',
    })
    .min(0, 'Revenue must be a positive number')
    .max(1000000000000, 'Revenue value is too large'),
  numberOfEmployees: z
    .number({
      required_error: 'Number of employees is required',
      invalid_type_error: 'Number of employees must be a valid number',
    })
    .int('Number of employees must be a whole number')
    .min(1, 'Number of employees must be at least 1')
    .max(1000000, 'Number of employees value is too large'),
  contactPerson: z
    .string()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(100, 'Contact person name must be less than 100 characters'),
  email: z
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phoneNumber: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[+]?[0-9\s\-()]+$/, 'Please enter a valid phone number format'),
})

// Subsidiary validation schema
export const subsidiarySchema = z.object({
  id: z.string().min(1, 'Subsidiary ID is required'),
  name: z
    .string()
    .min(1, 'Subsidiary name is required')
    .max(100, 'Subsidiary name must be less than 100 characters'),
  orgNumber: z
    .string()
    .min(1, 'Organization number is required')
    .max(50, 'Organization number must be less than 50 characters'),
  address: z
    .string()
    .min(5, 'Please provide a complete address')
    .max(200, 'Address must be less than 200 characters'),
})

// Step 2: Business Model and Subsidiaries validation schema
export const businessModelSchema = z
  .object({
    businessModel: z
      .string()
      .min(10, 'Please provide a detailed business model description')
      .max(
        1000,
        'Business model description must be less than 1000 characters'
      ),
    hasSubsidiaries: z
      .enum(['yes', 'no'])
      .nullable()
      .refine((value) => value !== null, {
        message: 'Please select whether your organization has subsidiaries',
      }),
    subsidiaries: z.array(subsidiarySchema).optional(),
  })
  .refine(
    (data) => {
      // If hasSubsidiaries is 'yes', subsidiaries array must have at least one item
      if (data.hasSubsidiaries === 'yes') {
        return data.subsidiaries && data.subsidiaries.length > 0
      }
      return true
    },
    {
      message: 'Please add at least one subsidiary or select "No"',
      path: ['subsidiaries'],
    }
  )

// Initiative validation schema
export const initiativeSchema = z
  .object({
    isActive: z.boolean(),
    description: z
      .string()
      .min(1, 'Description is required for active initiatives')
      .max(500, 'Description must be less than 500 characters')
      .optional(),
    goal: z
      .string()
      .min(1, 'Goal is required for active initiatives')
      .max(500, 'Goal must be less than 500 characters')
      .optional(),
    responsiblePerson: z
      .string()
      .min(1, 'Responsible person is required for active initiatives')
      .max(100, 'Responsible person name must be less than 100 characters')
      .optional(),
  })
  .refine(
    (initiative) => {
      // If initiative is active, all optional fields become required
      if (initiative.isActive) {
        return (
          initiative.description &&
          initiative.goal &&
          initiative.responsiblePerson
        )
      }
      return true
    },
    {
      message: 'Please complete all fields for active initiatives',
    }
  )

// Step 3: Sustainability Initiatives validation schema
export const sustainabilityInitiativesSchema = z.object({
  initiatives: z.record(z.string(), initiativeSchema).refine(
    (initiatives) => {
      // Validate that all active initiatives have complete data
      return Object.entries(initiatives).every(([, initiative]) => {
        if (initiative.isActive) {
          return (
            initiative.description &&
            initiative.goal &&
            initiative.responsiblePerson
          )
        }
        return true
      })
    },
    {
      message: 'Please complete all fields for active initiatives',
    }
  ),
})

// Complete form validation schema
export const completeFormSchema = z.object({
  // Step 1 fields
  ...organizationInfoSchema.shape,
  // Step 2 fields
  ...businessModelSchema.shape,
  // Step 3 fields
  ...sustainabilityInitiativesSchema.shape,
})

// Type inference from schemas
export type OrganizationInfoData = z.infer<typeof organizationInfoSchema>
export type SubsidiaryData = z.infer<typeof subsidiarySchema>
export type BusinessModelData = z.infer<typeof businessModelSchema>
export type InitiativeData = z.infer<typeof initiativeSchema>
export type SustainabilityInitiativesData = z.infer<
  typeof sustainabilityInitiativesSchema
>
export type CompleteFormData = z.infer<typeof completeFormSchema>

// Step validation mapping
export const stepValidationSchemas = {
  1: organizationInfoSchema,
  2: businessModelSchema,
  3: sustainabilityInitiativesSchema,
} as const

// Helper function to validate a specific step
export function validateStep(stepNumber: number, data: unknown) {
  const schema =
    stepValidationSchemas[stepNumber as keyof typeof stepValidationSchemas]
  if (!schema) {
    throw new Error(`No validation schema found for step ${stepNumber}`)
  }
  return schema.safeParse(data)
}

// Helper function to get default form data
export function getDefaultFormData(): Partial<CompleteFormData> {
  const initiativeTypes: InitiativeType[] = [
    'WorkforceDevelopment',
    'Biodiversity',
    'ClimateAction',
    'WasteReduction',
    'EnergyEfficiency',
    'WaterConservation',
    'CommunityEngagement',
    'SupplyChainSustainability',
  ]

  const defaultInitiatives = initiativeTypes.reduce(
    (acc, type) => {
      acc[type] = { isActive: false }
      return acc
    },
    {} as Record<InitiativeType, InitiativeData>
  )

  return {
    // Step 1 defaults
    organizationName: '',
    organizationNumber: '',
    registrationNumber: '',
    naceCode: '',
    industry: '',
    revenue: 0,
    numberOfEmployees: 1,
    contactPerson: '',
    email: '',
    phoneNumber: '',

    // Step 2 defaults
    businessModel: '',
    hasSubsidiaries: null,
    subsidiaries: [],

    // Step 3 defaults
    initiatives: defaultInitiatives,
  }
}
