import { logger } from "@/utils/logger.js";
import { resolveTemplatePath } from "@/utils/resolveTemplatePath.js";
import fs from "fs-extra";
import path from "node:path";

/*
STEPS:
1. copy tsconfig.json
2. copy src/index.ts
*/

export const tsInit = async (): Promise<void> => {
  // Implementation for initializing TypeScript project
  logger.start("Initializing TypeScript project...");
  await fs.copy(
    resolveTemplatePath("ts", "tsconfig.json"),
    path.join(process.cwd(), "tsconfig.json")
  );
  logger.success("tsconfig.json created.");
  await fs.copy(
    resolveTemplatePath("ts", "src", "index.ts"),
    path.join(process.cwd(), "src/index.ts")
  );
  logger.success("src/index.ts created.");
};
