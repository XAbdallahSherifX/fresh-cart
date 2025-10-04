import z from "zod";
export const addressSchema = z.object({
  name: z.string().nonempty("This Field Can Not Be Empty."),
  details: z.string().nonempty("This Field Can Not Be Empty."),
  phone: z
    .string()
    .regex(/^(\+201|01|201)[0-2,5]{1}[0-9]{8}$/, "Invalid Phone Number."),
  city: z.string().nonempty("This Field Can Not Be Empty."),
});
export type addressSchemaType = z.infer<typeof addressSchema>;
