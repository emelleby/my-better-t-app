'use client'

import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TestFormData {
  name: string
  email: string
}

export function TestTanStackForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    } as TestFormData,
    onSubmit: ({ value }) => {
      alert(`Hello ${value.name}! Email: ${value.email}`)
      return Promise.resolve()
    },
  })

  return (
    <div className="mx-auto max-w-md space-y-4 p-6">
      <h2 className="font-bold text-xl">Test TanStack Form</h2>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field name="name">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your name"
                value={field.state.value}
              />
              {field.state.meta.errors && (
                <p className="text-destructive text-sm">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your email"
                type="email"
                value={field.state.value}
              />
              {field.state.meta.errors && (
                <p className="text-destructive text-sm">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <Button disabled={form.state.isSubmitting} type="submit">
          {form.state.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}
