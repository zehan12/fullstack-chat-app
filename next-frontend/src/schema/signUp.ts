import z from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
