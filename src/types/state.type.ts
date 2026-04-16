import { AVAILABLE_LANGUAGE, AVAILABLE_PACKAGE_MANAGERS } from "@/constants.js";

export type SharedState = {
  language: (typeof AVAILABLE_LANGUAGE)[number]["code"];
  projectName: string;
  git: boolean;
  gitOrigin?: string;
};

export type TsState = {
  packageManager: (typeof AVAILABLE_PACKAGE_MANAGERS)[number];
  eslint: boolean;
  prettier: boolean;
  lintStaged: boolean;
  husky: boolean;
  preCommit: string;
  commitLint: boolean;
  installDeps: boolean;
};
