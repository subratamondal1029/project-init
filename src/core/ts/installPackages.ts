import { dependencies } from "@/templates/ts/dependencies.js";
import { run } from "@/utils/run.js";
import { PACKAGE_MANAGER_CMD, tsState } from "@/state/ts.state.js";
import { logger } from "@/utils/logger.js";

type DependencyKey = keyof typeof tsState | "default";
export const filterDependencies = () => {
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

  await run(PACKAGE_MANAGER_CMD[tsState.packageManager].installer, filteredDependencies);
  logger.success("Packages installed successfully.");
};
