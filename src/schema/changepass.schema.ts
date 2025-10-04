import z, { object } from "zod";
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("This Field Can Not Be Empty.")
      .min(6, "Password Must Be At Least 6 Characters."),
    password: z
      .string()
      .nonempty("This Field Can Not Be Empty.")
      .min(6, "Password Must Be At Least 6 Characters."),
    rePassword: z.string().nonempty("This Field Can Not Be Empty."),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "RePassword Must Match Password.",
  });
export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>;
