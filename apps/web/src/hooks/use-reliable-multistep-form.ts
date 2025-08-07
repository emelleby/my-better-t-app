import { useForm } from '@tanstack/react-form'
import { useCallback, useState } from 'react'
import { type FormData, FormStep, type FormStepType } from '@/types/form'

const TOTAL_STEPS = 3

// Simple, reliable default values
const getInitialFormData = (): Partial<FormData> => ({
  // Step 1: Organization Information
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

  // Step 2: Business Model & Subsidiaries
  businessModel: '',
  hasSubsidiaries: null,
  subsidiaries: [],

  // Step 3: Sustainability Initiatives
  initiatives: {
    WorkforceDevelopment: { isActive: false },
    Biodiversity: { isActive: false },
    ClimateAction: { isActive: false },
    WasteReduction: { isActive: false },
    EnergyEfficiency: { isActive: false },
    WaterConservation: { isActive: false },
    CommunityEngagement: { isActive: false },
    SupplyChainSustainability: { isActive: false },
  },
})

export function useReliableMultiStepForm(
  onSubmit?: (data: Partial<FormData>) => void | Promise<void>
) {
  const [currentStep, setCurrentStep] = useState<FormStepType>(
    FormStep.ORGANIZATION_INFO
  )

  const form = useForm({
    defaultValues: getInitialFormData(),
    onSubmit: async ({ value }) => {
      if (onSubmit) {
        await onSubmit(value)
      }
    },
  })

  // Navigation functions
  const goToNextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((currentStep + 1) as FormStepType)
      return true
    }
    return false
  }, [currentStep])

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as FormStepType)
      return true
    }
    return false
  }, [currentStep])

  // Navigation state
  const navigationState = {
    canGoNext: currentStep < TOTAL_STEPS,
    canGoPrevious: currentStep > 1,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === TOTAL_STEPS,
  }

  // Calculate progress
  const progressPercentage = Math.round((currentStep / TOTAL_STEPS) * 100)

  return {
    form,
    currentStep,
    navigationState,
    progressPercentage,
    isSubmitting: form.state.isSubmitting,
    goToNextStep,
    goToPreviousStep,
  }
}
