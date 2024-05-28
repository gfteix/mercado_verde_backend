import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  street: z.string(),
  houseNumber: z.string(),
  city: z.string(),
  zipCode: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  country: z.string(),
});

type RegisterPayload = z.infer<typeof RegisterSchema>;

export { RegisterPayload, RegisterSchema };
