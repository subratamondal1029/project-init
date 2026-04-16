#!/usr/bin/env node

import { showWelcome } from "@/ui/welcome.screen.js";
import { getSharedAnswers } from "@/ui/shared.screen.js";
import { selectLanguageScreen } from "@/utils/selectLanguageScreen.js";
import { logger } from "./utils/logger.js";

showWelcome();
(async () => {
  // Your main application flow here

  const sharedAnswers = await getSharedAnswers();
  const langAnswers = (await selectLanguageScreen(sharedAnswers.language)()) as Record<
    string,
    unknown
  >;

  logger.box(JSON.stringify({ ...sharedAnswers, ...langAnswers }, null, 2));
})();
