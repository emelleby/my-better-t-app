# Steering Documentation

_Last Updated: August 4, 2025_

This directory contains the project's steering documentation, organized into two clear categories to serve both human developers and AI agents effectively.

# Archon Integration & Workflow

**CRITICAL: This project uses Archon for knowledge management, task tracking, and project organization.**

## Core Archon Workflow Principles

### The Golden Rule: Task-Driven Development with Archon

**MANDATORY: Always complete the full Archon task cycle before any coding:**

1. **Check Current Task** → Review task details and requirements
2. **Research for Task** → Search relevant documentation and examples
3. **Implement the Task** → Write code based on research
4. **Update Task Status** → Move task from "todo" → "doing" → "review"
5. **Get Next Task** → Check for next priority task
6. **Repeat Cycle**

**Task Management Rules:**
- Update all actions to Archon
- Move tasks from "todo" → "doing" → "review" (not directly to complete)
- Maintain task descriptions and add implementation notes
- DO NOT MAKE ASSUMPTIONS - check project documentation for questions

## 📋 Quick Navigation

### Current State Documentation (✅ What Exists Now)

These documents accurately reflect what is currently implemented in the codebase:

- **[current-state.md](./current-state.md)** - Comprehensive audit of what actually exists vs what doesn't
- **[tech.md](./tech.md)** - Technology stack, versions, and command reference
- **[structure.md](./structure.md)** - Project file organization and naming conventions
- **[MAIN.md](./MAIN.md)** - Coding standards and rules (applicable to current code)

### Development Guidelines (🔄 Future Implementation Guides)

These documents provide patterns and standards for future development:

- **[development.md](./development.md)** - Development workflow and project standards
- **[api-best-practices.md](./api-best-practices.md)** - Patterns for implementing API features
- **[ui-best-practices.md](./ui-best-practices.md)** - Patterns for implementing UI components
- **[database-best-practices.md](./database-best-practices.md)** - Patterns for database design
- **[testing-best-practices.md](./testing-best-practices.md)** - Testing strategy and patterns

### Specialized Documentation

- **[decision-log.md](./decision-log.md)** - Record of architectural decisions
- **[learning-journal.md](./learning-journal.md)** - Development insights and lessons learned
- **[documentation-evolution.md](./documentation-evolution.md)** - How documentation should evolve
- **[product.md](./product.md)** - Product vision and requirements

## 🎯 How to Use This Documentation

### For Human Developers

1. **Start with [current-state.md](./current-state.md)** to understand what exists
2. **Check [tech.md](./tech.md)** for commands and technology details
3. **Reference appropriate best-practices files** when implementing new features
4. **Follow [MAIN.md](./MAIN.md)** coding standards

### For AI Agents

1. **Always read [current-state.md](./current-state.md) first** to understand actual implementation status
2. **Use future implementation guides** only when implementing new features
3. **Never assume patterns exist** unless confirmed in current-state.md
4. **Reference [tech.md](./tech.md)** for accurate command usage

## 🔍 Key Principles

### Clear Separation

- **Current State** documents reflect reality
- **Future Guidelines** provide implementation patterns
- Each document clearly indicates its category

### Accuracy First

- Current state documentation is regularly updated
- Future guidelines are marked as implementation guides
- No theoretical patterns presented as existing

### Single Source of Truth

- Avoid duplication between documents
- Cross-reference related information
- Maintain consistency across all files

## 📝 Maintenance Guidelines

### When to Update Current State Documentation

- ✅ New features implemented → Update current-state.md
- ✅ Technology versions changed → Update tech.md
- ✅ File structure changed → Update structure.md
- ✅ New coding patterns established → Update MAIN.md

### When to Update Future Guidelines

- 🔄 New best practices identified → Update relevant best-practices files
- 🔄 Development workflow changes → Update development.md
- 🔄 Architecture decisions made → Update decision-log.md

### Documentation Health Indicators

- Current state docs accurately reflect codebase
- Future guides clearly marked as implementation patterns
- No contradictions between documents
- Commands and examples work as documented

---

_This documentation structure ensures that developers and AI agents can quickly understand what exists versus what are patterns to follow for future development._
