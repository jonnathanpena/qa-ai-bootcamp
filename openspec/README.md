# OpenSpec

This repo uses [OpenSpec](https://github.com/openspec-dev) to drive spec-first, AI-assisted
development. The flow below is the exact copy-paste sequence used while building this project.

## CLI Workflow

```bash
# Initialize OpenSpec in an existing project
npx openspec init

# Check current state
npx openspec status

# Propose a new change
npx openspec propose "add Playwright insurance suite"

# See the next task to work on
npx openspec next

# Apply the change (execute tasks)
npx openspec apply

# Validate the change
npx openspec validate
```

## Directory Layout

```
openspec/
  project.md                                  # project context (what/why)
  specs/
    insurance-portal.md                        # living spec: capabilities + acceptance criteria
  changes/
    add-playwright-insurance-suite/
      proposal.md                              # why this change, what it proves
      design.md                                # architecture decisions
      tasks.md                                 # numbered execution checklist
    add-k6-load-tests/
      proposal.md
      design.md
      tasks.md
```

## Example AI Assistant Prompts Used During This Workflow

1. "Given `openspec/specs/insurance-portal.md`, generate the Page Object Model classes for the
   policy dashboard and health quote flow."
2. "Review the proposed design in
   `openspec/changes/add-playwright-insurance-suite/design.md` and identify any missing edge
   cases for claim document upload."
3. "Based on `tasks.md`, implement task 3 (Page Objects) and task 4 (beginner specs), then update
   the spec if you discover new behaviors."
