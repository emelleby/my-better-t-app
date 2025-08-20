/**
 * Multi-step form components
 *
 * This module provides components for building multi-step forms with
 * TanStack Forms integration, including step management, progress tracking,
 * and form state persistence.
 */

export type { NavigationControlsProps } from './NavigationControls'
export {
  CompactNavigationControls,
  default as NavigationControls,
} from './NavigationControls'
export type { ProgressIndicatorProps } from './ProgressIndicator'
// Export components
export { default as ProgressIndicator } from './ProgressIndicator'

export { default as ProgressNavigationDemo } from './ProgressNavigationDemo'

// Export types
export * from './types'
