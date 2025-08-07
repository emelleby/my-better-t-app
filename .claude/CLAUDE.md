# my-better-t-app - Project Context for Claude Code

## Project Overview
**my-better-t-app** is a full-stack TypeScript application built with the Better-T-Stack template, providing a modern web application foundation with a React frontend and API backend, designed for rapid development and scalability.

**Current State (January 8, 2025)**: Production-ready foundation with complete multi-step form implementation using TanStack Form. Comprehensive error handling and loading states system. Complete UI foundation with responsive sidebar navigation, accessibility features (WCAG 2.1 AA compliance), and theme system. Mock authentication system for development. Backend server with health check route ready for database models and API route expansion.

## Key Reference Documents
For comprehensive project information, always reference these steering documents in `Foundation/steering/`:
- **current-state.md**: Accurate audit of what actually exists vs what's planned
- **tech.md**: Technology stack, versions, and command reference  
- **structure.md**: Project file organization and naming conventions
- **form-implementation-patterns.md**: Proven patterns for TanStack Form development
- **decision-log.md**: Record of architectural decisions made
- **learning-journal.md**: Development insights and lessons learned

## Technology Stack

### Runtime & Build
- **Bun v1.2.19+**: Primary runtime and package manager
- **Turborepo**: Monorepo build orchestration with caching
- **Next.js 15.3.0**: Frontend with App Router and Turbopack
- **TypeScript**: Strict mode enabled across the stack

### Frontend
- **React 19**: Latest React features
- **TailwindCSS 4.1.11**: Utility-first styling
- **shadcn/ui**: Reusable component library built on Radix UI
- **Lucide React**: Icon library
- **TanStack Query**: Server state management
- **TanStack Form**: Form state managemented)

### Backend
- **Hono 4.8.10**: Lightweight web framework
- **Prisma 6.13.0**: TypeScript-first ORM
- **MongoDB**: NoSQL database
- **Zod**: Runtime type validation

### Code Quality
- **Biome**: Linting and formatting (extends Ultracite config)
- **Ultracite**: Opinionated code style and quality rules

## Key Development Commands

```bash
# Development
bun dev              # Start all apps
bun dev:web          # Frontend only (port 3001)
bun dev:server       # Backend only (port 3000)

# Quality & Building
bun check            # Biome linting and formatting
bun check-types      # Type checking
bun build            # Build all applications

# Database
bun db:push          # Push schema changes
bun db:studio        # Open Prisma Studio
bun db:generate      # Generate Prisma client
bun db:migrate       # Run migrations
```

## Project Structure

```
apps/
├── server/          # Hono backend API
│   ├── src/
│   │   ├── index.ts
│   │   └── routers/
│   └── prisma/
│       └── schema/
└── web/             # Next.js frontend
    └── src/
        ├── app/     # App Router pages
        ├── components/
        ├── contexts/
        ├── hook/
   lib/
/
```

## Core Development Principles

### Type Safety & Quality
- Strict TypeScript configuration enfored
- Zero tolerance for `any` types
- Comprehensive error handling required
ge cases
- Test-driven developme

### Before Writing Code
1. Analyze existing patterns in the codebase
2. Consider edge cases and error scenarios
3. Follow the Ultracite rules below strictly
s
5. Use test-driven developme exist

### Communication Guidelines
- Maintain objectivity and provide genuine value
- Don't change stance just to please - provide construc
t
- Focus ion

## Rules

