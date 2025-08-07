# Design Document

## Overview

The enhanced multi-step form will be built as a modular, accessible React component using TanStack Form for state management, Zod for validation, and Framer Motion for animations. The design emphasizes reusability, type safety, and excellent user experience across all devices.

## Architecture

### Component Hierarchy

```
EnhancedMultiStepForm
├── FormProvider (TanStack Form Context)
├── ProgressIndicator
├── StepIndicators
├── AnimatedStepContainer
│   ├── OrganizationInfoStep
│   ├── BusinessModelStep
│   │   ├── BusinessModelTextarea
│   │   └── SubsidiaryManager
│   │       └── SubsidiaryInputGroup[]
│   └── SustainabilityInitiativesStep
│       └── InitiativeToggle[]
│           └── InitiativeFields
├── NavigationControls
└── SubmissionConfirmation
```

### State Management Strategy

The form will use TanStack Form as the primary state management solution, providing:
- Centralized form state with `useForm`
- Field-level validation with `useField`
- Dynamic field arrays with `useFieldArray`
- Automatic persistence through custom hooks

### Data Flow

1. **Initialization**: Form loads with empty state or restored data from localStorage
2. **Step Navigation**: Each step validates current data before allowing progression
3. **Dynamic Fields**: Subsidiary and initiative fields are added/removed based on user selections
4. **Persistence**: All changes are automatically saved to localStorage
5. **Submission**: Final validation occurs before data is passed to parent component

## Components and Interfaces

### Core Types

```typescript
// Base form data structure
interface FormData {
  // Step 1: Organization Information
  organizationName: string
  organizationNumber: string
  contactPerson: string
  email: string
  phoneNumber: string
  
  // Step 2: Business Model & Subsidiaries
  businessModel: string
  hasSubsidiaries: 'yes' | 'no' | null
  subsidiaries: Subsidiary[]
  
  // Step 3: Sustainability Initiatives
  initiatives: Record<InitiativeType, Initiative>
}

interface Subsidiary {
  id: string
  name: string
  orgNumber: string
  address: string
}

interface Initiative {
  isActive: boolean
  description?: string
  goal?: string
  responsiblePerson?: string
}

type InitiativeType = 
  | 'WorkforceDevelopment'
  | 'Biodiversity'
  | 'ClimateAction'
  | 'WasteReduction'
  | 'EnergyEfficiency'
  | 'WaterConservation'
  | 'CommunityEngagement'
  | 'SupplyChainSustainability'
```

### Step Components

#### OrganizationInfoStep
```typescript
interface OrganizationInfoStepProps {
  form: FormApi<FormData>
}

// Features:
// - Standard input fields with real-time validation
// - Email format validation
// - Phone number format validation
// - Required field indicators
```

#### BusinessModelStep
```typescript
interface BusinessModelStepProps {
  form: FormApi<FormData>
}

// Features:
// - Textarea for business model description
// - Radio group for subsidiary question
// - Conditional subsidiary management section
// - Dynamic add/remove subsidiary functionality
```

#### SubsidiaryManager
```typescript
interface SubsidiaryManagerProps {
  form: FormApi<FormData>
  isVisible: boolean
}

// Features:
// - Dynamic field array management
// - Add/remove subsidiary controls
// - Individual subsidiary validation
// - Smooth animations for add/remove operations
```

#### SustainabilityInitiativesStep
```typescript
interface SustainabilityInitiativesStepProps {
  form: FormApi<FormData>
}

// Features:
// - Checkbox toggles for each initiative type
// - Conditional detail fields for active initiatives
// - Grouped initiative categories
// - Progress indication for completed initiatives
```

### Validation Schema

```typescript
const organizationSchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  organizationNumber: z.string().min(1, 'Organization number is required'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
})

const businessModelSchema = z.object({
  businessModel: z.string().min(10, 'Please provide a detailed business model description'),
  hasSubsidiaries: z.enum(['yes', 'no']).nullable(),
  subsidiaries: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Subsidiary name is required'),
    orgNumber: z.string().min(1, 'Organization number is required'),
    address: z.string().min(5, 'Please provide a complete address'),
  })).optional(),
}).refine((data) => {
  if (data.hasSubsidiaries === 'yes') {
    return data.subsidiaries && data.subsidiaries.length > 0
  }
  return true
}, {
  message: 'Please add at least one subsidiary or select "No"',
  path: ['subsidiaries']
})

const initiativeSchema = z.object({
  initiatives: z.record(z.object({
    isActive: z.boolean(),
    description: z.string().optional(),
    goal: z.string().optional(),
    responsiblePerson: z.string().optional(),
  })).refine((initiatives) => {
    // Validate that active initiatives have required fields
    return Object.entries(initiatives).every(([key, initiative]) => {
      if (initiative.isActive) {
        return initiative.description && initiative.goal && initiative.responsiblePerson
      }
      return true
    })
  }, {
    message: 'Please complete all fields for active initiatives'
  })
})
```

