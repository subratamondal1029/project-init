import { z } from "zod";

export const validator = (schema: z.ZodType) => (value: unknown) => {
  const result = schema.safeParse(value);
  return result.success ? true : (result.error.issues[0]?.message ?? "Invalid value");
};
