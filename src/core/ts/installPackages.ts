import fs from "fs-extra";
import { run } from "@/utils/run.js";
import { PACKAGE_MANAGER_CMD, tsState } from "@/state/ts.state.js";
import { logger } from "@/utils/logger.js";
import { resolveTemplatePath } from "@/utils/resolveTemplatePath.js";

type DependencyKey = keyof typeof tsState | "default";
export const filterDependencies = (dependencies: Partial<Record<DependencyKey, string[]>>) => {
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
  const dependencies = await fs.readJson(resolveTemplatePath("ts", "dependencies.json"));
  const filteredDependencies = filterDependencies(dependencies);

  await run(PACKAGE_MANAGER_CMD[tsState.packageManager].installer, filteredDependencies);
  logger.success("Packages installed successfully.");
};
