import { PROJECT_NAME } from "@/constants.js";
import { logger } from "@/utils/logger.js";

export const showWelcome = () => {
  logger.box({
    title: `\x1b[1m\x1b[35m ${PROJECT_NAME} \x1b[0m`,
    message: `\x1b[1mWelcome to the automated project initializer!\x1b[0m\n\nThis tool will help you set up a consistent development\nenvironment with \x1b[36mTypeScript, ESLint, Prettier,\x1b[0m and \x1b[36mHusky\x1b[0m.\n\n\x1b[2mLet's get your next big idea started...\x1b[0m`,
  });
};
