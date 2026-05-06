import Enquirer, { type Prompt } from "enquirer";
import { sharedState } from "@/state/shared.state.js";

export function customSkip(this: unknown, condition: boolean, def: unknown = false) {
  if (condition) {
    (this as { value: unknown }).value = def || false;
  }

  return condition;
}

export const ask = async (questions: NonNullable<ConstructorParameters<typeof Prompt>[0]>[]) => {
  const processedQuestions = questions.map((question) => {
    const processed = { ...question };

    if (question.type === "confirm" && sharedState.skipConfirm && question.name !== "overwrite") {
      processed.skip = true;
      processed.result = () => "true";
    }

    return processed;
  });

  const enquirer = new Enquirer();
  return await enquirer.prompt(processedQuestions);
};
