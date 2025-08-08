'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import {
  getDefaultFormData,
  stepValidationSchemas,
  type CompleteFormData,
  type OrganizationInfoData,
} from '@/lib/form-validation'
import { FormStep, type FormStepType, type FormData } from '@/types/form'
import {
  saveFormData,
  loadFormData,
  clearFormData,
  markFormAsSubmitted,
  FORM_STORAGE_KEY,
} from '@/lib/form-utils'

// Import step components
import { OrganizationInfoStep } from './form-steps/organization-info-step'
import { BusinessModelStep } from './form-steps/business-model-step'
import { SustainabilityInitiativesStep } from './form-steps/sustainability-initiatives-step'

interface EnhancedMultiStepFormProps {
  className?: string
  onSubmit?: (data: FormData) => void | Promise<void>
  initialData?: Partial<FormData>
}

const STEPS = [
  {
    id: FormStep.ORGANIZATION_INFO,
    title: 'Organization Information',
    description: 'Tell us about your organization',
  },
  {
    id: FormStep.BUSINESS_MODEL,
    title: 'Business Model & Subsidiaries',
    description: 'Describe your business and subsidiaries',
  },
  {
    id: FormStep.SUSTAINABILITY_INITIATIVES,
    title: 'Sustainability Initiatives',
    description: 'Select your sustainability programs',
  },
] as const

