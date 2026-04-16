import type { TsState } from "@/types/state.type.js";
import { validator } from "./index.js";
import { booleanSchema } from "./shared.schema.js";
import { AVAILABLE_PACKAGE_MANAGERS } from "@/constants.js";
import { z } from "zod";

export const tsSchema: Record<keyof TsState, (value: unknown) => boolean | string> = {
  eslint: booleanSchema,
  prettier: booleanSchema,
  lintStaged: booleanSchema,
  husky: booleanSchema,
  commitLint: booleanSchema,
  packageManager: validator(
    z
      .string()
      .lowercase()
      .refine((v) =>
        AVAILABLE_PACKAGE_MANAGERS.includes(v as (typeof AVAILABLE_PACKAGE_MANAGERS)[number])
      )
  ),
  installDeps: booleanSchema,
};
