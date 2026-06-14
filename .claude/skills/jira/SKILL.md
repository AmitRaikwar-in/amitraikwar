---
name: jira
description: Comprehensive management of Atlassian Jira and Confluence resources, enforcing project scope (Amit Raikwar Portfolio, Key: AR), platform prefixes, labeling standards, and issue templates.
trigger: /jira
---

# Jira & Confluence Management Ruleset

This ruleset defines the standard patterns for interacting with Atlassian resources. **All operations MUST target the Amit Raikwar Portfolio environment.**

## 1. Target Environment

- **Jira Project Name:** `Amit Raikwar Portfolio`
- **Jira Project Key:** `AR`
- **Confluence Space Key:** `AR` (Amit Raikwar Portfolio)
- **Cloud Instance:** `ar1603.atlassian.net`

> [!IMPORTANT]
> Every Jira issue created or modified MUST use `projectKey: "AR"`.
> Every Confluence page created or searched MUST use `spaceId: "AR"` or `spaceKey: "AR"`.

## 2. Naming Conventions

- **Epic Linking:** EVERY Story, Task, and Bug MUST be linked to a corresponding Epic. When using the API, specify the Epic using the `parent: { "key": "EPIC-KEY" }` field.
- **Platform Prefixing:** Every ticket summary MUST start with a platform identifier in brackets:
  - `[Web]` for feature-related stories/tasks.
  - `[Core]` for shared or infrastructure-related tasks.
  - `[Design]` for UI/UX and styling tasks.
  - `[Testing]` for testing and quality assurance tasks.
- **Example:** `[Web] Implement project filtering on main dashboard`

## 3. Active Epics (Project: AR)

- **AR-1**: `[Core] Infrastructure & Dependencies`
- **AR-2**: `[Web] Portfolio Content & Features`
- **AR-3**: `[Design] Interactive Styling & Animations`
- **AR-4**: `[Localization] Translations & Accessibility`
- **AR-5**: `[Testing] Coverage & Quality Assurance`

## 4. Issue Types & Templates

> [!IMPORTANT]
> Unless explicitly specified otherwise, always use **Story** as the default issue type for new ticket requests.

### Story

Use for user-facing features and functionality.
**Description Template:**

```markdown
## Background:

## Details

## Acceptance criteria:

## Implementation notes.
```

### Task

Use for technical setup, maintenance, or infrastructure work. (Follow Story template structure if complex).

### Bug

Use for defects or errors.
**Description Template:**

```markdown
## Background:

## Details

## Acceptance criteria:

- {use number bullet points}
- {requirement 1}
- {requirement 2}

## Repro steps

## QA notes
```

### Epic

Use for high-level project goals or features.

## 5. Labeling

> [!IMPORTANT] > **Every ticket MUST have at least one platform-specific label (`Web`, `Design`, `Core`, or `Testing`).**

- Apply platform-specific labels (`Web`, `Design`, `Core`, `Testing`) to every issue for easy filtering.
- Link all stories and tasks to their corresponding **Epic**.

## 6. Workflow & Statuses

Standard project workflow statuses to target:

- **Story/Tasks:** Backlog, In Progress, In Review, Done, Won't do.
- **Bugs:** Backlog, In Progress, In Review, Done, Won't do, In Testing, Duplicate.

## 7. Field Requirements

- **Priority:** Must have a value. Do not attempt to set to null or clear via API as it is a required system field.
- **Description:** MUST use the templates defined in section 4. Provide a clear summary of work and explicit acceptance criteria.

## 8. Link Formatting (Strict Rule)

When adding comments via API (`addCommentToJiraIssue`):

1. **MUST** set `contentFormat: "markdown"`.
2. **MUST** use standard Markdown `[Title](URL)` syntax.
3. If title linkification is critical, provide the raw URL in parentheses after the title.
4. **DO NOT** use Wiki Markup `[Title|URL]` as it fails in ADF-default environments.
