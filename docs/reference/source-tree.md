# Project Source Tree

This document provides a comprehensive listing of all files and directories in the project structure, organized hierarchically.

Generated on: 2025-09-08T09:56:00Z

## Root Level Files

```
.augment-guidelines
.gitignore
.kilocodemodes
.roomodes
.windsurfrules
```

## Configuration Directories

### .bmad-core/
```
.bmad-core/
├── core-config.yaml
├── enhanced-ide-development-workflow.md
├── install-manifest.yaml
├── user-guide.md
├── working-in-the-brownfield.md
├── agent-teams/
│   ├── team-all.yaml
│   ├── team-fullstack.yaml
│   ├── team-ide-minimal.yaml
│   └── team-no-ui.yaml
├── agents/
│   ├── analyst.md
│   ├── architect.md
│   ├── bmad-master.md
│   ├── bmad-orchestrator.md
│   ├── dev.md
│   ├── doc.md
│   ├── pm.md
│   ├── po.md
│   ├── qa.md
│   ├── sm.md
│   └── ux-expert.md
├── checklists/
│   ├── architect-checklist.md
│   ├── change-checklist.md
│   ├── pm-checklist.md
│   ├── po-master-checklist.md
│   ├── story-dod-checklist.md
│   └── story-draft-checklist.md
├── data/
│   ├── bmad-kb.md
│   ├── brainstorming-techniques.md
│   ├── elicitation-methods.md
│   ├── technical-preferences.md
│   ├── test-levels-framework.md
│   └── test-priorities-matrix.md
├── tasks/
│   ├── advanced-elicitation.md
│   ├── analyze-changes.md
│   ├── analyze-story-docs.md
│   ├── apply-qa-fixes.md
│   ├── brownfield-create-epic.md
│   ├── brownfield-create-story.md
│   ├── correct-course.md
│   ├── create-adr.md
│   ├── create-brownfield-story.md
│   ├── create-deep-research-prompt.md
│   ├── create-doc.md
│   ├── create-next-story.md
│   ├── document-project.md
│   ├── execute-checklist.md
│   ├── facilitate-brainstorming-session.md
│   ├── generate-ai-frontend-prompt.md
│   ├── index-docs.md
│   ├── kb-mode-interaction.md
│   ├── nfr-assess.md
│   ├── qa-gate.md
│   ├── review-story.md
│   ├── risk-profile.md
│   ├── shard-doc.md
│   ├── test-design.md
│   ├── trace-requirements.md
│   └── validate-next-story.md
├── templates/
│   ├── adr-tmpl.yaml
│   ├── architecture-tmpl.yaml
│   ├── brainstorming-output-tmpl.yaml
│   ├── brownfield-architecture-tmpl.yaml
│   ├── brownfield-prd-tmpl.yaml
│   ├── competitor-analysis-tmpl.yaml
│   ├── front-end-architecture-tmpl.yaml
│   ├── front-end-spec-tmpl.yaml
│   ├── fullstack-architecture-tmpl.yaml
│   ├── market-research-tmpl.yaml
│   ├── prd-tmpl.yaml
│   ├── project-brief-tmpl.yaml
│   ├── qa-gate-tmpl.yaml
│   └── story-tmpl.yaml
├── utils/
│   ├── bmad-doc-template.md
│   ├── doc-organizer.md
│   └── workflow-management.md
└── workflows/
    ├── brownfield-fullstack.yaml
    ├── brownfield-service.yaml
    ├── brownfield-ui.yaml
    ├── greenfield-fullstack.yaml
    ├── greenfield-service.yaml
    └── greenfield-ui.yaml
```

## Application Code

### apps/server/
```
apps/server/
├── .env.example
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
├── prisma/
│   ├── index.ts
│   ├── generated/
│   │   ├── client.ts
│   │   ├── commonInputTypes.ts
│   │   ├── enums.ts
│   │   ├── libquery_engine-debian-openssl-3.0.x.so.node
│   │   ├── models.ts
│   │   ├── internal/
│   │   │   ├── class.ts
│   │   │   └── prismaNamespace.ts
│   │   └── models/
│   │       ├── Company.ts
│   │       ├── Employees.ts
│   │       ├── EnergyAndEmissions.ts
│   │       ├── Environmental.ts
│   │       ├── Ethics.ts
│   │       ├── FinesAndPenalties.ts
│   │       ├── Governance.ts
│   │       ├── Report.ts
│   │       ├── Social.ts
│   │       └── User.ts
│   └── schema/
│       └── schema.prisma
└── src/
    ├── app.ts
    ├── index.ts
    ├── lib/
    │   ├── database-test.ts
    │   ├── db.ts
    │   ├── environment-config.ts
    │   ├── external-db-config.ts
    │   ├── external-db.ts
    │   ├── jwt.ts
    │   ├── prisma.ts
    │   ├── seed-example.ts
    │   ├── validation.ts
    │   ├── migrations/
    │   │   └── migration-runner.ts
    │   ├── seeds/
    │   │   ├── development-seed.ts
    │   │   └── production-seed.ts
    │   ├── services/
    │   │   ├── company-service.ts
    │   │   ├── external-data-service.ts
    │   │   └── report-service.ts
    │   └── validation/
    │       └── esg-schemas.ts
    ├── routers/
    │   └── index.ts
    ├── routes/
    │   ├── auth.ts
    │   └── index.ts
    ├── scripts/
    │   ├── cleanup-eslint-comments.ts
    │   ├── db-status.ts
    │   ├── reset-db.ts
    │   ├── seed-dev.ts
    │   ├── seed-prod.ts
    │   ├── seed.ts
    │   ├── setup-environment.ts
    │   ├── test-external-data.ts
    │   └── validate-type-alignment.ts
    └── types/
        ├── api.ts
        ├── esg-models.ts
        └── external-data.ts
```

