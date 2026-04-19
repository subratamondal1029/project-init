import { AVAILABLE_LANGUAGE } from "@/constants.js";
import { PACKAGE_MANAGERS } from "@/state/ts.state.js";

export type SharedState = {
  language: (typeof AVAILABLE_LANGUAGE)[number]["code"];
  projectName: string;
  git: boolean;
  gitOrigin?: string;
};

export type TsState = {
  packageManager: (typeof PACKAGE_MANAGERS)[number];
  eslint: boolean;
  prettier: boolean;
  lintStaged: boolean;
  husky: boolean;
  commitLint: boolean;
  installDeps: boolean;
};
