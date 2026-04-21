/*
STEPS:
1. husky init
2. if lint-staged enable edit pre-commit hook
3. if commitlint enable add commit-msg
*/

import fs from "fs-extra";
import { run } from "@/utils/run.js";
import { tsState, PACKAGE_MANAGER_CMD } from "@/state/ts.state.js";
import path from "node:path";
import { logger } from "@/utils/logger.js";
import { resolveTemplatePath } from "@/utils/resolveTemplatePath.js";

export const huskyInit = async (): Promise<void> => {
  // Implementation for initializing Husky
  await run(PACKAGE_MANAGER_CMD[tsState.packageManager].executer, ["husky", "init"], {
    shell: true,
  });

  const preCommitCmd = tsState.lintStaged
    ? `${tsState.packageManager} run lint:stage`
    : 'echo -e "\n\\033[33m⚠️ No pre-commit checks configured\\033[0m" >&2';
  await fs.outputFile(path.join(process.cwd(), ".husky", "pre-commit"), preCommitCmd);
  logger.success("Husky pre-commit hook initialized");

  if (tsState.commitLint) {
    await fs.copy(
      resolveTemplatePath("commitlint", "commitlint.config.ts"),
      path.join(process.cwd(), "commitlint.config.ts")
    );
    await fs.outputFile(path.join(process.cwd(), ".husky", "commit-msg"), `commitlint --edit "$1"`);
    logger.success("Husky commitlint initialized");
  }
};
