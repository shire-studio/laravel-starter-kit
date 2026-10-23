---
paths:
  - 'resources/js/**/*.js'
  - 'resources/js/**/*.jsx'
  - 'resources/js/**/*.ts'
  - 'resources/js/**/*.tsx'
  - 'resources/js/**/*.vue'
  - 'vite.config.ts'
  - 'tsconfig.json'
  - 'package.json'
  - 'auto-imports.d.ts'
  - 'components.d.ts'
---

# Vue auto imports

## Runtime identifiers
This project uses `unplugin-auto-import`, powered by unimport, for Nuxt-like runtime imports. Do not explicitly import runtime APIs registered in the `AutoImport` block in `vite.config.ts`. This includes the Vue preset, the listed Inertia and Reka APIs, `createSSRApp`, and named runtime exports from direct files under `resources/js/composables`.

Only direct composable files are scanned. Add an explicit glob in Vite before placing auto-imported composables in nested directories. Avoid export names that collide with Vue, Inertia, Reka, or another composable.

Keep type-only imports explicit. Explicitly import Wayfinder routes and actions, package APIs not registered in Vite, utilities under `resources/js/lib` and `resources/js/utils`, component index exports, and anything used as a JavaScript value rather than a template component.

Template auto-importing is disabled. Bind an auto-imported function in `<script setup>` before using it only in a template. Explicitly import functions that are not in the auto-import registry.

## Components
Vue components under `resources/js/components` and `resources/js/layouts` are auto-imported recursively for template use. Names include their directory namespace and collapse repeated prefixes, such as `UiButton`, `AuthCardLayout`, and `SettingsLayout`. The Sonner wrapper is the one exception and resolves as `UiToaster`, matching the React and Svelte kits.

Use Inertia `Link`, `Form`, `Head`, `Page`, and `Deferred` directly in templates. Reka components use the `Reka` prefix. Explicitly import component types and components needed as JavaScript values.

## Generated declarations
Never edit or commit `auto-imports.d.ts` or `components.d.ts`. Vite generates both files and `tsconfig.json` includes them. Auto-import declarations use overwrite mode so removed exports do not remain as stale globals.

Run `pnpm run build` to regenerate declarations from a clean state, then run `pnpm run test:lint` and `pnpm run test:types`.
