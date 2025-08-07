'use client'

import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea'
  placeholder?: string
  value?: string | number
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  rows?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: string | number) => void
  onBlur?: () => void
}

const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      value = '',
      error,
      required = false,
      disabled = false,
      className,
      rows,
      min,
      max,
      step,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (type === 'number') {
        const numValue = parseFloat(e.target.value)
        // Handle empty string as 0 for required number fields
        onChange?.(e.target.value === '' ? '' : (isNaN(numValue) ? 0 : numValue))
      } else {
        onChange?.(e.target.value)
      }
    }

    const inputClassName = cn(
      'w-full',
      error && 'border-destructive focus-visible:ring-destructive',
      className
    )

    return (
      <div className="space-y-2">
        <Label
          className={cn(
            'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            required &&
              "after:ml-0.5 after:text-destructive after:content-['*']"
          )}
          htmlFor={id}
        >
          {label}
        </Label>

        {type === 'textarea' ? (
          <Textarea
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            className={inputClassName}
            disabled={disabled}
            id={id}
            onBlur={onBlur}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            value={value}
            {...props}
          />
        ) : (
          <Input
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            className={inputClassName}
            disabled={disabled}
            id={id}
            min={type === 'number' ? min : undefined}
            max={type === 'number' ? max : undefined}
            step={type === 'number' ? step : undefined}
            onBlur={onBlur}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            value={value}
            {...props}
          />
        )}

        {error && (
          <p
            aria-live="polite"
            className="text-destructive text-sm"
            id={`${id}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

export { FormField }
