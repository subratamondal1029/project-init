import { PROJECT_NAME } from "@/constants.js";
import { logger } from "@/utils/logger.js";

export const showWelcome = () => {
  logger.box(`Welcome to \x1b[1m${PROJECT_NAME}\x1b[0m.\n\n\x1b[1m\x1b[36mReady to go!\x1b[0m`);
};
