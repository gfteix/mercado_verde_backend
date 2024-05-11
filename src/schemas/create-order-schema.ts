import { z } from "zod";

const CreateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
      }),
    )
    .min(1),
});

type CreateOrderPayload = z.infer<typeof CreateOrderSchema>;

export { CreateOrderPayload, CreateOrderSchema };
