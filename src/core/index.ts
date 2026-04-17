import { sharedState } from "@/state/shared.state.js";
import { logger } from "@/utils/logger.js";
import { createProjectDir } from "@/core/common/createProjectDir.js";
import path from "node:path";

export const initProject = async (): Promise<void> => {
  try {
    // Implement project initialization logic
    logger.start("Initializing project...");
    await createProjectDir(path.join(process.cwd(), sharedState.projectName));
    logger.info("Project directory created.");
  } catch (error) {
    throw new Error((error as Error)?.message || "Failed creating project", { cause: error });
  }
};
