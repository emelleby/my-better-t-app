# Form Implementation Patterns

**✅ ESTABLISHED PATTERNS DOCUMENTATION**

_This document captures the proven patterns and conventions we've established for implementing forms in the application, based on our successful multi-step form implementation._

**Current Status**: These patterns are actively used in the codebase and have been tested in production-like scenarios.

**Reference**: See the multi-step form implementation in `apps/web/src/app/(SignedIn)/multistep/page.tsx` for a complete working example.

---

## Technology Stack for Forms

### Core Technologies
- **TanStack Form**: Primary form state management library
- **TanStack Query**: Server state management (for form submission)
- **Zod**: Runtime type validation and schema definition
- **TypeScript**: Compile-time type safety
- **shadcn/ui**: UI component library for form elements

### Form-Specific Components
- **FormField**: Reusable form field component with consistent styling
- **NavigationControls**: Multi-step form navigation
- **ProgressIndicator**: Visual progress tracking
- **StepIndicator**: Step-by-step navigation

## Form Architecture Patterns

### 1. Type-First Approach

Always start with TypeScript interfaces and Zod schemas:

```typescript
// Define the form data structure
export interface FormData {
  organizationName: string
  email: string
  hasSubsidiaries: 'yes' | 'no' | null
  subsidiaries: Subsidiary[]
  initiatives: Record<InitiativeType, Initiative>
}

// Create Zod schema for validation
export const formSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  email: z.string().email("Invalid email format"),
  // ... other fields
})
```

### 2. Custom Hook Pattern

Encapsulate form logic in custom hooks:

```typescript
// apps/web/src/hooks/use-reliable-multistep-form.ts
export function useReliableMultiStepForm(onSubmit: (data: FormData) => void) {
  const form = useForm({
    defaultValues: {
      organizationName: '',
      email: '',
      // ... other defaults
    },
    onSubmit: async ({ value }) => {
      // Handle submission logic
      onSubmit(value)
    }
  })

  // Multi-step navigation logic
  const [currentStep, setCurrentStep] = useState(1)
  
  return {
    form,
    currentStep,
    navigationState,
    goToNextStep,
    goToPreviousStep,
    // ... other utilities
  }
}
```

### 3. Reusable Form Components

Create consistent, reusable form components:

```typescript
// apps/web/src/components/ui/form-field.tsx
interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea'
  placeholder?: string
  value?: string
  error?: string
  required?: boolean
  onChange?: (value: string) => void
}

export function FormField({ id, label, error, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {props.type === 'textarea' ? (
        <Textarea id={id} {...props} />
      ) : (
        <Input id={id} {...props} />
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
```

## Implementation Patterns

### 1. Field Binding Pattern

Use consistent field binding with TanStack Form:

```typescript
<form.Field name="organizationName">
  {(field) => (
    <FormField
      error={field.state.meta.errors?.[0]}
      id="organizationName"
      label="Organization Name"
      onChange={(value) => field.handleChange(value)}
      placeholder="Enter your organization name"
      required
      value={String(field.state.value || '')}
    />
  )}
</form.Field>
```

**Key Points:**
- Always use `String(field.state.value || '')` for type safety
- Handle errors with `field.state.meta.errors?.[0]`
- Use consistent prop naming across all form fields

### 2. Multi-Step Form Pattern

Structure multi-step forms with clear separation:

```typescript
const renderStepContent = () => {
  switch (currentStep) {
    case 1:
      return <Step1Content />
    case 2:
      return <Step2Content />
    case 3:
      return <Step3Content />
    default:
      return <div>Invalid step</div>
  }
}

return (
  <Card>
    <CardContent className="space-y-6">
      <ProgressIndicator currentStep={currentStep} totalSteps={3} />
      <StepIndicator currentStep={currentStep} steps={steps} />
      
      <div className="min-h-[400px] py-4" key={`step-${currentStep}`}>
        {renderStepContent()}
      </div>
      
      <NavigationControls
        canGoBack={navigationState.canGoPrevious}
        canGoNext={navigationState.canGoNext}
        onBack={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={() => form.handleSubmit()}
      />
    </CardContent>
  </Card>
)
```

### 3. Conditional Field Pattern

Handle conditional fields with proper form field nesting:

```typescript
<form.Field name="hasSubsidiaries">
  {(hasSubsidiariesField) => {
    if (hasSubsidiariesField.state.value === 'yes') {
      return (
        <form.Field name="subsidiaries">
          {(subsidiariesField) => {
            // Render subsidiary fields
          }}
        </form.Field>
      )
    }
    return null
  }}
</form.Field>
```

### 4. Dynamic Array Fields Pattern

Handle dynamic arrays (like subsidiaries) with proper state management:

```typescript
<form.Field name="subsidiaries">
  {(subsidiariesField) => {
    const subsidiaries: Subsidiary[] = 
      (subsidiariesField.state.value as Subsidiary[]) || []

    const addItem = () => {
      const newItem = { id: `item-${Date.now()}`, name: '', /* ... */ }
      subsidiariesField.handleChange([...subsidiaries, newItem])
    }

    const removeItem = (index: number) => {
      const updated = subsidiaries.filter((_, i) => i !== index)
      subsidiariesField.handleChange(updated)
    }

    const updateItem = (index: number, field: string, value: string) => {
      const updated = subsidiaries.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
      subsidiariesField.handleChange(updated)
    }

    return (
      <div className="space-y-4">
        {subsidiaries.map((item, index) => (
          <div key={item.id}>
            {/* Render item fields */}
          </div>
        ))}
        <button onClick={addItem} type="button">Add Item</button>
      </div>
    )
  }}
</form.Field>
```

### 5. Complex Object Fields Pattern

Handle complex nested objects with proper typing:

```typescript
<form.Field name="initiatives">
  {(initiativesField) => {
    const initiatives: Record<InitiativeType, Initiative> =
      (initiativesField.state.value as Record<InitiativeType, Initiative>) || 
      ({} as Record<InitiativeType, Initiative>)

    const updateInitiative = (
      type: InitiativeType,
      field: keyof Initiative,
      value: Initiative[keyof Initiative]  // Proper typing, no 'any'
    ) => {
      const updated = {
        ...initiatives,
        [type]: {
          ...(initiatives[type] || {}),
          [field]: value,
        },
      }
      initiativesField.handleChange(updated)
    }

    return (
      <div>
        {INITIATIVE_CATEGORIES.environmental.map((type) => (
          <InitiativeContainer
            key={type}
            type={type}
            initiative={initiatives[type] || { isActive: false }}
            updateInitiative={updateInitiative}
          />
        ))}
      </div>
    )
  }}
</form.Field>
```

## Accessibility Patterns

### 1. Radio Button Groups

Use proper semantic HTML for radio button groups:

```typescript
<fieldset>
  <legend className="font-medium text-sm">
    Does your organization have subsidiaries?
  </legend>
  <form.Field name="hasSubsidiaries">
    {(field) => (
      <div className="mt-2 flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="hasSubsidiaries"
            value="yes"
            checked={field.state.value === 'yes'}
            onChange={() => field.handleChange('yes')}
          />
          Yes
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="hasSubsidiaries"
            value="no"
            checked={field.state.value === 'no'}
            onChange={() => field.handleChange('no')}
          />
          No
        </label>
      </div>
    )}
  </form.Field>
</fieldset>
```

### 2. Form Labels and Associations

Always properly associate labels with form controls:

```typescript
// ✅ Good: Proper label association
<FormField
  id="organizationName"
  label="Organization Name"
  // ... other props
/>

// ✅ Good: Checkbox with proper htmlFor
<input id={`initiative-${type}`} type="checkbox" />
<label htmlFor={`initiative-${type}`}>
  {INITIATIVE_LABELS[type]}
</label>
```

## Error Handling Patterns

### 1. Field-Level Errors

Display errors consistently across all form fields:

```typescript
<FormField
  error={field.state.meta.errors?.[0]}  // No type assertion needed
  // ... other props
/>
```

### 2. Form-Level Validation

Implement form-level validation with clear error messages:

```typescript
const form = useForm({
  validators: {
    onChange: formSchema,  // Real-time validation
    onSubmit: formSchema,  // Submit-time validation
  },
  onSubmit: async ({ value }) => {
    try {
      await submitForm(value)
      toast.success('Form submitted successfully!')
    } catch (error) {
      toast.error('Failed to submit form')
    }
  }
})
```

## Performance Patterns

### 1. Component Memoization

Memoize expensive form components:

```typescript
const InitiativeContainer = memo(function InitiativeContainer({
  type,
  initiative,
  updateInitiative,
}: InitiativeContainerProps) {
  // Component implementation
})
```

### 2. Efficient Re-renders

Use proper key props to prevent unnecessary re-renders:

```typescript
<div className="min-h-[400px] py-4" key={`step-${currentStep}`}>
  {renderStepContent()}
</div>
```

## Testing Patterns

### 1. Form Testing Strategy

Test forms at multiple levels:

```typescript
// Unit tests for form hooks
describe('useReliableMultiStepForm', () => {
  it('should handle step navigation correctly', () => {
    // Test hook behavior
  })
})

// Integration tests for form components
describe('MultiStepForm', () => {
  it('should submit form with valid data', async () => {
    // Test complete form flow
  })
})
```

### 2. Accessibility Testing

Include accessibility tests in your form testing:

```typescript
it('should have proper form labels', () => {
  render(<FormComponent />)
  
  expect(screen.getByLabelText('Organization Name')).toBeInTheDocument()
  expect(screen.getByRole('group', { name: /subsidiaries/i })).toBeInTheDocument()
})
```

## Common Pitfalls and Solutions

### 1. Type Safety Issues

**Problem**: Using `any` types in form handlers
**Solution**: Use proper TypeScript types like `Initiative[keyof Initiative]`

### 2. Accessibility Violations

**Problem**: Unassociated form labels
**Solution**: Use `fieldset`/`legend` for radio groups, proper `htmlFor` attributes

### 3. State Management Issues

**Problem**: Form state not persisting across steps
**Solution**: Use proper form field nesting and state management hooks

### 4. Performance Issues

**Problem**: Unnecessary re-renders on form changes
**Solution**: Use memoization and proper key props

## File Organization

### Recommended Structure

```
apps/web/src/
├── components/ui/
│   ├── form-field.tsx          # Reusable form field component
│   ├── navigation-controls.tsx # Multi-step navigation
│   ├── progress-indicator.tsx  # Progress visualization
│   └── step-indicator.tsx      # Step navigation
├── hooks/
│   ├── use-reliable-multistep-form.ts  # Multi-step form logic
│   └── use-form-validation.ts          # Validation utilities
├── lib/
│   ├── form-validation.ts      # Zod schemas and validation
│   └── form-utils.ts          # Form utility functions
├── types/
│   └── form.ts                # Form-related TypeScript types
└── app/(SignedIn)/
    └── multistep/
        └── page.tsx           # Form implementation
```

## Future Enhancements

### Planned Improvements

1. **Form Builder**: Generic form builder for rapid form creation
2. **Validation Library**: Extended validation utilities
3. **Form Templates**: Pre-built form templates for common use cases
4. **Advanced Accessibility**: Enhanced screen reader support
5. **Form Analytics**: User interaction tracking and optimization

---

*This documentation reflects our current form implementation patterns and should be updated as we develop new forms and discover better practices.*