### apps/web/
```
apps/web/
├── .env.example
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── .next/
└── src/
    ├── bun-test-setup.ts
    ├── app/
    │   ├── error.tsx
    │   ├── favicon.ico
    │   ├── layout.tsx
    │   ├── not-found.tsx
    │   ├── (LandingPages)/
    │   │   ├── page.tsx
    │   │   ├── test-form/
    │   │   │   └── page.tsx
    │   │   └── test-inline/
    │   │       └── page.tsx
    │   └── (SignedIn)/
    │       ├── layout.tsx
    │       ├── dashboard/
    │       │   └── page.tsx
    │       ├── form-demo/
    │       │   └── page.tsx
    │       ├── generalinfo/
    │       │   └── page.tsx
    │       ├── projects/
    │       │   └── page.tsx
    │       └── settings/
    │           └── page.tsx
    ├── components/
    │   ├── environmentmoduleform.tsx
    │   ├── index.ts
    │   ├── auth/
    │   │   ├── auth-demo.tsx
    │   │   └── index.ts
    │   ├── common/
    │   │   ├── api-status.tsx
    │   │   ├── error-boundary.tsx
    │   │   ├── error-display.tsx
    │   │   ├── focus-manager.tsx
    │   │   ├── index.ts
    │   │   ├── loading.tsx
    │   │   └── mode-toggle.tsx
    │   ├── forms/
    │   │   ├── index.ts
    │   │   └── multi-step/
    │   │       ├── index.ts
    │   │       ├── multi-step-form.tsx
    │   │       ├── types.ts
    │   │       ├── __tests__/
    │   │       │   ├── components.test.tsx
    │   │       │   ├── hooks.test.ts
    │   │       │   ├── integration.test.tsx
    │   │       │   ├── schemas.test.ts
    │   │       │   ├── subsidiary-manager.test.tsx
    │   │       │   └── use-multi-step-form.test.ts
    │   │       ├── components/
    │   │       │   ├── completion-screen.tsx
    │   │       │   ├── form-field.tsx
    │   │       │   ├── form-navigation.tsx
    │   │       │   ├── index.ts
    │   │       │   ├── progress-bar.tsx
    │   │       │   ├── step-indicator.tsx
    │   │       │   └── subsidiary-manager.tsx
    │   │       ├── hooks/
    │   │       │   ├── index.ts
    │   │       │   ├── use-multi-step-form.ts
    │   │       │   └── use-step-navigation.ts
    │   │       ├── schemas/
    │   │       │   ├── business-model.ts.bak
    │   │       │   └── index.ts
    │   │       └── steps/
    │   │           ├── index.ts
    │   │           ├── step-1-company-info/
    │   │           ├── step-2-business-model/
    │   │           │   ├── index.ts
    │   │           │   ├── schema.ts
    │   │           │   └── __tests__/
    │   │           │       └── schema.test.ts
    │   │           ├── step-3-sustainability-initiatives/
    │   │           │   ├── index.ts
    │   │           │   ├── InitiativeForm.tsx
    │   │           │   ├── InitiativeManager.tsx
    │   │           │   ├── InitiativesTable.tsx
    │   │           │   ├── schema.ts
    │   │           │   └── __tests__/
    │   │           └── step-4-sustainability-practices/
    │   │               └── __tests__/
    │   ├── inline/
    │   │   ├── input.tsx
    │   │   └── text-area.tsx
    │   ├── layout/
    │   │   ├── app-layout.tsx
    │   │   ├── dashboard-loading.tsx
    │   │   ├── header.tsx
    │   │   ├── index.ts
    │   │   ├── providers.tsx
    │   │   └── theme-provider.tsx
    │   ├── navigation/
    │   │   ├── app-sidebar.tsx
    │   │   ├── index.ts
    │   │   ├── nav-main.tsx
    │   │   ├── nav-projects.tsx
    │   │   ├── nav-user.tsx
    │   │   └── team-switcher.tsx
    │   └── ui/
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── dropdown-menu.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       └── progress.tsx
    ├── contexts/
    ├── hooks/
    │   └── __tests__/
    └── lib/
        └── forms/
            └── storage/
                └── __tests__/
```

