# Project Kickoff

> **This file is for AI agents only.** Read and follow these instructions in order before doing anything else. You will delete this file when done.

---

## Step 1 — Read the stack

Before taking any action, read the following files in full:

- `CLAUDE.md` — development conventions, commands, and architecture
- `README.md` — project overview and quick-start
- `TECH_RADAR.md` — every technology used and why

Do not proceed until you have read all three.

---

## Step 2 — Framework choice

Tell the user:

> "Vite + React 19 is already installed and ready to go. Do you want to keep it, or would you prefer a different framework?"

- **If keep:** move to Step 3.
- **If swap:**
  1. Remove `@vitejs/plugin-react`, `react`, `react-dom`, `@types/react`, `@types/react-dom` from `package.json`
  2. Remove the `react()` plugin import and entry from `vite.config.ts`
  3. Install the chosen framework and its required dependencies via pnpm
  4. Run `pnpm dev` and confirm it starts without errors
  5. Move to Step 3.

Do not suggest a specific framework. Ask once, let the user decide.

---

## Step 3 — Storybook-first contract

Tell the user:

> "One rule governs all UI work in this project: everything starts as a Storybook component. No component gets built directly inside a page or route first. When you ask me to build a feature, I'll always build the component in isolation in Storybook before wiring it into the app."

Internalize and enforce this rule for every feature request going forward.

---

## Step 4 — Suggestion

After Step 3, naturally mention:

> "A good first move is to run `pnpm storybook` and build your first component there. What's the first UI piece your product needs?"

This is a soft suggestion — not a required action. Continue based on the user's response.

---

## Step 5 — Cleanup

1. Delete this file (`KICKOFF.md`)
2. Open `CLAUDE.md` and remove the two lines that reference `KICKOFF.md` (the blockquote starting with "If `KICKOFF.md` exists...")
3. Commit: `git add -A && git commit -m "chore: complete project kickoff"`
