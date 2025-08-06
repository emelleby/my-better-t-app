import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { useCallback, useState } from 'react'
import { getDefaultFormData } from '@/lib/form-validation'
import { type FormData, FormStep, type FormStepType } from '@/types/form'

const TOTAL_STEPS = 3

export function useMultiStepTanStackForm(
  onSubmit?: (data: FormData) => void | Promise<void>
) {
  const [currentStep, setCurrentStep] = useState<FormStepType>(
    FormStep.ORGANIZATION_INFO
  )

  const form = useForm({
    defaultValues: getDefaultFormData() as FormData,
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
