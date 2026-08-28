import z from "zod";
import { PRODUCT_BRANDS, PRODUCT_CATEGORIES } from "../constants/product.js";

const productSchema = z.object({
  name: z.string({
    required_error: "Product name is required",
    invalid_type_error: "name should be string",
  }),
  category: z.string({
    required_error: "Product category is required",
    invalid_type_error:
      "Please select one of the category from the category list!",
  }),
  brand: z.string({
    required_error: "Brand is required",
    invalid_type_error: "Brand doesn't match fromt the list of brands!",
  }),
  price: z.coerce.number("Product's price is required"),
  stock: z.coerce
    .number()
    .min(0, { message: "stock should not be less than 0" })
    .int()
    .nonnegative(""),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "description should be string type",
  }),
  rating: z.coerce.number({
    invalid_type_error: "rating should be number type",
  }),
});

export default productSchema;
