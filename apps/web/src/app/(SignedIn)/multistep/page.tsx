'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { NavigationControls } from '@/components/ui/navigation-controls'
import { ProgressIndicator } from '@/components/ui/progress-indicator'
import { StepIndicator } from '@/components/ui/step-indicator'
import { useReliableMultiStepForm } from '@/hooks/use-reliable-multistep-form'

const steps = [
  {
    id: 'organization',
    title: 'Organization',
    description: 'Basic organization info',
  },
  { id: 'business', title: 'Business Model', description: 'Business details' },
  {
    id: 'initiatives',
    title: 'Initiatives',
    description: 'Sustainability initiatives',
  },
]

export default function MultiStepPage() {
  const {
    form,
    currentStep,
    navigationState,
    progressPercentage,
    isSubmitting,
    goToNextStep,
    goToPreviousStep,
  } = useReliableMultiStepForm((data) => {
    console.log('✅ Form submitted successfully:', data)
    alert('🎉 Form submitted! Check console for data.')
  })

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">
                Organization Information
              </h3>
              <p className="text-muted-foreground text-sm">
                Tell us about your organization
              </p>
            </div>

            <div className="space-y-4">
              <form.Field name="organizationName">
                {(field) => {
                  console.log(
                    '🔍 organizationName field state:',
                    field.state.value
                  )
                  return (
                    <FormField
                      error={field.state.meta.errors?.[0] as string}
                      id="organizationName"
                      label="Organization Name"
                      onChange={(value) => {
                        console.log('📝 organizationName changing to:', value)
                        field.handleChange(value)
                      }}
                      placeholder="Enter your organization name"
                      required
                      value={field.state.value ?? ''}
                    />
                  )
                }}
              </form.Field>

              <form.Field name="organizationNumber">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0] as string}
                    id="organizationNumber"
                    label="Organization Number"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Enter organization number"
                    required
                    value={field.state.value ?? ''}
                  />
                )}
              </form.Field>

              <form.Field name="contactPerson">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0] as string}
                    id="contactPerson"
                    label="Contact Person"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Enter contact person name"
                    required
                    value={field.state.value || ''}
                  />
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0] as string}
                    id="email"
                    label="Email Address"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="contact@organization.com"
                    required
                    type="email"
                    value={field.state.value || ''}
                  />
                )}
              </form.Field>

              <form.Field name="phoneNumber">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0] as string}
                    id="phoneNumber"
                    label="Phone Number"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="+1 (555) 123-4567"
                    required
                    type="tel"
                    value={field.state.value || ''}
                  />
                )}
              </form.Field>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">
                Business Model & Subsidiaries
              </h3>
              <p className="text-muted-foreground text-sm">
                Describe your business model and structure
              </p>
            </div>

            <div className="space-y-4">
              <form.Field name="businessModel">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0] as string}
                    id="businessModel"
                    label="Business Model Description"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Describe your business model, target market, and key activities..."
                    required
                    type="textarea"
                    value={field.state.value || ''}
                  />
                )}
              </form.Field>

              <div className="space-y-2">
                <label className="font-medium text-sm">
                  Does your organization have subsidiaries?
                </label>
                <div className="flex gap-4">
                  <form.Field name="hasSubsidiaries">
                    {(field) => (
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            checked={field.state.value === 'yes'}
                            className="h-4 w-4"
                            onChange={() => field.handleChange('yes')}
                            type="radio"
                            value="yes"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            checked={field.state.value === 'no'}
                            className="h-4 w-4"
                            onChange={() => field.handleChange('no')}
                            type="radio"
                            value="no"
                          />
                          No
                        </label>
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">Review & Submit</h3>
              <p className="text-muted-foreground text-sm">
                Please review your information before submitting
              </p>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-3 font-medium">Form Data Summary:</h4>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Organization:</span>
                  <span>
                    {form.state.values.organizationName || 'Not provided'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Contact:</span>
                  <span>
                    {form.state.values.contactPerson || 'Not provided'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Email:</span>
                  <span>{form.state.values.email || 'Not provided'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Business Model:</span>
                  <span className="break-words">
                    {form.state.values.businessModel || 'Not provided'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Has Subsidiaries:</span>
                  <span>
                    {form.state.values.hasSubsidiaries || 'Not selected'}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-l-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="text-sm">
                <strong>Ready to submit?</strong> Once you submit this form, the
                data will be processed and you'll receive a confirmation.
              </p>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center text-muted-foreground">Invalid step</div>
        )
    }
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-6 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-bold text-3xl">Multi-Step Form</h1>
        <p className="mt-2 text-muted-foreground">
          Enhanced multi-step form with TanStack Form
        </p>
      </div>

      {/* Main Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Organization Registration</span>
            <span className="font-normal text-muted-foreground text-sm">
              Step {currentStep} of {steps.length}
            </span>
          </CardTitle>
          <CardDescription>
            Complete all steps to register your organization
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            showPercentage
            showStepCount
            totalSteps={steps.length}
          />

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} showTitles steps={steps} />

          {/* Step Content */}
          <div className="min-h-[400px] py-4" key={`step-${currentStep}`}>
            {renderStepContent()}
          </div>

          {/* Navigation Controls */}
          <NavigationControls
            backLabel="Back"
            canGoBack={navigationState.canGoPrevious}
            canGoNext={navigationState.canGoNext}
            isFirstStep={navigationState.isFirstStep}
            isLastStep={navigationState.isLastStep}
            isSubmitting={isSubmitting}
            nextLabel="Continue"
            onBack={goToPreviousStep}
            onNext={goToNextStep}
            onSubmit={() => form.handleSubmit()}
            submitLabel="Submit Registration"
          />
        </CardContent>
      </Card>

      {/* Debug Info (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Debug Info</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs">
              {JSON.stringify(
                {
                  currentStep,
                  navigationState,
                  progressPercentage,
                  isSubmitting,
                  formValues: form.state.values,
                },
                null,
                2
              )}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
