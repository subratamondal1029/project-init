import { logger } from "@/utils/logger.js";
import { packageInit } from "./packageInit.js";
import { tsInit } from "./tsInit.js";
import { tsState } from "@/state/ts.state.js";
import { eslintInit } from "./eslintInit.js";
import { prettierInit } from "./prettierInit.js";
import { huskyInit } from "./huskyInit.js";
import { sharedState } from "@/state/shared.state.js";
import { filterDependencies, installPackages } from "./installPackages.js";

export const tsProjectInit = async (): Promise<void> => {
  try {
    await packageInit();
    await tsInit();

    if (tsState.eslint) {
      await eslintInit();
    }

    if (tsState.prettier) {
      await prettierInit();
    }

    if (sharedState.git && tsState.husky) {
      await huskyInit();
    }

    if (tsState.installDeps) {
      await installPackages();
    } else {
      logger.info("Skipping package installation.");
      const dependencies = filterDependencies();
      logger.box(
        `To install packages later, run \`${tsState.packageManager} install ${dependencies.join(` `)}\``
      );
    }

    logger.info("Everything is set up! Now you can start coding.");
  } catch (error) {
    logger.error("Error occurred while initializing TypeScript project");
    logger.error.raw(error);
    process.exit(1);
  }
};
