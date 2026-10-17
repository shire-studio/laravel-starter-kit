<picture>
    <source media="(prefers-color-scheme: dark)" srcset="art/header-dark.png">
    <img alt="Logo for Laravel Starter Kit" src="art/header-light.png">
</picture>

<br/>
<br/>

<p>
    <a href="https://github.com/shire-studio/laravel-starter-kit/actions"><img src="https://github.com/shire-studio/laravel-starter-kit/actions/workflows/tests.yml/badge.svg" alt="Build Status"></a>
    <a href="https://packagist.org/packages/shire-studio/laravel-starter-kit"><img src="https://img.shields.io/packagist/v/shire-studio/laravel-starter-kit" alt="Latest Stable Version"></a>
    <a href="LICENSE.md"><img src="https://img.shields.io/packagist/l/shire-studio/laravel-starter-kit" alt="License"></a>
</p>

An end-to-end type-safe Laravel 13 starter kit with auto-generated TypeScript types, Vue 3, and shadcn-vue components for fast front-end prototyping. It combines Wayfinder, Laravel Data, and unplugin-auto-import to provide a Nuxt-like developer experience when writing Vue code within a Laravel Inertia application.

## Tech Stack

**Backend:** PHP 8.5+, Laravel 13, Inertia.js v3, Laravel Fortify, Spatie Laravel Data, Nuno Maduro's Essentials

**Frontend:** Vue 3, reka-ui, shadcn-vue, TypeScript, Tailwind CSS v4

**Type Generation:** Laravel Wayfinder (auto-generated route & action types), Spatie Laravel Data + TypeScript Transformer (auto-generated DTO types)

**DX Tooling:** Vite Plus, unplugin-auto-import, unplugin-vue-components, vite-plugin-watch

**Code Quality:** PHPStan (level max via Larastan), Rector, Pint, oxlint, oxfmt, Pest v5 (100% coverage)

## Features

- **Fully type-safe end-to-end** — Auto-generated TypeScript types for routes, actions, and Data Transfer Objects
- **Zero-config auto imports** — Vue APIs, composables, and components are auto-imported just like Nuxt
- **Auto-regenerating types** — Editing `app/Data` or `app/Enums` automatically triggers TypeScript type generation
- **Dark mode & appearance switching** — Built-in theme support with cookie-based persistence
- **Persistent sidebar state** — Collapsible sidebar remembers its state across requests
- **Complete authentication** — Login, registration, password reset, email verification, and two-factor authentication via Laravel Fortify
- **Action-oriented architecture** — Business logic lives in dedicated, immutable Action classes
- **Resource-based routing** — Controllers follow CRUD conventions (Cruddy by Design)
- **Preloaded assets** — Critical CSS and JS are automatically preloaded via Link headers

## Local Development

