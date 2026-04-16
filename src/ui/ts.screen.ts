import Enquirer, { type Prompt } from "enquirer";
import type { TsState } from "@/types/state.type.js";
import { tsState } from "@/state/ts.state.js";
import { AVAILABLE_PACKAGE_MANAGERS } from "@/constants.js";
import { tsSchema } from "@/schemas/ts.schema.js";

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
    initial: tsState.eslint,
    validate: tsSchema.eslint,
  },
  {
    type: "confirm",
    name: "prettier",
    message: "Would you like to use Prettier?",
    initial: tsState.prettier,
    validate: tsSchema.prettier,
  },
  {
    type: "confirm",
    name: "lintStaged",
    message: "Would you like to use lint-staged?",
    initial: tsState.lintStaged,
    validate: tsSchema.lintStaged,
  },
  {
    type: "confirm",
    name: "husky",
    message: "Would you like to use Husky?",
    initial: tsState.husky,
    validate: tsSchema.husky,
  },
  {
    type: "confirm",
    name: "commitLint",
    message: "Would you like to use commitlint?",
    initial: tsState.commitLint,
    validate: tsSchema.commitLint,
    // When husky is disabled, skip commitLint and force its value to false.
    skip() {
      const isSkipped = !this.state?.answers?.husky;
      if (isSkipped) {
        const prompt = this as unknown as { value: boolean };
        prompt.value = false;
      }
      return isSkipped;
    },
  },
  {
    type: "confirm",
    name: "installDeps",
    message: "Would you like to install dependencies?",
    initial: tsState.installDeps,
    validate: tsSchema.installDeps,
  },
] satisfies TsQuestion[];

export const getTsAnswers = async (): Promise<TsState> => {
  const enquirer = new Enquirer<TsState>();
  const answers = await enquirer.prompt(questions);
  tsState.setValues(answers);
  return answers;
};
