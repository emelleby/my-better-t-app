"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { 
  getDefaultFormData, 
  stepValidationSchemas, 
  type CompleteFormData,
  type OrganizationInfoData 
} from "@/lib/form-validation";
import { FormStep, type FormStepType, type FormData } from "@/types/form";
import { saveFormData, loadFormData, clearFormData, createDebouncedSave } from "@/lib/form-utils";

// Import step components
import { OrganizationInfoStep } from "./form-steps/organization-info-step";
import { BusinessModelStep } from "./form-steps/business-model-step";
import { SustainabilityInitiativesStep } from "./form-steps/sustainability-initiatives-step";

interface EnhancedMultiStepFormProps {
  className?: string;
  onSubmit?: (data: FormData) => void | Promise<void>;
  initialData?: Partial<FormData>;
}

const STEPS = [
  {
    id: FormStep.ORGANIZATION_INFO,
    title: "Organization Information",
    description: "Tell us about your organization",
  },
  {
    id: FormStep.BUSINESS_MODEL,
    title: "Business Model & Subsidiaries",
    description: "Describe your business and subsidiaries",
  },
  {
    id: FormStep.SUSTAINABILITY_INITIATIVES,
    title: "Sustainability Initiatives",
    description: "Select your sustainability programs",
  },
] as const;

export function EnhancedMultiStepForm({ 
  className, 
  onSubmit, 
  initialData 
}: EnhancedMultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStepType>(FormStep.ORGANIZATION_INFO);
  const [isComplete, setIsComplete] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Create debounced save function
  const debouncedSave = createDebouncedSave(1000);

  // Initialize form with TanStack Form
  const form = useForm({
    defaultValues: { ...getDefaultFormData(), ...initialData } as FormData,
    onSubmit: async ({ value }) => {
      try {
        if (onSubmit) {
          await onSubmit(value);
        }
        setIsComplete(true);
        clearFormData(); // Clear saved data after successful submission
      } catch (error) {
        console.error('Form submission error:', error);
        // Handle submission error (could add error state here)
      }
    },
  });

  // Load persisted data on mount
  useEffect(() => {
    if (!initialData) {
      const savedData = loadFormData();
      if (savedData) {
        form.reset(savedData.formData as FormData);
        setCurrentStep(savedData.currentStep as FormStepType);
      }
    }
  }, [initialData, form]);

  // Auto-save form data on changes
  useEffect(() => {
    const subscription = form.store.subscribe(() => {
      const formState = form.state.values;
      debouncedSave(formState, currentStep);
    });

    return () => subscription();
  }, [form, currentStep, debouncedSave]);

  // Calculate progress
  const progressPercentage = Math.round((currentStep / STEPS.length) * 100);
  
  // Navigation state
  const canGoNext = currentStep < STEPS.length;
  const canGoPrevious = currentStep > 1;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === STEPS.length;

  // Get current step data
  const currentStepData = STEPS[currentStep - 1];

  // Validate current step
  const validateCurrentStep = async () => {
    const currentStepSchema = stepValidationSchemas[currentStep as keyof typeof stepValidationSchemas];
    if (!currentStepSchema) return { success: true };

    try {
      const formData = form.state.values;
      const result = await currentStepSchema.safeParseAsync(formData);
      return result;
    } catch {
      return { success: false, error: { issues: [{ message: 'Validation error occurred' }] } };
    }
  };

  // Handle next step
  const handleNext = async () => {
    if (!canGoNext) return;

    // Clear previous validation error
    setValidationError(null);

    const validation = await validateCurrentStep();
    if (validation.success) {
      setCurrentStep((currentStep + 1) as FormStepType);
    } else {
      // Show validation error to user
      const errorMessage = validation.error?.issues?.[0]?.message || 'Please complete all required fields correctly';
      setValidationError(errorMessage);
      
      // Also scroll to top to ensure user sees the error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (canGoPrevious) {
      setValidationError(null); // Clear validation error
      setCurrentStep((currentStep - 1) as FormStepType);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (isLastStep) {
      await form.handleSubmit();
    } else {
      await handleNext();
    }
  };

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  if (isComplete) {
    return (
      <div className={cn("w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg bg-card", className)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-900">Form Submitted Successfully!</h2>
          <p className="text-muted-foreground">
            Thank you for providing your sustainability information. We'll review your submission shortly.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg bg-card", className)}>
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {STEPS.length}</span>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-8">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isCurrentStep = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors",
                  isCompleted
                    ? "bg-primary text-primary-foreground border-primary"
                    : isCurrentStep
                    ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/30"
                    : "bg-background text-muted-foreground border-border"
                )}
              >
                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : stepNumber}
              </div>
              <span className="text-xs mt-2 text-center px-1 hidden sm:block">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={stepVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold">{currentStepData.title}</h2>
            <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
            
            {/* Validation Error Display */}
            {validationError && (
              <div className="mt-4 p-4 border border-destructive/20 bg-destructive/10 rounded-md">
                <p className="text-sm text-destructive font-medium">
                  {validationError}
                </p>
              </div>
            )}
          </div>

          {/* Step Components */}
          {currentStep === FormStep.ORGANIZATION_INFO && (
            <OrganizationInfoStep form={form} />
          )}
          {currentStep === FormStep.BUSINESS_MODEL && (
            <BusinessModelStep form={form} />
          )}
          {currentStep === FormStep.SUSTAINABILITY_INITIATIVES && (
            <SustainabilityInitiativesStep form={form} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep || form.state.isSubmitting}
          className="min-w-[100px]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={form.state.isSubmitting}
          className="min-w-[100px]"
        >
          {form.state.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isLastStep ? 'Submitting...' : 'Validating...'}
            </>
          ) : (
            <>
              {isLastStep ? 'Submit' : 'Next'}
              {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
