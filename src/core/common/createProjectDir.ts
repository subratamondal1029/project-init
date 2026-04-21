import { ask } from "@/utils/ask.js";
import { logger } from "@/utils/logger.js";
import fs from "fs-extra";

const askForOverwrite = async () => {
  const result = (await ask([
    {
      type: "confirm",
      name: "overwrite",
      message: "Project directory already exists. Would you like to overwrite it?",
      initial: true,
    },
  ])) as { overwrite: boolean };

  return result.overwrite;
};

export const createProjectDir = async (projectPath: string): Promise<void> => {
  try {
    const exists = await fs.pathExists(projectPath);
    if (!exists) {
      await fs.ensureDir(projectPath);
    } else {
      const overwrite = await askForOverwrite();
      if (overwrite) {
        logger.warn("Existing project directory will be cleaned and overwritten.");
        await fs.emptyDir(projectPath);
      } else {
        logger.error("Operation cancelled by user.");
        process.exit(1);
      }
    }
  } catch (err) {
    throw new Error("Failed to create project directory", { cause: err });
  }
};