## Data Models

### Form State Management

The form will maintain state through TanStack Form with the following structure:

```typescript
const form = useForm({
  defaultValues: {
    // Organization Info
    organizationName: '',
    organizationNumber: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    
    // Business Model
    businessModel: '',
    hasSubsidiaries: null,
    subsidiaries: [],
    
    // Initiatives
    initiatives: {
      WorkforceDevelopment: { isActive: false },
      Biodiversity: { isActive: false },
      ClimateAction: { isActive: false },
      WasteReduction: { isActive: false },
      EnergyEfficiency: { isActive: false },
      WaterConservation: { isActive: false },
      CommunityEngagement: { isActive: false },
      SupplyChainSustainability: { isActive: false },
    }
  },
  onSubmit: async (values) => {
    // Handle form submission
  },
  validators: {
    onChangeAsync: async ({ value }) => {
      // Real-time validation
    }
  }
})
```

### Local Storage Schema

```typescript
interface PersistedFormData {
  formData: Partial<FormData>
  currentStep: number
  timestamp: number
  version: string
}

// Storage key: 'sustainability-form-data'
```

## Error Handling

### Validation Error Display

1. **Field-level errors**: Display immediately below each field
2. **Step-level errors**: Show summary at top of step
3. **Form-level errors**: Display in navigation area
4. **Network errors**: Show retry options with preserved data

### Error Recovery Strategies

```typescript
// Automatic retry for network failures
const submitWithRetry = async (data: FormData, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await submitForm(data)
    } catch (error) {
      if (attempt === maxRetries) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    }
  }
}

// Data recovery from localStorage
const recoverFormData = (): Partial<FormData> | null => {
  try {
    const stored = localStorage.getItem('sustainability-form-data')
    if (!stored) return null
    
    const parsed: PersistedFormData = JSON.parse(stored)
    
    // Check if data is not too old (24 hours)
    if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('sustainability-form-data')
      return null
    }
    
    return parsed.formData
  } catch {
    localStorage.removeItem('sustainability-form-data')
    return null
  }
}
```

## Testing Strategy

### Unit Testing Approach

1. **Component Testing**: Test each step component in isolation
2. **Validation Testing**: Verify all validation rules work correctly
3. **State Management Testing**: Test form state transitions
4. **Accessibility Testing**: Verify ARIA labels and keyboard navigation

### Integration Testing

1. **Multi-step Flow**: Test complete form submission process
2. **Data Persistence**: Verify localStorage functionality
3. **Dynamic Fields**: Test subsidiary and initiative management
4. **Error Scenarios**: Test validation and error recovery

### Test Structure

```typescript
describe('EnhancedMultiStepForm', () => {
  describe('Step Navigation', () => {
    it('should prevent navigation with invalid data')
    it('should preserve data when navigating backward')
    it('should update progress indicators correctly')
  })
  
  describe('Dynamic Fields', () => {
    it('should add/remove subsidiaries correctly')
    it('should toggle initiative fields based on selection')
    it('should validate dynamic field data')
  })
  
  describe('Data Persistence', () => {
    it('should save form data to localStorage')
    it('should restore form data on page reload')
    it('should clear data after successful submission')
  })
  
  describe('Accessibility', () => {
    it('should support keyboard navigation')
    it('should announce changes to screen readers')
    it('should have proper ARIA labels')
  })
})
```

### Performance Considerations

1. **Lazy Loading**: Load step components only when needed
2. **Memoization**: Use React.memo for expensive components
3. **Debounced Validation**: Prevent excessive validation calls
4. **Optimized Animations**: Use transform properties for smooth animations

### Browser Compatibility

- **Modern Browsers**: Full feature support (Chrome 90+, Firefox 88+, Safari 14+)
- **Legacy Support**: Graceful degradation for older browsers
- **Mobile Browsers**: Optimized touch interactions and viewport handling

### Security Considerations

1. **Data Sanitization**: Sanitize all user inputs before processing
2. **XSS Prevention**: Use proper escaping for dynamic content
3. **Local Storage**: Avoid storing sensitive information
4. **Validation**: Server-side validation for all submitted data