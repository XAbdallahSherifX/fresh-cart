import z from "zod";
export const filterProductsSchema = z
  .object({
    accordingTo: z.string(),
    minPrice: z.string(),
    maxPrice: z.string(),
    category: z.string(),
  })
  .refine(
    (data) => {
      if (!data.maxPrice) {
        return true;
      }
      if (!data.minPrice) {
        return true;
      }
      return Number(data.minPrice) <= Number(data.maxPrice);
    },
    {
      path: ["minPrice"],
      message: "Min price must be less than or equal to max price",
    }
  );
export type filterProductsSchemaType = z.infer<typeof filterProductsSchema>;