> **Requires [PHP 8.5+](https://php.net/releases/), [Node 22+](https://nodejs.org/), [pnpm](https://pnpm.io/) (used in CI), and a code coverage driver like [Xdebug](https://xdebug.org/docs/install).**
>
> SQLite is used by default for database, session, cache, and queue storage.

### Installation

The recommended way to start a project is the [starter kit CLI](https://github.com/shire-studio/laravel-starter-kit-cli). It works like the `laravel` installer, and it can also bring newer starter kit releases into your project later (see [Keeping Your Project Up to Date](#keeping-your-project-up-to-date)).

Install it globally with Composer:

```bash
composer global require shire-studio/laravel-starter-kit-cli
```

Make sure Composer's global bin directory is on your `PATH` (run `composer global config bin-dir --absolute` to find it). Then create a project:

```bash
starter-kit new example-app
cd example-app
```

This creates `example-app` from the latest stable release. You'll be asked whether to install and build the frontend with pnpm, and whether to initialise a git repository. Pass `--pnpm` / `--no-pnpm` and `--git` / `--no-git` to skip the questions, or `--force` to overwrite an existing directory.

If you'd rather not install the CLI, `composer create-project` works too:

```bash
composer create-project shire-studio/laravel-starter-kit --prefer-dist example-app
cd example-app
```

Either way, the project gets a `.starter-kit.json` file recording the release it was created from. Commit it, because the CLI reads it to work out which starter kit changes your project hasn't received yet.

### Setup

```bash
# Install dependencies, create .env, generate key, run migrations, and build assets
composer setup

# Start the development server (Laravel, queue, logs, and Vite)
composer dev
```

### Optional: Browser Testing

If you plan to use Pest's browser testing capabilities:

```bash
pnpm add playwright && pnpm exec playwright install
```

### Verify Installation

```bash
composer test
```

You should see 100% test coverage and all quality checks passing.

## Keeping Your Project Up to Date

Once you've built on the starter kit, you can't just pull in new releases, because your project has drifted from it. The CLI's `update` command handles this. Run it from the root of your project:

```bash
starter-kit update
```

The project must be in a git repository with no uncommitted changes, so everything the update does can be reviewed with `git diff` and undone with `git restore`. It can live inside a larger repository, such as a monorepo.

The CLI compares the release in your `.starter-kit.json` with the latest one and writes the changes to `.starter-kit-update/` (excluded from git). It then hands them to a coding agent of your choice, which merges them into your code, keeps your own changes and fixes anything the update breaks. Claude Code, Codex, Gemini CLI, OpenCode and Cursor are supported, and only the ones you have installed are offered. Pass `--agent=<agent>` to skip the question.

When the agent is done, the CLI shows the changed files and asks whether to mark the project as updated, which bumps the version in `.starter-kit.json`. Nothing is committed for you. Review the changes, run `composer test`, then commit.

A few things worth knowing:

- **Removed features stay removed.** If you deleted part of the starter kit, such as authentication, the update won't bring it back. The CLI can record these in `.starter-kit.json` so future updates remember them.
- **You can skip the agent.** `--agent=none` only prepares `.starter-kit-update/`. Follow `.starter-kit-update/PROMPT.md` yourself or give it to any agent you like.
- **Older projects** without a `.starter-kit.json` can still be updated. The agent works out which release the project started from and asks you to confirm it.

Update regularly. Small, frequent updates are much easier to review than one large jump across several releases. See the [CLI README](https://github.com/shire-studio/laravel-starter-kit-cli#update-an-existing-project) for every option.

## Available Commands

### Development

- `composer dev` starts Laravel's `artisan dev` process runner, which uses Multiplex to run the server, queue worker, Pail, and Vite
- `composer transform-types` — Manually regenerates TypeScript types from PHP Data and Enums

### Code Quality

- `composer lint` — Runs Rector (refactoring), Pint (PHP formatting), and Vite Plus (JS/TS/Vue linting and formatting)
- `composer test:lint` — Dry-run mode for CI/CD pipelines

### Testing

- `composer test:type-coverage` — Ensures 100% type coverage with Pest
- `composer test:types` — Runs PHPStan (level max) and TypeScript (`tsc --noEmit`) type checking
- `composer test:unit` — Runs Pest tests with 100% code coverage requirement
- `composer test` — Runs the complete suite (type coverage, unit tests, linting, static analysis)

### Maintenance

- `composer update:requirements` — Updates all PHP and NPM dependencies to latest versions

## Code Style

This project enforces a strict, automated code style across both PHP and JavaScript/TypeScript:

- **PHP:** Laravel Pint for formatting, Rector for automated refactoring and modernisation
- **JS/TS/Vue:** Vite Plus handles linting (oxlint) and formatting (oxfmt) via the `vp` CLI
- **Types:** 100% type coverage enforced on both PHP (PHPStan level max) and TypeScript (strict mode)

Run `composer lint` to auto-fix formatting across the entire codebase.

## Code Standards

- **Actions-Oriented Architecture:** Every operation is encapsulated in a single-action class
- **Cruddy by Design:** Standardised CRUD operations for all controllers, actions, and Inertia pages
- **Immutable-First:** Data structures favour immutability to prevent unexpected mutations
- **Fail-Fast:** Errors are caught at compile-time through strict static analysis, not at runtime
- **Strict Laravel Defaults:** Strict models, auto eager loading, immutable dates via [Essentials](https://github.com/nunomaduro/essentials)
- **AI Guidelines:** Integrated AI guidelines to assist in maintaining code quality and consistency

## Testing

The project uses [Pest](https://pestphp.com) with a comprehensive testing suite. The following standards are enforced:

- **100% code coverage** — the test suite will fail if coverage drops below 100%
- **100% type coverage** — every method, property, and parameter must be explicitly typed
- **Static analysis** — PHPStan at level max (maximum strictness)
- **Browser testing** — Pest browser tests powered by Playwright

Run the full suite with:

```bash
composer test
```

Or run individual checks:

```bash
composer test:unit            # Unit & feature tests
composer test:types           # PHPStan + TypeScript type checking
composer test:type-coverage   # Type coverage check
composer test:lint            # Linting dry-run
```

## Releasing

Releases are published by the **release** workflow, not from the Releases page. In the Actions tab, run it on `main` with the new version, for example `v1.5.0`.

The workflow writes the version to `.starter-kit.json`, commits it on top of `main`, tags that commit and publishes a GitHub release with generated notes. Every project created from the release then knows which version it started from, which the [starter kit CLI](https://github.com/shire-studio/laravel-starter-kit-cli) uses to update it later. The release commit is only reachable from its tag, so `main` itself never has a `.starter-kit.json`.

The workflow refuses versions that already exist or aren't newer than the latest release.

## Contributing

Contributions are welcome from everyone! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature` or `git checkout -b fix/my-fix`)
3. Make your changes
4. Ensure CI is passing (`composer test`)
5. Commit your changes (`git commit -m 'Add my feature'`)
6. Push to your branch (`git push origin feat/my-feature`)
7. Open a Pull Request

Please ensure all tests and quality checks pass before submitting your PR.

## License

This project was created by **Shire Studio** under the **[MIT license](LICENSE.md)**.
