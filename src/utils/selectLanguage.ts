import { AVAILABLE_LANGUAGE } from "@/constants.js";
import { tsProjectInit } from "@/core/ts/index.js";
import { getTsAnswers } from "@/ui/ts.screen.js";

const langMap: Record<
  (typeof AVAILABLE_LANGUAGE)[number]["code"],
  { screen: () => Promise<unknown>; init: () => Promise<void> }
> = {
  TS: {
    screen: getTsAnswers,
    init: tsProjectInit,
  },
};

export const selectLanguage = (language: (typeof AVAILABLE_LANGUAGE)[number]["code"]) => {
  return langMap[language];
};
