import { z } from "zod";

const GetProductsSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
});

type GetProductsPayload = z.infer<typeof GetProductsSchema>;

export { GetProductsPayload, GetProductsSchema };
