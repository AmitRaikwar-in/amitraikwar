# CLAUDE.md

This file provides a high-level entry point for Claude-based tools working in the **Amit Raikwar Portfolio** repository.

## Overview

This is a **React Web Application** (using Craco for configuration) representing Amit Raikwar's portfolio website.

- **Web Framework**: React 18.2+
- **Styling**: Chakra UI v2 (Space Mono typography, brand colors) and Tailwind CSS
- **State Management**: Zustand, React Query
- **Animations/Graphics**: Framer Motion, GSAP, React Three Fiber (Three.js), TSParticles
- **Routing**: React Router DOM v6

## 📘 Primary Documentation

For comprehensive technical documentation, architectural decisions, file conventions, and agent-specific skills, always refer to the Agent Guide section:

👉 **[Agent Guide](#AGENT)**

## 💻 Code Style Guidelines

- **React Components**: Avoid using `React.FC` or `React.FunctionComponent` to define functional components. Instead, type props directly in the function arguments: `const MyComponent = ({ prop1 }: Props) => { ... }`.

## Essential Commands

These are the most common commands for development:

```bash
yarn install                   # Install all dependencies
yarn start                     # Start local development server
yarn build                     # Create production build for web
yarn test                      # Run Jest tests
yarn prettier:write            # Format code with Prettier
yarn lint                      # Run ESLint and check issues
yarn lint:fix                  # Run ESLint and fix web issues
```

## Antigravity Skills

Advanced agent instructions are modularized in the `.claude/skills/` directory.

- [Commit Workflow](file:///Users/mr.robot/z-stash/AmitRaikwar-in/amitraikwar/.claude/skills/commit/SKILL.md)
- [Jira Management](file:///Users/mr.robot/z-stash/AmitRaikwar-in/amitraikwar/.claude/skills/jira/SKILL.md)
- [Pull Request Skill](file:///Users/mr.robot/z-stash/AmitRaikwar-in/amitraikwar/.claude/skills/pr/SKILL.md)
- [Frontend Design](file:///Users/mr.robot/z-stash/AmitRaikwar-in/amitraikwar/.claude/skills/frontend-design/SKILL.md)
- [Web Development](file:///Users/mr.robot/z-stash/AmitRaikwar-in/amitraikwar/.claude/skills/web/SKILL.md)
- [README Guidelines](file:///Users/mr.robot/z-stash/AmitRaikwar-in/amitraikwar/.claude/skills/readme/SKILL.md)

## 🌐 Localization Guidelines

All user-facing copy strings (headings, paragraphs, labels, button texts, tooltips, placeholders, etc.) MUST be defined in the localization JSON files located in `src/localization/locales/` (`main.json`, `common.json`, and `error.json` under each locale directory) and retrieved dynamically in code using the `useTranslation` hook (`t('key')`). Never hardcode text strings directly in component files.

## 🧪 Testing Guidelines

Always add or update the unit tests (and their snapshots) to align with the requested feature implementations or changes. Run the test suite using `yarn test` to verify that all changes are fully covered, correct, and pass successfully.

---

# AGENT

This section serves as the primary source of truth for AI agents working on the **Amit Raikwar Portfolio** project. It provides architectural context, directory structures, and established development patterns.

## 1. Project Overview

| Core Stack           | Technology                                                                       |
| :------------------- | :------------------------------------------------------------------------------- |
| **Framework**        | [React 18.2+](https://react.dev/)                                                |
| **UI Library**       | [Chakra UI v2](https://v2.chakra-ui.com/)                                        |
| **State Management** | [Zustand v4](https://zustand.docs.pmnd.rs/)                                      |
| **Routing**          | [React Router DOM v6](https://reactrouter.com/)                                  |
| **Styling**          | Vanilla CSS + Chakra UI v2 + Tailwind CSS                                        |
| **Language**         | [TypeScript](https://www.typescriptlang.org/)                                    |
| **Testing**          | Jest + React Testing Library + Cypress                                           |
| **Package Manager**  | [Yarn 4](https://yarnpkg.com/)                                                   |
| **Aesthetic**        | Interactive, Dark mode, Dynamic elements (canvas, physics text, spotlight cards) |
| **Brand Colors**     | Black background (#000000) & Violet/Blue details                                 |

## 2. Directory Structure

```text
/
├── .claude/                # Agent skills and settings
├── src/                    # Primary source code
│   ├── assets/             # Global assets, icons & media mapping
│   ├── components/         # Reusable UI components (custom cursor, marquee, etc.)
│   ├── data/               # Static dataset files (Projects, Work, Contact details)
│   ├── hooks/              # Custom React hooks (useMoveToTop, etc.)
│   ├── localization/       # Locale configuration & translation JSON resources
│   ├── providers/          # App-wide React context providers (Theme, Router, Locales)
│   ├── router/             # React Router routing definition and public routes
│   ├── screens/            # Complete screen flows (Main flow, projects, articles)
│   ├── store/              # Zustand slices and hooks
│   ├── index.tsx           # React bootstrap script
│   └── App.tsx             # Root Application component
├── public/                 # Static public files & index.html
├── craco.config.js         # Webpack and craco configuration
├── tsconfig.json           # TS compile configuration
├── tailwind.config.js      # Tailwind configurations
└── package.json            # Main package dependencies & scripts
```

## 3. Development Patterns & Rules

### State Management (Zustand)

- **Selectors**: Use appropriate selector patterns when extracting state variables to prevent unnecessary re-renders.
- **Testing**: State updates within tests MUST be wrapped in `act()` from `@testing-library/react`.

### TypeScript

- All files use `.ts` or `.tsx`.
- Adhere to path aliases defined in `tsconfig.path.json` (e.g., `@components`, `@data`, `@providers`, `@screens`).

## 4. Testing & Verification

- **Unit/Integration**: `yarn test`
- **Build**: `yarn build` (Always verify build compatibility after modifications).

## 5. Agent Workflow

1.  **Understand**: Review this file and `.claude/CLAUDE.md`.
2.  **Verify**: Always run `yarn lint` and `yarn test` before declaring a task complete.
3.  **Documentation**: Always check if a README update is required for any modified components.
4.  **Governance**: Follow Conventional Commits and link all changes to the **Amit Raikwar Portfolio** Jira project using `prefix/AR-XXX` branch naming.

---

© 2026 Amit Raikwar Portfolio | Confidential and Proprietary
