#!/usr/bin/env node

import { showWelcome } from "@/ui/welcome.screen.js";
import { getSharedAnswers } from "@/ui/shared.screen.js";
import { logger } from "@/utils/logger.js";

showWelcome();
(async () => {
  // Your main application flow here

  const sharedAnswers = await getSharedAnswers();
  logger.box(`Shared Answers: ${JSON.stringify(sharedAnswers, null, 2)}`);
})();
