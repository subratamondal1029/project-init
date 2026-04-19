import fs from "fs-extra";
import { sharedState } from "@/state/shared.state.js";
import { PACKAGE_MANAGER_CMD, tsState } from "@/state/ts.state.js";
import { run } from "@/utils/run.js";
import { logger } from "@/utils/logger.js";

// Templates
import scripts from "@/templates/ts/package.scripts.js";
import path from "node:path";

/*
STEPS:
1. init with package manager
2. edit package.json with project info (npm pkg set / JSON merge)
*/

const filterScripts = () => {
  const newScripts: Partial<typeof scripts> = {
    dev: scripts.dev,
    build: scripts.build,
    start: scripts.start,
    "type:check": scripts["type:check"],
    ...(tsState.prettier && {
      "format:check": scripts["format:check"],
      "format:write": scripts["format:write"],
    }),
    ...(tsState.eslint && {
      "lint:check": scripts["lint:check"],
      "lint:fix": scripts["lint:fix"],
    }),
    ...(sharedState.git &&
      tsState.lintStaged && {
        "lint:stage": scripts["lint:stage"],
      }),
    ...(sharedState.git &&
      tsState.husky && {
        prepare: scripts["prepare"],
      }),
  };

  return newScripts;
};

const getLintStaged = async () => {
  if (sharedState.git && tsState.lintStaged) {
    let lintStage: Record<string, string[]> = {};

    if (tsState.eslint) {
      const eslintConfig = (await import("@/templates/lint-staged/eslint.js")).default;
      lintStage = { ...lintStage, ...eslintConfig };
    }

    if (tsState.prettier) {
      const prettierConfig = (await import("@/templates/lint-staged/prettier.js")).default;
      lintStage = { ...lintStage, ...prettierConfig };
    }

    return lintStage;
  }
};

const editPackage = async (): Promise<void> => {
  // const filteredScripts = filterScripts();
  try {
    const packagePath = path.join(process.cwd(), "package.json");
    const pak = JSON.parse(await fs.readFile(packagePath, "utf8"));

    pak.name = sharedState.projectName;
    pak.main = "src/index.ts";
    pak.type = "module";
    pak.scripts = filterScripts();

    const listStagedConfig = await getLintStaged();

    if (listStagedConfig) {
      pak["lint-staged"] = listStagedConfig;
    }

    await fs.writeFile(packagePath, JSON.stringify(pak, null, 2));
  } catch (error) {
    throw new Error("Failed to edit package.json", { cause: error });
  }
};

export const packageInit = async (): Promise<void> => {
  // Implementation for initializing with package manager
  logger.info("Initializing TypeScript project...");
  await run(PACKAGE_MANAGER_CMD[tsState.packageManager].initializer, [], {
    shell: true,
    stdio: "pipe",
  });
  await editPackage();
  logger.info("package.json is ready.");
};
