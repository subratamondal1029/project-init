import updateNotifier, { type UpdateInfo } from "update-notifier";
import pak from "../../package.json" with { type: "json" };
import { logger } from "./logger.js";

const versionTheme: Partial<Record<UpdateInfo["type"] | "default" | "reset", string>> = {
  major: "\x1b[31m",
  minor: "\x1b[33m",
  patch: "\x1b[90m",
  default: "\x1b[0m",
  reset: "\x1b[0m",
} as const;

const getTheme = (type: UpdateInfo["type"]) => {
  const theme = versionTheme[type as keyof typeof versionTheme];

  if (theme) {
    return theme;
  }

  return versionTheme.default;
};

try {
  const notifier = updateNotifier({
    pkg: pak,
    updateCheckInterval: 1000 * 60 * 60 * 12,
  });

  if (notifier.update) {
    logger.box({
      title: `\x1b[1m\x1b[33m Update Available \x1b[0m`,
      message: `${getTheme(notifier.update.type)}${notifier.update.current}${versionTheme.reset} \x1b[2m→\x1b[0m \x1b[32m${notifier.update.latest}\x1b[0m\n\n\x1b[2mRun:\x1b[0m\x1b[1m\x1b[36m npm i -g ${pak.name}\x1b[0m`,
    });
  }
} catch (error) {
  logger.debug("Update check skipped.", error);
}
