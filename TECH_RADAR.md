# Tech Radar

A breakdown of every technology, library, and tool used in this project, organized by category, with rationale for each choice.

---

## Core Framework

### React 19

**Status:** Adopt

The UI library. React 19 brings the stable Actions API, improved `use()` hook, and better server rendering primitives. We use it in client-side SPA mode via `react-dom`. Chosen for its ecosystem maturity, component model, and first-class TypeScript support.

### TypeScript ~5.9

**Status:** Adopt

All source files are `.ts` / `.tsx`. TypeScript provides compile-time safety, better IDE tooling, and serves as living documentation for component APIs. The `~5.9` pin keeps us on a stable minor while allowing patch updates.

### Vite 8

**Status:** Adopt

The build tool and dev server. Vite's native ESM dev server gives near-instant cold starts and HMR. Vite 8 is the latest major; it handles both the dev server and the production bundle (`tsc -b && vite build`). All plugins (Tailwind, React, varlock, Storybook test) integrate through the unified `vite.config.ts`.

---

## Styling

### Tailwind CSS v4

**Status:** Adopt

CSS utility framework. v4 is a ground-up rewrite that drops `tailwind.config.js` in favor of a **CSS-first config**. Design tokens are defined directly in `src/styles/tokens.css` using `@theme {}` (generates utility classes like `bg-accent-600`) and `:root {}` (semantic aliases used via `var(--color-primary)`). This keeps tokens co-located with CSS, removes the JS config indirection, and makes the token system inspectable in DevTools without extra tooling.

### Geist

**Status:** Adopt

The font family (`geist` npm package). Geist is Vercel's open-source typeface optimized for code and UI. It ships both a sans and mono variant via a simple npm package, avoiding external font CDN requests.

---

## Testing

### Vitest 4

**Status:** Adopt

The unit test runner. Vitest reuses the Vite config, so there is no separate Babel/Jest transform pipeline. Two projects run under a single `vitest` invocation:

1. **jsdom project** — fast, headless unit tests co-located with components (`*.test.tsx`).
2. **storybook project** — runs every Story as a test inside headless Chromium via `@storybook/addon-vitest`.

`pnpm test` and `pnpm test:run` cover both projects.

### @storybook/addon-vitest

**Status:** Adopt

Bridges Storybook and Vitest. Each Story becomes a browser-based test without writing a separate spec file. The `storybookTest()` Vite plugin injects the Storybook runtime into Vitest's browser mode, so stories run with the same rendering fidelity as the dev server.

### Playwright

**Status:** Adopt

End-to-end test runner (`e2e/`). Playwright drives real Chromium and supports parallel, isolated browser contexts. Used for full-page flows and the mandatory accessibility audit on every route (see `e2e/a11y.spec.ts`). The Playwright web server config auto-starts `pnpm dev` before the suite runs.

### @axe-core/playwright

**Status:** Adopt

Injects axe-core into Playwright tests to run automated WCAG accessibility checks. Every page listed in `e2e/pages.ts` is audited automatically — no per-page test code needed. This enforces a baseline accessibility contract on every route.

### @testing-library/react + @testing-library/user-event + @testing-library/jest-dom

**Status:** Adopt

Testing Library provides a user-centric query API (`getByRole`, `getByLabelText`, etc.) that encourages testing behavior over implementation. `user-event` simulates real browser interactions (typing, clicking) more faithfully than `fireEvent`. `jest-dom` adds readable DOM matchers (`toBeVisible`, `toHaveValue`, etc.) to Vitest's expect.

### @vitest/coverage-v8

**Status:** Adopt

V8-native code coverage — no instrumentation transforms needed. Generates coverage reports directly from the JS engine, keeping the test pipeline fast.

---

## Component Development

### Storybook 10

**Status:** Adopt

Component workshop and living style guide. Stories are co-located with components (`*.stories.tsx`). Non-component design system pieces (token docs, etc.) live in `src/design-system/`. Storybook serves as the primary environment for developing and reviewing components in isolation before they are wired into the app.

### @storybook/addon-a11y

**Status:** Adopt

Runs axe-core in the Storybook canvas panel for every story. Gives immediate accessibility feedback during component development, before code reaches a pull request.

### @storybook/addon-docs

**Status:** Adopt

Auto-generates documentation pages from JSDoc comments and TypeScript prop types. Keeps API docs in sync with the code without a separate documentation step.

### @chromatic-com/storybook

**Status:** Trial

Chromatic integration for visual regression testing and Storybook hosting. Provides a snapshot baseline per story that catches unintended UI changes in CI.

---

## Code Quality

### ESLint 9 (flat config)

**Status:** Adopt

Linter using the new flat config format (`eslint.config.js`). Active plugins:

- `@eslint/js` — core JS rules
- `typescript-eslint` — TypeScript-aware rules and parser
- `eslint-plugin-react-hooks` — enforces Rules of Hooks and exhaustive deps
- `eslint-plugin-react-refresh` — warns when HMR-incompatible exports are detected
- `eslint-plugin-storybook` — Story-specific lint rules
- `eslint-config-prettier` — disables ESLint rules that conflict with Prettier formatting

### Prettier 3

**Status:** Adopt

Opinionated formatter. Integrated with ESLint via `eslint-plugin-prettier` so formatting violations surface as lint errors. `pnpm format` writes all files; `pnpm format:check` is used in CI.

### Husky + lint-staged

**Status:** Adopt

Pre-commit hooks. Husky registers the hook; lint-staged runs ESLint `--fix` and Prettier on only the staged files (`.ts`/`.tsx`/`.json`/`.css`/`.md`). This keeps the feedback loop tight — only changed files are processed, keeping commits fast.

---

## Environment Management

### varlock

**Status:** Adopt

Type-safe environment variable manager. Defines the env schema once; `pnpm env:load` syncs the `.env` files and regenerates `env.d.ts` with the correct types. The `@varlock/vite-integration` Vite plugin exposes the validated variables to the Vite build. `env.d.ts` is auto-generated — it is committed but never edited by hand.

---

## Package Manager

### pnpm

**Status:** Adopt

Faster, disk-efficient alternative to npm/yarn. Uses a content-addressable store with hard links so packages are not duplicated across projects. The lockfile (`pnpm-lock.yaml`) gives deterministic installs. All scripts and CI commands use `pnpm`.
