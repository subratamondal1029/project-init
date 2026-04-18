import { dependencies } from "@/templates/ts/dependencies.js";
import { run } from "@/utils/run.js";
import { tsState } from "@/state/ts.state.js";
import { logger } from "@/utils/logger.js";

type DependencyKey = keyof typeof tsState | "default";

export const installPackages = async (): Promise<void> => {
  // Implementation for installing packages
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

  await run(tsState.packageManager, ["install", ...filteredDependencies]);
  logger.success("Packages installed successfully.");
  logger.info("Everything is set up! Now you can start coding.");
};
