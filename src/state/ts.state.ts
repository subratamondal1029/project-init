import type { TsState as State } from "@/types/state.type.js";

export const PACKAGE_MANAGERS = ["npm", "pnpm"] as const;
export const PACKAGE_MANAGER_CMD: Record<
  (typeof PACKAGE_MANAGERS)[number],
  {
    initializer: string;
    installer: string;
    executer: string;
    packageExtractFlags: string[];
  }
> = {
  npm: {
    initializer: "npm init -y",
    installer: "npm install",
    executer: "npx",
    packageExtractFlags: ["--package-lock-only"],
  },
  pnpm: {
    initializer: "pnpm init",
    installer: "pnpm install",
    executer: "pnpm dlx",
    packageExtractFlags: ["--lockfile-only"],
  },
} as const;

// store typescript questions answers with default value
class TsState implements State {
  public packageManager: (typeof PACKAGE_MANAGERS)[number];
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
