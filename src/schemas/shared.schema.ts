import type { SharedState } from "@/types/state.type.js";
import { validator } from "./index.js";
import { z } from "zod";

export const sharedSchema: Record<keyof SharedState, (value: unknown) => boolean | string> = {
  language: validator(z.string().min(1).max(5)),
  projectName: validator(z.string().min(2).max(100)),
  git: validator(z.boolean()),
  gitOrigin: validator(z.string().min(2).max(200)),
};
