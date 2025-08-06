'use client'

import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  id: string
  title: string
  description?: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
  showTitles?: boolean
  onStepClick?: (stepIndex: number) => void
}

export function StepIndicator({
  steps,
  currentStep,
  className,
  showTitles = true,
  onStepClick,
}: StepIndicatorProps) {
  const handleStepClick = (stepIndex: number) => {
    if (onStepClick && stepIndex < currentStep) {
      onStepClick(stepIndex)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, stepIndex: number) => {
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      stepIndex < currentStep
    ) {
      event.preventDefault()
      onStepClick?.(stepIndex)
    }
  }

  return (
    <div className={cn('mb-8 flex justify-between', className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isClickable = onStepClick && isCompleted

        return (
          <div className="flex flex-col items-center" key={step.id}>
            <div
              aria-label={
                isCompleted
                  ? `Step ${stepNumber}: ${step.title} (completed)`
                  : isCurrent
                    ? `Step ${stepNumber}: ${step.title} (current)`
                    : `Step ${stepNumber}: ${step.title}`
              }
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs transition-colors',
                isCompleted && 'bg-primary text-primary-foreground',
                isCurrent &&
                  'bg-primary text-primary-foreground ring-2 ring-primary/30',
                !(isCompleted || isCurrent) &&
                  'bg-secondary text-secondary-foreground',
                isClickable && 'cursor-pointer hover:bg-primary/80'
              )}
              onClick={() => handleStepClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : -1}
            >
              {isCompleted ? (
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              ) : (
                stepNumber
              )}
            </div>
            {showTitles && (
              <span className="mt-1 hidden text-xs sm:block">{step.title}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
