# Amit Raikwar | Portfolio Website

<a href="https://codecov.io/gh/onemanfighter/amitraikwar" >
<img src="https://codecov.io/gh/onemanfighter/amitraikwar/graph/badge.svg?token=3ZU2P4PLJA"/>
</a>

A premium, highly interactive portfolio website showcasing software development work, projects, and technical articles. Built with a modern front-end stack featuring 3D graphics, rich animations, localization, and a custom Markdown editor.

---

## 🙋‍♂️ About the Developer

**Amit Raikwar** is a Software Lead specializing in web and mobile cross-platform applications.

- **Raja Software Labs (4+ Years)**: Delivered high-impact features and led development teams.
- **SPAN.io Smart Electrical Panel**: Key React Native developer for smart IoT electrical panel mobile applications with real-time gRPC telemetry and advanced energy monitoring controls.
- **Google Home App**: Contributed to Kotlin/Android and Jetpack Compose implementations for smart thermostat/Wi-Fi onboarding and setup flows.
- **AI Research & Tooling**: Spearheaded internal research on AI-assisted coding tools (GitHub Copilot) and created development tutorials at RSL.

---

## 🛠️ Tech Stack

| Dependency           | Version               | Purpose                                             |
| :------------------- | :-------------------- | :-------------------------------------------------- |
| **React**            | `18.2.0`              | Core frontend framework                             |
| **TypeScript**       | `4.9.5`               | Strict static typing                                |
| **Chakra UI**        | `2.8.2`               | Reusable design components and styling system       |
| **Zustand**          | `4.5.2`               | Lightweight state management                        |
| **React Query**      | `5.66.0`              | Server-state synchronization & data fetching        |
| **Framer Motion**    | `11.1.9`              | Smooth physics-based layouts and animations         |
| **GSAP**             | `3.12.7`              | High-performance timeline and transition animations |
| **Three.js / Fiber** | `0.172.0` / `8.17.12` | 3D elements and interactive canvas rendering        |
| **TSParticles**      | `3.0.0`               | Particle system and visual background effects       |
| **React Router DOM** | `6.23.1`              | Client-side routing and navigation                  |
| **i18next**          | `23.11.2`             | Localization and multi-language support             |

---

## 🚀 Featured Portfolio Projects

1. **[Hourcoding.com](https://hourcoding.com)**: A comprehensive educational coding platform featuring over 300 tutorials across languages, frameworks, and libraries. Integrates custom UI libraries and search filters.
2. **[Mac OS Web Simulation](https://mac.amitraikwar.in)**: A rich desktop environment web simulation featuring draggable multi-windows, wallpaper selection, power controls, and lock screen security.
3. **[Top Apps AI](https://topappsai.com)**: A directory platform indexing over 2,000 artificial intelligence applications and agent networks with newsletters and categorization.
4. **[Telegramonic.com](https://telegramonic.com)**: An interactive list directories app for Telegram channels, groups, and bots, utilizing fuzzy search algorithms and social sharing.
5. **[Hourcoding UI & Galaxy UI Libraries](https://www.npmjs.com/package/@hourcoding/hourcoding-ui)**: Custom React/TypeScript component packages distributed via NPM to speed up frontend layouts.
6. **[Growboard](https://dashwave.amitraikwar.com)**: A life-management dashboard using Supabase integrations for tracking goals, projects, journals, and credentials.
7. **[TestCov.com](https://testcov.com)**: An upcoming coverage parsing dashboard built to interpret raw test metrics (Jest, Mocha) in user-friendly visual graphs.

---

## 📁 Directory Structure

```text
/
├── .claude/               # Claude Code specific agent guides and skills
├── public/                # Static assets, favicon, and template index.html
├── src/                   # React TypeScript source code
│   ├── assets/            # Global images, icons, and SVG assets
│   ├── components/        # Reusable visual widgets (Cursor, Marquee, FallingText, etc.)
│   ├── data/              # Static dataset modules (Work, Projects, Contact data)
│   ├── hooks/             # App-wide custom React hooks
│   ├── localization/      # Locales mapping (JSON assets) and config
│   ├── providers/         # Global context wrappers (Theme, Router, Localization)
│   ├── router/            # Public client-side route configurations
│   ├── screens/           # Main screen flows (Work, Projects, Articles, Editor)
│   ├── store/             # Zustand state slices and hooks
│   ├── index.css          # Base stylesheets and CSS custom variables
│   ├── index.tsx          # Main entry bootstrap
│   └── App.tsx            # Root application layout
├── package.json           # Scripts and package dependencies
├── craco.config.js        # Craco Webpack/Babel configuration overrides
├── tailwind.config.js     # Tailwind CSS utility configuration
└── tsconfig.json          # TypeScript compilation settings
```

---

## ✨ Unique Features

- **Interactive 3D / Physics Elements**: Canvas rendering using React Three Fiber, custom particle effects, and dynamic falling text with physics.
- **Dynamic Theme & Custom Cursor**: Smooth custom fluid cursor that tracks mouse movements and scales interactively based on hovering element types. Disables automatically on touch/mobile viewports to optimize touch scrolling.
- **Multilingual Support**: Fully localized using `i18next` configuration with custom translation resources.
- **Rich Article Editor & Viewer**: Markdown-based article editor featuring live preview rendering using `@mdxeditor/editor` and `@uiw/react-markdown-preview`. Includes a responsive reading screen with a custom glassmorphism sorting menu, interactive metadata actions, and comment logs.
- **Spotlight Cards**: Mouse-hover spotlight shadow/gradient effects mimicking high-end landing page elements.
- **Responsive Layout & Mobile Optimizations**: Fully responsive portfolio pages featuring responsive grids, auto-hiding sidebars when reading, spring-animated floating menus for social links, and touch-interactive timeline elements.

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: `>=16.x`
- **Yarn**: `Yarn Berry (v4)`

### Installation

Install dependencies:

```bash
yarn install
```

### Running Locally

To launch the hot-reloading development server:

```bash
yarn start
```

By default, the local server will run on [http://localhost:3000](http://localhost:3000).

### Building for Production

To generate a minified production build in the `build/` folder:

```bash
yarn build
```

---

## 🧪 Testing and Formatting

Run the Jest test suite:

```bash
yarn test
```

Format code via Prettier:

```bash
yarn prettier:write
```

Analyze and autofix code quality issues using ESLint:

```bash
yarn lint:fix
```

---

## 🤝 Contribution & JIRA Integration

This repository follows standard Git and Jira tracking conventions:

- **Jira Project Prefix**: All branch names and commit scopes must use the project prefix `AR` (e.g. `AR-12`).
- **Branch Naming Pattern**: `amitraikwar/{ticket-number}/{short-description}` (e.g. `amitraikwar/AR-20/update-readme`).
- **Commit Workflow**: Run `make commit` for interactive conventional commit prompting. Commits must include a detailed multi-line explanation in the body.
