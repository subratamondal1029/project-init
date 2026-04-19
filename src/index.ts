#!/usr/bin/env node

import { showWelcome } from "@/ui/welcome.screen.js";
import { getSharedAnswers } from "@/ui/shared.screen.js";
import { selectLanguage } from "@/utils/selectLanguage.js";
import { logger } from "@/utils/logger.js";
import { initProject } from "@/core/index.js";

process.on("uncaughtException", (error) => {
  if (error instanceof Error && "code" in error && error.code === "ERR_USE_AFTER_CLOSE") {
    process.exit(0);
  }
  logger.error(error);
  process.exit(1);
});

showWelcome();

(async () => {
  try {
    const sharedAnswers = await getSharedAnswers();
    const { screen: langScreen, init: langInit } = selectLanguage(sharedAnswers.language);

    if (!langScreen) {
      logger.error(`Unsupported language: ${sharedAnswers.language}`);
      process.exit(1);
    }

    await langScreen();
    await initProject();
    await langInit();
  } catch (error) {
    if (error instanceof Error && error.message.includes("cancelled")) {
      process.exit(0);
    }
    logger.error(error);
    process.exit(1);
  }
})();
