# Multi-Agent Synchronization Hook

## Purpose
This hook ensures seamless collaboration between multiple AI coding assistants (Claude Code, Cursor, and Windsurf) by maintaining synchronized project context and coding standards across all agents.

## Hook Implementation

### File Watcher Setup
Monitor the `.kiro/steering/` directory for changes to any `.md` files. When changes are detected, automatically update agent-specific configuration files to maintain alignment.

### Triggered Actions
When changes occur in `.kiro/steering/*.md`:

1. **Extract Core Information**:
   - Project structure and technology stack
   - Development guidelines and conventions
   - Code quality rules and accessibility standards
   - Testing and deployment practices

2. **Generate Agent-Specific Configurations**:
   - **Claude Code**: Update `.claude/CLAUDE.md` with comprehensive project context
   - **Cursor**: Update `.cursorrules` with concise development rules
   - **Windsurf**: Update `.windsurfrules` with structured guidelines

3. **Ensure Consistency**:
   - Maintain identical core principles across all agents
   - Adapt format and verbosity to each agent's standards
   - Preserve agent-specific configuration patterns

### Implementation Script
```bash
#!/bin/bash
# File: scripts/sync-agents.sh

# Watch for changes in .kiro/steering directory
watch_directory=".kiro/steering"
agents=("claude" "cursor" "windsurf")

# Function to sync all agent configurations
sync_agents() {
    echo "Syncing agent configurations..."
    
    # Read all steering documents
    steering_content=""
    for file in $watch_directory/*.md; do
        if [[ -f "$file" ]]; then
            steering_content+="$(cat "$file")\n\n"
        fi
    done
    
    # Update Claude Code configuration
    generate_claude_config "$steering_content"
    
    # Update Cursor configuration  
    generate_cursor_config "$steering_content"
    
    # Update Windsurf configuration
    generate_windsurf_config "$steering_content"
    
    echo "Agent configurations synchronized successfully"
}

# Monitor changes and trigger sync
fswatch -o $watch_directory | while read num; do
    sync_agents
done
```

### Manual Sync Command
```bash
# Add to package.json scripts
"sync-agents": "node scripts/sync-agents.js"
```

## Benefits

1. **Consistent Experience**: All agents operate with the same understanding of project standards
2. **Reduced Context Switching**: Developers can switch between agents without re-explaining project requirements  
3. **Maintained Quality**: All agents enforce identical code quality and accessibility standards
4. **Automated Maintenance**: No manual effort required to keep agent configurations in sync
5. **Version Control**: All agent configurations are tracked and versioned together

## Usage

1. Make changes to any file in `.kiro/steering/`
2. The hook automatically detects changes and updates all agent configurations
3. All coding agents now have synchronized understanding of the project
4. Continue development with any preferred agent

This approach ensures that whether you're using Claude Code for complex refactoring, Cursor for rapid development, or Windsurf for collaborative coding, all agents maintain consistent behavior and quality standards.