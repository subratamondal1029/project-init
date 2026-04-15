import { AVAILABLE_LANGUAGE } from "@/constants.js";

export type SharedState = {
  language: (typeof AVAILABLE_LANGUAGE)[number]["code"];
  projectName: string;
  git: boolean;
  gitOrigin?: string;
};

export type TsState = {
  eslint: boolean;
  prettier: boolean;
  lintStaged: boolean;
  husky: boolean;
  preCommit: string;
  commitLint: boolean;
  installDeps: boolean;
};
