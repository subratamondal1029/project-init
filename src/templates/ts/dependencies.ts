//  "devDependencies": [
//      "@commitlint/cli",
//      "@commitlint/config-conventional",
//      "@eslint/js",
//      "@types/node",
//      "eslint",
//      "husky",
//      "lint-staged",
//      "prettier",
//      "tsc-alias",
//      "tsx",
//      "typescript",
//      "typescript-eslint"
//  ]

type Tools = [
    "eslint",
    "prettier",
    "lint-staged",
    "husky",
    "commitlint",
    "default"
]

export const dependencies: Record<Tools[number], string[]> = {
    eslint: ["eslint", "typescript-eslint", "@eslint/js"],
    prettier: ["prettier"],
    "lint-staged": ["lint-staged"],
    husky: ["husky"],
    commitlint: ["@commitlint/cli", "@commitlint/config-conventional"],
    default: ["typescript", "tsc-alias", "tsx", "@types/node"]
}