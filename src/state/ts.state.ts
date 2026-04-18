import type { TsState as State } from "@/types/state.type.js";
import { AVAILABLE_PACKAGE_MANAGERS } from "@/constants.js";

export const PACKAGE_MANAGER_EXEC: Record<(typeof AVAILABLE_PACKAGE_MANAGERS)[number], string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
} as const;

// store typescript questions answers with default value
class TsState implements State {
  public packageManager: (typeof AVAILABLE_PACKAGE_MANAGERS)[number];
  public eslint: boolean;
  public prettier: boolean;
  public lintStaged: boolean;
  public husky: boolean;
  public commitLint: boolean;
  public installDeps: boolean;

  constructor() {
    this.packageManager = "pnpm";
    this.eslint = false;
    this.prettier = false;
    this.lintStaged = false;
    this.husky = false;
    this.commitLint = false;
    this.installDeps = false;
  }

  setValues(answers: Partial<State>) {
    Object.assign(this, answers);
  }
}

export const tsState = new TsState();
