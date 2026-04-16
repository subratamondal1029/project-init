import { AVAILABLE_LANGUAGE } from "@/constants.js";
import { getTsAnswers } from "@/ui/ts.screen.js";

const langMap: Record<(typeof AVAILABLE_LANGUAGE)[number]["code"], () => Promise<unknown>> = {
  TS: getTsAnswers,
};

export const selectLanguageScreen = (language: (typeof AVAILABLE_LANGUAGE)[number]["code"]) => {
  return langMap[language];
};
