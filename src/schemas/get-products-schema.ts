import { z } from "zod";

const GetProductsSchema = z.object({
  name: z.string().optional(),
  category: z.string().toUpperCase(),
});

type GetProductsPayload = z.infer<typeof GetProductsSchema>;

export { GetProductsPayload, GetProductsSchema };
