import { tsState } from "@/state/ts.state.js";

export const dependencies: Partial<Record<keyof typeof tsState | "default", string[]>> = {
    eslint: ["eslint", "typescript-eslint", "@eslint/js"],
    prettier: ["prettier"],
    "lintStaged": ["lint-staged"],
    husky: ["husky"],
    commitLint: ["@commitlint/cli", "@commitlint/config-conventional"],
    default: ["typescript", "tsc-alias", "tsx", "@types/node"]
}