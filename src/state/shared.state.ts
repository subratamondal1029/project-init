import type { SharedState } from "@/types/state.type.js";

// store shared questions answers with default value
export const sharedState: SharedState = {
  language: "TS",
  projectName: "my-project",
  git: true,
  gitOrigin: "https://github.com/username/repo.git",
};
