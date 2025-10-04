import z, { object } from "zod";
export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("This Field Can Not Be Empty.")
      .min(3, "This Field Must Contian At Least 3 Characters."),
    email: z.email("Invalid Email").nonempty("This Field Can Not Be Empty."),
    password: z
      .string()
      .nonempty("This Field Can Not Be Empty.")
      .min(6, "Password Must Be At Least 6 Characters."),
    rePassword: z.string().nonempty("This Field Can Not Be Empty."),
    phone: z
      .string()
      .regex(/^(\+201|01|201)[0-2,5]{1}[0-9]{8}$/,"Invalid Phone Number."),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "RePassword Must Match Password.",
  });
export type registerSchemaType = z.infer<typeof registerSchema>;
