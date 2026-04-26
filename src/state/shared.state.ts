import { AVAILABLE_LANGUAGE } from "@/constants.js";
import type { SharedState as State } from "@/types/state.type.js";

export const DEFAULT_GIT_ORIGIN = "https://github.com/user/repo.git" as const;

// store shared questions answers with default value
class SharedState implements State {
  public language: (typeof AVAILABLE_LANGUAGE)[number]["code"];
  public projectName: string;
  public git: boolean;
  public gitOrigin?: string;
  public skipConfirm: boolean;

  constructor() {
    this.language = "TS";
    this.projectName = "my-project";
    this.git = false;
    this.skipConfirm = false;
    this.gitOrigin = DEFAULT_GIT_ORIGIN;
  }

  setSkipConfirm(skipConfirm: boolean) {
    this.skipConfirm = skipConfirm;
  }

  setValues(answers: Partial<State>) {
    Object.assign(this, answers);
  }
}

export const sharedState = new SharedState();
