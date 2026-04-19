import fs from "fs-extra";
import { run } from "@/utils/run.js";
import { PACKAGE_MANAGER_CMD, tsState } from "@/state/ts.state.js";
import { sharedState } from "@/state/shared.state.js";
import { logger } from "@/utils/logger.js";
import { resolveTemplatePath } from "@/utils/resolveTemplatePath.js";

type DependencyKey = keyof typeof tsState | "default";
export const filterDependencies = () => {
  const dependencies = fs.readJsonSync(resolveTemplatePath("ts", "dependencies.json"));
  const filteredDependencies: string[] = [];

  for (const [tool, toolDependencies] of Object.entries(dependencies) as [
    DependencyKey,
    string[],
  ][]) {
    if (tool === "default") {
      filteredDependencies.push(...toolDependencies);
      continue;
    }

    if (tsState[tool]) {
      filteredDependencies.push(...toolDependencies);
    }
  }

  return filteredDependencies;
};

export const installPackages = async (): Promise<void> => {
  // Implementation for installing packages
  const filteredDependencies = filterDependencies();
  const pakCmd = PACKAGE_MANAGER_CMD[tsState.packageManager];

  if (tsState.installDeps) {
    logger.start("Installing packages...");
    await run(pakCmd.installer, ["-D", ...filteredDependencies], {
      shell: true,
      timeout: 0,
    });
    logger.success("Packages installed successfully.");
  } else {
    await run(pakCmd.installer, ["-D", ...filteredDependencies, ...pakCmd.packageExtractFlags], {
      shell: true,
      timeout: 0,
    });

    logger.box({
      title: `\x1b[1m\x1b[33m Package installation skipped \x1b[0m`,
      message: `\x1b[2mYou can install the required packages later with:\x1b[0m\n\n\x1b[1m\x1b[36mcd ${sharedState.projectName}\x1b[0m\n\x1b[1m\x1b[36m${pakCmd.installer}\x1b[0m`,
    });
  }
};
