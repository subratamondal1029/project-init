import { createConsola } from "consola";

export const logger = createConsola({
  level: 3, // 0 silent → 5 verbose
  formatOptions: {
    compact: true,
    colors: true,
    date: false,
  },
});
