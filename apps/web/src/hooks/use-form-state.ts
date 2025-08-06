import { useCallback, useState } from 'react'
import {
  clearFormData,
  createDebouncedSave,
  loadFormData,
  saveFormData,
} from '@/lib/form-utils'
import { getDefaultFormData, validateStep } from '@/lib/form-validation'
import {
  type FormData,
  type FormState,
  FormStep,
  type FormStepType,
  type NavigationState,
} from '@/types/form'

const TOTAL_STEPS = 3

export function useFormState() {
  const [formState, setFormState] = useState<FormState>(() => {
    // Try to load persisted data on initialization
    const persistedData = loadFormData()
    const defaultData = getDefaultFormData()

    return {
      currentStep: (persistedData?.currentStep as FormStepType) || FormStep.ORGANIZATION_INFO,
      data: persistedData?.formData || defaultData,
      errors: {},
      isSubmitting: false,
      isDirty: false,
    }
  })

  // Create debounced save function
  const debouncedSave = useCallback(createDebouncedSave(1000), [])

  // Update form data
  const updateFormData = useCallback(
    (updates: Partial<FormData>) => {
      setFormState((prev) => {
        const newData = { ...prev.data, ...updates }
        const newState = {
          ...prev,
          data: newData,
          isDirty: true,
        }

        // Auto-save to localStorage
        debouncedSave(newData, prev.currentStep)

        return newState
      })
    },
    [debouncedSave]
  )

  // Update specific field
  const updateField = useCallback(
    (fieldName: keyof FormData, value: unknown) => {
      updateFormData({ [fieldName]: value })
    },
    [updateFormData]
  )

  // Validate current step
  const validateCurrentStep = useCallback(() => {
    const result = validateStep(formState.currentStep, formState.data)

    if (result.success) {
      setFormState((prev) => ({ ...prev, errors: {} }))
      return { isValid: true, errors: {} }
    }
    const errors = result.error.issues.reduce(
      (acc: Record<string, string>, error) => {
        const path = error.path.join('.')
        acc[path] = error.message
        return acc
      },
      {} as Record<string, string>
    )

    setFormState((prev) => ({ ...prev, errors }))
    return { isValid: false, errors }
  }, [formState.currentStep, formState.data])

  // Navigation functions
  const goToStep = useCallback((step: FormStepType) => {
    setFormState((prev) => {
      const newState = { ...prev, currentStep: step }
      saveFormData(prev.data, step)
      return newState
    })
  }, [])

  const goToNextStep = useCallback(() => {
    const validation = validateCurrentStep()
    if (validation.isValid && formState.currentStep < TOTAL_STEPS) {
      goToStep((formState.currentStep + 1) as FormStepType)
      return true
    }
    return false
  }, [formState.currentStep, validateCurrentStep, goToStep])

  const goToPreviousStep = useCallback(() => {
    if (formState.currentStep > 1) {
      goToStep((formState.currentStep - 1) as FormStepType)
      return true
    }
    return false
  }, [formState.currentStep, goToStep])

  // Navigation state
  const navigationState: NavigationState = {
    canGoNext: formState.currentStep < TOTAL_STEPS,
    canGoPrevious: formState.currentStep > 1,
    isFirstStep: formState.currentStep === 1,
    isLastStep: formState.currentStep === TOTAL_STEPS,
  }

  // Reset form
  const resetForm = useCallback(() => {
    clearFormData()
    setFormState({
      currentStep: FormStep.ORGANIZATION_INFO,
      data: getDefaultFormData(),
      errors: {},
      isSubmitting: false,
      isDirty: false,
    })
  }, [])

  // Submit form
  const submitForm = useCallback(async () => {
    // Validate all steps
    const step1Validation = validateStep(1, formState.data)
    const step2Validation = validateStep(2, formState.data)
    const step3Validation = validateStep(3, formState.data)

    if (
      !(
        step1Validation.success &&
        step2Validation.success &&
        step3Validation.success
      )
    ) {
      // Collect all errors
      const allErrors: Record<string, string> = {}

      for (const validation of [
        step1Validation,
        step2Validation,
        step3Validation,
      ]) {
        if (!validation.success) {
          for (const error of validation.error.issues) {
            const path = error.path.join('.')
            allErrors[path] = error.message
          }
        }
      }

      setFormState((prev) => ({ ...prev, errors: allErrors }))
      return {
        success: false,
        error: 'Please fix validation errors before submitting',
      }
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true }))

    try {
      // Here you would typically send the data to your API
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Clear persisted data on successful submission
      clearFormData()

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isDirty: false,
      }))

      return { success: true, data: formState.data as FormData }
    } catch (error) {
      setFormState((prev) => ({ ...prev, isSubmitting: false }))
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      }
    }
  }, [formState.data])

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (formState.currentStep / TOTAL_STEPS) * 100
  )

  return {
    // State
    formState,
    navigationState,
    progressPercentage,

    // Actions
    updateFormData,
    updateField,
    validateCurrentStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    resetForm,
    submitForm,
  }
}
