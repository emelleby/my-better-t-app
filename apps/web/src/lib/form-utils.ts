import { z } from 'zod'

// Form persistence utilities
export const FORM_STORAGE_KEY = 'enhanced-multi-step-form-data'

export interface PersistedFormData {
  formData: Record<string, unknown>
  currentStep: number
  timestamp: number
  version: string
}

/**
 * Save form data to localStorage with timestamp and version
 */
export function saveFormData(
  data: Record<string, unknown>,
  currentStep: number
): void {
  try {
    const persistedData: PersistedFormData = {
      formData: data,
      currentStep,
      timestamp: Date.now(),
      version: '1.0.0',
    }
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(persistedData))
  } catch {
    // Silent fail for localStorage issues
  }
}

/**
 * Load form data from localStorage with validation
 */
export function loadFormData(): PersistedFormData | null {
  try {
    const stored = localStorage.getItem(FORM_STORAGE_KEY)
    if (!stored) {
      return null
    }

    const parsed: PersistedFormData = JSON.parse(stored)

    // Check if data is not too old (24 hours)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    if (Date.now() - parsed.timestamp > maxAge) {
      clearFormData()
      return null
    }

    return parsed
  } catch {
    clearFormData()
    return null
  }
}

/**
 * Clear form data from localStorage
 */
export function clearFormData(): void {
  try {
    localStorage.removeItem(FORM_STORAGE_KEY)
  } catch {
    // Silent fail for localStorage issues
  }
}

/**
 * Debounce function for form auto-save
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Create a debounced save function for form auto-save
 */
export function createDebouncedSave(delay = 1000) {
  return debounce((data: Record<string, unknown>, currentStep: number) => {
    saveFormData(data, currentStep)
  }, delay)
}

/**
 * Validate form step data against a schema
 */
export function validateFormStep<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(
  errors: z.ZodError
): Record<string, string> {
  const formatted: Record<string, string> = {}

  for (const error of errors.issues) {
    const path = error.path.join('.')
    formatted[path] = error.message
  }

  return formatted
}

/**
 * Check if form step is complete based on validation schema
 */
export function isStepComplete<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): boolean {
  try {
    schema.parse(data)
    return true
  } catch {
    return false
  }
}
