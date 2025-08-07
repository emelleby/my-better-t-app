'use client'

import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea'
  placeholder?: string
  value?: string
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  rows?: number
  onChange?: (value: string) => void
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
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChange?.(e.target.value)
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
