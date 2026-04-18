import { AVAILABLE_LANGUAGE } from "@/constants.js";
import type { SharedState as State } from "@/types/state.type.js";

export const DEFAULT_GIT_ORIGIN = "https://github.com/user/repo.git" as const;

// store shared questions answers with default value
class SharedState implements State {
  public language: (typeof AVAILABLE_LANGUAGE)[number]["code"];
  public projectName: string;
  public git: boolean;
  public gitOrigin?: string;

  constructor() {
    this.language = "TS";
    this.projectName = "my-project";
    this.git = false;
    this.gitOrigin = DEFAULT_GIT_ORIGIN;
  }

  setValues(answers: Partial<State>) {
    Object.assign(this, answers);
  }
}

export const sharedState = new SharedState();
