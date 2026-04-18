/*
STEPS:
1. copy eslint config
*/

import { logger } from "@/utils/logger.js";
import fs from "fs-extra";
import path from "node:path";

export const eslintInit = async (): Promise<void> => {
  // Implementation for initializing ESLint

  await fs.copy(
    "@/templates/eslint/eslint.config.js",
    path.join(process.cwd(), "eslint.config.js")
  );
  logger.success("ESLint config created.");
};
