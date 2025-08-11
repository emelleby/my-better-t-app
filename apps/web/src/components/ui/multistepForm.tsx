'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

// Define the form schema for each step
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
})

const addressSchema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
})

const accountSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Combine all schemas for the final form data
const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...addressSchema.shape,
  ...accountSchema._def.schema.shape,
})

type FormData = z.infer<typeof formSchema>

interface MultiStepFormProps {
  className?: string
  onSubmit?: (data: FormData) => void
}

export default function MultiStepForm({
  className,
  onSubmit,
}: MultiStepFormProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Define the steps
  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      schema: personalInfoSchema,
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'john.doe@example.com',
        },
      ],
    },
    {
      id: 'address',
      title: 'Address Information',
      description: 'Where do you live?',
      schema: addressSchema,
      fields: [
        {
          name: 'address',
          label: 'Address',
          type: 'text',
          placeholder: '123 Main St',
        },
        { name: 'city', label: 'City', type: 'text', placeholder: 'New York' },
        {
          name: 'zipCode',
          label: 'Zip Code',
          type: 'text',
          placeholder: '10001',
        },
      ],
    },
    {
      id: 'account',
      title: 'Account Setup',
      description: 'Create your account',
      schema: accountSchema,
      fields: [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          placeholder: 'johndoe',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: '••••••••',
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          placeholder: '••••••••',
        },
      ],
    },
  ]

  // Get the current step schema
  const currentStepSchema = steps[step].schema

  // Setup form with the current step schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: zodResolver(currentStepSchema as z.ZodType<any>),
    defaultValues: formData,
  })

  // Calculate progress percentage
  const progress = ((step + 1) / steps.length) * 100

  // Handle next step
  const handleNextStep = (data: any) => {
    const updatedData = { ...formData, ...data }
    setFormData(updatedData)

    if (step < steps.length - 1) {
      setStep(step + 1)
      // Reset form with the updated data for the next step
      reset(updatedData)
    } else {
      // Final step submission
      setIsSubmitting(true)
      setTimeout(() => {
        if (onSubmit) {
          onSubmit(updatedData as FormData)
        }
        setIsComplete(true)
        setIsSubmitting(false)
      }, 1500)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-md rounded-lg bg-card/40 p-6 shadow-lg',
        className
      )}
    >
      {isComplete ? (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="py-10 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 font-bold text-2xl">Form Submitted!</h2>
          <p className="mb-6 text-muted-foreground">
            Thank you for completing the form. We&apos;ll be in touch soon.
          </p>
          <Button
            onClick={() => {
              setStep(0)
              setFormData({})
              setIsComplete(false)
              reset({})
            }}
          >
            Start Over
          </Button>
        </motion.div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="mb-2 flex justify-between">
              <span className="font-medium text-sm">
                Step {step + 1} of {steps.length}
              </span>
              <span className="font-medium text-sm">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress className="h-2" value={progress} />
          </div>

          {/* Step indicators */}
          <div className="mb-8 flex justify-between">
            {steps.map((s, i) => (
              <div className="flex flex-col items-center" key={s.id}>
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs',
                    i < step
                      ? 'bg-primary text-primary-foreground'
                      : i === step
                        ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                        : 'bg-secondary text-secondary-foreground'
                  )}
                >
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className="mt-1 hidden text-xs sm:block">{s.title}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.div
              animate="visible"
              exit="exit"
              initial="hidden"
              key={step}
              transition={{ duration: 0.3 }}
              variants={variants}
            >
              <div className="mb-6">
                <h2 className="font-bold text-xl">{steps[step].title}</h2>
                <p className="text-muted-foreground text-sm">
                  {steps[step].description}
                </p>
              </div>

              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleNextStep)}
              >
                {steps[step].fields.map((field) => (
                  <div className="space-y-2" key={field.name}>
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Input
                      id={field.name}
                      placeholder={field.placeholder}
                      type={field.type}
                      {...register(field.name as any)}
                      className={cn(
                        errors[field.name as string] && 'border-destructive'
                      )}
                    />
                    {errors[field.name as string] && (
                      <p className="text-destructive text-sm">
                        {errors[field.name as string]?.message as string}
                      </p>
                    )}
                  </div>
                ))}

                <div className="flex justify-between pt-4">
                  <Button
                    className={cn(step === 0 && 'invisible')}
                    disabled={step === 0}
                    onClick={handlePrevStep}
                    type="button"
                    variant="outline"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button disabled={isSubmitting} type="submit">
                    {step === steps.length - 1 ? (
                      isSubmitting ? (
                        'Submitting...'
                      ) : (
                        'Submit'
                      )
                    ) : (
                      <>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
