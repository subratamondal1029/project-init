import { logger } from "@/utils/logger.js";
import { packageInit } from "./packageInit.js";

export const tsProjectInit = async (): Promise<void> => {
  try {
    await packageInit();
  } catch (error) {
    logger.error("Error occurred while initializing TypeScript project");
    logger.error.raw(error);
    process.exit(1);
  }
};
