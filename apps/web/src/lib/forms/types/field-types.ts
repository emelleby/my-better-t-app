import type { FieldApi } from '@tanstack/react-form'
import type { z } from 'zod'

/**
 * Supported field types for the form system
 */
export type FieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'fieldArray'
  | 'conditionalGroup'

/**
 * Conditional rendering rule for fields
 */
export interface ConditionalRule {
  field: string
  operator:
    | 'equals'
    | 'notEquals'
    | 'contains'
    | 'notContains'
    | 'greaterThan'
    | 'lessThan'
  value: any
  logic?: 'and' | 'or'
}

/**
 * Field definition for form configuration
 */
export interface FieldDefinition {
  name: string
  type: FieldType
  label: string
  placeholder?: string
  required?: boolean
  validation?: z.ZodSchema<any>
  conditionalDisplay?: ConditionalRule
  fieldProps?: Record<string, any>
  options?: Array<{ label: string; value: any }> // For select, radio fields
  arrayItemSchema?: z.ZodSchema<any> // For fieldArray type
}

/**
 * Props passed to field components
 */
export interface FieldProps<T = any> {
  field: FieldApi<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >
  definition: FieldDefinition
  disabled?: boolean
  className?: string
}

/**
 * Field type renderer interface
 */
export interface FieldTypeRenderer {
  type: FieldType
  component: React.ComponentType<FieldProps>
  validator?: (value: any) => boolean
}

/**
 * Field registry for managing field types
 */
export interface FieldRegistry {
  register: (renderer: FieldTypeRenderer) => void
  get: (type: FieldType) => FieldTypeRenderer | undefined
  getAll: () => FieldTypeRenderer[]
}

/**
 * Field array item props for dynamic arrays
 */
export interface FieldArrayItemProps<T = any> {
  index: number
  item: T
  onRemove: (index: number) => void
  onUpdate: (index: number, data: Partial<T>) => void
  schema: z.ZodSchema<T>
  disabled?: boolean
}

/**
 * Conditional group props for conditional field rendering
 */
export interface ConditionalGroupProps {
  condition: ConditionalRule
  formData: any
  children: React.ReactNode
  animationDuration?: number
}