export function EnhancedMultiStepForm({
  className,
  onSubmit,
  initialData,
}: EnhancedMultiStepFormProps) {
  const [validationError, setValidationError] = useState<string | null>(null)

  // Get current form data from localStorage
  const getStoredData = () => {
    const stored = loadFormData()
    return stored ? stored.formData as FormData : { ...getDefaultFormData(), ...initialData } as FormData
  }

  // Get current step from localStorage
  const getCurrentStep = () => {
    const stored = loadFormData()
    return stored ? stored.currentStep as FormStepType : FormStep.ORGANIZATION_INFO
  }

  // Check if form was submitted
  const isFormSubmitted = () => {
    const stored = loadFormData()
    return stored ? stored.submitted === true : false
  }

  // Initialize form with localStorage data
  const [currentStep, setCurrentStep] = useState<FormStepType>(getCurrentStep())
  const [isComplete, setIsComplete] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(isFormSubmitted())

  // Initialize form with TanStack Form
  const form = useForm<FormData>({
    defaultValues: getStoredData(),
    onSubmit: async ({ value }: { value: FormData }) => {
      try {
        // Save final data to localStorage before submitting
        saveFormData(value, currentStep)
        markFormAsSubmitted()
        
        if (onSubmit) {
          await onSubmit(value)
        }
        setIsComplete(true)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    },
  })

  // Save to localStorage whenever form data changes
  useEffect(() => {
    const subscription = form.store.subscribe(() => {
      const formState = form.state.values
      // Immediate save on every change - localStorage is our source of truth
      saveFormData(formState, currentStep)
    })

    return () => subscription()
  }, [form, currentStep])

  // Save step changes to localStorage
  useEffect(() => {
    const formData = form.state.values
    saveFormData(formData, currentStep)
  }, [currentStep, form.state.values])

  // Pure validation function without side effects
  const validateCurrentStepPure = async () => {
    const currentStepSchema =
      stepValidationSchemas[currentStep as keyof typeof stepValidationSchemas]
    if (!currentStepSchema) {
      return { success: true }
    }

    try {
      const formData = form.state.values
      const result = await currentStepSchema.safeParseAsync(formData)
      return result
    } catch (error) {
      console.error('Validation error:', error)
      return {
        success: false,
        error: { issues: [{ message: 'Validation error occurred' }] },
      }
    }
  }

  // Validate current step and update localStorage completion flags
  const validateCurrentStep = async () => {
    const result = await validateCurrentStepPure()
    
    // If validation passes, mark step as complete in form data and localStorage
    if (result.success) {
      const stepMapping: Record<number, keyof FormData['completion']> = {
        1: 'orgInfo',
        2: 'businessModel', 
        3: 'initiatives'
      }
      const stepKey = stepMapping[currentStep]
      if (stepKey) {
        const formData = form.state.values
        const updatedData = {
          ...formData,
          completion: {
            ...formData.completion,
            [stepKey]: true
          }
        }
        form.setFieldValue(`completion.${stepKey}`, true)
        saveFormData(updatedData, currentStep)
      }
    }
    
    return result
  }

  // No real-time validation - only validate on button press
  // This is simpler and more reliable

  // Auto-save form data as user types (debounced)
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (form.state.values && Object.keys(form.state.values).length > 0) {
        console.log('💾 Auto-saving form data...')
        saveFormData(form.state.values, currentStep)
      }
    }, 1000) // Save after 1 second of inactivity

    return () => clearTimeout(saveTimeout)
  }, [form.state.values, currentStep])

  // Navigation state
  const canGoNext = currentStep < STEPS.length
  const canGoPrevious = currentStep > 1
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === STEPS.length

  // Get current step data
  const currentStepData = STEPS[currentStep - 1]

  // Get completion flags from form data (which comes from localStorage)
  const completion = form.state.values.completion || {
    orgInfo: false,
    businessModel: false,
    initiatives: false,
  }

  // Calculate progress based on completed steps
  const completedStepsCount = Object.values(completion).filter(Boolean).length
  const progressPercentage = Math.round((completedStepsCount / STEPS.length) * 100)

  // Helper function to mark a step as complete in localStorage
  const markStepComplete = (stepId: 'orgInfo' | 'businessModel' | 'initiatives') => {
    const currentData = form.state.values
    const updatedData = {
      ...currentData,
      completion: {
        ...currentData.completion,
        [stepId]: true
      }
    }
    form.setFieldValue(`completion.${stepId}`, true)
    saveFormData(updatedData, currentStep)
  }

  // Handle next step
  const handleNext = async () => {
    if (!canGoNext) {
      return
    }

    // Clear previous validation error
    setValidationError(null)

    const validation = await validateCurrentStep()
    if (validation.success) {
      // Step completion is already handled in validateCurrentStep
      setCurrentStep((currentStep + 1) as FormStepType)
    } else {
      // Show validation error to user
      const errorMessage =
        validation.error?.issues?.[0]?.message ||
        'Please complete all required fields correctly'
      setValidationError(errorMessage)

      // Also scroll to top to ensure user sees the error
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (canGoPrevious) {
      setValidationError(null) // Clear validation error
      setCurrentStep((currentStep - 1) as FormStepType)
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (isLastStep) {
      // Clear previous validation error
      setValidationError(null)

      const validation = await validateCurrentStep()
      if (validation.success) {
        // Mark final step as complete after successful validation
        markStepComplete('initiatives')
        await form.handleSubmit()
      } else {
        // Show validation error to user
        const errorMessage =
          validation.error?.issues?.[0]?.message ||
          'Please complete all required fields correctly'
        setValidationError(errorMessage)

        // Also scroll to top to ensure user sees the error
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      await handleNext()
    }
  }

  // Handle edit - reset submitted status and allow editing
  const handleEdit = () => {
    const savedData = loadFormData()
    if (savedData) {
      const updatedData = {
        ...savedData,
        submitted: false
      }
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(updatedData))
    }
    setIsSubmitted(false)
    setCurrentStep(FormStep.ORGANIZATION_INFO)
  }

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  // Show submitted screen if form was previously submitted
  if (isSubmitted || isComplete) {
    return (
      <div
        className={cn(
          'w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg bg-card',
          className
        )}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-900">
            Form Submitted Successfully!
          </h2>
          <p className="text-muted-foreground">
            Thank you for providing your sustainability information. We'll
            review your submission shortly.
          </p>
          <Button
            onClick={handleEdit}
            variant="outline"
            className="mt-4"
          >
            Edit Form
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg bg-card',
        className
      )}
    >
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-8">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1
          const isCurrentStep = stepNumber === currentStep

          // Use completion flags instead of step comparison
          let isCompleted = false
          if (stepNumber === FormStep.ORGANIZATION_INFO) {
            isCompleted = completion.orgInfo
          } else if (stepNumber === FormStep.BUSINESS_MODEL) {
            isCompleted = completion.businessModel
          } else if (stepNumber === FormStep.SUSTAINABILITY_INITIATIVES) {
            isCompleted = completion.initiatives
          }

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors',
                  isCompleted
                    ? 'bg-primary text-primary-foreground border-primary'
                    : isCurrentStep
                      ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/30'
                      : 'bg-background text-muted-foreground border-border'
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  stepNumber
                )}
              </div>
              <span className="text-xs mt-2 text-center px-1 hidden sm:block">
                {step.title}
              </span>
            </div>
          )
        })}
      </div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={stepVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold">{currentStepData.title}</h2>
            <p className="text-sm text-muted-foreground">
              {currentStepData.description}
            </p>

            {/* No real-time validation indicator */}

            {/* Validation Error Display */}
            {validationError && (
              <div className="mt-4 p-4 border border-destructive/20 bg-destructive/10 rounded-md">
                <p className="text-sm text-destructive font-medium">
                  {validationError}
                </p>
              </div>
            )}
          </div>

          {/* Step Components */}
          {currentStep === FormStep.ORGANIZATION_INFO && (
            <OrganizationInfoStep form={form} />
          )}
          {currentStep === FormStep.BUSINESS_MODEL && (
            <BusinessModelStep form={form} />
          )}
          {currentStep === FormStep.SUSTAINABILITY_INITIATIVES && (
            <SustainabilityInitiativesStep form={form} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep || form.state.isSubmitting}
          className="min-w-[100px]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={form.state.isSubmitting}
          className="min-w-[100px]"
        >
          {form.state.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isLastStep ? 'Submitting...' : 'Validating...'}
            </>
          ) : (
            <>
              {isLastStep ? 'Submit' : 'Next'}
              {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
