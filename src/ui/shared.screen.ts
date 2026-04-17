import { type Prompt } from "enquirer";
import type { SharedState } from "@/types/state.type.js";
import { sharedState } from "@/state/shared.state.js";
import { AVAILABLE_LANGUAGE } from "@/constants.js";
import { sharedSchema } from "@/schemas/shared.schema.js";
import { ask } from "@/utils/ask.js";

type SharedQuestion = NonNullable<ConstructorParameters<typeof Prompt>[0]> & {
  name: keyof SharedState;
  choices?: unknown;
};

const questions = [
  {
    name: "language",
    type: "select",
    message: "Select your language",
    choices: AVAILABLE_LANGUAGE.map(({ code, name }) => ({
      name: code,
      message: name,
      value: code,
    })),
    initial: sharedState.language,
    validate: sharedSchema.language,
  },
  {
    name: "projectName",
    type: "input",
    message: "Enter your project name",
    initial: sharedState.projectName,
    validate: sharedSchema.projectName,
  },
  {
    name: "git",
    type: "confirm",
    message: "Initialize git repository?",
    initial: sharedState.git,
    validate: sharedSchema.git,
  },
  {
    name: "gitOrigin",
    type: "input",
    message: "Enter the git origin URL",
    initial: sharedState.gitOrigin ?? "",
    validate: sharedSchema.gitOrigin,
    // Skip this prompt when git initialization is false
    skip() {
      return !(this as unknown as { state: { answers: SharedState } }).state.answers?.git;
    },
  },
] satisfies SharedQuestion[];

export const getSharedAnswers = async (): Promise<SharedState> => {
  const answers = (await ask(questions)) as SharedState;
  sharedState.setValues(answers);
  return answers;
};
