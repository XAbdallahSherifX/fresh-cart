import z from "zod";
export const editProfileSchema = z.object({
  name: z
    .string()
    .nonempty("This Field Can Not Be Empty.")
    .min(3, "This Field Must Contian At Least 3 Characters."),
  email: z.email("Invalid Email").nonempty("This Field Can Not Be Empty."),
  phone: z
    .string()
    .regex(/^(\+201|01|201)[0-2,5]{1}[0-9]{8}$/, "Invalid Phone Number."),
});
export type editProfileSchemaType = z.infer<typeof editProfileSchema>;
