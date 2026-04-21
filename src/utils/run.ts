import { execa, type Options as ExecaOptions } from "execa";

type StdioOption = ExecaOptions["stdio"];

export const run = async (
  tool: string,
  args?: string[],
  options?: {
    shell?: boolean;
    cwd?: string;
    stdio?: StdioOption;
    timeout?: number;
  }
) => {
  const res = await execa(tool, args, {
    shell: options?.shell ?? false,
    cwd: options?.cwd ?? process.cwd(),
    stdio: options?.stdio ?? "inherit",
    timeout: options?.timeout ?? 30000,
  });

  return res;
};
