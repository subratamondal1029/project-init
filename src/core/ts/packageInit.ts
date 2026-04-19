import fs from "fs-extra";
import { sharedState } from "@/state/shared.state.js";
import { PACKAGE_MANAGER_CMD, tsState } from "@/state/ts.state.js";
import { run } from "@/utils/run.js";
import { logger } from "@/utils/logger.js";

// Templates
import path from "node:path";
import { resolveTemplatePath } from "@/utils/resolveTemplatePath.js";

/*
STEPS:
1. init with package manager
2. edit package.json with project info (npm pkg set / JSON merge)
*/

type Scripts = {
  dev: string;
  start: string;
  build: string;
  "type:check": string;
  "format:check": string;
  "format:write": string;
  "lint:check": string;
  "lint:fix": string;
  "lint:stage": string;
  prepare: string;
};

const filterScripts = () => {
  const scripts = fs.readJsonSync(resolveTemplatePath("ts", "scripts.json")) as Scripts;

  const newScripts: Partial<Scripts> = {
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
    const { eslint: eslintConfig, prettier: prettierConfig } = await fs.readJson(
      resolveTemplatePath("lint-staged", "config.json")
    );

    if (tsState.eslint) {
      lintStage = { ...lintStage, ...eslintConfig };
    }

    if (tsState.prettier) {
      lintStage = { ...lintStage, ...prettierConfig };
    }

    return lintStage;
  }
};

const editPackage = async (): Promise<void> => {
  // const filteredScripts = filterScripts();
  try {
    const packagePath = path.join(process.cwd(), "package.json");
    const pak = await fs.readJson(packagePath);

    pak.name = sharedState.projectName;
    pak.main = "src/index.ts";
    pak.type = "module";
    pak.scripts = filterScripts();

    const listStagedConfig = await getLintStaged();

    if (listStagedConfig) {
      pak["lint-staged"] = listStagedConfig;
    }

    await fs.writeJson(packagePath, pak, { spaces: 2 });
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
  logger.success("package.json is ready.");
};
