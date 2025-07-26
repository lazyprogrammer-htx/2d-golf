Please execute the following multi-agent workflow for task: $ARGUMENTS

Carefully follow the directories.. Make the directory if necessary. Do not add or manipulate .md in project working directory!

## Agent Structure:

1. **Planning Agent**: Analyze task and create detailed execution plan
2. **Implementation Agents** (1-6): Execute specific components based on complexity
3. **Testing Agents** (1-3): Validate implementation with comprehensive tests
4. **Review Agent**: Final quality check and task completion

## Execution Instructions:

### 1. Planning Phase

- Create detailed task breakdown in `tasks/plans/$ARGUMENTS/PLAN.md`
- Define clear interfaces and naming conventions upfront
- Specify exact file paths, function names, and variable names to prevent conflicts
- Assign specific responsibilities to each implementation agent
- Define test criteria and expected outcomes

### 2. Implementation Phase

- Each agent works on assigned components following the plan
- Use semantic versioning for iterative improvements
- Document all design decisions in code comments
- Follow established naming conventions strictly
- Regularly sync progress via communication file

### 3. Communication Protocol

- Central communication file: `tasks/comms/$ARGUMENTS/INTER-AGENT-COMMS.md`
- Required updates:
  - Agent ID and current task
  - Files being modified with timestamps
  - Dependencies on other agents' work
  - Blockers or questions for human review
  - Completion status with checklist

### 4. Testing Phase

- Include unit tests, integration tests, and edge cases
- Document test coverage and results
- Keep all test artifacts for future regression testing

### 5. Iteration Guidelines

- Each iteration should have a clear goal
- Commit changes with descriptive messages
- Run tests after each significant change
- If tests fail, analyze and fix before proceeding
- Maximum 3 iterations per component unless critical issues

### 6. Review and Completion

- Review agent validates all requirements are met
- Update task status in `tasks/tracking/$ARGUMENTS/STATUS.md`
- Create summary report of changes made
- Archive all working files for future reference

## Error Handling:

- If conflicts arise, pause and request human intervention
- Log all errors with context in communication file
- Rollback changes if critical errors occur
- Maintain backup of working state before major changes

## Human Interaction:

- Ask for clarification if requirements are ambiguous
- Request approval before making architectural decisions
- Provide progress updates at major milestones
- Flag any scope creep or requirement changes

Task to execute: $ARGUMENTS
