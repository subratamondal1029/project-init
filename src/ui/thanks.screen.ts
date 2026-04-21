import { PROJECT_NAME } from "@/constants.js";
import { logger } from "@/utils/logger.js";

export const showThanks = () => {
  logger.box(
    `\x1b[1m\x1b[32mThank you for using ${PROJECT_NAME}!\x1b[0m\n\nHope this helps you jump start your next project. \nHappy coding! 🚀`
  );
};
