import z from "zod";
export const newPassSchema = z
  .object({
    email: z.email("Invalid Email").nonempty("This Field Can Not Be Empty."),
    newPassword: z
      .string()
      .nonempty("This Field Can Not Be Empty.")
      .min(6, "Password Must Be At Least 6 Characters."),
  })
export type newPassSchemaType = z.infer<typeof newPassSchema>;
