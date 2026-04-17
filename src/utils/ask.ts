import Enquirer, { Prompt } from "enquirer";

export const ask = async (questions: NonNullable<ConstructorParameters<typeof Prompt>[0]>[]) => {
  const enquirer = new Enquirer();
  return await enquirer.prompt(questions);
};
