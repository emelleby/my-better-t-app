"use client";

import React from "react";
import type { FormApi } from "@tanstack/react-form";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, X } from "lucide-react";
import { businessModelSchema, subsidiarySchema } from "@/lib/form-validation";
import type { FormData, Subsidiary } from "@/types/form";

interface BusinessModelStepProps {
  form: FormApi<FormData>;
}

export function BusinessModelStep({ form }: BusinessModelStepProps) {
  return (
    <div className="space-y-8">
      {/* Business Model Description */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Business Model</h3>
          <p className="text-sm text-muted-foreground">
            Provide a detailed description of your business model
          </p>
        </div>

        <form.Field
          name="businessModel"
          validators={{
            onChange: ({ value }) => {
              const result = businessModelSchema.shape.businessModel.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <FormField
                id="businessModel"
                label="Business Model Description"
                type="textarea"
                placeholder="Describe your business model, target market, value proposition, and key activities..."
                value={field.state.value || ''}
                error={field.state.meta.errors?.[0]}
                required
                rows={6}
                onChange={(value) => field.handleChange(value as string)}
                onBlur={field.handleBlur}
              />
              <div className="text-xs text-muted-foreground text-right">
                {(field.state.value || '').length}/1000 characters
              </div>
            </div>
          )}
        </form.Field>
      </div>

      {/* Subsidiaries Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Subsidiaries</h3>
          <p className="text-sm text-muted-foreground">
            Tell us about any subsidiary companies your organization owns or controls
          </p>
        </div>

        {/* Has Subsidiaries Radio Group */}
        <form.Field
          name="hasSubsidiaries"
          validators={{
            onChange: ({ value }) => {
              const result = businessModelSchema.shape.hasSubsidiaries.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Does your organization have subsidiaries? *
              </Label>
              <RadioGroup
                value={field.state.value || ''}
                onValueChange={(value) => {
                  field.handleChange(value as 'yes' | 'no');
                  // Clear subsidiaries if "no" is selected
                  if (value === 'no') {
                    const subsidiariesField = form.getFieldValue('subsidiaries');
                    if (subsidiariesField && Array.isArray(subsidiariesField)) {
                      form.setFieldValue('subsidiaries', []);
                    }
                  }
                }}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="subsidiaries-yes" />
                  <Label htmlFor="subsidiaries-yes" className="cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="subsidiaries-no" />
                  <Label htmlFor="subsidiaries-no" className="cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
              {field.state.meta.errors?.[0] && (
                <p className="text-sm text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Conditional Subsidiaries Management */}
        <form.Field name="hasSubsidiaries">
          {(hasSubsidiariesField) => {
            if (hasSubsidiariesField.state.value === 'yes') {
              return (
                <form.Field name="subsidiaries">
                  {(subsidiariesField) => {
                    const subsidiaries = (subsidiariesField.state.value as Subsidiary[]) || [];

                    const addSubsidiary = () => {
                      const newSubsidiary: Subsidiary = {
                        id: `subsidiary-${Date.now()}`,
                        name: '',
                        orgNumber: '',
                        address: '',
                      };
                      const updatedSubsidiaries = [...subsidiaries, newSubsidiary];
                      subsidiariesField.handleChange(updatedSubsidiaries);
                    };

                    const removeSubsidiary = (index: number) => {
                      const updatedSubsidiaries = subsidiaries.filter((_, i) => i !== index);
                      subsidiariesField.handleChange(updatedSubsidiaries);
                    };

                    const updateSubsidiary = (index: number, field: keyof Subsidiary, value: string) => {
                      const updatedSubsidiaries = subsidiaries.map((sub, i) =>
                        i === index ? { ...sub, [field]: value } : sub
                      );
                      subsidiariesField.handleChange(updatedSubsidiaries);
                    };

                    return (
                      <Card className="p-6 bg-muted/30">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Subsidiary Information</h4>
                          </div>

                          {subsidiaries.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground text-sm mb-4">
                                No subsidiaries added yet
                              </p>
                              <Button
                                type="button"
                                variant="default"
                                onClick={addSubsidiary}
                                className="gap-2"
                              >
                                <Plus className="h-4 w-4" />
                                Add First Subsidiary
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {subsidiaries.map((subsidiary, index) => (
                                <Card key={subsidiary.id} className="p-4 bg-background">
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-medium text-sm">
                                        Subsidiary {index + 1}
                                      </h5>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeSubsidiary(index)}
                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <FormField
                                          id={`subsidiary-name-${index}`}
                                          label="Subsidiary Name"
                                          type="text"
                                          placeholder="Enter subsidiary name"
                                          value={subsidiary.name}
                                          required
                                          error={!subsidiary.name.trim() && subsidiary.name !== '' ? 'Subsidiary name is required' : undefined}
                                          onChange={(value) => updateSubsidiary(index, 'name', value as string)}
                                        />
                                      </div>
                                      <div>
                                        <FormField
                                          id={`subsidiary-org-${index}`}
                                          label="Organization Number"
                                          type="text"
                                          placeholder="Enter organization number"
                                          value={subsidiary.orgNumber}
                                          required
                                          error={!subsidiary.orgNumber.trim() && subsidiary.orgNumber !== '' ? 'Organization number is required' : undefined}
                                          onChange={(value) => updateSubsidiary(index, 'orgNumber', value as string)}
                                        />
                                      </div>
                                    </div>

                                    <FormField
                                      id={`subsidiary-address-${index}`}
                                      label="Address"
                                      type="text"
                                      placeholder="Enter complete address"
                                      value={subsidiary.address}
                                      required
                                      error={!subsidiary.address.trim() && subsidiary.address !== '' ? 'Address is required' : subsidiary.address.length > 0 && subsidiary.address.length < 5 ? 'Please provide a complete address (minimum 5 characters)' : undefined}
                                      onChange={(value) => updateSubsidiary(index, 'address', value as string)}
                                    />
                                  </div>
                                </Card>
                              ))}
                            </div>
                          )}

                          {subsidiaries.length > 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addSubsidiary}
                              className="gap-2 w-full"
                            >
                              <Plus className="h-4 w-4" />
                              Add Another Subsidiary
                            </Button>
                          )}

                          {subsidiariesField.state.meta.errors?.[0] && (
                            <p className="text-sm text-destructive">
                              {subsidiariesField.state.meta.errors[0]}
                            </p>
                          )}
                        </div>
                      </Card>
                    );
                  }}
                </form.Field>
              );
            }
            return null;
          }}
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