### Accessibility (a11y)
- Don't use `accessKey` attribute on any HTML element.
- Don't set `aria-hidden="true"` on focusable elements.
- Don't add ARIA roles, states, and properties m.
- Don't use distracting elements like `<marquee>` or `<blink>`.
- Only use the `scope` prop on `<th>` elements.
- Don't assign non-interactive ARIA roles to interactive HTML elements.
- Make sure label elements have text content and are associ.
- Don't assign interactive ARIA roles to non-interacti
- Don't assign `tabIndex` to non-interactive HTML elements.
- Don't use positive integers for `tabIndex` property.
- Don't include "image", "picture", or "photo" in img alt prop.
- Don't use explicit role property that's the same a
- Make static elements with click handlers use a valid role attribute.
- Always include a `title` element for SVG elements.
- Give all elements requiring alt text meaningful information for screen readers.
- Make sure anchors have content that's accessible to screen readers.
- Assign `tabIndex` to non-interactive HTML elements with `aria-activede.
- Include all required ARIA attributes for elements withA roles.
- Make sure ARIA properties are valid for the element's suppor
- Always include a `type` attribute for button elements.
- Make elements with interactive roles and handlers focule.
- Give heading elements content that's accessible to scren`).
- Always include a `lang` attribute on the html element.
- Always include a `title` attribute for iframe elements.
- Accompany `onClick` with at least one of: `onKeyUp`,ess`.
- Accompany `onMouseOver`/`onMouseOut` with `onFocus`/`onB.
- Include caption tracks for audio and video ele
- Use semantic elements instead of role attributes.
- Make sure all anchors are valid and navigable.
- Ensure all ARIA properties (`aria-*`) are
- Use valid, non-abstract ARIA roles for elements with ARIA roles.
- Use valid ARIA state and property values.
s.
- Use correct ISO language/coun

### Code Complexity and Quality
- Don't use consecutive spaces in regular expression lirals.
- Don't use the `arguments` object.
- Don't use primitive type aliases or misleading types.
- Don't use the comma operator.
- Don't use empty type parameters in type aliases and inaces.
- Don't write functions that exceed a re.
- Don't nest describe() blocks too deeply in te.
- Don't use unnecessary boolean casts.
- Don't use unnecessary callbacks with flatMap.
- Use for...of statements instead of Array.forch.
- Don't create classes that only have 
- Don't use this and super in static 
- Don't use unnecessary catch clauses.
- Don't use unnecessary constructors.
- Don't use unnecessary continue statements.
- Don't export empty modules that 
- Don't use unnecessary escape .
- Don't use unnecessary fragments.
- Don't use unnecessary labels.
- Don't use unnecessary nested block statements.
- Don't rename imports, exports, and destructured assignments to the same name.
- Don't use unnecessary string or template literal concatn.
- Don't use String.raw in template literals when there are no 
- Don't use useless case statements nts.
- Don't use ternary operators when simpler alte.
- Don't use useless `this` aliasing.
- Don't use any or unknown as type constraints.
- Don't initialize variables to undefined.
- Don't use the void operators (they're not familiar).
- Use arrow functions instead of function expressions.
- Use Date.now() to get milliseconds since the Unix Epoch.
- Use .flatMap() instead of map().flat() when possible.
- Use literal property access instead of computed property access.
- Don't use parseInt() or Number.parseInt() when binary, octal, or hexadecimal lit.
- Use concise optional chaining instead of chained logical expressions.
- Use regular expression literals instead of the R
- Don't use number literal object member names that aren't base 10 or use underscore separator
- Remove redundant terms from lions.
- Use while loops instead of for sions.
- Don't pass children as props.
- Don't reassign const variables.
- Don't use constant expressions in condit.
- Don't use `Math.min` and `Math.max` to clamp values when the resu
- Don't return a value from a constructor.
- Don't use empty character classes in regular expr.
- Don't use empty destructuring patterns.
- Don't call global object properties as functio
- Don't declare functions and vars that are accessible outside their block.
- Make sure builtins are correctly instantiated.
- Don't use super() incorrectly inside classes. Also chers.
- Don't use variables and function parameters be.
.
- Don't use literal numbers that

