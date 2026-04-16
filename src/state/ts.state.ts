import type { TsState as State, TsPackageManagers } from "@/types/state.type.js";

// store typescript questions answers with default value
class TsState implements State {
  public packageManager: TsPackageManagers;
  public eslint: boolean;
  public prettier: boolean;
  public lintStaged: boolean;
  public husky: boolean;
  public preCommit: string;
  public commitLint: boolean;
  public installDeps: boolean;

  constructor() {
    this.packageManager = "pnpm";
    this.eslint = true;
    this.prettier = true;
    this.lintStaged = true;
    this.husky = true;
    this.preCommit = "pnpm run lint:stage";
    this.commitLint = true;
    this.installDeps = true;
  }

  setValues(answers: Partial<State>) {
    Object.assign(this, answers);
  }
}

export const tsState = new TsState();
