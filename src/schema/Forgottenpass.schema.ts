import z from "zod";
export const forgottenpassSchema = z
  .object({
    email: z.email("Invalid Email").nonempty("This Field Can Not Be Empty."),
  })
export type forgottenpassSchemaType = z.infer<typeof forgottenpassSchema>;
