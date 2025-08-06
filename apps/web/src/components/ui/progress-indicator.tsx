'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  className?: string
  showPercentage?: boolean
  showStepCount?: boolean
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  className,
  showPercentage = true,
  showStepCount = true,
}: ProgressIndicatorProps) {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className={cn('mb-8', className)}>
      <div className="mb-2 flex justify-between">
        {showStepCount && (
          <span className="font-medium text-sm">
            Step {currentStep} of {totalSteps}
          </span>
        )}
        {showPercentage && (
          <span className="font-medium text-sm">{progressPercentage}%</span>
        )}
      </div>
      <Progress
        aria-label={`Form progress: ${progressPercentage}% complete`}
        className="h-2"
        value={progressPercentage}
      />
    </div>
  )
}