## Documentation

### docs/
```
docs/
├── architecture.md
├── prd.md
├── TESTING-STATUS.md
├── adr/
│   ├── 001.tdd-first-testing-strategy.md
│   ├── 002.multistep-form-implementation-with-react-hook-form.md
│   └── README.md
├── analysis/
│   └── testing-documentation-assessment.md
├── architecture-breakdown/
│   ├── 00-index.md
│   ├── 01-introduction-architecture.md
│   ├── 02-technology-stack.md
│   ├── 03-repository-structure.md
│   ├── 04-data-architecture.md
│   ├── 05-api-contract.md
│   ├── 06-developer-experience.md
│   ├── 07-deployment-infrastructure.md
│   ├── 08-next-steps-implementation.md
│   ├── ARCHITECTURE-ALIGNMENT-SUMMARY.md
│   ├── database-implementation.md
│   ├── DOCUMENTATION-CONSOLIDATION-SUMMARY.md
│   └── README.md
├── epics/
│   ├── epic-1-production-ready-authentication.md
│   ├── epic-4.1-integration-summary.md
│   ├── epic-multistep-form-system.md
│   ├── epic-testing-strategy-documentation.md
│   ├── README.md
│   ├── epic-1.5-data-fetching-strategy/
│   │   ├── design.md
│   │   ├── requirements.md
│   │   └── tasks.md
│   └── stories-backlog/
│       ├── epic-1-stories.md
│       └── epic-2-user-stories.md
├── prd-breakdown/
│   ├── 00-index.md
│   ├── 01-goals-and-context.md
│   ├── 02-epic-roadmap.md
│   ├── 03-functional-requirements.md
│   ├── 04-non-functional-requirements.md
│   ├── 05-acceptance-validation-strategy.md
│   └── README.md
├── qa/
│   ├── assessments/
│   │   ├── 4.1.12-risk-20250826.md
│   │   ├── 4.1.12-test-design-20250826.md
│   │   └── multi-step-form-restructure-risk-profile-20250830.md
│   ├── gates/
│   │   ├── 4.1.8-multistep-form-controller.yml
│   │   ├── 4.1.11-sustainability-initiatives-reporting.yml
│   │   ├── 10.1-testing-quick-start-guide.yml
│   │   ├── 10.2-tdd-process-documentation.yml
│   │   └── multi-step-form-restructure.yml
│   ├── implementation-plans/
│   │   └── multi-step-form-restructure-implementation-plan.md
│   └── mitigation-plans/
│       └── multi-step-form-restructure-mitigation-plan.md
├── reference/
│   ├── accessibility.md
│   ├── api-contract.md
│   ├── architecture.md
│   ├── coding-standards.md
│   ├── current-state.md
│   ├── development-workflow.md
│   ├── epic-10-completion-notes.md
│   ├── epic-10-testing-strategy-assessment.md
│   ├── error-handling.md
│   ├── README.md
│   ├── tdd-process-guide.md
│   ├── tech-stack.md
│   ├── testing-quick-start-guide.md
│   └── testing-patterns/
│       ├── index.md
│       ├── api/
│       │   └── post-endpoint.md
│       ├── component/
│       │   └── basic-component.md
│       ├── hook/
│       │   └── basic-hook.md
│       └── utility/
│           └── pure-function.md
└── stories/
    ├── 1.1.configure-clerk.md
    ├── 1.2.update-root-layout.md
    ├── 1.3.revise-auth-hook.md
    ├── 1.4.update-ui-components.md
    ├── 1.5.secure-route-middleware.md
    ├── 1.6.create-dedicated-auth-pages.md
    ├── 4.1.11.sustainability-initiatives-reporting.md
    ├── 4.1.12.form-data-persistence-localstorage.md
    └── README.md
```

## Testing and Scripts

### Testing Directories
```
playwright-report/
test-results/
tests/
└── localhost-test.spec.ts
```

### Scripts
```
scripts/
├── folder_sync.sh
├── foundation_to_kiro.sh
└── kiro_to_foundation.sh
```

## Summary

This project follows a monorepo structure with:

- **Frontend Application**: Next.js web application in `apps/web/`
- **Backend Application**: Node.js/TypeScript server in `apps/server/`
- **Documentation**: Comprehensive documentation in `docs/` with ADRs, architecture breakdown, epics, stories, and reference materials
- **BMAD Core**: Extensive agent-based development workflow system in `.bmad-core/`
- **Testing**: Playwright testing setup with test results and reports
- **Configuration**: Multiple IDE and tool configurations for enhanced development experience

The structure supports a full-stack TypeScript application with comprehensive documentation, testing, and development workflow automation through the BMAD (Better Made Development) system.