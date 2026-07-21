import z from "zod";

const orderSchema = z.object({
  orderItems: z
    .array(
      z.object({
        product: z.string("Product is required"),
        quantity: z.number("Quantity is required").int().positive(),
      }),
    )
    .nonempty("Order item can not be empty"),
  shippingAddress: z.object({
    country: z.string().default("Nepal"),
    province: z.string("Province is required"),
    city: z.string("City is required"),
    street: z.string("Street is required"),
  }),
  totalPrice: z.number().int().positive(),
});

export default orderSchema;
