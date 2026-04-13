# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **If `KICKOFF.md` exists in the project root, read it and follow it before doing anything else.**

> **This is a template.** Once you know what the user is building, update this file to reflect the actual project — its purpose, domain-specific conventions, and any decisions made during kickoff.

## Commands

```bash
pnpm dev              # start Vite dev server
pnpm build            # tsc + vite build
pnpm lint             # eslint
pnpm format           # prettier --write
pnpm test             # vitest watch (unit + storybook tests)
pnpm test:run         # vitest run (CI mode)
pnpm test:e2e         # playwright e2e tests
pnpm storybook        # Storybook dev server on :6006
```

Run a single unit test file:

```bash
pnpm vitest run src/components/Button/Button.test.tsx
```

## Architecture

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4. Package manager is pnpm.

**CSS / Design tokens:** Tailwind v4 uses a CSS-first config — no `tailwind.config.js`. Tokens live in `src/styles/tokens.css` and are imported by `src/index.css`. Two layers:

- `@theme {}` — defines the token scales (`--color-neutral-*`, `--color-accent-*`, `--font-sans`). These generate Tailwind utility classes (`bg-accent-600`, `text-neutral-900`, etc.).
- `:root {}` — semantic aliases (`--color-primary`, `--color-primary-hover`, etc.). These do **not** generate utilities; use them as `var(--color-primary)` or `bg-[var(--color-primary)]`.

**Testing — two separate runners:**

- `vitest` (jsdom) — unit tests co-located with components (`*.test.tsx`)
- `vitest` (storybook project) — runs Storybook stories as tests in a headless Chromium browser via `@storybook/addon-vitest`
- `playwright` — e2e tests in `e2e/`. All pages must have axe-core a11y coverage (see Accessibility section below).

Both vitest projects run together with `pnpm test` / `pnpm test:run`.

**Storybook:** Stories are co-located with components (`*.stories.tsx`). Non-component design system pieces (token documentation, etc.) live in `src/design-system/` and are picked up by the existing glob.

**Environment variables:** Validated at runtime by [zod](https://zod.dev) in `src/env.ts`. The schema is the single source of truth for both validation and types — `env` is exported as `z.infer<typeof envSchema>` and parsed eagerly at module load (fail-fast on missing/invalid vars). Always read env vars via the `env` export from `src/env.ts`; `import.meta.env.*` keys are typed `unknown` on purpose so the unsafe path is a TypeScript error. Add new vars by extending `envSchema` in `src/env.ts` and adding a matching line to `.env` (and `.env.example`, which is committed).

**Pre-commit hooks:** husky + lint-staged runs `eslint --fix` and `prettier --write` on staged `*.ts`/`*.tsx` files automatically.

## Accessibility testing

Every page/route must have axe-core e2e coverage.

**When adding a new page or route**, add an entry to `e2e/pages.ts`:

```ts
{ path: '/your-route', name: 'your-page-name' }
```

The test in `e2e/a11y.spec.ts` iterates over that list automatically — no other changes needed.
