import type { TsState as State } from "@/types/state.type.js";
import { AVAILABLE_PACKAGE_MANAGERS } from "@/constants.js";

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
    this.eslint = true;
    this.prettier = true;
    this.lintStaged = true;
    this.husky = true;
    this.commitLint = true;
    this.installDeps = true;
  }

  setValues(answers: Partial<State>) {
    Object.assign(this, answers);
  }
}

export const tsState = new TsState();
