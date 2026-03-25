# 🚀 Slop Stack — ship fast, skip the slop

A guardrailed template for building web apps with AI. Let agents write the code while the toolchain keeps it clean.

slop-stack gives you a modern TypeScript frontend with automated guardrails baked in: linting, formatting, type checking, unit tests, visual regression tests, accessibility audits, and pre-commit hooks. The goal is simple — let AI agents generate code fast while the toolchain catches the mistakes they make.

## Who is this for?

Anyone using AI to build software, from experienced developers to non-technical builders. Clone the template, start a conversation with your AI coding assistant, and the `KICKOFF.md` guide walks it through setting up your project.

## How it works

1. **Clone the template** and open it in an AI-powered editor (Claude Code, Cursor, etc.)
2. The AI reads `KICKOFF.md` and bootstraps your project — choosing your framework, establishing conventions
3. **Every UI component starts in Storybook** — built in isolation, tested automatically, then wired into the app
4. Guardrails run on every commit: ESLint, Prettier, type checks, and tests catch issues before they land

## Setup

```bash
pnpm install
pnpm env:load   # generate env.d.ts from schema
pnpm dev        # http://localhost:5173
```

## Commands

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `pnpm dev`       | Start dev server               |
| `pnpm build`     | Type-check + production build  |
| `pnpm lint`      | ESLint                         |
| `pnpm format`    | Prettier                       |
| `pnpm test`      | Unit + Storybook tests (watch) |
| `pnpm test:run`  | Unit + Storybook tests (CI)    |
| `pnpm test:e2e`  | Playwright e2e tests           |
| `pnpm storybook` | Storybook on :6006             |

## Stack

- **React 19** + **TypeScript** — default framework (swappable during kickoff)
- **Vite 8** — dev server and bundler
- **Tailwind CSS v4** — CSS-first config, design tokens in `src/styles/tokens.css`
- **Storybook 10** — component development, documentation, and visual testing
- **Vitest 4** — unit tests (jsdom) and Storybook story tests (Chromium)
- **Playwright** — e2e tests with axe-core accessibility checks on every route
- **varlock** — type-safe environment variables
- **husky + lint-staged** — pre-commit formatting and linting
- **Renovate** — automated dependency updates

See [`TECH_RADAR.md`](TECH_RADAR.md) for detailed rationale behind every technology choice.

## Enabling Renovate

Renovate keeps dependencies up to date by opening PRs automatically. To enable it:

1. Install the [Renovate GitHub App](https://github.com/apps/renovate) on your repo
2. Renovate will open an onboarding PR — merge it to activate
3. From then on, Renovate opens PRs for dependency updates based on `renovate.json`