### React and JSX Best Practices
- Don't use the return value of React.render.
- Make sure all dependencies are correctly specified in React .
- Make sure all React hooks are called from the top level of compo
- Don't forget key props in iterators and collection lit
- Don't destructure props inside JSX components in Soli
- Don't define React components inside os.
- Don't use event handlers on non-interactive elements.
- Don't assign to React componen.
- Don't use both `children` and ement.
- Don't use dangerous JSX props.
- Don't use Array index in keys.
- Don't insert comments as text nodes.
- Don't assign JSX properties multiple times.
- Don't add extra closing tags for components without children.
`.
- Watch out for possible " elements.

### Correctness and Safety
- Don't assign a value to itself.
- Don't return a value from a setter.
- Don't compare expressions that modify string case with non-comp.
- Don't use lexical declaration clauses.
- Don't use variables that haven't been declared in the document.
- Don't write unreachable code.
- Make sure super() is called exactly once on every code path in a c.
- Don't use control flow statements in fs.
- Don't use optional chaininwed.
- Don't have unused functio
- Don't have unused imports.
- Don't have unused labels.
- Don't have unused private class members.
- Don't have unused variables.
- Make sure void (self-closing) elem
- Don't return a value from a function with the return type 'void'
- Use isNaN() when checking for NaN.
- Make sure "for" loop update clauses move the
- Make sure typeof expressions lues.
- Make sure generator function
- Don't use await inside loops.
- Don't use bitwise operators.
- Don't use expressions where the operation doesn't chang.
- Make sure Promise-like
- Don't use __dirname and __file
- Prevent import cycles.
- Don't use configured elements.
- Don't hardcode sensitive data like API keys anns.
- Don't let variable declarations shadow variab
- Don't use the TypeScript directive @ts-ignore.
- Prevent duplicate polyfills from Polyfill.io.
- Don't use useless backrefere
- Don't use unnecessary escapes in string literals.
- Don't use useless undefined.
- Make sure getters and setters for the same property are next to each other in cl
- Make sure object literals are declared consistennitions).
- Use static Response methods instead of new Response() constructor whe
- Make sure switch-case statements are exhaustive.
- Make sure the `preconnect` attribute is used when usin
- Use `Array#{indexOf,lastIndexOf}()` instead of `Arra
- Make sure iterable callbacks return consists.
- Use `with { type: "json" }` for JSON module imports.
- Use numeric separators in numeric literals.
- Use object spread instead of `Object.assign()` when constructing new objects.
- Always use the radix argument when using `parse
- Make sure JSDoc comment lines start with a singl.
- Include a description parameter ol()`.
- Don't use spread (`...`) syntax on accumula.
- Don't use the `delete` operar.
- Don't access namespace imports dynamical
- Don't use namespace imports.
el.
- Don't use `target="_blank"`

