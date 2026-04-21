import { AVAILABLE_LANGUAGE, TS_PACKAGE_MANGERS } from "@/constants.js";

export type SharedState = {
  language: (typeof AVAILABLE_LANGUAGE)[number]["code"];
  projectName: string;
  git: boolean;
  gitOrigin?: string;
};

export type TsState = {
  packageManager: (typeof TS_PACKAGE_MANGERS)[number];
  eslint: boolean;
  prettier: boolean;
  lintStaged: boolean;
  husky: boolean;
  commitLint: boolean;
  installDeps: boolean;
};
