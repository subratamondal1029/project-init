import { logger } from "@/utils/logger.js";
import { packageInit } from "./packageInit.js";
import { tsInit } from "./tsInit.js";

export const tsProjectInit = async (): Promise<void> => {
  try {
    await packageInit();
    await tsInit();
  } catch (error) {
    logger.error("Error occurred while initializing TypeScript project");
    logger.error.raw(error);
    process.exit(1);
  }
};
