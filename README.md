# Monorepo Homebase

This is a [Turborepo](https://turbo.build/) monorepo.

## Apps

- **[cwru-wordle](./apps/cwru-wordle)**: A Wordle clone built with Next.js.
- **[cwru-wtf](./apps/cwru.wtf)**: The main `cwru.wtf` application built with Next.js.

## Getting Started

### Install Dependencies

```sh
pnpm install
```

### Running Apps (Development)

To run all apps simultaneously in development mode with hot-reloading:

```sh
pnpm dev
```

The apps will be available on the following ports (check terminal output to confirm):

- **cwru-wordle**: [http://localhost:3000](http://localhost:3000)
- **cwru-wtf**: [http://localhost:3001](http://localhost:3001)

### Building and Running (Production)

To build all apps and start them in production mode:

```sh
pnpm build
pnpm start
```

### Running Specific Apps

To run commands for a specific app (e.g., `cwru.wtf`), use the `--filter` flag:

```sh
pnpm dev --filter=cwru-wtf
```
