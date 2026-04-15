import type { TsState } from "@/types/state.type.js";

// typescript project answer state with default value
export const tsState: TsState = {
  packageManager: "pnpm",
  eslint: true,
  prettier: true,
  lintStaged: true,
  husky: true,
  preCommit: "pnpm run lint:stage",
  commitLint: true,
  installDeps: true,
};
