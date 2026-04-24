# project-init

A CLI project initializer that generates common development configuration based on your tool selections.

## The Problem

- Starting a new project means repeating the same setup steps
- Tooling setup (ESLint, Prettier, Husky, commitlint) is easy to misconfigure
- It takes time to wire scripts, dependencies, and git hooks manually every time

## The Solution

project-init asks a few interactive questions, then scaffolds your project with the exact config you selected.

Current support: TypeScript

Planned support: Python

## Demo
![demo](./.github/assets/demo.gif)

## Features

- Interactive setup flow
- Creates project directory and base files
- Optional git initialization with branch and remote origin
- Optional ESLint setup
- Optional Prettier setup
- Optional lint-staged setup
- Optional Husky hooks setup
- Optional commitlint setup
- Optional automatic dependency installation
- Creates an initial git commit (when git is enabled)

## What Gets Generated

Always generated for TypeScript:

- package.json (with scripts based on selected tools)
- tsconfig.json
- src/index.ts

Conditionally generated:

- eslint.config.js (if ESLint enabled)
- .prettierrc.json and .prettierignore (if Prettier enabled)
- .husky/pre-commit (if Husky enabled)
- .husky/commit-msg and commitlint.config.ts (if commitlint enabled)
- .gitignore and git repository metadata (if git enabled)

## Requirements

- Node.js 20+
- Git (for git-related options)
- pnpm

## Installation

### Using npm
```bash
npm install -g @subratamondal/project-init
```
> [visit package page](https://www.npmjs.com/package/@subratamondal/project-init)

### Build from source

```bash
git clone https://github.com/subratamondal1029/project-init.git
cd project-init
pnpm install
pnpm build
pnpm link --global
```

> If global linking does not work in your shell, run `pnpm setup`, restart the terminal, then run `pnpm link --global` again.

## Usage

Run the initializer:

```bash
project-init
```

Then follow the interactive prompts.

## Example Flow

1. Choose TypeScript
2. Enter project name
3. Choose whether to initialize git
4. Choose your tooling stack (ESLint, Prettier, Husky, etc.)
5. Let project-init scaffold files and scripts
6. Start coding

## Roadmap

- Add Python project templates and toolchain setup
- Add more language presets over time

## Note
> Made for personal use; feel free to customize it for your own needs.

## License

MIT - Subrata Mondal
