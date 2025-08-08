'use client'

import { TestTanStackForm } from '@/components/test-tanstack-form'
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
import { useMultiStepTanStackForm } from '@/hooks/use-multi-step-tanstack-form'

const steps = [
  { id: 'step1', title: 'Personal Info', description: 'Basic information' },
  { id: 'step2', title: 'Business', description: 'Business details' },
  { id: 'step3', title: 'Review', description: 'Final review' },
]

export default function FormTestPage() {
  const {
    form,
    currentStep,
    navigationState,
    progressPercentage,
    isSubmitting,
    goToNextStep,
    goToPreviousStep,
  } = useMultiStepTanStackForm((data) => {
    console.log('Form submitted:', data)
    alert('Form submitted successfully! Check console for data.')
  })

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Personal Information</h3>
            <form.Field name="organizationName">
              {(field) => (
                <FormField
                  error={field.state.meta.errors?.[0] || ''}
                  id="organizationName"
                  label="Organization Name"
                  onChange={(value) => field.handleChange(value)}
                  placeholder="Enter organization name"
                  required
                  value={String(field.state.value || '')}
                />
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <FormField
                  error={field.state.meta.errors?.[0] || ''}
                  id="email"
                  label="Email"
                  onChange={(value) => field.handleChange(value)}
                  placeholder="Enter email address"
                  required
                  type="email"
                  value={String(field.state.value || '')}
                />
              )}
            </form.Field>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Business Information</h3>
            <form.Field name="businessModel">
              {(field) => (
                <FormField
                  error={field.state.meta.errors?.[0] || ''}
                  id="businessModel"
                  label="Business Model"
                  onChange={(value) => field.handleChange(value)}
                  placeholder="Describe your business model"
                  required
                  type="textarea"
                  value={String(field.state.value || '')}
                />
              )}
            </form.Field>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Review & Submit</h3>
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium">Form Data Preview:</h4>
              <pre className="mt-2 text-sm">
                {JSON.stringify(form.state.values, null, 2)}
              </pre>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-6">
      <div className="text-center">
        <h1 className="font-bold text-3xl">TanStack Form Test Page</h1>
        <p className="mt-2 text-muted-foreground">
          Testing our new multi-step form components
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Multi-Step Form Test */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-Step Form</CardTitle>
            <CardDescription>
              Testing our new TanStack Form with multi-step navigation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressIndicator
              currentStep={currentStep}
              showPercentage
              showStepCount
              totalSteps={3}
            />

            <StepIndicator currentStep={currentStep} showTitles steps={steps} />

            <div className="min-h-[200px]">{renderStepContent()}</div>

            <NavigationControls
              backLabel="Previous"
              canGoBack={navigationState.canGoPrevious}
              canGoNext={navigationState.canGoNext}
              isFirstStep={navigationState.isFirstStep}
              isLastStep={navigationState.isLastStep}
              isSubmitting={isSubmitting}
              nextLabel="Next Step"
              onBack={goToPreviousStep}
              onNext={goToNextStep}
              onSubmit={() => form.handleSubmit()}
              submitLabel="Submit Form"
            />
          </CardContent>
        </Card>

        {/* Simple Form Test */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Form</CardTitle>
            <CardDescription>
              Basic TanStack Form implementation test
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TestTanStackForm />
          </CardContent>
        </Card>
      </div>

      {/* Component Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Component Showcase</CardTitle>
          <CardDescription>Individual component testing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-4 font-medium">Form Field Examples</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                id="test-input"
                label="Test Input"
                onChange={(value) => console.log('Input changed:', value)}
                placeholder="Type something..."
              />
              <FormField
                error="This is an error message"
                id="test-email"
                label="Test Email"
                onChange={(value) => console.log('Email changed:', value)}
                placeholder="email@example.com"
                type="email"
              />
              <FormField
                id="test-textarea"
                label="Test Textarea"
                onChange={(value) => console.log('Textarea changed:', value)}
                placeholder="Enter multiple lines..."
                type="textarea"
              />
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Progress Indicators</h4>
            <div className="space-y-4">
              <ProgressIndicator currentStep={1} totalSteps={3} />
              <ProgressIndicator
                currentStep={2}
                showPercentage={false}
                totalSteps={3}
              />
              <ProgressIndicator
                currentStep={3}
                showStepCount={false}
                totalSteps={3}
              />
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Navigation Controls</h4>
            <div className="space-y-4">
              <NavigationControls
                canGoBack={false}
                canGoNext={true}
                isFirstStep={true}
                isLastStep={false}
                onNext={() => console.log('Next clicked')}
              />
              <NavigationControls
                canGoBack={true}
                canGoNext={true}
                isFirstStep={false}
                isLastStep={false}
                onBack={() => console.log('Back clicked')}
                onNext={() => console.log('Next clicked')}
              />
              <NavigationControls
                canGoBack={true}
                canGoNext={false}
                isFirstStep={false}
                isLastStep={true}
                onBack={() => console.log('Back clicked')}
                onSubmit={() => console.log('Submit clicked')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
