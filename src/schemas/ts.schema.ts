import type { TsState } from "@/types/state.type.js";
import { validator } from "./index.js";
import { booleanSchema } from "./shared.schema.js";
import { PACKAGE_MANAGERS } from "@/state/ts.state.js";
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
        (v): v is (typeof PACKAGE_MANAGERS)[number] =>
          PACKAGE_MANAGERS.includes(v as (typeof PACKAGE_MANAGERS)[number]),
        { message: "Invalid package manager" }
      )
  ),
  installDeps: booleanSchema,
};
