// Core form data interfaces
export interface FormData extends Record<string, unknown> {
  // Step 1: Organization Information
  organizationName: string
  organizationNumber: string
  registrationNumber: string
  naceCode: string
  industry: string
  revenue: number
  numberOfEmployees: number
  contactPerson: string
  email: string
  phoneNumber: string

  // Step 2: Business Model & Subsidiaries
  businessModel: string
  hasSubsidiaries: 'yes' | 'no' | null
  subsidiaries: Subsidiary[]

  // Step 3: Sustainability Initiatives
  initiatives: Record<InitiativeType, Initiative>
}

export interface Subsidiary {
  id: string
  name: string
  orgNumber: string
  address: string
}

export interface Initiative {
  isActive: boolean
  description?: string
  goal?: string
  responsiblePerson?: string
}

export type InitiativeType =
  | 'WorkforceDevelopment'
  | 'Biodiversity'
  | 'ClimateAction'
  | 'WasteReduction'
  | 'EnergyEfficiency'
  | 'WaterConservation'
  | 'CommunityEngagement'
  | 'SupplyChainSustainability'

// Form step constants
export const FormStep = {
  ORGANIZATION_INFO: 1,
  BUSINESS_MODEL: 2,
  SUSTAINABILITY_INITIATIVES: 3,
} as const

export type FormStepType = (typeof FormStep)[keyof typeof FormStep]

// Form state management types
export interface FormState {
  currentStep: FormStepType
  data: Partial<FormData>
  errors: Record<string, string>
  isSubmitting: boolean
  isDirty: boolean
}

export interface StepValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

// Form navigation types
export interface NavigationState {
  canGoNext: boolean
  canGoPrevious: boolean
  isFirstStep: boolean
  isLastStep: boolean
}

// Form submission types
export interface FormSubmissionResult {
  success: boolean
  data?: FormData
  error?: string
}

// Initiative categories for UI grouping
export const INITIATIVE_CATEGORIES = {
  environmental: [
    'Biodiversity',
    'ClimateAction',
    'WasteReduction',
    'EnergyEfficiency',
    'WaterConservation',
  ] as InitiativeType[],
  social: [
    'WorkforceDevelopment',
    'CommunityEngagement',
    'SupplyChainSustainability',
  ] as InitiativeType[],
} as const

// Initiative display names
export const INITIATIVE_LABELS: Record<InitiativeType, string> = {
  WorkforceDevelopment: 'Workforce Development',
  Biodiversity: 'Biodiversity Conservation',
  ClimateAction: 'Climate Action',
  WasteReduction: 'Waste Reduction',
  EnergyEfficiency: 'Energy Efficiency',
  WaterConservation: 'Water Conservation',
  CommunityEngagement: 'Community Engagement',
  SupplyChainSustainability: 'Supply Chain Sustainability',
}