### TypeScript Best Practices
- Don't use TypeScript enums.
- Don't export imported variables.
- Don't add type annotations to variables, parameters, and cla
- Don't use TypeScript namespaces.
- Don't use non-null assertions
- Don't use parameter properties in class constructors.
- Don't use user-defined types.
- Use `as const` instead of literal types and t
- Use either `T[]` or `Array<Tently.
- Initialize each enum member 
- Use `export type` for types.
- Use `import type` for types.
- Make sure all enum members are lues.
- Don't use TypeScript const enum.
- Don't declare empty int
- Don't let variables evolve into any type through reassignments.
- Don't use the any type.
- Don't misuse the non-null assertion operator
- Don't use implicit any type on variable declarations.
- Don't merge interfaces and classes unsafely.
ther.
- Use the namespace keywospaces.

### Style and Consistency
- Don't use global `eval()`.
- Don't use callbacks in asynchronous t
- Don't use negation in `if` statemenauses.
- Don't use nested ternary expressions.
- Don't reassign function parameters.
- This rule lets you specify global variable names you don't want to use iion.
- Don't use specified modules when loaded by import or require.
- Don't use constants whose value is the upper-case version of their name.
- Use `String.slice()` instead of `String.substr()` and `St)`.
- Don't use template literalsg.
- Don't use `else` blocks when .
- Don't use yoda expressions.
- Don't use Array constructors.
- Use `at()` instead of integer index access.
- Follow curly brace conventions.
- Use `else if` instead of nested `if` statements in `else` clauses.
- Use single `if` statements instead of nested `if` clauses.
- Use `new` for all builtins except `String`, `Number`, and `Boolean`
- Use consistent accessibility modifiers on class properties and methods.
- Use `const` declarations for variables that are ce.
- Put default function parameters and optionalt.
- Include a `default` clause in switch statements.
- Use the `**` operator instead of `Math.pow`.
- Use `for-of` loops when you need the index to extract
- Use `node:assert/strict` over `node:assert`.
- Use the `node:` protocol for Node.js builtin modus.
- Use Number properties instead of global ones.
- Use assignment operator shorthand where possible.
- Use function types instead of objures.
- Use template literals over statenation.
- Use `new` when throwing an error.
- Don't throw non-Error values.
- Use `String.trimStart()` and `Strint()`.
- Use standard constants instead of approximated 
- Don't assign values in expressions.
- Don't use async functions as s.
- Don't reassign exceptionss.
- Don't reassign class members.
- Don't compare against -0.
- Don't use labeled oops.
- Don't use void type outside of generic or return types.
- Don't use console.
- Don't use control characters and escape s.
- Don't use debugger.
- Don't assign directly to documen
- Use `===` and `!==`.
- Don't use duplicate case labels.
- Don't use duplicate class members.
- Don't use duplicate conditions in if-else-if 
- Don't use two keys with the same name inside o.
- Don't use duplicate function parameter names.
- Don't have duplicate hooks in describes.
- Don't use empty block statements and .
- Don't let switch clauses fall through.
- Don't reassign function declarations.
- Don't allow assignments to native objectss.
- Use Number.isFinite instead of glo
- Use Number.isNaN instead of global isNaN.
- Don't assign to imported bindings.
- Don't use irregular whitespace characters.
- Don't use labels that share a name with a varie.
- Don't use characters made with multiple code points in character clyntax.
- Make sure to use new and constructor properly.
- Don't use shorthand assign when the variable  sides.
- Don't use octal escape sequences in string literals.
- Don't use Object.prototype builtintly.
- Don't redeclare variables, functions, classes, and types ine.
- Don't have redundant "use strict".
- Don't compare things where both sides are exe.
- Don't let identifiers shadow restricted names.
- Don't use sparse arrays (arrs).
- Don't use template literalgs.
- Don't use the operty.
- Don't use unsafe negation.
- Don't use var.
- Don't use with statements in non-strict contexts.
- Make sure async functions actually use await.
- Make sure default clauses in switch statemen
- Make sure to pass a message value when creating a buierror.
- Make sure get methods always return a value.
- Use a recommended display strategy with Google F
- Make sure for-in loops include an if statement.
- Use Array.isArray() instead of instanceof Array.
ed().
- Make sure to use the "usfiles.

### Next.js Specific Rules
- Don't use `<img>` elements in Next.js projects.
- Don't use `<head>` elements in Next.js projects.
ojects.
- Don't use the next/head .

### Testing Best Practices
- Don't use export or module.exports in test files.
- Don't use focused tests.
ll.
- Don't use dis

## Common Tasks
- `npx ultracite init` - Initialize Ultracite in your prect

- `npx ultracite lint` - Cixing

## File Naming Conventions
- **Components**: `PascalCase` (UserProfile)
- **Files**: `kebab-case` (user-profile.tsx)
- **Functions**: `camelCase` (getUserProfile)

- **Types/Interfaces**

## Import Organization
1. External librari
2. Internal utilities and components
orts
4. Type-only imports t type`)

## Component Patterns
- Use functional components with hooks 
- Custom hooks for reusablc
- Proper dependency arrays in useEffect
- No missing keys in lists
- No components defined inside other components
- Use `<>...</>` instead of `<Rea
- PascalCase for component names, kebab-case names
- Co-locate types with components
- Props interfaces defined inld
s
- Composition over inh

## Form Implementation Patterns (Established)

### TanStack Form Integration


```typescript
// Custom hook pattern
export function useReliablvoid) {
  const form = useForm({
    defaultValues: {

      email: '',
      // ... other defaults
    },
    onSubmit: async ({ valu
      onSubmit(value)
    }
  })

  const [currentStep, setate(1)
  
  return {
    form,
    currentStep,
    navigationState,
    goToNextStep,
Step,
  }
}

// Field binding pattern
<form.Field name="organizationName">

    <FormField
      ers?.[0]}
      id="organiza"
      label="Organization Name"
      onChange={(value) => field.halue)}
me"
      required
      value={String(field.state.value || ''
    />
 )}
