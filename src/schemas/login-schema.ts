import { z } from "zod";

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginPayload = z.infer<typeof LoginSchema>;

export { LoginPayload, LoginSchema };
