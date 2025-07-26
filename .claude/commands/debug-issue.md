Please execute the following multi-agent GitHub issue debugging workflow for issue: $ARGUMENTS

Extract GitHub issue ID from URL and create debug directories. Do not add or manipulate .md files in project working directory!

Use `gh issue view [id]` where [id] is the issue number to view the issue!

## Agent Structure:

1. **Analysis Agent**: Analyze GitHub issue and codebase to understand the problem
2. **Investigation Agents** (3-10): Deep dive into different aspects of the codebase to find root causes
3. **Solution Agents** (1-3): Propose and validate potential fixes
4. **Implementation Agent**: Apply the selected fix(es)
5. **Verification Agent**: Test that the issue is resolved using automated testing and browsermcp

## Execution Instructions:

### 1. Issue Analysis Phase

- Extract issue ID from GitHub URL (e.g., https://github.com/user/repo/issues/123 → issue-123)
- Create debug directories: `debug/issue-{ID}/{comms,tracking,plans,analysis,fixes}`
- Fetch and analyze the GitHub issue content
- Create initial analysis in `debug/issue-{ID}/analysis/ISSUE-ANALYSIS.md`
- Define investigation scope and assign agent responsibilities

### 2. Investigation Phase

- Deploy 3-10 investigation agents based on issue complexity
- Each agent investigates specific aspects:
    - Code paths related to the issue
    - Recent changes that might have caused the problem
    - Dependencies and configuration
    - Error patterns and logs
    - User workflows and edge cases
- Document findings in `debug/issue-{ID}/analysis/AGENT-{N}-FINDINGS.md`

### 3. Communication Protocol

- Central communication file: `debug/issue-{ID}/comms/INTER-AGENT-COMMS.md`
- Required updates:
    - Agent ID and investigation area
    - Files being analyzed with timestamps
    - Key findings and hypothesis
    - Dependencies on other agents' findings
    - Questions for human review
    - Status updates with progress

### 4. Solution Development Phase

- Solution agents analyze all findings
- Propose multiple fix approaches in `debug/issue-{ID}/fixes/PROPOSED-SOLUTIONS.md`
- Evaluate pros/cons of each solution
- Primary agent selects best fix(es) based on:
    - Minimal code changes
    - Risk assessment
    - Alignment with existing patterns
    - Test coverage impact

### 5. Implementation Phase

- Create detailed implementation plan in `debug/issue-{ID}/plans/IMPLEMENTATION-PLAN.md`
- Apply selected fix(es) following established code conventions
- Document all changes made
- Run relevant tests and validation

### 6. Verification and Handoff

- Update tracking status in `debug/issue-{ID}/tracking/STATUS.md`
- Create summary of changes in `debug/issue-{ID}/fixes/APPLIED-CHANGES.md`
- **Browser Testing with browsermcp**: Use browser automation tools to verify fix works correctly:
    - Navigate to affected pages/features
    - Test user workflows related to the issue
    - Verify UI components render properly
    - Check for JavaScript errors in console
    - Test edge cases and error scenarios
    - Document browser test results in verification logs
- Wait for user confirmation that issue is resolved
- If not resolved, analyze what's still broken and iterate
- Archive debug session when confirmed working

## Error Handling:

- If GitHub issue cannot be accessed, request user to provide issue details
- If investigation reveals multiple unrelated issues, prioritize based on severity
- Log all blockers and uncertainties in communication file
- Request human guidance for architectural decisions

## Human Interaction Points:

- Confirm issue understanding before investigation
- Request clarification if issue description is ambiguous
- Get approval before applying potentially risky fixes
- Wait for user confirmation that fix resolves the issue
- Iterate based on user feedback if issue persists

## Success Criteria:

- Root cause identified and documented
- Fix applied with minimal side effects
- User confirms issue is resolved
- All debug artifacts archived for future reference

Issue URL to debug: $ARGUMENTS
