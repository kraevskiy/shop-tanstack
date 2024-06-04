import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export type RegisterInputs = z.infer<typeof registerSchema>;
