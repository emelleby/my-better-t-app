'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavigationControlsProps {
  canGoBack: boolean
  canGoNext: boolean
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting?: boolean
  onBack?: () => void
  onNext?: () => void
  onSubmit?: () => void
  nextLabel?: string
  backLabel?: string
  submitLabel?: string
  className?: string
}

export function NavigationControls({
  canGoBack,
  canGoNext,
  isFirstStep,
  isLastStep,
  isSubmitting = false,
  onBack,
  onNext,
  onSubmit,
  nextLabel = 'Next',
  backLabel = 'Back',
  submitLabel = 'Submit',
  className,
}: NavigationControlsProps) {
  const handleNextKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      if (isLastStep && onSubmit) {
        onSubmit()
      } else if (canGoNext && onNext) {
        onNext()
      }
    }
  }

  return (
    <div className={cn('flex justify-between pt-4', className)}>
      <Button
        aria-label={`Go to previous step${canGoBack ? '' : ' (disabled)'}`}
        className={cn(isFirstStep && 'invisible')}
        disabled={!canGoBack || isSubmitting}
        onClick={onBack}
        type="button"
        variant="outline"
      >
        <ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4" />
        {backLabel}
      </Button>

      {isLastStep ? (
        <Button
          aria-label={isSubmitting ? 'Submitting form...' : 'Submit form'}
          disabled={isSubmitting}
          onClick={onSubmit}
          onKeyDown={handleNextKeyDown}
          type="submit"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
      ) : (
        <Button
          aria-label={`Go to next step${canGoNext ? '' : ' (complete current step first)'}`}
          disabled={!canGoNext || isSubmitting}
          onClick={onNext}
          onKeyDown={handleNextKeyDown}
          type="button"
        >
          {nextLabel}
          <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
