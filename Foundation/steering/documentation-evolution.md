# Documentation Evolution Protocol

## Philosophy

Documentation should be **reactive to implementation, not predictive of it**. We document what we actually build, learn from real decisions, and evolve our understanding based on experience rather than theory.

## Current State Principle

All steering documents should accurately reflect the **current state** of the project, not aspirational or theoretical patterns. If a feature doesn't exist, it shouldn't be documented as if it does.

## Documentation Update Triggers

Update steering documents when:

1. **New Feature Implemented**: After completing any new functionality
2. **Architecture Decision Made**: When choosing between implementation approaches
3. **Pattern Discovered**: When we notice a recurring pattern in our code
4. **Technology Added/Changed**: When adding new dependencies or changing tools
5. **Lesson Learned**: When we discover something that changes our approach

## Update Process

### 1. Identify Affected Documents

- Which steering documents need updates based on the change?
- What new patterns or decisions need to be captured?

### 2. Update with Real Examples

- Use actual code from the implementation
- Document the real decision-making process
- Include context about why choices were made

### 3. Remove Outdated Information

- Delete theoretical patterns that weren't implemented
- Update any information that's no longer accurate
- Archive decisions that were reversed

### 4. Capture Learnings

- What worked well?
- What didn't work as expected?
- What would we do differently next time?

## Documentation Types

### Current State Documents

- **tech.md**: Technologies actually in use
- **structure.md**: Actual project structure
- **product.md**: Current features and capabilities

### Evolution Documents

- **decision-log.md**: Record of architectural decisions
- **learning-journal.md**: Insights gained from implementation
- **pattern-library.md**: Patterns that emerged from real code

### Future-Oriented Documents (Minimal)

- Keep these minimal and clearly marked as "planned" or "under consideration"
- Regularly review and either implement or remove

## AI Agent Guidelines

When working on this project:

1. **Read Current State First**: Always check what actually exists before implementing
2. **Document After Implementation**: Update steering documents after completing work
3. **Question Outdated Patterns**: If documentation doesn't match reality, flag it for update
4. **Capture Decision Context**: When making choices, document why you made them

## Review Schedule

- **After Each Feature or completed task**: Update relevant documents and tell the user to run `./scripts/folder_sync.sh` to update the steering documents.
- **Weekly**: Review all documents for accuracy
- **Monthly**: Archive outdated information and consolidate learnings

## Success Metrics

Good documentation evolution means:

- Documentation accurately reflects the current codebase
- New team members can understand the project from the docs
- Patterns are based on real implementation experience
- Decision context is preserved for future reference
- Documentation grows organically with the project

## Anti-Patterns to Avoid

- **Premature Documentation**: Don't document patterns before implementing them
- **Theoretical Examples**: Don't use hypothetical code examples
- **Stale Information**: Don't let documentation drift from reality
- **Over-Documentation**: Don't document every possible scenario upfront
- **Pattern Forcing**: Don't force implementations to match documentation
