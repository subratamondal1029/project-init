import { logger } from "@/utils/logger.js";
import { resolveTemplatePath } from "@/utils/resolveTemplatePath.js";
import fs from "fs-extra";
import path from "node:path";

export const prettierInit = async (): Promise<void> => {
  // Implementation for initializing Prettier
  await fs.copy(
    resolveTemplatePath("prettier", ".prettierrc.json"),
    path.join(process.cwd(), ".prettierrc.json")
  );
  await fs.copy(
    resolveTemplatePath("prettier", ".prettierignore"),
    path.join(process.cwd(), ".prettierignore")
  );
  logger.success("Prettier config created.");
};
