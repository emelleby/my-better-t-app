"use client";

import React from "react";
import type { FormApi } from "@tanstack/react-form";
import { FormField } from "@/components/ui/form-field";
import { organizationInfoSchema } from "@/lib/form-validation";
import type { FormData } from "@/types/form";

interface OrganizationInfoStepProps {
  form: FormApi<FormData>;
}

export function OrganizationInfoStep({ form }: OrganizationInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Organization Name */}
        <form.Field
          name="organizationName"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.organizationName.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="organizationName"
              label="Organization Name"
              type="text"
              placeholder="Enter your organization name"
              value={field.state.value || ''}
              error={field.state.meta.errors?.[0]}
              required
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* Organization Number */}
        <form.Field
          name="organizationNumber"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.organizationNumber.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="organizationNumber"
              label="Organization Number"
              type="text"
              placeholder="Enter organization number"
              value={field.state.value || ''}
              error={field.state.meta.errors?.[0]}
              required
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* Registration Number */}
        <form.Field
          name="registrationNumber"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.registrationNumber.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="registrationNumber"
              label="Registration Number"
              type="text"
              placeholder="Enter registration number"
              value={field.state.value || ''}
              error={field.state.meta.errors?.[0]}
              required
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* NACE Code */}
        <form.Field
          name="naceCode"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.naceCode.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="naceCode"
              label="NACE Code"
              type="text"
              placeholder="e.g., 62.01"
              value={field.state.value || ''}
              error={field.state.meta.errors?.[0]}
              required
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* Industry */}
        <form.Field
          name="industry"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.industry.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="industry"
              label="Industry"
              type="text"
              placeholder="e.g., Information Technology"
              value={field.state.value || ''}
              error={field.state.meta.errors?.[0]}
              required
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* Revenue */}
        <form.Field
          name="revenue"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.revenue.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="revenue"
              label="Annual Revenue (USD)"
              type="number"
              placeholder="0"
              value={field.state.value ?? 0}
              error={field.state.meta.errors?.[0]}
              required
              min={0}
              step={1000}
              onChange={(value) => {
                const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
                field.handleChange(numValue);
              }}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* Number of Employees */}
        <form.Field
          name="numberOfEmployees"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.numberOfEmployees.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="numberOfEmployees"
              label="Number of Employees"
              type="number"
              placeholder="1"
              value={field.state.value ?? 1}
              error={field.state.meta.errors?.[0]}
              required
              min={1}
              step={1}
              onChange={(value) => {
                const numValue = typeof value === 'string' ? parseInt(value) || 1 : value;
                field.handleChange(numValue);
              }}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* Contact Person */}
        <form.Field
          name="contactPerson"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.contactPerson.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="contactPerson"
              label="Contact Person"
              type="text"
              placeholder="Enter contact person name"
              value={field.state.value || ''}
              error={field.state.meta.errors?.[0]}
              required
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* Email */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.email.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="email"
              label="Email Address"
              type="email"
              placeholder="contact@organization.com"
              value={field.state.value || ''}
              error={field.state.meta.errors?.[0]}
              required
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        {/* Phone Number */}
        <form.Field
          name="phoneNumber"
          validators={{
            onChange: ({ value }) => {
              const result = organizationInfoSchema.shape.phoneNumber.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              id="phoneNumber"
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={field.state.value || ''}
              error={field.state.meta.errors?.[0]}
              required
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          All fields marked with an asterisk (*) are required to proceed to the next step.
        </p>
      </div>
    </div>
  );
}
