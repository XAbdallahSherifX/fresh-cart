import z from "zod";
export const filterCategoriesSchema = z.object({
  subcategory: z.string(),
});
export type filterCategoriesSchemaType = z.infer<typeof filterCategoriesSchema>;
