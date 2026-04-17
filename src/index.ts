#!/usr/bin/env node

import { showWelcome } from "@/ui/welcome.screen.js";
import { getSharedAnswers } from "@/ui/shared.screen.js";
import { selectLanguageScreen } from "@/utils/selectLanguageScreen.js";
import { logger } from "@/utils/logger.js";
import { initProject } from "@/core/index.js";

showWelcome();

(async () => {
  try {
    const sharedAnswers = await getSharedAnswers();
    const langScreen = selectLanguageScreen(sharedAnswers.language);

    if (!langScreen) {
      logger.error(`Unsupported language: ${sharedAnswers.language}`);
      process.exit(1);
    }

    await langScreen();
    await initProject();
  } catch (error) {
    if (error instanceof Error && error.message.includes("cancelled")) {
      process.exit(0);
    }
    logger.error(error);
    process.exit(1);
  }
})();
