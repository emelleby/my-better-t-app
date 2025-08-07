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
import {
  INITIATIVE_CATEGORIES,
  INITIATIVE_LABELS,
  type Initiative,
  type InitiativeType,
  type Subsidiary,
} from '@/types/form'

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

// Reusable Initiative Container Component
function InitiativeContainer({
  type,
  initiative,
  updateInitiative,
}: {
  type: InitiativeType
  initiative: Initiative
  updateInitiative: (
    type: InitiativeType,
    field: keyof Initiative,
    value: Initiative[keyof Initiative]
  ) => void
}) {
  return (
    <div className="space-y-3">
      {/* Checkbox and Title */}
      <div className="flex items-center gap-3">
        <input
          checked={initiative.isActive}
          className="h-4 w-4"
          id={`initiative-${type}`}
          onChange={(e) => updateInitiative(type, 'isActive', e.target.checked)}
          type="checkbox"
        />
        <label
          className="cursor-pointer font-medium text-sm"
          htmlFor={`initiative-${type}`}
        >
          {INITIATIVE_LABELS[type as keyof typeof INITIATIVE_LABELS]}
        </label>
      </div>

      {/* Initiative Details Container */}
      {initiative.isActive && (
        <Card className="gap-0 space-y-4 rounded-lg border bg-accent/30 p-4 md:ml-7">
          <FormField
            id={`${type}-description`}
            label="Description"
            onChange={(value) => updateInitiative(type, 'description', value)}
            placeholder={`Describe your ${INITIATIVE_LABELS[type as keyof typeof INITIATIVE_LABELS].toLowerCase()} activities...`}
            required
            type="textarea"
            value={initiative.description ?? ''}
          />
          <FormField
            id={`${type}-goal`}
            label="Goal/Target"
            onChange={(value) => updateInitiative(type, 'goal', value)}
            placeholder="What's your target or goal?"
            required
            rows={1}
            type="textarea"
            value={initiative.goal ?? ''}
          />
          <FormField
            id={`${type}-responsible`}
            label="Responsible Person"
            onChange={(value) =>
              updateInitiative(type, 'responsiblePerson', value)
            }
            placeholder="Who's responsible for this?"
            required
            value={initiative.responsiblePerson ?? ''}
          />
        </Card>
      )}
    </div>
  )
}

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
    alert('🎉 Form submitted successfully!')
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
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0]}
                    id="organizationName"
                    label="Organization Name"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Enter your organization name"
                    required
                    value={String(field.state.value || '')}
                  />
                )}
              </form.Field>

              <form.Field name="organizationNumber">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0]}
                    id="organizationNumber"
                    label="Organization Number"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Enter organization number"
                    required
                    value={String(field.state.value || '')}
                  />
                )}
              </form.Field>

              <form.Field name="contactPerson">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0]}
                    id="contactPerson"
                    label="Contact Person"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Enter contact person name"
                    required
                    value={String(field.state.value || '')}
                  />
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0]}
                    id="email"
                    label="Email Address"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="contact@organization.com"
                    required
                    type="email"
                    value={String(field.state.value || '')}
                  />
                )}
              </form.Field>

              <form.Field name="phoneNumber">
                {(field) => (
                  <FormField
                    error={field.state.meta.errors?.[0]}
                    id="phoneNumber"
                    label="Phone Number"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="+47 12345678"
                    required
                    type="tel"
                    value={String(field.state.value || '')}
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
                    error={field.state.meta.errors?.[0]}
                    id="businessModel"
                    label="Business Model Description"
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Describe your business model, target market, and key activities..."
                    required
                    type="textarea"
                    value={String(field.state.value || '')}
                  />
                )}
              </form.Field>

              <div className="space-y-4">
                <div className="space-y-2">
                  <fieldset>
                    <legend className="font-medium text-sm">
                      Does your organization have subsidiaries?
                    </legend>
                    <form.Field name="hasSubsidiaries">
                      {(field) => (
                        <div className="mt-2 flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              checked={field.state.value === 'yes'}
                              className="h-4 w-4"
                              name="hasSubsidiaries"
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
                              name="hasSubsidiaries"
                              onChange={() => field.handleChange('no')}
                              type="radio"
                              value="no"
                            />
                            No
                          </label>
                        </div>
                      )}
                    </form.Field>
                  </fieldset>
                </div>

                {/* Conditional Subsidiary Fields */}
                <form.Field name="hasSubsidiaries">
                  {(hasSubsidiariesField) => {
                    if (hasSubsidiariesField.state.value === 'yes') {
                      return (
                        <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">
                              Subsidiary Information
                            </h4>
                            <span className="text-muted-foreground text-xs">
                              Add details for each subsidiary
                            </span>
                          </div>

                          <form.Field name="subsidiaries">
                            {(subsidiariesField) => {
                              const subsidiaries: Subsidiary[] =
                                (subsidiariesField.state
                                  .value as Subsidiary[]) || []

                              const addSubsidiary = () => {
                                const newSubsidiary = {
                                  id: `sub-${Date.now()}`,
                                  name: '',
                                  orgNumber: '',
                                  address: '',
                                }
                                subsidiariesField.handleChange([
                                  ...subsidiaries,
                                  newSubsidiary,
                                ])
                              }

                              const removeSubsidiary = (index: number) => {
                                const updated = subsidiaries.filter(
                                  (_, i) => i !== index
                                )
                                subsidiariesField.handleChange(updated)
                              }

                              const updateSubsidiary = (
                                index: number,
                                field: string,
                                value: string
                              ) => {
                                const updated = subsidiaries.map((sub, i) =>
                                  i === index ? { ...sub, [field]: value } : sub
                                )
                                subsidiariesField.handleChange(updated)
                              }

                              return (
                                <div className="space-y-4">
                                  {subsidiaries.length === 0 ? (
                                    <div className="py-4 text-center">
                                      <p className="mb-3 text-muted-foreground text-sm">
                                        No subsidiaries added yet
                                      </p>
                                      <button
                                        className="rounded-md bg-primary px-3 py-2 text-primary-foreground text-sm hover:bg-primary/90"
                                        onClick={addSubsidiary}
                                        type="button"
                                      >
                                        Add First Subsidiary
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      {subsidiaries.map((subsidiary, index) => (
                                        <div
                                          className="space-y-3 rounded border bg-background p-3"
                                          key={subsidiary.id}
                                        >
                                          <div className="flex items-center justify-between">
                                            <h5 className="font-medium text-sm">
                                              Subsidiary {index + 1}
                                            </h5>
                                            <button
                                              className="text-destructive text-xs hover:underline"
                                              onClick={() =>
                                                removeSubsidiary(index)
                                              }
                                              type="button"
                                            >
                                              Remove
                                            </button>
                                          </div>

                                          <div className="grid gap-3 md:grid-cols-2">
                                            <FormField
                                              id={`subsidiary-name-${index}`}
                                              label="Subsidiary Name"
                                              onChange={(value) =>
                                                updateSubsidiary(
                                                  index,
                                                  'name',
                                                  value
                                                )
                                              }
                                              placeholder="Enter subsidiary name"
                                              required
                                              value={subsidiary.name}
                                            />
                                            <FormField
                                              id={`subsidiary-org-${index}`}
                                              label="Organization Number"
                                              onChange={(value) =>
                                                updateSubsidiary(
                                                  index,
                                                  'orgNumber',
                                                  value
                                                )
                                              }
                                              placeholder="Enter org number"
                                              required
                                              value={subsidiary.orgNumber}
                                            />
                                          </div>

                                          <FormField
                                            id={`subsidiary-address-${index}`}
                                            label="Address"
                                            onChange={(value) =>
                                              updateSubsidiary(
                                                index,
                                                'address',
                                                value
                                              )
                                            }
                                            placeholder="Enter complete address"
                                            required
                                            value={subsidiary.address}
                                          />
                                        </div>
                                      ))}

                                      <div className="text-center">
                                        <button
                                          className="rounded-md border border-primary bg-background px-3 py-2 text-primary text-sm hover:bg-primary/5"
                                          onClick={addSubsidiary}
                                          type="button"
                                        >
                                          Add Another Subsidiary
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )
                            }}
                          </form.Field>
                        </div>
                      )
                    }
                    return null
                  }}
                </form.Field>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            {/* Sustainability Initiatives Section */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg">
                  Sustainability Initiatives
                </h3>
                <p className="text-muted-foreground text-sm">
                  Select the sustainability initiatives your organization is
                  actively pursuing
                </p>
              </div>

              <form.Field name="initiatives">
                {(initiativesField) => {
                  const initiatives: Record<InitiativeType, Initiative> =
                    (initiativesField.state.value as Record<
                      InitiativeType,
                      Initiative
                    >) || ({} as Record<InitiativeType, Initiative>)

                  const updateInitiative = (
                    type: InitiativeType,
                    field: keyof Initiative,
                    value: Initiative[keyof Initiative]
                  ) => {
                    const updated = {
                      ...initiatives,
                      [type]: {
                        ...(initiatives[type] || {}),
                        [field]: value,
                      },
                    }
                    initiativesField.handleChange(updated)
                  }

                  return (
                    <div className="space-y-6">
                      {/* Environmental Initiatives */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-base text-green-700 dark:text-green-400">
                          🌱 Environmental Initiatives
                        </h4>
                        <div className="space-y-4">
                          {INITIATIVE_CATEGORIES.environmental.map((type) => {
                            const initiative = initiatives[type] || {
                              isActive: false,
                            }
                            return (
                              <InitiativeContainer
                                initiative={initiative}
                                key={type}
                                type={type}
                                updateInitiative={updateInitiative}
                              />
                            )
                          })}
                        </div>
                      </div>

                      {/* Social Initiatives */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-base text-blue-700 dark:text-blue-400">
                          👥 Social Initiatives
                        </h4>
                        <div className="space-y-4">
                          {INITIATIVE_CATEGORIES.social.map((type) => {
                            const initiative = initiatives[type] || {
                              isActive: false,
                            }
                            return (
                              <InitiativeContainer
                                initiative={initiative}
                                key={type}
                                type={type}
                                updateInitiative={updateInitiative}
                              />
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                }}
              </form.Field>
            </div>

            {/* Review Section */}
            <div className="border-t pt-6">
              <div>
                <h3 className="font-semibold text-lg">Review & Submit</h3>
                <p className="text-muted-foreground text-sm">
                  Please review your information before submitting
                </p>
              </div>
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

                {form.state.values.hasSubsidiaries === 'yes' &&
                  form.state.values.subsidiaries &&
                  form.state.values.subsidiaries.length > 0 && (
                    <div className="col-span-2 space-y-2">
                      <span className="font-medium">Subsidiaries:</span>
                      <div className="space-y-2 pl-4">
                        {form.state.values.subsidiaries.map(
                          (subsidiary, index) => (
                            <div
                              className="rounded border bg-muted/50 p-2 text-xs"
                              key={subsidiary.id}
                            >
                              <div className="font-medium">
                                {subsidiary.name || `Subsidiary ${index + 1}`}
                              </div>
                              <div className="text-muted-foreground">
                                Org: {subsidiary.orgNumber || 'Not provided'} |
                                Address: {subsidiary.address || 'Not provided'}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Active Initiatives */}
                {form.state.values.initiatives &&
                  Object.entries(form.state.values.initiatives).some(
                    ([_, initiative]) => initiative.isActive
                  ) && (
                    <div className="col-span-2 space-y-2">
                      <span className="font-medium">Active Initiatives:</span>
                      <div className="space-y-2 pl-4">
                        {Object.entries(form.state.values.initiatives)
                          .filter(([_, initiative]) => initiative.isActive)
                          .map(([type, initiative]) => (
                            <div
                              className="rounded border bg-muted/50 p-2 text-xs"
                              key={type}
                            >
                              <div className="font-medium">
                                {
                                  INITIATIVE_LABELS[
                                    type as keyof typeof INITIATIVE_LABELS
                                  ]
                                }
                              </div>
                              <div className="text-muted-foreground">
                                Goal: {initiative.goal || 'Not provided'} |
                                Responsible:{' '}
                                {initiative.responsiblePerson || 'Not provided'}
                              </div>
                              {initiative.description && (
                                <div className="mt-1 text-muted-foreground italic">
                                  "{initiative.description}"
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
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
