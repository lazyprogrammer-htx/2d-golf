# /fix-tests Command

Please execute the following multi-agent test failure resolution workflow for fixing all failing tests.

**IMPORTANT**: All agent communication, tracking, and status files MUST be created in the `debug/testing/` directory structure. Do not add or manipulate .md files in project working directory!

**Additional Instructions**: $ARGUMENTS

## Agent Structure:

1. **Test Analysis Agent**: Run tests, parse failures, and identify root causes
2. **Root Cause Fix Agents** (1-20): Each assigned to fix a specific root cause
3. **Coordination Agent**: Manage inter-agent conflicts and provide guidance
4. **Validation Agent**: Final test run and verification

## Execution Instructions:

### 1. Initial Test Analysis Phase

- Create debug directories: `debug/testing/{comms,tracking,plans,analysis,fixes}`
- Run `npm test` and capture complete output
- Parse all test failures and group by likely root cause patterns:
    - Component/file-based failures
    - Configuration/setup issues
    - Dependency/import problems
    - API/service integration failures
    - Database/state management issues
    - Type/validation errors
- Document analysis in `debug/testing/analysis/TEST-FAILURE-ANALYSIS.md`
- Create root cause assignments in `debug/testing/plans/ROOT-CAUSE-ASSIGNMENTS.md`

### 2. Root Cause Agent Deployment

- Deploy 1-20 agents based on number of distinct root causes identified
- Each agent gets assigned specific root cause with:
    - Unique root cause ID (RC-001, RC-002, etc.)
    - List of failing tests related to this root cause
    - Affected files and components
    - Estimated fix complexity
    - Dependencies on other root causes

### 3. Communication Protocol

- Central communication file: `debug/testing/comms/INTER-AGENT-COMMS.md`
- Required updates from each agent:
    - Agent ID and assigned root cause
    - Files being modified with timestamps
    - Current fix approach and progress
    - Dependencies on other agents' work
    - File conflicts or overlapping changes detected
    - Questions for coordination agent
    - Status updates with completion percentage

### 4. Root Cause Fix Implementation

- Each agent focuses solely on their assigned root cause
- Before modifying any file, agents must:
    - Check communication file for other agents working on same files
    - Log their intended changes with timestamps
    - Coordinate with conflicting agents through comms file
- Document fix approach in `debug/testing/fixes/RC-{ID}-FIX-PLAN.md`
- Implement fixes following established code conventions
- Run only tests related to their root cause for validation

### 5. Conflict Resolution Protocol

- If agents detect file conflicts:
    - Both agents pause and log conflict in comms file
    - Coordination agent analyzes conflict and provides guidance
    - Agents implement coordinated solution or sequential approach
- If agent's fix doesn't resolve their tests:
    - Check if another agent's changes affected their files
    - Log dependency issue in comms file
    - Request coordination agent guidance if needed
    - Attempt additional fix iteration

### 6. Individual Test Validation

- Each agent runs their subset of tests after implementing fix
- Document results in `debug/testing/tracking/RC-{ID}-STATUS.md`
- If tests still fail:
    - Check for interference from other agents' changes
    - Attempt one more fix iteration
    - If still failing, escalate to coordination agent

### 7. Final System Validation

- Validation agent runs complete `npm test` suite
- Document final results in `debug/testing/analysis/FINAL-TEST-RESULTS.md`
- If any tests still fail:
    - Identify which root cause agents need to iterate
    - Coordinate additional fix attempts
    - Repeat until all tests pass or maximum iterations reached

## Error Handling:

- If initial test run shows no failures, report success and exit
- If root cause analysis is unclear, request human guidance
- If agents repeatedly conflict, switch to sequential fixing
- If tests remain failing after maximum iterations, provide detailed failure report

## Human Interaction Points:

- Confirm root cause analysis before deploying fix agents
- Request guidance for complex architectural issues
- Get approval for significant code changes
- Provide progress updates at major milestones

## Success Criteria:

- All tests pass on final `npm test` run
- Root causes documented and fixed
- No unresolved conflicts between agents
- All debug artifacts archived for future reference

## File Structure:

```
debug/testing/
├── comms/
│   └── INTER-AGENT-COMMS.md
├── tracking/
│   ├── RC-{ID}-STATUS.md (per agent)
│   └── OVERALL-STATUS.md
├── plans/
│   └── ROOT-CAUSE-ASSIGNMENTS.md
├── analysis/
│   ├── TEST-FAILURE-ANALYSIS.md
│   └── FINAL-TEST-RESULTS.md
└── fixes/
    └── RC-{ID}-FIX-PLAN.md (per agent)
```

## Agent Coordination Rules:

- Maximum 3 agents can work on same file simultaneously
- All file modifications must be logged before implementation
- Agents must sync progress every 2 minutes via comms file
- If coordination agent detects deadlock, switch to sequential mode
- All agents must complete their assigned root cause before system validation

Execute this workflow to systematically fix all failing tests with coordinated multi-agent approach.
