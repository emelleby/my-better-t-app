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
  // Optional completion status - when provided, uses true completion instead of positional logic
  completion?: Record<string, boolean>
}

interface StepItemProps {
  step: Step
  stepNumber: number
  isCompleted: boolean
  isCurrent: boolean
  isClickable: boolean
  showTitle: boolean
  onStepClick?: (stepIndex: number) => void
  stepIndex: number
}

function StepItem({
  step,
  stepNumber,
  isCompleted,
  isCurrent,
  isClickable,
  showTitle,
  onStepClick,
  stepIndex,
}: StepItemProps) {
  const handleClick = () => {
    if (isClickable && onStepClick) {
      onStepClick(stepIndex)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && isClickable) {
      event.preventDefault()
      onStepClick?.(stepIndex)
    }
  }

  const getAriaLabel = () => {
    if (isCompleted) {
      return `Step ${stepNumber}: ${step.title} (completed)`
    }
    if (isCurrent) {
      return `Step ${stepNumber}: ${step.title} (current)`
    }
    return `Step ${stepNumber}: ${step.title}`
  }

  const stepContent = isCompleted ? (
    <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
  ) : (
    stepNumber
  )

  const stepElement = isClickable ? (
    <button
      aria-label={getAriaLabel()}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs transition-colors',
        isCompleted && 'bg-primary text-primary-foreground',
        isCurrent &&
          'bg-primary text-primary-foreground ring-2 ring-primary/30',
        !(isCompleted || isCurrent) && 'bg-secondary text-secondary-foreground',
        isClickable && 'cursor-pointer hover:bg-primary/80'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      {stepContent}
    </button>
  ) : (
    <div
      aria-label={getAriaLabel()}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs transition-colors',
        isCompleted && 'bg-primary text-primary-foreground',
        isCurrent &&
          'bg-primary text-primary-foreground ring-2 ring-primary/30',
        !(isCompleted || isCurrent) && 'bg-secondary text-secondary-foreground'
      )}
    >
      {stepContent}
    </div>
  )

  return (
    <div className="flex flex-col items-center">
      {stepElement}
      {showTitle && (
        <span className="mt-1 hidden text-xs sm:block">{step.title}</span>
      )}
    </div>
  )
}

export function StepIndicator({
  steps,
  currentStep,
  className,
  showTitles = true,
  onStepClick,
  completion,
}: StepIndicatorProps) {
  return (
    <div className={cn('mb-8 flex justify-between', className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCurrent = stepNumber === currentStep
        
        // Use completion flags if provided, otherwise fall back to positional logic
        let isCompleted: boolean
        if (completion) {
          // True completion status based on validation
          isCompleted = completion[step.id] || false
        } else {
          // Fallback to positional logic for backwards compatibility
          isCompleted = stepNumber < currentStep
        }
        
        const isClickable = !!(onStepClick && isCompleted)

        return (
          <StepItem
            isClickable={isClickable}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            key={step.id}
            onStepClick={onStepClick}
            showTitle={showTitles}
            step={step}
            stepIndex={index}
            stepNumber={stepNumber}
          />
        )
      })}
    </div>
  )
}
