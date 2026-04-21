import type { TsState } from "@/types/state.type.js";
import { validator } from "./index.js";
import { booleanSchema } from "./shared.schema.js";
import { TS_PACKAGE_MANGERS } from "@/constants.js";
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
      .refine(
        (v): v is (typeof TS_PACKAGE_MANGERS)[number] =>
          TS_PACKAGE_MANGERS.includes(v as (typeof TS_PACKAGE_MANGERS)[number]),
        { message: "Invalid package manager" }
      )
  ),
  installDeps: booleanSchema,
};
