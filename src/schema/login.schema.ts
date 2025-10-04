import z from "zod";
export const loginSchema = z
  .object({
    email: z.email("Invalid Email").nonempty("This Field Can Not Be Empty."),
    password: z
      .string()
      .nonempty("This Field Can Not Be Empty.")
      .min(6, "Password Must Be At Least 6 Characters."),
  })
export type loginSchemaType = z.infer<typeof loginSchema>;
