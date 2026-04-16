import { execa, type Options as ExecaOptions } from "execa";

type StdioOption = ExecaOptions["stdio"];

export const run = async (
  tool: string,
  args: string[],
  options?: {
    cwd?: string;
    stdio?: StdioOption;
    timeout?: number;
  }
) => {
  const res = await execa(tool, args, {
    cwd: options?.cwd ?? process.cwd(),
    stdio: options?.stdio ?? "inherit",
    timeout: options?.timeout || 10000,
  });

  if (res.stderr) {
    const errorMessage = typeof res.stderr === "string" ? res.stderr : res.stderr.join("\n");
    throw new Error(errorMessage || "");
  }

  return res;
};
