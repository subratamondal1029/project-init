import { sharedState } from "@/state/shared.state.js";
import { logger } from "@/utils/logger.js";
import { createProjectDir } from "@/core/common/createProjectDir.js";
import { gitInit } from "@/core/common/gitInit.js";
import path from "node:path";

export const initProject = async (): Promise<void> => {
  try {
    // Implement project initialization logic
    logger.start("Initializing project...");
    const projectPath = path.join(process.cwd(), sharedState.projectName);
    await createProjectDir(projectPath);
    process.chdir(projectPath);
    logger.info("Project directory created.");
    await gitInit();
  } catch (error) {
    throw new Error((error as Error)?.message || "Failed creating project", { cause: error });
  }
};
