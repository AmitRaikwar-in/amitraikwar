---
name: readme
description: Guidelines, template structures, and standards for writing, formatting, and updating README files across the project.
trigger: /readme
---

# README Standard Writing Guidelines

This skill defines the standards for creating, updating, and formatting README files across the portfolio repository. Maintaining clean, technically accurate, and easily readable documentation ensures developers and agents can quickly understand the system's architecture, dependencies, and entry points.

---

## 1. Core Principles

1. **Concise Prose**: Keep sentences tight, direct, and active. Avoid fluff and verbose descriptions. Let diagrams, code blocks, and tables do the heavy lifting.
2. **Visual Hierarchy**: Use Markdown headers (`#`, `##`, `###`), horizontal rules (`---`), and lists to structure information cleanly.
3. **No Placeholders**: Never include empty placeholders (e.g., `TODO`, `insert here`). Use concrete, working examples.
4. **Self-Documenting Code / Shell Commands**: Provide explicit commands rather than generic descriptions.
5. **Interactive Diagrams**: Document complex interactions and system design visually using Mermaid diagrams rather than large walls of text.

---

## 2. Standard README Structure

The repository README should follow this structured sequence of sections:

### 1. Title & High-level Pitch

- Must start with a clear H1 representing the project name: `# Portfolio Website`
- A single concise paragraph summarizing what the application does, the core technologies used, and its main purpose.

### 2. Architectural / Data Flow Diagram

- A styled `mermaid` flowchart or sequence diagram depicting key components, state boundaries, or rendering layers.

### 3. Table of Contents

- A linked Markdown list pointing to all subsequent headers.

### 4. Directory Structure

- A clean ASCII tree diagram of the project folder. Key files and subfolders must have short, inline comments describing their role.
- Example:
  ```
  src/
  ├── components/      # Reusable UI widgets
  └── App.tsx          # Root Application
  ```

### 5. Tech Stack & Dependencies

- A markdown table listing primary packages, versions, and specific purposes.
- Example:
  | Dependency | Version | Purpose |
  |:---|:---|:---|
  | `react` | 18.2.0 | Frontend core framework |

### 6. Getting Started & Installation

- **Prerequisites**: Clear list of system level tools required (e.g., Node/Yarn version).
- **Step-by-step Commands**: Code blocks detailing how to install, build, run in dev mode, and run tests.

---

## 3. Formatting Standards

### Markdown Best Practices

- **Alerts**: Use GitHub-style warnings and notes to highlight critical information:
  > [!IMPORTANT]
  > Always run tests to verify layout stability before raising a PR.
- **Code Fences**: Always specify the language name for syntax highlighting (e.g., `typescript`, `bash`, `env`, `json`, `mermaid`).
- **Tables**: Align header columns cleanly for readability. E.g., `|:---|:---|` for left-aligned columns.

### Mermaid Diagram Guidelines

- Use customized color classes for nodes to make diagrams visually distinct:
  ```mermaid
  classDef client fill:#eef2ff,stroke:#6366f1,stroke-width:2px,color:#1e1b4b;
  classDef server fill:#fdf2f8,stroke:#ec4899,stroke-width:2px,color:#500724;
  ```
- Always quote labels containing parentheses, brackets, or commas to avoid rendering errors. E.g., `node["Label Name (Detail)"]`.

---

## 4. Maintenance Rule

Whenever a source code modification introduces changes to:

1. Routing paths or screen setups.
2. In-memory state keys or state structures.
3. Dependencies and tech stack versions.
4. Environment configurations.

You **MUST** immediately update the corresponding `README.md`. This requirement is enforced by the rule defined in [.claude/CLAUDE.md](file:///Users/mr.robot/z-stash/AmitRaikwar-in/amitraikwar/.claude/CLAUDE.md).
