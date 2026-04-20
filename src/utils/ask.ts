import Enquirer, { Prompt } from "enquirer";

function result(this: { skipped?: boolean; type: string }, value: string) {
  return (this.type === "confirm" && this.skipped ? false : value) as unknown as string;
}

export const ask = async (questions: NonNullable<ConstructorParameters<typeof Prompt>[0]>[]) => {
  const processedQuestions = questions.map((question) => ({ ...question, result }));

  const enquirer = new Enquirer();
  return await enquirer.prompt(processedQuestions);
};
