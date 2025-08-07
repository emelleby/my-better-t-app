"use client";

import React from "react";
import type { FormApi } from "@tanstack/react-form";
import { FormField } from "@/components/ui/form-field";
// import { Checkbox } from "@/components/ui/checkbox";
import { initiativeSchema } from "@/lib/form-validation";
import type { FormData, Initiative, InitiativeType } from "@/types/form";
import { INITIATIVE_CATEGORIES, INITIATIVE_LABELS } from "@/types/form";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SustainabilityInitiativesStepProps {
  form: FormApi<FormData>;
}

export function SustainabilityInitiativesStep({ form }: SustainabilityInitiativesStepProps) {
  const [expandedInitiatives, setExpandedInitiatives] = React.useState<Set<InitiativeType>>(new Set());

  const toggleExpand = (type: InitiativeType) => {
    setExpandedInitiatives(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  const renderInitiativeCard = (type: InitiativeType) => {
    return (
      <form.Field key={type} name={`initiatives.${type}`}>
        {(initiativeField) => {
          const initiative = (initiativeField.state.value as Initiative) || { isActive: false };
          const isActive = initiative.isActive;
          const isComplete = isActive && initiative.description && initiative.goal && initiative.responsiblePerson;
          const isExpanded = expandedInitiatives.has(type);

          const updateInitiative = (field: keyof Initiative, value: string | boolean) => {
            const updated = { ...initiative, [field]: value };
            initiativeField.handleChange(updated);
          };

          return (
            <div className="border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/20">
              {/* Header Section - Always Visible */}
              <div 
                className="p-4 cursor-pointer select-none hover:bg-muted/30 transition-colors"
                onClick={() => toggleExpand(type)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-1 pr-4">
                    <div className="flex items-center gap-3">
                      <h4 className={cn(
                        "font-medium transition-colors text-base",
                        isComplete ? "text-green-600 dark:text-green-400" : 
                        isActive ? "text-primary" : "text-foreground"
                      )}>
                        {INITIATIVE_LABELS[type]}
                      </h4>
                      {isComplete && (
                        <div className="flex items-center justify-center w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full">
                          <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getInitiativeDescription(type)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`checkbox-${type}`}
                        checked={isActive}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            updateInitiative('isActive', true);
                            // Auto-expand when checked
                            if (!isExpanded) {
                              toggleExpand(type);
                            }
                          } else {
                            initiativeField.handleChange({ 
                              isActive: false, 
                              description: '', 
                              goal: '', 
                              responsiblePerson: '' 
                            });
                            // Auto-collapse when unchecked
                            if (isExpanded) {
                              toggleExpand(type);
                            }
                          }
                        }}
                        className="w-4 h-4 text-primary bg-background border-2 border-input rounded focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors cursor-pointer"
                      />
                    </div>
                    
                    <motion.div 
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center w-6 h-6"
                    >
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Expandable Detail Section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeInOut",
                      opacity: { duration: 0.2 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className={cn(
                      "border-t transition-colors",
                      isActive ? "bg-muted/20" : "bg-muted/10"
                    )}>
                      <div className="p-6 space-y-4">
                        {!isActive && (
                          <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              💡 <strong>Preview:</strong> Check the box above to activate this initiative and make these fields editable.
                            </p>
                          </div>
                        )}
                        
                        <div className={cn(
                          "text-sm font-medium mb-4 flex items-center gap-2 transition-colors",
                          isActive ? "text-muted-foreground" : "text-muted-foreground/70"
                        )}>
                          <div className={cn(
                            "w-1 h-4 rounded-full transition-colors",
                            isActive ? "bg-primary" : "bg-muted-foreground/50"
                          )}></div>
                          Initiative Details {!isActive && "(Preview)"}
                        </div>
                        
                        {/* Description Field */}
                        <div>
                          <FormField
                            id={`${type}-description`}
                            label="Initiative Description"
                            type="textarea"
                            placeholder="Describe your initiative and current activities..."
                            value={initiative.description || ''}
                            required={isActive}
                            disabled={!isActive}
                            onChange={(value) => isActive && updateInitiative('description', value as string)}
                            rows={3}
                          />
                        </div>

                        {/* Goal Field */}
                        <div>
                          <FormField
                            id={`${type}-goal`}
                            label="Goals & Targets"
                            type="textarea"
                            placeholder="What are your specific goals and measurable targets?"
                            value={initiative.goal || ''}
                            required={isActive}
                            disabled={!isActive}
                            onChange={(value) => isActive && updateInitiative('goal', value as string)}
                            rows={2}
                          />
                        </div>

                        {/* Responsible Person Field */}
                        <div>
                          <FormField
                            id={`${type}-responsible`}
                            label="Responsible Person"
                            placeholder="Name of the person responsible for this initiative"
                            value={initiative.responsiblePerson || ''}
                            required={isActive}
                            disabled={!isActive}
                            onChange={(value) => isActive && updateInitiative('responsiblePerson', value as string)}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }}
      </form.Field>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Sustainability Initiatives</h3>
        <p className="text-muted-foreground">
          Select the sustainability initiatives your organization is actively pursuing.
          Click on any initiative to expand and provide detailed information.
        </p>
      </div>

      {/* Environmental Initiatives */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h4 className="font-semibold text-green-700 dark:text-green-400">Environmental Initiatives</h4>
        </div>
        <div className="grid gap-3">
          {INITIATIVE_CATEGORIES.environmental.map(renderInitiativeCard)}
        </div>
      </div>

      {/* Social Initiatives */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h4 className="font-semibold text-blue-700 dark:text-blue-400">Social Initiatives</h4>
        </div>
        <div className="grid gap-3">
          {INITIATIVE_CATEGORIES.social.map(renderInitiativeCard)}
        </div>
      </div>

      {/* Active Initiatives Summary */}
      <form.Field name="initiatives">
        {(initiativesField) => {
          const initiatives = (initiativesField.state.value as Record<InitiativeType, Initiative>) || {};
          const activeCount = Object.values(initiatives).filter(init => init?.isActive).length;
          const completeCount = Object.values(initiatives).filter(init => 
            init?.isActive && init?.description && init?.goal && init?.responsiblePerson
          ).length;
          
          if (activeCount > 0) {
            return (
              <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-lg">
                <h4 className="font-medium mb-2 text-primary">Active Initiatives Summary</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>
                    You have <span className="font-medium text-foreground">{activeCount}</span> active sustainability initiatives selected.
                  </div>
                  {completeCount > 0 && (
                    <div>
                      <span className="font-medium text-green-600 dark:text-green-400">{completeCount}</span> of these are fully completed.
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return null;
        }}
      </form.Field>
    </div>
  );
}

// Helper function to get initiative descriptions
function getInitiativeDescription(type: InitiativeType): string {
  const descriptions: Record<InitiativeType, string> = {
    WorkforceDevelopment: "Training, education, and development programs for employees",
    Biodiversity: "Conservation efforts and protection of natural ecosystems",
    ClimateAction: "Greenhouse gas reduction and climate change mitigation efforts",
    WasteReduction: "Minimizing waste generation and improving recycling practices",
    EnergyEfficiency: "Reducing energy consumption and improving efficiency",
    WaterConservation: "Water usage optimization and conservation measures",
    CommunityEngagement: "Local community involvement and social impact programs",
    SupplyChainSustainability: "Sustainable procurement and supplier engagement",
  };
  
  return descriptions[type];
}
