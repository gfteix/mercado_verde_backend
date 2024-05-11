import { z } from "zod";

const UpdateProfileSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  password: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
});

type UpdateProfilePayload = z.infer<typeof UpdateProfileSchema>;

export { UpdateProfilePayload, UpdateProfileSchema };
