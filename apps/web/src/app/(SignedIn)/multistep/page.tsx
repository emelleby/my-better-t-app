'use client'

import { EnhancedMultiStepForm } from '@/components/ui/enhanced-multi-step-form'
import { type FormData } from '@/types/form'

export default function MultiStepPage() {
  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    alert(`🎉 Form submitted successfully! 

Organization: ${data.organizationName}
Email: ${data.email}

Check the console for full form data.`)
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-bold text-3xl tracking-tight">Enhanced Multi-Step Form</h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Complete sustainability reporting form with enhanced validation and user experience
        </p>
      </div>

      {/* Enhanced Form */}
      <EnhancedMultiStepForm onSubmit={handleFormSubmit} />
    </div>
  )
}
