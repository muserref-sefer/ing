This project is a fictional web application designed to assist the HR department in managing the company's employee information. The application provides an interface to add, edit, and list employees' details, including name, email, phone number, department, and position.

# INg - Employee management

This is a small web application that demonstrates a simple employee management UI built with Lit + Redux Toolkit. It includes pages for listing, adding and editing employees and some small components.

## Prerequisites

- Node.js (recommended: 22.x LTS). Newer Node versions may work but some tools expect LTS ranges.

## Install

```bash
npm install
```

## Development

Start the Vite dev server:

```bash
npm run dev
```

Open http://localhost:5173 (or the URL Vite prints).

## Build (production)

```bash
npm run build
```

Output is written to `dist/`.

## Tests

Unit tests use Vitest and run in a jsdom environment. Tests have been moved to the `tests/` folder (under `tests/src/...`) and are run together with any `src/**/*.test.ts` files.

Run tests:

```bash
npm test
```

Run coverage:

```bash
npm run coverage
```

Open the HTML coverage report at `node_modules/.cache/vitest/coverage/index.html` (or the `coverage` output configured by Vitest).

Notes:

- The project configures a TypeScript path alias `@` pointing to `src/`; editor tooling should respect `tsconfig.json`.
- `tsc` (TypeScript) is configured to exclude the `tests/` folder from production builds. Tests are not compiled into `dist/`.
