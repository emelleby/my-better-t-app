import { useForm } from '@tanstack/react-form'

// Simple form data type for testing
interface SimpleFormData {
  name: string
  email: string
}

export function useSimpleTanStackForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    } as SimpleFormData,
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value)
    },
  })

  return {
    form,
    isSubmitting: form.state.isSubmitting,
    values: form.state.values,
  }
}
