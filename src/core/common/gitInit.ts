import { sharedState, DEFAULT_GIT_ORIGIN } from "@/state/shared.state.js";
import { ask } from "@/utils/ask.js";
import { logger } from "@/utils/logger.js";
import { run } from "@/utils/run.js";
import { ExecaError } from "execa";

const getBranch = async () => {
  const answers = (await ask([
    {
      type: "select",
      name: "branch",
      message: "Select the initial branch",
      choices: [
        { name: "main", message: "main", value: "main" },
        { name: "master", message: "master", value: "master" },
      ],
    },
  ])) as { branch: string };

  return answers.branch;
};

const verifyGitOrigin = async (origin: string): Promise<void> => {
  try {
    await run("git", ["ls-remote", origin], { stdio: "pipe" });
  } catch (error) {
    logger.warn((error as ExecaError)?.stderr || "Failed to verify git origin.");
  }
};

export const gitInit = async (): Promise<void> => {
  if (sharedState.git) {
    // Implement git init here
    const branch = await getBranch();
    await run("git", ["init", "-b", branch], { stdio: "pipe" });
    logger.info("Git repository initialized with branch: " + branch);

    if (!sharedState.gitOrigin || sharedState.gitOrigin === DEFAULT_GIT_ORIGIN) {
      logger.warn("No valid git origin provided.");
      return;
    }

    await verifyGitOrigin(sharedState.gitOrigin);
    await run("git", ["remote", "add", "origin", sharedState.gitOrigin], { stdio: "pipe" });
    logger.info("Git remote added: origin");
  }
};