</form.Field>
`

### Multi-Step Form Structure
```typescript
const renderStepContent = () => {
  switch (currentStep) {
    case 1:

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

      <StepIndicator currentStep={cu>
      
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
tent>
  </Card>
)
```

ions
- Use Prisma for all database interaons
- Proper error handling for database operations
- Type-safe queries with Prisma client
ns


- Hono router for all end
- Zod validation for request/response
- Proper HTTP status codes
- Consistent error response format
- CORS configuration for frontend

## Security Requiements
- No hardcoded secrets or API keys
- Environment variables for configuration
- Input validation with Zod
- HTTPS in production
ion
- Parameterized querierisma)

## Performance Guidelines
- Use Next.js Image component for imag
- Implement loading states
omponents
- Dynamic imports for code splitting
- Database indexes for queries
- Connection pooling for database

## Environment Setup
d)
- Environment files: `apps/web/.env` and `apps/s

- Never commit actual `.env` files

### Required Environment Variables
```bash
# apps/server/.env
DATABASE_URL="mongodb://localhost:27017/myapp_dev"
CORS_ORIGIN="http://localhost:3001"

# apps/web/.env  
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Current Implementation Status (January 8, 2025)

### What Actually Exists Right Now
ce
- ✅ **Form Components**: FormField,s
- ✅ **Form Types and Validation**: Complete TypeScript interfaces, Zod schemas, and utility functions
- ✅ **Backend API foundation** with Hono server structure and health check route
- ✅ **Database and validation setup** with Prisma and Zod (schema ready for models)
- ✅ **Mock authentication context** for UI development with localStorage persistence
- ✅ **Complete layout system** with responsive sidebar navigation and theme support
- ✅ **Comprehensive error handling system** (boundaries, global pages, recovery)
s)
- ✅ **Complete shadcn/ui component integratiores
- ✅ **API client** with error handling, retry logic, and type safety
- ✅ **Accessibility implementation** (WCAG 2.1 AA compliance, ARIA labels, keyboard navigation, screen reader support)
- ✅ **Focus management system** for route changes and keyboard navigation

### Ready for Implementation
ured)
- [ ] **API routes expansion** (rdy)
- [ ] **Testing framework setup** (Vitest, Testing Library, Playw)

## Development Guidelines

### AI Agent Server Testing (Important)
**Never start development servers using executeBash** as these are long-runnin.

**Recommended Testing Approach:**
1. Ask user to start development server in their terminal
2. Use `curl` commands to test API endpoints (these terminate quickly)
3. Ask user to share terminal output, errors, or startup issues

### Testing Commands (AI Agent Safe)
```bash
# Test health endpoint
curl -s http://localhost:3000/


bun check-types
```

### Commands to Avoid in AI Agent Execution
`bash
# These will hang the agent execu
bun dev          # Starts all services (long-running)
bun dev:server   # Starts backend server (long-running)
bun dev:web      # Starts frontend server (long-running)


## Estared)

### Error Handling Pattern

import { ErrorBoundaryndary'

// Always wrap components
<ErrorBoundary>
t />
</ErrorBoundary>

// 

if (error) return <Err />
```

### Loading State Pattern
```typescript
imp

// Button loading
<Button disabled={isLoading}
ull}
  Submit
</Button>
```

### API Route Pattern (Hono)
script
import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "../lib/db";

const users = new Hono();

users.post("/", async (c) => {
  try {

    const validatedData = userSchema.parse(body);
    
    const user = await prisma.user.create({
      data: validatedData
    });
    
    return c.json({ success: true, data: user }, 201);
ror) {
    if (error inst {
      return c.json({ error: "Validation f
    }
    return c.json({ error: "Internal server error" }, 500);
  }
});

s;
```

### React Component Pattern (Required)
script
"use client";

import { ErrorBoundary } from '@ary'
import { useAuth } from "@/contexts/auth-context";
;
import { cn } f

interface Componops {
ing;
  children?: React.ReactNode;
}

export default function Component({ clProps) {
  const { isAuthenticated, user } = useAuth();
  

    <ErrorBoundary>
      <div className={cn("base-styles", className)}>

      </div>
    </ErrorBoundary>
  );
}
```

### Error Handling Pattern
```typescript
// ✅ Good: Comprehensive error handling

  const result = awaiData();
  return { success: true, data: result };
rror) {
  console.error('API ca;
  return { success: false, ere };
}

// ❌ Bad:

  return await fetchData();
} catch (e) {
  cg(e);
}
```

## Next Implementation Steps
Based on current state,  are:
1. **Database Connection**: Set up l
s
3. **Form Data PersistencAPI
ategy

Always ase.n the codebat exists ion about whormatie infaccurator the most state.md` fcurrent-ng/teeriFoundation/sference `re