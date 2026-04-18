import Enquirer, { type Prompt } from "enquirer";
import type { TsState } from "@/types/state.type.js";
import { tsState } from "@/state/ts.state.js";
import { AVAILABLE_PACKAGE_MANAGERS } from "@/constants.js";
import { tsSchema } from "@/schemas/ts.schema.js";
import { sharedState } from "@/state/shared.state.js";

type TsQuestion = NonNullable<ConstructorParameters<typeof Prompt>[0]> & {
  name: keyof TsState;
  state?: { answers: Partial<TsState> };
  choices?: unknown;
};

const questions = [
  {
    type: "select",
    name: "packageManager",
    message: "Which package manager would you like to use?",
    choices: AVAILABLE_PACKAGE_MANAGERS.map((pack) => ({
      name: pack,
      message: pack,
      value: pack,
    })),
    initial: tsState.packageManager,
    validate: tsSchema.packageManager,
  },
  {
    type: "confirm",
    name: "eslint",
    message: "Would you like to use ESLint?",
    initial: true,
    validate: tsSchema.eslint,
  },
  {
    type: "confirm",
    name: "prettier",
    message: "Would you like to use Prettier?",
    initial: true,
    validate: tsSchema.prettier,
  },
  {
    type: "confirm",
    name: "lintStaged",
    message: "Would you like to use lint-staged?",
    initial: true,
    validate: tsSchema.lintStaged,
    skip() {
      // Skip when git is disabled.
      return !sharedState.git;
    },
  },
  {
    type: "confirm",
    name: "husky",
    message: "Would you like to use Husky?",
    initial: true,
    validate: tsSchema.husky,
    skip() {
      // Skip when git is disabled.
      return !sharedState.git;
    },
  },
  {
    type: "confirm",
    name: "commitLint",
    message: "Would you like to use commitlint?",
    initial: tsState.commitLint,
    validate: tsSchema.commitLint,
    skip() {
      // Skip when Husky is disabled or git is disabled.
      return !this.state?.answers?.husky || !sharedState.git;
    },
  },
  {
    type: "confirm",
    name: "installDeps",
    message: "Would you like to install dependencies?",
    initial: true,
    validate: tsSchema.installDeps,
  },
] satisfies TsQuestion[];

export const getTsAnswers = async (): Promise<TsState> => {
  const enquirer = new Enquirer<TsState>();
  const answers = await enquirer.prompt(questions);
  tsState.setValues(answers);
  return answers;
};
