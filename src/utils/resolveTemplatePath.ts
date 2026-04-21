import path from "node:path";
import { fileURLToPath } from "node:url";

const relativeTemplatePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../templates"
);

export const resolveTemplatePath = (...paths: string[]): string => {
  return path.resolve(relativeTemplatePath, ...paths);
};
